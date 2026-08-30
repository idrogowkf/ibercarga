# Changelog

## Sprint 2 — SEO platform foundation

### Created

- `src/components/Hero.jsx` — extracts the approved V12 hero without changing its home presentation and allows unique landing headings.
- `src/components/CTA.jsx` — extracts the approved V12 quote section and reuses the original form.
- `src/seo/meta.js` — builds title, description, Open Graph and Twitter Card values.
- `src/seo/canonical.js` — normalizes paths and produces absolute canonical URLs.
- `src/seo/hreflang.js` — produces reciprocal ES/EN and `x-default` alternates where real equivalents exist.
- `src/data/services.mjs` — provides the browser/Node-compatible single source for home metadata, 11 service landings, FAQs, translations and thematic relationships.
- `scripts/generate-sitemap.mjs` — imports the real route catalogue and generates `public/sitemap.xml` before every build, including self-referencing ES/EN/`x-default` clusters.
- `src/data/services.test.js` — protects route completeness, unique content, language pairs and related links.
- `src/seo/seo.test.jsx` — protects canonical, hreflang, social metadata and JSON-LD output.
- `src/components/components.test.jsx` — protects the V12 component contract and the `/api/send-quote` request payload.
- `src/pages/pages.test.jsx` — protects the V12 home section order and the reusable landing structure.
- `scripts/generate-sitemap.test.js` — protects sitemap completeness and prevents obsolete URLs.
- `src/test/setup.js` — centralizes Testing Library cleanup and DOM matchers.
- `docs/superpowers/specs/2026-08-30-sprint-2-seo-platform-design.md` — records the approved architecture and non-negotiable constraints.
- `docs/superpowers/plans/2026-08-30-sprint-2-seo-platform.md` — records the test-driven implementation and verification plan.

### Modified

- `src/App.jsx` — now only orchestrates `BrowserRouter` and explicit home/service routes.
- `src/components/Header.jsx` — restores the V12 header and makes its anchors safe from landing routes.
- `src/components/QuoteForm.jsx` — preserves the exact V12 fields, visual classes and `/api/send-quote` POST contract while adding accessible labels and English presentation copy.
- `src/components/Footer.jsx` — restores the V12 footer and provides route-safe bilingual links.
- `src/components/ServiceCards.jsx` — renders contextual internal links shared by every landing.
- `src/components/Alert.jsx` — restores the V12 alert presentation while retaining status semantics.
- `src/pages/HomePage.jsx` — composes every V12 section in its original order from shared components.
- `src/pages/ServicePage.jsx` — becomes the common bilingual landing template with breadcrumb, unique sections, FAQ, related links, CTA and form.
- `src/data/services.js` — keeps the requested stable import path as a compatibility re-export of the shared catalogue.
- `src/seo/Seo.jsx` — manages dynamic document metadata, one canonical, hreflang links and JSON-LD lifecycle.
- `src/seo/schema.js` — builds Organization, Service, FAQPage and BreadcrumbList structured data.
- `package.json` — adds test commands, sitemap generation and automatic prebuild generation.
- `package-lock.json` — locks the test toolchain and refreshed Browserslist data.
- `.gitignore` — excludes the local npm cache used by the restricted build environment.
- `public/robots.txt` — keeps crawler access open and points to the generated sitemap.
- `public/sitemap.xml` — is now generated from the central route catalogue with all current canonical URLs.
- `vercel.json` — preserves API-safe SPA rewrites, enables clean URLs and retains immutable asset caching.

### Intentionally unchanged

- `api/send-quote.js` — the production quote endpoint and email delivery logic were not modified.
- `src/index.css`, `tailwind.config.js`, `postcss.config.js` — the approved Tailwind visual foundation remains unchanged.
- `index.html` — analytics, Google Tag Manager and initial metadata remain in place; React updates route metadata at runtime.
- `main` — no checkout, commit, merge or push was performed on the main branch.
