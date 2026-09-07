export const IOS_APP_ID = '6723899981';
export const ANDROID_PACKAGE_ID = 'com.einbuergerungapp';

export const MOBILE_APP_NAME = 'Leben in Deutschland 310Fragen';
export const MOBILE_APP_ALTERNATE_NAMES = [
  'Leben in Deutschland 2026',
  'Einbuergerungstest App',
  'Einbürgerungstest App',
  'Leben in Deutschland Test App',
];

/**
 * Canonical, parameter-free store URLs. Use these for structured data, meta tags
 * and anywhere a stable identity of the app is meant — never for a link a person
 * clicks, because those should carry campaign attribution (see `buildStoreUrl`).
 *
 * The Apple URL deliberately omits a storefront prefix such as `/de/` so visitors
 * land in their own country's store; the site serves twelve languages.
 */
export const APP_STORE_URL = `https://apps.apple.com/app/leben-in-deutschland-2026-lid/id${IOS_APP_ID}`;
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_ID}`;

export type StorePlatform = 'ios' | 'android';

/**
 * Where on the site the install was initiated. Kept as a closed union so the
 * values stay comparable in App Store Connect and Play Console reports instead
 * of drifting into near-duplicate free text.
 */
export type InstallSource =
  | 'home-app'
  | 'app-page-hero'
  | 'app-page-cta'
  | 'app-page-sticky'
  | 'app-page-qr'
  | 'seo-landing'
  | 'question-page'
  | 'exam-result'
  | 'smart-banner'
  | 'desktop-qr';

export interface StoreLinkOptions {
  platform: StorePlatform;
  source: InstallSource;
  /**
   * UI language of the page the visitor clicked from. Reaches Play's referrer
   * only; see the note on APPLE_CAMPAIGN_MAX_LENGTH for why Apple's token omits it.
   */
  lang?: string;
  /**
   * Low-cardinality distinction within a source, e.g. which SEO landing page.
   * Appears in both stores' campaign values.
   */
  variant?: string;
  /**
   * High-cardinality detail such as a question id. Play accepts any number of
   * distinct referrer values, but Apple reports campaigns one row per `ct`, so
   * thousands of tokens would bury the signal. This therefore reaches Play only.
   */
  itemId?: string | number;
}

/**
 * Apple only reports the `ct` campaign value when it is paired with the provider
 * token from App Store Connect → App Analytics → Campaigns. The token identifies
 * the account rather than a campaign, is the same in every campaign link Apple
 * generates, and is public by construction — it ships inside every store link on
 * this site — so it lives here with an environment override rather than in a
 * secret.
 */
const DEFAULT_APPLE_PROVIDER_TOKEN = '127350173';
const APPLE_PROVIDER_TOKEN =
  (typeof import.meta.env !== 'undefined'
    ? import.meta.env.PUBLIC_APPLE_PROVIDER_TOKEN?.trim()
    : undefined) || DEFAULT_APPLE_PROVIDER_TOKEN;

const UTM_SOURCE = 'lid-web';
const UTM_CAMPAIGN = 'web2app';

/** Apple truncates campaign tokens beyond 40 characters. */
const APPLE_CAMPAIGN_MAX_LENGTH = 40;

/**
 * Apple hides any campaign that has not been installed by at least five distinct
 * Apple Accounts, and applies that threshold per campaign token. Every extra
 * dimension in `ct` therefore splits the same installs across more buckets and
 * pushes each one further below the threshold, so the iOS token stays coarse:
 * placement only. Language still reaches Play's referrer, and the web-side click
 * is already counted per language in Umami.
 *
 * Once iOS volume comfortably clears five installs per placement, adding `lang`
 * back here is a one-line change.
 */

function campaignToken(parts: Array<string | number | undefined>): string {
  return parts.filter((part) => part !== undefined && part !== '').join('-');
}

/**
 * Builds a store link that carries where it was clicked from, so installs can be
 * attributed to a page instead of arriving as one undifferentiated bucket.
 */
export function buildStoreUrl({ platform, source, lang, variant, itemId }: StoreLinkOptions): string {
  if (platform === 'ios') {
    const params = new URLSearchParams({ mt: '8' });
    params.set('ct', campaignToken([source, variant]).slice(0, APPLE_CAMPAIGN_MAX_LENGTH));
    if (APPLE_PROVIDER_TOKEN) params.set('pt', APPLE_PROVIDER_TOKEN);
    return `${APP_STORE_URL}?${params.toString()}`;
  }

  const referrer = new URLSearchParams({
    utm_source: UTM_SOURCE,
    utm_medium: campaignToken([source, variant]),
    utm_campaign: UTM_CAMPAIGN,
  });
  if (lang) referrer.set('utm_content', lang);
  if (itemId !== undefined && itemId !== '') referrer.set('utm_term', String(itemId));

  return `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer.toString())}`;
}

/** Convenience wrapper for the common case of rendering both buttons together. */
export function buildStoreUrls(options: Omit<StoreLinkOptions, 'platform'>) {
  return {
    ios: buildStoreUrl({ ...options, platform: 'ios' }),
    android: buildStoreUrl({ ...options, platform: 'android' }),
  };
}
