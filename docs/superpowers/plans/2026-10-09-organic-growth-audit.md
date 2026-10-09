# Ibercarga Organic Growth Audit Implementation Plan

**Goal:** Correct the post-release technical discovery, canonicalization, conversion and performance defects proven by the 9 October audit.

**Spec:** `docs/superpowers/specs/2026-10-09-organic-growth-audit-design.md`

## Task 1: Schema and build-audit consistency

**Files:** `src/seo/schema.js`, `src/seo/Seo.jsx`, `src/seo/document.mjs`, SEO/build tests.

- Add failing tests for Organization-authored guides, reciprocal hreflang, unique titles/descriptions and sitemap parity.
- Remove runtime-only hidden Person schema and align client/prerender output.
- Expand the build audit and make the targeted tests pass.

## Task 2: Global conversion continuity

**Files:** `src/components/FloatingActions.jsx`, component tests.

- Add a failing test proving the floating quote action on a guide reaches the language Home form.
- Resolve the current route through the shared catalogue and preserve local scrolling where a form exists.
- Verify ES and EN behavior.

## Task 3: Performance and accessibility

**Files:** `src/index.css`, `index.html`, shared media components, local font assets, component tests.

- Add failing assertions for WebP card delivery and non-duplicated measurement bootstrap.
- Self-host the approved font families, use existing WebP media and remove the duplicate Ads loader.
- Correct price-label contrast and footer target size without changing layout structure.
- Re-run tests, build and Lighthouse.

## Task 4: Host, headers and production verification

**Files:** `vercel.json`, `vercel.test.js`, audit documentation.

- Add failing tests for security/resource headers.
- Configure the Vercel project domain so `www` redirects permanently to the apex host.
- Run the full suite and build, crawl all sitemap routes, deploy, verify production and record the release evidence.

