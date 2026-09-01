import React from 'react';
import { Link } from 'react-router-dom';

export default function GuideCards({ guides = [], language = 'es' }) {
  return <div className="guideVisualGrid">{guides.map((guide, index) => <article className="guideVisualCard" key={guide.path}><Link to={guide.path} aria-label={guide.heading}><div className="guideVisualMedia"><img src={guide.image} alt="" width="720" height="460" loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="guideVisualBody"><span className="caseType">{guide.category}</span><h2>{guide.heading}</h2><p>{guide.description}</p><strong>{language === 'en' ? 'Open technical guide →' : 'Abrir guía técnica →'}</strong></div></Link></article>)}</div>;
}
