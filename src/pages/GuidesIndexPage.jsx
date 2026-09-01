import React from 'react';
import AuthorBox from '../components/AuthorBox';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import GuideCards from '../components/GuideCards';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { getGuidesByLanguage } from '../data/guides.mjs';
import Seo from '../seo/Seo';

export default function GuidesIndexPage({ page }) {
  const english = page.language === 'en';
  const guides = getGuidesByLanguage(page.language);
  return <div data-layout="v12" className="v12-shell"><Seo page={page} /><Header language={page.language} home={false} alternatePath={page.alternatePath} /><main><Hero page={page}><CTA language={page.language} /></Hero><section className="section"><div className="wrap"><div className="center"><span className="kicker">Ibercarga</span><h2 className="display">{english ? 'Planning knowledge for real operations' : 'Conocimiento para operaciones reales'}</h2><p className="lead">{page.intro}</p></div><GuideCards guides={guides} language={page.language} /></div></section><section className="section soft"><div className="wrap"><AuthorBox author={page.author} /></div></section></main><Footer language={page.language} home={false} /></div>;
}
