import React from 'react';
import AuthorBox from '../components/AuthorBox';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import GuideCards from '../components/GuideCards';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { getGuidesByLanguage } from '../data/guides.mjs';
import Seo from '../seo/Seo';

export default function AuthorPage({ page }) {
  const english = page.language === 'en';
  return <div data-layout="v12" className="v12-shell"><Seo page={page} /><Header language={page.language} home={false} alternatePath={page.alternatePath} /><main><Hero page={{ ...page, intro: page.bio, image: '/gallery/prefabricado.jpg' }}><CTA language={page.language} /></Hero><section className="section"><div className="wrap articleWrap"><AuthorBox author={page} compact /><h2 className="display">{english ? 'Areas of experience' : 'Áreas de experiencia'}</h2><ul className="checkList">{page.expertise.map((item) => <li key={item}>{item}</li>)}</ul><h2 className="display">{english ? 'Editorial criteria' : 'Criterio editorial'}</h2><p className="lead articleLead">{page.editorialCriteria}</p></div></section><section className="section soft"><div className="wrap"><GuideCards guides={getGuidesByLanguage(page.language)} language={page.language} /></div></section></main><Footer language={page.language} home={false} /></div>;
}
