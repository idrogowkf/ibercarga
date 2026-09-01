# Sprint 4 Technical Guides Implementation Plan

**Goal:** Add a bilingual, evergreen technical-guides centre that strengthens authority and sends qualified users to the existing quote flow.

**Architecture:** A data catalogue in `src/data/guides.mjs` supplies reusable index, article and author pages. `App.jsx` maps catalogue routes, `Seo.jsx` selects schema by page type, and the sitemap consumes service and guide catalogues without duplicate canonicals.

## Commit 1 — Architecture

- Add failing route and SEO-type tests.
- Create guide/author data contracts and reusable pages/components.
- Register index and author routes.
- Extend SEO schema selection for guide indexes, articles and authors.
- Verify tests and build.

## Commit 2 — Expert guide cluster

- Add failing tests for all eight article routes, author/date/source visibility and schemas.
- Add four Spanish and four natural-English guides.
- Add verified official-source records with review dates.
- Include guide routes in sitemap and verify reciprocal hreflang.
- Verify tests and build.

## Commit 3 — Navigation and conversion

- Add failing tests for Header, Footer and Home card mappings.
- Link the guides centre from shared navigation.
- Make the six Home cargo cards accessible links and remove case-study framing.
- Replace unverified testimonial/project copy while preserving V12 composition.
- Verify tests, build, HTTP matrix, browser console and 390 px overflow.

## Protected behaviour

`api/send-quote.js`, `QuoteForm.jsx`, payload field names, `/api/send-quote`, Resend, WhatsApp and floating actions remain unchanged.
