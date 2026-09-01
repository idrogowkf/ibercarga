import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCTA from '../components/ArticleCTA';
import AuthorBox from '../components/AuthorBox';
import Footer from '../components/Footer';
import Header from '../components/Header';
import OfficialSources from '../components/OfficialSources';
import QuoteForm from '../components/QuoteForm';
import { findServiceByPath } from '../data/services';
import Seo from '../seo/Seo';

export default function GuidePage({ page }) {
  const english = page.language === 'en';
  const related = page.relatedServicePaths.map(findServiceByPath).filter(Boolean);
  return <div data-layout="v12" className="v12-shell"><Seo page={page} /><Header language={page.language} home={false} alternatePath={page.alternatePath} /><main><article><header className="articleHero"><div className="wrap articleWrap"><p className="eyebrow">{page.eyebrow}</p><h1 className="display heroTitle">{page.heading}</h1><p className="heroDesc">{page.intro}</p><p className="articleMeta"><Link to={page.author.path}>{page.author.heading}</Link> · {english ? 'Published' : 'Publicado'} {page.publishedDate} · {english ? 'Reviewed' : 'Revisado'} {page.reviewedDate}</p><ArticleCTA language={page.language} text={page.cta.initial} /></div></header><div className="wrap articleWrap articleBody">{page.sections.map((section, index) => <section key={section.heading} className={section.kind ? `articleSection ${section.kind}` : 'articleSection'}><h2>{section.heading}</h2>{section.paragraphs.map((text) => <p key={text}>{text}</p>)}{section.items?.length > 0 && <ul className="checkList">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}{index === page.cta.afterSection && <ArticleCTA language={page.language} text={page.cta.contextual} />}</section>)}{page.checklist?.length > 0 && <section className="articleSection checklistPanel"><h2>{english ? 'Final checklist' : 'Checklist final'}</h2><ul className="checkList">{page.checklist.map((item) => <li key={item}>{item}</li>)}</ul></section>}<section className="articleSection"><h2>{english ? 'Related services' : 'Servicios relacionados'}</h2><div className="relatedLinks">{related.map((service) => <Link key={service.path} to={service.path}>{service.serviceType}</Link>)}</div></section>{page.faq.length > 0 && <section className="articleSection"><h2>{english ? 'Frequently asked questions' : 'Preguntas frecuentes'}</h2><div className="faqGrid">{page.faq.map(({ question, answer }) => <details className="panel" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>}<AuthorBox author={page.author} /><ArticleCTA language={page.language} text={page.cta.final} /><QuoteForm language={page.language} /></div></article><OfficialSources sources={page.sources} language={page.language} /></main><Footer language={page.language} home={false} /></div>;
}
