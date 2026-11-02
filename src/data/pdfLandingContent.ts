import type { SupportedLang } from '../types/language';

export const PDF_ROUTE = 'einbuergerungstest-fragen-pdf';
/** Keep in sync with PDF_LANGUAGES in scripts/pdf/catalog-core.mjs. */
export const PDF_LANGUAGES = ['de', 'ar', 'tr', 'ua', 'en'] as const satisfies readonly SupportedLang[];
export type PdfLanguage = (typeof PDF_LANGUAGES)[number];

export function isPdfLanguage(lang: string): lang is PdfLanguage {
  return (PDF_LANGUAGES as readonly string[]).includes(lang);
}

interface PdfLandingCopy {
  title: string;
  description: string;
  keywords: string;
  eyebrow: string;
  heading: string;
  lead: string;
  download: string;
  fileMeta: (pages: number, size: string) => string;
  note: string;
  facts: ReadonlyArray<{ value: string; label: string }>;
  includesTitle: string;
  includes: readonly string[];
  checkedTitle: string;
  checked: (checkedOn: string, stand: string) => string;
  sampleTitle: string;
  sampleText: string;
  correctLabel: string;
  appTitle: string;
  appText: string;
  examCta: string;
  catalogCta: string;
  faq: ReadonlyArray<{ question: string; answer: string }>;
  /** Link text on the /fragen/ catalogue page. */
  catalogueLink: string;
}

export const pdfLandingContent: Record<PdfLanguage, PdfLandingCopy> = {
  de: {
    title: 'Leben in Deutschland Test: 300 Fragen und Antworten als PDF',
    description: 'Kostenloses PDF mit allen 300 Fragen und den 160 Bundesland-Fragen. Jede richtige Antwort ist markiert und im BAMF-Testcenter geprüft. Ohne Anmeldung.',
    keywords: 'test leben in deutschland 300 fragen und antworten pdf, leben in deutschland test pdf, einbürgerungstest fragen pdf, einbürgerungstest fragen zum ausdrucken, leben in deutschland test pdf mit antworten',
    eyebrow: 'Kostenloser Download',
    heading: 'Einbürgerungstest: alle Fragen und Antworten als PDF',
    lead: 'Laden Sie alle 300 allgemeinen Fragen und die 160 Fragen der Bundesländer kostenlos herunter. Die richtige Antwort ist immer markiert. Sie können das PDF am Handy lesen oder ausdrucken.',
    download: 'PDF herunterladen',
    fileMeta: (pages, size) => `${pages} Seiten · ${size} MB · ohne Anmeldung`,
    note: 'Dies ist ein unabhängiges Lernangebot. Das BAMF veröffentlicht den offiziellen Fragenkatalog ohne markierte Lösungen.',
    facts: [
      { value: '460', label: 'Fragen im PDF' },
      { value: '300 + 10', label: 'Fragen für Ihren Test' },
      { value: '33', label: 'Fragen in der Prüfung' },
      { value: '17', label: 'richtige Antworten für die Einbürgerung' },
    ],
    includesTitle: 'Das steht im PDF',
    includes: [
      'Alle 300 allgemeinen Fragen im offiziellen Wortlaut',
      'Je 10 Fragen für alle 16 Bundesländer',
      'Die richtige Antwort fett und mit Haken, auch im Schwarz-Weiß-Druck gut sichtbar',
      'Die Bilder zu den Fragen, zum Beispiel Wappen und Karten',
      'Ein Inhaltsverzeichnis mit Links zu jedem Abschnitt',
    ],
    checkedTitle: 'So haben wir die Antworten geprüft',
    checked: (checkedOn, stand) => `Wir haben alle 460 Antworten am ${checkedOn} im Online-Testcenter des BAMF geprüft. Der Fragentext folgt dem BAMF-Katalog mit Stand ${stand}.`,
    sampleTitle: 'Beispiele aus dem PDF',
    sampleText: 'So sehen die Fragen im PDF aus. Jede Frage können Sie auch online üben.',
    correctLabel: 'Richtige Antwort',
    appTitle: 'PDF oder App?',
    appText: 'Das PDF ist gut zum Lesen und Ausdrucken. Ob Sie die Antworten wirklich wissen, sehen Sie aber erst im Test. In der App simulieren Sie die Prüfung mit 33 Fragen und wiederholen Ihre Fehler. Ohne Installation geht es mit dem Online-Test.',
    examCta: 'Online-Test starten',
    catalogCta: 'Alle Fragen online',
    faq: [
      { question: 'Ist das PDF kostenlos?', answer: 'Ja. Sie laden es ohne Anmeldung und ohne E-Mail-Adresse herunter.' },
      { question: 'Ist das ein offizielles Dokument des BAMF?', answer: 'Nein. Die Fragen stammen aus dem offiziellen Katalog des BAMF, das PDF ist aber ein unabhängiges Lernangebot. Maßgeblich ist immer der Katalog des BAMF.' },
      { question: 'Warum 460 Fragen und nicht 300 oder 310?', answer: 'Für Ihren Test gelten 310 Fragen: 300 allgemeine Fragen und 10 Fragen zu Ihrem Bundesland. Das PDF enthält alle 16 Bundesländer, darum sind es 460. Lernen Sie nur Ihr Bundesland.' },
      { question: 'Kann ich das PDF ausdrucken?', answer: 'Ja. Das PDF hat das Format A4. Die richtigen Antworten sind auch im Schwarz-Weiß-Druck gut zu erkennen.' },
      { question: 'Reicht das PDF für die Vorbereitung?', answer: 'Mit dem PDF lernen Sie alle Fragen kennen. Machen Sie vor der Prüfung trotzdem Probetests mit 33 Fragen. So sehen Sie, welche Antworten Sie noch nicht sicher wissen.' },
    ],
    catalogueLink: 'Alle Fragen und Antworten als PDF herunterladen',
  },
  ar: {
    title: 'أسئلة الامتحان السياسي في ألمانيا مترجمة PDF مع الإجابات',
    description: 'ملف PDF مجاني يضم 300 سؤال عام و160 سؤالًا للولايات، بالألمانية والعربية مع تحديد الإجابة الصحيحة. راجعنا الإجابات في مركز اختبار BAMF. بدون تسجيل.',
    keywords: 'اسئلة الامتحان السياسي في المانيا مترجمة pdf, اسئلة امتحان السياسي في المانيا بالعربي pdf, الامتحان السياسي في المانيا pdf, Leben in Deutschland pdf عربي',
    eyebrow: 'تحميل مجاني',
    heading: 'أسئلة الامتحان السياسي في ألمانيا مترجمة بصيغة PDF',
    lead: 'حمّل مجانًا 300 سؤال عام و160 سؤالًا للولايات. النص الألماني بجانب الترجمة العربية، والإجابة الصحيحة محددة دائمًا. يمكنك قراءة الملف على الهاتف أو طباعته.',
    download: 'تحميل ملف PDF',
    fileMeta: (pages, size) => `${pages} صفحة · ${size} ميغابايت · بدون تسجيل`,
    note: 'هذه منصة تعليمية مستقلة. ينشر BAMF كتالوج الأسئلة الرسمي بالألمانية بدون تحديد الإجابات. يُجرى الامتحان باللغة الألمانية، والترجمة للمساعدة على التعلّم فقط.',
    facts: [
      { value: '460', label: 'سؤالًا في الملف' },
      { value: '300 + 10', label: 'أسئلة امتحانك' },
      { value: '33', label: 'سؤالًا في الامتحان' },
      { value: '17', label: 'إجابة صحيحة للتجنيس' },
    ],
    includesTitle: 'ماذا يوجد في الملف؟',
    includes: [
      'جميع الأسئلة العامة الـ300 بنصها الألماني الرسمي مع الترجمة العربية',
      '10 أسئلة لكل ولاية من الولايات الـ16',
      'الإجابة الصحيحة بخط عريض مع علامة صح، وهي واضحة أيضًا عند الطباعة بالأبيض والأسود',
      'صور الأسئلة، مثل الشعارات والخرائط',
      'فهرس مع روابط لكل قسم',
    ],
    checkedTitle: 'كيف راجعنا الإجابات؟',
    checked: (checkedOn, stand) => `راجعنا الإجابات الـ460 كلها بتاريخ ${checkedOn} في مركز الاختبار الإلكتروني التابع لـBAMF. النص الألماني مأخوذ من كتالوج BAMF بإصدار ${stand}.`,
    sampleTitle: 'أمثلة من الملف',
    sampleText: 'هكذا تظهر الأسئلة في الملف. ويمكنك التدرّب على كل سؤال عبر الإنترنت أيضًا.',
    correctLabel: 'الإجابة الصحيحة',
    appTitle: 'PDF أم التطبيق؟',
    appText: 'ملف PDF مناسب للقراءة والطباعة، لكنك لن تعرف إن كنت تحفظ الإجابات فعلًا إلا في الاختبار. في التطبيق تجرّب محاكاة الامتحان بـ33 سؤالًا وتراجع أخطاءك. وبدون تثبيت يمكنك استخدام الاختبار عبر الإنترنت.',
    examCta: 'ابدأ الاختبار عبر الإنترنت',
    catalogCta: 'جميع الأسئلة عبر الإنترنت',
    faq: [
      { question: 'هل الملف مجاني؟', answer: 'نعم. يمكنك تحميله بدون تسجيل وبدون بريد إلكتروني.' },
      { question: 'هل هذا مستند رسمي من BAMF؟', answer: 'لا. الأسئلة من كتالوج BAMF الرسمي، لكن الملف والترجمة من منصة تعليمية مستقلة. المرجع الرسمي هو دائمًا كتالوج BAMF بالألمانية.' },
      { question: 'لماذا 460 سؤالًا وليس 300 أو 310؟', answer: 'يخصك 310 أسئلة: 300 سؤال عام و10 أسئلة عن ولايتك. يتضمن الملف الولايات الـ16 كلها، لذلك يصل العدد إلى 460. ادرس ولايتك فقط.' },
      { question: 'هل يمكنني طباعة الملف؟', answer: 'نعم. الملف بحجم A4، والإجابات الصحيحة واضحة أيضًا عند الطباعة بالأبيض والأسود.' },
      { question: 'هل الملف كافٍ للاستعداد؟', answer: 'يعرّفك الملف على جميع الأسئلة. لكن جرّب قبل الامتحان اختبارات من 33 سؤالًا لتعرف الإجابات التي لم تحفظها جيدًا.' },
    ],
    catalogueLink: 'تحميل جميع الأسئلة والإجابات بصيغة PDF',
  },
  tr: {
    title: 'Leben in Deutschland testi PDF: 300 soru ve cevap Türkçe',
    description: '300 genel soru ve 160 eyalet sorusu ücretsiz PDF olarak. Almanca metin ve Türkçe çeviri yan yana, doğru cevaplar işaretli ve BAMF test merkezinde kontrol edildi.',
    keywords: 'leben in deutschland test pdf türkçe, leben in deutschland soruları türkçe pdf, almanya vatandaşlık sınavı soruları pdf, einbürgerungstest türkçe pdf',
    eyebrow: 'Ücretsiz indirme',
    heading: 'Leben in Deutschland: tüm sorular ve cevaplar Türkçe PDF',
    lead: '300 genel soruyu ve 160 eyalet sorusunu ücretsiz indirin. Almanca metin ve Türkçe çeviri yan yana, doğru cevap her zaman işaretli. PDF\'i telefonda okuyabilir veya yazdırabilirsiniz.',
    download: 'PDF\'i indir',
    fileMeta: (pages, size) => `${pages} sayfa · ${size} MB · üyelik yok`,
    note: 'Bu, bağımsız bir öğrenme kaynağıdır. BAMF resmî soru kataloğunu Almanca ve cevapları işaretlenmemiş olarak yayınlar. Sınav Almanca yapılır; çeviri yalnızca öğrenmeye yardımcıdır.',
    facts: [
      { value: '460', label: 'soru PDF\'te' },
      { value: '300 + 10', label: 'soru sizin sınavınız için' },
      { value: '33', label: 'soru sınavda' },
      { value: '17', label: 'doğru cevap vatandaşlık için' },
    ],
    includesTitle: 'PDF\'in içinde neler var?',
    includes: [
      'Resmî Almanca metniyle ve Türkçe çevirisiyle 300 genel sorunun tamamı',
      '16 eyaletin her biri için 10 soru',
      'Kalın yazılmış ve onay işaretli doğru cevap; siyah beyaz baskıda da net görünür',
      'Sorulardaki görseller, örneğin armalar ve haritalar',
      'Her bölüme bağlantı veren içindekiler sayfası',
    ],
    checkedTitle: 'Cevapları nasıl kontrol ettik?',
    checked: (checkedOn, stand) => `460 cevabın tamamını ${checkedOn} tarihinde BAMF çevrimiçi test merkezinde kontrol ettik. Almanca metin, BAMF kataloğunun ${stand} tarihli sürümüne dayanır.`,
    sampleTitle: 'PDF\'ten örnekler',
    sampleText: 'Sorular PDF\'te böyle görünür. Her soruyu çevrimiçi olarak da çözebilirsiniz.',
    correctLabel: 'Doğru cevap',
    appTitle: 'PDF mi, uygulama mı?',
    appText: 'PDF okumak ve yazdırmak için idealdir. Ama cevapları gerçekten bilip bilmediğinizi ancak bir testte görürsünüz. Uygulamada 33 soruluk deneme sınavı çözer, yanlışlarınızı tekrar edersiniz. Kurulum istemiyorsanız çevrimiçi testi kullanabilirsiniz.',
    examCta: 'Çevrimiçi testi başlat',
    catalogCta: 'Tüm sorular çevrimiçi',
    faq: [
      { question: 'PDF ücretsiz mi?', answer: 'Evet. Üyelik ve e-posta adresi olmadan indirebilirsiniz.' },
      { question: 'Bu BAMF\'ın resmî belgesi mi?', answer: 'Hayır. Sorular BAMF\'ın resmî kataloğundan alınmıştır, ancak PDF ve çeviriler bağımsız bir öğrenme kaynağına aittir. Esas olan her zaman BAMF\'ın Almanca kataloğudur.' },
      { question: 'Neden 300 veya 310 değil de 460 soru?', answer: 'Sizin sınavınız için 310 soru geçerlidir: 300 genel soru ve eyaletinizle ilgili 10 soru. PDF 16 eyaletin tamamını içerdiği için toplam 460 sorudur. Yalnızca kendi eyaletinizi çalışın.' },
      { question: 'PDF\'i yazdırabilir miyim?', answer: 'Evet. PDF A4 boyutundadır. Doğru cevaplar siyah beyaz baskıda da net görünür.' },
      { question: 'Hazırlık için PDF yeterli mi?', answer: 'PDF ile tüm soruları öğrenirsiniz. Yine de sınavdan önce 33 soruluk denemeler yapın. Böylece hangi cevaplardan henüz emin olmadığınızı görürsünüz.' },
    ],
    catalogueLink: 'Tüm soruları ve cevapları PDF olarak indir',
  },
  ua: {
    title: 'Leben in Deutschland PDF українською: 300 запитань з відповідями',
    description: '300 загальних запитань і 160 запитань федеральних земель у безкоштовному PDF. Німецький текст і український переклад поруч, відповіді перевірено в центрі тестування BAMF.',
    keywords: 'leben in deutschland pdf українською, тест leben in deutschland pdf, 300 запитань pdf, тест на громадянство німеччини pdf',
    eyebrow: 'Безкоштовне завантаження',
    heading: 'Leben in Deutschland: усі запитання та відповіді у PDF українською',
    lead: 'Завантажте безкоштовно 300 загальних запитань і 160 запитань федеральних земель. Німецький текст і український переклад поруч, правильну відповідь завжди позначено. PDF можна читати на телефоні або надрукувати.',
    download: 'Завантажити PDF',
    fileMeta: (pages, size) => `${pages} сторінок · ${size} МБ · без реєстрації`,
    note: 'Це незалежний навчальний ресурс. BAMF публікує офіційний каталог німецькою без позначених відповідей. Іспит проводиться німецькою, переклад лише допомагає в навчанні.',
    facts: [
      { value: '460', label: 'запитань у PDF' },
      { value: '300 + 10', label: 'запитань для вашого тесту' },
      { value: '33', label: 'запитання на іспиті' },
      { value: '17', label: 'правильних відповідей для громадянства' },
    ],
    includesTitle: 'Що є в PDF',
    includes: [
      'Усі 300 загальних запитань в офіційному німецькому тексті з українським перекладом',
      'По 10 запитань для кожної з 16 федеральних земель',
      'Правильна відповідь жирним шрифтом і з галочкою, добре видно й у чорно-білому друці',
      'Зображення до запитань, наприклад герби та карти',
      'Зміст із посиланнями на кожен розділ',
    ],
    checkedTitle: 'Як ми перевірили відповіді',
    checked: (checkedOn, stand) => `Ми перевірили всі 460 відповідей ${checkedOn} в онлайн-центрі тестування BAMF. Німецький текст відповідає каталогу BAMF у редакції від ${stand}.`,
    sampleTitle: 'Приклади з PDF',
    sampleText: 'Так запитання виглядають у PDF. Кожне запитання можна також тренувати онлайн.',
    correctLabel: 'Правильна відповідь',
    appTitle: 'PDF чи застосунок?',
    appText: 'PDF зручно читати й друкувати. Але чи справді ви знаєте відповіді, стане зрозуміло лише на тесті. У застосунку ви складаєте пробний іспит із 33 запитань і повторюєте свої помилки. Без встановлення можна пройти онлайн-тест.',
    examCta: 'Почати онлайн-тест',
    catalogCta: 'Усі запитання онлайн',
    faq: [
      { question: 'Чи безкоштовний цей PDF?', answer: 'Так. Його можна завантажити без реєстрації та без електронної адреси.' },
      { question: 'Це офіційний документ BAMF?', answer: 'Ні. Запитання взято з офіційного каталогу BAMF, але PDF і переклад належать незалежному навчальному ресурсу. Офіційним завжди є німецький каталог BAMF.' },
      { question: 'Чому 460 запитань, а не 300 чи 310?', answer: 'Для вашого тесту діють 310 запитань: 300 загальних і 10 про вашу федеральну землю. У PDF є всі 16 земель, тому всього 460. Вивчайте лише свою землю.' },
      { question: 'Чи можна надрукувати PDF?', answer: 'Так. PDF має формат A4. Правильні відповіді добре видно й у чорно-білому друці.' },
      { question: 'Чи достатньо PDF для підготовки?', answer: 'З PDF ви вивчите всі запитання. Але перед іспитом пройдіть пробні тести з 33 запитань, щоб побачити, які відповіді ви ще знаєте невпевнено.' },
    ],
    catalogueLink: 'Завантажити всі запитання та відповіді у PDF',
  },
  en: {
    title: 'Leben in Deutschland test PDF: all 300 questions and answers',
    description: 'Free PDF with all 300 general questions and 160 federal state questions. German and English side by side, with every correct answer checked in the BAMF test centre.',
    keywords: 'leben in deutschland test pdf, leben in deutschland test questions pdf, german citizenship test questions pdf, einbürgerungstest questions in english pdf',
    eyebrow: 'Free download',
    heading: 'Leben in Deutschland test: all questions and answers as a PDF',
    lead: 'Download all 300 general questions and the 160 federal state questions for free. German and English are side by side, and the correct answer is always marked. Read the PDF on your phone or print it.',
    download: 'Download the PDF',
    fileMeta: (pages, size) => `${pages} pages · ${size} MB · no sign-up`,
    note: 'This is an independent study resource. BAMF publishes the official catalogue in German without marked answers. The exam is in German; the translation is only a study aid.',
    facts: [
      { value: '460', label: 'questions in the PDF' },
      { value: '300 + 10', label: 'questions for your test' },
      { value: '33', label: 'questions in the exam' },
      { value: '17', label: 'correct answers for citizenship' },
    ],
    includesTitle: 'What is in the PDF',
    includes: [
      'All 300 general questions in the official German wording, with an English translation',
      '10 questions for each of the 16 federal states',
      'The correct answer in bold with a check mark, clear in black-and-white print too',
      'The images for the questions, such as coats of arms and maps',
      'A table of contents with links to each section',
    ],
    checkedTitle: 'How we checked the answers',
    checked: (checkedOn, stand) => `We checked all 460 answers on ${checkedOn} in the BAMF online test centre. The German text follows the BAMF catalogue version of ${stand}.`,
    sampleTitle: 'Examples from the PDF',
    sampleText: 'This is how the questions look in the PDF. You can also practise each question online.',
    correctLabel: 'Correct answer',
    appTitle: 'PDF or app?',
    appText: 'The PDF is good for reading and printing. But you only find out whether you really know the answers in a test. In the app you take the 33-question practice exam and repeat your mistakes. Without installing anything, you can use the online test.',
    examCta: 'Start the online test',
    catalogCta: 'All questions online',
    faq: [
      { question: 'Is the PDF free?', answer: 'Yes. You can download it without an account or an email address.' },
      { question: 'Is this an official BAMF document?', answer: 'No. The questions come from the official BAMF catalogue, but the PDF and the translation are from an independent study resource. The German BAMF catalogue is always the official version.' },
      { question: 'Why 460 questions and not 300 or 310?', answer: 'Your test uses 310 questions: 300 general questions and 10 about your federal state. The PDF includes all 16 states, so the total is 460. Learn only your own state.' },
      { question: 'Can I print the PDF?', answer: 'Yes. The PDF is A4 size, and the correct answers are clear in black-and-white print too.' },
      { question: 'Is the PDF enough to prepare?', answer: 'The PDF shows you every question. Still, take 33-question practice tests before the exam, so you can see which answers you do not know well yet.' },
    ],
    catalogueLink: 'Download all questions and answers as a PDF',
  },
};
