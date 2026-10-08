import React from 'react';

export default function Hero({ page, children }) {
  const isHome = !page || page.type === 'home';
  const heading = page?.heading || 'Transporte especial y sobredimensionado en España y Europa';
  const intro = page?.intro || 'Transporte especial y sobredimensionado en toda España: eólico, prefabricado de hormigón, industrial, transformadores y más.';
  const image = isHome ? '/hero/ibercarga-aspa.jpg' : page.image;
  return (
    <section className="hero">
      <div className="slide active"><img className="heroMedia" src={image} alt={heading} width="1920" height="1080" loading="eager" fetchpriority="high" /></div>
      <div className="wrap heroInner">
        <div className="heroCopy">
          <p className="eyebrow">{page?.eyebrow || (page?.language === 'en' ? 'Ibercarga · Spain and Europe' : 'Ibercarga · España y Europa')}</p>
          <h1 className="display heroTitle">{heading}</h1>
          <p className="heroDesc">{intro}</p>
          <div className="heroCtas">
            <a href="#presupuesto" className="btn btnPrimary">{page?.language === 'en' ? 'Request a technical review' : 'Solicitar estudio técnico'}</a>
            <a href="tel:+34624473123" className="btn btnGhost">{page?.language === 'en' ? 'Speak to a specialist' : 'Hablar con un técnico'}</a>
          </div>
          <div className="heroProof" aria-label={page?.language === 'en' ? 'Scope of the technical review' : 'Alcance de la revisión técnica'}>
            <span>{page?.language === 'en' ? 'Technical review of cargo, route and equipment' : 'Revisión técnica de carga, ruta y medios'}</span>
            <span>{page?.language === 'en' ? 'Permits and escort requirements' : 'Permisos y necesidades de acompañamiento'}</span>
            <span>{page?.language === 'en' ? 'Direct response from a specialist' : 'Respuesta directa de un técnico'}</span>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
