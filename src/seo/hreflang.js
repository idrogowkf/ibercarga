import { buildCanonical } from './canonical';

export function buildHreflang(page) {
  const alternates = [{ hreflang: page.language, href: buildCanonical(page.path) }];
  if (page.alternatePath) {
    alternates.push({ hreflang: page.language === 'es' ? 'en' : 'es', href: buildCanonical(page.alternatePath) });
  }
  alternates.push({ hreflang: 'x-default', href: buildCanonical(page.language === 'es' ? page.path : page.alternatePath || '/') });
  return alternates;
}
