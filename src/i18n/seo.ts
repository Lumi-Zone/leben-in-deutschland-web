import type { SupportedLang } from '../types/language';

interface SearchCopy {
  catalog: string;
  description: string;
  source: string;
  independence: string;
}

export const searchCopy: Record<SupportedLang, SearchCopy> = {
  de: { catalog: 'Alle 300 Fragen zum Einbürgerungstest', description: 'Alle 300 allgemeinen Fragen zum Einbürgerungstest mit Antworten kostenlos online üben. Dazu die 10 Fragen für dein Bundesland auswählen.', source: 'Offizieller Fragenkatalog (BAMF)', independence: 'Unabhängiges Lernangebot, keine BAMF-Website. Übersetzungen sind Lernhilfen; die Prüfung findet auf Deutsch statt.' },
  en: { catalog: 'All 300 German citizenship test questions', description: 'Practise all 300 general German citizenship test questions with answers for free. Then choose the 10 questions for your federal state.', source: 'Official question catalogue (BAMF)', independence: 'Independent study resource, not a BAMF website. Translations are study aids; the exam is in German.' },
  tr: { catalog: 'Almanya vatandaşlık sınavının 300 sorusu', description: 'Almanya vatandaşlık sınavının 300 genel sorusunu cevaplarıyla ücretsiz çalış. Ardından kendi eyaletinin 10 ek sorusunu seç.', source: 'Resmî soru kataloğu (BAMF)', independence: 'Bağımsız bir öğrenme platformudur, BAMF sitesi değildir. Çeviriler öğrenmeye yardımcıdır; sınav Almanca yapılır.' },
  ar: { catalog: 'جميع أسئلة اختبار التجنيس الـ300', description: 'تدرّب مجانًا على الأسئلة العامة الـ300 لاختبار التجنيس مع الإجابات، ثم اختر الأسئلة العشرة الخاصة بولايتك.', source: 'كتالوج الأسئلة الرسمي (BAMF)', independence: 'منصة تعليمية مستقلة وليست موقعًا تابعًا لـBAMF. الترجمات للمساعدة على التعلّم؛ يُجرى الامتحان بالألمانية.' },
  ua: { catalog: 'Усі 300 запитань тесту на громадянство Німеччини', description: 'Безкоштовно вивчайте 300 загальних запитань тесту на громадянство з відповідями та 10 додаткових запитань вашої федеральної землі.', source: 'Офіційний каталог запитань (BAMF)', independence: 'Незалежний навчальний ресурс, не сайт BAMF. Переклади допомагають у навчанні; іспит проводиться німецькою.' },
  ru: { catalog: 'Все 300 вопросов теста на гражданство Германии', description: 'Бесплатно изучайте 300 общих вопросов теста на гражданство с ответами и 10 дополнительных вопросов вашей федеральной земли.', source: 'Официальный каталог вопросов (BAMF)', independence: 'Независимый учебный ресурс, не сайт BAMF. Переводы помогают в обучении; экзамен проводится на немецком.' },
  pl: { catalog: 'Wszystkie 300 pytań testu na obywatelstwo', description: 'Ćwicz bezpłatnie 300 ogólnych pytań testu na obywatelstwo Niemiec z odpowiedziami i wybierz 10 pytań dla swojego kraju związkowego.', source: 'Oficjalny katalog pytań (BAMF)', independence: 'Niezależna platforma edukacyjna, nie strona BAMF. Tłumaczenia pomagają w nauce; egzamin odbywa się po niemiecku.' },
  fa: { catalog: 'تمام ۳۰۰ سؤال آزمون شهروندی آلمان', description: '۳۰۰ سؤال عمومی آزمون شهروندی آلمان را با پاسخ‌ها رایگان تمرین کنید و سپس ۱۰ سؤال ایالت خود را انتخاب کنید.', source: 'فهرست رسمی سؤالات (BAMF)', independence: 'منبع آموزشی مستقل است و وب‌سایت BAMF نیست. ترجمه‌ها کمک‌آموزشی هستند؛ آزمون به زبان آلمانی برگزار می‌شود.' },
  ps: { catalog: 'د آلمان د تابعیت ازموینې ټولې ۳۰۰ پوښتنې', description: 'د تابعیت ازموینې ۳۰۰ عمومي پوښتنې له ځوابونو سره وړیا تمرین کړئ او د خپل ایالت ۱۰ پوښتنې وټاکئ.', source: 'د پوښتنو رسمي لړلیک (BAMF)', independence: 'دا یوه خپلواکه زده‌کړیزه سرچینه ده، د BAMF وېب‌پاڼه نه ده. ژباړې د زده‌کړې مرسته ده؛ ازموینه په آلماني ژبه ده.' },
  ro: { catalog: 'Toate cele 300 de întrebări pentru testul de cetățenie', description: 'Exersează gratuit cele 300 de întrebări generale pentru cetățenia germană cu răspunsuri și alege cele 10 întrebări pentru landul tău.', source: 'Catalogul oficial de întrebări (BAMF)', independence: 'Resursă de studiu independentă, nu un site BAMF. Traducerile ajută la învățare; examenul se desfășoară în germană.' },
  it: { catalog: 'Tutte le 300 domande del test di cittadinanza', description: 'Esercitati gratis con le 300 domande generali del test di cittadinanza tedesca e le risposte. Scegli le 10 domande del tuo Land.', source: 'Catalogo ufficiale delle domande (BAMF)', independence: 'Risorsa didattica indipendente, non un sito BAMF. Le traduzioni aiutano lo studio; l’esame si svolge in tedesco.' },
  es: { catalog: 'Las 300 preguntas del examen de ciudadanía', description: 'Practica gratis las 300 preguntas generales del examen de ciudadanía alemana con respuestas y elige las 10 preguntas de tu estado federado.', source: 'Catálogo oficial de preguntas (BAMF)', independence: 'Recurso educativo independiente, no es una web del BAMF. Las traducciones ayudan a estudiar; el examen se realiza en alemán.' },
};

export const QUESTION_SOURCE_URL = 'https://oet.bamf.de/ords/oetut/f?p=514:1:0';
