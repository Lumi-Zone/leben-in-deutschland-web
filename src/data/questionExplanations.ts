import { BAMF_QUESTION_CATALOG } from './seoLandingContent';

type ExplanationLanguage = 'de' | 'en' | 'tr';
interface ExplanationText { summary: string; whyCorrect: string }
export interface QuestionExplanation extends ExplanationText {
  sourceName: string;
  sourceUrl: string;
  reviewedAt: string;
  isFallback: boolean;
}

const texts: Record<number, Record<ExplanationLanguage, ExplanationText>> = {
  1: {
    de: { summary: 'Kritik an der Regierung ist grundsätzlich erlaubt.', whyCorrect: 'Die Meinungsfreiheit schützt das Recht, politische Ansichten offen zu äußern. Gesetzliche Grenzen, etwa zum Schutz anderer Personen, bleiben bestehen.' },
    en: { summary: 'People are generally allowed to criticise the government.', whyCorrect: 'Freedom of expression protects the open communication of political opinions, subject to legal limits that protect other people.' },
    tr: { summary: 'İnsanlar genel olarak hükümeti açıkça eleştirebilir.', whyCorrect: 'İfade özgürlüğü siyasi görüşleri açıkça söyleme hakkını korur. Başkalarını koruyan yasal sınırlar yine geçerlidir.' },
  },
  2: {
    de: { summary: 'Eltern entscheiden bis zum 14. Lebensjahr über die Teilnahme am Religionsunterricht.', whyCorrect: 'Die Frage betrifft die religiöse Erziehung des Kindes; deshalb ist Religionsunterricht die passende Antwort.' },
    en: { summary: 'Parents decide on participation in religious education until the child is 14.', whyCorrect: 'The rule concerns the child’s religious upbringing, so religious education is the relevant school subject.' },
    tr: { summary: 'Çocuk 14 yaşına gelene kadar din dersine katılım konusunda ebeveynler karar verir.', whyCorrect: 'Kural çocuğun dinî eğitimiyle ilgilidir; bu nedenle doğru seçenek din dersidir.' },
  },
  3: {
    de: { summary: 'Im Rechtsstaat sind auch staatliche Stellen an das Gesetz gebunden.', whyCorrect: 'Rechtsstaatlichkeit bedeutet, dass Einwohner und Staat nicht willkürlich handeln dürfen, sondern geltendes Recht beachten müssen.' },
    en: { summary: 'In a state governed by law, public authorities are also bound by the law.', whyCorrect: 'The rule of law means that residents and the state must follow the applicable law rather than act arbitrarily.' },
    tr: { summary: 'Hukuk devletinde resmî makamlar da yasalara bağlıdır.', whyCorrect: 'Hukuk devleti, hem insanların hem de devletin keyfî davranmayıp yürürlükteki yasalara uyması demektir.' },
  },
  4: {
    de: { summary: 'Die Meinungsfreiheit ist ein Grundrecht.', whyCorrect: 'Sie ist im Grundgesetz geschützt; Waffenbesitz, Faustrecht und Selbstjustiz sind keine Grundrechte.' },
    en: { summary: 'Freedom of expression is a fundamental right.', whyCorrect: 'It is protected by the Basic Law; possessing weapons, vigilante force and taking the law into one’s own hands are not fundamental rights.' },
    tr: { summary: 'İfade özgürlüğü temel bir haktır.', whyCorrect: 'Bu hak Anayasa tarafından korunur; silah sahibi olmak, kaba kuvvet ve kendi adaletini uygulamak temel hak değildir.' },
  },
  5: {
    de: { summary: 'Eine freie Wahl darf ohne Zwang oder Nachteile getroffen werden.', whyCorrect: 'Wählende müssen ihre Entscheidung selbst treffen können und dürfen weder beeinflusst noch zu einer bestimmten Stimme gezwungen werden.' },
    en: { summary: 'A free election allows a choice without coercion or disadvantage.', whyCorrect: 'Voters must make their own decision and may not be forced or improperly influenced to cast a particular vote.' },
    tr: { summary: 'Özgür seçim, baskı veya olumsuz sonuç korkusu olmadan tercih yapabilmektir.', whyCorrect: 'Seçmen kararını kendisi verebilmeli; belirli bir oya zorlanmamalı veya uygunsuz biçimde etkilenmemelidir.' },
  },
  6: {
    de: { summary: 'Die deutsche Verfassung heißt Grundgesetz.', whyCorrect: '„Grundgesetz für die Bundesrepublik Deutschland“ ist der offizielle Name der Verfassung.' },
    en: { summary: 'Germany’s constitution is called the Basic Law.', whyCorrect: '“Basic Law for the Federal Republic of Germany” is the constitution’s official name.' },
    tr: { summary: 'Almanya Anayasasının adı Grundgesetz’dir.', whyCorrect: '“Almanya Federal Cumhuriyeti Temel Yasası” anayasanın resmî adıdır.' },
  },
  7: {
    de: { summary: 'Glaubens- und Gewissensfreiheit ist verfassungsrechtlich geschützt.', whyCorrect: 'Sie gehört zu den im Grundgesetz garantierten Grundrechten; Unterhaltung, Arbeit und Wohnung sind hier nicht die gesuchte Garantie.' },
    en: { summary: 'Freedom of faith and conscience is constitutionally protected.', whyCorrect: 'It is one of the fundamental rights guaranteed by the Basic Law; entertainment, work and housing are not the guarantee asked for here.' },
    tr: { summary: 'İnanç ve vicdan özgürlüğü anayasal koruma altındadır.', whyCorrect: 'Bu, Temel Yasa’nın güvence altına aldığı temel haklardan biridir; eğlence, iş ve konut burada sorulan güvence değildir.' },
  },
  8: {
    de: { summary: 'Das Grundgesetz garantiert nicht, dass alle gleich viel Geld haben.', whyCorrect: 'Es schützt Menschenwürde, Meinungsfreiheit und Gleichheit vor dem Gesetz, schreibt aber keine gleichen Einkommen vor.' },
    en: { summary: 'The Basic Law does not guarantee that everyone has the same amount of money.', whyCorrect: 'It protects human dignity, expression and equality before the law, but it does not prescribe equal incomes.' },
    tr: { summary: 'Temel Yasa herkesin aynı miktarda paraya sahip olmasını garanti etmez.', whyCorrect: 'İnsan onurunu, ifade özgürlüğünü ve yasa önünde eşitliği korur; fakat herkes için eşit gelir öngörmez.' },
  },
  9: {
    de: { summary: 'Das Asylgrundrecht richtet sich an politisch verfolgte Ausländerinnen und Ausländer.', whyCorrect: 'Menschenwürde, Familien- und Meinungsfreiheit gelten allgemein; Asyl betrifft den Schutz ausländischer Verfolgter.' },
    en: { summary: 'The constitutional right of asylum concerns foreign nationals facing political persecution.', whyCorrect: 'Human dignity and the freedoms of family and expression apply generally, while asylum concerns protection for persecuted foreigners.' },
    tr: { summary: 'Anayasal sığınma hakkı siyasi zulüm gören yabancılarla ilgilidir.', whyCorrect: 'İnsan onuru, aile ve ifade özgürlüğü genel haklardır; sığınma ise zulüm gören yabancıların korunmasına yöneliktir.' },
  },
  10: {
    de: { summary: 'Eine Geldstrafe ist mit dem Grundgesetz vereinbar.', whyCorrect: 'Sie ist eine gesetzlich vorgesehene Sanktion. Prügelstrafe, Folter und Todesstrafe verletzen fundamentale verfassungsrechtliche Schutzstandards.' },
    en: { summary: 'A fine is compatible with the Basic Law.', whyCorrect: 'It is a sanction provided by law. Corporal punishment, torture and the death penalty violate fundamental constitutional protections.' },
    tr: { summary: 'Para cezası Temel Yasa ile bağdaşır.', whyCorrect: 'Yasada öngörülen bir yaptırımdır. Dayak, işkence ve ölüm cezası temel anayasal korumalara aykırıdır.' },
  },
  11: {
    de: { summary: 'Die Verfassung der Bundesrepublik heißt Grundgesetz.', whyCorrect: 'Andere Begriffe wie Bundesverfassung oder Verfassungsvertrag sind nicht der offizielle Name.' },
    en: { summary: 'The constitution of the Federal Republic is called the Basic Law.', whyCorrect: 'Terms such as federal constitution or constitutional treaty are not its official name.' },
    tr: { summary: 'Federal Almanya Cumhuriyeti Anayasasının adı Grundgesetz’dir.', whyCorrect: 'Federal anayasa veya anayasa sözleşmesi gibi ifadeler resmî ad değildir.' },
  },
  12: {
    de: { summary: 'Eine Partei kann die Pressefreiheit nicht einfach abschaffen.', whyCorrect: 'Die Pressefreiheit ist als Grundrecht geschützt; eine einfache politische Mehrheit darf diesen Schutz nicht beseitigen.' },
    en: { summary: 'A political party cannot simply abolish freedom of the press.', whyCorrect: 'Freedom of the press is protected as a fundamental right and cannot be removed by an ordinary political majority.' },
    tr: { summary: 'Bir siyasi parti basın özgürlüğünü kolayca ortadan kaldıramaz.', whyCorrect: 'Basın özgürlüğü temel hak olarak korunur; sıradan bir siyasi çoğunluk bu korumayı kaldıramaz.' },
  },
  13: {
    de: { summary: 'Zur Opposition gehören die Abgeordneten außerhalb der Regierungsparteien.', whyCorrect: 'Sie kontrollieren und kritisieren die Regierung parlamentarisch und bieten politische Alternativen an.' },
    en: { summary: 'The opposition consists of members of parliament outside the governing parties.', whyCorrect: 'They scrutinise and criticise the government in parliament and offer political alternatives.' },
    tr: { summary: 'Muhalefet, hükümet partilerine bağlı olmayan milletvekillerinden oluşur.', whyCorrect: 'Hükümeti parlamentoda denetler, eleştirir ve siyasi alternatifler sunarlar.' },
  },
  14: {
    de: { summary: 'Eine Meinung darf grundsätzlich auch im Internet geäußert werden.', whyCorrect: 'Meinungsfreiheit gilt unabhängig vom Medium; strafbare Inhalte und Verletzungen fremder Rechte bleiben begrenzt.' },
    en: { summary: 'An opinion may generally also be expressed online.', whyCorrect: 'Freedom of expression applies regardless of the medium, while illegal content and violations of others’ rights remain restricted.' },
    tr: { summary: 'Bir görüş genel olarak internette de ifade edilebilir.', whyCorrect: 'İfade özgürlüğü kullanılan araca bağlı değildir; suç oluşturan içerikler ve başkalarının haklarını ihlal eden ifadeler sınırlıdır.' },
  },
  15: {
    de: { summary: 'Das Grundgesetz verbietet Zwangsarbeit.', whyCorrect: 'Menschen dürfen nicht allgemein zur Arbeit gezwungen werden; freie Berufswahl und Arbeit im Ausland sind nicht das gesuchte Verbot.' },
    en: { summary: 'The Basic Law prohibits forced labour.', whyCorrect: 'People may not generally be compelled to work; free choice of occupation and working abroad are not the prohibition asked for.' },
    tr: { summary: 'Temel Yasa zorla çalıştırmayı yasaklar.', whyCorrect: 'İnsanlar genel olarak çalışmaya zorlanamaz; meslek seçimi ve yurt dışında çalışma burada sorulan yasak değildir.' },
  },
  16: {
    de: { summary: 'Bewusst falsche Tatsachenbehauptungen über Personen können begrenzt werden.', whyCorrect: 'Meinungsfreiheit schützt Kritik und Werturteile, aber nicht jede unwahre Behauptung, die Persönlichkeitsrechte verletzt.' },
    en: { summary: 'False factual claims about individuals may be restricted.', whyCorrect: 'Freedom of expression protects criticism and opinions, but not every untrue assertion that violates personality rights.' },
    tr: { summary: 'Kişiler hakkında yanlış olgusal iddialar sınırlandırılabilir.', whyCorrect: 'İfade özgürlüğü eleştiri ve görüşleri korur; kişilik haklarını ihlal eden her yanlış iddiayı korumaz.' },
  },
  17: {
    de: { summary: 'Der Staat darf Bürgerinnen und Bürger nicht willkürlich ungleich behandeln.', whyCorrect: 'Der Gleichheitsgrundsatz bindet staatliches Handeln; Petitionen, Meinungs- und Versammlungsfreiheit sind dagegen geschützte Rechte.' },
    en: { summary: 'The state may not arbitrarily treat citizens unequally.', whyCorrect: 'The equality principle binds state action, while petitions and the freedoms of expression and assembly are protected rights.' },
    tr: { summary: 'Devlet vatandaşlara keyfî biçimde eşitsiz davranamaz.', whyCorrect: 'Eşitlik ilkesi devlet işlemlerini bağlar; dilekçe, ifade ve toplantı özgürlüğü ise korunan haklardır.' },
  },
  18: {
    de: { summary: 'Artikel 1 schützt die Unantastbarkeit der Menschenwürde.', whyCorrect: 'Die Menschenwürde steht am Anfang des Grundgesetzes und verpflichtet alle staatliche Gewalt, sie zu achten und zu schützen.' },
    en: { summary: 'Article 1 protects the inviolability of human dignity.', whyCorrect: 'Human dignity appears at the beginning of the Basic Law and binds all public authority to respect and protect it.' },
    tr: { summary: 'Temel Yasa’nın 1. maddesi insan onurunun dokunulmazlığını korur.', whyCorrect: 'İnsan onuru anayasanın başında yer alır ve tüm devlet gücünü ona saygı gösterip korumakla yükümlü kılar.' },
  },
  19: {
    de: { summary: 'Freizügigkeit bedeutet, den Wohnort innerhalb Deutschlands selbst wählen zu dürfen.', whyCorrect: 'Das Recht betrifft die räumliche Bewegungs- und Niederlassungsfreiheit, nicht Beruf, Religion oder Kleidung.' },
    en: { summary: 'Freedom of movement includes choosing where to live within Germany.', whyCorrect: 'The right concerns movement and residence, not occupation, religion or clothing.' },
    tr: { summary: 'Yerleşme özgürlüğü, Almanya içinde yaşayacağınız yeri seçebilmenizdir.', whyCorrect: 'Bu hak hareket ve ikametle ilgilidir; meslek, din veya kıyafetle ilgili değildir.' },
  },
  20: {
    de: { summary: 'Eine Partei mit dem Ziel einer Diktatur handelt verfassungswidrig.', whyCorrect: 'Die freiheitliche demokratische Grundordnung schließt die Abschaffung der Demokratie zugunsten einer Diktatur aus.' },
    en: { summary: 'A party seeking to establish a dictatorship acts against the constitution.', whyCorrect: 'The free democratic constitutional order excludes replacing democracy with dictatorship.' },
    tr: { summary: 'Diktatörlük kurmayı hedefleyen bir parti anayasaya aykırı hareket eder.', whyCorrect: 'Özgür demokratik anayasal düzen, demokrasinin diktatörlükle değiştirilmesini dışlar.' },
  },
  21: {
    de: { summary: 'Bild 1 zeigt das Bundeswappen.', whyCorrect: 'Das Bundeswappen ist der schwarze Bundesadler auf goldenem Grund; in der Bildfrage entspricht das der Nummer 1.' },
    en: { summary: 'Image 1 shows the federal coat of arms.', whyCorrect: 'The federal coat of arms is the black federal eagle on a gold background; in this image question that is number 1.' },
    tr: { summary: '1 numaralı görsel Federal Almanya armasını gösterir.', whyCorrect: 'Federal arma altın zemin üzerindeki siyah federal kartaldır; görsel soruda bu 1 numaradır.' },
  },
  22: {
    de: { summary: 'Deutschland ist eine Republik.', whyCorrect: 'Das Staatsoberhaupt wird nicht erblich bestimmt; Deutschland ist weder Monarchie noch Fürstentum oder Diktatur.' },
    en: { summary: 'Germany is a republic.', whyCorrect: 'The head of state is not hereditary; Germany is not a monarchy, principality or dictatorship.' },
    tr: { summary: 'Almanya bir cumhuriyettir.', whyCorrect: 'Devlet başkanlığı kalıtsal değildir; Almanya monarşi, prenslik veya diktatörlük değildir.' },
  },
  23: {
    de: { summary: 'Die meisten Erwerbstätigen arbeiten abhängig beschäftigt.', whyCorrect: 'Sie sind überwiegend bei Unternehmen oder Behörden angestellt, nicht selbständig oder ehrenamtlich tätig.' },
    en: { summary: 'Most working people are employees.', whyCorrect: 'Most work for a company or public authority rather than being self-employed or working voluntarily.' },
    tr: { summary: 'Çalışanların çoğu ücretli çalışan statüsündedir.', whyCorrect: 'Çoğunluk bir şirket veya resmî kurumda çalışır; serbest çalışan ya da gönüllü değildir.' },
  },
  24: {
    de: { summary: 'Die Bundesrepublik Deutschland hat 16 Bundesländer.', whyCorrect: 'Dazu gehören 13 Flächenländer und die drei Stadtstaaten Berlin, Bremen und Hamburg.' },
    en: { summary: 'The Federal Republic of Germany has 16 federal states.', whyCorrect: 'They include 13 territorial states and the three city states Berlin, Bremen and Hamburg.' },
    tr: { summary: 'Almanya Federal Cumhuriyeti 16 eyaletten oluşur.', whyCorrect: 'Bunlar 13 bölgesel eyalet ile Berlin, Bremen ve Hamburg şehir eyaletleridir.' },
  },
  25: {
    de: { summary: 'Elsass-Lothringen ist kein deutsches Bundesland.', whyCorrect: 'Die Region liegt heute in Frankreich; Nordrhein-Westfalen, Mecklenburg-Vorpommern und Sachsen-Anhalt sind Bundesländer.' },
    en: { summary: 'Alsace-Lorraine is not a German federal state.', whyCorrect: 'The region is in present-day France; North Rhine-Westphalia, Mecklenburg-Western Pomerania and Saxony-Anhalt are German states.' },
    tr: { summary: 'Alsace-Lorraine Almanya’nın bir eyaleti değildir.', whyCorrect: 'Bölge bugün Fransa’dadır; Kuzey Ren-Vestfalya, Mecklenburg-Vorpommern ve Saksonya-Anhalt Alman eyaletleridir.' },
  },
  26: {
    de: { summary: 'Deutschland ist ein demokratischer und sozialer Bundesstaat.', whyCorrect: 'Diese Staatsprinzipien sind im Grundgesetz verankert: Demokratie, Sozialstaatlichkeit und föderaler Aufbau.' },
    en: { summary: 'Germany is a democratic and social federal state.', whyCorrect: 'These constitutional principles combine democracy, the social state and a federal structure.' },
    tr: { summary: 'Almanya demokratik ve sosyal bir federal devlettir.', whyCorrect: 'Bu anayasal ilkeler demokrasi, sosyal devlet ve federal yapıyı bir araya getirir.' },
  },
  27: {
    de: { summary: 'Deutschland ist ein Bundesstaat.', whyCorrect: 'Staatliche Aufgaben sind zwischen Bund und 16 Ländern verteilt; Deutschland ist keine Monarchie, Diktatur oder sozialistischer Einheitsstaat.' },
    en: { summary: 'Germany is a federal state.', whyCorrect: 'Public responsibilities are divided between the federation and 16 states; Germany is not a monarchy, dictatorship or socialist unitary state.' },
    tr: { summary: 'Almanya federal bir devlettir.', whyCorrect: 'Devlet görevleri federal yönetim ile 16 eyalet arasında paylaşılır; Almanya monarşi, diktatörlük veya sosyalist üniter devlet değildir.' },
  },
  28: {
    de: { summary: 'Die wahlberechtigte Bevölkerung wählt die Bundestagsabgeordneten.', whyCorrect: 'In der repräsentativen Demokratie geben die Wahlberechtigten ihre Stimmen bei der Bundestagswahl ab.' },
    en: { summary: 'Eligible voters elect the members of the Bundestag.', whyCorrect: 'In representative democracy, eligible citizens cast their votes in the federal election.' },
    tr: { summary: 'Federal Meclis milletvekillerini oy kullanma hakkına sahip halk seçer.', whyCorrect: 'Temsilî demokraside seçme hakkı bulunan vatandaşlar federal seçimde oy kullanır.' },
  },
  29: {
    de: { summary: 'Der Adler ist das Wappentier der Bundesrepublik.', whyCorrect: 'Der Bundesadler ist ein traditionelles deutsches Staatssymbol und erscheint im Bundeswappen.' },
    en: { summary: 'The eagle is the heraldic animal of the Federal Republic.', whyCorrect: 'The federal eagle is a traditional German state symbol and appears in the federal coat of arms.' },
    tr: { summary: 'Almanya Federal Cumhuriyeti’nin arma hayvanı kartaldır.', whyCorrect: 'Federal kartal geleneksel bir Alman devlet sembolüdür ve federal armada yer alır.' },
  },
  30: {
    de: { summary: 'Pressezensur ist kein Merkmal einer Demokratie.', whyCorrect: 'Regelmäßige Wahlen, Meinungsfreiheit und Parteienvielfalt ermöglichen demokratische Kontrolle; Zensur verhindert freie öffentliche Debatte.' },
    en: { summary: 'Press censorship is not a feature of democracy.', whyCorrect: 'Regular elections, free expression and multiple parties enable democratic control, while censorship prevents open public debate.' },
    tr: { summary: 'Basın sansürü demokrasinin bir özelliği değildir.', whyCorrect: 'Düzenli seçimler, ifade özgürlüğü ve farklı partiler demokratik denetimi sağlar; sansür özgür kamusal tartışmayı engeller.' },
  },
};

const sourceName: Record<ExplanationLanguage, string> = {
  de: 'Offizieller BAMF-Fragenkatalog',
  en: 'Official BAMF question catalogue',
  tr: 'Resmî BAMF soru kataloğu',
};

export const explanationLabels: Record<ExplanationLanguage, { title: string; why: string; source: string; reviewed: string; fallback: string }> = {
  de: { title: 'Kurz erklärt', why: 'Warum ist das richtig?', source: 'Quelle', reviewed: 'Geprüft', fallback: '' },
  en: { title: 'Quick explanation', why: 'Why is this correct?', source: 'Source', reviewed: 'Reviewed', fallback: '' },
  tr: { title: 'Kısa açıklama', why: 'Bu cevap neden doğru?', source: 'Kaynak', reviewed: 'Kontrol tarihi', fallback: '' },
};

export function getQuestionExplanation(id: number, lang: string): QuestionExplanation | undefined {
  const entry = texts[id];
  if (!entry) return undefined;
  const selectedLang: ExplanationLanguage = lang === 'en' || lang === 'tr' ? lang : 'de';
  return {
    ...entry[selectedLang],
    sourceName: sourceName[selectedLang],
    sourceUrl: BAMF_QUESTION_CATALOG,
    reviewedAt: '2026-10-08',
    isFallback: !['de', 'en', 'tr'].includes(lang),
  };
}

