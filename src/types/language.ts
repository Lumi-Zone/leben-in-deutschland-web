export const SUPPORTED_LANGUAGES = [
    'de',
    'en',
    'tr',
    'ar',
    'ua',
    'ru',
    'pl',
    'fa',
    'ps',
    'ro',
    'it',
    'es',
] as const;

export type SupportedLang = (typeof SUPPORTED_LANGUAGES)[number];

export function isSupportedLang(value: string): value is SupportedLang {
    return SUPPORTED_LANGUAGES.includes(value as SupportedLang);
}
