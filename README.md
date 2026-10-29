# Leben in Deutschland Web

Astro site for the Leben in Deutschland / Einbuergerungstest web experience.

## Analytics

The site is configured with Umami Analytics.

Default tracking configuration:

```sh
PUBLIC_UMAMI_WEBSITE_ID=44695de0-fce5-49b9-b5f4-61767b8568df
PUBLIC_UMAMI_DOMAINS=lid-einbuergerung.de
```

These can be overridden in GitHub via `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`.
`PUBLIC_UMAMI_SCRIPT_URL` is also optional and defaults to `https://cloud.umami.is/script.js`.

For local testing, copy `.env.example` to `.env` and fill in `PUBLIC_UMAMI_WEBSITE_ID`.

### Event budget (Umami Free)

The account has a 100,000-unit monthly allowance. Pageviews, custom events, and
each saved custom event property consume that allowance; see
[Umami's usage definition](https://umami.is/pricing). Keep the production-domain
restriction during local QA so previews do not use the live budget.

- Keep removed `question-next-click`, `question-prev-click`, and `question-jump`
  tracking disabled. Do not add a CTA impression event to every question page.
- `practice-app-click` means intent to open the app. It sends only `platform`;
  language and question id are already in the tracked page URL.
- `app-store-click` / `play-store-click` mean store navigation attempts. Question
  pages send these only when opening the store or using the store fallback, with
  `location=question-page`. A successful app handoff does not send a store click.
- `smart-banner-shown` is optional and limited to one per tab/platform/context per
  30 minutes, when the tracker and session storage are available. Banner clicks
  keep their existing store-click events. This is not an exact CTA-view funnel.
- Store review links use the existing store-click event and campaign helper.
  Apple campaign tokens, including arrival prefixes, fit 30 characters.

For a question CTA, the intent costs 2 units (event + platform). A store fallback
costs another 2 (store-click + location): at most 4 per click through that path,
versus 5 for the previous intent alone. Pageviews and other actions are additional.
This reduces usage but cannot guarantee an account-wide monthly limit as traffic
grows. Check account usage weekly; use an 80,000-unit review threshold for headroom.
There is no new monitoring automation or silent sampling of pageviews.

Run `npm run growth:test` for handoff, fallback, campaign and banner-budget checks.
It is also included in the postbuild checks.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
