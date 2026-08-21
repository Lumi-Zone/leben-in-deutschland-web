import type { BlogTopic } from './blogTopics';

export interface OfficialBlogSource {
  name: string;
  url: string;
}

const TEST_SOURCES: OfficialBlogSource[] = [
  {
    name: 'BAMF: Einbürgerungstest und offizieller Fragenkatalog',
    url: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html',
  },
  {
    name: 'BAMF: Online-Testcenter für den Einbürgerungstest',
    url: 'https://oet.bamf.de/ords/oetut/f?p=514:1::::::',
  },
];

const CITIZENSHIP_SOURCES: OfficialBlogSource[] = [
  {
    name: 'Bundesministerium der Justiz: Staatsangehörigkeitsgesetz',
    url: 'https://www.gesetze-im-internet.de/stag/BJNR005830913.html',
  },
  TEST_SOURCES[0],
];

const CIVICS_SOURCES: OfficialBlogSource[] = [
  {
    name: 'Bundeszentrale für politische Bildung: Deutsche Demokratie',
    url: 'https://www.bpb.de/themen/politisches-system/deutsche-demokratie/',
  },
  {
    name: 'Bundeszentrale für politische Bildung: Das Grundgesetz',
    url: 'https://www.bpb.de/themen/politisches-system/politik-einfach-fuer-alle/236649/das-grundgesetz-ueber-den-staat/',
  },
];

const INTEGRATION_SOURCES: OfficialBlogSource[] = [
  {
    name: 'BAMF: Informationen zu Integrationskursen',
    url: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html',
  },
  TEST_SOURCES[0],
];

const SOURCE_GROUPS_BY_TOPIC: Record<string, OfficialBlogSource[]> = {
  einbuergerungstest: TEST_SOURCES,
  'lernen-vorbereitung': TEST_SOURCES,
  'pruefung-anmeldung': TEST_SOURCES,
  'einbuergerung-verfahren': CITIZENSHIP_SOURCES,
  'recht-grundgesetz': [...CITIZENSHIP_SOURCES, ...CIVICS_SOURCES],
  'politik-demokratie': CIVICS_SOURCES,
  'gesellschaft-integration': INTEGRATION_SOURCES,
  'sprache-b1': INTEGRATION_SOURCES,
  'kosten-finanzen': CITIZENSHIP_SOURCES,
  'bundeslaender-mehrsprachig': TEST_SOURCES,
};

export function getOfficialBlogSources(topics: BlogTopic[]): OfficialBlogSource[] {
  const sources = topics.flatMap((topic) => SOURCE_GROUPS_BY_TOPIC[topic.slug] ?? []);
  return Array.from(new Map(sources.map((source) => [source.url, source])).values()).slice(0, 4);
}
