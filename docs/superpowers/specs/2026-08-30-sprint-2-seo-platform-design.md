# Sprint 2 SEO Platform Design

## Objective

Turn the approved Ibercarga V12 home into the shared visual and functional base for a bilingual European special-transport SEO platform. Work only on `platform-v3`, preserve `/api/send-quote`, and deliver one final commit without merge or push.

## Non-negotiable baseline

- Commit `931bb03` is the visual reference for Home V12.
- Home section order, Tailwind classes, copy, anchors, imagery, responsive behavior, and quote-form fields remain visually unchanged.
- The quote form continues to POST JSON to `/api/send-quote`; `api/send-quote.js` is not changed.
- React 18, Vite 5, Tailwind 3, GTM and Google Ads remain in place.
- Existing unrelated files and Visual Studio files are excluded.

## Architecture

`App.jsx` contains only `BrowserRouter` and explicit routes. `HomePage` composes the V12 components. `ServicePage` is a shared landing template driven entirely by `src/data/services.js`; it reuses the header, V12 visual vocabulary, related-service cards, CTA, quote form and footer.

The route catalogue is exported from `services.js` and is the single source for React routes, internal links, hreflang pairs and sitemap generation. A Node script consumes that catalogue and writes `public/sitemap.xml` during `prebuild`.

## Components

- `Header.jsx`: exact V12 header presentation, with route-aware home links.
- `Hero.jsx`: exact V12 home hero; accepts optional landing copy without altering the home defaults.
- `QuoteForm.jsx`: exact V12 form fields, appearance, messages and `/api/send-quote` request.
- `ServiceCards.jsx`: related landing links with unique summaries and existing gallery imagery.
- `CTA.jsx`: shared V12-style quote section wrapper.
- `Footer.jsx`: exact V12 footer presentation with route-safe links.
- `HomePage.jsx`: reconstructs every V12 section in its original order.
- `ServicePage.jsx`: renders breadcrumb, unique H1/content/FAQ, contextual internal links, CTA and form.

## Routes

Spanish: `/`, `/transporte-especial`, `/transporte-sobredimensionado`, `/transporte-transformadores`, `/transporte-prefabricados`, `/transporte-industrial`, `/transporte-eolico`, `/gestion-permisos`, `/coches-piloto`, `/estudio-ruta`.

English: `/en/special-transport`, `/en/heavy-haul`.

Trailing-slash variants are normalized by Vercel and canonical URLs use one stable trailing-slash convention. Unknown routes redirect to `/`.

## Content model

Every landing has unique search intent, title, description, H1, introductory copy, operational detail, FAQ and related services. Spanish pages link to contextually adjacent Spanish topics. English pages link to one another. Only genuine ES/EN equivalents emit reciprocal hreflang; pages without a translated equivalent emit their own language plus `x-default`.

## SEO

- `meta.js`: page title, description, Open Graph and Twitter values.
- `canonical.js`: absolute normalized canonical URL generation.
- `hreflang.js`: alternate URL generation without false translations.
- `schema.js`: Organization, Service, FAQPage and BreadcrumbList builders.
- `Seo.jsx`: manages document title, meta/link elements and JSON-LD lifecycle.

Every indexable page receives canonical, hreflang, Open Graph, Twitter Cards, Organization, Service, FAQ and Breadcrumb schemas. Home is modeled as the umbrella special-transport service so it satisfies the same schema contract.

## Quality and verification

Vitest, jsdom and Testing Library cover route data, SEO URL/schema behavior, document-head output, shared page rendering and the quote request contract. Accessibility uses semantic headings, breadcrumb navigation, labeled controls, useful alternative text, keyboard-operable details and visible focus behavior. Images keep lazy loading where appropriate and no heavy runtime library is added.

`npm install`, the full test suite and `npm run build` must pass immediately before the sole commit. `CHANGELOG.md` records every created/modified project file and its reason.
