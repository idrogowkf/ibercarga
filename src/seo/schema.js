import { buildCanonical, SITE_URL } from './canonical';

export const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Ibercarga', url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`, email: 'transporte@ibercarga.com', telephone: '+34624473123', areaServed: ['ES', 'EU'],
};

export function serviceSchema(page) {
  return {
    '@context': 'https://schema.org', '@type': 'Service', name: page.title, description: page.description,
    url: buildCanonical(page.path), serviceType: page.serviceType,
    provider: { '@type': 'Organization', name: 'Ibercarga', url: `${SITE_URL}/` },
    areaServed: page.language === 'es' ? ['España', 'Europa'] : ['Spain', 'Europe'],
  };
}

export function faqSchema(items = []) {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function breadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, path }, index) => ({
      '@type': 'ListItem', position: index + 1, name, item: buildCanonical(path),
    })),
  };
}
