import { describe, expect, it } from 'vitest';
import { indexableRoutes, findPageByPath } from './routeCatalog.mjs';
import { buildSeoDocument } from './document.mjs';

describe('indexable route catalogue', () => {
  it('contains unique canonicals and excludes legacy author profiles', () => {
    const paths = indexableRoutes.map(({ path }) => path.replace(/\/$/, '') || '/');
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).not.toContain('/autor/luis-idrogo');
    expect(paths).not.toContain('/en/author/luis-idrogo');
    expect(findPageByPath('/en')).toMatchObject({ language: 'en', type: 'home' });
    expect(findPageByPath('/autor/luis-idrogo')).toMatchObject({ type: 'author' });
  });

  it('keeps legacy author routes reachable but explicitly noindex', () => {
    const page = findPageByPath('/autor/luis-idrogo');
    const html = buildSeoDocument(page, '<main><h1>Luis Idrogo</h1></main>', '<!doctype html><html><head></head><body><div id="root"></div></body></html>');
    expect(html).toContain('<meta name="robots" content="noindex,follow">');
  });
});

describe('server SEO document', () => {
  it('emits complete route-specific metadata and parseable schemas', () => {
    const page = findPageByPath('/transporte-especial');
    const html = buildSeoDocument(page, '<main><h1>Rendered service</h1></main>', '<!doctype html><html><head></head><body><div id="root"></div></body></html>');
    expect(html).toContain(`<html lang="es">`);
    expect(html).toContain(`<title>${page.title} | Ibercarga</title>`);
    expect(html).toContain(`content="${page.description}"`);
    expect(html).toContain(`rel="canonical" href="https://ibercarga.com/transporte-especial"`);
    expect(html).toContain(`hreflang="en" href="https://ibercarga.com/en/special-transport"`);
    expect(html).toContain('<main><h1>Rendered service</h1></main>');
    const schemas = [...html.matchAll(/<script type="application\/ld\+json" data-ibercarga-schema>(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    expect(schemas.map((schema) => schema['@type'])).toEqual(expect.arrayContaining(['Organization', 'Service', 'FAQPage', 'BreadcrumbList']));
  });
});
