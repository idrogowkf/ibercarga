import { describe, expect, it } from 'vitest';
import { findServiceByPath, getRelatedServices, homePages, serviceRoutes, siteRoutes } from './services';

const requestedRoutes = [
  '/', '/transporte-especial', '/transporte-sobredimensionado', '/transporte-transformadores',
  '/transporte-prefabricados', '/transporte-industrial', '/transporte-eolico', '/gestion-permisos',
  '/coches-piloto', '/estudio-ruta', '/en/special-transport', '/en/heavy-haul',
  '/en/oversized-load-transport',
  '/transporte-maquinaria-pesada', '/en/heavy-machinery-transport',
  '/transporte-estructuras-metalicas', '/en/steel-structure-transport', '/en/transformer-transport',
  '/en/industrial-transport', '/en/precast-concrete-transport', '/en/wind-turbine-transport',
  '/en/abnormal-load-route-survey', '/en/abnormal-load-permits',
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

  it('pairs oversized transport with its exact English equivalent and keeps heavy haul distinct', () => {
    const spanish = findServiceByPath('/transporte-sobredimensionado');
    const english = findServiceByPath('/en/oversized-load-transport');
    const heavyHaul = findServiceByPath('/en/heavy-haul');
    expect(spanish.alternatePath).toBe(english.path);
    expect(english.alternatePath).toBe(spanish.path);
    expect(heavyHaul.alternatePath).toBeUndefined();
    expect(heavyHaul.intro).toMatch(/axle|mass|weight/i);
  });

  it('publishes reciprocal high-value cargo pairs with differentiated terminology', () => {
    const pairs = [
      ['/transporte-transformadores', '/en/transformer-transport', /centre of gravity|transformer/i],
      ['/transporte-maquinaria-pesada', '/en/heavy-machinery-transport', /excavator|ramp/i],
      ['/transporte-estructuras-metalicas', '/en/steel-structure-transport', /steel beams|trusses|frames/i],
    ];
    for (const [esPath, enPath, term] of pairs) {
      const es = findServiceByPath(esPath); const en = findServiceByPath(enPath);
      expect(es.alternatePath).toBe(enPath); expect(en.alternatePath).toBe(esPath);
      expect(`${en.intro} ${en.sections.map(({ text }) => text).join(' ')}`).toMatch(term);
    }
    expect(siteRoutes.some(({ path }) => path === '/transporte-acero' || path === '/en/steel-transport')).toBe(false);
  });

  it('completes reciprocal industrial, precast and wind-energy clusters without fragment routes', () => {
    const pairs = [
      ['/transporte-industrial', '/en/industrial-transport', /operating window|plant/i],
      ['/transporte-prefabricados', '/en/precast-concrete-transport', /beams|panels|piles|segments/i],
      ['/transporte-eolico', '/en/wind-turbine-transport', /blades|tower|nacelles|hubs/i],
    ];
    for (const [esPath, enPath, terms] of pairs) {
      const es = findServiceByPath(esPath); const en = findServiceByPath(enPath);
      expect(es.alternatePath).toBe(enPath); expect(en.alternatePath).toBe(esPath);
      expect(`${en.intro} ${en.sections.map(({ text }) => text).join(' ')}`).toMatch(terms);
    }
    expect(siteRoutes.some(({ path }) => /palas|nacelles|dovelas|pilotes|wind-blades/.test(path))).toBe(false);
  });

  it('completes reciprocal route-survey and permit authority pages with prudent content', () => {
    const routeEs = findServiceByPath('/estudio-ruta'); const routeEn = findServiceByPath('/en/abnormal-load-route-survey');
    const permitsEs = findServiceByPath('/gestion-permisos'); const permitsEn = findServiceByPath('/en/abnormal-load-permits');
    expect(routeEs.alternatePath).toBe(routeEn.path); expect(routeEn.alternatePath).toBe(routeEs.path);
    expect(permitsEs.alternatePath).toBe(permitsEn.path); expect(permitsEn.alternatePath).toBe(permitsEs.path);
    expect(routeEn.sections.map(({ text }) => text).join(' ')).toMatch(/clearance|turning|bridges|overhead/i);
    expect(permitsEn.sections.map(({ text }) => text).join(' ')).toMatch(/authority|country|time|escort/i);
    expect(`${permitsEn.intro} ${permitsEn.sections.map(({ text }) => text).join(' ')}`).toMatch(/cannot guarantee an approval/i);
  });
});
