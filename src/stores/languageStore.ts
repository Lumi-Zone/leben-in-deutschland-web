import { atom } from 'nanostores';

export type Language = 'de' | 'en' | 'tr' | 'ar' | 'ua' | 'ru' | 'pl' | 'fa' | 'ps' | 'ro' | 'it' | 'es';

// Get initial language from localStorage if available, otherwise default to 'de'
const initialLang = typeof localStorage !== 'undefined'
    ? (localStorage.getItem('language') as Language) || 'de'
    : 'de';

export const languageStore = atom<Language>(initialLang);

// Subscribe to changes and update localStorage
if (typeof window !== 'undefined') {
    languageStore.subscribe((lang) => {
        localStorage.setItem('language', lang);
    });
}

export const SUPPORTED_LANGUAGES: { code: Language; label: string; flag: string }[] = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'ua', label: 'Українська', flag: '🇺🇦' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
    { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
    { code: 'ps', label: 'پښتو', flag: '🇦🇫' },
    { code: 'ro', label: 'Română', flag: '🇷🇴' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
];
