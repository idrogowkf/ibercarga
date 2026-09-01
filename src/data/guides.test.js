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
    }
  });
});
