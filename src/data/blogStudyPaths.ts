import type { SupportedLang } from '../types/language';

export type StudyPathLanguage = SupportedLang;
export type StudyPathId = 'understand' | 'prepare' | 'check';

export const BLOG_STUDY_PATHS = [
  {
    id: 'understand',
    anchor: 'lernweg-verstehen',
    guideSlugs: ['unterschied-lid-test-einbuergerungstest', 'wie-viele-fragen-hat-der-einbuergerungstest', 'anmeldung-pruefung-schritte'],
    practiceRoute: 'frage/1/',
  },
  {
    id: 'prepare',
    anchor: 'lernweg-vorbereiten',
    guideSlugs: ['einbuergerungstest-schnell-lernen-7-tage-plan', 'schwierige-fragen', 'einbuergerungstest-app-2026'],
    practiceRoute: 'fragen/',
  },
  {
    id: 'check',
    anchor: 'lernweg-pruefen',
    guideSlugs: ['wie-viele-richtige-antworten-brauche-ich-einbuergerungstest', 'kann-ich-den-einbuergerungstest-online-machen', 'bundesland-fragen-erklaert'],
    practiceRoute: 'exam/',
  },
] as const;

interface StudyPathCopy {
  pageTitle: string;
  description: string;
  heading: string;
  intro: string;
  nextStep: string;
  allPaths: string;
  nextPath: string;
  statePractice: string;
  paths: Record<StudyPathId, { title: string; description: string; practice: string }>;
}

export const studyPathCopy: Record<StudyPathLanguage, StudyPathCopy> = {
  de: {
    pageTitle: 'Einbürgerungstest: Ablauf, Vorbereitung und Probeprüfung',
    description: 'Den Einbürgerungstest verstehen, gezielt lernen und den Wissensstand prüfen: passende Ratgeber, erklärte Fragen und eine kostenlose Probeprüfung.',
    heading: 'Was möchten Sie als Nächstes lernen?',
    intro: 'Wählen Sie Ihren Lernschritt: erst den Test kennenlernen, gezielt üben oder den eigenen Wissensstand prüfen.',
    nextStep: 'Ihr nächster Lernschritt', allPaths: 'Alle Lernwege ansehen', nextPath: 'Weiter zum Lernweg', statePractice: 'Fragen für Ihr Bundesland üben',
    paths: {
      understand: { title: 'Den Einbürgerungstest verstehen', description: 'Klären Sie den Unterschied zum LiD-Test, den Prüfungsaufbau und die Anmeldung. Probieren Sie anschließend eine Frage aus.', practice: 'Erste Frage ausprobieren' },
      prepare: { title: 'Gezielt auf den Test vorbereiten', description: 'Wählen Sie eine Lernroutine, verstehen Sie schwierige Antworten und üben Sie mit Erklärungen.', practice: 'Fragen mit Erklärungen üben' },
      check: { title: 'Den eigenen Wissensstand prüfen', description: 'Informieren Sie sich über richtige Antworten und Online-Übungen. Testen Sie Ihr Wissen in einer Probeprüfung und mit Ihren Bundesland-Fragen.', practice: 'Probeprüfung mit 33 Fragen starten' },
    },
  },
  en: {
    pageTitle: 'German Naturalization Test: Guides, Study and Practice Test',
    description: 'Understand the German naturalization test, plan your preparation and check your knowledge with useful guides, explained questions and a free practice test.',
    heading: 'What would you like to learn next?',
    intro: 'Choose your next step: understand the test, prepare with explanations or check what you know.',
    nextStep: 'Your next study step', allPaths: 'See all study paths', nextPath: 'Continue to the study path', statePractice: 'Practise your federal state questions',
    paths: {
      understand: { title: 'Understand the test', description: 'Learn how the LiD and naturalization tests differ, how the test is structured and how registration works. Then try a question.', practice: 'Try your first question' },
      prepare: { title: 'Prepare for the test', description: 'Choose a study tool that fits your routine, then practise questions and understand the answers with explanations.', practice: 'Practise questions with explanations' },
      check: { title: 'Check your knowledge', description: 'Read about correct answers and online practice. Check your knowledge in a practice test and with your federal state questions.', practice: 'Start a 33-question practice test' },
    },
  },
  tr: {
    pageTitle: 'Almanya Vatandaşlık Testi: Rehberler, Hazırlık ve Deneme',
    description: 'Almanya vatandaşlık testini tanıyın, hazırlığınızı planlayın ve bilginizi ölçün. İlgili rehberlere, açıklamalı sorulara ve ücretsiz deneme sınavına ulaşın.',
    heading: 'Bir sonraki çalışma adımınız hangisi?',
    intro: 'Sınavı tanımak, açıklamalarla hazırlanmak veya bilginizi ölçmek için size uygun adımı seçin.',
    nextStep: 'Bir sonraki çalışma adımınız', allPaths: 'Tüm çalışma yollarını gör', nextPath: 'Sonraki çalışma yolu', statePractice: 'Eyaletinizin sorularıyla çalışın',
    paths: {
      understand: { title: 'Sınavı tanıyın', description: 'LiD ve vatandaşlık testi arasındaki farkı, sınavın yapısını ve kayıt sürecini öğrenin. Ardından bir örnek soru çözün.', practice: 'İlk soruyu deneyin' },
      prepare: { title: 'Sınava hazırlanın', description: 'Çalışma düzeninize uygun aracı seçin, ardından açıklamalı sorularla cevapların neden doğru olduğunu öğrenin.', practice: 'Açıklamalı sorularla çalışın' },
      check: { title: 'Bilginizi ölçün', description: 'Doğru cevaplar ve çevrimiçi alıştırmalar hakkında bilgi alın. Deneme sınavı ve eyalet sorularıyla bilginizi kontrol edin.', practice: '33 soruluk deneme sınavına başlayın' },
    },
  },
  ar: {
    pageTitle: 'اختبار التجنيس في ألمانيا: أدلة واستعداد وامتحان تجريبي',
    description: 'افهم اختبار التجنيس الألماني وخطّط لاستعدادك وقِس معلوماتك عبر أدلة مفيدة وأسئلة مشروحة وامتحان تجريبي مجاني.',
    heading: 'ماذا تريد أن تتعلم بعد ذلك؟',
    intro: 'اختر خطوتك التالية: تعرّف على الاختبار، أو استعد مع الشرح، أو قِس ما تعرفه.',
    nextStep: 'خطوتك الدراسية التالية', allPaths: 'كل مسارات الدراسة', nextPath: 'إلى مسار الدراسة التالي', statePractice: 'تدرّب على أسئلة ولايتك',
    paths: {
      understand: { title: 'افهم الاختبار', description: 'تعرّف على الفرق بين اختبار LiD واختبار التجنيس وبنية الاختبار وطريقة التسجيل، ثم جرّب سؤالًا.', practice: 'جرّب سؤالك الأول' },
      prepare: { title: 'استعد للاختبار', description: 'اختر أداة دراسة تناسب يومك، ثم تدرّب على الأسئلة وافهم الإجابات مع الشرح.', practice: 'تدرّب على الأسئلة مع الشرح' },
      check: { title: 'قِس معلوماتك', description: 'اقرأ عن عدد الإجابات الصحيحة المطلوبة والتدريب عبر الإنترنت، ثم اختبر نفسك في امتحان تجريبي وبأسئلة ولايتك.', practice: 'ابدأ امتحانًا تجريبيًا من 33 سؤالًا' },
    },
  },
  ua: {
    pageTitle: 'Тест на громадянство Німеччини: поради, підготовка і пробний тест',
    description: 'Зрозумійте тест на громадянство Німеччини, сплануйте підготовку та перевірте знання з корисними порадами, поясненими запитаннями й безкоштовним пробним тестом.',
    heading: 'Що ви хочете вивчити далі?',
    intro: 'Оберіть наступний крок: зрозуміти тест, підготуватися з поясненнями або перевірити свої знання.',
    nextStep: 'Ваш наступний крок', allPaths: 'Усі навчальні шляхи', nextPath: 'Далі до навчального шляху', statePractice: 'Тренуйте запитання своєї федеральної землі',
    paths: {
      understand: { title: 'Зрозуміти тест', description: 'Дізнайтеся, чим відрізняються тест LiD і тест на громадянство, як побудований іспит і як зареєструватися. Потім спробуйте запитання.', practice: 'Спробувати перше запитання' },
      prepare: { title: 'Підготуватися до тесту', description: 'Оберіть інструмент навчання під свій розпорядок, тренуйте запитання й розбирайте відповіді з поясненнями.', practice: 'Тренувати запитання з поясненнями' },
      check: { title: 'Перевірити знання', description: 'Дізнайтеся, скільки правильних відповідей потрібно і як тренуватися онлайн. Перевірте себе в пробному тесті та на запитаннях своєї землі.', practice: 'Почати пробний тест із 33 запитань' },
    },
  },
  ru: {
    pageTitle: 'Тест на гражданство Германии: советы, подготовка и пробный тест',
    description: 'Поймите тест на гражданство Германии, спланируйте подготовку и проверьте знания с полезными руководствами, объяснёнными вопросами и бесплатным пробным тестом.',
    heading: 'Что вы хотите изучить дальше?',
    intro: 'Выберите следующий шаг: понять тест, подготовиться с объяснениями или проверить свои знания.',
    nextStep: 'Ваш следующий шаг', allPaths: 'Все учебные пути', nextPath: 'Дальше к учебному пути', statePractice: 'Тренируйте вопросы своей федеральной земли',
    paths: {
      understand: { title: 'Понять тест', description: 'Узнайте, чем отличаются тест LiD и тест на гражданство, как устроен экзамен и как на него записаться. Затем попробуйте вопрос.', practice: 'Попробовать первый вопрос' },
      prepare: { title: 'Подготовиться к тесту', description: 'Выберите учебный инструмент под свой распорядок, тренируйте вопросы и разбирайте ответы с объяснениями.', practice: 'Тренировать вопросы с объяснениями' },
      check: { title: 'Проверить знания', description: 'Узнайте, сколько правильных ответов нужно и как тренироваться онлайн. Проверьте себя в пробном тесте и на вопросах своей земли.', practice: 'Начать пробный тест из 33 вопросов' },
    },
  },
  pl: {
    pageTitle: 'Test na obywatelstwo Niemiec: poradniki, nauka i test próbny',
    description: 'Poznaj niemiecki test na obywatelstwo, zaplanuj przygotowania i sprawdź wiedzę dzięki poradnikom, objaśnionym pytaniom i bezpłatnemu testowi próbnemu.',
    heading: 'Czego chcesz się teraz nauczyć?',
    intro: 'Wybierz kolejny krok: poznaj test, przygotuj się z objaśnieniami albo sprawdź, co już wiesz.',
    nextStep: 'Twój kolejny krok', allPaths: 'Wszystkie ścieżki nauki', nextPath: 'Dalej do ścieżki nauki', statePractice: 'Ćwicz pytania swojego kraju związkowego',
    paths: {
      understand: { title: 'Poznaj test', description: 'Dowiedz się, czym różni się test LiD od testu na obywatelstwo, jak wygląda egzamin i jak się zapisać. Potem spróbuj pytania.', practice: 'Spróbuj pierwszego pytania' },
      prepare: { title: 'Przygotuj się do testu', description: 'Wybierz narzędzie do nauki pasujące do Twojego dnia, ćwicz pytania i zrozum odpowiedzi dzięki objaśnieniom.', practice: 'Ćwicz pytania z wyjaśnieniami' },
      check: { title: 'Sprawdź swoją wiedzę', description: 'Dowiedz się, ile poprawnych odpowiedzi potrzebujesz i jak ćwiczyć online. Sprawdź się w teście próbnym i na pytaniach swojego landu.', practice: 'Rozpocznij test próbny z 33 pytaniami' },
    },
  },
  fa: {
    pageTitle: 'آزمون شهروندی آلمان: راهنما، آمادگی و آزمون آزمایشی',
    description: 'آزمون شهروندی آلمان را بشناسید، آمادگی خود را برنامه‌ریزی کنید و با راهنماهای کاربردی، سؤال‌های توضیح‌داده‌شده و آزمون آزمایشی رایگان دانش خود را بسنجید.',
    heading: 'می‌خواهید بعد از این چه چیزی یاد بگیرید؟',
    intro: 'قدم بعدی را انتخاب کنید: آزمون را بشناسید، با توضیحات آماده شوید یا دانسته‌هایتان را بسنجید.',
    nextStep: 'قدم بعدی یادگیری شما', allPaths: 'همه مسیرهای یادگیری', nextPath: 'رفتن به مسیر یادگیری بعدی', statePractice: 'سؤال‌های ایالت خود را تمرین کنید',
    paths: {
      understand: { title: 'آزمون را بشناسید', description: 'تفاوت آزمون LiD و آزمون تابعیت، ساختار آزمون و روش ثبت‌نام را بشناسید و سپس یک سؤال را امتحان کنید.', practice: 'اولین سؤال را امتحان کنید' },
      prepare: { title: 'برای آزمون آماده شوید', description: 'ابزار مطالعه‌ای متناسب با برنامه روزانه خود انتخاب کنید، سؤال‌ها را تمرین کنید و پاسخ‌ها را با توضیح بفهمید.', practice: 'تمرین سؤال‌ها با توضیح' },
      check: { title: 'دانش خود را بسنجید', description: 'بخوانید چند پاسخ درست لازم است و چطور آنلاین تمرین کنید. سپس خود را در آزمون آزمایشی و با سؤال‌های ایالت خود بسنجید.', practice: 'شروع آزمون آزمایشی ۳۳ سؤالی' },
    },
  },
  ps: {
    pageTitle: 'د آلمان د تابعیت ازموینه: لارښودونه، چمتووالی او آزمایښتي ازموینه',
    description: 'د آلمان د تابعیت ازموینه وپېژنئ، خپل چمتووالی پلان کړئ او د ګټورو لارښودونو، تشریح شویو پوښتنو او وړیا آزمایښتي ازموینې سره خپله پوهه وازمویئ.',
    heading: 'وروسته څه زده کول غواړئ؟',
    intro: 'خپل بل ګام وټاکئ: ازموینه وپېژنئ، له تشریح سره چمتو شئ یا خپله پوهه وازمویئ.',
    nextStep: 'ستاسو د زده‌کړې بل ګام', allPaths: 'د زده‌کړې ټولې لارې', nextPath: 'د زده‌کړې بلې لارې ته', statePractice: 'د خپل ایالت پوښتنې تمرین کړئ',
    paths: {
      understand: { title: 'ازموینه وپېژنئ', description: 'د LiD او تابعیت ازموینې توپیر، د ازموینې جوړښت او د نوم لیکنې طریقه زده کړئ. بیا یوه پوښتنه وازمویئ.', practice: 'لومړۍ پوښتنه وازمویئ' },
      prepare: { title: 'ازموینې ته چمتو شئ', description: 'د خپلې ورځې سره سم د زده‌کړې وسیله وټاکئ، پوښتنې تمرین کړئ او ځوابونه له تشریح سره وپوهېږئ.', practice: 'پوښتنې له تشریح سره تمرین کړئ' },
      check: { title: 'خپله پوهه وازمویئ', description: 'ولولئ چې څومره سم ځوابونه پکار دي او آنلاین تمرین څنګه کېږي. بیا ځان په آزمایښتي ازموینه او د خپل ایالت په پوښتنو وازمویئ.', practice: 'د ۳۳ پوښتنو آزمایښتي ازموینه پیل کړئ' },
    },
  },
  ro: {
    pageTitle: 'Testul de cetățenie germană: ghiduri, pregătire și test de probă',
    description: 'Înțelege testul de cetățenie germană, planifică-ți pregătirea și verifică-ți cunoștințele cu ghiduri utile, întrebări explicate și un test de probă gratuit.',
    heading: 'Ce vrei să înveți în continuare?',
    intro: 'Alege pasul următor: înțelege testul, pregătește-te cu explicații sau verifică ce știi.',
    nextStep: 'Următorul tău pas', allPaths: 'Toate traseele de învățare', nextPath: 'Mai departe la traseul de învățare', statePractice: 'Exersează întrebările landului tău',
    paths: {
      understand: { title: 'Înțelege testul', description: 'Află diferența dintre testul LiD și testul de cetățenie, cum arată examenul și cum te înscrii. Apoi încearcă o întrebare.', practice: 'Încearcă prima întrebare' },
      prepare: { title: 'Pregătește-te pentru test', description: 'Alege un instrument de studiu potrivit programului tău, exersează întrebări și înțelege răspunsurile cu explicații.', practice: 'Exersează întrebări cu explicații' },
      check: { title: 'Verifică-ți cunoștințele', description: 'Află de câte răspunsuri corecte ai nevoie și cum exersezi online. Verifică-te într-un test de probă și cu întrebările landului tău.', practice: 'Începe un test de probă cu 33 de întrebări' },
    },
  },
  it: {
    pageTitle: 'Test di cittadinanza tedesca: guide, preparazione e simulazione',
    description: 'Capisci il test di cittadinanza tedesca, pianifica la preparazione e verifica le tue conoscenze con guide utili, domande spiegate e una simulazione gratuita.',
    heading: 'Cosa vuoi imparare adesso?',
    intro: 'Scegli il prossimo passo: capire il test, prepararti con le spiegazioni o verificare cosa sai.',
    nextStep: 'Il tuo prossimo passo', allPaths: 'Tutti i percorsi di studio', nextPath: 'Vai al percorso di studio', statePractice: 'Esercitati con le domande del tuo Land',
    paths: {
      understand: { title: 'Capire il test', description: 'Scopri la differenza tra il test LiD e il test di cittadinanza, come è strutturato l’esame e come iscriversi. Poi prova una domanda.', practice: 'Prova la prima domanda' },
      prepare: { title: 'Prepararsi al test', description: 'Scegli uno strumento di studio adatto alla tua giornata, esercitati con le domande e comprendi le risposte grazie alle spiegazioni.', practice: 'Esercitati con domande spiegate' },
      check: { title: 'Verificare le conoscenze', description: 'Scopri quante risposte corrette servono e come esercitarti online. Mettiti alla prova con una simulazione e con le domande del tuo Land.', practice: 'Inizia una simulazione con 33 domande' },
    },
  },
  es: {
    pageTitle: 'Examen de ciudadanía alemana: guías, preparación y simulacro',
    description: 'Entiende el examen de ciudadanía alemana, planifica tu preparación y comprueba tus conocimientos con guías útiles, preguntas explicadas y un simulacro gratuito.',
    heading: '¿Qué quieres aprender ahora?',
    intro: 'Elige tu siguiente paso: entender el examen, prepararte con explicaciones o comprobar lo que sabes.',
    nextStep: 'Tu siguiente paso', allPaths: 'Ver todas las rutas de estudio', nextPath: 'Continuar con la ruta de estudio', statePractice: 'Practica las preguntas de tu estado federado',
    paths: {
      understand: { title: 'Entender el examen', description: 'Descubre la diferencia entre el test LiD y el examen de ciudadanía, cómo es el examen y cómo inscribirte. Luego prueba una pregunta.', practice: 'Prueba tu primera pregunta' },
      prepare: { title: 'Prepararse para el examen', description: 'Elige una herramienta de estudio que encaje con tu rutina, practica preguntas y entiende las respuestas con explicaciones.', practice: 'Practica preguntas con explicaciones' },
      check: { title: 'Comprobar tus conocimientos', description: 'Infórmate de cuántas respuestas correctas necesitas y de cómo practicar en línea. Ponte a prueba con un simulacro y con las preguntas de tu estado.', practice: 'Empieza un examen de prueba de 33 preguntas' },
    },
  },
};
