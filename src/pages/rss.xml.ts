import { getCollection } from 'astro:content';
import { getPath } from '../utils/navigation';
import { resolveBlogImage } from '../utils/blog';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export async function GET({ site }: { site: URL | undefined }) {
  const baseUrl = site ?? new URL('https://lumi-zone.github.io');
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const itemsXml = posts
    .map((post) => {
      const link = new URL(getPath(`de/blog/${post.slug}`), baseUrl).href;
      const image = resolveBlogImage(post);
      const imageUrl = image.startsWith('http://') || image.startsWith('https://')
        ? image
        : new URL(image, baseUrl).href;
      return `
  <item>
    <title>${escapeXml(post.data.title)}</title>
    <link>${link}</link>
    <guid>${link}</guid>
    <description>${escapeXml(post.data.description)}</description>
    <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" />
    <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
  </item>`;
    })
    .join('');

  const channelLink = new URL(getPath('de/blog'), baseUrl).href;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Leben in Deutschland Blog</title>
  <link>${channelLink}</link>
  <description>Aktuelle Artikel und Tipps rund um den Einbuergerungstest</description>${itemsXml}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
