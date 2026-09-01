import React from 'react';

export default function Hero({ page, children }) {
  const isHome = !page || page.type === 'home';
  const heading = isHome ? 'Ibercarga' : page.heading;
  const intro = page?.intro || 'Transporte especial y sobredimensionado en toda España: eólico, prefabricado de hormigón, industrial, transformadores y más.';
  return (
    <section className="hero">
      <div className="slide active" style={{ backgroundImage: `url('${isHome ? '/hero/ibercarga-aspa.jpg' : page.image}')` }} aria-hidden="true" />
      <div className="wrap heroInner">
        <div className="heroCopy">
          <p className="eyebrow">{page?.eyebrow || (page?.language === 'en' ? 'Ibercarga · Spain and Europe' : 'Ibercarga · España y Europa')}</p>
          <h1 className="display heroTitle">{heading}</h1>
          <p className="heroDesc">{intro}</p>
          <div className="heroCtas">
            <a href={isHome ? '#como-funciona' : '#informacion'} className="btn btnGhost">{page?.language === 'en' ? 'How it works' : 'Cómo funciona'}</a>
          </div>
          <p className="modelNote">{page?.language === 'en' ? 'Technical coordination for special and oversized transport operations in Spain and Europe.' : 'Coordinación técnica para operaciones de transporte especial y sobredimensionado en España y Europa.'}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
