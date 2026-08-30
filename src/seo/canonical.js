export const SITE_URL = 'https://ibercarga.com';

export function normalizePath(path = '/') {
  const clean = `/${String(path).split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '')}`;
  return clean === '/' ? '/' : clean;
}

export function buildCanonical(path = '/') {
  return `${SITE_URL}${normalizePath(path)}`;
}
