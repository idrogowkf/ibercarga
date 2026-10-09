# Changelog

## Organic growth audit — 2026-10-09

### Evidence reviewed

- Search Console performance, coverage, sitemap state and a live Googlebot inspection of `/transporte-especial`.
- Direct production crawl of all 34 canonical routes, the 404 surface, robots, sitemap and host variants.
- Mobile Lighthouse baselines for the Home and primary commercial landing.
- Search-result and page-structure comparison with Grupo SGT, TRACAP Aragón, Transvolando and Transportes Carballo.

### Corrected

- `src/seo/schema.js`, `src/seo/Seo.jsx` and `src/seo/document.mjs` now agree on Organization authorship for technical guides and no longer publish a hidden Person entity that is absent from visible guide content.
- `src/components/FloatingActions.jsx` keeps local form scrolling on Home/service pages and routes guide-page quote actions to the real ES or EN Home form.
- Home gallery, guide-card and technical-centre images now use their existing WebP derivatives without changing composition or layout.
- Approved Inter and Barlow Condensed faces are self-hosted under `public/fonts/`, eliminating the blocking Google Fonts stylesheet without changing typography.
- The duplicate direct Google Ads bootstrap was removed from `index.html`; the existing GTM container remains the single measurement bootstrap and continues to load the configured Ads destination.
- Price-label contrast and footer tap-target spacing now meet the Lighthouse accessibility checks without altering the V12 component structure.
- `vercel.json` adds explicit sitemap/robots content types and conservative browser security headers.
- `scripts/audit-build.mjs` now rejects mismatched document language, title, description, self-hreflang, Open Graph URL, hidden guide Person schema and duplicate titles/descriptions.

### Verification

- 72 automated tests pass.
- Build prerenders 36 routes and audits 34 unique canonical/indexable documents.
- Local mobile Lighthouse: Home 79/100 Performance and 100/100 Accessibility, Best Practices and SEO; `/transporte-especial` 82/100 Performance and 100/100 in the other three categories.
- `api/send-quote.js`, the quote payload and `POST /api/send-quote` were not modified.

## Search growth foundation — 2026-10-08

### Created

- `src/seo/routeCatalog.mjs` — separates renderable legacy routes from the canonical indexable catalogue.
- `src/seo/document.mjs` — generates complete route-specific metadata, hreflang and JSON-LD in initial HTML.
- `src/entry-server.jsx` and `scripts/prerender.mjs` — render the shared React route tree at build time and write clean-URL HTML files.
- `scripts/audit-build.mjs` — fails release builds when routes, canonicals, descriptions, H1s, schemas or sitemap entries diverge.
- `src/analytics/events.js` — emits privacy-safe conversion events without form or personal data.
- Regression tests for prerendering, build auditing, server metadata and analytics privacy.
- Legacy favicon aliases `public/favicon-16.png` and `public/favicon-32.png` for historic crawler requests.
- Optimized WebP variants for all hero/gallery sources; route heroes now preload and render the lighter asset without changing crop or layout.
- Detailed design and execution plan under `docs/superpowers/`.

### Modified

- `src/App.jsx` and `src/index.jsx` — share the route tree between browser and server rendering, hydrate prerendered markup and stop client-side Home redirects for unknown paths.
- `package.json` — builds client and SSR bundles, prerenders all routes and runs the release audit.
- `vercel.json` — removes the SPA catch-all that caused duplicate initial HTML/soft 404s and adds a path-preserving canonical-host redirect.
- `scripts/generate-sitemap.mjs` and `public/sitemap.xml` — publish only canonical indexable routes; legacy author profiles are excluded.
- `src/data/services.mjs`, `src/components/Hero.jsx` and `src/components/QuoteForm.jsx` — replace the brand-only Home H1 and instant-price promise with an accurate technical-review proposition while preserving the form endpoint and payload.
- `src/components/Header.jsx`, `src/components/Footer.jsx` and `src/components/FloatingActions.jsx` — add privacy-safe CTA/contact measurement; the footer phone number is now callable.
- `src/index.css` — supports semantic hero media and the compact technical-review proof strip in the existing V12 visual language.
- Related tests now protect ES/EN copy, direct contact, LCP image attributes, route output and Vercel behavior.

### Delivery notes

- `api/send-quote.js` and the `/api/send-quote` payload were not changed.
- Build output contains 36 directly renderable routes, of which 34 are canonical/indexable; the two legacy author routes are reachable with `noindex,follow`.
- `www.ibercarga.com` was added to the Vercel project so the platform can issue TLS and apply the single canonical redirect.

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
