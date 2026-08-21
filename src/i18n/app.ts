import type { SupportedLang } from '../types/language';

type FeatureCopy = { title: string; text: string };

export interface AppPageCopy {
  meta: { title: string; description: string; keywords: string };
  pageName: string;
  freeStart: string;
  ratingLabel: string;
  hero: { title: string; text: string };
  store: { apple: string; google: string };
  stats: { questions: string; examMode: string; languages: string };
  preview: { title: string; count: string };
  highlights: [
    { value: string; label: string },
    { value: string; label: string },
    { value: string; label: string },
  ];
  why: { eyebrow: string; title: string };
  features: [FeatureCopy, FeatureCopy, FeatureCopy];
  cta: { eyebrow: string; title: string };
  reviews: { eyebrow: string; title: string };
  screenshotAlts: [string, string, string];
}

const appPageCopy: Record<SupportedLang, AppPageCopy> = {
  de: {
    meta: {
      title: 'Leben in Deutschland App für iOS & Android | Einbürgerungstest 2026',
      description: 'Laden Sie die Leben in Deutschland App für iOS und Android herunter: 310 Fragen, Prüfungssimulation, Lernfortschritt und mehrsprachige Erklärungen.',
      keywords: 'Leben in Deutschland App, Einbürgerungstest App, Leben in Deutschland 310 Fragen, BAMF App, iOS, Android, Prüfungssimulation',
    },
    pageName: 'App',
    freeStart: 'Kostenlos starten',
    ratingLabel: 'App-Bewertung',
    hero: {
      title: 'Bestehen Sie den Einbürgerungstest mit der App.',
      text: 'Lernen Sie alle 310 Fragen, simulieren Sie die Prüfung und behalten Sie Ihren Fortschritt im Blick. Laden Sie die App jetzt auf Ihr Smartphone.',
    },
    store: { apple: 'Laden im', google: 'Jetzt bei' },
    stats: { questions: 'Fragen', examMode: 'Prüfungsmodus', languages: 'Sprachen' },
    preview: { title: 'Ein Blick in die App', count: '10 Einblicke' },
    highlights: [
      { value: '4.8/5', label: 'Bewertung in den Stores' },
      { value: 'Weniger Stress', label: 'durch echte Prüfungssimulation' },
      { value: 'Sofort starten', label: 'ohne lange Einrichtung' },
    ],
    why: { eyebrow: 'Warum die App?', title: 'Alles, was Sie zum Üben brauchen.' },
    features: [
      { title: '310 offizielle Fragen', text: 'Alle allgemeinen BAMF-Fragen plus Bundesland-Fragen kompakt in einer App.' },
      { title: 'Prüfungssimulation', text: 'Üben Sie mit 33 zufälligen Fragen, Zeitlimit und direkter Auswertung.' },
      { title: 'Fortschritt behalten', text: 'Sehen Sie, welche Fragen sicher sitzen und welche Sie wiederholen sollten.' },
    ],
    cta: { eyebrow: 'Bereit für die nächste Lerneinheit?', title: 'Laden Sie die App und üben Sie heute die ersten Fragen.' },
    reviews: { eyebrow: 'Bewertungen', title: 'Was Nutzer über die App sagen' },
    screenshotAlts: [
      'Leben in Deutschland App: Übersicht und Bewertung',
      'Leben in Deutschland App: persönlicher Lernplan',
      'Leben in Deutschland App: Lernfortschritt und Prüfungsbereitschaft',
    ],
  },
  en: {
    meta: {
      title: 'Leben in Deutschland App for iOS & Android | Naturalization Test 2026',
      description: 'Download the Leben in Deutschland app for iOS and Android with 310 questions, exam simulation, learning progress, and multilingual explanations.',
      keywords: 'Leben in Deutschland app, naturalization test app, 310 questions, BAMF app, iOS, Android, exam simulation',
    },
    pageName: 'App',
    freeStart: 'Start free',
    ratingLabel: 'App rating',
    hero: {
      title: 'Prepare for the naturalization test with the app.',
      text: 'Learn all 310 questions, simulate the exam, and track your progress. Download the app on your phone now.',
    },
    store: { apple: 'Download on the', google: 'Get it on' },
    stats: { questions: 'Questions', examMode: 'Exam mode', languages: 'Languages' },
    preview: { title: 'Inside the app', count: '10 screens' },
    highlights: [
      { value: '4.8/5', label: 'Store rating' },
      { value: 'Less stress', label: 'with realistic exam practice' },
      { value: 'Start now', label: 'without a long setup' },
    ],
    why: { eyebrow: 'Why the app?', title: 'Everything you need to practice.' },
    features: [
      { title: '310 official questions', text: 'All general BAMF questions plus state-specific questions in one compact app.' },
      { title: 'Exam simulation', text: 'Practice with 33 random questions, a timer, and instant results.' },
      { title: 'Track progress', text: 'See which questions you know well and which ones need another pass.' },
    ],
    cta: { eyebrow: 'Ready for your next practice session?', title: 'Download the app and practice your first questions today.' },
    reviews: { eyebrow: 'Reviews', title: 'What users say about the app' },
    screenshotAlts: [
      'Leben in Deutschland app overview and rating',
      'Personal learning plan in the Leben in Deutschland app',
      'Learning progress and exam readiness in the Leben in Deutschland app',
    ],
  },
  tr: {
    meta: {
      title: 'iOS ve Android için Leben in Deutschland Uygulaması | Vatandaşlık Testi 2026',
      description: '310 soru, sınav simülasyonu, öğrenme takibi ve çok dilli açıklamalarla Leben in Deutschland uygulamasını iOS ve Android için indirin.',
      keywords: 'Leben in Deutschland uygulaması, vatandaşlık testi uygulaması, 310 soru, BAMF, iOS, Android, sınav simülasyonu',
    },
    pageName: 'Uygulama',
    freeStart: 'Ücretsiz başla',
    ratingLabel: 'Uygulama puanı',
    hero: {
      title: 'Vatandaşlık testine uygulamayla güvenle hazırlanın.',
      text: '310 sorunun tamamını öğrenin, sınavı simüle edin ve ilerlemenizi takip edin. Uygulamayı şimdi telefonunuza indirin.',
    },
    store: { apple: 'Şuradan indirin', google: 'Şuradan edinin' },
    stats: { questions: 'Soru', examMode: 'Sınav modu', languages: 'Dil' },
    preview: { title: 'Uygulamaya göz atın', count: '10 ekran' },
    highlights: [
      { value: '4.8/5', label: 'Mağaza puanı' },
      { value: 'Daha az stres', label: 'gerçekçi sınav simülasyonuyla' },
      { value: 'Hemen başlayın', label: 'uzun kurulum gerektirmeden' },
    ],
    why: { eyebrow: 'Neden uygulama?', title: 'Çalışmak için ihtiyacınız olan her şey.' },
    features: [
      { title: '310 resmî soru', text: 'Tüm genel BAMF soruları ve eyalet soruları tek bir uygulamada.' },
      { title: 'Sınav simülasyonu', text: '33 rastgele soru, süre sınırı ve anlık sonuçlarla pratik yapın.' },
      { title: 'İlerlemenizi izleyin', text: 'Hangi soruları bildiğinizi ve hangilerini tekrarlamanız gerektiğini görün.' },
    ],
    cta: { eyebrow: 'Sıradaki çalışma turuna hazır mısınız?', title: 'Uygulamayı indirin ve ilk sorularınızı bugün çözün.' },
    reviews: { eyebrow: 'Değerlendirmeler', title: 'Kullanıcılar uygulama hakkında ne diyor?' },
    screenshotAlts: [
      'Leben in Deutschland uygulaması genel bakış ve değerlendirme ekranı',
      'Leben in Deutschland uygulamasında kişisel çalışma planı',
      'Leben in Deutschland uygulamasında öğrenme ilerlemesi ve sınava hazırlık',
    ],
  },
  ar: {
    meta: {
      title: 'تطبيق Leben in Deutschland لنظامي iOS وAndroid | اختبار التجنّس 2026',
      description: 'نزّل تطبيق Leben in Deutschland لنظامي iOS وAndroid وتدرّب على 310 أسئلة مع محاكاة للاختبار وتتبع التقدم وشروحات متعددة اللغات.',
      keywords: 'تطبيق Leben in Deutschland، اختبار التجنّس، 310 أسئلة، BAMF، iOS، Android، محاكاة الاختبار',
    },
    pageName: 'التطبيق',
    freeStart: 'ابدأ مجانًا',
    ratingLabel: 'تقييم التطبيق',
    hero: {
      title: 'استعد لاختبار التجنّس بثقة باستخدام التطبيق.',
      text: 'تعلّم جميع الأسئلة الـ310، وحاكِ الاختبار، وتابع تقدمك. نزّل التطبيق الآن على هاتفك.',
    },
    store: { apple: 'نزّله من', google: 'احصل عليه من' },
    stats: { questions: 'أسئلة', examMode: 'وضع الاختبار', languages: 'لغات' },
    preview: { title: 'نظرة داخل التطبيق', count: '10 شاشات' },
    highlights: [
      { value: '4.8/5', label: 'التقييم في المتاجر' },
      { value: 'توتر أقل', label: 'بفضل محاكاة واقعية للاختبار' },
      { value: 'ابدأ الآن', label: 'من دون إعداد طويل' },
    ],
    why: { eyebrow: 'لماذا التطبيق؟', title: 'كل ما تحتاج إليه للتدرّب.' },
    features: [
      { title: '310 أسئلة رسمية', text: 'جميع أسئلة BAMF العامة وأسئلة الولاية في تطبيق واحد.' },
      { title: 'محاكاة الاختبار', text: 'تدرّب على 33 سؤالًا عشوائيًا مع مؤقت ونتائج فورية.' },
      { title: 'تتبّع التقدم', text: 'اعرف الأسئلة التي أتقنتها وتلك التي تحتاج إلى مراجعتها.' },
    ],
    cta: { eyebrow: 'هل أنت مستعد لجلسة التعلّم التالية؟', title: 'نزّل التطبيق وابدأ اليوم بحل أسئلتك الأولى.' },
    reviews: { eyebrow: 'التقييمات', title: 'ماذا يقول المستخدمون عن التطبيق؟' },
    screenshotAlts: [
      'نظرة عامة وتقييم في تطبيق Leben in Deutschland',
      'خطة تعلم شخصية في تطبيق Leben in Deutschland',
      'تقدم التعلم والاستعداد للاختبار في تطبيق Leben in Deutschland',
    ],
  },
  ua: {
    meta: {
      title: 'Застосунок Leben in Deutschland для iOS та Android | Тест на громадянство 2026',
      description: 'Завантажте Leben in Deutschland для iOS та Android: 310 запитань, симуляція іспиту, відстеження прогресу й багатомовні пояснення.',
      keywords: 'Leben in Deutschland, застосунок для тесту на громадянство, 310 запитань, BAMF, iOS, Android, симуляція іспиту',
    },
    pageName: 'Застосунок',
    freeStart: 'Почати безкоштовно',
    ratingLabel: 'Оцінка застосунку',
    hero: {
      title: 'Підготуйтеся до тесту на громадянство із застосунком.',
      text: 'Вивчіть усі 310 запитань, пройдіть симуляцію іспиту та стежте за прогресом. Завантажте застосунок на телефон.',
    },
    store: { apple: 'Завантажити в', google: 'Завантажити з' },
    stats: { questions: 'Запитань', examMode: 'Режим іспиту', languages: 'Мов' },
    preview: { title: 'Усередині застосунку', count: '10 екранів' },
    highlights: [
      { value: '4.8/5', label: 'Оцінка в магазинах' },
      { value: 'Менше стресу', label: 'з реалістичною симуляцією іспиту' },
      { value: 'Почніть зараз', label: 'без тривалого налаштування' },
    ],
    why: { eyebrow: 'Чому застосунок?', title: 'Усе необхідне для підготовки.' },
    features: [
      { title: '310 офіційних запитань', text: 'Усі загальні запитання BAMF і запитання федеральної землі в одному застосунку.' },
      { title: 'Симуляція іспиту', text: 'Практикуйтеся з 33 випадковими запитаннями, таймером і миттєвим результатом.' },
      { title: 'Відстеження прогресу', text: 'Дізнавайтеся, які запитання вже засвоєні, а які варто повторити.' },
    ],
    cta: { eyebrow: 'Готові до наступного заняття?', title: 'Завантажте застосунок і виконайте перші завдання вже сьогодні.' },
    reviews: { eyebrow: 'Відгуки', title: 'Що користувачі кажуть про застосунок' },
    screenshotAlts: [
      'Огляд та оцінка застосунку Leben in Deutschland',
      'Персональний план навчання в застосунку Leben in Deutschland',
      'Прогрес навчання та готовність до іспиту в застосунку Leben in Deutschland',
    ],
  },
  ru: {
    meta: {
      title: 'Приложение Leben in Deutschland для iOS и Android | Тест на гражданство 2026',
      description: 'Скачайте Leben in Deutschland для iOS и Android: 310 вопросов, симуляция экзамена, отслеживание прогресса и многоязычные объяснения.',
      keywords: 'Leben in Deutschland, приложение для теста на гражданство, 310 вопросов, BAMF, iOS, Android, симуляция экзамена',
    },
    pageName: 'Приложение',
    freeStart: 'Начать бесплатно',
    ratingLabel: 'Рейтинг приложения',
    hero: {
      title: 'Подготовьтесь к тесту на гражданство с приложением.',
      text: 'Изучите все 310 вопросов, пройдите симуляцию экзамена и следите за прогрессом. Скачайте приложение на телефон.',
    },
    store: { apple: 'Загрузите в', google: 'Доступно в' },
    stats: { questions: 'Вопросов', examMode: 'Режим экзамена', languages: 'Языков' },
    preview: { title: 'Внутри приложения', count: '10 экранов' },
    highlights: [
      { value: '4.8/5', label: 'Рейтинг в магазинах' },
      { value: 'Меньше стресса', label: 'благодаря реалистичной симуляции' },
      { value: 'Начните сейчас', label: 'без долгой настройки' },
    ],
    why: { eyebrow: 'Почему приложение?', title: 'Всё необходимое для подготовки.' },
    features: [
      { title: '310 официальных вопросов', text: 'Все общие вопросы BAMF и вопросы федеральной земли в одном приложении.' },
      { title: 'Симуляция экзамена', text: 'Тренируйтесь с 33 случайными вопросами, таймером и мгновенным результатом.' },
      { title: 'Отслеживание прогресса', text: 'Узнавайте, какие вопросы вы знаете, а какие нужно повторить.' },
    ],
    cta: { eyebrow: 'Готовы к следующему занятию?', title: 'Скачайте приложение и ответьте на первые вопросы уже сегодня.' },
    reviews: { eyebrow: 'Отзывы', title: 'Что пользователи говорят о приложении' },
    screenshotAlts: [
      'Обзор и рейтинг приложения Leben in Deutschland',
      'Персональный план обучения в приложении Leben in Deutschland',
      'Прогресс и готовность к экзамену в приложении Leben in Deutschland',
    ],
  },
  pl: {
    meta: {
      title: 'Aplikacja Leben in Deutschland na iOS i Android | Test na obywatelstwo 2026',
      description: 'Pobierz Leben in Deutschland na iOS i Android: 310 pytań, symulacja egzaminu, śledzenie postępów i wielojęzyczne wyjaśnienia.',
      keywords: 'Leben in Deutschland, aplikacja do testu na obywatelstwo, 310 pytań, BAMF, iOS, Android, symulacja egzaminu',
    },
    pageName: 'Aplikacja',
    freeStart: 'Zacznij bezpłatnie',
    ratingLabel: 'Ocena aplikacji',
    hero: {
      title: 'Przygotuj się do testu na obywatelstwo z aplikacją.',
      text: 'Poznaj wszystkie 310 pytań, przeprowadź symulację egzaminu i śledź postępy. Pobierz aplikację na telefon.',
    },
    store: { apple: 'Pobierz w', google: 'Pobierz z' },
    stats: { questions: 'Pytań', examMode: 'Tryb egzaminu', languages: 'Języków' },
    preview: { title: 'Wewnątrz aplikacji', count: '10 ekranów' },
    highlights: [
      { value: '4.8/5', label: 'Ocena w sklepach' },
      { value: 'Mniej stresu', label: 'dzięki realistycznej symulacji' },
      { value: 'Zacznij teraz', label: 'bez długiej konfiguracji' },
    ],
    why: { eyebrow: 'Dlaczego aplikacja?', title: 'Wszystko, czego potrzebujesz do nauki.' },
    features: [
      { title: '310 oficjalnych pytań', text: 'Wszystkie ogólne pytania BAMF i pytania landowe w jednej aplikacji.' },
      { title: 'Symulacja egzaminu', text: 'Ćwicz z 33 losowymi pytaniami, limitem czasu i natychmiastowym wynikiem.' },
      { title: 'Śledzenie postępów', text: 'Sprawdzaj, które pytania już znasz, a które warto powtórzyć.' },
    ],
    cta: { eyebrow: 'Gotowy na kolejną sesję?', title: 'Pobierz aplikację i rozwiąż pierwsze pytania jeszcze dziś.' },
    reviews: { eyebrow: 'Opinie', title: 'Co użytkownicy mówią o aplikacji' },
    screenshotAlts: [
      'Przegląd i ocena aplikacji Leben in Deutschland',
      'Osobisty plan nauki w aplikacji Leben in Deutschland',
      'Postępy w nauce i gotowość do egzaminu w aplikacji Leben in Deutschland',
    ],
  },
  fa: {
    meta: {
      title: 'اپلیکیشن Leben in Deutschland برای iOS و Android | آزمون تابعیت 2026',
      description: 'اپلیکیشن Leben in Deutschland را برای iOS و Android دانلود کنید: 310 سؤال، شبیه‌سازی آزمون، پیگیری پیشرفت و توضیحات چندزبانه.',
      keywords: 'اپلیکیشن Leben in Deutschland، آزمون تابعیت، 310 سؤال، BAMF، iOS، Android، شبیه‌سازی آزمون',
    },
    pageName: 'اپلیکیشن',
    freeStart: 'رایگان شروع کنید',
    ratingLabel: 'امتیاز اپلیکیشن',
    hero: {
      title: 'با اپلیکیشن برای آزمون تابعیت آماده شوید.',
      text: 'همه 310 سؤال را یاد بگیرید، آزمون را شبیه‌سازی کنید و پیشرفت خود را ببینید. همین حالا اپلیکیشن را دانلود کنید.',
    },
    store: { apple: 'دانلود از', google: 'دریافت از' },
    stats: { questions: 'سؤال', examMode: 'حالت آزمون', languages: 'زبان' },
    preview: { title: 'نگاهی به اپلیکیشن', count: '10 صفحه' },
    highlights: [
      { value: '4.8/5', label: 'امتیاز در فروشگاه‌ها' },
      { value: 'استرس کمتر', label: 'با شبیه‌سازی واقعی آزمون' },
      { value: 'همین حالا شروع کنید', label: 'بدون راه‌اندازی طولانی' },
    ],
    why: { eyebrow: 'چرا اپلیکیشن؟', title: 'همه آنچه برای تمرین نیاز دارید.' },
    features: [
      { title: '310 سؤال رسمی', text: 'همه پرسش‌های عمومی BAMF و پرسش‌های ایالتی در یک اپلیکیشن.' },
      { title: 'شبیه‌سازی آزمون', text: 'با 33 سؤال تصادفی، زمان‌سنج و نتیجه فوری تمرین کنید.' },
      { title: 'پیگیری پیشرفت', text: 'ببینید کدام سؤال‌ها را می‌دانید و کدام‌ها نیاز به مرور دارند.' },
    ],
    cta: { eyebrow: 'برای جلسه بعدی آماده‌اید؟', title: 'اپلیکیشن را دانلود کنید و امروز به نخستین سؤال‌ها پاسخ دهید.' },
    reviews: { eyebrow: 'نظرها', title: 'کاربران درباره اپلیکیشن چه می‌گویند؟' },
    screenshotAlts: [
      'نمای کلی و امتیاز اپلیکیشن Leben in Deutschland',
      'برنامه یادگیری شخصی در اپلیکیشن Leben in Deutschland',
      'پیشرفت یادگیری و آمادگی آزمون در اپلیکیشن Leben in Deutschland',
    ],
  },
  ps: {
    meta: {
      title: 'د iOS او Android لپاره Leben in Deutschland اپ | د تابعیت ازموینه 2026',
      description: 'د iOS او Android لپاره Leben in Deutschland اپ ډاونلوډ کړئ: 310 پوښتنې، د ازموینې تمرین، د پرمختګ څارنه او څو ژبې تشریحات.',
      keywords: 'Leben in Deutschland اپ، د تابعیت ازموینه، 310 پوښتنې، BAMF، iOS، Android، د ازموینې تمرین',
    },
    pageName: 'اپ',
    freeStart: 'وړیا پیل کړئ',
    ratingLabel: 'د اپ درجه بندي',
    hero: {
      title: 'د اپ په مرسته د تابعیت ازموینې ته چمتو شئ.',
      text: 'ټولې 310 پوښتنې زده کړئ، ازموینه تمرین کړئ او خپل پرمختګ وګورئ. اپ همدا اوس خپل موبایل ته ډاونلوډ کړئ.',
    },
    store: { apple: 'له دې ځایه ډاونلوډ', google: 'له دې ځایه ترلاسه کړئ' },
    stats: { questions: 'پوښتنې', examMode: 'د ازموینې حالت', languages: 'ژبې' },
    preview: { title: 'د اپ دننه', count: '10 سکرینونه' },
    highlights: [
      { value: '4.8/5', label: 'په پلورنځیو کې درجه' },
      { value: 'لږ فشار', label: 'د واقعي ازموینې تمرین سره' },
      { value: 'همدا اوس پیل کړئ', label: 'له اوږدې امستنې پرته' },
    ],
    why: { eyebrow: 'ولې اپ؟', title: 'د تمرین لپاره هر څه چې اړتیا ورته لرئ.' },
    features: [
      { title: '310 رسمي پوښتنې', text: 'ټولې عمومي BAMF پوښتنې او د ایالت پوښتنې په یوه اپ کې.' },
      { title: 'د ازموینې تمرین', text: 'له 33 تصادفي پوښتنو، وخت او سمدستي پایلو سره تمرین وکړئ.' },
      { title: 'پرمختګ وڅارئ', text: 'وګورئ کومې پوښتنې مو زده دي او کومې باید بیا تکرار کړئ.' },
    ],
    cta: { eyebrow: 'راتلونکې زده‌کړې ته چمتو یاست؟', title: 'اپ ډاونلوډ کړئ او نن خپلې لومړۍ پوښتنې تمرین کړئ.' },
    reviews: { eyebrow: 'نظرونه', title: 'کاروونکي د اپ په اړه څه وايي؟' },
    screenshotAlts: [
      'د Leben in Deutschland اپ عمومي کتنه او درجه',
      'په Leben in Deutschland اپ کې شخصي زده‌کړیز پلان',
      'په Leben in Deutschland اپ کې د زده‌کړې پرمختګ او د ازموینې چمتووالی',
    ],
  },
  ro: {
    meta: {
      title: 'Aplicația Leben in Deutschland pentru iOS și Android | Test de cetățenie 2026',
      description: 'Descarcă Leben in Deutschland pentru iOS și Android: 310 întrebări, simulare de examen, progres și explicații în mai multe limbi.',
      keywords: 'Leben in Deutschland, aplicație test cetățenie, 310 întrebări, BAMF, iOS, Android, simulare examen',
    },
    pageName: 'Aplicație',
    freeStart: 'Începe gratuit',
    ratingLabel: 'Evaluarea aplicației',
    hero: {
      title: 'Pregătește-te pentru testul de cetățenie cu aplicația.',
      text: 'Învață toate cele 310 întrebări, simulează examenul și urmărește-ți progresul. Descarcă aplicația pe telefon.',
    },
    store: { apple: 'Descarcă din', google: 'Descarcă de pe' },
    stats: { questions: 'Întrebări', examMode: 'Mod examen', languages: 'Limbi' },
    preview: { title: 'În interiorul aplicației', count: '10 ecrane' },
    highlights: [
      { value: '4.8/5', label: 'Evaluare în magazine' },
      { value: 'Mai puțin stres', label: 'cu o simulare realistă' },
      { value: 'Începe acum', label: 'fără configurare îndelungată' },
    ],
    why: { eyebrow: 'De ce aplicația?', title: 'Tot ce ai nevoie pentru a exersa.' },
    features: [
      { title: '310 întrebări oficiale', text: 'Toate întrebările generale BAMF și cele pentru landul tău într-o singură aplicație.' },
      { title: 'Simulare de examen', text: 'Exersează cu 33 de întrebări aleatorii, cronometru și rezultate instantanee.' },
      { title: 'Urmărește progresul', text: 'Vezi ce întrebări stăpânești și pe care trebuie să le repeți.' },
    ],
    cta: { eyebrow: 'Ești gata pentru următoarea sesiune?', title: 'Descarcă aplicația și rezolvă primele întrebări chiar azi.' },
    reviews: { eyebrow: 'Recenzii', title: 'Ce spun utilizatorii despre aplicație' },
    screenshotAlts: [
      'Prezentare generală și evaluare în aplicația Leben in Deutschland',
      'Plan personal de învățare în aplicația Leben in Deutschland',
      'Progres și pregătire pentru examen în aplicația Leben in Deutschland',
    ],
  },
  it: {
    meta: {
      title: 'App Leben in Deutschland per iOS e Android | Test di cittadinanza 2026',
      description: 'Scarica Leben in Deutschland per iOS e Android: 310 domande, simulazione d’esame, monitoraggio dei progressi e spiegazioni multilingue.',
      keywords: 'Leben in Deutschland, app test cittadinanza, 310 domande, BAMF, iOS, Android, simulazione esame',
    },
    pageName: 'App',
    freeStart: 'Inizia gratis',
    ratingLabel: 'Valutazione dell’app',
    hero: {
      title: 'Preparati al test di cittadinanza con l’app.',
      text: 'Impara tutte le 310 domande, simula l’esame e segui i tuoi progressi. Scarica subito l’app sul telefono.',
    },
    store: { apple: 'Scarica su', google: 'Disponibile su' },
    stats: { questions: 'Domande', examMode: 'Modalità esame', languages: 'Lingue' },
    preview: { title: 'Dentro l’app', count: '10 schermate' },
    highlights: [
      { value: '4.8/5', label: 'Valutazione negli store' },
      { value: 'Meno stress', label: 'con una simulazione realistica' },
      { value: 'Inizia subito', label: 'senza lunghe configurazioni' },
    ],
    why: { eyebrow: 'Perché l’app?', title: 'Tutto ciò che serve per esercitarti.' },
    features: [
      { title: '310 domande ufficiali', text: 'Tutte le domande generali BAMF e quelle del Land in un’unica app.' },
      { title: 'Simulazione d’esame', text: 'Esercitati con 33 domande casuali, timer e risultati immediati.' },
      { title: 'Segui i progressi', text: 'Scopri quali domande conosci e quali dovresti ripassare.' },
    ],
    cta: { eyebrow: 'Pronto per la prossima sessione?', title: 'Scarica l’app e prova oggi le tue prime domande.' },
    reviews: { eyebrow: 'Recensioni', title: 'Cosa dicono gli utenti dell’app' },
    screenshotAlts: [
      'Panoramica e valutazione dell’app Leben in Deutschland',
      'Piano di apprendimento personale nell’app Leben in Deutschland',
      'Progressi e preparazione all’esame nell’app Leben in Deutschland',
    ],
  },
  es: {
    meta: {
      title: 'App Leben in Deutschland para iOS y Android | Test de ciudadanía 2026',
      description: 'Descarga Leben in Deutschland para iOS y Android: 310 preguntas, simulación de examen, seguimiento del progreso y explicaciones multilingües.',
      keywords: 'Leben in Deutschland, app test ciudadanía, 310 preguntas, BAMF, iOS, Android, simulación de examen',
    },
    pageName: 'Aplicación',
    freeStart: 'Empieza gratis',
    ratingLabel: 'Valoración de la app',
    hero: {
      title: 'Prepárate para el test de ciudadanía con la app.',
      text: 'Aprende las 310 preguntas, simula el examen y controla tu progreso. Descarga ahora la app en tu teléfono.',
    },
    store: { apple: 'Descárgala en', google: 'Disponible en' },
    stats: { questions: 'Preguntas', examMode: 'Modo examen', languages: 'Idiomas' },
    preview: { title: 'Dentro de la app', count: '10 pantallas' },
    highlights: [
      { value: '4.8/5', label: 'Valoración en las tiendas' },
      { value: 'Menos estrés', label: 'con una simulación realista' },
      { value: 'Empieza ahora', label: 'sin una configuración larga' },
    ],
    why: { eyebrow: '¿Por qué la app?', title: 'Todo lo que necesitas para practicar.' },
    features: [
      { title: '310 preguntas oficiales', text: 'Todas las preguntas generales de BAMF y las de tu estado en una sola app.' },
      { title: 'Simulación de examen', text: 'Practica con 33 preguntas aleatorias, límite de tiempo y resultados inmediatos.' },
      { title: 'Sigue tu progreso', text: 'Descubre qué preguntas dominas y cuáles deberías repasar.' },
    ],
    cta: { eyebrow: '¿Listo para la próxima sesión?', title: 'Descarga la app y practica hoy tus primeras preguntas.' },
    reviews: { eyebrow: 'Reseñas', title: 'Lo que dicen los usuarios sobre la app' },
    screenshotAlts: [
      'Vista general y valoración de la app Leben in Deutschland',
      'Plan de aprendizaje personal en la app Leben in Deutschland',
      'Progreso y preparación para el examen en la app Leben in Deutschland',
    ],
  },
};

export const getAppPageCopy = (lang: SupportedLang): AppPageCopy => appPageCopy[lang];
