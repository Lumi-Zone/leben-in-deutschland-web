import test from 'node:test';
import assert from 'node:assert/strict';

import { encodeQr, renderQrSvg } from '../src/utils/qrcode.ts';

// --- Independent reimplementation used to verify the encoder -----------------
// Deliberately written from the QR spec rather than reusing the encoder's
// internals, so a mistake in the encoder cannot cancel itself out here.

const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
{
  let value = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = value;
    LOG[value] = i;
    value = (value << 1) ^ (value & 0x80 ? 0x11d : 0);
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
}
const mul = (a, b) => (a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]);

function generatorPoly(degree) {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= mul(poly[j], EXP[i]);
    }
    poly = next;
  }
  return poly;
}

const BLOCK_SPEC = {
  1: { ec: 10, groups: [[1, 16]] },
  2: { ec: 16, groups: [[1, 28]] },
  3: { ec: 26, groups: [[1, 44]] },
  4: { ec: 18, groups: [[2, 32]] },
  5: { ec: 24, groups: [[2, 43]] },
  6: { ec: 16, groups: [[4, 27]] },
  7: { ec: 18, groups: [[4, 31]] },
  8: { ec: 22, groups: [[2, 38], [2, 39]] },
  9: { ec: 22, groups: [[3, 36], [2, 37]] },
  10: { ec: 26, groups: [[4, 43], [1, 44]] },
};

const ALIGNMENT = {
  1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
  6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
};

function functionModuleMap(version) {
  const size = version * 4 + 17;
  const reserved = Array.from({ length: size }, () => new Array(size).fill(false));
  const mark = (row, col) => {
    if (row >= 0 && col >= 0 && row < size && col < size) reserved[row][col] = true;
  };

  for (const [cr, cc] of [[3, 3], [3, size - 4], [size - 4, 3]]) {
    for (let dr = -4; dr <= 4; dr++) for (let dc = -4; dc <= 4; dc++) mark(cr + dr, cc + dc);
  }
  for (let i = 0; i < size; i++) {
    mark(6, i);
    mark(i, 6);
  }
  const centers = ALIGNMENT[version];
  const last = centers[centers.length - 1];
  for (const cr of centers) {
    for (const cc of centers) {
      if ((cr === 6 && cc === 6) || (cr === 6 && cc === last) || (cr === last && cc === 6)) continue;
      for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) mark(cr + dr, cc + dc);
    }
  }
  for (let i = 0; i <= 8; i++) {
    if (i !== 6) mark(i, 8);
    if (i !== 6) mark(8, i);
  }
  for (let i = 0; i < 8; i++) mark(8, size - 1 - i);
  for (let i = 0; i < 8; i++) mark(size - 1 - i, 8);
  if (version >= 7) {
    for (let i = 0; i < 18; i++) {
      const far = size - 11 + (i % 3);
      const near = Math.floor(i / 3);
      mark(near, far);
      mark(far, near);
    }
  }
  return reserved;
}

const MASKS = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (_r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
];

function readFormat(modules) {
  const size = modules.length;
  let raw = 0;
  const read = (row, col) => (modules[row][col] ? 1 : 0);
  for (let i = 0; i <= 5; i++) raw |= read(i, 8) << i;
  raw |= read(7, 8) << 6;
  raw |= read(8, 8) << 7;
  raw |= read(8, 7) << 8;
  for (let i = 9; i < 15; i++) raw |= read(8, 14 - i) << i;

  const bits = raw ^ 0x5412;
  // Verify the BCH(15,5) code is intact.
  let rest = bits;
  for (let i = 14; i >= 10; i--) {
    if ((rest >>> i) & 1) rest ^= 0x537 << (i - 10);
  }
  assert.equal(rest, 0, 'format information failed its BCH check');

  return { ecLevelBits: (bits >>> 13) & 0b11, mask: (bits >>> 10) & 0b111 };
}

/** Reads a module grid back into the original string, verifying ECC on the way. */
function decodeQr(modules) {
  const version = (modules.length - 17) / 4;
  assert.ok(Number.isInteger(version) && version >= 1 && version <= 10, `bad size ${modules.length}`);
  const size = modules.length;

  const { ecLevelBits, mask } = readFormat(modules);
  assert.equal(ecLevelBits, 0b00, 'expected error-correction level M');

  const reserved = functionModuleMap(version);
  const unmasked = modules.map((row, r) =>
    row.map((dark, c) => (reserved[r][c] ? dark : dark !== MASKS[mask](r, c)))
  );

  const bits = [];
  let upward = true;
  for (let right = size - 1; right >= 1; right -= 2) {
    const rightColumn = right <= 6 ? right - 1 : right;
    for (let step = 0; step < size; step++) {
      const row = upward ? size - 1 - step : step;
      for (const col of [rightColumn, rightColumn - 1]) {
        if (reserved[row][col]) continue;
        bits.push(unmasked[row][col] ? 1 : 0);
      }
    }
    upward = !upward;
  }

  const stream = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    stream.push(bits.slice(i, i + 8).reduce((acc, bit) => (acc << 1) | bit, 0));
  }

  const spec = BLOCK_SPEC[version];
  const blockSizes = spec.groups.flatMap(([count, dataCodewords]) =>
    new Array(count).fill(dataCodewords)
  );
  const dataBlocks = blockSizes.map(() => []);
  let cursor = 0;
  const longest = Math.max(...blockSizes);
  for (let i = 0; i < longest; i++) {
    for (let b = 0; b < blockSizes.length; b++) {
      if (i < blockSizes[b]) dataBlocks[b].push(stream[cursor++]);
    }
  }
  const ecBlocks = blockSizes.map(() => []);
  for (let i = 0; i < spec.ec; i++) {
    for (let b = 0; b < blockSizes.length; b++) ecBlocks[b].push(stream[cursor++]);
  }

  // The full codeword polynomial of every block must be divisible by the
  // generator, i.e. evaluate to zero at alpha^0 .. alpha^(ec-1).
  for (let b = 0; b < blockSizes.length; b++) {
    const full = [...dataBlocks[b], ...ecBlocks[b]];
    for (let i = 0; i < spec.ec; i++) {
      const syndrome = full.reduce((acc, coefficient) => mul(acc, EXP[i]) ^ coefficient, 0);
      assert.equal(syndrome, 0, `block ${b} syndrome ${i} is non-zero`);
    }
  }

  const payload = dataBlocks.flat();
  const payloadBits = payload.flatMap((byte) =>
    [7, 6, 5, 4, 3, 2, 1, 0].map((shift) => (byte >>> shift) & 1)
  );
  const take = (count) => payloadBits.splice(0, count).reduce((acc, bit) => (acc << 1) | bit, 0);
  assert.equal(take(4), 0b0100, 'expected byte mode');
  const length = take(version < 10 ? 8 : 16);
  const bytes = Uint8Array.from({ length }, () => take(8));
  return new TextDecoder().decode(bytes);
}

// --- Tests ------------------------------------------------------------------

test('the degree-10 generator polynomial matches the QR specification', () => {
  assert.deepEqual(generatorPoly(10), [1, 216, 194, 159, 111, 199, 94, 95, 113, 157, 193]);
});

test('encoded codes decode back to their payload across every supported version', () => {
  const payloads = [
    'https://lid-einbuergerung.de/de/app/',
    'A',
    'https://apps.apple.com/app/leben-in-deutschland-2026-lid/id6723899981?mt=8&ct=web-desktop-qr-de',
    'https://play.google.com/store/apps/details?id=com.einbuergerungapp&referrer=utm_source%3Dlid-web%26utm_medium%3Ddesktop-qr%26utm_campaign%3Dweb2app',
    'Einbürgerungstest — Umlaute und ein Em-Dash, damit UTF-8 mitgeprüft wird.',
    'x'.repeat(213),
  ];

  for (const payload of payloads) {
    assert.equal(decodeQr(encodeQr(payload)), payload, `round trip failed for ${payload.slice(0, 40)}`);
  }
});

test('every version boundary is reachable and round-trips', () => {
  const capacities = [14, 26, 42, 62, 84, 106, 122, 152, 180, 213];
  capacities.forEach((capacity, index) => {
    const version = index + 1;
    const modules = encodeQr('a'.repeat(capacity));
    assert.equal(modules.length, version * 4 + 17, `version ${version} produced the wrong size`);
    assert.equal(decodeQr(modules), 'a'.repeat(capacity));
  });
});

test('payloads beyond version 10 are rejected instead of silently truncated', () => {
  assert.throws(() => encodeQr('a'.repeat(214)), /exceeds the supported capacity/);
});

test('renderQrSvg emits a quiet zone and an accessible title', () => {
  const svg = renderQrSvg('https://lid-einbuergerung.de/de/app/', { title: 'App laden' });
  const size = encodeQr('https://lid-einbuergerung.de/de/app/').length;
  assert.match(svg, new RegExp(`viewBox="0 0 ${size + 8} ${size + 8}"`));
  assert.match(svg, /<title>App laden<\/title>/);
  assert.match(svg, /aria-hidden="false"/);
});
