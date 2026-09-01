import React from 'react';

export default function OfficialSources({ sources = [], language = 'es' }) {
  if (!sources.length) return null;
  return <section className="section officialSources" aria-labelledby="sources-heading"><div className="wrap"><span className="kicker">{language === 'en' ? 'Verified references' : 'Referencias verificadas'}</span><h2 id="sources-heading" className="display">{language === 'en' ? 'Official sources' : 'Fuentes oficiales'}</h2><p className="sourcesIntro">{language === 'en' ? 'Public bodies and consolidated regulations used to check the administrative context of this guide.' : 'Organismos públicos y normativa consolidada utilizados para comprobar el contexto administrativo de esta guía.'}</p><ul className="sourceList">{sources.map((source, index) => <li key={source.url}><span className="sourceIndex">{String(index + 1).padStart(2, '0')}</span><div><a href={source.url} target="_blank" rel="noreferrer">{source.organization} — {source.title}</a><span>{language === 'en' ? 'Source checked' : 'Fuente comprobada'}: {source.accessedDate}</span></div></li>)}</ul></div></section>;
}
