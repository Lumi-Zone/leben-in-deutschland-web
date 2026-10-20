import { normalizeKeyword } from '../utils/blog';
import type { SupportedLang } from '../types/language';

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
    keywords: ['Bundesländer', 'Bundesland-Fragen', 'Geografie', 'Türkisch', 'Türkçe', 'Russisch', 'Arabisch', 'Ukrainisch', 'Persisch', 'Dari', 'Paschtu'],
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

type TopicCopy = Pick<BlogTopic, 'name' | 'description'>;

/** Topic names and descriptions per route language; German comes from BLOG_TOPICS. */
const TOPIC_COPY: Record<Exclude<SupportedLang, 'de'>, Record<string, TopicCopy>> = {
  en: {
    einbuergerungstest: { name: 'Citizenship test', description: 'Test format, BAMF questions, pass mark and test day explained clearly.' },
    'lernen-vorbereitung': { name: 'Study & preparation', description: 'Study plans, exam tips and strategies for confident test preparation.' },
    'pruefung-anmeldung': { name: 'Exam & registration', description: 'Registration, dates, test centres and practical questions about the test.' },
    'einbuergerung-verfahren': { name: 'Citizenship & procedure', description: 'Requirements, application, documents and the naturalisation process in Germany.' },
    'recht-grundgesetz': { name: 'Law & Basic Law', description: 'Fundamental rights, the constitution and rights and duties in Germany.' },
    'politik-demokratie': { name: 'Politics & democracy', description: 'Elections, parties, the Bundestag, offices and democratic institutions made simple.' },
    'gesellschaft-integration': { name: 'Society & integration', description: 'Society, religion, social security and integration in Germany.' },
    'sprache-b1': { name: 'Language & B1', description: 'Language requirements, B1 certificates and language preparation for citizenship.' },
    'kosten-finanzen': { name: 'Costs & finances', description: 'Fees, costs, income requirements and financial questions about citizenship.' },
    'bundeslaender-mehrsprachig': { name: 'Federal states & languages', description: 'Federal state questions and multilingual explanations of the citizenship test.' },
  },
  tr: {
    einbuergerungstest: { name: 'Vatandaşlık testi', description: 'Sınavın yapısı, BAMF soruları, geçme notu ve sınav günü sade dille.' },
    'lernen-vorbereitung': { name: 'Çalışma ve hazırlık', description: 'Çalışma planları, sınav ipuçları ve güvenli hazırlık stratejileri.' },
    'pruefung-anmeldung': { name: 'Sınav ve kayıt', description: 'Kayıt, tarihler, sınav merkezleri ve sınavla ilgili pratik sorular.' },
    'einbuergerung-verfahren': { name: 'Vatandaşlık ve süreç', description: 'Almanya’da vatandaşlığa geçişin şartları, başvurusu, belgeleri ve işleyişi.' },
    'recht-grundgesetz': { name: 'Hukuk ve Anayasa', description: 'Temel haklar, anayasa ve Almanya’da haklar ile yükümlülükler.' },
    'politik-demokratie': { name: 'Siyaset ve demokrasi', description: 'Seçimler, partiler, Federal Meclis, makamlar ve demokratik kurumlar sade dille.' },
    'gesellschaft-integration': { name: 'Toplum ve uyum', description: 'Almanya’da toplum, din, sosyal güvenlik ve uyum.' },
    'sprache-b1': { name: 'Dil ve B1', description: 'Dil şartları, B1 belgesi ve vatandaşlık için dil hazırlığı.' },
    'kosten-finanzen': { name: 'Masraflar ve finans', description: 'Harçlar, masraflar, geçim şartı ve vatandaşlıkla ilgili mali sorular.' },
    'bundeslaender-mehrsprachig': { name: 'Eyaletler ve diller', description: 'Eyalet soruları ve vatandaşlık testine dair çok dilli açıklamalar.' },
  },
  ar: {
    einbuergerungstest: { name: 'اختبار التجنيس', description: 'شكل الاختبار وأسئلة BAMF ونسبة النجاح ويوم الاختبار بشرح واضح.' },
    'lernen-vorbereitung': { name: 'الدراسة والاستعداد', description: 'خطط دراسة ونصائح واستراتيجيات للاستعداد للاختبار بثقة.' },
    'pruefung-anmeldung': { name: 'الامتحان والتسجيل', description: 'التسجيل والمواعيد ومراكز الامتحان والأسئلة العملية حول الاختبار.' },
    'einbuergerung-verfahren': { name: 'التجنيس والإجراءات', description: 'شروط التجنيس في ألمانيا والطلب والوثائق ومراحل الإجراءات.' },
    'recht-grundgesetz': { name: 'القانون والدستور', description: 'الحقوق الأساسية والدستور والحقوق والواجبات في ألمانيا.' },
    'politik-demokratie': { name: 'السياسة والديمقراطية', description: 'الانتخابات والأحزاب والبوندستاغ والمناصب والمؤسسات الديمقراطية بشرح مبسّط.' },
    'gesellschaft-integration': { name: 'المجتمع والاندماج', description: 'المجتمع والدين والضمان الاجتماعي والاندماج في ألمانيا.' },
    'sprache-b1': { name: 'اللغة ومستوى B1', description: 'متطلبات اللغة وشهادة B1 والاستعداد اللغوي للتجنيس.' },
    'kosten-finanzen': { name: 'التكاليف والمال', description: 'الرسوم والتكاليف وشرط تأمين المعيشة والأسئلة المالية حول التجنيس.' },
    'bundeslaender-mehrsprachig': { name: 'الولايات واللغات', description: 'أسئلة الولايات وشروحات متعددة اللغات حول اختبار التجنيس.' },
  },
  ua: {
    einbuergerungstest: { name: 'Тест на громадянство', description: 'Формат тесту, запитання BAMF, прохідний бал і день іспиту зрозуміло.' },
    'lernen-vorbereitung': { name: 'Навчання й підготовка', description: 'Плани навчання, поради до іспиту та стратегії впевненої підготовки.' },
    'pruefung-anmeldung': { name: 'Іспит і реєстрація', description: 'Реєстрація, дати, екзаменаційні центри та практичні питання про тест.' },
    'einbuergerung-verfahren': { name: 'Громадянство й процедура', description: 'Умови, заява, документи та порядок отримання громадянства Німеччини.' },
    'recht-grundgesetz': { name: 'Право й Основний закон', description: 'Основні права, конституція, права та обов’язки в Німеччині.' },
    'politik-demokratie': { name: 'Політика й демократія', description: 'Вибори, партії, Бундестаг, посади й демократичні інституції простими словами.' },
    'gesellschaft-integration': { name: 'Суспільство й інтеграція', description: 'Суспільство, релігія, соціальне страхування та інтеграція в Німеччині.' },
    'sprache-b1': { name: 'Мова й B1', description: 'Мовні вимоги, сертифікат B1 і мовна підготовка до громадянства.' },
    'kosten-finanzen': { name: 'Витрати й фінанси', description: 'Збори, витрати, забезпечення прожиття та фінансові питання громадянства.' },
    'bundeslaender-mehrsprachig': { name: 'Федеральні землі й мови', description: 'Запитання федеральних земель і багатомовні пояснення тесту.' },
  },
  ru: {
    einbuergerungstest: { name: 'Тест на гражданство', description: 'Формат теста, вопросы BAMF, проходной балл и день экзамена понятно.' },
    'lernen-vorbereitung': { name: 'Учёба и подготовка', description: 'Планы занятий, советы к экзамену и стратегии уверенной подготовки.' },
    'pruefung-anmeldung': { name: 'Экзамен и запись', description: 'Запись, даты, экзаменационные центры и практические вопросы о тесте.' },
    'einbuergerung-verfahren': { name: 'Гражданство и процедура', description: 'Условия, заявление, документы и порядок получения гражданства Германии.' },
    'recht-grundgesetz': { name: 'Право и Основной закон', description: 'Основные права, конституция, права и обязанности в Германии.' },
    'politik-demokratie': { name: 'Политика и демократия', description: 'Выборы, партии, бундестаг, должности и демократические институты простыми словами.' },
    'gesellschaft-integration': { name: 'Общество и интеграция', description: 'Общество, религия, социальное страхование и интеграция в Германии.' },
    'sprache-b1': { name: 'Язык и B1', description: 'Языковые требования, сертификат B1 и языковая подготовка к гражданству.' },
    'kosten-finanzen': { name: 'Расходы и финансы', description: 'Пошлины, расходы, обеспечение средствами к жизни и финансовые вопросы.' },
    'bundeslaender-mehrsprachig': { name: 'Федеральные земли и языки', description: 'Вопросы федеральных земель и многоязычные объяснения теста.' },
  },
  pl: {
    einbuergerungstest: { name: 'Test na obywatelstwo', description: 'Przebieg testu, pytania BAMF, próg zaliczenia i dzień egzaminu w prostych słowach.' },
    'lernen-vorbereitung': { name: 'Nauka i przygotowanie', description: 'Plany nauki, wskazówki egzaminacyjne i strategie pewnego przygotowania.' },
    'pruefung-anmeldung': { name: 'Egzamin i zapisy', description: 'Zapisy, terminy, ośrodki egzaminacyjne i praktyczne pytania o test.' },
    'einbuergerung-verfahren': { name: 'Obywatelstwo i procedura', description: 'Warunki, wniosek, dokumenty i przebieg naturalizacji w Niemczech.' },
    'recht-grundgesetz': { name: 'Prawo i Ustawa Zasadnicza', description: 'Prawa podstawowe, konstytucja oraz prawa i obowiązki w Niemczech.' },
    'politik-demokratie': { name: 'Polityka i demokracja', description: 'Wybory, partie, Bundestag, urzędy i instytucje demokratyczne w prostych słowach.' },
    'gesellschaft-integration': { name: 'Społeczeństwo i integracja', description: 'Społeczeństwo, religia, ubezpieczenia społeczne i integracja w Niemczech.' },
    'sprache-b1': { name: 'Język i B1', description: 'Wymagania językowe, certyfikat B1 i przygotowanie językowe do obywatelstwa.' },
    'kosten-finanzen': { name: 'Koszty i finanse', description: 'Opłaty, koszty, utrzymanie i finansowe pytania o obywatelstwo.' },
    'bundeslaender-mehrsprachig': { name: 'Kraje związkowe i języki', description: 'Pytania krajów związkowych i wielojęzyczne objaśnienia testu.' },
  },
  fa: {
    einbuergerungstest: { name: 'آزمون شهروندی', description: 'ساختار آزمون، سؤال‌های BAMF، حد نصاب قبولی و روز آزمون به زبان ساده.' },
    'lernen-vorbereitung': { name: 'یادگیری و آمادگی', description: 'برنامه‌های مطالعه، نکته‌های آزمون و راهکارهای آمادگی مطمئن.' },
    'pruefung-anmeldung': { name: 'آزمون و ثبت‌نام', description: 'ثبت‌نام، زمان‌ها، مراکز آزمون و پرسش‌های عملی درباره آزمون.' },
    'einbuergerung-verfahren': { name: 'تابعیت و روند اداری', description: 'شرایط، درخواست، مدارک و مراحل گرفتن تابعیت آلمان.' },
    'recht-grundgesetz': { name: 'حقوق و قانون اساسی', description: 'حقوق بنیادین، قانون اساسی و حقوق و وظایف در آلمان.' },
    'politik-demokratie': { name: 'سیاست و دموکراسی', description: 'انتخابات، احزاب، بوندستاگ، مقام‌ها و نهادهای دموکراتیک به زبان ساده.' },
    'gesellschaft-integration': { name: 'جامعه و ادغام', description: 'جامعه، دین، تأمین اجتماعی و ادغام در آلمان.' },
    'sprache-b1': { name: 'زبان و سطح B1', description: 'شرایط زبانی، مدرک B1 و آمادگی زبانی برای تابعیت.' },
    'kosten-finanzen': { name: 'هزینه‌ها و امور مالی', description: 'عوارض، هزینه‌ها، تأمین معاش و پرسش‌های مالی درباره تابعیت.' },
    'bundeslaender-mehrsprachig': { name: 'ایالت‌ها و زبان‌ها', description: 'سؤال‌های ایالتی و توضیحات چندزبانه درباره آزمون شهروندی.' },
  },
  ps: {
    einbuergerungstest: { name: 'د تابعیت ازموینه', description: 'د ازموینې جوړښت، د BAMF پوښتنې، د بریا حد او د ازموینې ورځ په ساده ژبه.' },
    'lernen-vorbereitung': { name: 'زده‌کړه او چمتووالی', description: 'د زده‌کړې پلانونه، د ازموینې لارښوونې او د ډاډمن چمتووالي لارې.' },
    'pruefung-anmeldung': { name: 'ازموینه او نوم لیکنه', description: 'نوم لیکنه، نېټې، د ازموینې مرکزونه او د ازموینې په اړه عملي پوښتنې.' },
    'einbuergerung-verfahren': { name: 'تابعیت او پروسه', description: 'په آلمان کې د تابعیت شرطونه، غوښتنلیک، اسناد او پړاوونه.' },
    'recht-grundgesetz': { name: 'قانون او اساسي قانون', description: 'بنسټیز حقونه، اساسي قانون او په آلمان کې حقونه او مکلفیتونه.' },
    'politik-demokratie': { name: 'سیاست او دیموکراسي', description: 'ټاکنې، ګوندونه، بوندستاګ، دندې او دیموکراتیک بنسټونه په ساده ژبه.' },
    'gesellschaft-integration': { name: 'ټولنه او ادغام', description: 'په آلمان کې ټولنه، دین، ټولنیز بیمه او ادغام.' },
    'sprache-b1': { name: 'ژبه او B1', description: 'د ژبې شرطونه، د B1 سند او د تابعیت لپاره ژبنی چمتووالی.' },
    'kosten-finanzen': { name: 'لګښتونه او مالي چارې', description: 'فیسونه، لګښتونه، د ژوند تأمین او د تابعیت مالي پوښتنې.' },
    'bundeslaender-mehrsprachig': { name: 'ایالتونه او ژبې', description: 'د ایالتونو پوښتنې او د ازموینې په اړه څو ژبني تشریحات.' },
  },
  ro: {
    einbuergerungstest: { name: 'Testul de cetățenie', description: 'Structura testului, întrebările BAMF, pragul de promovare și ziua examenului, pe înțeles.' },
    'lernen-vorbereitung': { name: 'Învățare și pregătire', description: 'Planuri de studiu, sfaturi pentru examen și strategii de pregătire sigură.' },
    'pruefung-anmeldung': { name: 'Examen și înscriere', description: 'Înscriere, date, centre de examinare și întrebări practice despre test.' },
    'einbuergerung-verfahren': { name: 'Cetățenie și procedură', description: 'Condiții, cerere, documente și etapele naturalizării în Germania.' },
    'recht-grundgesetz': { name: 'Drept și Legea Fundamentală', description: 'Drepturi fundamentale, constituția și drepturile și obligațiile în Germania.' },
    'politik-demokratie': { name: 'Politică și democrație', description: 'Alegeri, partide, Bundestag, funcții și instituții democratice explicate simplu.' },
    'gesellschaft-integration': { name: 'Societate și integrare', description: 'Societate, religie, asigurări sociale și integrare în Germania.' },
    'sprache-b1': { name: 'Limbă și B1', description: 'Cerințe lingvistice, certificatul B1 și pregătirea lingvistică pentru cetățenie.' },
    'kosten-finanzen': { name: 'Costuri și finanțe', description: 'Taxe, costuri, asigurarea traiului și întrebări financiare despre cetățenie.' },
    'bundeslaender-mehrsprachig': { name: 'Landuri și limbi', description: 'Întrebări pe landuri și explicații multilingve despre testul de cetățenie.' },
  },
  it: {
    einbuergerungstest: { name: 'Test di cittadinanza', description: 'Struttura del test, domande BAMF, soglia di superamento e giorno dell’esame spiegati con chiarezza.' },
    'lernen-vorbereitung': { name: 'Studio e preparazione', description: 'Piani di studio, consigli per l’esame e strategie per prepararsi con sicurezza.' },
    'pruefung-anmeldung': { name: 'Esame e iscrizione', description: 'Iscrizione, date, centri d’esame e domande pratiche sul test.' },
    'einbuergerung-verfahren': { name: 'Cittadinanza e procedura', description: 'Requisiti, domanda, documenti e iter della naturalizzazione in Germania.' },
    'recht-grundgesetz': { name: 'Diritto e Legge fondamentale', description: 'Diritti fondamentali, costituzione e diritti e doveri in Germania.' },
    'politik-demokratie': { name: 'Politica e democrazia', description: 'Elezioni, partiti, Bundestag, cariche e istituzioni democratiche spiegati in modo semplice.' },
    'gesellschaft-integration': { name: 'Società e integrazione', description: 'Società, religione, previdenza sociale e integrazione in Germania.' },
    'sprache-b1': { name: 'Lingua e B1', description: 'Requisiti linguistici, certificato B1 e preparazione linguistica per la cittadinanza.' },
    'kosten-finanzen': { name: 'Costi e finanze', description: 'Tasse, costi, mezzi di sostentamento e questioni economiche sulla cittadinanza.' },
    'bundeslaender-mehrsprachig': { name: 'Länder e lingue', description: 'Domande sui Länder e spiegazioni multilingue del test di cittadinanza.' },
  },
  es: {
    einbuergerungstest: { name: 'Examen de ciudadanía', description: 'Formato del examen, preguntas del BAMF, nota mínima y día del examen, explicados con claridad.' },
    'lernen-vorbereitung': { name: 'Estudio y preparación', description: 'Planes de estudio, consejos para el examen y estrategias para prepararte con seguridad.' },
    'pruefung-anmeldung': { name: 'Examen e inscripción', description: 'Inscripción, fechas, centros de examen y preguntas prácticas sobre el test.' },
    'einbuergerung-verfahren': { name: 'Ciudadanía y trámite', description: 'Requisitos, solicitud, documentos y pasos de la naturalización en Alemania.' },
    'recht-grundgesetz': { name: 'Derecho y Ley Fundamental', description: 'Derechos fundamentales, la constitución y derechos y deberes en Alemania.' },
    'politik-demokratie': { name: 'Política y democracia', description: 'Elecciones, partidos, Bundestag, cargos e instituciones democráticas explicados de forma sencilla.' },
    'gesellschaft-integration': { name: 'Sociedad e integración', description: 'Sociedad, religión, seguridad social e integración en Alemania.' },
    'sprache-b1': { name: 'Idioma y B1', description: 'Requisitos de idioma, certificado B1 y preparación lingüística para la ciudadanía.' },
    'kosten-finanzen': { name: 'Costes y finanzas', description: 'Tasas, costes, medios de vida y cuestiones económicas sobre la ciudadanía.' },
    'bundeslaender-mehrsprachig': { name: 'Estados federados e idiomas', description: 'Preguntas por estado federado y explicaciones multilingües del examen.' },
  },
};

export function getLocalizedTopic(topic: BlogTopic, lang: SupportedLang): BlogTopic {
  if (lang === 'de') return topic;
  return { ...topic, ...TOPIC_COPY[lang][topic.slug] };
}
