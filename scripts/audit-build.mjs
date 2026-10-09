import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { canonicalFor, indexableRoutes } from '../src/seo/routeCatalog.mjs';
import { outputFileForPath } from './prerender.mjs';

export function auditHtml(page, html) {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== canonicalFor(page.path)) throw new Error(`Canonical mismatch for ${page.path}: ${canonical || 'missing'}`);
  if (!/<meta name="description" content="[^"]+">/.test(html)) throw new Error(`Missing description for ${page.path}`);
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) throw new Error(`H1 count for ${page.path}: ${h1Count}`);
  const language = html.match(/<html lang="([^"]+)"/)?.[1];
  if (language !== page.language) throw new Error(`Document language mismatch for ${page.path}: ${language || 'missing'}`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if (title !== `${page.title} | Ibercarga`) throw new Error(`Title mismatch for ${page.path}`);
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  if (!description || description !== page.description) throw new Error(`Description mismatch for ${page.path}`);
  const selfAlternate = html.match(new RegExp(`<link rel="alternate" hreflang="${page.language}" href="([^"]+)"`))?.[1];
  if (selfAlternate !== canonical) throw new Error(`Self hreflang mismatch for ${page.path}`);
  const openGraphUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
  if (openGraphUrl !== canonical) throw new Error(`Open Graph URL mismatch for ${page.path}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"(?: data-ibercarga-schema)?>(.*?)<\/script>/g)];
  if (!schemas.length) throw new Error(`Missing JSON-LD for ${page.path}`);
  const parsedSchemas = schemas.map((match) => JSON.parse(match[1]));
  if (page.type === 'guide' && parsedSchemas.some((schema) => schema['@type'] === 'Person')) throw new Error(`Hidden Person schema for ${page.path}`);
  return { canonical, title, description, h1Count, schemaCount: schemas.length };
}

export async function auditDist(root = process.cwd()) {
  const canonicals = new Set();
  const titles = new Set();
  const descriptions = new Set();
  for (const page of indexableRoutes) {
    const file = join(root, 'dist', outputFileForPath(page.path));
    await stat(file);
    const result = auditHtml(page, await readFile(file, 'utf8'));
    if (canonicals.has(result.canonical)) throw new Error(`Duplicate canonical ${result.canonical}`);
    if (titles.has(result.title)) throw new Error(`Duplicate title ${result.title}`);
    if (descriptions.has(result.description)) throw new Error(`Duplicate description on ${page.path}`);
    canonicals.add(result.canonical);
    titles.add(result.title);
    descriptions.add(result.description);
  }
  const sitemap = await readFile(join(root, 'dist', 'sitemap.xml'), 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  if (sitemapUrls.length !== indexableRoutes.length) throw new Error(`Sitemap count ${sitemapUrls.length} does not match ${indexableRoutes.length}`);
  for (const canonical of canonicals) if (!sitemapUrls.includes(canonical)) throw new Error(`Sitemap missing ${canonical}`);
  return { routes: indexableRoutes.length, canonicals: canonicals.size };
}

const direct = process.argv[1]?.replaceAll('\\', '/').endsWith('/scripts/audit-build.mjs');
if (direct) {
  const result = await auditDist();
  console.log(`Build audit passed: ${result.routes} routes, ${result.canonicals} unique canonicals.`);
}
