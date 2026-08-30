# Sprint 2 SEO Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the V12-preserving bilingual SEO platform and all requested transport landing pages on `platform-v3`.

**Architecture:** Explicit React Router routes consume a central service catalogue. Shared V12 components render home and landing pages, while small SEO utilities own metadata, URLs and JSON-LD; the sitemap is generated from the same catalogue.

**Tech Stack:** React 18, React Router 6, Vite 5, Tailwind CSS 3, Vitest, jsdom, Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-30-sprint-2-seo-platform-design.md`

## Global Constraints

- Work only on `platform-v3`; never merge or push.
- Home V12 at commit `931bb03` is the absolute visual reference.
- Do not modify `api/send-quote.js`; the form POST target remains `/api/send-quote`.
- Preserve all existing functionality, analytics and Tailwind/React/Vite.
- Use common components, unique SEO content and bilingual-ready data.
- Create one final commit named `feat: Sprint 2 - SEO platform foundation`.
- Exclude `.vs`, temporary files and unrelated untracked files.

---

### Task 1: Test harness and route catalogue

**Files:** Create `src/test/setup.js`, `src/data/services.test.js`, `src/data/services.mjs`; modify `package.json`, `src/data/services.js`. Vitest uses its CLI `--environment jsdom` option so the existing Vite defaults remain untouched.

**Interfaces:** Produce `homePages`, `services`, `serviceRoutes`, `siteRoutes`, `findServiceByPath(pathname)`, and `getRelatedServices(service)`.

- [ ] Add Vitest/jsdom/Testing Library dependencies and test scripts.
- [ ] Write tests for the exact routes, unique metadata/H1s, valid related routes and bilingual equivalence.
- [ ] Run tests and observe the expected incomplete-catalogue failure.
- [ ] Implement unique, substantive landing data and rerun until green.

### Task 2: SEO utility layer

**Files:** Create `src/seo/meta.js`, `canonical.js`, `hreflang.js`, `seo.test.jsx`; modify `schema.js`, `Seo.jsx`.

**Interfaces:** Produce `buildCanonical`, `buildHreflang`, `buildMeta`, schema builders and `<Seo page />`.

- [ ] Write failing tests with literal canonical URLs, reciprocal hreflang, metadata and required schema types.
- [ ] Implement normalized URLs, metadata, alternates and schema builders.
- [ ] Add a DOM test for canonical, OG, Twitter, hreflang and JSON-LD lifecycle.
- [ ] Run SEO tests until green.

### Task 3: Preserve V12 as shared components

**Files:** Modify `Header.jsx`, `QuoteForm.jsx`, `ServiceCards.jsx`, `Footer.jsx`; create `Hero.jsx`, `CTA.jsx`, `components.test.jsx`.

**Interfaces:** Shared V12 components accept route-safe links and optional landing content while retaining exact home defaults.

- [ ] Write failing render tests for V12 home labels and shared behavior.
- [ ] Write a failing realistic form test expecting POST `/api/send-quote` with original fields.
- [ ] Extract V12 markup and Tailwind classes into the six required components.
- [ ] Preserve success/error behavior and run tests until green.

### Task 4: Page composition and explicit router

**Files:** Modify `src/App.jsx`, `HomePage.jsx`, `ServicePage.jsx`; create `pages.test.jsx`.

**Interfaces:** Consume `siteRoutes`, shared components and `<Seo page />`; produce V12 home and all reusable landings.

- [ ] Write failing integration tests for V12 section order and each landing's H1, breadcrumb, FAQ, form and related links.
- [ ] Rebuild HomePage from V12 components and legacy sections.
- [ ] Implement ServicePage and explicit route registration.
- [ ] Run page tests and full suite until green.

### Task 5: Generated discovery/configuration files

**Files:** Create `scripts/generate-sitemap.mjs`, `scripts/generate-sitemap.test.js`; modify `package.json`, `public/robots.txt`, `public/sitemap.xml`, `vercel.json`.

**Interfaces:** Consume the route catalogue and generate deterministic XML containing every canonical route exactly once.

- [ ] Write a failing generator test for all requested URLs and no obsolete URLs.
- [ ] Implement the generator and attach it to `prebuild`.
- [ ] Update robots and Vercel rewrites without intercepting `/api/*`.
- [ ] Run generator and full tests until green.

### Task 6: Documentation, verification and sole commit

**Files:** Create `CHANGELOG.md`; modify `.gitignore` only if needed.

- [ ] Run `npm install`, full tests and `npm run build`.
- [ ] Inspect the complete diff, compare Home against V12 and prove `api/send-quote.js` has no diff.
- [ ] Write `CHANGELOG.md` with every created/modified project file and reason.
- [ ] Re-run all tests and build after finalization.
- [ ] Stage only intentional files and exclude `.vs`, temporaries and `Microsoft.Services.Store.winmd`.
- [ ] Create the sole commit `feat: Sprint 2 - SEO platform foundation`.
- [ ] Verify branch, commit, tracked status, and that no push or merge occurred.
