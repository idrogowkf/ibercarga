import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import config from './vercel.json';

describe('Vercel static routing', () => {
  it('serves prerendered clean URLs without a soft-404 catch-all', () => {
    expect(config.cleanUrls).toBe(true);
    expect(config.rewrites || []).toHaveLength(0);
    expect(config.redirects).toContainEqual({
      source: '/:path*',
      has: [{ type: 'host', value: 'www.ibercarga.com' }],
      destination: 'https://ibercarga.com/:path*',
      permanent: true,
    });
  });

  it('publishes resource types and baseline browser security headers', () => {
    const headers = config.headers || [];
    expect(headers).toEqual(expect.arrayContaining([
      expect.objectContaining({ source: '/sitemap.xml' }),
      expect.objectContaining({ source: '/robots.txt' }),
      expect.objectContaining({ source: '/(.*)', headers: expect.arrayContaining([
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ]) }),
    ]));
  });

  it('does not bootstrap the same Google Ads destination outside GTM', () => {
    const html = readFileSync('index.html', 'utf8');
    expect(html).not.toContain('googletagmanager.com/gtag/js?id=AW-');
    expect(html.match(/GTM-KCTGJWRP/g)).toHaveLength(2);
  });
});
