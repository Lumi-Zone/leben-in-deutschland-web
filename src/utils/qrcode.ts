/**
 * Dependency-free QR encoder: byte mode, error-correction level M, versions 1-10.
 * That covers up to 213 UTF-8 bytes, which is far more than the campaign-tagged
 * store URLs this site renders. Anything longer throws rather than silently
 * producing an unscannable code.
 */

interface VersionSpec {
  ecPerBlock: number;
  groups: Array<{ blocks: number; dataCodewords: number }>;
}

const VERSION_SPECS: Record<number, VersionSpec> = {
  1: { ecPerBlock: 10, groups: [{ blocks: 1, dataCodewords: 16 }] },
  2: { ecPerBlock: 16, groups: [{ blocks: 1, dataCodewords: 28 }] },
  3: { ecPerBlock: 26, groups: [{ blocks: 1, dataCodewords: 44 }] },
  4: { ecPerBlock: 18, groups: [{ blocks: 2, dataCodewords: 32 }] },
  5: { ecPerBlock: 24, groups: [{ blocks: 2, dataCodewords: 43 }] },
  6: { ecPerBlock: 16, groups: [{ blocks: 4, dataCodewords: 27 }] },
  7: { ecPerBlock: 18, groups: [{ blocks: 4, dataCodewords: 31 }] },
  8: { ecPerBlock: 22, groups: [{ blocks: 2, dataCodewords: 38 }, { blocks: 2, dataCodewords: 39 }] },
  9: { ecPerBlock: 22, groups: [{ blocks: 3, dataCodewords: 36 }, { blocks: 2, dataCodewords: 37 }] },
  10: { ecPerBlock: 26, groups: [{ blocks: 4, dataCodewords: 43 }, { blocks: 1, dataCodewords: 44 }] },
};

const ALIGNMENT_CENTERS: Record<number, number[]> = {
  1: [],
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
  7: [6, 22, 38],
  8: [6, 24, 42],
  9: [6, 26, 46],
  10: [6, 28, 50],
};

const EC_LEVEL_M_BITS = 0b00;

// GF(256) tables with primitive polynomial x^8 + x^4 + x^3 + x^2 + 1.
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
{
  let value = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = value;
    GF_LOG[value] = i;
    value <<= 1;
    if (value & 0x100) value ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
}

function gfMultiply(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function reedSolomonGenerator(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array<number>(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMultiply(poly[j], GF_EXP[i]);
    }
    poly = next;
  }
  return poly;
}

function reedSolomonRemainder(data: number[], ecLength: number): number[] {
  const generator = reedSolomonGenerator(ecLength);
  const remainder = new Array<number>(ecLength).fill(0);
  for (const byte of data) {
    const factor = byte ^ remainder[0];
    remainder.shift();
    remainder.push(0);
    for (let i = 0; i < ecLength; i++) remainder[i] ^= gfMultiply(generator[i + 1], factor);
  }
  return remainder;
}

function totalDataCodewords(version: number): number {
  return VERSION_SPECS[version].groups.reduce((sum, group) => sum + group.blocks * group.dataCodewords, 0);
}

function byteCapacity(version: number): number {
  const headerBits = 4 + (version < 10 ? 8 : 16);
  return Math.floor((totalDataCodewords(version) * 8 - headerBits) / 8);
}

function pickVersion(byteLength: number): number {
  for (let version = 1; version <= 10; version++) {
    if (byteLength <= byteCapacity(version)) return version;
  }
  throw new Error(`QR payload of ${byteLength} bytes exceeds the supported capacity (213 bytes).`);
}

function buildCodewords(data: Uint8Array, version: number): number[] {
  const spec = VERSION_SPECS[version];
  const bits: number[] = [];
  const push = (value: number, length: number) => {
    for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
  };

  push(0b0100, 4);
  push(data.length, version < 10 ? 8 : 16);
  for (const byte of data) push(byte, 8);

  const capacityBits = totalDataCodewords(version) * 8;
  push(0, Math.min(4, capacityBits - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);
  const padBytes = [0xec, 0x11];
  for (let i = 0; bits.length < capacityBits; i++) push(padBytes[i % 2], 8);

  const codewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i + j];
    codewords.push(byte);
  }

  const dataBlocks: number[][] = [];
  const ecBlocks: number[][] = [];
  let offset = 0;
  for (const group of spec.groups) {
    for (let block = 0; block < group.blocks; block++) {
      const chunk = codewords.slice(offset, offset + group.dataCodewords);
      offset += group.dataCodewords;
      dataBlocks.push(chunk);
      ecBlocks.push(reedSolomonRemainder(chunk, spec.ecPerBlock));
    }
  }

  const interleaved: number[] = [];
  const longestBlock = Math.max(...dataBlocks.map((block) => block.length));
  for (let i = 0; i < longestBlock; i++) {
    for (const block of dataBlocks) if (i < block.length) interleaved.push(block[i]);
  }
  for (let i = 0; i < spec.ecPerBlock; i++) {
    for (const block of ecBlocks) interleaved.push(block[i]);
  }
  return interleaved;
}

const MASK_PREDICATES: Array<(row: number, col: number) => boolean> = [
  (row, col) => (row + col) % 2 === 0,
  (row) => row % 2 === 0,
  (_row, col) => col % 3 === 0,
  (row, col) => (row + col) % 3 === 0,
  (row, col) => (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0,
  (row, col) => ((row * col) % 2) + ((row * col) % 3) === 0,
  (row, col) => (((row * col) % 2) + ((row * col) % 3)) % 2 === 0,
  (row, col) => (((row + col) % 2) + ((row * col) % 3)) % 2 === 0,
];

class Matrix {
  readonly version: number;
  readonly size: number;
  readonly modules: boolean[][];
  readonly reserved: boolean[][];

  constructor(version: number) {
    this.version = version;
    this.size = version * 4 + 17;
    this.modules = Array.from({ length: this.size }, () => new Array<boolean>(this.size).fill(false));
    this.reserved = Array.from({ length: this.size }, () => new Array<boolean>(this.size).fill(false));
  }

  setFunction(row: number, col: number, dark: boolean) {
    if (row < 0 || col < 0 || row >= this.size || col >= this.size) return;
    this.modules[row][col] = dark;
    this.reserved[row][col] = true;
  }
}

function drawFunctionPatterns(matrix: Matrix) {
  const { size } = matrix;

  for (let i = 0; i < size; i++) {
    matrix.setFunction(6, i, i % 2 === 0);
    matrix.setFunction(i, 6, i % 2 === 0);
  }

  for (const [centerRow, centerCol] of [[3, 3], [3, size - 4], [size - 4, 3]]) {
    for (let dRow = -4; dRow <= 4; dRow++) {
      for (let dCol = -4; dCol <= 4; dCol++) {
        const distance = Math.max(Math.abs(dRow), Math.abs(dCol));
        matrix.setFunction(centerRow + dRow, centerCol + dCol, distance !== 2 && distance !== 4);
      }
    }
  }

  const centers = ALIGNMENT_CENTERS[matrix.version];
  for (const centerRow of centers) {
    for (const centerCol of centers) {
      const isFinderCorner =
        (centerRow === 6 && centerCol === 6) ||
        (centerRow === 6 && centerCol === centers[centers.length - 1]) ||
        (centerRow === centers[centers.length - 1] && centerCol === 6);
      if (isFinderCorner) continue;
      for (let dRow = -2; dRow <= 2; dRow++) {
        for (let dCol = -2; dCol <= 2; dCol++) {
          matrix.setFunction(centerRow + dRow, centerCol + dCol, Math.max(Math.abs(dRow), Math.abs(dCol)) !== 1);
        }
      }
    }
  }

  // Reserve the format-information strips with a dummy mask; the real bits are
  // written after masking. This touches exactly the format modules, so it leaves
  // the timing modules at (8,6) and (6,8) intact.
  drawFormatBits(matrix, 0);

  if (matrix.version >= 7) {
    let remainder = matrix.version;
    for (let i = 0; i < 12; i++) remainder = (remainder << 1) ^ ((remainder >>> 11) * 0x1f25);
    const bits = (matrix.version << 12) | remainder;
    for (let i = 0; i < 18; i++) {
      const dark = ((bits >>> i) & 1) === 1;
      const far = size - 11 + (i % 3);
      const near = Math.floor(i / 3);
      matrix.setFunction(near, far, dark);
      matrix.setFunction(far, near, dark);
    }
  }
}

function drawCodewords(matrix: Matrix, codewords: number[]) {
  const bits: number[] = [];
  for (const codeword of codewords) {
    for (let i = 7; i >= 0; i--) bits.push((codeword >>> i) & 1);
  }

  let bitIndex = 0;
  let upward = true;
  for (let right = matrix.size - 1; right >= 1; right -= 2) {
    const rightColumn = right <= 6 ? right - 1 : right;
    for (let step = 0; step < matrix.size; step++) {
      const row = upward ? matrix.size - 1 - step : step;
      for (const col of [rightColumn, rightColumn - 1]) {
        if (matrix.reserved[row][col]) continue;
        matrix.modules[row][col] = (bitIndex < bits.length ? bits[bitIndex] : 0) === 1;
        bitIndex++;
      }
    }
    upward = !upward;
  }
}

function drawFormatBits(matrix: Matrix, mask: number) {
  const data = (EC_LEVEL_M_BITS << 3) | mask;
  let remainder = data;
  for (let i = 0; i < 10; i++) remainder = (remainder << 1) ^ ((remainder >>> 9) * 0x537);
  const bits = ((data << 10) | remainder) ^ 0x5412;
  const bitAt = (index: number) => ((bits >>> index) & 1) === 1;
  const { size } = matrix;

  for (let i = 0; i <= 5; i++) matrix.setFunction(i, 8, bitAt(i));
  matrix.setFunction(7, 8, bitAt(6));
  matrix.setFunction(8, 8, bitAt(7));
  matrix.setFunction(8, 7, bitAt(8));
  for (let i = 9; i < 15; i++) matrix.setFunction(8, 14 - i, bitAt(i));

  for (let i = 0; i < 8; i++) matrix.setFunction(8, size - 1 - i, bitAt(i));
  for (let i = 8; i < 15; i++) matrix.setFunction(size - 15 + i, 8, bitAt(i));
  matrix.setFunction(size - 8, 8, true);
}

function penaltyScore(modules: boolean[][]): number {
  const size = modules.length;
  let score = 0;

  const scoreLine = (line: boolean[]) => {
    let runLength = 1;
    for (let i = 1; i < size; i++) {
      if (line[i] === line[i - 1]) {
        runLength++;
        continue;
      }
      if (runLength >= 5) score += 3 + (runLength - 5);
      runLength = 1;
    }
    if (runLength >= 5) score += 3 + (runLength - 5);

    // Rule 3: finder-like 1:1:3:1:1 sequences surrounded by four light modules.
    for (let i = 0; i + 11 <= size; i++) {
      const window = line.slice(i, i + 11).map((dark) => (dark ? '1' : '0')).join('');
      if (window === '10111010000' || window === '00001011101') score += 40;
    }
  };

  for (let row = 0; row < size; row++) scoreLine(modules[row]);
  for (let col = 0; col < size; col++) scoreLine(modules.map((row) => row[col]));

  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      const first = modules[row][col];
      if (first === modules[row][col + 1] && first === modules[row + 1][col] && first === modules[row + 1][col + 1]) {
        score += 3;
      }
    }
  }

  const darkCount = modules.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
  const darkPercent = (darkCount * 100) / (size * size);
  score += Math.floor(Math.abs(darkPercent - 50) / 5) * 10;

  return score;
}

/** Encodes `text` and returns the module grid (true = dark). */
export function encodeQr(text: string): boolean[][] {
  const data = new TextEncoder().encode(text);
  const version = pickVersion(data.length);
  const codewords = buildCodewords(data, version);

  let best: { modules: boolean[][]; score: number } | null = null;
  for (let mask = 0; mask < 8; mask++) {
    const matrix = new Matrix(version);
    drawFunctionPatterns(matrix);
    drawCodewords(matrix, codewords);
    for (let row = 0; row < matrix.size; row++) {
      for (let col = 0; col < matrix.size; col++) {
        if (matrix.reserved[row][col]) continue;
        if (MASK_PREDICATES[mask](row, col)) matrix.modules[row][col] = !matrix.modules[row][col];
      }
    }
    drawFormatBits(matrix, mask);
    const score = penaltyScore(matrix.modules);
    if (!best || score < best.score) best = { modules: matrix.modules, score };
  }

  return best!.modules;
}

interface QrSvgOptions {
  /** Light modules around the code. The spec requires at least 4. */
  quietZone?: number;
  dark?: string;
  light?: string;
  title?: string;
  className?: string;
}

/** Encodes `text` as a self-contained, resolution-independent SVG string. */
export function renderQrSvg(text: string, options: QrSvgOptions = {}): string {
  const { quietZone = 4, dark = '#1c1a17', light = '#ffffff', title, className } = options;
  const modules = encodeQr(text);
  const size = modules.length;
  const extent = size + quietZone * 2;

  // Merge horizontal runs so the path stays small even at version 10.
  const segments: string[] = [];
  for (let row = 0; row < size; row++) {
    let runStart = -1;
    for (let col = 0; col <= size; col++) {
      const isDark = col < size && modules[row][col];
      if (isDark && runStart === -1) runStart = col;
      if (!isDark && runStart !== -1) {
        segments.push(`M${runStart + quietZone} ${row + quietZone}h${col - runStart}v1h-${col - runStart}z`);
        runStart = -1;
      }
    }
  }

  const titleMarkup = title ? `<title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>` : '';
  const classAttr = className ? ` class="${className}"` : '';

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${extent} ${extent}"${classAttr}` +
    ` role="img" aria-hidden="${title ? 'false' : 'true'}" shape-rendering="crispEdges">` +
    titleMarkup +
    `<rect width="${extent}" height="${extent}" fill="${light}"/>` +
    `<path fill="${dark}" d="${segments.join('')}"/>` +
    `</svg>`
  );
}
