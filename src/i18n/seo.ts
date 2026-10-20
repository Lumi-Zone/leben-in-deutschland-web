import type { SupportedLang } from '../types/language';

interface SearchCopy {
  catalog: string;
  description: string;
  source: string;
  independence: string;
}

export const searchCopy: Record<SupportedLang, SearchCopy> = {
  de: { catalog: 'Einbürgerungstest Fragen: alle 300 Fragen mit Antworten', description: 'Alle 300 allgemeinen Fragen zum Einbürgerungstest mit Antworten kostenlos online üben. Dazu die 10 Fragen für dein Bundesland auswählen.', source: 'Offizieller Fragenkatalog (BAMF)', independence: 'Unabhängiges Lernangebot, keine BAMF-Website. Übersetzungen sind Lernhilfen; die Prüfung findet auf Deutsch statt.' },
  en: { catalog: 'All 300 Leben in Deutschland test questions in English', description: 'Practise all 300 Leben in Deutschland and German citizenship test questions for free, with English translations and answers. Then add the 10 questions for your federal state.', source: 'Official question catalogue (BAMF)', independence: 'Independent study resource, not a BAMF website. Translations are study aids; the exam is in German.' },
  tr: { catalog: 'Leben in Deutschland testi Türkçe: vatandaşlık sınavının 300 sorusu', description: 'Almanya vatandaşlık sınavının 300 genel sorusunu cevaplarıyla ücretsiz çalış. Ardından kendi eyaletinin 10 ek sorusunu seç.', source: 'Resmî soru kataloğu (BAMF)', independence: 'Bağımsız bir öğrenme platformudur, BAMF sitesi değildir. Çeviriler öğrenmeye yardımcıdır; sınav Almanca yapılır.' },
  ar: { catalog: 'أسئلة الامتحان السياسي في ألمانيا: الـ300 سؤال مترجمة بالعربي', description: 'تدرّب مجانًا على أسئلة الامتحان السياسي (اختبار التجنيس وLeben in Deutschland) الـ300 مترجمة بالعربي مع الإجابات، ثم اختر الأسئلة العشرة الخاصة بولايتك.', source: 'كتالوج الأسئلة الرسمي (BAMF)', independence: 'منصة تعليمية مستقلة وليست موقعًا تابعًا لـBAMF. الترجمات للمساعدة على التعلّم؛ يُجرى الامتحان بالألمانية.' },
  ua: { catalog: 'Тест Leben in Deutschland українською: усі 300 запитань з відповідями', description: 'Безкоштовно вивчайте 300 загальних запитань тесту на громадянство з відповідями та 10 додаткових запитань вашої федеральної землі.', source: 'Офіційний каталог запитань (BAMF)', independence: 'Незалежний навчальний ресурс, не сайт BAMF. Переклади допомагають у навчанні; іспит проводиться німецькою.' },
  ru: { catalog: 'Тест Leben in Deutschland на русском: все 300 вопросов с ответами', description: 'Бесплатно изучайте все 300 вопросов теста Leben in Deutschland и теста на гражданство Германии с переводом на русский и ответами, а также 10 вопросов вашей федеральной земли.', source: 'Официальный каталог вопросов (BAMF)', independence: 'Независимый учебный ресурс, не сайт BAMF. Переводы помогают в обучении; экзамен проводится на немецком.' },
  pl: { catalog: 'Wszystkie 300 pytań testu na obywatelstwo', description: 'Ćwicz bezpłatnie 300 ogólnych pytań testu na obywatelstwo Niemiec z odpowiedziami i wybierz 10 pytań dla swojego kraju związkowego.', source: 'Oficjalny katalog pytań (BAMF)', independence: 'Niezależna platforma edukacyjna, nie strona BAMF. Tłumaczenia pomagają w nauce; egzamin odbywa się po niemiecku.' },
  fa: { catalog: 'تمام ۳۰۰ سؤال آزمون شهروندی آلمان', description: '۳۰۰ سؤال عمومی آزمون شهروندی (تابعیت) آلمان را با پاسخ‌ها به فارسی و دری رایگان تمرین کنید و سپس ۱۰ سؤال ایالت خود را انتخاب کنید.', source: 'فهرست رسمی سؤالات (BAMF)', independence: 'منبع آموزشی مستقل است و وب‌سایت BAMF نیست. ترجمه‌ها کمک‌آموزشی هستند؛ آزمون به زبان آلمانی برگزار می‌شود.' },
  ps: { catalog: 'د آلمان د تابعیت ازموینې ټولې ۳۰۰ پوښتنې', description: 'د تابعیت ازموینې ۳۰۰ عمومي پوښتنې له ځوابونو سره وړیا تمرین کړئ او د خپل ایالت ۱۰ پوښتنې وټاکئ.', source: 'د پوښتنو رسمي لړلیک (BAMF)', independence: 'دا یوه خپلواکه زده‌کړیزه سرچینه ده، د BAMF وېب‌پاڼه نه ده. ژباړې د زده‌کړې مرسته ده؛ ازموینه په آلماني ژبه ده.' },
  ro: { catalog: 'Toate cele 300 de întrebări pentru testul de cetățenie', description: 'Exersează gratuit cele 300 de întrebări generale pentru cetățenia germană cu răspunsuri și alege cele 10 întrebări pentru landul tău.', source: 'Catalogul oficial de întrebări (BAMF)', independence: 'Resursă de studiu independentă, nu un site BAMF. Traducerile ajută la învățare; examenul se desfășoară în germană.' },
  it: { catalog: 'Tutte le 300 domande del test di cittadinanza', description: 'Esercitati gratis con le 300 domande generali del test di cittadinanza tedesca e le risposte. Scegli le 10 domande del tuo Land.', source: 'Catalogo ufficiale delle domande (BAMF)', independence: 'Risorsa didattica indipendente, non un sito BAMF. Le traduzioni aiutano lo studio; l’esame si svolge in tedesco.' },
  es: { catalog: 'Las 300 preguntas del examen de ciudadanía', description: 'Practica gratis las 300 preguntas generales del examen de ciudadanía alemana con respuestas y elige las 10 preguntas de tu estado federado.', source: 'Catálogo oficial de preguntas (BAMF)', independence: 'Recurso educativo independiente, no es una web del BAMF. Las traducciones ayudan a estudiar; el examen se realiza en alemán.' },
};

export const QUESTION_SOURCE_URL = 'https://oet.bamf.de/ords/oetut/f?p=514:1:0';

/** The exam name people search for in each language; used as the title suffix of question pages. */
export const testNames: Record<SupportedLang, string> = {
  de: 'Einbürgerungstest 2026',
  en: 'Leben in Deutschland test 2026',
  tr: 'Leben in Deutschland testi 2026',
  ar: 'الامتحان السياسي في ألمانيا 2026',
  ua: 'Тест Leben in Deutschland 2026',
  ru: 'Тест Leben in Deutschland 2026',
  pl: 'Test na obywatelstwo Niemiec 2026',
  fa: 'آزمون شهروندی آلمان ۲۰۲۶',
  ps: 'د آلمان د تابعیت ازموینه ۲۰۲۶',
  ro: 'Testul de cetățenie germană 2026',
  it: 'Test di cittadinanza tedesca 2026',
  es: 'Examen de ciudadanía alemana 2026',
};

interface StateCopy {
  title: string;
  description: string;
  heading: string;
}

/** `{state}` is replaced with the state's display name for the language. */
export const stateCopy: Record<SupportedLang, StateCopy> = {
  de: { title: '{state} Fragen | Einbürgerungstest Bundesland 2026', description: 'Alle offiziellen Bundesland-Fragen für {state}: einfach online für den Leben in Deutschland Test und Einbürgerungstest 2026 üben.', heading: '{state} Fragen' },
  en: { title: '{state} questions | German citizenship test 2026', description: 'The 10 official {state} state questions with answers for the Leben in Deutschland and German citizenship test. Practise online for free.', heading: '{state}: the 10 state questions' },
  tr: { title: '{state} eyalet soruları | Almanya vatandaşlık testi 2026', description: '{state} için 10 resmî eyalet sorusu ve cevapları: Leben in Deutschland ve vatandaşlık testine ücretsiz online hazırlan.', heading: '{state} eyalet soruları' },
  ar: { title: 'أسئلة ولاية {state} | اختبار التجنيس الألماني 2026', description: 'الأسئلة الرسمية العشرة لولاية {state} مع الإجابات لاختبار Leben in Deutschland واختبار التجنيس. تدرّب مجانًا عبر الإنترنت.', heading: 'أسئلة ولاية {state}' },
  ua: { title: 'Запитання землі {state} | Тест на громадянство 2026', description: '10 офіційних запитань землі {state} з відповідями для тесту Leben in Deutschland і тесту на громадянство Німеччини. Безкоштовна практика онлайн.', heading: 'Запитання землі {state}' },
  ru: { title: 'Вопросы земли {state} | Тест на гражданство 2026', description: '10 официальных вопросов земли {state} с ответами для теста Leben in Deutschland и теста на гражданство Германии. Бесплатная практика онлайн.', heading: 'Вопросы земли {state}' },
  pl: { title: 'Pytania dla landu {state} | Test na obywatelstwo 2026', description: '10 oficjalnych pytań dla landu {state} z odpowiedziami do testu Leben in Deutschland i testu na obywatelstwo Niemiec. Ćwicz bezpłatnie online.', heading: 'Pytania dla landu {state}' },
  fa: { title: 'سوالات ایالت {state} | آزمون شهروندی آلمان ۲۰۲۶', description: '۱۰ سوال رسمی ایالت {state} با پاسخ برای آزمون Leben in Deutschland و آزمون تابعیت آلمان (Einbürgerungstest). رایگان و آنلاین تمرین کنید.', heading: 'سوالات ایالت {state}' },
  ps: { title: 'د {state} ایالت پوښتنې | د آلمان د تابعیت ازموینه ۲۰۲۶', description: 'د {state} ایالت ۱۰ رسمي پوښتنې له ځوابونو سره، د Leben in Deutschland او د آلمان د تابعیت ازموینې (Einbürgerungstest) لپاره. وړیا آنلاین تمرین وکړئ.', heading: 'د {state} ایالت پوښتنې' },
  ro: { title: 'Întrebările landului {state} | Test cetățenie 2026', description: 'Cele 10 întrebări oficiale pentru landul {state}, cu răspunsuri, pentru testul Leben in Deutschland și testul de cetățenie germană. Exersează gratuit online.', heading: 'Întrebările landului {state}' },
  it: { title: 'Domande del Land {state} | Test di cittadinanza 2026', description: 'Le 10 domande ufficiali del Land {state} con le risposte per il test Leben in Deutschland e il test di cittadinanza tedesca. Esercitati gratis online.', heading: 'Domande del Land {state}' },
  es: { title: 'Preguntas de {state} | Examen de ciudadanía 2026', description: 'Las 10 preguntas oficiales del estado federado de {state} con respuestas para el test Leben in Deutschland y el examen de ciudadanía alemana. Practica gratis online.', heading: 'Preguntas del estado de {state}' },
};

export function fillState(template: string, stateName: string): string {
  return template.replace('{state}', stateName);
}
