import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import QuoteForm from '../components/QuoteForm';
import { findService, services } from '../data/services';
import Seo from '../seo/Seo';
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from '../seo/schema';

export default function ServicePage({ language = 'es' }) {
  const { slug } = useParams();
  const service = findService(language, slug);
  if (!service) return <Navigate to={language === 'es' ? '/' : '/en/'} replace/>;
  const prefix = language === 'es' ? '' : '/en';
  const path = `${prefix}/${service.slug}/`;
  const alternate = services[language === 'es' ? 'en' : 'es'][services[language].findIndex((s) => s.slug === slug)];
  const alternatePath = alternate ? `${language === 'es' ? '/en' : ''}/${alternate.slug}/` : undefined;
  const es = language === 'es';
  const schema = [organizationSchema, serviceSchema(service, language, path), breadcrumbSchema([{ name: es ? 'Inicio' : 'Home', path: es ? '/' : '/en/' }, { name: service.title, path }]), faqSchema(service.faq)];
  return <>
    <Seo title={service.title} description={service.description} path={path} language={language} alternatePath={alternatePath} schema={schema}/>
    <Header language={language}/><main>
      <section className="bg-slate-950 px-4 py-16 text-white"><div className="mx-auto max-w-6xl"><Link to={es ? '/' : '/en/'} className="inline-flex items-center gap-2 text-indigo-200"><ArrowLeft size={17}/>{es ? 'Volver a inicio' : 'Back to home'}</Link><div className="mt-8 grid items-center gap-10 lg:grid-cols-2"><div><p className="font-semibold uppercase tracking-[.16em] text-indigo-300">{service.eyebrow}</p><h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">{service.heading}</h1><p className="mt-6 text-lg leading-relaxed text-slate-200">{service.intro}</p><div className="mt-7 flex flex-wrap gap-3"><a href="#presupuesto" className="rounded-xl bg-white px-5 py-3 font-semibold text-indigo-900">{es ? 'Hablar con un consultor' : 'Speak to a consultant'}</a><a href="tel:+34624473123" className="inline-flex items-center gap-2 rounded-xl border border-white/50 px-5 py-3"><Phone size={17}/>+34 624 473 123</a></div></div><img src={service.image} alt={service.title} className="h-[380px] w-full rounded-3xl object-cover shadow-2xl"/></div></div></section>
      <section className="px-4 py-16"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_.9fr]"><div><h2 className="font-display text-3xl">{es ? 'Qué revisamos para preparar la propuesta' : 'What we review before preparing the proposal'}</h2><ul className="mt-6 space-y-4">{service.bullets.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-indigo-700"/><span className="text-slate-700">{item}</span></li>)}</ul><p className="mt-8 rounded-xl bg-slate-100 p-5 text-sm text-slate-600">{es ? 'Ibercarga actúa como interlocutor y coordinador comercial de la solicitud. La disponibilidad, alcance y condiciones definitivas se confirman en cada propuesta.' : 'Ibercarga acts as the commercial contact and coordinator for the request. Availability, scope and final conditions are confirmed in each proposal.'}</p></div><div id="presupuesto"><QuoteForm language={language} source={service.slug}/></div></div></section>
      <section className="bg-slate-50 px-4 py-16"><div className="mx-auto max-w-4xl"><h2 className="font-display text-3xl">{es ? 'Preguntas frecuentes' : 'Frequently asked questions'}</h2><div className="mt-7 space-y-4">{service.faq.map(([q,a]) => <details key={q} className="rounded-xl border bg-white p-5"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-3 text-slate-600">{a}</p></details>)}</div></div></section>
    </main><Footer language={language}/>
  </>;
}
