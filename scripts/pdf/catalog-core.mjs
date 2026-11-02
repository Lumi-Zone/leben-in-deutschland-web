import { createHash } from 'node:crypto';

// Pure catalogue logic, shared by the generator and the postbuild test. CI runs
// Node 20, so nothing here may import TypeScript from src/.

export const PDF_LANGUAGES = ['de', 'ar', 'tr', 'ua', 'en'];
const TRANSLATED_LANGUAGES = PDF_LANGUAGES.filter((lang) => lang !== 'de');
const RTL_LANGUAGES = new Set(['ar']);
/** The site routes Ukrainian under /ua/, but the language tag is `uk`. */
const HTML_LANGUAGE = { ua: 'uk' };
export const LANDING_ROUTE = 'einbuergerungstest-fragen-pdf';
export const SITE_HOST = 'lid-einbuergerung.de';
const SITE_ORIGIN = `https://${SITE_HOST}`;

/** Scans must reach the page offering both stores; `utm_source` is also folded into the store campaign token. */
export function appUrl(lang) {
  return `${SITE_ORIGIN}/${lang}/app/?utm_source=pdf-guide&utm_medium=qr`;
}

export function pdfFileName(lang) {
  return `leben-in-deutschland-fragen-und-antworten-${lang}.pdf`;
}

const IMAGE_LABEL = /^(Bild|Nummer|Stimmzettel) (\d)$/;
const IMAGE_LABELS = {
  ar: { Bild: 'الصورة', Nummer: 'الرقم', Stimmzettel: 'ورقة الاقتراع' },
  tr: { Bild: 'Resim', Nummer: 'Numara', Stimmzettel: 'Oy pusulası' },
  ua: { Bild: 'Зображення', Nummer: 'Номер', Stimmzettel: 'Бюлетень' },
  en: { Bild: 'Image', Nummer: 'Number', Stimmzettel: 'Ballot' },
};

/** The translations hold a bare digit for picture answers, which reads as a different answer next to "Bild 1". */
function translatedOption(lang, germanOption, translation) {
  const match = germanOption.match(IMAGE_LABEL);
  return match ? `${IMAGE_LABELS[lang][match[1]]} ${match[2]}` : translation;
}

const STATE_IMAGE_PREFIXES = {
  'Baden-Württemberg': 'bw', Bayern: 'bayern', Berlin: 'berlin', Brandenburg: 'brandenburg',
  Bremen: 'bremen', Hamburg: 'hamburg', Hessen: 'hessen', 'Mecklenburg-Vorpommern': 'mv',
  Niedersachsen: 'niedersachsen', 'Nordrhein-Westfalen': 'nrw', 'Rheinland-Pfalz': 'rp', Saarland: 'saarland',
  Sachsen: 'sachsen', 'Sachsen-Anhalt': 'sa', 'Schleswig-Holstein': 'sh', Thüringen: 'thuringen',
};

function imagePath(question) {
  if (!question.image || question.image === '-') return null;
  if (question.area_code !== 'land') return `public/question-images/general/deutschland${question.id}.png`;
  return `public/question-images/states/${STATE_IMAGE_PREFIXES[question.thema]}${question.id % 10}.png`;
}

/**
 * Joins the official German wording with the site's translations. The official
 * file decides the text and the answer; a disagreement with the site's answer
 * key stops the run rather than shipping a PDF that contradicts the website.
 */
export function buildCatalogEntries(siteQuestions, official) {
  const officialById = new Map(official.questions.map((question) => [question.id, question]));
  return siteQuestions.map((question) => {
    const source = officialById.get(question.id);
    if (!source) throw new Error(`Question ${question.id} is missing from the official data`);
    const siteCorrect = question.solution.trim().toLowerCase().charCodeAt(0) - 97;
    if (siteCorrect !== source.correct) throw new Error(`Question ${question.id}: site answer differs from official answer`);
    const isState = question.area_code === 'land';
    return {
      id: question.id,
      // BAMF numbers each state's questions 301–310 in every state catalogue.
      number: isState ? 301 + ((question.id - 301) % 10) : question.id,
      state: isState ? source.state : null,
      image: imagePath(question),
      credit: source.credit ?? null,
      correct: source.correct,
      de: { question: source.question, options: source.options },
      ...Object.fromEntries(TRANSLATED_LANGUAGES.map((lang) => [lang, {
        question: question[`q_${lang}`],
        options: source.options.map((option, index) => translatedOption(lang, option, question[`a${index + 1}_${lang}`])),
      }])),
    };
  });
}

/** Changes whenever anything printed in the PDF would change, so a stale file fails the build. */
export function catalogHash(entries, official) {
  return createHash('sha256')
    .update(JSON.stringify({ stand: official.catalogueStand, checked: official.answersCheckedOn, entries }))
    .digest('hex');
}

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const formatDate = (isoDate) => isoDate.split('-').reverse().join('.');

/** Without the isolate, bidi reordering prints "1–50" as "50–1" inside Arabic text. */
const ltrIsolate = (value) => `⁦${value}⁩`;

export const pdfCopy = {
  de: {
    title: 'Leben in Deutschland Test und Einbürgerungstest: alle Fragen und Antworten',
    eyebrow: 'Leben in Deutschland · Einbürgerungstest',
    heading: 'Alle 460 Fragen mit richtigen Antworten',
    intro: '300 allgemeine Fragen und je 10 Fragen für alle 16 Bundesländer. Die richtige Antwort ist immer fett und mit einem Haken markiert.',
    examTitle: 'So läuft der Test',
    examFacts: ['33 Fragen: 30 allgemeine Fragen und 3 Fragen zu Ihrem Bundesland', '60 Minuten Zeit', 'Für die Einbürgerung brauchen Sie mindestens 17 richtige Antworten'],
    studyTitle: 'So lernen Sie mit diesem PDF',
    studySteps: ['Lernen Sie die 300 allgemeinen Fragen.', 'Lernen Sie nur die 10 Fragen Ihres Bundeslandes.', 'Machen Sie danach einen Test mit 33 Fragen.'],
    appTitle: 'Üben Sie auf dem Handy',
    appText: 'Simulieren Sie die Prüfung mit 33 Fragen und wiederholen Sie Ihre Fehler in der App. Scannen Sie den Code mit der Kamera.',
    breakTitle: 'Die allgemeinen Fragen sind geschafft',
    breakText: 'Lesen allein reicht selten. Machen Sie jetzt einen Test mit 33 Fragen und sehen Sie, wie viele Antworten Sie wirklich wissen.',
    endTitle: 'Bereit für den Test?',
    endText: 'Testen Sie Ihr Wissen mit 33 Fragen in der App und wiederholen Sie gezielt Ihre Fehler.',
    source: (stand, checked) => `Fragen: BAMF-Gesamtfragenkatalog, Stand ${stand}. Antworten geprüft am ${checked} im Online-Testcenter des BAMF.`,
    independence: 'Unabhängiges Lernangebot, keine BAMF-Website. Alle Angaben ohne Gewähr; maßgeblich ist der offizielle Katalog des BAMF.',
    latest: 'Aktuelle Version',
    generalHeading: (from, to) => `Allgemeine Fragen ${from}–${to}`,
    statesHeading: 'Fragen zu den Bundesländern',
    statesIntro: 'Im Test kommen 3 von 10 Fragen Ihres Bundeslandes vor. Lernen Sie nur Ihr Bundesland.',
    stateHeading: (state) => state,
    contents: 'Inhalt',
    credits: 'Bildnachweise',
    creditQuestion: (entry) => `Frage ${entry.number}`,
    footer: (stand) => `Leben in Deutschland · Fragenkatalog Stand ${stand} · ${SITE_HOST}`,
  },
  ar: {
    title: 'أسئلة الامتحان السياسي في ألمانيا مترجمة مع الإجابات',
    eyebrow: 'الامتحان السياسي · Leben in Deutschland · Einbürgerungstest',
    heading: 'الأسئلة الـ460 كاملة مترجمة مع الإجابات الصحيحة',
    intro: '300 سؤال عام و10 أسئلة لكل ولاية من الولايات الـ16. النص الألماني بجانب الترجمة العربية، والإجابة الصحيحة بخط عريض مع علامة صح.',
    examTitle: 'كيف يجري الامتحان؟',
    examFacts: ['33 سؤالًا: 30 سؤالًا عامًا و3 أسئلة عن ولايتك', '60 دقيقة', 'للتجنيس تحتاج إلى 17 إجابة صحيحة على الأقل', 'الامتحان باللغة الألمانية، لذلك تعلّم النص الألماني أيضًا'],
    studyTitle: 'كيف تدرس بهذا الملف؟',
    studySteps: ['ادرس الأسئلة العامة الـ300.', 'ادرس فقط الأسئلة العشرة الخاصة بولايتك.', 'اختبر نفسك بعد ذلك بامتحان من 33 سؤالًا.'],
    appTitle: 'تدرّب على هاتفك',
    appText: 'جرّب محاكاة الامتحان بـ33 سؤالًا وراجع أخطاءك في التطبيق. امسح الرمز بكاميرا الهاتف.',
    breakTitle: 'انتهيت من الأسئلة العامة',
    breakText: 'القراءة وحدها لا تكفي عادةً. جرّب الآن اختبارًا من 33 سؤالًا لتعرف كم إجابة تعرفها فعلًا.',
    endTitle: 'هل أنت مستعد للامتحان؟',
    endText: 'اختبر معلوماتك بـ33 سؤالًا في التطبيق وراجع أخطاءك.',
    source: (stand, checked) => `الأسئلة: كتالوج BAMF الرسمي، إصدار ${stand}. راجعنا الإجابات بتاريخ ${checked} في مركز الاختبار الإلكتروني التابع لـBAMF.`,
    independence: 'منصة تعليمية مستقلة وليست موقعًا تابعًا لـBAMF. الترجمات للمساعدة على التعلّم، والنص الألماني في كتالوج BAMF هو المرجع الرسمي.',
    latest: 'أحدث نسخة',
    generalHeading: (from, to) => `الأسئلة العامة ${ltrIsolate(`${from}–${to}`)}`,
    statesHeading: 'أسئلة الولايات',
    statesIntro: 'يأتي في الامتحان 3 أسئلة من الأسئلة العشرة الخاصة بولايتك. ادرس ولايتك فقط.',
    stateHeading: (state, localNames) => `${localNames[state]} (${state})`,
    contents: 'المحتويات',
    credits: 'مصادر الصور',
    creditQuestion: (entry) => `السؤال ${entry.number}`,
    footer: (stand) => `Leben in Deutschland · ${SITE_HOST} · ${stand}`,
  },
  tr: {
    title: 'Leben in Deutschland testi ve vatandaşlık sınavı: tüm sorular ve cevaplar',
    eyebrow: 'Leben in Deutschland · Einbürgerungstest · Vatandaşlık sınavı',
    heading: '460 sorunun tamamı doğru cevaplarıyla',
    intro: '300 genel soru ve 16 eyaletin her biri için 10 soru. Almanca metin ve Türkçe çeviri yan yana. Doğru cevap her zaman kalın yazılır ve onay işaretiyle gösterilir.',
    examTitle: 'Sınav nasıl yapılır?',
    examFacts: ['33 soru: 30 genel soru ve eyaletinizle ilgili 3 soru', 'Süre 60 dakika', 'Vatandaşlık için en az 17 doğru cevap gerekir', 'Sınav Almancadır, bu yüzden Almanca metni de öğrenin'],
    studyTitle: 'Bu PDF ile nasıl çalışılır?',
    studySteps: ['300 genel soruyu çalışın.', 'Yalnızca kendi eyaletinizin 10 sorusunu çalışın.', 'Ardından 33 soruluk bir deneme sınavı yapın.'],
    appTitle: 'Telefonunuzda pratik yapın',
    appText: 'Uygulamada 33 soruluk deneme sınavı çözün ve yanlışlarınızı tekrar edin. Kodu telefonunuzun kamerasıyla tarayın.',
    breakTitle: 'Genel soruları bitirdiniz',
    breakText: 'Yalnızca okumak çoğu zaman yetmez. Şimdi 33 soruluk bir deneme yapın ve gerçekte kaç cevabı bildiğinizi görün.',
    endTitle: 'Sınava hazır mısınız?',
    endText: 'Bilginizi uygulamada 33 soruyla deneyin ve yanlışlarınızı tekrar edin.',
    source: (stand, checked) => `Sorular: BAMF resmî soru kataloğu, ${stand} tarihli sürüm. Cevaplar ${checked} tarihinde BAMF çevrimiçi test merkezinde kontrol edildi.`,
    independence: 'Bağımsız bir öğrenme kaynağıdır, BAMF sitesi değildir. Çeviriler öğrenmeye yardımcıdır; resmî metin BAMF kataloğundaki Almanca metindir.',
    latest: 'Güncel sürüm',
    generalHeading: (from, to) => `Genel sorular ${from}–${to}`,
    statesHeading: 'Eyalet soruları',
    statesIntro: 'Sınavda eyaletinizin 10 sorusundan 3 tanesi çıkar. Yalnızca kendi eyaletinizi çalışın.',
    stateHeading: (state) => state,
    contents: 'İçindekiler',
    credits: 'Görsel kaynakları',
    creditQuestion: (entry) => `Soru ${entry.number}`,
    footer: (stand) => `Leben in Deutschland · Katalog ${stand} · ${SITE_HOST}`,
  },
  ua: {
    title: 'Тест Leben in Deutschland і тест на громадянство: усі запитання та відповіді',
    eyebrow: 'Leben in Deutschland · Einbürgerungstest · Тест на громадянство',
    heading: 'Усі 460 запитань із правильними відповідями',
    intro: '300 загальних запитань і по 10 запитань для кожної з 16 федеральних земель. Німецький текст і український переклад поруч. Правильну відповідь виділено жирним шрифтом і галочкою.',
    examTitle: 'Як проходить тест',
    examFacts: ['33 запитання: 30 загальних і 3 про вашу федеральну землю', '60 хвилин', 'Для громадянства потрібно щонайменше 17 правильних відповідей', 'Іспит проводиться німецькою, тому вивчайте і німецький текст'],
    studyTitle: 'Як вчитися за цим PDF',
    studySteps: ['Вивчіть 300 загальних запитань.', 'Вивчіть лише 10 запитань своєї федеральної землі.', 'Потім пройдіть пробний тест із 33 запитань.'],
    appTitle: 'Тренуйтеся на телефоні',
    appText: 'Складайте пробний іспит із 33 запитань і повторюйте свої помилки в застосунку. Скануйте код камерою телефона.',
    breakTitle: 'Загальні запитання позаду',
    breakText: 'Самого читання часто замало. Пройдіть зараз тест із 33 запитань і побачите, скільки відповідей ви справді знаєте.',
    endTitle: 'Готові до тесту?',
    endText: 'Перевірте свої знання на 33 запитаннях у застосунку та повторіть свої помилки.',
    source: (stand, checked) => `Запитання: офіційний каталог BAMF, редакція від ${stand}. Відповіді перевірено ${checked} в онлайн-центрі тестування BAMF.`,
    independence: 'Незалежний навчальний ресурс, не сайт BAMF. Переклади допомагають у навчанні; офіційним є німецький текст у каталозі BAMF.',
    latest: 'Актуальна версія',
    generalHeading: (from, to) => `Загальні запитання ${from}–${to}`,
    statesHeading: 'Запитання про федеральні землі',
    statesIntro: 'На тесті буде 3 з 10 запитань вашої федеральної землі. Вивчайте лише свою землю.',
    stateHeading: (state, localNames) => `${localNames[state]} (${state})`,
    contents: 'Зміст',
    credits: 'Джерела зображень',
    creditQuestion: (entry) => `Запитання ${entry.number}`,
    footer: (stand) => `Leben in Deutschland · Каталог ${stand} · ${SITE_HOST}`,
  },
  en: {
    title: 'Leben in Deutschland and German citizenship test: all questions and answers',
    eyebrow: 'Leben in Deutschland · Einbürgerungstest · German citizenship test',
    heading: 'All 460 questions with the correct answers',
    intro: '300 general questions and 10 questions for each of the 16 federal states. German text and English translation side by side. The correct answer is always bold and has a check mark.',
    examTitle: 'How the test works',
    examFacts: ['33 questions: 30 general questions and 3 about your federal state', '60 minutes', 'For citizenship you need at least 17 correct answers', 'The exam is in German, so learn the German text too'],
    studyTitle: 'How to study with this PDF',
    studySteps: ['Learn the 300 general questions.', 'Learn only the 10 questions for your federal state.', 'Then take a practice test with 33 questions.'],
    appTitle: 'Practise on your phone',
    appText: 'Take the 33-question practice exam and repeat your mistakes in the app. Scan the code with your camera.',
    breakTitle: 'You have finished the general questions',
    breakText: 'Reading alone is rarely enough. Take a 33-question test now and see how many answers you really know.',
    endTitle: 'Ready for the test?',
    endText: 'Check your knowledge with 33 questions in the app and repeat your mistakes.',
    source: (stand, checked) => `Questions: official BAMF catalogue, version of ${stand}. Answers checked on ${checked} in the BAMF online test centre.`,
    independence: 'Independent study resource, not a BAMF website. Translations are study aids; the German text in the BAMF catalogue is the official version.',
    latest: 'Latest version',
    generalHeading: (from, to) => `General questions ${from}–${to}`,
    statesHeading: 'Federal state questions',
    statesIntro: 'The test includes 3 of the 10 questions for your federal state. Learn only your own state.',
    stateHeading: (state) => state,
    contents: 'Contents',
    credits: 'Image credits',
    creditQuestion: (entry) => `Question ${entry.number}`,
    footer: (stand) => `Leben in Deutschland · Catalogue ${stand} · ${SITE_HOST}`,
  },
};

const CHECK = '<svg class="check" viewBox="0 0 12 12" aria-hidden="true"><path d="M1.8 6.6 4.8 9.6 10.4 2.8"/></svg>';
const marker = (isCorrect) => (isCorrect ? CHECK : '<span class="dot"></span>');

function renderImage(entry, images) {
  if (!entry.image) return '';
  const { src, wide } = images[entry.image];
  return `<img class="${wide ? 'wide' : 'tall'}" src="${src}" alt="">`;
}

function renderGermanQuestion(entry, images) {
  const options = entry.de.options.map((option, index) => {
    const isCorrect = index === entry.correct;
    return `<li${isCorrect ? ' class="ok"' : ''}>${marker(isCorrect)}<span>${escapeHtml(option)}</span></li>`;
  }).join('');
  return `<article class="q" data-question="${entry.id}"><p class="qt"><span class="n">${entry.number}</span><span>${escapeHtml(entry.de.question)}</span></p>${renderImage(entry, images)}<ul>${options}</ul></article>`;
}

function renderBilingualQuestion(lang, entry, images) {
  const translated = (content) => `<div class="t" lang="${HTML_LANGUAGE[lang] ?? lang}" dir="${RTL_LANGUAGES.has(lang) ? 'rtl' : 'ltr'}">${content}</div>`;
  const german = (content) => `<div lang="de" dir="ltr">${content}</div>`;
  // Grid columns follow the document direction: German stays on the left either way.
  const cells = (de, other) => (RTL_LANGUAGES.has(lang) ? translated(other) + german(de) : german(de) + translated(other));
  const options = entry.de.options.map((option, index) => {
    const isCorrect = index === entry.correct;
    const content = (text) => `${marker(isCorrect)}<span>${escapeHtml(text)}</span>`;
    return `<div class="row${isCorrect ? ' ok' : ''}">${cells(content(option), content(entry[lang].options[index]))}</div>`;
  }).join('');
  const heading = (text) => `<span class="n">${entry.number}</span><span>${escapeHtml(text)}</span>`;
  return `<article class="q" data-question="${entry.id}"><div class="row head">${cells(heading(entry.de.question), heading(entry[lang].question))}</div>${renderImage(entry, images)}${options}</article>`;
}

function renderPromo({ title, text, qrSvg, url }) {
  const shownUrl = url.replace('https://', '').split('?')[0];
  return `<aside class="promo"><div class="qr">${qrSvg}</div><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><a href="${escapeHtml(url)}">${escapeHtml(shownUrl)}</a></div></aside>`;
}

function groupByState(entries) {
  const groups = new Map();
  for (const entry of entries) {
    if (!groups.has(entry.state)) groups.set(entry.state, []);
    groups.get(entry.state).push(entry);
  }
  return [...groups.entries()].sort(([left], [right]) => left.localeCompare(right, 'de'));
}

/** Everything the printed page needs is passed in, so the same data always yields the same document. */
export function renderCatalogHtml({ lang, entries, official, images, fonts, qrSvg, localNames = {} }) {
  const copy = pdfCopy[lang];
  const stand = formatDate(official.catalogueStand);
  const checked = formatDate(official.answersCheckedOn);
  const url = appUrl(lang);
  const render = lang === 'de' ? renderGermanQuestion : (entry) => renderBilingualQuestion(lang, entry, images);
  const general = entries.filter((entry) => !entry.state);
  const sections = Array.from({ length: Math.ceil(general.length / 50) }, (_, index) => general.slice(index * 50, (index + 1) * 50));
  const states = groupByState(entries.filter((entry) => entry.state));
  const landing = `${SITE_ORIGIN}/${lang}/${LANDING_ROUTE}/`;
  const credited = entries.filter((entry) => entry.credit);
  const contents = [
    ...sections.map((section) => [`general-${section[0].number}`, copy.generalHeading(section[0].number, section.at(-1).number)]),
    ...states.map(([state]) => [`state-${state}`, copy.stateHeading(state, localNames)]),
  ];

  return `<!doctype html>
<html lang="${HTML_LANGUAGE[lang] ?? lang}" dir="${RTL_LANGUAGES.has(lang) ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<title>${escapeHtml(copy.title)}</title>
<style>
${fonts}
@page { size: A4; margin: 13mm 13mm 16mm;
  @bottom-left { content: "${copy.footer(stand)}"; font: 7.5pt 'Noto Sans', 'Noto Sans Arabic', sans-serif; color: #5b6b64; }
  @bottom-right { content: counter(page) " / " counter(pages); font: 7.5pt 'Noto Sans', sans-serif; color: #5b6b64; direction: ltr; }
}
@page :first { margin: 15mm; @bottom-left { content: none; } @bottom-right { content: none; } }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font: 9.2pt/1.34 'Noto Sans', 'Noto Sans Arabic', sans-serif; color: #182d26; }
h1, h2, h3, p, ul, ol { margin: 0; padding: 0; }
a { color: #1f5f47; }
.eyebrow { font-size: 10pt; font-weight: 700; color: #1f5f47; }
.cover h1 { margin-top: 3mm; font-size: 27pt; line-height: 1.16; }
.cover .intro { margin-top: 4mm; font-size: 12pt; line-height: 1.45; }
.panels { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; margin-top: 7mm; }
.panel { padding: 4.5mm; border: .3mm solid #cfdcd5; border-radius: 3mm; }
.panel h2 { font-size: 11.5pt; margin-bottom: 2mm; }
.panel li { margin-top: 1.4mm; margin-inline-start: 4.5mm; font-size: 9.8pt; }
.promo { display: flex; align-items: center; gap: 6mm; margin-top: 6mm; padding: 4.5mm; border-radius: 3mm; background: #eaf3ee; break-inside: avoid; }
.promo .qr { flex: none; width: 32mm; height: 32mm; }
.promo .qr svg { display: block; width: 100%; height: 100%; }
.promo h3 { font-size: 13pt; }
.promo p { margin: 1.5mm 0; font-size: 10pt; }
.promo a { font-size: 9pt; font-weight: 700; direction: ltr; unicode-bidi: isolate; }
.contents { margin-top: 6mm; }
.contents h2 { font-size: 11.5pt; margin-bottom: 2mm; }
.contents ol { columns: ${lang === 'ar' || lang === 'ua' ? 2 : 3}; column-gap: 5mm; list-style: none; }
.contents li { font-size: 8.4pt; padding: .5mm 0; break-inside: avoid; }
.contents a { text-decoration: none; }
.legal { margin-top: 6mm; font-size: 8pt; line-height: 1.45; color: #4a5c55; }
.legal p + p { margin-top: 1mm; }
.legal a { direction: ltr; unicode-bidi: isolate; }
.section { break-before: page; }
.section > h2 { font-size: 14pt; padding-bottom: 1.5mm; margin-bottom: 3mm; border-bottom: .6mm solid #1f5f47; }
.state-intro { margin-bottom: 3mm; font-size: 10pt; }
.q { break-inside: avoid; }
.n { display: inline-block; flex: none; min-width: 7.5mm; font-weight: 700; color: #1f5f47; }
.q img { display: block; max-width: 100%; margin: 1.5mm auto; object-fit: contain; }
.check { flex: none; width: 3.1mm; height: 3.1mm; margin-top: .55mm; fill: none; stroke: #16704c; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.dot { flex: none; width: 2.4mm; height: 2.4mm; margin: .85mm .35mm 0; border: .22mm solid #8a9a93; border-radius: 50%; }
${lang === 'de' ? `
.columns { column-count: 2; column-gap: 7mm; }
.q { padding: 0 0 3mm; }
.qt { display: flex; font-weight: 700; }
.q ul { list-style: none; margin-top: .8mm; padding-inline-start: 7.5mm; }
.q li { display: flex; gap: 1.5mm; margin-top: .45mm; }
.q li.ok { font-weight: 700; color: #0f5a3c; }
.q img.wide { width: 100%; max-height: 32mm; }
.q img.tall { max-height: 42mm; }
` : `
body { font-size: 9pt; }
.q { padding: 2mm 0 2.4mm; border-bottom: .2mm solid #d6e0db; }
.row { display: grid; grid-template-columns: 1fr 1fr; column-gap: 6mm; }
.row > div { display: flex; gap: 1.5mm; padding: .35mm 1mm; }
.row.head > div { font-weight: 700; padding-bottom: .9mm; }
.row.ok { background: #e6f2ec; border-radius: 1mm; font-weight: 700; color: #0f5a3c; }
${RTL_LANGUAGES.has(lang) ? '.t { font-size: 10pt; line-height: 1.5; }' : ''}
.q img.wide { max-width: 88mm; max-height: 28mm; }
.q img.tall { max-height: 40mm; }
`}
.credits { margin-top: 7mm; font-size: 8pt; break-inside: avoid; }
.credits h3 { font-size: 9.5pt; margin-bottom: 1mm; }
.credits li { list-style: none; }
</style>
</head>
<body>
<section class="cover">
  <p class="eyebrow">${escapeHtml(copy.eyebrow)}</p>
  <h1>${escapeHtml(copy.heading)}</h1>
  <p class="intro">${escapeHtml(copy.intro)}</p>
  <div class="panels">
    <div class="panel"><h2>${escapeHtml(copy.examTitle)}</h2><ul>${copy.examFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('')}</ul></div>
    <div class="panel"><h2>${escapeHtml(copy.studyTitle)}</h2><ol>${copy.studySteps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol></div>
  </div>
  ${renderPromo({ title: copy.appTitle, text: copy.appText, qrSvg, url })}
  <nav class="contents"><h2>${escapeHtml(copy.contents)}</h2><ol>${contents.map(([id, label]) => `<li><a href="#${escapeHtml(id)}">${escapeHtml(label)}</a></li>`).join('')}</ol></nav>
  <div class="legal">
    <p>${escapeHtml(copy.source(stand, checked))}</p>
    <p>${escapeHtml(copy.independence)}</p>
    <p>${escapeHtml(copy.latest)}: <a href="${landing}">${landing.replace('https://', '')}</a></p>
  </div>
</section>
${sections.map((section) => `<section class="section" id="general-${section[0].number}"><h2>${escapeHtml(copy.generalHeading(section[0].number, section.at(-1).number))}</h2><div class="columns">${section.map((entry) => render(entry, images)).join('')}</div></section>`).join('\n')}
<section class="section">
  <h2>${escapeHtml(copy.statesHeading)}</h2>
  <p class="state-intro">${escapeHtml(copy.statesIntro)}</p>
  ${renderPromo({ title: copy.breakTitle, text: copy.breakText, qrSvg, url })}
</section>
${states.map(([state, group]) => `<section class="section" id="state-${escapeHtml(state)}"><h2>${escapeHtml(copy.stateHeading(state, localNames))}</h2><div class="columns">${group.map((entry) => render(entry, images)).join('')}</div></section>`).join('\n')}
<section class="section">
  ${renderPromo({ title: copy.endTitle, text: copy.endText, qrSvg, url })}
  <div class="credits"><h3>${escapeHtml(copy.credits)}</h3><ul>${credited.map((entry) => `<li>${escapeHtml(copy.creditQuestion(entry))}: ${escapeHtml(entry.credit)}</li>`).join('')}</ul></div>
</section>
</body>
</html>`;
}
