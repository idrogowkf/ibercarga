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

export function personSchema(author) {
  return { '@context': 'https://schema.org', '@type': 'Person', name: author.heading, description: author.bio, url: buildCanonical(author.path), jobTitle: author.role };
}

export function articleSchema(page) {
  return { '@context': 'https://schema.org', '@type': 'Article', headline: page.heading, description: page.description, url: buildCanonical(page.path), datePublished: page.publishedDate, dateModified: page.reviewedDate, inLanguage: page.language, author: { '@type': 'Person', name: page.author.heading, url: buildCanonical(page.author.path) }, publisher: { '@type': 'Organization', name: 'Ibercarga', url: `${SITE_URL}/` } };
}
