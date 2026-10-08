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
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"(?: data-ibercarga-schema)?>(.*?)<\/script>/g)];
  if (!schemas.length) throw new Error(`Missing JSON-LD for ${page.path}`);
  schemas.forEach((match) => JSON.parse(match[1]));
  return { canonical, h1Count, schemaCount: schemas.length };
}

export async function auditDist(root = process.cwd()) {
  const canonicals = new Set();
  for (const page of indexableRoutes) {
    const file = join(root, 'dist', outputFileForPath(page.path));
    await stat(file);
    const result = auditHtml(page, await readFile(file, 'utf8'));
    if (canonicals.has(result.canonical)) throw new Error(`Duplicate canonical ${result.canonical}`);
    canonicals.add(result.canonical);
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
