import { useEffect } from 'react';

const SITE_URL = 'https://ibercarga.com';
const DEFAULT_IMAGE = `${SITE_URL}/hero/ibercarga-aspa.jpg`;

function setMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    document.head.appendChild(node);
  }
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
}

function setLink(rel, href, hreflang) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('link');
    node.rel = rel;
    if (hreflang) node.hreflang = hreflang;
    document.head.appendChild(node);
  }
  node.href = href;
}

export default function Seo({ title, description, path = '/', language = 'es', alternatePath, schema = [] }) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
    document.title = `${title} | Ibercarga`;
    document.documentElement.lang = language;

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: `${title} | Ibercarga` });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: DEFAULT_IMAGE });
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: language === 'es' ? 'es_ES' : 'en_GB' });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: `${title} | Ibercarga` });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setLink('canonical', canonical);
    setLink('alternate', canonical, language);
    if (alternatePath) setLink('alternate', `${SITE_URL}${alternatePath}`, language === 'es' ? 'en' : 'es');
    setLink('alternate', `${SITE_URL}/`, 'x-default');

    document.querySelectorAll('script[data-ibercarga-schema]').forEach((node) => node.remove());
    schema.forEach((entry) => {
      const node = document.createElement('script');
      node.type = 'application/ld+json';
      node.dataset.ibercargaSchema = 'true';
      node.text = JSON.stringify(entry);
      document.head.appendChild(node);
    });

    return () => document.querySelectorAll('script[data-ibercarga-schema]').forEach((node) => node.remove());
  }, [title, description, path, language, alternatePath, schema]);

  return null;
}
