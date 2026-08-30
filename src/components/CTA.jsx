import React from 'react';
import QuoteForm from './QuoteForm';

export default function CTA({ language = 'es', children }) {
  if (children) return <div className="quoteCard" id="presupuesto">{children}</div>;
  return <QuoteForm language={language} />;
}
