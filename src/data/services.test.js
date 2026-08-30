import { describe, expect, it } from 'vitest';
import { findServiceByPath, getRelatedServices, homePages, serviceRoutes, siteRoutes } from './services';

const requestedRoutes = [
  '/', '/transporte-especial', '/transporte-sobredimensionado', '/transporte-transformadores',
  '/transporte-prefabricados', '/transporte-industrial', '/transporte-eolico', '/gestion-permisos',
  '/coches-piloto', '/estudio-ruta', '/en/special-transport', '/en/heavy-haul',
];

describe('SEO route catalogue', () => {
  it('publishes every requested route and preserves the existing English home', () => {
    const paths = siteRoutes.map(({ path }) => path);
    expect(requestedRoutes.every((path) => paths.includes(path))).toBe(true);
    expect(paths).toContain('/en/');
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('provides unique, substantial content for every landing', () => {
    expect(new Set(serviceRoutes.map(({ title }) => title)).size).toBe(serviceRoutes.length);
    expect(new Set(serviceRoutes.map(({ description }) => description)).size).toBe(serviceRoutes.length);
    expect(new Set(serviceRoutes.map(({ heading }) => heading)).size).toBe(serviceRoutes.length);
    expect(serviceRoutes.every(({ description, faq, sections }) => description.length > 90 && faq.length >= 3 && sections.length >= 2)).toBe(true);
  });

  it('normalizes paths and resolves valid contextual links in the same language', () => {
    expect(findServiceByPath('/transporte-eolico/').path).toBe('/transporte-eolico');
    expect(serviceRoutes.every((page) => getRelatedServices(page).length >= 2)).toBe(true);
    expect(serviceRoutes.every((page) => getRelatedServices(page).every((related) => related.language === page.language && related.path !== page.path))).toBe(true);
  });

  it('defines reciprocal Spanish and English alternates', () => {
    const spanish = findServiceByPath('/transporte-especial');
    const english = findServiceByPath('/en/special-transport');
    expect(spanish.alternatePath).toBe(english.path);
    expect(english.alternatePath).toBe(spanish.path);
    expect(homePages.es.alternatePath).toBe(homePages.en.path);
  });
});
