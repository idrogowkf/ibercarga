import { describe, expect, it } from 'vitest';
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
});
