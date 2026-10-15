import { isSupportedLang, type SupportedLang } from '../types/language';

export const BAMF_TEST_SOURCE =
  'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html';
export const BAMF_QUESTION_CATALOG = 'https://oet.bamf.de/ords/oetut/f?p=514:1:0';

export type PriorityContentLang = 'de' | 'en' | 'tr';
export type SeoLandingVariant = 'leben-in-deutschland-online' | 'einbuergerungstest-online';

export interface LandingCopy {
  title: string;
  description: string;
  keywords: string;
  eyebrow: string;
  heading: string;
  directAnswer: string;
  officialExamNote: string;
  practiceCta: string;
  examCta: string;
  appCta: string;
  factsTitle: string;
  facts: ReadonlyArray<{ value: string; label: string; text: string }>;
  distinctionTitle: string;
  distinctionParagraphs: ReadonlyArray<string>;
  appTitle: string;
  appText: string;
  sourceTitle: string;
  sourceText: string;
  updatedLabel: string;
  resourceLabel: string;
  faq: ReadonlyArray<{ question: string; answer: string }>;
}

const shared = {
  de: {
    factsTitle: 'Die Zahlen kurz erklärt',
    facts: [
      { value: '460', label: 'Fragen im Gesamtkatalog', text: '300 allgemeine Fragen plus 160 Landesfragen für alle 16 Bundesländer.' },
      { value: '310', label: 'Fragen für Ihre Vorbereitung', text: '300 allgemeine Fragen plus die 10 Fragen Ihres eigenen Bundeslandes.' },
      { value: '33', label: 'Fragen in der Prüfung', text: '30 allgemeine Fragen und 3 Fragen zu Ihrem Bundesland.' },
      { value: '15 / 17', label: 'Zwei Ergebnisgrenzen', text: '15 richtige Antworten für den LiD-Test; 17 für den Einbürgerungsnachweis.' },
    ],
    distinctionTitle: 'Leben in Deutschland und Einbürgerungstest: gleicher Katalog, anderer Nachweis',
    distinctionParagraphs: [
      'Beide Prüfungen verwenden denselben BAMF-Fragenkatalog und denselben Aufbau mit 33 Aufgaben. Der Test „Leben in Deutschland“ ist häufig der Abschluss des Orientierungskurses.',
      'Für einen erfolgreichen LiD-Test genügen 15 richtige Antworten. Soll das Ergebnis als Nachweis staatsbürgerlicher Kenntnisse bei der Einbürgerung dienen, werden mindestens 17 richtige Antworten benötigt.',
    ],
    appTitle: 'Im Browser oder mit der App üben',
    appText: 'Die Website funktioniert ohne Anmeldung. Die iOS- und Android-App ergänzt Favoriten, Lernfortschritt und mobile Prüfungssimulationen. Beides sind unabhängige Lernangebote und keine BAMF-Prüfungsstelle.',
    sourceTitle: 'Offizielle Grundlage',
    sourceText: 'Aufbau und Fragenumfang werden mit den Veröffentlichungen des Bundesamts für Migration und Flüchtlinge abgeglichen.',
    updatedLabel: 'Inhaltlich geprüft am 8. Oktober 2026',
    resourceLabel: 'Informationen für Kurse und Beratungsstellen',
  },
  en: {
    factsTitle: 'The numbers at a glance',
    facts: [
      { value: '460', label: 'Questions in the full catalogue', text: '300 general questions plus 160 state questions for all 16 federal states.' },
      { value: '310', label: 'Questions relevant to one learner', text: '300 general questions plus the 10 questions for your own federal state.' },
      { value: '33', label: 'Questions in the exam', text: '30 general questions and 3 questions about your federal state.' },
      { value: '15 / 17', label: 'Two score thresholds', text: '15 correct for the LiD test; 17 when the result is used for naturalization.' },
    ],
    distinctionTitle: 'Leben in Deutschland and the naturalization test use the same catalogue',
    distinctionParagraphs: [
      'Both exams use the same BAMF question catalogue and the same 33-question format. Leben in Deutschland is commonly taken at the end of the orientation course.',
      'A LiD result is passed with 15 correct answers. At least 17 correct answers are required when the certificate is used as proof of civic knowledge for naturalization.',
    ],
    appTitle: 'Practice in your browser or in the app',
    appText: 'The website works without an account. The iOS and Android app adds favourites, progress tracking and mobile exam simulations. Both are independent study tools, not an official BAMF test centre.',
    sourceTitle: 'Official basis',
    sourceText: 'The format and question coverage are checked against publications by the Federal Office for Migration and Refugees (BAMF).',
    updatedLabel: 'Content reviewed on 8 October 2026',
    resourceLabel: 'Information for courses and advice centres',
  },
  tr: {
    factsTitle: 'Sayıların kısa açıklaması',
    facts: [
      { value: '460', label: 'Toplam katalogdaki soru', text: '300 genel soru ve 16 eyalet için toplam 160 eyalet sorusu.' },
      { value: '310', label: 'Bir adayın çalışacağı soru', text: '300 genel soru ve kendi eyaletinize ait 10 soru.' },
      { value: '33', label: 'Gerçek sınavdaki soru', text: '30 genel soru ve yaşadığınız eyaletle ilgili 3 soru.' },
      { value: '15 / 17', label: 'İki farklı başarı sınırı', text: 'LiD sonucu için 15; vatandaşlık kanıtı için 17 doğru cevap.' },
    ],
    distinctionTitle: 'Leben in Deutschland ve vatandaşlık testi aynı kataloğu kullanır',
    distinctionParagraphs: [
      'Her iki sınav da aynı BAMF soru kataloğunu ve 33 soruluk sınav yapısını kullanır. Leben in Deutschland testi çoğunlukla oryantasyon kursunun sonunda yapılır.',
      'LiD testini geçmek için 15 doğru cevap yeterlidir. Sonucun vatandaşlık başvurusunda toplumsal ve hukuki bilgi kanıtı olarak kullanılabilmesi için en az 17 doğru cevap gerekir.',
    ],
    appTitle: 'Tarayıcıda veya uygulamada çalışın',
    appText: 'Web sitesi üyelik istemeden çalışır. iOS ve Android uygulaması favoriler, ilerleme takibi ve mobil deneme sınavları ekler. Her ikisi de bağımsız çalışma aracıdır; resmî BAMF sınav merkezi değildir.',
    sourceTitle: 'Resmî dayanak',
    sourceText: 'Sınav yapısı ve soru kapsamı Federal Göç ve Mülteciler Dairesinin (BAMF) yayınlarıyla karşılaştırılır.',
    updatedLabel: 'İçerik 8 Ekim 2026 tarihinde kontrol edildi',
    resourceLabel: 'Kurslar ve danışma merkezleri için bilgiler',
  },
  ar: {
    factsTitle: 'الأرقام باختصار',
    facts: [
      { value: '460', label: 'سؤالًا في الكتالوج الكامل', text: '300 سؤال عام و160 سؤالًا خاصًا بالولايات الألمانية الـ16.' },
      { value: '310', label: 'سؤالًا تحتاج إلى تعلّمها', text: '300 سؤال عام و10 أسئلة خاصة بولايتك.' },
      { value: '33', label: 'سؤالًا في الامتحان', text: '30 سؤالًا عامًا و3 أسئلة عن ولايتك.' },
      { value: '15 / 17', label: 'حدّان للنجاح', text: '15 إجابة صحيحة لاختبار LiD، و17 إجابة إذا استُخدمت النتيجة للتجنيس.' },
    ],
    distinctionTitle: 'اختبار Leben in Deutschland واختبار التجنيس: الكتالوج نفسه وشهادة مختلفة',
    distinctionParagraphs: [
      'يستخدم الاختباران كتالوج الأسئلة نفسه الصادر عن BAMF والشكل نفسه المكوّن من 33 سؤالًا. ويُجرى اختبار Leben in Deutschland غالبًا في نهاية دورة التوجيه (Orientierungskurs).',
      'يكفي 15 جوابًا صحيحًا لاجتياز اختبار LiD. أما إذا أردت استخدام النتيجة دليلًا على المعرفة المدنية في طلب التجنيس، فتحتاج إلى 17 إجابة صحيحة على الأقل.',
    ],
    appTitle: 'تدرّب في المتصفح أو في التطبيق',
    appText: 'يعمل الموقع دون تسجيل. ويضيف تطبيق iOS وAndroid المفضلة ومتابعة التقدم واختبارات تجريبية على الهاتف. كلاهما أداة تعلّم مستقلة وليس مركز امتحان رسميًا تابعًا لـBAMF.',
    sourceTitle: 'الأساس الرسمي',
    sourceText: 'تتم مقارنة شكل الامتحان وعدد الأسئلة بمنشورات المكتب الاتحادي للهجرة واللاجئين (BAMF).',
    updatedLabel: 'تمت مراجعة المحتوى في 15 أكتوبر 2026',
    resourceLabel: 'معلومات للدورات ومراكز الاستشارة',
  },
  ua: {
    factsTitle: 'Цифри коротко',
    facts: [
      { value: '460', label: 'запитань у повному каталозі', text: '300 загальних запитань і 160 запитань для всіх 16 федеральних земель.' },
      { value: '310', label: 'запитань для вашої підготовки', text: '300 загальних запитань і 10 запитань вашої федеральної землі.' },
      { value: '33', label: 'запитання на іспиті', text: '30 загальних запитань і 3 запитання про вашу федеральну землю.' },
      { value: '15 / 17', label: 'Два пороги', text: '15 правильних відповідей для тесту LiD; 17 — якщо результат потрібен для натуралізації.' },
    ],
    distinctionTitle: 'Leben in Deutschland і тест на громадянство: один каталог, різні підтвердження',
    distinctionParagraphs: [
      'Обидва іспити використовують той самий каталог запитань BAMF і той самий формат із 33 запитань. Тест Leben in Deutschland зазвичай складають наприкінці орієнтаційного курсу (Orientierungskurs).',
      'Для тесту LiD достатньо 15 правильних відповідей. Якщо результат має підтвердити громадянські знання під час натуралізації, потрібно щонайменше 17 правильних відповідей.',
    ],
    appTitle: 'Тренуйтеся в браузері або в застосунку',
    appText: 'Сайт працює без реєстрації. Застосунок для iOS і Android додає обране, відстеження прогресу та пробні іспити на телефоні. Обидва — незалежні навчальні інструменти, а не офіційний екзаменаційний центр BAMF.',
    sourceTitle: 'Офіційна основа',
    sourceText: 'Формат іспиту та обсяг запитань звіряються з публікаціями Федерального відомства у справах міграції та біженців (BAMF).',
    updatedLabel: 'Зміст перевірено 15 жовтня 2026 року',
    resourceLabel: 'Інформація для курсів і консультаційних центрів',
  },
  ru: {
    factsTitle: 'Цифры коротко',
    facts: [
      { value: '460', label: 'вопросов в полном каталоге', text: '300 общих вопросов и 160 вопросов для всех 16 федеральных земель.' },
      { value: '310', label: 'вопросов для вашей подготовки', text: '300 общих вопросов и 10 вопросов вашей федеральной земли.' },
      { value: '33', label: 'вопроса на экзамене', text: '30 общих вопросов и 3 вопроса о вашей федеральной земле.' },
      { value: '15 / 17', label: 'Два порога', text: '15 правильных ответов для теста LiD; 17 — если результат нужен для натурализации.' },
    ],
    distinctionTitle: 'Leben in Deutschland и тест на гражданство: один каталог, разные подтверждения',
    distinctionParagraphs: [
      'Оба экзамена используют один и тот же каталог вопросов BAMF и один формат из 33 вопросов. Тест Leben in Deutschland обычно сдают в конце ориентационного курса (Orientierungskurs).',
      'Для теста LiD достаточно 15 правильных ответов. Если результат должен подтвердить гражданские знания при натурализации, нужно не менее 17 правильных ответов.',
    ],
    appTitle: 'Тренируйтесь в браузере или в приложении',
    appText: 'Сайт работает без регистрации. Приложение для iOS и Android добавляет избранное, отслеживание прогресса и пробные экзамены на телефоне. Оба — независимые учебные инструменты, а не официальный экзаменационный центр BAMF.',
    sourceTitle: 'Официальная основа',
    sourceText: 'Формат экзамена и объём вопросов сверяются с публикациями Федерального ведомства по делам миграции и беженцев (BAMF).',
    updatedLabel: 'Содержание проверено 15 октября 2026 года',
    resourceLabel: 'Информация для курсов и консультационных центров',
  },
  pl: {
    factsTitle: 'Liczby w skrócie',
    facts: [
      { value: '460', label: 'pytań w pełnym katalogu', text: '300 pytań ogólnych i 160 pytań dla wszystkich 16 krajów związkowych.' },
      { value: '310', label: 'pytań do twojej nauki', text: '300 pytań ogólnych i 10 pytań dla twojego kraju związkowego.' },
      { value: '33', label: 'pytania na egzaminie', text: '30 pytań ogólnych i 3 pytania o twój kraj związkowy.' },
      { value: '15 / 17', label: 'Dwa progi zaliczenia', text: '15 poprawnych odpowiedzi w teście LiD; 17, jeśli wynik ma służyć naturalizacji.' },
    ],
    distinctionTitle: 'Leben in Deutschland i test na obywatelstwo: ten sam katalog, inne zaświadczenie',
    distinctionParagraphs: [
      'Oba egzaminy korzystają z tego samego katalogu pytań BAMF i tego samego formatu 33 pytań. Test Leben in Deutschland zdaje się zwykle na zakończenie kursu orientacyjnego (Orientierungskurs).',
      'Do zaliczenia testu LiD wystarczy 15 poprawnych odpowiedzi. Jeśli wynik ma potwierdzać wiedzę obywatelską we wniosku o naturalizację, potrzeba co najmniej 17 poprawnych odpowiedzi.',
    ],
    appTitle: 'Ćwicz w przeglądarce lub w aplikacji',
    appText: 'Strona działa bez rejestracji. Aplikacja na iOS i Androida dodaje ulubione, śledzenie postępów i próbne egzaminy na telefonie. Oba narzędzia są niezależne i nie są oficjalnym ośrodkiem egzaminacyjnym BAMF.',
    sourceTitle: 'Podstawa oficjalna',
    sourceText: 'Format egzaminu i zakres pytań porównujemy z publikacjami Federalnego Urzędu ds. Migracji i Uchodźców (BAMF).',
    updatedLabel: 'Treść sprawdzono 15 października 2026 r.',
    resourceLabel: 'Informacje dla kursów i poradni',
  },
  fa: {
    factsTitle: 'اعداد به‌طور خلاصه',
    facts: [
      { value: '۴۶۰', label: 'سوال در کل فهرست', text: '۳۰۰ سوال عمومی و ۱۶۰ سوال ایالتی برای هر ۱۶ ایالت آلمان.' },
      { value: '۳۱۰', label: 'سوال برای آمادگی شما', text: '۳۰۰ سوال عمومی و ۱۰ سوال مخصوص ایالت محل زندگی شما.' },
      { value: '۳۳', label: 'سوال در آزمون', text: '۳۰ سوال عمومی و ۳ سوال دربارهٔ ایالت شما.' },
      { value: '۱۵ / ۱۷', label: 'دو حد نصاب', text: '۱۵ پاسخ درست برای آزمون LiD؛ ۱۷ پاسخ درست اگر نتیجه برای تابعیت لازم باشد.' },
    ],
    distinctionTitle: 'آزمون Leben in Deutschland و آزمون تابعیت: یک فهرست سوال، دو کاربرد متفاوت',
    distinctionParagraphs: [
      'هر دو آزمون از یک فهرست سوال BAMF و یک ساختار ۳۳ سوالی استفاده می‌کنند. آزمون Leben in Deutschland معمولاً در پایان دورهٔ آشنایی (Orientierungskurs) برگزار می‌شود.',
      'برای قبولی در آزمون LiD، ۱۵ پاسخ درست کافی است. اگر می‌خواهید نتیجه را به‌عنوان مدرک دانش مدنی در درخواست تابعیت (Einbürgerung) ارائه کنید، دست‌کم ۱۷ پاسخ درست لازم است.',
    ],
    appTitle: 'در مرورگر یا در اپلیکیشن تمرین کنید',
    appText: 'این وب‌سایت بدون ثبت‌نام کار می‌کند. اپلیکیشن iOS و Android امکان نشان‌کردن سوال‌ها، پیگیری پیشرفت و آزمون آزمایشی روی موبایل را اضافه می‌کند. هر دو ابزار آموزشی مستقل هستند و مرکز رسمی آزمون BAMF نیستند.',
    sourceTitle: 'مبنای رسمی',
    sourceText: 'ساختار آزمون و تعداد سوال‌ها با انتشارات ادارهٔ فدرال مهاجرت و پناهندگان (BAMF) مقایسه می‌شود.',
    updatedLabel: 'محتوا در ۱۵ اکتبر ۲۰۲۶ بررسی شد',
    resourceLabel: 'اطلاعات برای دوره‌ها و مراکز مشاوره',
  },
  ps: {
    factsTitle: 'شمېرې په لنډه توګه',
    facts: [
      { value: '۴۶۰', label: 'پوښتنې په بشپړ لړلیک کې', text: '۳۰۰ عمومي پوښتنې او د آلمان د ټولو ۱۶ ایالتونو لپاره ۱۶۰ ایالتي پوښتنې.' },
      { value: '۳۱۰', label: 'پوښتنې ستاسو د چمتووالي لپاره', text: '۳۰۰ عمومي پوښتنې او ستاسو د ایالت ۱۰ پوښتنې.' },
      { value: '۳۳', label: 'پوښتنې په ازموینه کې', text: '۳۰ عمومي پوښتنې او ستاسو د ایالت په اړه ۳ پوښتنې.' },
      { value: '۱۵ / ۱۷', label: 'د بریا دوه حدونه', text: 'د LiD ازموینې لپاره ۱۵ سم ځوابونه؛ که پایله د تابعیت لپاره وي، ۱۷ سم ځوابونه.' },
    ],
    distinctionTitle: 'Leben in Deutschland او د تابعیت ازموینه: یو لړلیک، دوه بېلې موخې',
    distinctionParagraphs: [
      'دواړه ازموینې د BAMF د پوښتنو یو لړلیک او د ۳۳ پوښتنو یو جوړښت کاروي. د Leben in Deutschland ازموینه معمولاً د لارښوونې کورس (Orientierungskurs) په پای کې اخیستل کېږي.',
      'د LiD ازموینې د بریا لپاره ۱۵ سم ځوابونه بس دي. که غواړئ پایله د تابعیت په غوښتنلیک کې د مدني پوهې د ثبوت په توګه وکاروئ، لږ تر لږه ۱۷ سم ځوابونه پکار دي.',
    ],
    appTitle: 'په براوزر یا اپلیکېشن کې تمرین وکړئ',
    appText: 'دا وېب‌پاڼه له نوم‌لیکنې پرته کار کوي. د iOS او Android اپلیکېشن خوښې، د پرمختګ تعقیب او په موبایل کې ازمایښتي ازموینې ورزیاتوي. دواړه خپلواکې زده‌کړیزې وسیلې دي او د BAMF رسمي ازموینځی نه دی.',
    sourceTitle: 'رسمي بنسټ',
    sourceText: 'د ازموینې جوړښت او د پوښتنو شمېر د مهاجرت او کډوالو د فدرالي ادارې (BAMF) له خپرونو سره پرتله کېږي.',
    updatedLabel: 'منځپانګه د ۲۰۲۶ کال د اکتوبر په ۱۵مه وکتل شوه',
    resourceLabel: 'د کورسونو او مشورتي مرکزونو لپاره معلومات',
  },
  ro: {
    factsTitle: 'Cifrele pe scurt',
    facts: [
      { value: '460', label: 'de întrebări în catalogul complet', text: '300 de întrebări generale și 160 de întrebări pentru toate cele 16 landuri.' },
      { value: '310', label: 'întrebări pentru pregătirea ta', text: '300 de întrebări generale și cele 10 întrebări ale landului tău.' },
      { value: '33', label: 'de întrebări la examen', text: '30 de întrebări generale și 3 întrebări despre landul tău.' },
      { value: '15 / 17', label: 'Două praguri', text: '15 răspunsuri corecte pentru testul LiD; 17 dacă rezultatul este folosit pentru cetățenie.' },
    ],
    distinctionTitle: 'Leben in Deutschland și testul de cetățenie: același catalog, dovadă diferită',
    distinctionParagraphs: [
      'Ambele examene folosesc același catalog de întrebări BAMF și același format cu 33 de întrebări. Testul Leben in Deutschland se susține de obicei la finalul cursului de orientare (Orientierungskurs).',
      'Pentru testul LiD ajung 15 răspunsuri corecte. Dacă rezultatul trebuie să dovedească cunoștințele civice la cererea de cetățenie, sunt necesare cel puțin 17 răspunsuri corecte.',
    ],
    appTitle: 'Exersează în browser sau în aplicație',
    appText: 'Site-ul funcționează fără cont. Aplicația pentru iOS și Android adaugă favorite, urmărirea progresului și simulări de examen pe telefon. Ambele sunt instrumente de studiu independente, nu un centru oficial de examinare BAMF.',
    sourceTitle: 'Baza oficială',
    sourceText: 'Formatul examenului și numărul de întrebări sunt verificate după publicațiile Oficiului Federal pentru Migrație și Refugiați (BAMF).',
    updatedLabel: 'Conținut verificat la 15 octombrie 2026',
    resourceLabel: 'Informații pentru cursuri și centre de consiliere',
  },
  it: {
    factsTitle: 'I numeri in breve',
    facts: [
      { value: '460', label: 'domande nel catalogo completo', text: '300 domande generali e 160 domande per tutti i 16 Länder.' },
      { value: '310', label: 'domande per la tua preparazione', text: '300 domande generali e le 10 domande del tuo Land.' },
      { value: '33', label: 'domande all’esame', text: '30 domande generali e 3 domande sul tuo Land.' },
      { value: '15 / 17', label: 'Due soglie', text: '15 risposte corrette per il test LiD; 17 se il risultato serve per la naturalizzazione.' },
    ],
    distinctionTitle: 'Leben in Deutschland e test di cittadinanza: stesso catalogo, attestato diverso',
    distinctionParagraphs: [
      'Entrambi gli esami usano lo stesso catalogo di domande del BAMF e lo stesso formato di 33 domande. Il test Leben in Deutschland si sostiene di solito alla fine del corso di orientamento (Orientierungskurs).',
      'Per superare il test LiD bastano 15 risposte corrette. Se il risultato deve dimostrare le conoscenze civiche nella domanda di cittadinanza, servono almeno 17 risposte corrette.',
    ],
    appTitle: 'Esercitati nel browser o nell’app',
    appText: 'Il sito funziona senza registrazione. L’app per iOS e Android aggiunge preferiti, monitoraggio dei progressi e simulazioni d’esame sul telefono. Entrambi sono strumenti di studio indipendenti, non un centro d’esame ufficiale del BAMF.',
    sourceTitle: 'Base ufficiale',
    sourceText: 'Il formato dell’esame e il numero di domande vengono confrontati con le pubblicazioni dell’Ufficio federale per la migrazione e i rifugiati (BAMF).',
    updatedLabel: 'Contenuto verificato il 15 ottobre 2026',
    resourceLabel: 'Informazioni per corsi e centri di consulenza',
  },
  es: {
    factsTitle: 'Las cifras en resumen',
    facts: [
      { value: '460', label: 'preguntas en el catálogo completo', text: '300 preguntas generales y 160 preguntas de los 16 estados federados.' },
      { value: '310', label: 'preguntas para tu preparación', text: '300 preguntas generales y las 10 preguntas de tu estado federado.' },
      { value: '33', label: 'preguntas en el examen', text: '30 preguntas generales y 3 preguntas sobre tu estado federado.' },
      { value: '15 / 17', label: 'Dos umbrales', text: '15 respuestas correctas para el test LiD; 17 si el resultado se usa para la naturalización.' },
    ],
    distinctionTitle: 'Leben in Deutschland y el examen de ciudadanía: mismo catálogo, distinto certificado',
    distinctionParagraphs: [
      'Ambos exámenes usan el mismo catálogo de preguntas del BAMF y el mismo formato de 33 preguntas. El test Leben in Deutschland suele hacerse al final del curso de orientación (Orientierungskurs).',
      'Para aprobar el test LiD bastan 15 respuestas correctas. Si el resultado debe acreditar los conocimientos cívicos en la solicitud de ciudadanía, se necesitan al menos 17 respuestas correctas.',
    ],
    appTitle: 'Practica en el navegador o en la app',
    appText: 'La web funciona sin registro. La app para iOS y Android añade favoritos, seguimiento del progreso y simulacros de examen en el móvil. Ambas son herramientas de estudio independientes, no un centro de examen oficial del BAMF.',
    sourceTitle: 'Base oficial',
    sourceText: 'El formato del examen y el número de preguntas se comparan con las publicaciones de la Oficina Federal de Migración y Refugiados (BAMF).',
    updatedLabel: 'Contenido revisado el 15 de octubre de 2026',
    resourceLabel: 'Información para cursos y centros de asesoramiento',
  },
} as const;

const variants = {
  'leben-in-deutschland-online': {
    de: {
      title: 'Leben in Deutschland online üben | 460 Fragen & Test 2026',
      description: 'Leben in Deutschland kostenlos online üben: 300 allgemeine Fragen, 10 passende Bundesland-Fragen, 33-Fragen-Simulation und App.',
      keywords: 'Leben in Deutschland online, LiD Test üben, Leben in Deutschland App, 460 Fragen, 310 Fragen',
      eyebrow: 'Kostenlose LiD-Vorbereitung', heading: 'Leben in Deutschland online üben',
      directAnswer: 'Ja. Hier können Sie alle 300 allgemeinen Fragen und die 10 Fragen Ihres Bundeslandes kostenlos im Browser üben und anschließend eine Prüfung mit 33 Fragen simulieren.',
      officialExamNote: 'Wichtig: Die echte Prüfung findet bei einer zugelassenen Prüfstelle statt. Diese Website und die App dienen ausschließlich der Vorbereitung.',
      practiceCta: 'Fragen online üben', examCta: '33-Fragen-Test starten', appCta: 'App ansehen',
      faq: [
        { question: 'Kann ich den Leben-in-Deutschland-Test online ablegen?', answer: 'Nein. Online können Sie üben und Prüfungen simulieren; die anerkannte Prüfung wird bei einer zugelassenen Prüfstelle abgelegt.' },
        { question: 'Wie viele Fragen muss ich lernen?', answer: 'Für Sie sind 310 Fragen relevant: 300 allgemeine Fragen und 10 Fragen zu Ihrem Bundesland. Der gesamte Katalog enthält 460 Fragen, weil jedes der 16 Bundesländer eigene 10 Fragen hat.' },
        { question: 'Wie viele richtige Antworten brauche ich?', answer: 'Für den LiD-Abschluss genügen 15 von 33 richtigen Antworten. Für den Einbürgerungsnachweis sind mindestens 17 richtige Antworten erforderlich.' },
      ],
    },
    en: {
      title: 'Practice Leben in Deutschland Online | 460 Questions & App',
      description: 'Practice Leben in Deutschland online for free with 300 general questions, 10 questions for your state, a 33-question simulation and mobile app.',
      keywords: 'Leben in Deutschland online, LiD test practice, citizenship test app, 460 questions, 310 questions',
      eyebrow: 'Free LiD preparation', heading: 'Practice Leben in Deutschland online',
      directAnswer: 'Yes. You can practise all 300 general questions and the 10 questions for your federal state for free, then take a 33-question exam simulation.',
      officialExamNote: 'Important: the recognised exam is held at an approved test centre. This website and the app are preparation tools only.',
      practiceCta: 'Practice questions', examCta: 'Start 33-question test', appCta: 'View the app',
      faq: [
        { question: 'Can I take the official Leben in Deutschland test online?', answer: 'No. You can practise and simulate the exam online, but the recognised exam is taken at an approved test centre.' },
        { question: 'How many questions should I study?', answer: '310 questions are relevant to you: 300 general questions and 10 for your state. The full catalogue has 460 because all 16 states have their own 10 questions.' },
        { question: 'How many correct answers do I need?', answer: '15 of 33 passes the LiD test. At least 17 correct answers are required when the result is used for naturalization.' },
      ],
    },
    tr: {
      title: 'Leben in Deutschland Online Çalış | 460 Soru ve Uygulama',
      description: 'Leben in Deutschland testine ücretsiz hazırlanın: 300 genel soru, eyaletinizin 10 sorusu, 33 soruluk deneme ve mobil uygulama.',
      keywords: 'Leben in Deutschland online, LiD testi, Almanya vatandaşlık testi, 460 soru, 310 soru',
      eyebrow: 'Ücretsiz LiD hazırlığı', heading: 'Leben in Deutschland testine online hazırlanın',
      directAnswer: 'Evet. 300 genel sorunun tamamını ve kendi eyaletinize ait 10 soruyu ücretsiz çalışabilir, ardından 33 soruluk bir deneme sınavı yapabilirsiniz.',
      officialExamNote: 'Önemli: Tanınan gerçek sınav yetkili bir sınav merkezinde yapılır. Bu web sitesi ve uygulama yalnızca hazırlık içindir.',
      practiceCta: 'Soruları çalış', examCta: '33 soruluk denemeyi başlat', appCta: 'Uygulamayı incele',
      faq: [
        { question: 'Resmî Leben in Deutschland sınavına online girebilir miyim?', answer: 'Hayır. Online olarak çalışabilir ve deneme yapabilirsiniz; tanınan sınav yetkili bir sınav merkezinde yapılır.' },
        { question: 'Kaç soruya çalışmalıyım?', answer: 'Sizin için 310 soru önemlidir: 300 genel soru ve eyaletinizin 10 sorusu. 16 eyaletin tüm soruları birlikte sayıldığında toplam katalog 460 sorudur.' },
        { question: 'Kaç doğru cevap gerekir?', answer: 'LiD sonucu için 33 sorudan 15 doğru yeterlidir. Sonuç vatandaşlık başvurusunda kullanılacaksa en az 17 doğru gerekir.' },
      ],
    },
    ar: {
      title: 'Leben in Deutschland أونلاين بالعربية | 460 سؤالًا وتطبيق',
      description: 'تدرّب مجانًا على اختبار Leben in Deutschland بالعربية: 300 سؤال عام، و10 أسئلة لولايتك، واختبار تجريبي من 33 سؤالًا، وتطبيق للهاتف.',
      keywords: 'Leben in Deutschland بالعربية, اختبار الحياة في ألمانيا, اختبار LiD, 460 سؤال, 310 أسئلة',
      eyebrow: 'تحضير مجاني لاختبار LiD', heading: 'تدرّب على اختبار Leben in Deutschland أونلاين',
      directAnswer: 'نعم. يمكنك هنا التدرّب مجانًا على جميع الأسئلة العامة الـ300 وعلى الأسئلة العشرة الخاصة بولايتك في المتصفح، ثم إجراء اختبار تجريبي من 33 سؤالًا.',
      officialExamNote: 'مهم: يُجرى الامتحان المعترف به في مركز امتحان معتمد. هذا الموقع والتطبيق مخصّصان للتحضير فقط.',
      practiceCta: 'تدرّب على الأسئلة', examCta: 'ابدأ اختبار 33 سؤالًا', appCta: 'شاهد التطبيق',
      faq: [
        { question: 'هل يمكنني أداء اختبار Leben in Deutschland الرسمي عبر الإنترنت؟', answer: 'لا. يمكنك التدرّب ومحاكاة الامتحان عبر الإنترنت، لكن الامتحان المعترف به يُجرى في مركز امتحان معتمد.' },
        { question: 'كم سؤالًا يجب أن أتعلم؟', answer: '310 أسئلة تخصك: 300 سؤال عام و10 أسئلة لولايتك. الكتالوج الكامل فيه 460 سؤالًا لأن لكل ولاية من الولايات الـ16 أسئلتها العشرة الخاصة.' },
        { question: 'كم إجابة صحيحة أحتاج؟', answer: '15 من 33 تكفي لاجتياز اختبار LiD. وتحتاج إلى 17 إجابة صحيحة على الأقل إذا استُخدمت النتيجة للتجنيس.' },
      ],
    },
    ua: {
      title: 'Leben in Deutschland онлайн українською | 460 запитань і застосунок',
      description: 'Безкоштовно готуйтеся до тесту Leben in Deutschland українською: 300 загальних запитань, 10 запитань вашої землі, пробний іспит із 33 запитань і застосунок.',
      keywords: 'Leben in Deutschland українською, тест LiD, тест Життя в Німеччині, 460 запитань, 310 запитань',
      eyebrow: 'Безкоштовна підготовка до LiD', heading: 'Тренуйте тест Leben in Deutschland онлайн',
      directAnswer: 'Так. Тут можна безкоштовно в браузері тренувати всі 300 загальних запитань і 10 запитань вашої федеральної землі, а потім пройти пробний іспит із 33 запитань.',
      officialExamNote: 'Важливо: визнаний іспит складають в акредитованому екзаменаційному центрі. Цей сайт і застосунок призначені лише для підготовки.',
      practiceCta: 'Тренувати запитання', examCta: 'Почати тест із 33 запитань', appCta: 'Переглянути застосунок',
      faq: [
        { question: 'Чи можна скласти офіційний тест Leben in Deutschland онлайн?', answer: 'Ні. Онлайн можна тренуватися та проходити пробні іспити, але визнаний іспит складають в акредитованому екзаменаційному центрі.' },
        { question: 'Скільки запитань потрібно вивчити?', answer: 'Для вас важливі 310 запитань: 300 загальних і 10 для вашої федеральної землі. Повний каталог містить 460 запитань, бо кожна з 16 земель має власні 10 запитань.' },
        { question: 'Скільки правильних відповідей потрібно?', answer: '15 із 33 достатньо для тесту LiD. Щонайменше 17 правильних відповідей потрібно, якщо результат використовують для натуралізації.' },
      ],
    },
    ru: {
      title: 'Leben in Deutschland онлайн на русском | 460 вопросов и приложение',
      description: 'Бесплатная подготовка к тесту Leben in Deutschland на русском: 300 общих вопросов, 10 вопросов вашей земли, пробный экзамен из 33 вопросов и приложение.',
      keywords: 'Leben in Deutschland на русском, тест LiD, тест Жизнь в Германии, 460 вопросов, 310 вопросов',
      eyebrow: 'Бесплатная подготовка к LiD', heading: 'Тренируйте тест Leben in Deutschland онлайн',
      directAnswer: 'Да. Здесь можно бесплатно в браузере тренировать все 300 общих вопросов и 10 вопросов вашей федеральной земли, а затем пройти пробный экзамен из 33 вопросов.',
      officialExamNote: 'Важно: признанный экзамен сдают в аккредитованном экзаменационном центре. Этот сайт и приложение предназначены только для подготовки.',
      practiceCta: 'Тренировать вопросы', examCta: 'Начать тест из 33 вопросов', appCta: 'Посмотреть приложение',
      faq: [
        { question: 'Можно ли сдать официальный тест Leben in Deutschland онлайн?', answer: 'Нет. Онлайн можно тренироваться и проходить пробные экзамены, но признанный экзамен сдают в аккредитованном экзаменационном центре.' },
        { question: 'Сколько вопросов нужно выучить?', answer: 'Для вас важны 310 вопросов: 300 общих и 10 для вашей федеральной земли. Полный каталог содержит 460 вопросов, потому что у каждой из 16 земель свои 10 вопросов.' },
        { question: 'Сколько нужно правильных ответов?', answer: '15 из 33 достаточно для теста LiD. Не менее 17 правильных ответов нужно, если результат используется для натурализации.' },
      ],
    },
    pl: {
      title: 'Leben in Deutschland online po polsku | 460 pytań i aplikacja',
      description: 'Bezpłatnie przygotuj się do testu Leben in Deutschland po polsku: 300 pytań ogólnych, 10 pytań twojego landu, próbny egzamin z 33 pytań i aplikacja.',
      keywords: 'Leben in Deutschland po polsku, test LiD, test Życie w Niemczech, 460 pytań, 310 pytań',
      eyebrow: 'Bezpłatne przygotowanie do LiD', heading: 'Ćwicz test Leben in Deutschland online',
      directAnswer: 'Tak. Tutaj możesz bezpłatnie w przeglądarce ćwiczyć wszystkie 300 pytań ogólnych i 10 pytań twojego kraju związkowego, a potem rozwiązać próbny egzamin z 33 pytań.',
      officialExamNote: 'Ważne: uznawany egzamin odbywa się w akredytowanym ośrodku egzaminacyjnym. Ta strona i aplikacja służą wyłącznie do przygotowania.',
      practiceCta: 'Ćwicz pytania', examCta: 'Rozpocznij test z 33 pytań', appCta: 'Zobacz aplikację',
      faq: [
        { question: 'Czy mogę zdać oficjalny test Leben in Deutschland online?', answer: 'Nie. Online możesz ćwiczyć i robić próbne egzaminy, ale uznawany egzamin zdaje się w akredytowanym ośrodku egzaminacyjnym.' },
        { question: 'Ilu pytań muszę się nauczyć?', answer: 'Dla ciebie ważnych jest 310 pytań: 300 ogólnych i 10 dla twojego kraju związkowego. Pełny katalog liczy 460 pytań, bo każdy z 16 krajów związkowych ma własne 10 pytań.' },
        { question: 'Ile poprawnych odpowiedzi potrzebuję?', answer: '15 z 33 wystarczy, aby zaliczyć test LiD. Co najmniej 17 poprawnych odpowiedzi potrzeba, jeśli wynik ma służyć naturalizacji.' },
      ],
    },
    fa: {
      title: 'تمرین آنلاین آزمون Leben in Deutschland به فارسی | ۴۶۰ سوال',
      description: 'آمادگی رایگان برای آزمون Leben in Deutschland به فارسی و دری: ۳۰۰ سوال عمومی، ۱۰ سوال ایالت شما، آزمون آزمایشی ۳۳ سوالی و اپلیکیشن.',
      keywords: 'Leben in Deutschland به فارسی, آزمون زندگی در آلمان, سوالات آزمون LiD, ۴۶۰ سوال, ۳۱۰ سوال, دری',
      eyebrow: 'آمادگی رایگان برای آزمون LiD', heading: 'آزمون Leben in Deutschland را آنلاین تمرین کنید',
      directAnswer: 'بله. در اینجا می‌توانید هر ۳۰۰ سوال عمومی و ۱۰ سوال ایالت خود را رایگان در مرورگر تمرین کنید و سپس یک آزمون آزمایشی ۳۳ سوالی بدهید.',
      officialExamNote: 'مهم: آزمون رسمی و معتبر در یک مرکز آزمون مجاز برگزار می‌شود. این وب‌سایت و اپلیکیشن فقط برای آمادگی هستند.',
      practiceCta: 'تمرین سوال‌ها', examCta: 'شروع آزمون ۳۳ سوالی', appCta: 'دیدن اپلیکیشن',
      faq: [
        { question: 'آیا می‌توانم آزمون رسمی Leben in Deutschland را آنلاین بدهم؟', answer: 'نه. می‌توانید آنلاین تمرین کنید و آزمون آزمایشی بدهید، اما آزمون معتبر در یک مرکز آزمون مجاز برگزار می‌شود.' },
        { question: 'چند سوال باید یاد بگیرم؟', answer: '۳۱۰ سوال برای شما مهم است: ۳۰۰ سوال عمومی و ۱۰ سوال ایالت شما. کل فهرست ۴۶۰ سوال دارد، چون هر یک از ۱۶ ایالت ۱۰ سوال مخصوص خود را دارد.' },
        { question: 'چند پاسخ درست لازم دارم؟', answer: '۱۵ پاسخ درست از ۳۳ برای قبولی در آزمون LiD کافی است. اگر نتیجه برای تابعیت استفاده شود، دست‌کم ۱۷ پاسخ درست لازم است.' },
      ],
    },
    ps: {
      title: 'د Leben in Deutschland ازموینه آنلاین په پښتو | ۴۶۰ پوښتنې',
      description: 'د Leben in Deutschland ازموینې لپاره وړیا چمتووالی په پښتو: ۳۰۰ عمومي پوښتنې، ستاسو د ایالت ۱۰ پوښتنې، د ۳۳ پوښتنو ازمایښتي ازموینه او اپلیکېشن.',
      keywords: 'Leben in Deutschland په پښتو, د آلمان ژوند ازموینه, LiD ازموینه, ۴۶۰ پوښتنې, ۳۱۰ پوښتنې',
      eyebrow: 'د LiD ازموینې لپاره وړیا چمتووالی', heading: 'د Leben in Deutschland ازموینه آنلاین تمرین کړئ',
      directAnswer: 'هو. دلته کولای شئ ټولې ۳۰۰ عمومي پوښتنې او د خپل ایالت ۱۰ پوښتنې وړیا په براوزر کې تمرین کړئ، او بیا د ۳۳ پوښتنو ازمایښتي ازموینه ورکړئ.',
      officialExamNote: 'مهم: منل شوې ازموینه په یوه مجاز ازموینځي کې اخیستل کېږي. دا وېب‌پاڼه او اپلیکېشن یوازې د چمتووالي لپاره دي.',
      practiceCta: 'پوښتنې تمرین کړئ', examCta: 'د ۳۳ پوښتنو ازموینه پیل کړئ', appCta: 'اپلیکېشن وګورئ',
      faq: [
        { question: 'ایا کولای شم د Leben in Deutschland رسمي ازموینه آنلاین ورکړم؟', answer: 'نه. آنلاین تمرین او ازمایښتي ازموینه کولای شئ، خو منل شوې ازموینه په یوه مجاز ازموینځي کې اخیستل کېږي.' },
        { question: 'څو پوښتنې باید زده کړم؟', answer: 'ستاسو لپاره ۳۱۰ پوښتنې مهمې دي: ۳۰۰ عمومي او د خپل ایالت ۱۰ پوښتنې. بشپړ لړلیک ۴۶۰ پوښتنې لري، ځکه د ۱۶ واړو ایالتونو هر یو خپلې ۱۰ پوښتنې لري.' },
        { question: 'څو سم ځوابونه پکار دي؟', answer: 'د LiD ازموینې لپاره له ۳۳ څخه ۱۵ سم ځوابونه بس دي. که پایله د تابعیت لپاره وکارول شي، لږ تر لږه ۱۷ سم ځوابونه پکار دي.' },
      ],
    },
    ro: {
      title: 'Leben in Deutschland online în română | 460 întrebări și aplicație',
      description: 'Pregătește-te gratuit pentru testul Leben in Deutschland în română: 300 de întrebări generale, 10 întrebări ale landului tău, simulare cu 33 de întrebări și aplicație.',
      keywords: 'Leben in Deutschland în română, test LiD, testul Viața în Germania, 460 întrebări, 310 întrebări',
      eyebrow: 'Pregătire gratuită pentru LiD', heading: 'Exersează testul Leben in Deutschland online',
      directAnswer: 'Da. Aici poți exersa gratuit în browser toate cele 300 de întrebări generale și cele 10 întrebări ale landului tău, apoi poți da o simulare de examen cu 33 de întrebări.',
      officialExamNote: 'Important: examenul recunoscut se susține la un centru de examinare autorizat. Acest site și aplicația servesc doar pregătirii.',
      practiceCta: 'Exersează întrebările', examCta: 'Începe testul cu 33 de întrebări', appCta: 'Vezi aplicația',
      faq: [
        { question: 'Pot susține online testul oficial Leben in Deutschland?', answer: 'Nu. Online poți exersa și da simulări, dar examenul recunoscut se susține la un centru de examinare autorizat.' },
        { question: 'Câte întrebări trebuie să învăț?', answer: 'Pentru tine contează 310 întrebări: 300 generale și 10 pentru landul tău. Catalogul complet are 460, pentru că fiecare dintre cele 16 landuri are propriile 10 întrebări.' },
        { question: 'De câte răspunsuri corecte am nevoie?', answer: '15 din 33 sunt suficiente pentru testul LiD. Ai nevoie de cel puțin 17 răspunsuri corecte dacă rezultatul este folosit pentru cetățenie.' },
      ],
    },
    it: {
      title: 'Leben in Deutschland online in italiano | 460 domande e app',
      description: 'Preparati gratis al test Leben in Deutschland in italiano: 300 domande generali, le 10 domande del tuo Land, simulazione da 33 domande e app.',
      keywords: 'Leben in Deutschland in italiano, test LiD, test Vivere in Germania, 460 domande, 310 domande',
      eyebrow: 'Preparazione gratuita al LiD', heading: 'Esercitati online per il test Leben in Deutschland',
      directAnswer: 'Sì. Qui puoi esercitarti gratis nel browser su tutte le 300 domande generali e sulle 10 domande del tuo Land, poi fare una simulazione d’esame con 33 domande.',
      officialExamNote: 'Importante: l’esame riconosciuto si svolge presso un centro d’esame autorizzato. Questo sito e l’app servono solo alla preparazione.',
      practiceCta: 'Esercitati con le domande', examCta: 'Inizia il test da 33 domande', appCta: 'Scopri l’app',
      faq: [
        { question: 'Posso sostenere online il test ufficiale Leben in Deutschland?', answer: 'No. Online puoi esercitarti e fare simulazioni, ma l’esame riconosciuto si sostiene presso un centro d’esame autorizzato.' },
        { question: 'Quante domande devo studiare?', answer: 'Per te sono rilevanti 310 domande: 300 generali e 10 per il tuo Land. Il catalogo completo ne contiene 460, perché ciascuno dei 16 Länder ha le sue 10 domande.' },
        { question: 'Quante risposte corrette servono?', answer: '15 su 33 bastano per superare il test LiD. Ne servono almeno 17 se il risultato viene usato per la naturalizzazione.' },
      ],
    },
    es: {
      title: 'Leben in Deutschland online en español | 460 preguntas y app',
      description: 'Prepárate gratis para el test Leben in Deutschland en español: 300 preguntas generales, las 10 de tu estado federado, simulacro de 33 preguntas y app.',
      keywords: 'Leben in Deutschland en español, test LiD, test Vivir en Alemania, 460 preguntas, 310 preguntas',
      eyebrow: 'Preparación gratuita para el LiD', heading: 'Practica el test Leben in Deutschland online',
      directAnswer: 'Sí. Aquí puedes practicar gratis en el navegador las 300 preguntas generales y las 10 preguntas de tu estado federado, y después hacer un simulacro de examen de 33 preguntas.',
      officialExamNote: 'Importante: el examen reconocido se realiza en un centro de examen autorizado. Esta web y la app sirven solo para prepararte.',
      practiceCta: 'Practicar preguntas', examCta: 'Empezar test de 33 preguntas', appCta: 'Ver la app',
      faq: [
        { question: '¿Puedo hacer online el test oficial Leben in Deutschland?', answer: 'No. Online puedes practicar y hacer simulacros, pero el examen reconocido se realiza en un centro de examen autorizado.' },
        { question: '¿Cuántas preguntas tengo que estudiar?', answer: 'Para ti son relevantes 310 preguntas: 300 generales y 10 de tu estado federado. El catálogo completo tiene 460 porque cada uno de los 16 estados tiene sus propias 10 preguntas.' },
        { question: '¿Cuántas respuestas correctas necesito?', answer: 'Con 15 de 33 apruebas el test LiD. Necesitas al menos 17 respuestas correctas si el resultado se usa para la naturalización.' },
      ],
    },
  },
  'einbuergerungstest-online': {
    de: {
      title: 'Einbürgerungstest online üben | 310 relevante Fragen & App',
      description: 'Einbürgerungstest kostenlos online üben: 300 allgemeine BAMF-Fragen, 10 Landesfragen, 33-Fragen-Test und App für iOS und Android.',
      keywords: 'Einbürgerungstest online, Einbürgerungstest App, 310 Fragen, 460 Fragen, BAMF Test üben',
      eyebrow: 'Einbürgerungstest-Vorbereitung', heading: 'Einbürgerungstest online üben',
      directAnswer: 'Hier können Sie die 310 für Sie relevanten Fragen kostenlos üben: 300 allgemeine Fragen und die 10 Fragen Ihres Bundeslandes. Die Simulation stellt daraus 33 Aufgaben zusammen.',
      officialExamNote: 'Die Online-Simulation ist keine amtliche Prüfung. Anmeldung und Prüfung erfolgen bei einer zugelassenen Prüfstelle.',
      practiceCta: 'Einbürgerungsfragen üben', examCta: 'Prüfung simulieren', appCta: 'App für iOS & Android',
      faq: [
        { question: 'Ist der Einbürgerungstest online möglich?', answer: 'Die Vorbereitung ist online möglich. Die amtlich anerkannte Prüfung selbst wird nicht auf dieser Website, sondern bei einer zugelassenen Prüfstelle abgelegt.' },
        { question: 'Sind es 310 oder 460 Fragen?', answer: 'Der Gesamtkatalog enthält 460 Fragen. Für eine Person sind 310 relevant: 300 allgemeine und 10 für das eigene Bundesland.' },
        { question: 'Wann gilt der Test für die Einbürgerung als bestanden?', answer: 'Für den Einbürgerungsnachweis benötigen Sie mindestens 17 richtige Antworten von 33.' },
      ],
    },
    en: {
      title: 'German Naturalization Test Online | 310 Relevant Questions',
      description: 'Practice the German naturalization test online for free with 300 general BAMF questions, 10 state questions, a 33-question test and mobile app.',
      keywords: 'German naturalization test online, citizenship test app, 310 questions, 460 questions, BAMF test',
      eyebrow: 'Naturalization test preparation', heading: 'Practice the German naturalization test online',
      directAnswer: 'You can practise the 310 questions relevant to you for free: 300 general questions and the 10 questions for your federal state. The simulation selects 33 exam-style questions.',
      officialExamNote: 'The online simulation is not an official exam. Registration and the recognised test take place at an approved test centre.',
      practiceCta: 'Practice questions', examCta: 'Simulate the exam', appCta: 'iOS & Android app',
      faq: [
        { question: 'Can I take the German naturalization test online?', answer: 'You can prepare online, but the officially recognised test is taken at an approved test centre, not on this website.' },
        { question: 'Are there 310 or 460 questions?', answer: 'The full catalogue contains 460. A single learner needs 310: 300 general questions and 10 for their federal state.' },
        { question: 'What is the passing score for naturalization?', answer: 'You need at least 17 correct answers out of 33 when the result is used for naturalization.' },
      ],
    },
    tr: {
      title: 'Almanya Vatandaşlık Testine Online Hazırlık | 310 Soru',
      description: 'Almanya vatandaşlık testine ücretsiz hazırlanın: 300 genel BAMF sorusu, 10 eyalet sorusu, 33 soruluk deneme ve mobil uygulama.',
      keywords: 'Almanya vatandaşlık testi online, Einbürgerungstest uygulaması, 310 soru, 460 soru, BAMF testi',
      eyebrow: 'Vatandaşlık testi hazırlığı', heading: 'Almanya vatandaşlık testine online hazırlanın',
      directAnswer: 'Sizin için önemli olan 310 soruyu ücretsiz çalışabilirsiniz: 300 genel soru ve kendi eyaletinize ait 10 soru. Deneme sınavı bu havuzdan 33 soru seçer.',
      officialExamNote: 'Online deneme resmî sınav değildir. Kayıt ve tanınan gerçek sınav yetkili bir sınav merkezinde yapılır.',
      practiceCta: 'Vatandaşlık sorularını çalış', examCta: 'Sınavı dene', appCta: 'iOS ve Android uygulaması',
      faq: [
        { question: 'Almanya vatandaşlık sınavına online girebilir miyim?', answer: 'Online hazırlanabilirsiniz; ancak resmî olarak tanınan sınav bu web sitesinde değil, yetkili bir sınav merkezinde yapılır.' },
        { question: '310 mu, 460 mı soru var?', answer: 'Toplam katalog 460 sorudur. Bir aday için 300 genel ve kendi eyaletinin 10 sorusu olmak üzere 310 soru önemlidir.' },
        { question: 'Vatandaşlık için kaç doğru gerekir?', answer: 'Sonucun vatandaşlık başvurusunda kullanılabilmesi için 33 sorudan en az 17 doğru cevap gerekir.' },
      ],
    },
    ar: {
      title: 'اختبار التجنيس الألماني أونلاين بالعربية | 310 أسئلة وتطبيق',
      description: 'تدرّب مجانًا على اختبار التجنيس الألماني (Einbürgerungstest) بالعربية: 300 سؤال عام من BAMF، و10 أسئلة لولايتك، واختبار من 33 سؤالًا، وتطبيق.',
      keywords: 'اختبار التجنيس الألماني, Einbürgerungstest بالعربية, أسئلة الجنسية الألمانية, 310 أسئلة, 460 سؤال',
      eyebrow: 'التحضير لاختبار التجنيس', heading: 'تدرّب على اختبار التجنيس الألماني أونلاين',
      directAnswer: 'يمكنك التدرّب مجانًا على الأسئلة الـ310 التي تخصك: 300 سؤال عام والأسئلة العشرة الخاصة بولايتك. ويختار الاختبار التجريبي منها 33 سؤالًا كما في الامتحان.',
      officialExamNote: 'الاختبار التجريبي أونلاين ليس امتحانًا رسميًا. التسجيل والامتحان المعترف به يتمان في مركز امتحان معتمد.',
      practiceCta: 'تدرّب على أسئلة التجنيس', examCta: 'جرّب الامتحان', appCta: 'تطبيق iOS وAndroid',
      faq: [
        { question: 'هل يمكن أداء اختبار التجنيس الألماني أونلاين؟', answer: 'يمكنك التحضير أونلاين، لكن الامتحان المعترف به رسميًا لا يُجرى على هذا الموقع، بل في مركز امتحان معتمد.' },
        { question: 'هل عدد الأسئلة 310 أم 460؟', answer: 'الكتالوج الكامل يضم 460 سؤالًا. ويحتاج الشخص الواحد إلى 310: 300 سؤال عام و10 أسئلة لولايته.' },
        { question: 'متى يُعتبر الاختبار ناجحًا لغرض التجنيس؟', answer: 'تحتاج إلى 17 إجابة صحيحة على الأقل من 33 إذا استُخدمت النتيجة للتجنيس.' },
      ],
    },
    ua: {
      title: 'Тест на громадянство Німеччини онлайн українською | 310 запитань',
      description: 'Безкоштовно тренуйте тест на громадянство Німеччини (Einbürgerungstest) українською: 300 загальних запитань BAMF, 10 запитань землі, тест із 33 запитань і застосунок.',
      keywords: 'тест на громадянство Німеччини, Einbürgerungstest українською, запитання на громадянство, 310 запитань, 460 запитань',
      eyebrow: 'Підготовка до тесту на громадянство', heading: 'Тренуйте тест на громадянство Німеччини онлайн',
      directAnswer: 'Ви можете безкоштовно тренувати 310 запитань, які стосуються саме вас: 300 загальних і 10 запитань вашої федеральної землі. Пробний іспит вибирає з них 33 запитання.',
      officialExamNote: 'Пробний іспит онлайн не є офіційним. Реєстрація та визнаний іспит відбуваються в акредитованому екзаменаційному центрі.',
      practiceCta: 'Тренувати запитання', examCta: 'Спробувати іспит', appCta: 'Застосунок для iOS і Android',
      faq: [
        { question: 'Чи можна скласти тест на громадянство Німеччини онлайн?', answer: 'Готуватися можна онлайн, але офіційно визнаний іспит складають не на цьому сайті, а в акредитованому екзаменаційному центрі.' },
        { question: '310 чи 460 запитань?', answer: 'Повний каталог містить 460 запитань. Одній людині потрібні 310: 300 загальних і 10 для своєї федеральної землі.' },
        { question: 'Скільки правильних відповідей потрібно для громадянства?', answer: 'Потрібно щонайменше 17 правильних відповідей із 33, якщо результат використовують для натуралізації.' },
      ],
    },
    ru: {
      title: 'Тест на гражданство Германии онлайн на русском | 310 вопросов',
      description: 'Бесплатно тренируйте тест на гражданство Германии (Einbürgerungstest) на русском: 300 общих вопросов BAMF, 10 вопросов земли, тест из 33 вопросов и приложение.',
      keywords: 'тест на гражданство Германии, Einbürgerungstest на русском, вопросы на гражданство, 310 вопросов, 460 вопросов',
      eyebrow: 'Подготовка к тесту на гражданство', heading: 'Тренируйте тест на гражданство Германии онлайн',
      directAnswer: 'Вы можете бесплатно тренировать 310 вопросов, которые касаются именно вас: 300 общих и 10 вопросов вашей федеральной земли. Пробный экзамен выбирает из них 33 вопроса.',
      officialExamNote: 'Пробный экзамен онлайн не является официальным. Регистрация и признанный экзамен проходят в аккредитованном экзаменационном центре.',
      practiceCta: 'Тренировать вопросы', examCta: 'Попробовать экзамен', appCta: 'Приложение для iOS и Android',
      faq: [
        { question: 'Можно ли сдать тест на гражданство Германии онлайн?', answer: 'Готовиться можно онлайн, но официально признанный экзамен сдают не на этом сайте, а в аккредитованном экзаменационном центре.' },
        { question: '310 или 460 вопросов?', answer: 'Полный каталог содержит 460 вопросов. Одному человеку нужны 310: 300 общих и 10 для своей федеральной земли.' },
        { question: 'Сколько правильных ответов нужно для гражданства?', answer: 'Нужно не менее 17 правильных ответов из 33, если результат используется для натурализации.' },
      ],
    },
    pl: {
      title: 'Test na obywatelstwo Niemiec online po polsku | 310 pytań',
      description: 'Bezpłatnie ćwicz test na obywatelstwo Niemiec (Einbürgerungstest) po polsku: 300 pytań ogólnych BAMF, 10 pytań landu, test z 33 pytań i aplikacja.',
      keywords: 'test na obywatelstwo Niemiec, Einbürgerungstest po polsku, pytania na obywatelstwo, 310 pytań, 460 pytań',
      eyebrow: 'Przygotowanie do testu na obywatelstwo', heading: 'Ćwicz test na obywatelstwo Niemiec online',
      directAnswer: 'Możesz bezpłatnie ćwiczyć 310 pytań, które dotyczą właśnie ciebie: 300 ogólnych i 10 pytań twojego kraju związkowego. Próbny egzamin losuje z nich 33 pytania.',
      officialExamNote: 'Próbny egzamin online nie jest oficjalnym egzaminem. Zapisy i uznawany egzamin odbywają się w akredytowanym ośrodku egzaminacyjnym.',
      practiceCta: 'Ćwicz pytania', examCta: 'Wypróbuj egzamin', appCta: 'Aplikacja na iOS i Androida',
      faq: [
        { question: 'Czy test na obywatelstwo Niemiec można zdać online?', answer: 'Przygotować się można online, ale oficjalnie uznawany egzamin zdaje się nie na tej stronie, tylko w akredytowanym ośrodku egzaminacyjnym.' },
        { question: '310 czy 460 pytań?', answer: 'Pełny katalog liczy 460 pytań. Jednej osobie potrzebnych jest 310: 300 ogólnych i 10 dla jej kraju związkowego.' },
        { question: 'Ile poprawnych odpowiedzi trzeba do obywatelstwa?', answer: 'Potrzeba co najmniej 17 poprawnych odpowiedzi z 33, jeśli wynik ma służyć naturalizacji.' },
      ],
    },
    fa: {
      title: 'آزمون شهروندی آلمان آنلاین به فارسی | ۳۱۰ سوال و اپلیکیشن',
      description: 'تمرین رایگان آزمون شهروندی و تابعیت آلمان (Einbürgerungstest) به فارسی و دری: ۳۰۰ سوال عمومی BAMF، ۱۰ سوال ایالت، آزمون ۳۳ سوالی و اپلیکیشن.',
      keywords: 'آزمون شهروندی آلمان, آزمون تابعیت آلمان, Einbürgerungstest به فارسی, سوالات تابعیت آلمان, ۳۱۰ سوال, ۴۶۰ سوال, دری',
      eyebrow: 'آمادگی برای آزمون تابعیت', heading: 'آزمون شهروندی آلمان را آنلاین تمرین کنید',
      directAnswer: 'می‌توانید ۳۱۰ سوالی را که به شما مربوط است رایگان تمرین کنید: ۳۰۰ سوال عمومی و ۱۰ سوال ایالت خودتان. آزمون آزمایشی از میان آن‌ها ۳۳ سوال انتخاب می‌کند.',
      officialExamNote: 'آزمون آزمایشی آنلاین، آزمون رسمی نیست. ثبت‌نام و آزمون معتبر در یک مرکز آزمون مجاز انجام می‌شود.',
      practiceCta: 'تمرین سوالات تابعیت', examCta: 'امتحان آزمایشی', appCta: 'اپلیکیشن iOS و Android',
      faq: [
        { question: 'آیا آزمون شهروندی آلمان را می‌توان آنلاین داد؟', answer: 'آمادگی را می‌توانید آنلاین انجام دهید، اما آزمون رسمی و معتبر در این وب‌سایت برگزار نمی‌شود، بلکه در یک مرکز آزمون مجاز.' },
        { question: '۳۱۰ سوال است یا ۴۶۰ سوال؟', answer: 'کل فهرست ۴۶۰ سوال دارد. هر نفر به ۳۱۰ سوال نیاز دارد: ۳۰۰ سوال عمومی و ۱۰ سوال ایالت خود.' },
        { question: 'برای تابعیت چند پاسخ درست لازم است؟', answer: 'اگر نتیجه برای تابعیت استفاده شود، دست‌کم ۱۷ پاسخ درست از ۳۳ سوال لازم است.' },
      ],
    },
    ps: {
      title: 'د آلمان د تابعیت ازموینه آنلاین په پښتو | ۳۱۰ پوښتنې',
      description: 'د آلمان د تابعیت ازموینه (Einbürgerungstest) په پښتو وړیا تمرین کړئ: د BAMF ۳۰۰ عمومي پوښتنې، د ایالت ۱۰ پوښتنې، د ۳۳ پوښتنو ازموینه او اپلیکېشن.',
      keywords: 'د آلمان د تابعیت ازموینه, Einbürgerungstest په پښتو, د تابعیت پوښتنې, ۳۱۰ پوښتنې, ۴۶۰ پوښتنې',
      eyebrow: 'د تابعیت ازموینې ته چمتووالی', heading: 'د آلمان د تابعیت ازموینه آنلاین تمرین کړئ',
      directAnswer: 'تاسو کولای شئ هغه ۳۱۰ پوښتنې وړیا تمرین کړئ چې تاسو پورې اړه لري: ۳۰۰ عمومي پوښتنې او د خپل ایالت ۱۰ پوښتنې. ازمایښتي ازموینه له دې منځه ۳۳ پوښتنې ټاکي.',
      officialExamNote: 'آنلاین ازمایښتي ازموینه رسمي ازموینه نه ده. نوم‌لیکنه او منل شوې ازموینه په یوه مجاز ازموینځي کې کېږي.',
      practiceCta: 'د تابعیت پوښتنې تمرین کړئ', examCta: 'ازموینه وازمویئ', appCta: 'د iOS او Android اپلیکېشن',
      faq: [
        { question: 'ایا د آلمان د تابعیت ازموینه آنلاین ورکول کېږي؟', answer: 'چمتووالی آنلاین کولای شئ، خو رسمي منل شوې ازموینه په دې وېب‌پاڼه کې نه، بلکې په یوه مجاز ازموینځي کې اخیستل کېږي.' },
        { question: '۳۱۰ پوښتنې دي که ۴۶۰؟', answer: 'بشپړ لړلیک ۴۶۰ پوښتنې لري. هر کس ته ۳۱۰ پوښتنې پکار دي: ۳۰۰ عمومي او د خپل ایالت ۱۰ پوښتنې.' },
        { question: 'د تابعیت لپاره څو سم ځوابونه پکار دي؟', answer: 'که پایله د تابعیت لپاره وکارول شي، له ۳۳ پوښتنو لږ تر لږه ۱۷ سم ځوابونه پکار دي.' },
      ],
    },
    ro: {
      title: 'Testul de cetățenie germană online în română | 310 întrebări',
      description: 'Exersează gratuit testul de cetățenie germană (Einbürgerungstest) în română: 300 de întrebări generale BAMF, 10 întrebări ale landului, test cu 33 de întrebări și aplicație.',
      keywords: 'testul de cetățenie germană, Einbürgerungstest în română, întrebări cetățenie Germania, 310 întrebări, 460 întrebări',
      eyebrow: 'Pregătire pentru testul de cetățenie', heading: 'Exersează testul de cetățenie germană online',
      directAnswer: 'Poți exersa gratuit cele 310 întrebări relevante pentru tine: 300 de întrebări generale și cele 10 întrebări ale landului tău. Simularea alege dintre ele 33 de întrebări.',
      officialExamNote: 'Simularea online nu este un examen oficial. Înscrierea și examenul recunoscut au loc la un centru de examinare autorizat.',
      practiceCta: 'Exersează întrebările', examCta: 'Simulează examenul', appCta: 'Aplicația pentru iOS și Android',
      faq: [
        { question: 'Pot susține online testul de cetățenie germană?', answer: 'Te poți pregăti online, dar examenul recunoscut oficial nu se susține pe acest site, ci la un centru de examinare autorizat.' },
        { question: 'Sunt 310 sau 460 de întrebări?', answer: 'Catalogul complet are 460 de întrebări. O persoană are nevoie de 310: 300 generale și 10 pentru landul său.' },
        { question: 'Câte răspunsuri corecte sunt necesare pentru cetățenie?', answer: 'Ai nevoie de cel puțin 17 răspunsuri corecte din 33 dacă rezultatul este folosit pentru cetățenie.' },
      ],
    },
    it: {
      title: 'Test di cittadinanza tedesca online in italiano | 310 domande',
      description: 'Esercitati gratis per il test di cittadinanza tedesca (Einbürgerungstest) in italiano: 300 domande generali BAMF, 10 domande del Land, test da 33 domande e app.',
      keywords: 'test di cittadinanza tedesca, Einbürgerungstest in italiano, domande cittadinanza Germania, 310 domande, 460 domande',
      eyebrow: 'Preparazione al test di cittadinanza', heading: 'Esercitati online per il test di cittadinanza tedesca',
      directAnswer: 'Puoi esercitarti gratis sulle 310 domande che ti riguardano: 300 domande generali e le 10 domande del tuo Land. La simulazione ne sceglie 33.',
      officialExamNote: 'La simulazione online non è un esame ufficiale. L’iscrizione e l’esame riconosciuto avvengono presso un centro d’esame autorizzato.',
      practiceCta: 'Esercitati con le domande', examCta: 'Simula l’esame', appCta: 'App per iOS e Android',
      faq: [
        { question: 'Posso sostenere online il test di cittadinanza tedesca?', answer: 'Puoi prepararti online, ma l’esame riconosciuto ufficialmente non si svolge su questo sito: si sostiene presso un centro d’esame autorizzato.' },
        { question: 'Le domande sono 310 o 460?', answer: 'Il catalogo completo ne contiene 460. A una persona ne servono 310: 300 generali e 10 per il proprio Land.' },
        { question: 'Quante risposte corrette servono per la cittadinanza?', answer: 'Servono almeno 17 risposte corrette su 33 se il risultato viene usato per la naturalizzazione.' },
      ],
    },
    es: {
      title: 'Examen de ciudadanía alemana online en español | 310 preguntas',
      description: 'Practica gratis el examen de ciudadanía alemana (Einbürgerungstest) en español: 300 preguntas generales del BAMF, 10 de tu estado, test de 33 preguntas y app.',
      keywords: 'examen de ciudadanía alemana, Einbürgerungstest en español, preguntas nacionalidad alemana, 310 preguntas, 460 preguntas',
      eyebrow: 'Preparación para el examen de ciudadanía', heading: 'Practica el examen de ciudadanía alemana online',
      directAnswer: 'Puedes practicar gratis las 310 preguntas que te corresponden: 300 preguntas generales y las 10 de tu estado federado. El simulacro elige 33 de ellas.',
      officialExamNote: 'El simulacro online no es un examen oficial. La inscripción y el examen reconocido se realizan en un centro de examen autorizado.',
      practiceCta: 'Practicar preguntas', examCta: 'Simular el examen', appCta: 'App para iOS y Android',
      faq: [
        { question: '¿Se puede hacer online el examen de ciudadanía alemana?', answer: 'Puedes prepararte online, pero el examen reconocido oficialmente no se hace en esta web, sino en un centro de examen autorizado.' },
        { question: '¿Son 310 o 460 preguntas?', answer: 'El catálogo completo tiene 460 preguntas. Una persona necesita 310: 300 generales y 10 de su estado federado.' },
        { question: '¿Cuántas respuestas correctas necesito para la ciudadanía?', answer: 'Necesitas al menos 17 respuestas correctas de 33 si el resultado se usa para la naturalización.' },
      ],
    },
  },
} as const;

export function getSeoLandingContent(variant: SeoLandingVariant, lang: string): { contentLang: SupportedLang; copy: LandingCopy } {
  const contentLang: SupportedLang = isSupportedLang(lang) ? lang : 'en';
  return { contentLang, copy: { ...shared[contentLang], ...variants[variant][contentLang] } };
}
