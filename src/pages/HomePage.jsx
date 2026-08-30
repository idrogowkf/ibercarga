import { ArrowRight, CheckCircle2, ClipboardList, Route, UserRound } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import QuoteForm from '../components/QuoteForm';
import ServiceCards from '../components/ServiceCards';
import Seo from '../seo/Seo';
import { organizationSchema } from '../seo/schema';

export default function HomePage({ language = 'es' }) {
  const es = language === 'es';
  return <>
    <Seo title={es ? 'Transporte especial y sobredimensionado' : 'Special and oversized transport in Spain'} description={es ? 'Solicita una propuesta para transporte especial, sobredimensionado, prefabricados, transformadores y maquinaria. Atención directa de un consultor.' : 'Request a tailored proposal for special, oversized, precast, transformer and heavy equipment transport in Spain.'} path={es ? '/' : '/en/'} language={language} alternatePath={es ? '/en/' : '/'} schema={[organizationSchema]} />
    <Header language={language}/>
    <main>
      <section className="relative bg-slate-950"><img src="/hero/ibercarga-aspa.jpg" alt="Transporte especial de un componente eólico" className="absolute inset-0 h-full w-full object-cover opacity-45"/><div className="relative mx-auto grid min-h-[680px] max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.1fr_.9fr]">
        <div className="text-white"><p className="font-semibold uppercase tracking-[.18em] text-indigo-200">{es ? 'España y Europa' : 'Spain and Europe'}</p><h1 className="mt-4 font-display text-5xl leading-tight md:text-7xl">{es ? 'Transporte especial. Respuesta personal.' : 'Special transport. Personal response.'}</h1><p className="mt-6 max-w-2xl text-xl text-slate-100">{es ? 'Cuéntanos qué necesitas mover. Un consultor revisará personalmente la carga, la ruta y la fecha para coordinar una propuesta.' : 'Tell us what you need to move. A consultant will personally review the cargo, route and date to coordinate a proposal.'}</p><div className="mt-8 flex flex-wrap gap-3"><a href="#presupuesto" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-900">{es ? 'Hablar con un consultor' : 'Speak to a consultant'}<ArrowRight size={18}/></a><a href="tel:+34624473123" className="rounded-xl border border-white/60 px-5 py-3 font-semibold">+34 624 473 123</a></div></div>
        <div id="presupuesto"><QuoteForm language={language} source={es ? 'home-es' : 'home-en'}/></div>
      </div></section>
      <ServiceCards language={language}/>
      <section className="bg-white px-4 py-16"><div className="mx-auto max-w-6xl"><h2 className="font-display text-3xl md:text-4xl">{es ? 'Cómo trabajamos' : 'How we work'}</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{[
        [ClipboardList, es ? 'Recibimos los datos' : 'We receive the details', es ? 'Origen, destino, carga, dimensiones, peso y fecha.' : 'Origin, destination, cargo, dimensions, weight and date.'],
        [Route, es ? 'Revisamos la operación' : 'We review the operation', es ? 'Consultamos medios, ruta, permisos y condicionantes.' : 'We consider equipment, route, permits and constraints.'],
        [UserRound, es ? 'Hablas con un consultor' : 'You speak to a consultant', es ? 'Recibes atención directa para completar y valorar la propuesta.' : 'You receive direct support to complete and assess the proposal.']
      ].map(([Icon, title, text]) => <article key={title} className="rounded-2xl border p-6"><Icon className="text-indigo-700"/><h3 className="mt-4 text-xl font-bold">{title}</h3><p className="mt-2 text-slate-600">{text}</p></article>)}</div></div></section>
      <section className="bg-indigo-900 px-4 py-14 text-white"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><p className="flex items-center gap-2 text-indigo-200"><CheckCircle2 size={18}/>{es ? 'Sin precios automáticos ni respuestas genéricas' : 'No instant prices or generic answers'}</p><h2 className="mt-2 font-display text-3xl">{es ? 'Tu operación merece una revisión real' : 'Your operation deserves a real review'}</h2></div><a href="#presupuesto" className="rounded-xl bg-white px-5 py-3 font-semibold text-indigo-900">{es ? 'Solicitar presupuesto' : 'Request a quote'}</a></div></section>
    </main><Footer language={language}/>
  </>;
}
