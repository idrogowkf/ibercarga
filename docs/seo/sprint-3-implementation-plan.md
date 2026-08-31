# Sprint 3 SEO Cluster Implementation Plan

**Goal:** Implement the ten approved bilingual SEO clusters on `platform-v3` without changing V12, the quote form, API or global contact actions.

**Architecture:** Keep `services.mjs` as the route/content catalogue, render all landings through `ServicePage`, and derive canonical, hreflang, schema and sitemap from the same records. Preserve `/en/heavy-haul` as a differentiated legacy page and pair `/transporte-sobredimensionado` with `/en/oversized-load-transport`.

## Sprint 3.1

- Add failing catalogue, routing, SEO and sitemap tests for the two pillar pairs.
- Expand both pairs with distinct technical content and contextual links.
- Verify tests/build and commit `feat(seo): build special transport pillar pages`.

## Sprint 3.2

- Add failing tests for transformer, heavy machinery and steel-structure pairs.
- Add ES/EN records and differentiated technical content.
- Verify tests/build and commit `feat(seo): add high-value cargo landing pages`.

## Sprint 3.3

- Add failing tests for industrial, precast and wind pairs.
- Complete bilingual records and cluster links.
- Verify tests/build and commit `feat(seo): complete industrial and energy transport cluster`.

## Sprint 3.4

- Add failing tests for route-survey and permits pairs plus the complete catalogue.
- Complete technical-authority content and production decision document.
- Regenerate sitemap, verify HTTP routes, browser console and responsive overflow.
- Commit `feat(seo): add route survey and permits authority pages`.

## Global verification

- `npm test` and `npm run build` after every sprint.
- One H1, unique title/description, reciprocal alternates for each approved pair.
- Visible FAQ matches FAQPage schema; Service and BreadcrumbList schemas remain present.
- `/api/send-quote`, `QuoteForm.jsx`, WhatsApp and floating actions remain unchanged.
- No Project Cargo, geographic, steel-only or component-fragment landings.
