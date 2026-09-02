import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ language = 'es', home = true, alternatePath }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefix = language === 'es' ? '' : '/en';
  const anchor = (id) => `${home ? '' : prefix || '/'}#${id}`;
  const labels = language === 'es'
    ? { quote: 'Solicitar presupuesto', services: 'Soluciones', technical: 'Centro técnico', process: 'Cómo trabajamos', contact: 'Contacto', tagline: 'Transporte especial' }
    : { quote: 'Request a quote', services: 'Solutions', technical: 'Guides', process: 'How we work', contact: 'Contact', tagline: 'Special transport' };
  return (
    <header className="v12-header">
      <div className="wrap topin">
        <a href={home ? '#' : prefix || '/'} className="brand" aria-label={language === 'es' ? 'Ibercarga, inicio' : 'Ibercarga, home'}>
          <span className="mark" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>Ibercarga</strong><small>{labels.tagline}</small></span>
        </a>
        <button className="menuToggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? (language === 'en' ? 'Close menu' : 'Cerrar menú') : (language === 'en' ? 'Open menu' : 'Abrir menú')} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        <div className={`headerPanel${menuOpen ? ' isOpen' : ''}`} id="primary-navigation">
          <nav aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}>
            <a href={anchor('precios')} onClick={() => setMenuOpen(false)}>{labels.services}</a>
            <a href={anchor('como-funciona')} onClick={() => setMenuOpen(false)}>{labels.process}</a>
            <a href={anchor('contacto')} onClick={() => setMenuOpen(false)}>{labels.contact}</a>
          </nav>
          <div className="headActions">
            <a className="btn technicalAction" href={language === 'en' ? '/en/guides' : '/guias'} onClick={() => setMenuOpen(false)}>{labels.technical}</a>
            <a className="btn lang" href={alternatePath || (language === 'es' ? '/en' : '/')}>{language === 'es' ? 'ES ▾' : 'EN ▾'}</a>
            <a href={anchor('presupuesto')} className="btn btnPrimary">{labels.quote}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
