import { describe, expect, it } from 'vitest';
import { auditHtml } from './audit-build.mjs';

describe('built HTML audit', () => {
  it('accepts one H1, canonical, description and valid JSON-LD', () => {
    const page = { path: '/x', title: 'X' };
    const html = '<html><head><title>X | Ibercarga</title><meta name="description" content="Useful"><link rel="canonical" href="https://ibercarga.com/x"><script type="application/ld+json">{"@type":"Service"}</script></head><body><h1>X</h1></body></html>';
    expect(auditHtml(page, html)).toMatchObject({ canonical: 'https://ibercarga.com/x', h1Count: 1 });
  });

  it('rejects duplicate H1s', () => {
    expect(() => auditHtml({ path: '/x' }, '<meta name="description" content="x"><link rel="canonical" href="https://ibercarga.com/x"><h1>A</h1><h1>B</h1><script type="application/ld+json">{}</script>')).toThrow(/H1/);
  });
});
