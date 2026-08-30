import { useEffect } from 'react';
import { buildHreflang } from './hreflang';
import { buildMeta } from './meta';
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from './schema';

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) { node = document.createElement('meta'); document.head.appendChild(node); }
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
}

export default function Seo({ page }) {
  useEffect(() => {
    const meta = buildMeta(page);
    document.title = meta.title;
    document.documentElement.lang = page.language;
    const entries = [
      ['meta[name="description"]', { name: 'description', content: meta.description }],
      ['meta[property="og:type"]', { property: 'og:type', content: meta.openGraph.type }],
      ['meta[property="og:site_name"]', { property: 'og:site_name', content: meta.openGraph.siteName }],
      ['meta[property="og:title"]', { property: 'og:title', content: meta.openGraph.title }],
      ['meta[property="og:description"]', { property: 'og:description', content: meta.openGraph.description }],
      ['meta[property="og:url"]', { property: 'og:url', content: meta.openGraph.url }],
      ['meta[property="og:image"]', { property: 'og:image', content: meta.openGraph.image }],
      ['meta[property="og:locale"]', { property: 'og:locale', content: meta.openGraph.locale }],
      ['meta[name="twitter:card"]', { name: 'twitter:card', content: meta.twitter.card }],
      ['meta[name="twitter:title"]', { name: 'twitter:title', content: meta.twitter.title }],
      ['meta[name="twitter:description"]', { name: 'twitter:description', content: meta.twitter.description }],
      ['meta[name="twitter:image"]', { name: 'twitter:image', content: meta.twitter.image }],
    ];
    entries.forEach(([selector, attributes]) => upsertMeta(selector, attributes));

    document.head.querySelectorAll('[data-ibercarga-seo-link]').forEach((node) => node.remove());
    const canonical = document.head.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.rel = 'canonical'; canonical.href = meta.canonical; canonical.dataset.ibercargaSeoLink = 'true';
    if (!canonical.parentNode) document.head.appendChild(canonical);
    buildHreflang(page).forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate'; link.hreflang = hreflang; link.href = href; link.dataset.ibercargaSeoLink = 'true';
      document.head.appendChild(link);
    });

    document.head.querySelectorAll('script[data-ibercarga-schema]').forEach((node) => node.remove());
    const homePath = page.language === 'es' ? '/' : '/en/';
    const homeName = page.language === 'es' ? 'Inicio' : 'Home';
    const crumbs = page.type === 'home' ? [{ name: homeName, path: page.path }] : [{ name: homeName, path: homePath }, { name: page.heading, path: page.path }];
    [organizationSchema, serviceSchema(page), faqSchema(page.faq), breadcrumbSchema(crumbs)].forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json'; script.dataset.ibercargaSchema = 'true'; script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    return () => {
      document.head.querySelectorAll('[data-ibercarga-seo-link], script[data-ibercarga-schema]').forEach((node) => node.remove());
    };
  }, [page]);
  return null;
}
