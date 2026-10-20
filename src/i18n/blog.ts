import type { SupportedLang } from '../types/language';

/** Date locale per route language; `ua` is the site's code for Ukrainian. */
export const blogLocales: Record<SupportedLang, string> = {
  de: 'de-DE',
  en: 'en-US',
  tr: 'tr-TR',
  ar: 'ar',
  ua: 'uk-UA',
  ru: 'ru-RU',
  pl: 'pl-PL',
  fa: 'fa-IR',
  ps: 'ps',
  ro: 'ro-RO',
  it: 'it-IT',
  es: 'es-ES',
};

/** Languages with their own editorial policy page; the others link to the English one. */
const EDITORIAL_POLICY_LANGUAGES: SupportedLang[] = ['de', 'en', 'tr'];

export const getEditorialPolicyLang = (lang: SupportedLang): SupportedLang =>
  EDITORIAL_POLICY_LANGUAGES.includes(lang) ? lang : 'en';

/** contentLang values use ISO codes, route languages use the site's codes. */
export const routeLangForContentLang = (contentLang: string): string => (contentLang === 'uk' ? 'ua' : contentLang);

export interface BlogCopy {
  search: string;
  placeholder: string;
  dateFilter: string;
  allPeriods: string;
  allTopics: string;
  shown: string;
  recommended: string;
  minutes: string;
  read: string;
  moreBy: string;
  empty: string;
  topicPages: string;
  keywords: string;
  all: string;
  archive: string;
  updated: string;
  sources: string;
  sourceNote: string;
  policy: string;
  author: string;
  topics: string;
  more: string;
  newer: string;
  older: string;
  related: string;
  availableIn: string;
  nativeGuides: string;
  nativeGuidesIntro: string;
  otherLanguages: string;
  otherLanguagesIntro: string;
  topicCount: (count: number) => string;
  topicTitleSuffix: string;
  authorPosts: string;
  practiceQuestions: string;
  practiceExam: string;
  practiceState: string;
}

export const blogCopy: Record<SupportedLang, BlogCopy> = {
  de: {
    search: 'Blog durchsuchen', placeholder: 'Titel, Themen oder Schlagwörter suchen', dateFilter: 'Nach Datum filtern', allPeriods: 'Alle Zeiträume', allTopics: 'Alle Themen', shown: 'Beiträge angezeigt.', recommended: 'Empfohlen', minutes: 'Min.', read: 'Artikel lesen', moreBy: 'Mehr von', empty: 'Für diese Filter wurden keine Beiträge gefunden. Bitte passen Sie die Suche an.', topicPages: 'Themen-Seiten', keywords: 'Beliebte Keywords', all: 'Alle', archive: 'Archiv',
    updated: 'Aktualisiert', sources: 'Offizielle Quellen & redaktioneller Stand', sourceNote: 'Für verbindliche Auskünfte gelten die Informationen der zuständigen Behörden.', policy: 'So entstehen und aktualisieren wir unsere Inhalte', author: 'Autor', topics: 'Themen', more: 'Weitere Artikel', newer: 'Neuer', older: 'Älter', related: 'Ähnliche Beiträge',
    availableIn: 'Diesen Beitrag gibt es auch auf', nativeGuides: 'Ratgeber in weiteren Sprachen', nativeGuidesIntro: 'Diese Erklärungen sind direkt in der jeweiligen Sprache geschrieben.', otherLanguages: 'Blog in anderen Sprachen', otherLanguagesIntro: 'Alle Ratgeber gibt es auch auf Englisch und Türkisch, die wichtigsten in neun weiteren Sprachen.',
    topicCount: (count) => `${count} ${count === 1 ? 'Beitrag' : 'Beiträge'} in dieser Kategorie.`, topicTitleSuffix: 'Einbürgerungstest Ratgeber', authorPosts: 'Beiträge',
    practiceQuestions: 'Fragen mit Erklärungen üben', practiceExam: 'Probeprüfung mit 33 Fragen starten', practiceState: 'Fragen für',
  },
  en: {
    search: 'Search the blog', placeholder: 'Search titles, topics or keywords', dateFilter: 'Filter by date', allPeriods: 'All periods', allTopics: 'All topics', shown: 'guides shown.', recommended: 'Recommended', minutes: 'min', read: 'Read guide', moreBy: 'More by', empty: 'No guides match these filters. Please adjust your search.', topicPages: 'Topic pages', keywords: 'Popular keywords', all: 'All', archive: 'Archive',
    updated: 'Reviewed', sources: 'Official sources & editorial status', sourceNote: 'For binding information, consult the competent authorities.', policy: 'How we source and update our content', author: 'Author', topics: 'Topics', more: 'More guides', newer: 'Newer', older: 'Older', related: 'Related guides',
    availableIn: 'This guide is also available in', nativeGuides: 'Guides in other languages', nativeGuidesIntro: 'These explainers are written directly in each language.', otherLanguages: 'Blog in other languages', otherLanguagesIntro: 'Every guide is available in German, English and Turkish; the key guides in nine more languages.',
    topicCount: (count) => `${count} ${count === 1 ? 'guide' : 'guides'} in this topic.`, topicTitleSuffix: 'German Citizenship Test Guides', authorPosts: 'Guides',
    practiceQuestions: 'Practise questions with explanations', practiceExam: 'Start a 33-question practice test', practiceState: 'Questions for',
  },
  tr: {
    search: 'Blogda ara', placeholder: 'Başlık, konu veya anahtar kelime ara', dateFilter: 'Tarihe göre filtrele', allPeriods: 'Tüm dönemler', allTopics: 'Tüm konular', shown: 'rehber gösteriliyor.', recommended: 'Önerilen', minutes: 'dk.', read: 'Rehberi oku', moreBy: 'Diğer yazıları', empty: 'Bu filtrelere uygun rehber bulunamadı. Aramayı değiştirin.', topicPages: 'Konu sayfaları', keywords: 'Popüler anahtar kelimeler', all: 'Tümü', archive: 'Arşiv',
    updated: 'Kontrol tarihi', sources: 'Resmî kaynaklar ve editoryal durum', sourceNote: 'Bağlayıcı bilgi için yetkili makamların açıklamaları geçerlidir.', policy: 'İçerikleri nasıl hazırlayıp güncelliyoruz?', author: 'Yazar', topics: 'Konular', more: 'Diğer rehberler', newer: 'Daha yeni', older: 'Daha eski', related: 'İlgili rehberler',
    availableIn: 'Bu rehber şu dillerde de var:', nativeGuides: 'Diğer dillerde rehberler', nativeGuidesIntro: 'Bu açıklamalar doğrudan ilgili dilde yazılmıştır.', otherLanguages: 'Diğer dillerde blog', otherLanguagesIntro: 'Tüm rehberler Almanca, İngilizce ve Türkçe; en önemlileri dokuz dilde daha mevcut.',
    topicCount: (count) => `Bu konuda ${count} rehber var.`, topicTitleSuffix: 'Vatandaşlık Testi Rehberleri', authorPosts: 'Rehberler',
    practiceQuestions: 'Açıklamalı sorularla çalış', practiceExam: '33 soruluk deneme sınavına başla', practiceState: 'Eyalet soruları:',
  },
  ar: {
    search: 'ابحث في المدونة', placeholder: 'ابحث في العناوين أو المواضيع أو الكلمات المفتاحية', dateFilter: 'التصفية حسب التاريخ', allPeriods: 'كل الفترات', allTopics: 'كل المواضيع', shown: 'أدلة معروضة.', recommended: 'موصى به', minutes: 'دقيقة', read: 'اقرأ الدليل', moreBy: 'المزيد من', empty: 'لا توجد أدلة تطابق هذه التصفية. يرجى تعديل البحث.', topicPages: 'صفحات المواضيع', keywords: 'كلمات مفتاحية شائعة', all: 'الكل', archive: 'الأرشيف',
    updated: 'تاريخ المراجعة', sources: 'المصادر الرسمية وحالة المراجعة', sourceNote: 'للحصول على معلومات ملزمة يُرجى الرجوع إلى الجهات المختصة.', policy: 'كيف نُعدّ محتوانا ونحدّثه', author: 'الكاتب', topics: 'المواضيع', more: 'أدلة أخرى', newer: 'أحدث', older: 'أقدم', related: 'أدلة ذات صلة',
    availableIn: 'هذا الدليل متوفر أيضًا بـ', nativeGuides: 'أدلة مكتوبة بالعربية', nativeGuidesIntro: 'هذه الشروحات مكتوبة مباشرة باللغة العربية.', otherLanguages: 'المدونة بلغات أخرى', otherLanguagesIntro: 'جميع الأدلة متوفرة بالألمانية والإنجليزية والتركية.',
    topicCount: (count) => `${count} أدلة في هذا الموضوع.`, topicTitleSuffix: 'أدلة اختبار التجنيس', authorPosts: 'الأدلة',
    practiceQuestions: 'تدرّب على الأسئلة مع الشرح', practiceExam: 'ابدأ امتحانًا تجريبيًا من 33 سؤالًا', practiceState: 'أسئلة ولاية',
  },
  ua: {
    search: 'Пошук у блозі', placeholder: 'Шукайте за назвою, темою або ключовим словом', dateFilter: 'Фільтр за датою', allPeriods: 'Усі періоди', allTopics: 'Усі теми', shown: 'матеріалів показано.', recommended: 'Рекомендуємо', minutes: 'хв', read: 'Читати', moreBy: 'Більше від', empty: 'За цими фільтрами нічого не знайдено. Змініть пошук.', topicPages: 'Сторінки тем', keywords: 'Популярні ключові слова', all: 'Усі', archive: 'Архів',
    updated: 'Перевірено', sources: 'Офіційні джерела та редакційний статус', sourceNote: 'Обов’язкову інформацію надають компетентні органи влади.', policy: 'Як ми готуємо й оновлюємо матеріали', author: 'Автор', topics: 'Теми', more: 'Інші матеріали', newer: 'Новіше', older: 'Старіше', related: 'Схожі матеріали',
    availableIn: 'Цей матеріал також доступний мовами:', nativeGuides: 'Матеріали, написані українською', nativeGuidesIntro: 'Ці пояснення написані безпосередньо українською мовою.', otherLanguages: 'Блог іншими мовами', otherLanguagesIntro: 'Усі матеріали доступні німецькою, англійською та турецькою.',
    topicCount: (count) => `Матеріалів у цій темі: ${count}.`, topicTitleSuffix: 'Поради до тесту на громадянство', authorPosts: 'Матеріали',
    practiceQuestions: 'Тренувати запитання з поясненнями', practiceExam: 'Почати пробний тест із 33 запитань', practiceState: 'Запитання для',
  },
  ru: {
    search: 'Поиск по блогу', placeholder: 'Ищите по названию, теме или ключевому слову', dateFilter: 'Фильтр по дате', allPeriods: 'Все периоды', allTopics: 'Все темы', shown: 'материалов показано.', recommended: 'Рекомендуем', minutes: 'мин', read: 'Читать', moreBy: 'Ещё от', empty: 'По этим фильтрам ничего не найдено. Измените поиск.', topicPages: 'Страницы тем', keywords: 'Популярные ключевые слова', all: 'Все', archive: 'Архив',
    updated: 'Проверено', sources: 'Официальные источники и редакционный статус', sourceNote: 'Обязательную информацию предоставляют компетентные ведомства.', policy: 'Как мы готовим и обновляем материалы', author: 'Автор', topics: 'Темы', more: 'Другие материалы', newer: 'Новее', older: 'Старее', related: 'Похожие материалы',
    availableIn: 'Этот материал также доступен на языках:', nativeGuides: 'Материалы, написанные на русском', nativeGuidesIntro: 'Эти объяснения написаны непосредственно на русском языке.', otherLanguages: 'Блог на других языках', otherLanguagesIntro: 'Все материалы доступны на немецком, английском и турецком.',
    topicCount: (count) => `Материалов в этой теме: ${count}.`, topicTitleSuffix: 'Советы к тесту на гражданство', authorPosts: 'Материалы',
    practiceQuestions: 'Тренировать вопросы с объяснениями', practiceExam: 'Начать пробный тест из 33 вопросов', practiceState: 'Вопросы для',
  },
  pl: {
    search: 'Szukaj na blogu', placeholder: 'Szukaj tytułów, tematów lub słów kluczowych', dateFilter: 'Filtruj według daty', allPeriods: 'Wszystkie okresy', allTopics: 'Wszystkie tematy', shown: 'poradników wyświetlono.', recommended: 'Polecane', minutes: 'min', read: 'Czytaj poradnik', moreBy: 'Więcej od', empty: 'Brak poradników dla tych filtrów. Zmień wyszukiwanie.', topicPages: 'Strony tematów', keywords: 'Popularne słowa kluczowe', all: 'Wszystkie', archive: 'Archiwum',
    updated: 'Sprawdzono', sources: 'Oficjalne źródła i status redakcyjny', sourceNote: 'Wiążących informacji udzielają właściwe urzędy.', policy: 'Jak przygotowujemy i aktualizujemy treści', author: 'Autor', topics: 'Tematy', more: 'Więcej poradników', newer: 'Nowszy', older: 'Starszy', related: 'Podobne poradniki',
    availableIn: 'Ten poradnik jest dostępny także w językach:', nativeGuides: 'Poradniki napisane po polsku', nativeGuidesIntro: 'Te wyjaśnienia napisano bezpośrednio po polsku.', otherLanguages: 'Blog w innych językach', otherLanguagesIntro: 'Wszystkie poradniki są dostępne po niemiecku, angielsku i turecku.',
    topicCount: (count) => `Poradniki w tym temacie: ${count}.`, topicTitleSuffix: 'Poradniki do testu na obywatelstwo', authorPosts: 'Poradniki',
    practiceQuestions: 'Ćwicz pytania z wyjaśnieniami', practiceExam: 'Rozpocznij test próbny z 33 pytaniami', practiceState: 'Pytania dla',
  },
  fa: {
    search: 'جستجو در وبلاگ', placeholder: 'جستجوی عنوان، موضوع یا کلیدواژه', dateFilter: 'فیلتر بر اساس تاریخ', allPeriods: 'همه دوره‌ها', allTopics: 'همه موضوع‌ها', shown: 'راهنما نمایش داده شد.', recommended: 'پیشنهادی', minutes: 'دقیقه', read: 'خواندن راهنما', moreBy: 'مطالب بیشتر از', empty: 'راهنمایی با این فیلترها پیدا نشد. لطفاً جستجو را تغییر دهید.', topicPages: 'صفحه‌های موضوعی', keywords: 'کلیدواژه‌های پرطرفدار', all: 'همه', archive: 'بایگانی',
    updated: 'تاریخ بازبینی', sources: 'منابع رسمی و وضعیت بازبینی', sourceNote: 'برای اطلاعات الزام‌آور به اداره‌های مسئول مراجعه کنید.', policy: 'محتوای خود را چگونه تهیه و به‌روز می‌کنیم', author: 'نویسنده', topics: 'موضوع‌ها', more: 'راهنماهای دیگر', newer: 'جدیدتر', older: 'قدیمی‌تر', related: 'راهنماهای مرتبط',
    availableIn: 'این راهنما به این زبان‌ها هم هست:', nativeGuides: 'راهنماهایی که به فارسی نوشته شده‌اند', nativeGuidesIntro: 'این توضیحات مستقیماً به فارسی و دری نوشته شده‌اند.', otherLanguages: 'وبلاگ به زبان‌های دیگر', otherLanguagesIntro: 'همه راهنماها به آلمانی، انگلیسی و ترکی در دسترس‌اند.',
    topicCount: (count) => `${count} راهنما در این موضوع.`, topicTitleSuffix: 'راهنمای آزمون شهروندی', authorPosts: 'راهنماها',
    practiceQuestions: 'تمرین سؤال‌ها با توضیح', practiceExam: 'شروع آزمون آزمایشی ۳۳ سؤالی', practiceState: 'سؤال‌های ایالت',
  },
  ps: {
    search: 'په بلاګ کې لټون', placeholder: 'سرلیک، موضوع یا کلیدي کلمه ولټوئ', dateFilter: 'د نېټې له مخې چاڼ', allPeriods: 'ټولې مودې', allTopics: 'ټولې موضوعګانې', shown: 'لارښودونه ښودل شوي.', recommended: 'وړاندیز شوی', minutes: 'دقیقې', read: 'لارښود ولولئ', moreBy: 'نور له', empty: 'د دې چاڼ لپاره لارښود ونه موندل شو. لټون بدل کړئ.', topicPages: 'د موضوعګانو پاڼې', keywords: 'مشهورې کلیدي کلمې', all: 'ټول', archive: 'آرشیف',
    updated: 'د کتنې نېټه', sources: 'رسمي سرچینې او د کتنې حالت', sourceNote: 'د پابندو معلوماتو لپاره مسؤولو ادارو ته مراجعه وکړئ.', policy: 'موږ خپل مطالب څنګه چمتو او تازه کوو', author: 'لیکوال', topics: 'موضوعګانې', more: 'نور لارښودونه', newer: 'نوی', older: 'زوړ', related: 'اړوند لارښودونه',
    availableIn: 'دا لارښود په دې ژبو هم شته:', nativeGuides: 'په پښتو لیکل شوي لارښودونه', nativeGuidesIntro: 'دا تشریحات مستقیم په پښتو لیکل شوي دي.', otherLanguages: 'بلاګ په نورو ژبو', otherLanguagesIntro: 'ټول لارښودونه په آلماني، انګلیسي او ترکي ژبو شته.',
    topicCount: (count) => `په دې موضوع کې ${count} لارښودونه.`, topicTitleSuffix: 'د تابعیت ازموینې لارښودونه', authorPosts: 'لارښودونه',
    practiceQuestions: 'پوښتنې له تشریح سره تمرین کړئ', practiceExam: 'د ۳۳ پوښتنو آزمایښتي ازموینه پیل کړئ', practiceState: 'د ایالت پوښتنې:',
  },
  ro: {
    search: 'Caută pe blog', placeholder: 'Caută titluri, teme sau cuvinte-cheie', dateFilter: 'Filtrează după dată', allPeriods: 'Toate perioadele', allTopics: 'Toate temele', shown: 'ghiduri afișate.', recommended: 'Recomandat', minutes: 'min', read: 'Citește ghidul', moreBy: 'Mai multe de la', empty: 'Niciun ghid nu corespunde acestor filtre. Modifică căutarea.', topicPages: 'Pagini tematice', keywords: 'Cuvinte-cheie populare', all: 'Toate', archive: 'Arhivă',
    updated: 'Verificat', sources: 'Surse oficiale și stadiu editorial', sourceNote: 'Pentru informații obligatorii, consultă autoritățile competente.', policy: 'Cum pregătim și actualizăm conținutul', author: 'Autor', topics: 'Teme', more: 'Alte ghiduri', newer: 'Mai nou', older: 'Mai vechi', related: 'Ghiduri similare',
    availableIn: 'Acest ghid este disponibil și în:', nativeGuides: 'Ghiduri scrise în română', nativeGuidesIntro: 'Aceste explicații sunt scrise direct în română.', otherLanguages: 'Blogul în alte limbi', otherLanguagesIntro: 'Toate ghidurile sunt disponibile în germană, engleză și turcă.',
    topicCount: (count) => `${count} ghiduri pe această temă.`, topicTitleSuffix: 'Ghiduri pentru testul de cetățenie', authorPosts: 'Ghiduri',
    practiceQuestions: 'Exersează întrebări cu explicații', practiceExam: 'Începe un test de probă cu 33 de întrebări', practiceState: 'Întrebări pentru',
  },
  it: {
    search: 'Cerca nel blog', placeholder: 'Cerca titoli, temi o parole chiave', dateFilter: 'Filtra per data', allPeriods: 'Tutti i periodi', allTopics: 'Tutti i temi', shown: 'guide mostrate.', recommended: 'Consigliato', minutes: 'min', read: 'Leggi la guida', moreBy: 'Altro da', empty: 'Nessuna guida corrisponde a questi filtri. Modifica la ricerca.', topicPages: 'Pagine dei temi', keywords: 'Parole chiave popolari', all: 'Tutti', archive: 'Archivio',
    updated: 'Verificato', sources: 'Fonti ufficiali e stato redazionale', sourceNote: 'Per informazioni vincolanti rivolgiti alle autorità competenti.', policy: 'Come prepariamo e aggiorniamo i contenuti', author: 'Autore', topics: 'Temi', more: 'Altre guide', newer: 'Più recente', older: 'Meno recente', related: 'Guide correlate',
    availableIn: 'Questa guida è disponibile anche in:', nativeGuides: 'Guide scritte in italiano', nativeGuidesIntro: 'Queste spiegazioni sono scritte direttamente in italiano.', otherLanguages: 'Il blog in altre lingue', otherLanguagesIntro: 'Tutte le guide sono disponibili in tedesco, inglese e turco.',
    topicCount: (count) => `${count} guide su questo tema.`, topicTitleSuffix: 'Guide al test di cittadinanza', authorPosts: 'Guide',
    practiceQuestions: 'Esercitati con domande spiegate', practiceExam: 'Inizia una simulazione con 33 domande', practiceState: 'Domande per',
  },
  es: {
    search: 'Buscar en el blog', placeholder: 'Busca títulos, temas o palabras clave', dateFilter: 'Filtrar por fecha', allPeriods: 'Todos los periodos', allTopics: 'Todos los temas', shown: 'guías mostradas.', recommended: 'Recomendado', minutes: 'min', read: 'Leer la guía', moreBy: 'Más de', empty: 'Ninguna guía coincide con estos filtros. Ajusta la búsqueda.', topicPages: 'Páginas de temas', keywords: 'Palabras clave populares', all: 'Todos', archive: 'Archivo',
    updated: 'Revisado', sources: 'Fuentes oficiales y estado editorial', sourceNote: 'Para información vinculante, consulta a las autoridades competentes.', policy: 'Cómo preparamos y actualizamos el contenido', author: 'Autor', topics: 'Temas', more: 'Más guías', newer: 'Más reciente', older: 'Más antigua', related: 'Guías relacionadas',
    availableIn: 'Esta guía también está disponible en:', nativeGuides: 'Guías escritas en español', nativeGuidesIntro: 'Estas explicaciones están escritas directamente en español.', otherLanguages: 'El blog en otros idiomas', otherLanguagesIntro: 'Todas las guías están disponibles en alemán, inglés y turco.',
    topicCount: (count) => `${count} guías sobre este tema.`, topicTitleSuffix: 'Guías del examen de ciudadanía', authorPosts: 'Guías',
    practiceQuestions: 'Practica preguntas con explicaciones', practiceExam: 'Empieza un examen de prueba de 33 preguntas', practiceState: 'Preguntas de',
  },
};
