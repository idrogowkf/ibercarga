# Ibercarga Search Growth Foundation — Design Specification

## Objective

Convert the current client-rendered V12 platform into a crawlable, technically authoritative and measurable acquisition platform without changing the `/api/send-quote` contract or inventing commercial proof. The initial HTTP response of every indexable route must contain that route's real content and SEO signals, while the hydrated React application preserves the approved interaction model.

## Binding evidence

- Search Console (8 October 2026): 22 clicks, 238 impressions, one indexed URL, no submitted sitemap and commercial landings unknown to Google.
- Crawl statistics: only 59% successful responses, 13% 404s and repeated connectivity failures on `www.ibercarga.com`.
- Production response audit: all sitemap routes initially return the Home title, description and canonical; route-specific values appear only after JavaScript executes.
- Lighthouse mobile: Home performance 63 with LCP 10.9 s; `/transporte-especial` performance 71 with LCP 10.3 s.

## Architecture

Keep React 18, React Router, Vite, Tailwind and the existing serverless quote endpoint. Extract the route tree so it can render under `BrowserRouter` in the browser and `StaticRouter` at build time. After the client build, run an SSR build and a deterministic prerender script that writes one extensionless-compatible HTML file per indexable route. Each document contains the correct language, title, description, canonical, hreflang, Open Graph, Twitter cards, JSON-LD and rendered body before JavaScript.

Vercel serves generated route files directly. The catch-all SPA rewrite is removed so unknown URLs return a genuine 404. Only explicit legacy/domain redirects are allowed. The `www` host must redirect once to the apex host while preserving path and query; its certificate/DNS state must be verified after deployment.

## Search architecture

The route catalogue remains the source of truth. Indexable routes are Home, commercial services, guide hubs and substantive technical guides. Legacy author pages remain reachable for compatibility but are `noindex` and excluded from the sitemap. Hreflang is emitted only when a real alternate exists. Sitemap entries are generated from the indexable catalogue with a build date and identical ES/EN clusters.

The three English concepts `special transport`, `oversized-load transport` and `heavy haul` remain separate only where their copy and intent are demonstrably distinct. Each service page links to related commercial services and technical guides. No new unsupported claims, clients, certifications, fleet ownership, projects or testimonials are introduced.

## Conversion design

The Home hero states the service and territory rather than using the brand alone as H1. The primary promise is a technical review, not an instant final price. The existing form fields, payload and endpoint remain unchanged. CTA labels describe the real outcome: request a technical review/quote. A concise proof/process strip explains what the visitor receives, the data used and direct contact options. Indicative prices remain labelled as planning scenarios and are visually subordinate to the technical value proposition.

## Performance and accessibility

Above-the-fold hero imagery is represented by a responsive image element with explicit dimensions, eager loading and high fetch priority. Below-the-fold imagery remains lazy. The build preloads only the route hero asset. Motion respects `prefers-reduced-motion`. Existing keyboard labels, breadcrumbs and semantic headings are preserved; every page has exactly one H1.

## Measurement

Add a small dependency-free event utility that pushes structured events to `dataLayer` when available. Measure quote form start, submit success, submit error, phone clicks, email clicks, WhatsApp clicks and service/guide CTA clicks. Events contain language and route but no personal or form field data.

## Error handling and delivery

Prerendering fails the build for duplicate routes, missing page data, duplicate canonicals, missing H1, missing metadata or output collisions. Production verification checks route status, initial HTML, canonicals, hreflang, schema parseability, sitemap parity, assets, redirects, unknown-route 404, form endpoint availability and Lighthouse. Deployment is staged, tested, promoted, then checked on the apex domain. Search Console sitemap submission follows only after the production sitemap returns 200.

## Success criteria

- Every indexable route returns HTTP 200 with unique route-specific SEO and visible H1 in the initial HTML.
- Unknown paths return HTTP 404; canonical host variants redirect once to `https://ibercarga.com`.
- Sitemap contains every and only indexable canonical route.
- `/api/send-quote` and its payload remain unchanged and the production form flow still succeeds.
- Automated tests and `npm run build` pass.
- Mobile Lighthouse improves materially with no regression in accessibility, best practices or SEO.
- Production deployment is READY and the Home plus representative ES/EN landings pass post-deploy checks.
