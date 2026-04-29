import { toSlug } from '../utils/blog';

export interface BlogAuthorProfile {
  name: string;
  slug: string;
  role: string;
  bio: string;
}

const authorProfiles: BlogAuthorProfile[] = [
  {
    name: 'Leben in Deutschland Team',
    slug: toSlug('Leben in Deutschland Team'),
    role: 'Redaktion',
    bio: 'Das Team erstellt praxisnahe Leitfäden zur Vorbereitung auf den Einbürgerungstest und zum Leben in Deutschland.',
  },
  {
    name: 'Rechtsredaktion',
    slug: toSlug('Rechtsredaktion'),
    role: 'Recht & Verfahren',
    bio: 'Die Rechtsredaktion bereitet gesetzliche Grundlagen verständlich auf und achtet auf belastbare Quellen und aktuelle Regelungen.',
  },
  {
    name: 'Lern-Coach Team',
    slug: toSlug('Lern-Coach Team'),
    role: 'Didaktik',
    bio: 'Das Lern-Coach Team entwickelt strukturierte Lernstrategien, damit komplexe Inhalte effizienter verstanden und behalten werden.',
  },
  {
    name: 'Redaktion',
    slug: toSlug('Redaktion'),
    role: 'Content',
    bio: 'Die Redaktion fasst wichtige Einbürgerungs- und Prüfungsthemen kompakt zusammen und aktualisiert Inhalte kontinuierlich.',
  },
  {
    name: 'Redaktion LiD',
    slug: toSlug('Redaktion LiD'),
    role: 'Integrationswissen',
    bio: 'Die Redaktion LiD fokussiert auf Integrationskurs, Sprache und alltagsnahe Orientierung rund um den Test.',
  },
  {
    name: 'Rechtsberatung Team',
    slug: toSlug('Rechtsberatung Team'),
    role: 'Beratung',
    bio: 'Das Rechtsberatung Team erklärt häufige Fallkonstellationen rund um Aufenthaltsstatus, Fristen und Behördenverfahren.',
  },
];

const authorByName = new Map(authorProfiles.map((author) => [author.name, author]));
const authorBySlug = new Map(authorProfiles.map((author) => [author.slug, author]));

export function getAuthorByName(name: string): BlogAuthorProfile {
  return (
    authorByName.get(name) ?? {
      name,
      slug: toSlug(name),
      role: 'Autor',
      bio: 'Autor dieser Beitragsreihe rund um Einbürgerung, Testvorbereitung und Leben in Deutschland.',
    }
  );
}

export function getAuthorBySlug(slug: string): BlogAuthorProfile | undefined {
  return authorBySlug.get(slug);
}

export function getAllAuthors(): BlogAuthorProfile[] {
  return authorProfiles;
}
