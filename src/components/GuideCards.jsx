import React from 'react';
import { Link } from 'react-router-dom';

export default function GuideCards({ guides = [], language = 'es' }) {
  return <div className="caseGrid guideGrid">{guides.map((guide) => <article className="case guideCard" key={guide.path}><div className="caseBody"><span className="caseType">{guide.category}</span><h2><Link to={guide.path}>{guide.heading}</Link></h2><p>{guide.description}</p><Link className="serviceLink" to={guide.path}>{language === 'en' ? 'Read guide →' : 'Leer guía →'}</Link></div></article>)}</div>;
}
