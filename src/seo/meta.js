import { buildCanonical, SITE_URL } from './canonical';

const DEFAULT_IMAGE = `${SITE_URL}/hero/ibercarga-aspa.jpg`;

export function buildMeta(page) {
  const title = `${page.title} | Ibercarga`;
  return {
    title,
    description: page.description,
    canonical: buildCanonical(page.path),
    openGraph: {
      title, description: page.description, url: buildCanonical(page.path), image: DEFAULT_IMAGE,
      type: 'website', siteName: 'Ibercarga', locale: page.language === 'es' ? 'es_ES' : 'en_GB',
    },
    twitter: { card: 'summary_large_image', title, description: page.description, image: DEFAULT_IMAGE },
  };
}
