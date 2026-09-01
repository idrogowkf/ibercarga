import { describe, expect, it } from 'vitest';
import { guides, guideRoutes } from './guides';

describe('technical guide catalogue', () => {
  it('publishes four reciprocal guide pairs plus indexes and authors', () => {
    expect(guides).toHaveLength(8);
    expect(guideRoutes).toHaveLength(12);
    for (const guide of guides) {
      const alternate = guides.find(({ path }) => path === guide.alternatePath);
      expect(alternate?.alternatePath).toBe(guide.path);
      expect(guide.sections.length).toBeGreaterThanOrEqual(5);
      expect(guide.faq.length).toBeGreaterThanOrEqual(3);
      expect(guide.checklist.length).toBeGreaterThanOrEqual(4);
      expect(guide.relatedServicePaths.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('keeps titles, descriptions and headings unique', () => {
    for (const key of ['title', 'description', 'heading']) {
      expect(new Set(guides.map((guide) => guide[key])).size).toBe(guides.length);
    }
  });

  it('uses only identified public bodies for normative sources', () => {
    const permitGuides = guides.filter(({ path }) => path.includes('autorizacion-') || path.includes('permit-'));
    expect(permitGuides.every(({ sources }) => sources.length >= 2)).toBe(true);
    for (const source of permitGuides.flatMap(({ sources }) => sources)) {
      expect(source.url).toMatch(/^https:\/\/(sede\.dgt\.gob\.es|www\.boe\.es|transit\.gencat\.cat)\//);
      expect(source.accessedDate).toBeTruthy();
      expect(source.organization).toBeTruthy();
      expect(source.title).toBeTruthy();
    }
  });

  it('starts the quotation guide with complete cargo data', () => {
    const quoteGuide = guides.find(({ path }) => path === '/guias/datos-presupuesto-transporte-especial');
    expect(quoteGuide.sections[0].items.join(' ')).toMatch(/Largo.*ancho.*alto/i);
    expect(quoteGuide.sections[0].items.join(' ')).toMatch(/indivisible/i);
    expect(quoteGuide.sections[0].items.join(' ')).toMatch(/plano/i);
    expect(quoteGuide.sections[0].items.join(' ')).toMatch(/fotos/i);
  });

  it('covers all route-survey workstreams and seasonal constraints', () => {
    const routeGuide = guides.find(({ path }) => path === '/guias/estudio-ruta-transporte-especial');
    const text = routeGuide.sections.flatMap(({ heading, paragraphs, items = [] }) => [heading, ...paragraphs, ...items]).join(' ');
    for (const term of ['revisión documental', 'geometría', 'firmes', 'pendientes', 'tráfico', 'inspección física', 'autoridades', 'acceso final', 'verano', 'invierno']) expect(text.toLowerCase()).toContain(term);
  });
});
