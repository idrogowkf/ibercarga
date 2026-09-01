import React from 'react';

export default function OfficialSources({ sources = [], language = 'es' }) {
  if (!sources.length) return null;
  return <section className="section soft" aria-labelledby="sources-heading"><div className="wrap"><h2 id="sources-heading" className="display">{language === 'en' ? 'Official sources' : 'Fuentes oficiales'}</h2><ul className="sourceList">{sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.organization} · {language === 'en' ? 'Accessed' : 'Consultado'}: {source.accessedDate}</span></li>)}</ul></div></section>;
}
