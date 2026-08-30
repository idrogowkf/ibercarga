import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { homePages } from '../data/services';
import Seo from './Seo';
import { buildCanonical } from './canonical';
import { buildHreflang } from './hreflang';
import { buildMeta } from './meta';
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from './schema';

describe('SEO primitives', () => {
  it('normalizes absolute canonical URLs', () => {
    expect(buildCanonical('/transporte-especial/')).toBe('https://ibercarga.com/transporte-especial');
    expect(buildCanonical('/')).toBe('https://ibercarga.com/');
  });

  it('creates reciprocal language alternates and x-default', () => {
    expect(buildHreflang(homePages.es)).toEqual([
      { hreflang: 'es', href: 'https://ibercarga.com/' },
      { hreflang: 'en', href: 'https://ibercarga.com/en' },
      { hreflang: 'x-default', href: 'https://ibercarga.com/' },
    ]);
  });

  it('builds social metadata and all schema types', () => {
    const page = homePages.es;
    const meta = buildMeta(page);
    expect(meta.title).toContain('Ibercarga');
    expect(meta.openGraph.url).toBe('https://ibercarga.com/');
    expect(meta.twitter.card).toBe('summary_large_image');
    expect(organizationSchema['@type']).toBe('Organization');
    expect(serviceSchema(page)['@type']).toBe('Service');
    expect(faqSchema(page.faq)['@type']).toBe('FAQPage');
    expect(breadcrumbSchema([{ name: 'Inicio', path: '/' }])['@type']).toBe('BreadcrumbList');
  });
});

describe('<Seo />', () => {
  it('writes canonical, hreflang, Open Graph, Twitter Cards and JSON-LD to the document head', async () => {
    const staticCanonical = document.createElement('link');
    staticCanonical.rel = 'canonical'; staticCanonical.href = 'https://ibercarga.com/';
    document.head.appendChild(staticCanonical);
    render(<Seo page={homePages.es} />);
    await waitFor(() => expect(document.title).toContain('Ibercarga'));
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://ibercarga.com/');
    expect(document.head.querySelectorAll('link[rel="alternate"]')).toHaveLength(3);
    expect(document.head.querySelector('meta[property="og:title"]')).toHaveAttribute('content', expect.stringContaining('Ibercarga'));
    expect(document.head.querySelector('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    const types = [...document.head.querySelectorAll('script[data-ibercarga-schema]')].map((node) => JSON.parse(node.textContent)['@type']);
    expect(types).toEqual(['Organization', 'Service', 'FAQPage', 'BreadcrumbList']);
  });
});
