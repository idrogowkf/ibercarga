import React from 'react';

export default function Header({ language = 'es', home = true, alternatePath }) {
  const prefix = language === 'es' ? '' : '/en';
  const anchor = (id) => `${home ? '' : prefix || '/'}#${id}`;
  const labels = language === 'es'
    ? { quote: 'Solicitar presupuesto', services: 'Soluciones', technical: 'Centro técnico', process: 'Cómo trabajamos', contact: 'Contacto', tagline: 'Transporte especial' }
    : { quote: 'Request a quote', services: 'Solutions', technical: 'Technical centre', process: 'How we work', contact: 'Contact', tagline: 'Special transport' };
  return (
    <header className="v12-header">
      <div className="wrap topin">
        <a href={home ? '#' : prefix || '/'} className="brand" aria-label={language === 'es' ? 'Ibercarga, inicio' : 'Ibercarga, home'}>
          <span className="mark" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>Ibercarga</strong><small>{labels.tagline}</small></span>
        </a>
        <nav aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}>
          <a href={anchor('precios')}>{labels.services}</a>
          <a href={anchor('informacion')}>{labels.technical}</a>
          <a href={anchor('como-funciona')}>{labels.process}</a>
          <a href={anchor('contacto')}>{labels.contact}</a>
        </nav>
        <div className="headActions">
          <a className="btn lang" href={alternatePath || (language === 'es' ? '/en' : '/')}>{language === 'es' ? 'ES ▾' : 'EN ▾'}</a>
          <a href={anchor('presupuesto')} className="btn btnPrimary">{labels.quote}</a>
        </div>
      </div>
    </header>
  );
}
