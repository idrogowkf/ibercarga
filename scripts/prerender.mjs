import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildSeoDocument } from '../src/seo/document.mjs';
import { canonicalFor, renderableRoutes } from '../src/seo/routeCatalog.mjs';

const projectRoot = process.cwd();

export function outputFileForPath(pathname) {
  const clean = String(pathname).replace(/^\/+|\/+$/g, '');
  return clean ? `${clean}.html` : 'index.html';
}

export function serverEntryFile(root) {
  return join(root, '.ssr', 'entry-server.mjs').replaceAll('\\', '/');
}

export function validateRenderedRoute(page, html) {
  if (!html.includes(`rel="canonical" href="${canonicalFor(page.path)}"`)) throw new Error(`Missing canonical for ${page.path}`);
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) throw new Error(`Expected one H1 for ${page.path}; found ${h1Count}`);
  if (!html.includes('<script type="application/ld+json"')) throw new Error(`Missing JSON-LD for ${page.path}`);
}

export function buildNotFoundDocument(template, bodyHtml) {
  let html = template
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta name="description"[^>]*>/i, '')
    .replace(/\s*<link rel="canonical"[^>]*>/gi, '')
    .replace(/\s*<link rel="alternate"[^>]*>/gi, '')
    .replace(/\s*<meta (?:property="og:[^"]+"|name="twitter:[^"]+")[^>]*>/gi, '')
    .replace(/\s*<script type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');
  html = html.replace('</head>', '  <title>Página no encontrada | Ibercarga</title>\n  <meta name="description" content="La página solicitada no existe.">\n  <meta name="robots" content="noindex,follow">\n</head>');
  return html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

export async function prerender({ root = projectRoot } = {}) {
  const dist = join(root, 'dist');
  const template = await readFile(join(dist, 'index.html'), 'utf8');
  const serverEntry = pathToFileURL(serverEntryFile(root)).href;
  const { renderPage } = await import(`${serverEntry}?v=${Date.now()}`);
  for (const page of renderableRoutes) {
    const body = renderPage(page.path);
    const html = buildSeoDocument(page, body, template);
    validateRenderedRoute(page, html);
    const target = join(dist, outputFileForPath(page.path));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
  }
  const notFoundBody = renderPage('/__ibercarga_not_found__');
  await writeFile(join(dist, '404.html'), buildNotFoundDocument(template, notFoundBody), 'utf8');
  await rm(join(root, '.ssr'), { recursive: true, force: true });
  return renderableRoutes.length;
}

const direct = process.argv[1]?.replaceAll('\\', '/').endsWith('/scripts/prerender.mjs');
if (direct) {
  const count = await prerender();
  console.log(`Prerendered ${count} directly renderable routes.`);
}
