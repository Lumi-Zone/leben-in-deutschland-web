import { existsSync } from 'node:fs';
import { join } from 'node:path';

const BLOG_FALLBACK_IMAGES = {
  legal:
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
  politics:
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1600&q=80',
  learning:
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80',
  citizenship:
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
  finance:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
  society:
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80',
  germany:
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80',
};

const topicRules: Array<{ match: string[]; key: keyof typeof BLOG_FALLBACK_IMAGES }> = [
  { key: 'legal', match: ['recht', 'grundgesetz', 'verfassung', 'pflicht', 'freiheit'] },
  { key: 'politics', match: ['politik', 'partei', 'wahl', 'bundestag', 'kanzler', 'prasident', 'eu'] },
  { key: 'learning', match: ['lernen', 'vorbereitung', 'test', 'frage', 'prufung', 'kurs', 'sprache'] },
  { key: 'citizenship', match: ['einburgerung', 'staatsburgerschaft', 'aufenthalt', 'reisen', 'pass'] },
  { key: 'finance', match: ['kosten', 'gebuhren', 'finanzen'] },
  { key: 'society', match: ['gesellschaft', 'religion', 'soziales', 'integration'] },
];

const toPublicPath = (value: string) => (value.startsWith('/') ? value.slice(1) : value);

const hasPublicAsset = (path: string) => existsSync(join(process.cwd(), 'public', toPublicPath(path)));

export const normalizeKeyword = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getFallbackImageByTags = (tags: string[] = []) => {
  const normalized = tags.map((tag) => normalizeKeyword(tag));

  for (const rule of topicRules) {
    if (normalized.some((keyword) => rule.match.some((token) => keyword.includes(token)))) {
      return BLOG_FALLBACK_IMAGES[rule.key];
    }
  }

  return BLOG_FALLBACK_IMAGES.germany;
};

export function resolveBlogImage(post: { data: { image?: string; tags?: string[] } }): string {
  const image = post.data.image;

  if (image) {
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    if (hasPublicAsset(image)) return image;
  }

  return getFallbackImageByTags(post.data.tags);
}

export function getBlogImageAlt(postTitle: string): string {
  return `${postTitle} - Blogfoto`;
}

export function getReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
