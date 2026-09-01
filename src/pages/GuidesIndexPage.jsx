import React from 'react';
import Footer from '../components/Footer';
import GuideCards from '../components/GuideCards';
import Header from '../components/Header';
import { getGuidesByLanguage } from '../data/guides.mjs';
import Seo from '../seo/Seo';

export default function GuidesIndexPage({ page }) {
  const english = page.language === 'en';
  const guides = getGuidesByLanguage(page.language);
  return <div data-layout="v12" className="v12-shell"><Seo page={page} /><Header language={page.language} home={false} alternatePath={page.alternatePath} /><main><section className="guideHubHero"><div className="guideHubBackdrop" style={{ backgroundImage: `url('${page.image}')` }} aria-hidden="true" /><div className="wrap guideHubIntro"><span className="eyebrow">Ibercarga · {english ? 'Technical Centre' : 'Centro técnico'}</span><h1 className="display heroTitle">{page.heading}</h1><p>{page.intro}</p><div className="guideHubTopics"><span>{english ? 'Permits' : 'Permisos'}</span><span>{english ? 'Route surveys' : 'Estudios de ruta'}</span><span>{english ? 'Quotations' : 'Presupuestos'}</span><span>{english ? 'Precast logistics' : 'Prefabricados'}</span></div></div></section><section className="section guideHubSection"><div className="wrap"><div className="guideHubHeading"><span className="kicker">{english ? 'Four practical guides' : 'Cuatro guías prácticas'}</span><h2 className="display">{english ? 'Plan with better technical information' : 'Planifica con mejor información técnica'}</h2></div><GuideCards guides={guides} language={page.language} /></div></section></main><Footer language={page.language} home={false} /></div>;
}
