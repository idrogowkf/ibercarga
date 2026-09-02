import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Mail, Phone } from 'lucide-react';
import Footer from '../components/Footer';
import GuideCards from '../components/GuideCards';
import Header from '../components/Header';
import OfficialSources from '../components/OfficialSources';
import { findServiceByPath } from '../data/services';
import { getPrimaryGuides } from '../data/guides';
import Seo from '../seo/Seo';

export default function GuidePage({ page }) {
  const english = page.language === 'en';
  const home = english ? '/en' : '/';
  const guidesHome = english ? '/en/guides' : '/guias';
  const relatedServices = page.relatedServicePaths.map(findServiceByPath).filter(Boolean);
  const relatedGuides = getPrimaryGuides(page.language);
  return <div data-layout="v12" className="v12-shell">
    <Seo page={page} /><Header language={page.language} home={false} alternatePath={page.alternatePath} />
    <main>
      <nav aria-label={english ? 'Breadcrumb' : 'Migas de pan'} className="breadcrumb"><ol className="wrap"><li><Link to={home}>{english ? 'Home' : 'Inicio'}</Link></li><li aria-hidden="true">/</li><li><Link to={guidesHome}>{english ? 'Guides' : 'Guías'}</Link></li><li aria-hidden="true">/</li><li aria-current="page">{page.heading}</li></ol></nav>
      <article>
        <header className="articleVisualHero"><div className="articleHeroImage" style={{ backgroundImage: `url('${page.image}')` }} aria-hidden="true" /><div className="wrap articleHeroContent"><p className="eyebrow">{page.eyebrow}</p><h1 className="display heroTitle">{page.heading}</h1><p className="heroDesc">{page.intro}</p><p className="articleMeta"><span>{english ? 'Published' : 'Publicado'} {page.publishedDate}</span><span>{english ? 'Reviewed' : 'Revisado'} {page.reviewedDate}</span></p></div></header>
        <div className="wrap articleLayout">
          <aside className="articleContents"><nav aria-label={english ? 'On this page' : 'En esta guía'}><span>{english ? 'On this page' : 'En esta guía'}</span><ol>{page.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}>{section.heading}</a></li>)}</ol></nav></aside>
          <div className="articleMain">
            <div className="articleSteps">{page.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading} className={`articleStepCard${section.kind ? ` ${section.kind}` : ''}`}><div className="articleStepNumber">{String(index + 1).padStart(2, '0')}</div><div><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items?.length > 0 && <ul className="visualChecklist">{section.items.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>}</div></section>)}</div>
            {page.checklist?.length > 0 && <section className="articleChecklist"><span className="kicker">{english ? 'Before movement' : 'Antes de movilizar'}</span><h2>{english ? 'Final technical checklist' : 'Checklist técnico final'}</h2><ul className="visualChecklist">{page.checklist.map((item) => <li key={item}><Check size={18} aria-hidden="true" />{item}</li>)}</ul></section>}
            <section className="articleRelatedServices"><h2>{english ? 'Related services' : 'Servicios relacionados'}</h2><div className="relatedLinks">{relatedServices.map((service) => <Link key={service.path} to={service.path}>{service.serviceType}</Link>)}</div></section>
            {page.faq.length > 0 && <section className="articleFaq"><h2>{english ? 'Frequently asked questions' : 'Preguntas frecuentes'}</h2><div className="faqGrid">{page.faq.map(({ question, answer }) => <details className="panel" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>}
            <aside className="articleContact"><p>{english ? 'Need to clarify a technical point about your movement?' : '¿Necesitas aclarar un dato técnico de tu operación?'}</p><a href="tel:+34624473123"><Phone size={16} aria-hidden="true" />+34 624 473 123</a><a href="mailto:transporte@ibercarga.com"><Mail size={16} aria-hidden="true" />transporte@ibercarga.com</a></aside>
          </div>
        </div>
      </article>
      <OfficialSources sources={page.sources} language={page.language} />
      <section className="section relatedGuideSection"><div className="wrap"><div className="guideHubHeading"><span className="kicker">{english ? 'Keep planning' : 'Sigue planificando'}</span><h2 className="display">{english ? 'Other technical guides' : 'Otras guías técnicas'}</h2></div><GuideCards guides={relatedGuides} language={page.language} /></div></section>
    </main><Footer language={page.language} home={false} />
  </div>;
}
