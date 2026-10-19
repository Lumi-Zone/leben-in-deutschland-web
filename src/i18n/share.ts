import type { SupportedLang } from '../types/language';

interface ShareCopy {
    question: string;
    exam: string;
    copied: string;
    manual: string;
    link: string;
}

export const shareCopy: Record<SupportedLang, ShareCopy> = {
    de: { question: 'Frage teilen', exam: 'Probeprüfung teilen', copied: 'Link kopiert', manual: 'Diesen Link können Sie kopieren und weitergeben.', link: 'Link zum Teilen' },
    en: { question: 'Share question', exam: 'Share practice test', copied: 'Link copied', manual: 'You can copy and share this link.', link: 'Link to share' },
    tr: { question: 'Soruyu paylaş', exam: 'Deneme sınavını paylaş', copied: 'Bağlantı kopyalandı', manual: 'Bu bağlantıyı kopyalayıp paylaşabilirsiniz.', link: 'Paylaşım bağlantısı' },
    ar: { question: 'مشاركة السؤال', exam: 'مشاركة الاختبار التجريبي', copied: 'تم نسخ الرابط', manual: 'يمكنك نسخ هذا الرابط ومشاركته.', link: 'رابط المشاركة' },
    fa: { question: 'اشتراک‌گذاری پرسش', exam: 'اشتراک‌گذاری آزمون تمرینی', copied: 'پیوند کپی شد', manual: 'می‌توانید این پیوند را کپی و به اشتراک بگذارید.', link: 'پیوند اشتراک‌گذاری' },
    ua: { question: 'Поділитися запитанням', exam: 'Поділитися пробним тестом', copied: 'Посилання скопійовано', manual: 'Ви можете скопіювати це посилання та поділитися ним.', link: 'Посилання для поширення' },
    ru: { question: 'Поделиться вопросом', exam: 'Поделиться пробным тестом', copied: 'Ссылка скопирована', manual: 'Вы можете скопировать эту ссылку и поделиться ею.', link: 'Ссылка для отправки' },
    pl: { question: 'Udostępnij pytanie', exam: 'Udostępnij test próbny', copied: 'Link skopiowany', manual: 'Możesz skopiować i udostępnić ten link.', link: 'Link do udostępnienia' },
    ps: { question: 'پوښتنه شریکه کړئ', exam: 'تمریني ازموینه شریکه کړئ', copied: 'لینک کاپي شو', manual: 'دا لینک کاپي او شریکولی شئ.', link: 'د شریکولو لینک' },
    ro: { question: 'Distribuie întrebarea', exam: 'Distribuie testul de probă', copied: 'Link copiat', manual: 'Poți copia și distribui acest link.', link: 'Link de distribuit' },
    it: { question: 'Condividi la domanda', exam: 'Condividi il test di prova', copied: 'Link copiato', manual: 'Puoi copiare e condividere questo link.', link: 'Link da condividere' },
    es: { question: 'Compartir pregunta', exam: 'Compartir prueba de práctica', copied: 'Enlace copiado', manual: 'Puedes copiar y compartir este enlace.', link: 'Enlace para compartir' },
};
