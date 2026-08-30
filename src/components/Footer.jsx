import React from 'react';

export default function Footer({ language = 'es', home = true }) {
  const prefix = language === 'es' ? '' : '/en';
  const anchor = (id) => `${home ? '' : prefix || '/'}#${id}`;
  return (
    <footer id="contacto" className="v12-footer">
      <div className="wrap footerGrid">
        <div><a href={home ? '#' : prefix || '/'} className="brand footerBrand"><span className="mark" aria-hidden="true"><i /><i /><i /></span><span><strong>Ibercarga</strong><small>{language === 'en' ? 'Special transport' : 'Transporte especial'}</small></span></a><p>{language === 'en' ? 'We coordinate technical and logistical solutions for special cargo in Spain and Europe.' : 'Coordinamos la solución técnica y logística para cargas especiales en España y Europa.'}</p></div>
        <div><h4>{language === 'en' ? 'Solutions' : 'Soluciones'}</h4><ul><li><a href={anchor('precios')}>{language === 'en' ? 'Special transport' : 'Transporte especial'}</a></li><li><a href={anchor('como-funciona')}>{language === 'en' ? 'How we work' : 'Cómo trabajamos'}</a></li><li><a href={anchor('faq')}>FAQ</a></li></ul></div>
        <div><h4>{language === 'en' ? 'Technical centre' : 'Centro técnico'}</h4><ul><li><a href={anchor('informacion')}>{language === 'en' ? 'Route studies' : 'Estudios de ruta'}</a></li><li><a href={anchor('informacion')}>{language === 'en' ? 'Permits and escorts' : 'Permisos y escoltas'}</a></li></ul></div>
        <div><h4>{language === 'en' ? 'Contact' : 'Contacto'}</h4><p>+34 624 473 123</p><p><a href="mailto:transporte@ibercarga.com">transporte@ibercarga.com</a></p></div>
      </div>
      <div className="wrap footerLegal">© {new Date().getFullYear()} Ibercarga. {language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}</div>
    </footer>
  );
}
