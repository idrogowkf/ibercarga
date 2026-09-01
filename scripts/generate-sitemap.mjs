import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { siteRoutes } from '../src/data/services.mjs';
import { guideRoutes } from '../src/data/guides.mjs';

const SITE_URL = 'https://ibercarga.com';

export function createSitemap(routes, lastModified = new Date().toISOString().slice(0, 10)) {
  const urls = routes.map(({ path, language, alternatePath }) => {
    const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}/${path.replace(/^\/+|\/+$/g, '')}`;
    const alternate = alternatePath === '/' ? `${SITE_URL}/` : alternatePath ? `${SITE_URL}/${alternatePath.replace(/^\/+|\/+$/g, '')}` : null;
    const esHref = language === 'es' ? canonical : alternate || canonical;
    const enHref = language === 'en' ? canonical : alternate;
    const alternates = alternate
      ? `\n    <xhtml:link rel="alternate" hreflang="es" href="${esHref}"/>\n    <xhtml:link rel="alternate" hreflang="en" href="${enHref}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esHref}"/>`
      : `\n    <xhtml:link rel="alternate" hreflang="${language}" href="${canonical}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical}"/>`;
    return `  <url>\n    <loc>${canonical}</loc>${alternates}\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

export function createProductionSitemap(lastModified) {
  return createSitemap([...siteRoutes, ...guideRoutes], lastModified);
}

const isDirect = process.argv[1] && fileURLToPath(import.meta.url).toLowerCase() === process.argv[1].toLowerCase();
if (isDirect) {
  await writeFile(new URL('../public/sitemap.xml', import.meta.url), createProductionSitemap(), 'utf8');
}
