import { describe, expect, it } from 'vitest';
import config from './vercel.json';

describe('Vercel SPA routing', () => {
  it('uses an extensionless fallback when clean URLs are enabled', () => {
    expect(config.cleanUrls).toBe(true);
    expect(config.rewrites).toContainEqual({
      source: '/((?!api/).*)',
      destination: '/index',
    });
  });
});
