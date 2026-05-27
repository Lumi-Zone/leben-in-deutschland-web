import type { SupportedLang } from '../types/language';

export const SITE_NAME = 'Leben in Deutschland';
export const SITE_DESCRIPTION =
  'Kostenlos den Leben in Deutschland Test und Einbuergerungstest 2026 online ueben.';

export const SEO_LANGUAGE_META: Record<
  SupportedLang,
  { htmlLang: string; hrefLang: string; ogLocale: string }
> = {
  de: { htmlLang: 'de-DE', hrefLang: 'de-DE', ogLocale: 'de_DE' },
  en: { htmlLang: 'en-US', hrefLang: 'en-US', ogLocale: 'en_US' },
  tr: { htmlLang: 'tr-TR', hrefLang: 'tr-TR', ogLocale: 'tr_TR' },
  ar: { htmlLang: 'ar', hrefLang: 'ar', ogLocale: 'ar_AR' },
  ua: { htmlLang: 'uk-UA', hrefLang: 'uk-UA', ogLocale: 'uk_UA' },
  ru: { htmlLang: 'ru-RU', hrefLang: 'ru-RU', ogLocale: 'ru_RU' },
  pl: { htmlLang: 'pl-PL', hrefLang: 'pl-PL', ogLocale: 'pl_PL' },
  fa: { htmlLang: 'fa-IR', hrefLang: 'fa-IR', ogLocale: 'fa_IR' },
  ps: { htmlLang: 'ps', hrefLang: 'ps', ogLocale: 'ps_AF' },
  ro: { htmlLang: 'ro-RO', hrefLang: 'ro-RO', ogLocale: 'ro_RO' },
  it: { htmlLang: 'it-IT', hrefLang: 'it-IT', ogLocale: 'it_IT' },
  es: { htmlLang: 'es-ES', hrefLang: 'es-ES', ogLocale: 'es_ES' },
};

export function getSeoLanguageMeta(lang: string) {
  return SEO_LANGUAGE_META[lang as SupportedLang] ?? {
    htmlLang: lang,
    hrefLang: lang,
    ogLocale: 'de_DE',
  };
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function truncateText(value: string, maxLength: number): string {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;

  const sliceLength = Math.max(1, maxLength - 3);
  const sliced = clean.slice(0, sliceLength);
  const lastSpace = sliced.lastIndexOf(' ');
  const cutAt = lastSpace > Math.floor(sliceLength * 0.6) ? lastSpace : sliceLength;

  return `${sliced.slice(0, cutAt).trim()}...`;
}
