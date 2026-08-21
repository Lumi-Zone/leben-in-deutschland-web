import { normalizeKeyword } from '../utils/blog';

export interface BlogTopic {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const BLOG_TOPICS: BlogTopic[] = [
  {
    slug: 'einbuergerungstest',
    name: 'Einbürgerungstest',
    description: 'Prüfungsaufbau, BAMF-Fragen, Bestehensgrenze und Testablauf verständlich erklärt.',
    keywords: ['Einbürgerungstest', 'Leben in Deutschland', 'BAMF', 'Test', 'Wissen', 'Zertifikat', 'Teststruktur', 'Fragenkatalog', '300 Fragen', 'Originalfragen', '17 richtige Antworten', 'Dauer', '60 Minuten'],
  },
  {
    slug: 'lernen-vorbereitung',
    name: 'Lernen & Vorbereitung',
    description: 'Lernpläne, Prüfungstipps und Strategien für eine sichere Testvorbereitung.',
    keywords: ['Lernen', 'Vorbereitung', 'Tipps', 'Schnell lernen', '7 Tage Plan', 'Schwierige Fragen', 'Analyse', 'Fehler vermeiden', 'Prüfungstag', 'Zeitmanagement', 'Bestehen', 'Wiederholung', 'Durchgefallen'],
  },
  {
    slug: 'pruefung-anmeldung',
    name: 'Prüfung & Anmeldung',
    description: 'Anmeldung, Termine, Prüfstellen und organisatorische Fragen rund um den Test.',
    keywords: ['Prüfung', 'Anmeldung', 'Organisation', 'Prüfstelle', 'Wartezeit', 'Prüfungssimulation'],
  },
  {
    slug: 'einbuergerung-verfahren',
    name: 'Einbürgerung & Verfahren',
    description: 'Voraussetzungen, Antrag, Unterlagen und Ablauf der Einbürgerung in Deutschland.',
    keywords: ['Einbürgerung', 'Antrag', 'Voraussetzungen', 'Bearbeitungszeit', 'Behörde', 'Aufenthaltstitel', 'Aufenthalt', 'Dokumente', 'Checkliste', 'Familie', 'Kinder', 'Reisen', 'Staatsbürgerschaft'],
  },
  {
    slug: 'recht-grundgesetz',
    name: 'Recht & Grundgesetz',
    description: 'Grundrechte, Verfassung sowie Rechte und Pflichten in Deutschland.',
    keywords: ['Recht', 'Grundgesetz', 'Verfassung', 'Grundrechte', 'Pflichten', 'Meinungsfreiheit', 'Freiheit', 'Doppelte Staatsbürgerschaft'],
  },
  {
    slug: 'politik-demokratie',
    name: 'Politik & Demokratie',
    description: 'Wahlen, Parteien, Bundestag, Ämter und demokratische Institutionen einfach erklärt.',
    keywords: ['Politik', 'Demokratie', 'Wahlen', 'Parteien', 'Bundestag', 'Ämter', 'Europa', 'EU', 'Föderalismus', 'News'],
  },
  {
    slug: 'gesellschaft-integration',
    name: 'Gesellschaft & Integration',
    description: 'Gesellschaft, Religion, soziale Sicherung und Integration in Deutschland.',
    keywords: ['Gesellschaft', 'Religion', 'Religionsfreiheit', 'Soziales', 'Versicherung', 'Integration', 'Integrationskurs', 'Orientierungskurs', 'Kurs', 'Leben'],
  },
  {
    slug: 'sprache-b1',
    name: 'Sprache & B1',
    description: 'Sprachanforderungen, B1-Nachweis und sprachliche Vorbereitung auf die Einbürgerung.',
    keywords: ['Sprache', 'B1'],
  },
  {
    slug: 'kosten-finanzen',
    name: 'Kosten & Finanzen',
    description: 'Gebühren, Kosten, Lebensunterhalt und finanzielle Fragen zur Einbürgerung.',
    keywords: ['Kosten', 'Gebühren', 'Finanzen', 'Bürgergeld', 'Lebensunterhalt'],
  },
  {
    slug: 'bundeslaender-mehrsprachig',
    name: 'Bundesländer & Sprachen',
    description: 'Bundesland-Fragen und mehrsprachige Erklärungen zum Einbürgerungstest.',
    keywords: ['Bundesländer', 'Bundesland-Fragen', 'Geografie', 'Türkisch', 'Türkçe', 'Russisch', 'Arabisch', 'Ukrainisch'],
  },
];

export const BLOG_TOPIC_ALIASES = Array.from(
  new Map(
    BLOG_TOPICS.flatMap((topic) =>
      topic.keywords.map((keyword) => [normalizeKeyword(keyword), topic.slug] as const)
    ).filter(([alias, topicSlug]) => alias !== topicSlug)
  ).entries()
).map(([slug, topicSlug]) => ({ slug, topicSlug }));

const topicBySlug = new Map(BLOG_TOPICS.map((topic) => [topic.slug, topic]));
const normalizedKeywordsByTopic = new Map(
  BLOG_TOPICS.map((topic) => [topic.slug, new Set(topic.keywords.map(normalizeKeyword))])
);

export function getBlogTopicBySlug(slug: string): BlogTopic | undefined {
  return topicBySlug.get(slug);
}

export function getBlogTopicsForTags(tags: string[] = []): BlogTopic[] {
  const normalizedTags = new Set(tags.map(normalizeKeyword));
  return BLOG_TOPICS.filter((topic) => {
    const topicKeywords = normalizedKeywordsByTopic.get(topic.slug);
    return topicKeywords && Array.from(normalizedTags).some((tag) => topicKeywords.has(tag));
  });
}
