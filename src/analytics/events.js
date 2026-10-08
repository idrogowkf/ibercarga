const forbiddenKeys = /^(email|phone|telefono|name|nombre|company|empresa|origin|origen|destination|destino|cargo|tipo|message|mensaje)$/i;

export function trackEvent(name, attributes = {}) {
  const offending = Object.keys(attributes).find((key) => forbiddenKeys.test(key));
  if (offending) throw new Error(`Analytics events must not include personal data: ${offending}`);
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...attributes, page_path: window.location.pathname });
}
