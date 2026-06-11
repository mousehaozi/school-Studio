# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vue 3 administration frontend built with Vite. Application
code lives in `src/`:

- `views/` contains page-level Vue components, grouped by feature under
  `views/admin/`.
- `components/` and `layouts/` contain reusable UI and page shells.
- `api/admin/` contains feature-specific API clients; export shared endpoints
  through `api/admin/index.js`.
- `router/`, `stores/`, and `utils/` contain routing, Pinia state, and shared
  helpers.
- `style/` contains global SCSS; `static/` and `public/` contain image assets.

Production output is generated in `dist/` and must not be committed.

## Build, Test, and Development Commands

Use Node.js `^20.19.0` or `>=22.12.0`.

- `npm install`: install dependencies and configure Husky hooks.
- `npm run dev`: start Vite on port `5173`; `/api` requests proxy to the local
  backend at `127.0.0.1:8080`.
- `npm run build`: create the production bundle in `dist/`.
- `npm run preview`: serve the production bundle locally.
- `npm run lint` / `npm run lint:fix`: check or automatically fix ESLint issues.
- `npm run format:check` / `npm run format`: verify or apply Prettier formatting.

## Coding Style & Naming Conventions

Use two-space indentation, LF line endings, semicolons, double quotes, and an
80-character print width. Keep Vue SFC blocks ordered as `script`, `template`,
then `style`. Name reusable components and views in PascalCase
(`CommonCard.vue`, `ArticleManageView.vue`); name JavaScript modules in
camelCase (`articleApi.js`, `baseUrl.js`). Use the `@/` alias for imports from
`src/`. Run lint and format checks before committing; the pre-commit hook runs
lint-staged on changed files.

## Testing Guidelines

No automated test framework is currently configured. For each change, run
`npm run lint`, `npm run format:check`, and `npm run build`, then manually verify
affected routes and API workflows. If adding tests, use `*.spec.js` beside the
relevant module or under a new `src/__tests__/` directory, and add the test
command to `package.json`.

## Commit & Pull Request Guidelines

History mixes English and Chinese messages; prefer concise Conventional Commit
subjects such as `feat: add studio filters`, `fix: handle upload failure`, or
`refactor: simplify article form`. Keep commits focused. Pull requests should
describe behavior changes, list verification commands, link related issues,
and include screenshots for visible UI changes. Document any new `VITE_*`
environment variables without committing secrets.
