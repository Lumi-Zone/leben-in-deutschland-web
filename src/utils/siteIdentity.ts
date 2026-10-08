export const SITE_ORIGIN = 'https://lid-einbuergerung.de';

export const ORGANIZATION_ENTITY_ID = `${SITE_ORIGIN}/de/#organization`;
export const WEBSITE_ENTITY_ID = `${SITE_ORIGIN}/de/#website`;
export const MOBILE_APP_ENTITY_ID = `${SITE_ORIGIN}/de/app/#mobile-app`;

export const APP_IDENTITY = {
  canonicalName: 'Leben in Deutschland 2026 LiD',
  alternateNames: [
    'Leben in Deutschland 310 Fragen',
    'Leben in Deutschland 2026',
    'Einbuergerungstest App',
    'Einbürgerungstest App',
    'Leben in Deutschland Test App',
  ],
  ios: {
    appId: '6723899981',
    bundleId: 'org.reactjs.native.example.Einbuergerung',
    storeName: 'Leben in Deutschland 2026 LiD',
    url: 'https://apps.apple.com/app/leben-in-deutschland-2026-lid/id6723899981',
  },
  android: {
    packageId: 'com.einbuergerungapp',
    storeName: 'Leben in Deutschland 2026',
    url: 'https://play.google.com/store/apps/details?id=com.einbuergerungapp',
  },
} as const;

