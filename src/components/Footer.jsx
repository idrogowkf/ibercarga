import { Mail, Phone, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

export default function Footer({ language = 'es' }) {
  const prefix = language === 'es' ? '' : '/en';
  return <footer className="bg-indigo-950 text-indigo-100">
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
      <div><div className="flex items-center gap-2"><Truck/><span className="font-display text-xl">IBERCARGA</span></div><p className="mt-3 text-sm text-indigo-200">{language === 'es' ? 'Coordinación de transporte especial con atención directa de un consultor.' : 'Special transport coordination with direct consultant support.'}</p></div>
      <div><h2 className="font-semibold">{language === 'es' ? 'Servicios' : 'Services'}</h2><ul className="mt-3 space-y-2 text-sm text-indigo-200">{services[language].map((s) => <li key={s.slug}><Link to={`${prefix}/${s.slug}/`} className="hover:text-white">{s.title}</Link></li>)}</ul></div>
      <div><h2 className="font-semibold">{language === 'es' ? 'Contacto' : 'Contact'}</h2><p className="mt-3 flex items-center gap-2"><Phone size={17}/>+34 624 473 123</p><p className="mt-2 flex items-center gap-2"><Mail size={17}/><a href="mailto:contacto@ibercarga.com">contacto@ibercarga.com</a></p></div>
    </div><div className="border-t border-indigo-800 px-4 py-4 text-center text-xs text-indigo-300">© {new Date().getFullYear()} Ibercarga.</div>
  </footer>;
}
