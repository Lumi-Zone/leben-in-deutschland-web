
export const legalTranslations = {
    de: {
        'legal.privacy_policy': 'Datenschutzerklärung',
        'legal.terms_of_service': 'Nutzungsbedingungen',
        'legal.subscription_terms': 'Abonnementbedingungen',
        'legal.last_updated': 'Zuletzt aktualisiert am',
        'legal.table_of_contents': 'Inhaltsverzeichnis',
        'legal.back_to_home': 'Zurück zur Startseite',
        'legal.summary': 'Zusammenfassung der wichtigsten Punkte',
        'legal.contact_us': 'Kontaktieren Sie uns',
    },
    en: {
        'legal.privacy_policy': 'Privacy Policy',
        'legal.terms_of_service': 'Terms of Service',
        'legal.subscription_terms': 'Subscription Terms',
        'legal.last_updated': 'Last updated',
        'legal.table_of_contents': 'Table of Contents',
        'legal.back_to_home': 'Back to Home',
        'legal.summary': 'Summary of Key Points',
        'legal.contact_us': 'Contact Us',
    },
    tr: {
        'legal.privacy_policy': 'Gizlilik Politikası',
        'legal.terms_of_service': 'Kullanım Şartları',
        'legal.subscription_terms': 'Abonelik Şartları',
        'legal.last_updated': 'Son güncelleme',
        'legal.table_of_contents': 'İçindekiler',
        'legal.back_to_home': 'Ana Sayfaya Dön',
        'legal.summary': 'Önemli Noktaların Özeti',
        'legal.contact_us': 'Bize Ulaşın',
    },
    ar: {
        'legal.privacy_policy': 'سياسة الخصوصية',
        'legal.terms_of_service': 'شروط الخدمة',
        'legal.subscription_terms': 'شروط الاشتراك',
        'legal.last_updated': 'آخر تحديث في',
        'legal.table_of_contents': 'جدول المحتويات',
        'legal.back_to_home': 'العودة إلى الصفحة الرئيسية',
        'legal.summary': 'ملخص النقاط الرئيسية',
        'legal.contact_us': 'اتصل بنا',
    }
};

export const getLegalTranslation = (lang: string, key: keyof typeof legalTranslations['en']) => {
    const l = lang as keyof typeof legalTranslations;
    return legalTranslations[l]?.[key] || legalTranslations['en'][key];
};
