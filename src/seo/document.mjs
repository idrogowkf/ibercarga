import { canonicalFor } from './routeCatalog.mjs';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');

const jsonForHtml = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

function schemasFor(page) {
  const organization = {
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Ibercarga', url: 'https://ibercarga.com/',
    logo: 'https://ibercarga.com/favicon.svg', email: 'transporte@ibercarga.com', telephone: '+34624473123', areaServed: ['ES', 'EU'],
  };
  const home = page.language === 'en' ? { name: 'Home', path: '/en' } : { name: 'Inicio', path: '/' };
  const crumbs = page.type === 'home' ? [{ name: home.name, path: page.path }] : [home, { name: page.heading, path: page.path }];
  const result = [organization];
  if (page.type === 'home' || page.type === 'service') result.push({
    '@context': 'https://schema.org', '@type': 'Service', name: page.title, description: page.description,
    url: canonicalFor(page.path), serviceType: page.serviceType,
    provider: { '@type': 'Organization', name: 'Ibercarga', url: 'https://ibercarga.com/' },
    areaServed: page.language === 'es' ? ['España', 'Europa'] : ['Spain', 'Europe'],
  });
  if (page.type === 'guide') result.push({
    '@context': 'https://schema.org', '@type': 'Article', headline: page.heading, description: page.description,
    url: canonicalFor(page.path), datePublished: page.publishedDate, dateModified: page.reviewedDate,
    inLanguage: page.language, publisher: { '@type': 'Organization', name: 'Ibercarga', url: 'https://ibercarga.com/' },
  });
  if (page.faq?.length) result.push({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: page.faq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  });
  result.push({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(({ name, path }, index) => ({ '@type': 'ListItem', position: index + 1, name, item: canonicalFor(path) })),
  });
  return result;
}

function seoHead(page) {
  const title = `${page.title} | Ibercarga`;
  const canonical = canonicalFor(page.path);
  const image = `https://ibercarga.com${page.image || '/hero/ibercarga-aspa.jpg'}`;
  const alternateLanguage = page.language === 'es' ? 'en' : 'es';
  const heroImage = (page.type === 'home' ? '/hero/ibercarga-aspa.jpg' : page.image || '/hero/ibercarga-aspa.jpg').replace(/\.jpg$/, '.webp');
  const links = [`<link rel="canonical" href="${canonical}" data-ibercarga-seo-link="true">`];
  links.push(`<link rel="alternate" hreflang="${page.language}" href="${canonical}" data-ibercarga-seo-link="true">`);
  if (page.alternatePath) links.push(`<link rel="alternate" hreflang="${alternateLanguage}" href="${canonicalFor(page.alternatePath)}" data-ibercarga-seo-link="true">`);
  links.push(`<link rel="alternate" hreflang="x-default" href="${canonicalFor(page.language === 'es' ? page.path : page.alternatePath || '/')}" data-ibercarga-seo-link="true">`);
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}">`,
    ...(page.type === 'author' ? ['<meta name="robots" content="noindex,follow">'] : []),
    `<meta property="og:type" content="${page.type === 'guide' ? 'article' : 'website'}">`,
    '<meta property="og:site_name" content="Ibercarga">',
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:locale" content="${page.language === 'es' ? 'es_ES' : 'en_GB'}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<link rel="preload" as="image" href="${heroImage}" fetchpriority="high">`,
    ...links,
    ...schemasFor(page).map((schema) => `<script type="application/ld+json" data-ibercarga-schema>${jsonForHtml(schema)}</script>`),
  ].join('\n  ');
}

export function buildSeoDocument(page, bodyHtml, template) {
  if (!page) throw new Error('Cannot build an SEO document without page data');
  let html = template.replace(/<html(?:\s+lang="[^"]*")?>/, `<html lang="${page.language}">`);
  html = html.replace(/\s*<title>[\s\S]*?<\/title>/i, '');
  html = html.replace(/\s*<meta name="description"[^>]*>/i, '');
  html = html.replace(/\s*<link rel="canonical"[^>]*>/i, '');
  html = html.replace(/\s*<meta property="og:type"[^>]*>/i, '');
  html = html.replace(/\s*<meta property="og:site_name"[^>]*>/i, '');
  html = html.replace(/\s*<meta property="og:image"[^>]*>/i, '');
  html = html.replace('</head>', `  ${seoHead(page)}\n</head>`);
  return html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}
