import React from 'react';

export default function ArticleCTA({ text, language = 'es' }) {
  return <aside className="articleCta"><div><span className="caseType">Ibercarga</span><strong>{text}</strong><p>+34 624 473 123 · transporte@ibercarga.com</p></div><a className="btn btnPrimary" href="#presupuesto">{language === 'en' ? 'Request a quote' : 'Solicitar presupuesto'}</a></aside>;
}
