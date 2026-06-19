// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

const supportedLanguages = ['de', 'en', 'tr', 'ar', 'ua', 'ru', 'pl', 'fa', 'ps', 'ro', 'it', 'es'];
const sitemapLocales = {
  de: 'de-DE',
  en: 'en-US',
  tr: 'tr-TR',
  ar: 'ar',
  ua: 'uk-UA',
  ru: 'ru-RU',
  pl: 'pl-PL',
  fa: 'fa-IR',
  ps: 'ps',
  ro: 'ro-RO',
  it: 'it-IT',
  es: 'es-ES',
};
const personalToolRoutes = new Set(['favorites', 'progress', 'focus']);
const legalRoutesWithGermanAndEnglish = new Set(['datenschutz', 'terms-of-service', 'subscription-terms']);
const localizedSupportLanguages = new Set(['de', 'en', 'tr', 'ar']);
const reactJsxDevRuntimeShim = fileURLToPath(new URL('./src/shims/react-jsx-dev-runtime.js', import.meta.url));
const { WEEKLY, MONTHLY, YEARLY } = ChangeFreqEnum;

/**
 * @param {string} pageUrl
 */
function getLocalizedRoute(pageUrl) {
  const { pathname } = new URL(pageUrl);
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const segments = normalizedPath.split('/').filter(Boolean);
  const [lang, ...routeSegments] = segments;

  return {
    pathname: normalizedPath,
    lang,
    route: routeSegments[0] ?? '',
    hasSupportedLang: supportedLanguages.includes(lang),
  };
}

/**
 * @param {string} pageUrl
 */
function shouldIncludeInSitemap(pageUrl) {
  const { pathname, lang, route, hasSupportedLang } = getLocalizedRoute(pageUrl);

  if (pathname === '/') return false;
  if (!hasSupportedLang) return true;
  if (personalToolRoutes.has(route)) return false;
  if (route === 'blog' && lang !== 'de') return false;
  if (route === 'impressum' && lang !== 'de') return false;
  if (route === 'support' && !localizedSupportLanguages.has(lang)) return false;
  if (legalRoutesWithGermanAndEnglish.has(route) && !['de', 'en'].includes(lang)) return false;

  return true;
}

/**
 * @param {{ url: string, [key: string]: unknown }} item
 */
function serializeSitemapItem(item) {
  const { pathname, route } = getLocalizedRoute(item.url);

  if (pathname === '/de' || pathname === '/de/') {
    return { ...item, priority: 1, changefreq: WEEKLY };
  }

  if (route === 'blog') {
    return { ...item, priority: 0.8, changefreq: WEEKLY };
  }

  if (route === 'frage' || pathname.endsWith('-fragen')) {
    return { ...item, priority: 0.7, changefreq: MONTHLY };
  }

  if (route === 'exam' || route === 'support') {
    return { ...item, priority: 0.6, changefreq: MONTHLY };
  }

  if (route === 'impressum' || legalRoutesWithGermanAndEnglish.has(route)) {
    return { ...item, priority: 0.2, changefreq: YEARLY };
  }

  return { ...item, priority: 0.5, changefreq: MONTHLY };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://lid-einbuergerung.de',
  base: '/',
  integrations: [
    react(),
    sitemap({
      filter: shouldIncludeInSitemap,
      i18n: {
        defaultLocale: 'de',
        locales: sitemapLocales,
      },
      serialize: serializeSitemapItem,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        {
          find: /^react\/jsx-dev-runtime$/,
          replacement: reactJsxDevRuntimeShim,
        },
      ],
    },
    optimizeDeps: {
      exclude: ['react/jsx-dev-runtime'],
    },
  }
});
