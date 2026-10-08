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
  },
} as const;

export function getSeoLandingContent(variant: SeoLandingVariant, lang: string): { contentLang: PriorityContentLang; copy: LandingCopy } {
  const contentLang: PriorityContentLang = lang === 'de' || lang === 'tr' ? lang : 'en';
  return { contentLang, copy: { ...shared[contentLang], ...variants[variant][contentLang] } };
}
