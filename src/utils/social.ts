/**
 * The project's own social profiles. Kept in one place because the same URLs are
 * used both as links a visitor clicks and as `sameAs` identity claims in the
 * structured data — those two must never drift apart, or search engines stop
 * connecting the profiles to the site.
 */
export const X_URL = 'https://x.com/300Fragen';
export const INSTAGRAM_URL = 'https://www.instagram.com/einbuergerungstest2026/';
/**
 * The Facebook *Page* (not the personal profile). Once a username is set in the
 * Page settings this can become the shorter vanity URL.
 */
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61593945635647';

/** Analytics keeps these as a closed set so platform reports stay comparable. */
export type SocialPlatform = 'x' | 'instagram' | 'facebook';

export interface SocialProfile {
  platform: SocialPlatform;
  /** Brand name — deliberately untranslated, it is the same in every language. */
  label: string;
  url: string;
}

export const SOCIAL_PROFILES: SocialProfile[] = [
  { platform: 'instagram', label: 'Instagram', url: INSTAGRAM_URL },
  { platform: 'facebook', label: 'Facebook', url: FACEBOOK_URL },
  { platform: 'x', label: 'X', url: X_URL },
];

export const SOCIAL_PROFILE_URLS = SOCIAL_PROFILES.map((profile) => profile.url);
