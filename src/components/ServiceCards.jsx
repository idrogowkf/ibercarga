import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCards({ services = [], language = 'es' }) {
  return (
    <section aria-labelledby="related-heading" className="section soft">
      <div className="wrap">
        <div className="center"><span className="kicker">Ibercarga</span><h2 id="related-heading" className="display">{language === 'en' ? 'Related transport services' : 'Servicios relacionados'}</h2></div>
        <div className="caseGrid">
          {services.map((service) => <article key={service.path} className="case serviceCase"><div className="caseBody"><span className="caseType">{language === 'en' ? 'Special transport' : 'Transporte especial'}</span><h3><Link to={service.path}>{service.title}</Link></h3><p>{service.description}</p><Link to={service.path} className="serviceLink">{language === 'en' ? 'View service →' : 'Ver servicio →'}</Link></div></article>)}
        </div>
      </div>
    </section>
  );
}
