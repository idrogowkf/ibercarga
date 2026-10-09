# Ibercarga Organic Growth Audit — Design Specification

## Objective

Close the measurable technical, discovery, conversion and performance gaps found after the 8 October SEO foundation release, without changing the approved V12 visual language, the quote payload or `POST /api/send-quote`. This release improves verifiable search signals; it does not claim or guarantee rankings, leads or a fixed three-month outcome.

## Evidence baseline

- Search Console, 9 October 2026: 22 clicks, 234 impressions, 9.4% CTR and average position 11.2 for the previous three-month window. Only the Home has performance data.
- Search Console coverage, last updated 4 October: one indexed URL and three redirected URLs. The newly published service routes are not represented in that historical coverage snapshot.
- Live URL inspection: `/transporte-especial` is available to Google, indexable and exposes one valid breadcrumb, but the index reports the URL as unknown with no referring sitemap or page.
- Submitted sitemap: `https://ibercarga.com/sitemap.xml` is recorded as “couldn't fetch” with zero discovered pages, despite current public checks returning valid XML, HTTP 200 and identical responses to Googlebot.
- Host audit: `https://www.ibercarga.com/` returns a duplicate HTTP 200 instead of redirecting to the canonical apex host.
- Production crawl: all 34 sitemap URLs return HTTP 200, the correct language and a matching canonical; unknown URLs return HTTP 404.
- Lighthouse mobile baseline on Home: Performance 55, Accessibility 92, Best Practices 100, SEO 100; LCP 8.0 s. Main findings are a blocking Google Fonts import, duplicate Google Ads bootstrap, oversized JPG delivery, low-contrast price labels and undersized footer targets.
- Competitors rank with strong entity proof, concrete operational capabilities, service-area depth and project evidence. Ibercarga must not imitate unsupported proof: no clients, fleet, certifications, reviews or projects may be invented.

## Corrections

1. Canonical host consolidation is enforced at Vercel's project-domain layer and retained as repository defence in depth. Paths and query strings must be preserved.
2. Runtime and prerendered structured data must agree. Technical guides use Ibercarga Organization as author/publisher; hidden Person promotion is removed because the author is not visible on the guide.
3. Global quote actions must always reach a real `#presupuesto` target. Service/Home routes keep local scrolling; guide and compatibility routes point to the language Home form.
4. V12 typography is self-hosted from the same font families and weights, removing the blocking external stylesheet without changing appearance. The directly embedded Ads bootstrap is removed because the active GTM container already loads the same Ads destination.
5. Existing WebP derivatives are used for visible cards and technical-centre media. No crops, compositions or design values change.
6. Price labels meet WCAG AA contrast and footer links meet the 24 px target-size guidance with spacing rather than structural redesign.
7. Vercel adds standard non-breaking security headers and explicit XML/text content types for sitemap and robots resources.
8. Automated build audit expands to validate hreflang reciprocity, robots/sitemap parity, schema visibility rules and unique metadata.

## Success criteria

- Tests and production build pass.
- Every sitemap route remains HTTP 200 with unique canonical, one H1, parseable JSON-LD and correct language.
- `www` redirects permanently to the apex domain.
- Guide schemas contain no hidden Person entity or author promotion.
- Floating quote action reaches a form from every route.
- Home Lighthouse improves materially from the recorded baseline without SEO, accessibility, best-practice or visual regressions.
- Search Console live inspection continues to report the representative landing as indexable. Sitemap resubmission is performed only through an authorized Search Console action; indexing itself remains Google's decision.

