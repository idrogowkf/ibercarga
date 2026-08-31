import { describe, expect, it } from 'vitest';
import { siteRoutes } from '../src/data/services';
import { createProductionSitemap, createSitemap } from './generate-sitemap.mjs';

describe('generated sitemap', () => {
  it('contains every catalogue canonical exactly once', () => {
    const xml = createSitemap(siteRoutes);
    for (const { path } of siteRoutes) {
      const canonical = path === '/' ? 'https://ibercarga.com/' : `https://ibercarga.com/${path.replace(/^\/+|\/+$/g, '')}`;
      expect(xml.split(`<loc>${canonical}</loc>`)).toHaveLength(2);
    }
    expect((xml.match(/<url>/g) || [])).toHaveLength(siteRoutes.length);
    expect(xml).toContain('<loc>https://ibercarga.com/en/oversized-load-transport</loc>');
  });

  it('uses the exported catalogue and emits complete identical hreflang clusters', () => {
    const xml = createProductionSitemap('2026-08-30');
    expect(xml).toBe(createSitemap(siteRoutes, '2026-08-30'));
    const specialEntries = xml.match(/<url>[\s\S]*?<loc>https:\/\/ibercarga\.com\/(?:transporte-especial|en\/special-transport)<\/loc>[\s\S]*?<\/url>/g);
    expect(specialEntries).toHaveLength(2);
    for (const entry of specialEntries) {
      expect(entry).toContain('hreflang="es" href="https://ibercarga.com/transporte-especial"');
      expect(entry).toContain('hreflang="en" href="https://ibercarga.com/en/special-transport"');
      expect(entry).toContain('hreflang="x-default" href="https://ibercarga.com/transporte-especial"');
    }
  });
});
