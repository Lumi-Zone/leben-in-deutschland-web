import { toSlug } from '../utils/blog';
import type { SupportedLang } from '../types/language';

export interface BlogAuthorProfile {
  name: string;
  slug: string;
  role: string;
  bio: string;
  entityType: 'Organization' | 'Person';
}

const authorProfiles: BlogAuthorProfile[] = [
  {
    name: 'Leben in Deutschland Team',
    slug: toSlug('Leben in Deutschland Team'),
    role: 'Redaktion',
    bio: 'Das Team erstellt praxisnahe Leitfäden zur Vorbereitung auf den Einbürgerungstest und zum Leben in Deutschland.',
    entityType: 'Organization',
  },
  {
    name: 'Rechtsredaktion',
    slug: toSlug('Rechtsredaktion'),
    role: 'Recht & Verfahren',
    bio: 'Die Rechtsredaktion bereitet gesetzliche Grundlagen verständlich auf und achtet auf belastbare Quellen und aktuelle Regelungen.',
    entityType: 'Organization',
  },
  {
    name: 'Lern-Coach Team',
    slug: toSlug('Lern-Coach Team'),
    role: 'Didaktik',
    bio: 'Das Lern-Coach Team entwickelt strukturierte Lernstrategien, damit komplexe Inhalte effizienter verstanden und behalten werden.',
    entityType: 'Organization',
  },
  {
    name: 'Redaktion',
    slug: toSlug('Redaktion'),
    role: 'Content',
    bio: 'Die Redaktion fasst wichtige Einbürgerungs- und Prüfungsthemen kompakt zusammen und aktualisiert Inhalte kontinuierlich.',
    entityType: 'Organization',
  },
  {
    name: 'Redaktion LiD',
    slug: toSlug('Redaktion LiD'),
    role: 'Integrationswissen',
    bio: 'Die Redaktion LiD fokussiert auf Integrationskurs, Sprache und alltagsnahe Orientierung rund um den Test.',
    entityType: 'Organization',
  },
  {
    name: 'Rechtsberatung Team',
    slug: toSlug('Rechtsberatung Team'),
    role: 'Beratung',
    bio: 'Das Rechtsberatung Team erklärt häufige Fallkonstellationen rund um Aufenthaltsstatus, Fristen und Behördenverfahren.',
    entityType: 'Organization',
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
      entityType: 'Person',
    }
  );
}

export function getAuthorBySlug(slug: string): BlogAuthorProfile | undefined {
  return authorBySlug.get(slug);
}

export function getAllAuthors(): BlogAuthorProfile[] {
  return authorProfiles;
}

type AuthorCopy = Pick<BlogAuthorProfile, 'name' | 'role' | 'bio'>;

/** Display copy per route language, keyed by author slug; German comes from authorProfiles. */
const AUTHOR_COPY: Record<Exclude<SupportedLang, 'de'>, Record<string, AuthorCopy>> = {
  en: {
    'leben-in-deutschland-team': { name: 'Leben in Deutschland Team', role: 'Editorial team', bio: 'The team writes practical guides on preparing for the citizenship test and on life in Germany.' },
    rechtsredaktion: { name: 'Legal desk', role: 'Law & procedure', bio: 'The legal desk explains the statutory rules in plain language and relies on robust sources and current regulations.' },
    'lern-coach-team': { name: 'Study coach team', role: 'Teaching', bio: 'The study coach team develops structured study strategies so that complex content is understood and remembered more easily.' },
    redaktion: { name: 'Editorial team', role: 'Content', bio: 'The editorial team summarises key citizenship and exam topics and keeps the content up to date.' },
    'redaktion-lid': { name: 'LiD editorial team', role: 'Integration know-how', bio: 'The LiD editorial team focuses on integration courses, language and everyday orientation around the test.' },
    'rechtsberatung-team': { name: 'Legal advice team', role: 'Advice', bio: 'The legal advice team explains common situations around residence status, deadlines and administrative procedures.' },
  },
  tr: {
    'leben-in-deutschland-team': { name: 'Leben in Deutschland Ekibi', role: 'Editoryal ekip', bio: 'Ekip, vatandaşlık testine hazırlık ve Almanya’da yaşam hakkında pratik rehberler hazırlar.' },
    rechtsredaktion: { name: 'Hukuk masası', role: 'Hukuk ve süreç', bio: 'Hukuk masası yasal düzenlemeleri anlaşılır biçimde aktarır; güvenilir kaynaklara ve güncel kurallara dayanır.' },
    'lern-coach-team': { name: 'Çalışma koçu ekibi', role: 'Eğitim', bio: 'Çalışma koçu ekibi, karmaşık içeriklerin daha kolay anlaşılıp akılda kalması için düzenli çalışma stratejileri geliştirir.' },
    redaktion: { name: 'Editoryal ekip', role: 'İçerik', bio: 'Editoryal ekip, vatandaşlık ve sınavla ilgili önemli konuları özetler ve içerikleri güncel tutar.' },
    'redaktion-lid': { name: 'LiD editoryal ekibi', role: 'Uyum bilgisi', bio: 'LiD ekibi uyum kursu, dil ve sınav çevresindeki gündelik yönlendirmeye odaklanır.' },
    'rechtsberatung-team': { name: 'Hukuki danışmanlık ekibi', role: 'Danışmanlık', bio: 'Ekip, oturum statüsü, süreler ve resmî işlemlerle ilgili sık karşılaşılan durumları açıklar.' },
  },
  ar: {
    'leben-in-deutschland-team': { name: 'فريق Leben in Deutschland', role: 'فريق التحرير', bio: 'يكتب الفريق أدلة عملية للاستعداد لاختبار التجنيس وللحياة في ألمانيا.' },
    rechtsredaktion: { name: 'قسم الشؤون القانونية', role: 'القانون والإجراءات', bio: 'يشرح القسم القانوني الأحكام القانونية بلغة مبسطة ويعتمد على مصادر موثوقة وأنظمة سارية.' },
    'lern-coach-team': { name: 'فريق التدريب على الدراسة', role: 'التعليم', bio: 'يطوّر الفريق استراتيجيات دراسة منظمة لفهم المحتوى المعقد وتذكره بسهولة أكبر.' },
    redaktion: { name: 'فريق التحرير', role: 'المحتوى', bio: 'يلخّص فريق التحرير أهم مواضيع التجنيس والاختبار ويحدّث المحتوى باستمرار.' },
    'redaktion-lid': { name: 'تحرير LiD', role: 'معرفة الاندماج', bio: 'يركّز فريق LiD على دورات الاندماج واللغة والتوجيه اليومي حول الاختبار.' },
    'rechtsberatung-team': { name: 'فريق الاستشارات القانونية', role: 'الاستشارة', bio: 'يشرح الفريق الحالات الشائعة المتعلقة بوضع الإقامة والمهل والإجراءات الإدارية.' },
  },
  ua: {
    'leben-in-deutschland-team': { name: 'Команда Leben in Deutschland', role: 'Редакція', bio: 'Команда пише практичні поради з підготовки до тесту на громадянство та про життя в Німеччині.' },
    rechtsredaktion: { name: 'Юридична редакція', role: 'Право й процедура', bio: 'Юридична редакція пояснює норми закону простою мовою та спирається на надійні джерела й чинні правила.' },
    'lern-coach-team': { name: 'Команда навчальних коучів', role: 'Дидактика', bio: 'Команда розробляє структуровані стратегії навчання, щоб складний матеріал легше розуміти й запам’ятовувати.' },
    redaktion: { name: 'Редакція', role: 'Контент', bio: 'Редакція стисло пояснює важливі теми громадянства й іспиту та регулярно оновлює матеріали.' },
    'redaktion-lid': { name: 'Редакція LiD', role: 'Інтеграція', bio: 'Редакція LiD зосереджена на інтеграційних курсах, мові та щоденній орієнтації довкола тесту.' },
    'rechtsberatung-team': { name: 'Команда юридичних консультацій', role: 'Консультації', bio: 'Команда пояснює типові ситуації щодо статусу перебування, строків і адміністративних процедур.' },
  },
  ru: {
    'leben-in-deutschland-team': { name: 'Команда Leben in Deutschland', role: 'Редакция', bio: 'Команда пишет практические руководства по подготовке к тесту на гражданство и о жизни в Германии.' },
    rechtsredaktion: { name: 'Юридическая редакция', role: 'Право и процедура', bio: 'Юридическая редакция объясняет нормы закона простым языком и опирается на надёжные источники и действующие правила.' },
    'lern-coach-team': { name: 'Команда учебных коучей', role: 'Дидактика', bio: 'Команда разрабатывает структурированные стратегии обучения, чтобы сложный материал легче понимался и запоминался.' },
    redaktion: { name: 'Редакция', role: 'Контент', bio: 'Редакция кратко объясняет важные темы гражданства и экзамена и регулярно обновляет материалы.' },
    'redaktion-lid': { name: 'Редакция LiD', role: 'Интеграция', bio: 'Редакция LiD сосредоточена на интеграционных курсах, языке и повседневной ориентации вокруг теста.' },
    'rechtsberatung-team': { name: 'Команда юридических консультаций', role: 'Консультации', bio: 'Команда объясняет типичные ситуации, связанные со статусом пребывания, сроками и административными процедурами.' },
  },
  pl: {
    'leben-in-deutschland-team': { name: 'Zespół Leben in Deutschland', role: 'Redakcja', bio: 'Zespół tworzy praktyczne poradniki o przygotowaniu do testu na obywatelstwo i życiu w Niemczech.' },
    rechtsredaktion: { name: 'Redakcja prawna', role: 'Prawo i procedura', bio: 'Redakcja prawna objaśnia przepisy prostym językiem i opiera się na wiarygodnych źródłach oraz aktualnych regulacjach.' },
    'lern-coach-team': { name: 'Zespół coachów nauki', role: 'Dydaktyka', bio: 'Zespół opracowuje uporządkowane strategie nauki, aby złożone treści łatwiej zrozumieć i zapamiętać.' },
    redaktion: { name: 'Redakcja', role: 'Treści', bio: 'Redakcja streszcza najważniejsze tematy dotyczące obywatelstwa i egzaminu oraz na bieżąco aktualizuje treści.' },
    'redaktion-lid': { name: 'Redakcja LiD', role: 'Wiedza o integracji', bio: 'Redakcja LiD skupia się na kursach integracyjnych, języku i codziennej orientacji wokół testu.' },
    'rechtsberatung-team': { name: 'Zespół doradztwa prawnego', role: 'Doradztwo', bio: 'Zespół wyjaśnia typowe sytuacje związane ze statusem pobytu, terminami i procedurami urzędowymi.' },
  },
  fa: {
    'leben-in-deutschland-team': { name: 'تیم Leben in Deutschland', role: 'تحریریه', bio: 'این تیم راهنماهای کاربردی برای آمادگی آزمون شهروندی و زندگی در آلمان می‌نویسد.' },
    rechtsredaktion: { name: 'تحریریه حقوقی', role: 'حقوق و روند اداری', bio: 'تحریریه حقوقی مقررات قانونی را به زبان ساده توضیح می‌دهد و بر منابع معتبر و قوانین جاری تکیه دارد.' },
    'lern-coach-team': { name: 'تیم مربیان یادگیری', role: 'آموزش', bio: 'این تیم راهبردهای منظم مطالعه طراحی می‌کند تا مطالب پیچیده آسان‌تر فهمیده و به خاطر سپرده شوند.' },
    redaktion: { name: 'تحریریه', role: 'محتوا', bio: 'تحریریه موضوعات مهم تابعیت و آزمون را خلاصه می‌کند و محتوا را به‌روز نگه می‌دارد.' },
    'redaktion-lid': { name: 'تحریریه LiD', role: 'دانش ادغام', bio: 'تحریریه LiD روی دوره ادغام، زبان و راهنمایی روزمره پیرامون آزمون تمرکز دارد.' },
    'rechtsberatung-team': { name: 'تیم مشاوره حقوقی', role: 'مشاوره', bio: 'این تیم موقعیت‌های رایج درباره وضعیت اقامت، مهلت‌ها و روندهای اداری را توضیح می‌دهد.' },
  },
  ps: {
    'leben-in-deutschland-team': { name: 'د Leben in Deutschland ټیم', role: 'اډیټوریال ټیم', bio: 'دا ټیم د تابعیت ازموینې د چمتووالي او په آلمان کې د ژوند په اړه عملي لارښودونه لیکي.' },
    rechtsredaktion: { name: 'حقوقي څانګه', role: 'قانون او پروسه', bio: 'حقوقي څانګه قانوني مقررات په ساده ژبه تشریح کوي او پر باوري سرچینو او نافذو قواعدو تکیه کوي.' },
    'lern-coach-team': { name: 'د زده‌کړې روزونکي ټیم', role: 'ښوونه', bio: 'دا ټیم منظمې زده‌کړیزې لارې جوړوي څو پېچلي مطالب په اسانۍ سره پوه او په یاد وساتل شي.' },
    redaktion: { name: 'اډیټوریال ټیم', role: 'منځپانګه', bio: 'اډیټوریال ټیم د تابعیت او ازموینې مهمې موضوعګانې لنډوي او مطالب تازه ساتي.' },
    'redaktion-lid': { name: 'د LiD اډیټوریال ټیم', role: 'د ادغام پوهه', bio: 'د LiD ټیم د ادغام کورس، ژبې او د ازموینې شاوخوا ورځني لارښوونې ته پام کوي.' },
    'rechtsberatung-team': { name: 'د حقوقي مشورې ټیم', role: 'مشوره', bio: 'دا ټیم د اوسېدو حالت، مودو او اداري پروسو په اړه عام حالتونه تشریح کوي.' },
  },
  ro: {
    'leben-in-deutschland-team': { name: 'Echipa Leben in Deutschland', role: 'Redacție', bio: 'Echipa scrie ghiduri practice despre pregătirea pentru testul de cetățenie și viața în Germania.' },
    rechtsredaktion: { name: 'Redacția juridică', role: 'Drept și procedură', bio: 'Redacția juridică explică normele legale pe înțeles și se bazează pe surse solide și reglementări actuale.' },
    'lern-coach-team': { name: 'Echipa de coaching pentru învățare', role: 'Didactică', bio: 'Echipa dezvoltă strategii de învățare structurate, ca informațiile complexe să fie înțelese și reținute mai ușor.' },
    redaktion: { name: 'Redacția', role: 'Conținut', bio: 'Redacția rezumă temele importante despre cetățenie și examen și actualizează constant conținutul.' },
    'redaktion-lid': { name: 'Redacția LiD', role: 'Integrare', bio: 'Redacția LiD se concentrează pe cursul de integrare, limbă și orientarea de zi cu zi în jurul testului.' },
    'rechtsberatung-team': { name: 'Echipa de consultanță juridică', role: 'Consultanță', bio: 'Echipa explică situațiile frecvente legate de statutul de ședere, termene și proceduri administrative.' },
  },
  it: {
    'leben-in-deutschland-team': { name: 'Team Leben in Deutschland', role: 'Redazione', bio: 'Il team scrive guide pratiche sulla preparazione al test di cittadinanza e sulla vita in Germania.' },
    rechtsredaktion: { name: 'Redazione giuridica', role: 'Diritto e procedura', bio: 'La redazione giuridica spiega le norme in modo comprensibile e si basa su fonti solide e regole in vigore.' },
    'lern-coach-team': { name: 'Team di coaching allo studio', role: 'Didattica', bio: 'Il team sviluppa strategie di studio strutturate per capire e ricordare più facilmente i contenuti complessi.' },
    redaktion: { name: 'Redazione', role: 'Contenuti', bio: 'La redazione riassume i temi chiave su cittadinanza ed esame e aggiorna costantemente i contenuti.' },
    'redaktion-lid': { name: 'Redazione LiD', role: 'Integrazione', bio: 'La redazione LiD si concentra su corso di integrazione, lingua e orientamento quotidiano attorno al test.' },
    'rechtsberatung-team': { name: 'Team di consulenza legale', role: 'Consulenza', bio: 'Il team spiega i casi più comuni su permesso di soggiorno, scadenze e procedure amministrative.' },
  },
  es: {
    'leben-in-deutschland-team': { name: 'Equipo Leben in Deutschland', role: 'Redacción', bio: 'El equipo escribe guías prácticas para preparar el examen de ciudadanía y sobre la vida en Alemania.' },
    rechtsredaktion: { name: 'Redacción jurídica', role: 'Derecho y trámites', bio: 'La redacción jurídica explica las normas legales con claridad y se basa en fuentes sólidas y normativa vigente.' },
    'lern-coach-team': { name: 'Equipo de coaching de estudio', role: 'Didáctica', bio: 'El equipo desarrolla estrategias de estudio estructuradas para entender y recordar mejor los contenidos complejos.' },
    redaktion: { name: 'Redacción', role: 'Contenido', bio: 'La redacción resume los temas clave sobre ciudadanía y examen y actualiza el contenido de forma continua.' },
    'redaktion-lid': { name: 'Redacción LiD', role: 'Integración', bio: 'La redacción LiD se centra en el curso de integración, el idioma y la orientación diaria en torno al examen.' },
    'rechtsberatung-team': { name: 'Equipo de asesoría jurídica', role: 'Asesoría', bio: 'El equipo explica situaciones habituales sobre el permiso de residencia, plazos y trámites administrativos.' },
  },
};

export function getLocalizedAuthor(profile: BlogAuthorProfile, lang: SupportedLang): BlogAuthorProfile {
  if (lang === 'de') return profile;
  const copy = AUTHOR_COPY[lang][profile.slug];
  return copy ? { ...profile, ...copy } : profile;
}
