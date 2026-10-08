import { beforeEach, describe, expect, it } from 'vitest';
import { trackEvent } from './events';

describe('privacy-safe analytics events', () => {
  beforeEach(() => { window.dataLayer = []; });

  it('pushes a named event with route and language context', () => {
    window.history.pushState({}, '', '/en/special-transport');
    trackEvent('whatsapp_click', { language: 'en' });
    expect(window.dataLayer.at(-1)).toEqual({ event: 'whatsapp_click', language: 'en', page_path: '/en/special-transport' });
  });

  it('rejects personal form attributes', () => {
    expect(() => trackEvent('quote_submit_success', { email: 'person@example.com' })).toThrow(/personal data/i);
  });
});
