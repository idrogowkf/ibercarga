import { guideRoutes } from '../data/guides.mjs';
import { siteRoutes } from '../data/services.mjs';

const normalize = (value = '/') => {
  const path = `/${String(value).split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '')}`;
  return path === '/' ? '/' : path;
};

export const renderableRoutes = [...siteRoutes, ...guideRoutes];
export const indexableRoutes = renderableRoutes.filter(({ type }) => type !== 'author');

const routeMap = new Map(renderableRoutes.map((page) => [normalize(page.path), page]));

if (routeMap.size !== renderableRoutes.length) {
  throw new Error('Duplicate indexable route detected');
}

export function findPageByPath(pathname) {
  return routeMap.get(normalize(pathname));
}

export function canonicalFor(pathname = '/') {
  const path = normalize(pathname);
  return `https://ibercarga.com${path}`;
}
