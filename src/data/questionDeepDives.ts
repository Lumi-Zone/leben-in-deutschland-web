// Longer, question-specific explanations for the most visited question pages.
// Each entry adds background, why the other options are wrong and a memory tip
// on top of the short text in questionExplanations.ts. Add languages per entry
// as they are written; pages without an entry for their language show only the
// short explanation.

export interface LegalBasis { label: string; url: string }
export interface QuestionDeepDive {
  background: string;
  otherOptions: string;
  memoryTip: string;
  legalBasis: LegalBasis[];
}

type DeepDiveLanguage = 'de' | 'en' | 'tr';

const law = (label: string, path: string): LegalBasis => ({ label, url: `https://www.gesetze-im-internet.de/${path}` });

const deepDives: Record<number, Partial<Record<DeepDiveLanguage, QuestionDeepDive>>> = {
  1: {
    de: {
      background: 'Die Meinungsfreiheit steht in Artikel 5 des Grundgesetzes. Jeder Mensch darf seine Meinung in Wort, Schrift und Bild frei äußern – auch dann, wenn sie der Regierung nicht gefällt. Kritik an Politikerinnen und Politikern, Demonstrationen und kritische Zeitungsartikel gehören deshalb zum normalen Alltag in Deutschland. Grenzen gibt es trotzdem: Beleidigungen, Verleumdungen oder Volksverhetzung sind strafbar. Wer sachlich oder auch scharf kritisiert, ist aber geschützt.',
      otherOptions: 'Religionsfreiheit (Artikel 4) schützt den Glauben, nicht politische Äußerungen. Steuern zu zahlen gibt kein besonderes Recht auf Kritik – die Meinungsfreiheit gilt auch für Menschen ohne Einkommen. Das Wahlrecht ist eine Falle: Es ist ebenfalls ein demokratisches Recht, betrifft aber die Stimmabgabe bei Wahlen und nicht das offene Sprechen.',
      memoryTip: 'Achte auf das Wort „sagen“: Wer etwas sagen darf, hat Meinungsfreiheit.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html')],
    },
  },
  2: {
    de: {
      background: 'Religionsunterricht ist an den meisten öffentlichen Schulen ein ordentliches Schulfach (Artikel 7 Grundgesetz). Weil Religion eine persönliche Gewissensfrage ist, darf aber niemand zur Teilnahme gezwungen werden. Bis zum 14. Geburtstag entscheiden die Eltern, ob ihr Kind teilnimmt. Ab 14 ist ein Kind „religionsmündig“ und entscheidet selbst über seine Religion und damit auch über den Religionsunterricht. Wer nicht teilnimmt, besucht meist ein Ersatzfach wie Ethik oder „Werte und Normen“.',
      otherOptions: 'Geschichte, Politik und Sprachen sind Pflichtfächer. Eltern können ihr Kind davon nicht einfach abmelden, weil der Staat einen Bildungsauftrag hat. Nur beim Religionsunterricht gibt es diese Wahlfreiheit, weil hier die Glaubensfreiheit berührt ist.',
      memoryTip: '14 und Religion gehören zusammen: Mit 14 entscheidet das Kind selbst über seinen Glauben.',
      legalBasis: [law('Art. 7 GG', 'gg/art_7.html'), law('§ 5 Gesetz über die religiöse Kindererziehung', 'kerzg/__5.html')],
    },
  },
  3: {
    de: {
      background: 'Rechtsstaat bedeutet: Das Recht steht über allen – über den Einwohnerinnen und Einwohnern, aber auch über dem Staat selbst. Regierung, Behörden und Polizei dürfen nur handeln, wenn ein Gesetz es erlaubt (Artikel 20 Absatz 3 Grundgesetz). Wer sich von einer Behörde ungerecht behandelt fühlt, kann vor einem unabhängigen Gericht klagen. Das schützt vor Willkür, denn kein Amt und keine Politikerin steht über dem Gesetz.',
      otherOptions: 'Dass der Staat sich nicht an Gesetze halten muss, wäre das Gegenteil eines Rechtsstaats. Gesetze gelten für alle Menschen in Deutschland, nicht nur für Deutsche. Und Gerichte machen keine Gesetze: Das tun die Parlamente (Bundestag, Bundesrat, Landtage). Gerichte wenden die Gesetze an – das nennt man Gewaltenteilung.',
      memoryTip: 'Rechtsstaat = Recht gilt für alle, auch für den Staat.',
      legalBasis: [law('Art. 20 GG', 'gg/art_20.html')],
    },
  },
  4: {
    de: {
      background: 'Die Grundrechte stehen am Anfang des Grundgesetzes in den Artikeln 1 bis 19. Die Meinungsfreiheit (Artikel 5) gehört zu den wichtigsten davon, weil eine Demokratie ohne freie Diskussion nicht funktioniert. Grundrechte schützen die Menschen vor allem vor dem Staat: Er darf sie nur in engen Grenzen und nur durch ein Gesetz einschränken.',
      otherOptions: 'Waffenbesitz ist in Deutschland kein Grundrecht – anders als oft in den USA. Wer eine Waffe besitzen will, braucht eine behördliche Erlaubnis nach dem Waffengesetz. Faustrecht und Selbstjustiz bedeuten, sich mit Gewalt selbst „Recht“ zu verschaffen. Das ist verboten, denn in Deutschland hat nur der Staat das Gewaltmonopol: Polizei und Gerichte setzen das Recht durch.',
      memoryTip: 'Drei Antworten haben mit Gewalt zu tun – das Grundrecht ist die einzige friedliche Antwort.',
      legalBasis: [law('Art. 5 GG', 'gg/art_5.html')],
    },
  },
  5: {
    de: {
      background: 'Für Bundestagswahlen nennt das Grundgesetz fünf Wahlgrundsätze: allgemein, unmittelbar, frei, gleich und geheim (Artikel 38). „Frei“ heißt: Niemand darf Wählerinnen und Wähler unter Druck setzen, bestechen oder bedrohen, und niemand darf wegen seiner Stimme Nachteile haben. Zur freien Wahl gehört auch, dass man gar nicht wählen gehen muss.',
      otherOptions: 'Geld für eine bestimmte Stimme anzunehmen ist Wählerbestechung und strafbar. Auch Menschen, die im Gefängnis waren oder sind, dürfen in der Regel wählen – nur ein Gericht kann das Wahlrecht in seltenen Fällen entziehen. Eine Wahlpflicht gibt es in Deutschland nicht, anders als zum Beispiel in Belgien.',
      memoryTip: 'Die fünf Wahlgrundsätze: allgemein, unmittelbar, frei, gleich, geheim. „Frei“ heißt: ohne Druck und ohne Pflicht.',
      legalBasis: [law('Art. 38 GG', 'gg/art_38.html')],
    },
  },
  6: {
    de: {
      background: 'Die deutsche Verfassung heißt Grundgesetz (GG). Der Parlamentarische Rat hat es in Bonn ausgearbeitet; am 23. Mai 1949 wurde es verkündet. Den Namen „Verfassung“ hat man bewusst vermieden, weil Deutschland damals geteilt war und das Grundgesetz nur vorläufig gelten sollte, bis ganz Deutschland eine Verfassung beschließt. Seit der Wiedervereinigung 1990 gilt das Grundgesetz für ganz Deutschland. Der 23. Mai ist deshalb der „Tag des Grundgesetzes“.',
      otherOptions: 'Ein Bundesgesetz ist ein normales Gesetz, das Bundestag und Bundesrat beschließen, zum Beispiel das Staatsangehörigkeitsgesetz. Es steht unter dem Grundgesetz und darf ihm nicht widersprechen. „Volksgesetz“ und „Deutsches Gesetz“ gibt es nicht.',
      memoryTip: 'Grundgesetz = die Grundlage aller Gesetze. Abkürzung: GG.',
      legalBasis: [law('Art. 146 GG', 'gg/art_146.html')],
    },
  },
  7: {
    de: {
      background: 'Artikel 4 des Grundgesetzes garantiert die Glaubens- und Gewissensfreiheit. Jeder Mensch darf frei entscheiden, ob und woran er glaubt, darf seine Religion ausüben, wechseln oder keine Religion haben. Der Staat ist dabei neutral: Es gibt keine Staatskirche, und niemand darf wegen seines Glaubens benachteiligt werden. Zur Gewissensfreiheit gehört auch das Recht, den Kriegsdienst mit der Waffe zu verweigern.',
      otherOptions: 'Ein Recht auf Arbeit, auf Wohnung oder auf Unterhaltung steht nicht im Grundgesetz. Es gibt die Berufsfreiheit (Artikel 12): Man darf seinen Beruf frei wählen – der Staat muss aber keinen Arbeitsplatz garantieren. Einige Landesverfassungen nennen Arbeit oder Wohnung als Staatsziel, einklagbare Grundrechte sind das jedoch nicht.',
      memoryTip: 'Grundrechte sind meistens Freiheiten („frei glauben, frei sagen“), keine Ansprüche auf Dinge wie Wohnung oder Arbeit.',
      legalBasis: [law('Art. 4 GG', 'gg/art_4.html')],
    },
  },
  8: {
    de: {
      background: 'Die drei richtigen Sätze stammen fast wörtlich aus dem Grundgesetz: „Die Würde des Menschen ist unantastbar“ (Artikel 1), „Alle Menschen sind vor dem Gesetz gleich“ (Artikel 3) und die Meinungsfreiheit (Artikel 5). Deutschland ist zwar ein Sozialstaat (Artikel 20): Er hilft Menschen in Not, etwa mit Bürgergeld oder Krankenversicherung. Gleiches Einkommen für alle verspricht das Grundgesetz aber nicht.',
      otherOptions: '„Alle sollen gleich viel Geld haben“ beschreibt eine Idee, die es im Grundgesetz nicht gibt. In Deutschland gelten Eigentum (Artikel 14) und Berufsfreiheit; Einkommen dürfen unterschiedlich sein. Gleichheit bedeutet im Grundgesetz gleiche Rechte, nicht gleiches Geld.',
      memoryTip: 'Gleich vor dem Gesetz – ja. Gleich viel Geld – nein.',
      legalBasis: [law('Art. 1 GG', 'gg/art_1.html'), law('Art. 3 GG', 'gg/art_3.html')],
    },
  },
  9: {
    de: {
      background: 'Artikel 16a des Grundgesetzes sagt: „Politisch Verfolgte genießen Asylrecht.“ Asyl schützt Menschen, die in ihrem Herkunftsland wegen ihrer politischen Meinung, Religion oder Herkunft verfolgt werden. Deutsche brauchen diesen Schutz in Deutschland nicht – deshalb gilt das Asylrecht nur für Ausländerinnen und Ausländer. In der Praxis erhalten viele Geflüchtete Schutz auch nach der Genfer Flüchtlingskonvention.',
      otherOptions: 'Menschenwürde (Artikel 1), Schutz der Familie (Artikel 6) und Meinungsfreiheit (Artikel 5) sind Menschenrechte: Sie gelten für alle Menschen in Deutschland, egal welche Staatsangehörigkeit sie haben. Umgekehrt gibt es einige Rechte nur für Deutsche, zum Beispiel die Versammlungsfreiheit nach Artikel 8.',
      memoryTip: 'Asyl ist Schutz vor Verfolgung im Herkunftsland – den brauchen nur Menschen aus anderen Ländern.',
      legalBasis: [law('Art. 16a GG', 'gg/art_16a.html')],
    },
  },
  10: {
    de: {
      background: 'Eine Geldstrafe ist eine ganz normale Strafe im deutschen Strafrecht: Ein Gericht verurteilt eine Person dazu, eine bestimmte Summe zu zahlen. Das ist mit dem Grundgesetz vereinbar. Die Todesstrafe hat das Grundgesetz dagegen ausdrücklich abgeschafft (Artikel 102: „Die Todesstrafe ist abgeschafft.“). Grundlage ist die Menschenwürde in Artikel 1, die der Staat immer achten muss.',
      otherOptions: 'Folter verletzt die Menschenwürde und ist ausnahmslos verboten, auch bei Verdacht auf schwere Straftaten. Festgehaltene Personen dürfen weder seelisch noch körperlich misshandelt werden (Artikel 104). Prügelstrafen gibt es in Deutschland nicht; auch Eltern dürfen ihre Kinder nicht schlagen.',
      memoryTip: 'Nur eine Antwort tut niemandem körperlich weh: die Geldstrafe.',
      legalBasis: [law('Art. 102 GG', 'gg/art_102.html'), law('Art. 1 GG', 'gg/art_1.html')],
    },
  },
};

export const deepDiveLabels: Record<DeepDiveLanguage, { background: string; otherOptions: string; memoryTip: string; legalBasis: string }> = {
  de: { background: 'Hintergrund', otherOptions: 'Warum sind die anderen Antworten falsch?', memoryTip: 'Merkhilfe', legalBasis: 'Gesetzliche Grundlage' },
  en: { background: 'Background', otherOptions: 'Why are the other answers wrong?', memoryTip: 'Memory tip', legalBasis: 'Legal basis' },
  tr: { background: 'Arka plan', otherOptions: 'Diğer cevaplar neden yanlış?', memoryTip: 'Akılda tutma ipucu', legalBasis: 'Yasal dayanak' },
};

export function getQuestionDeepDive(id: number, lang: string): QuestionDeepDive | undefined {
  if (lang !== 'de' && lang !== 'en' && lang !== 'tr') return undefined;
  return deepDives[id]?.[lang];
}
