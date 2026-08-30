const SITE_URL = 'https://ibercarga.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ibercarga',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  email: 'contacto@ibercarga.com',
  telephone: '+34624473123',
  areaServed: ['ES', 'EU']
};

export function serviceSchema(service, language, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${SITE_URL}${path}`,
    provider: { '@type': 'Organization', name: 'Ibercarga', url: `${SITE_URL}/` },
    areaServed: language === 'es' ? 'España y Europa' : 'Spain and Europe',
    serviceType: service.title
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };
}
