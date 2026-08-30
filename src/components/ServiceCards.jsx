import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

export default function ServiceCards({ language = 'es' }) {
  const prefix = language === 'es' ? '' : '/en';
  return <section id="servicios" className="bg-slate-50 px-4 py-16"><div className="mx-auto max-w-6xl">
    <p className="font-semibold uppercase tracking-wider text-indigo-700">{language === 'es' ? 'Servicios especializados' : 'Specialised services'}</p>
    <h2 className="mt-2 font-display text-3xl md:text-4xl">{language === 'es' ? 'Una página específica para cada necesidad' : 'A dedicated page for each transport need'}</h2>
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services[language].map((s) => <Link key={s.slug} to={`${prefix}/${s.slug}/`} className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><img src={s.image} alt="" className="h-44 w-full object-cover" loading="lazy"/><div className="p-5"><h3 className="text-xl font-bold text-slate-900">{s.title}</h3><p className="mt-2 text-sm text-slate-600">{s.description}</p><span className="mt-4 inline-flex items-center gap-2 font-semibold text-indigo-700">{language === 'es' ? 'Ver servicio' : 'View service'}<ArrowRight size={17}/></span></div></Link>)}</div>
  </div></section>;
}
