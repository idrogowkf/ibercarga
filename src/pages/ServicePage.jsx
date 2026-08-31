import React from 'react';
import { Link } from 'react-router-dom';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import { getRelatedServices } from '../data/services';
import Seo from '../seo/Seo';

export default function ServicePage({ page }) {
  const english = page.language === 'en';
  const home = english ? '/en' : '/';
  return (
    <div data-layout="v12" className="v12-shell">
      <Seo page={page} /><Header language={page.language} home={false} alternatePath={page.alternatePath} />
      <main>
        <nav aria-label={english ? 'Breadcrumb' : 'Migas de pan'} className="breadcrumb"><ol className="wrap"><li><Link to={home}>{english ? 'Home' : 'Inicio'}</Link></li><li aria-hidden="true">/</li><li aria-current="page">{page.title}</li></ol></nav>
        <Hero page={page}><CTA language={page.language} /></Hero>
        <section id="informacion" className="section"><div className="wrap"><div className="center"><span className="kicker">Ibercarga</span><h2 className="display">{page.serviceType}</h2></div><div className="bottomGrid informationGrid">{page.sections.map(({ heading, text }) => <article key={heading} className="panel"><h3>{heading}</h3><p>{text}</p></article>)}</div></div></section>
        <section id="faq" className="section soft"><div className="wrap"><div className="center"><span className="kicker">FAQ</span><h2 className="display">{english ? `Frequently asked questions about ${page.serviceType.toLowerCase()}` : `Preguntas frecuentes sobre ${page.serviceType.toLowerCase()}`}</h2></div><div className="faqGrid">{page.faq.map(({ question, answer }) => <details key={question} className="panel"><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
        <ServiceCards services={getRelatedServices(page)} language={page.language} />
      </main>
      <Footer language={page.language} home={false} />
    </div>
  );
}
