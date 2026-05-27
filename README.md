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
