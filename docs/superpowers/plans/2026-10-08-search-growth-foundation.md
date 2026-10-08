# Ibercarga Search Growth Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver route-specific crawlable HTML, coherent search architecture, clearer technical conversion, measurable interactions and verified production deployment.

**Architecture:** Reuse the existing route catalogue and React pages through a shared route tree rendered by BrowserRouter at runtime and StaticRouter during a post-build prerender. Generated HTML files become the deployable route surface; Vercel serves them directly and returns real 404s for unknown routes.

**Tech Stack:** React 18, React Router 6, Vite 5, Vitest, Node.js 22, Vercel.

**Spec:** `docs/superpowers/specs/2026-10-08-search-growth-foundation-design.md`

## Global Constraints

- Work only on `platform-v3`; never modify `main`.
- Preserve React, Vite, Tailwind, the V12 design language and all existing routes.
- Preserve `POST /api/send-quote`, its payload and serverless implementation.
- Do not invent clients, projects, certifications, fleet ownership, testimonials or case studies.
- Do not commit `.env.local`, `.vercel`, `.vs`, temporary files or `Microsoft.Services.Store.winmd`.
- Deployment occurs only after a clean test/build/route audit.

## Review Focus

- Direct requests to nested ES and EN routes must return route-specific HTML and HTTP 200.
- Unknown paths must return 404 instead of a Home soft-404.
- Routes without a true translation must not emit a false reciprocal hreflang.
- Hydration must preserve the form, menus and floating actions without mismatch errors.
- Analytics must never include personal/form data.

---

### Task 1: Indexable route catalogue and SEO document generator

**Files:**
- Create: `src/seo/routeCatalog.mjs`
- Create: `src/seo/document.mjs`
- Test: `src/seo/document.test.js`
- Modify: `scripts/generate-sitemap.mjs`
- Modify: `scripts/generate-sitemap.test.js`

**Interfaces:**
- Produces: `indexableRoutes`, `findPageByPath(path)`, `buildSeoDocument(page, bodyHtml)`.

- [ ] Write failing tests for indexable exclusions, canonical uniqueness, complete metadata, hreflang and parseable JSON-LD.
- [ ] Run targeted tests and confirm the expected failures.
- [ ] Implement the catalogue and document generator.
- [ ] Make sitemap generation consume `indexableRoutes`.
- [ ] Run targeted and full tests.

### Task 2: Shared client/server route tree and deterministic prerender

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/index.jsx`
- Create: `src/entry-server.jsx`
- Create: `scripts/prerender.mjs`
- Test: `scripts/prerender.test.js`
- Modify: `package.json`

**Interfaces:**
- Consumes: `indexableRoutes`, `findPageByPath`, `buildSeoDocument`.
- Produces: one built HTML file per indexable route and hydratable markup.

- [ ] Write failing tests that require route-specific output files, unique initial titles/canonicals/H1s and hydration-safe markup.
- [ ] Run tests and confirm missing prerender behavior.
- [ ] Extract `SiteRoutes`, add the SSR entry and hydrate existing markup.
- [ ] Implement prerender and wire it after client and SSR builds.
- [ ] Run targeted tests, full tests and a clean build.

### Task 3: Real HTTP routing, redirects and resource compatibility

**Files:**
- Modify: `vercel.json`
- Modify: `vercel.test.js`
- Create: `public/favicon-16.png`
- Create: `public/favicon-32.png`

**Interfaces:**
- Produces: direct static route delivery, real 404s and legacy favicon aliases.

- [ ] Write failing configuration tests for no catch-all rewrite, canonical `www` redirect and immutable assets.
- [ ] Confirm tests fail on the existing rewrite.
- [ ] Replace the catch-all with explicit redirects/headers and add favicon aliases.
- [ ] Run tests and build; serve the output and verify 200/404 behavior.

### Task 4: Search-led Home conversion and technical trust

**Files:**
- Modify: `src/data/services.mjs`
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/CTA.jsx`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/index.css`
- Modify: `src/pages/pages.test.jsx`

**Interfaces:**
- Produces: service-led H1, accurate technical-review promise and an explicit deliverables strip while preserving the form contract.

- [ ] Write failing ES/EN tests for the new H1, honest CTA language, direct contact and trust/deliverable copy.
- [ ] Confirm failures.
- [ ] Implement the minimal copy/layout changes inside existing V12 components.
- [ ] Run accessibility-oriented component tests and the full suite.

### Task 5: Privacy-safe conversion measurement

**Files:**
- Create: `src/analytics/events.js`
- Create: `src/analytics/events.test.js`
- Modify: `src/components/QuoteForm.jsx`
- Modify: `src/components/FloatingActions.jsx`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Footer.jsx`

**Interfaces:**
- Produces: `trackEvent(name, attributes)` and named dataLayer events without PII.

- [ ] Write failing tests for event names, route/language context and PII rejection.
- [ ] Confirm failures.
- [ ] Implement the utility and connect existing interactions without changing endpoint or payload.
- [ ] Run targeted interaction tests and full suite.

### Task 6: Performance and media delivery

**Files:**
- Modify: `src/components/Hero.jsx`
- Modify: `src/index.css`
- Modify: gallery assets under `public/gallery/` and `public/hero/` only if lossless visual parity is retained.
- Test: `src/components/components.test.jsx`

**Interfaces:**
- Produces: explicit responsive hero media, high-priority LCP fetch and lazy below-fold media.

- [ ] Write failing tests for eager/high-priority hero and lazy gallery/guide images.
- [ ] Confirm failures.
- [ ] Implement semantic hero image delivery and route-specific preload output.
- [ ] Run tests, build and Lighthouse against Home and `/transporte-especial`.

### Task 7: Release audit and production deployment

**Files:**
- Create: `scripts/audit-build.mjs`
- Create: `scripts/audit-build.test.js`
- Modify: `package.json`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: built route catalogue and generated output.
- Produces: automated build audit and release evidence.

- [ ] Write failing audit tests for status surface, initial metadata, schema, sitemap parity and unknown routes.
- [ ] Implement the build audit and include it in verification.
- [ ] Run `npm test`, clean `npm run build`, local HTTP route audit and Lighthouse.
- [ ] Review the complete diff, commit intentional files and push `platform-v3`.
- [ ] Create a staged production deployment, verify it, promote it and check production Home, ES/EN landings, sitemap, redirects, 404 and API availability.
- [ ] Submit the production sitemap in Search Console and record deployment/verification results in `CHANGELOG.md`.
