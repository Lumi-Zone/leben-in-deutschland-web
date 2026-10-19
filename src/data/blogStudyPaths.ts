export type StudyPathLanguage = 'de' | 'en' | 'tr';
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
};
