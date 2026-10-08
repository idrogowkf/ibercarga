import { describe, expect, it } from 'vitest';
import { outputFileForPath, serverEntryFile, validateRenderedRoute } from './prerender.mjs';

describe('route prerendering', () => {
  it('maps clean URLs to deterministic html files', () => {
    expect(outputFileForPath('/')).toBe('index.html');
    expect(outputFileForPath('/en')).toBe('en.html');
    expect(outputFileForPath('/en/special-transport')).toBe('en/special-transport.html');
  });

  it('uses the ESM filename emitted by the Vite SSR build', () => {
    expect(serverEntryFile('C:/project')).toBe('C:/project/.ssr/entry-server.mjs');
  });

  it('rejects output without the route heading or canonical', () => {
    expect(() => validateRenderedRoute({ path: '/x', heading: 'Expected' }, '<html><head></head><body></body></html>')).toThrow(/canonical/i);
  });
});
