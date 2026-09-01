const authorDescription = {
  es: 'Profesional de obra y montaje con experiencia en planificación, coordinación y ejecución de operaciones con prefabricados de hormigón, estructuras y cargas especiales.',
  en: 'Construction and erection professional experienced in planning, coordinating and delivering operations involving precast concrete, structural components and special loads.',
};

export const authors = {
  es: { type: 'author', language: 'es', path: '/autor/luis-idrogo', alternatePath: '/en/author/luis-idrogo', title: 'Luis Idrogo, autor del Centro Técnico', description: authorDescription.es, heading: 'Luis Idrogo', eyebrow: 'Autor del Centro Técnico', role: 'Autor y profesional de obra y montaje', bio: authorDescription.es, expertise: ['Planificación de transportes especiales', 'Coordinación entre fábrica, transporte y obra', 'Prefabricados de hormigón y estructuras'], editorialCriteria: 'Contenido técnico basado en información verificable, experiencia profesional y recomendaciones operativas claramente diferenciadas.' },
  en: { type: 'author', language: 'en', path: '/en/author/luis-idrogo', alternatePath: '/autor/luis-idrogo', title: 'Luis Idrogo, Technical Guides author', description: authorDescription.en, heading: 'Luis Idrogo', eyebrow: 'Technical Guides author', role: 'Author and construction operations professional', bio: authorDescription.en, expertise: ['Special transport planning', 'Factory, transport and site coordination', 'Precast concrete and structural components'], editorialCriteria: 'Technical content separates verified information, professional experience and general operational recommendations.' },
};

export const guidesIndexPages = {
  es: { type: 'guide-index', language: 'es', path: '/guias', alternatePath: '/en/guides', title: 'Centro técnico de transporte especial', description: 'Guías técnicas permanentes sobre permisos, rutas, presupuestos y planificación de cargas especiales.', heading: 'Centro técnico', eyebrow: 'Guías prácticas para planificar operaciones', intro: 'Información técnica para preparar una consulta, comprender los condicionantes de una ruta y coordinar mejor cada operación.', image: '/gallery/estructura-metalica.jpg', author: authors.es },
  en: { type: 'guide-index', language: 'en', path: '/en/guides', alternatePath: '/guias', title: 'Special transport technical guides', description: 'Evergreen technical guides covering permits, route surveys, quotations and abnormal-load planning.', heading: 'Technical guides', eyebrow: 'Practical guidance for abnormal-load planning', intro: 'Technical guidance for preparing an enquiry, understanding route constraints and coordinating each movement with better information.', image: '/gallery/estructura-metalica.jpg', author: authors.en },
};

export const guides = [];
export const guideRoutes = [guidesIndexPages.es, guidesIndexPages.en, authors.es, authors.en, ...guides];
const normalize = (path = '/') => path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
export const findGuideByPath = (path) => guideRoutes.find((page) => normalize(page.path) === normalize(path));
export const getGuidesByLanguage = (language) => guides.filter((guide) => guide.language === language);
