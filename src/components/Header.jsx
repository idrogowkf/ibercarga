import { Menu, Phone, Truck, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ language = 'es' }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const home = language === 'es' ? '/' : '/en/';
  const servicesLabel = language === 'es' ? 'Servicios' : 'Services';
  const quoteLabel = language === 'es' ? 'Presupuesto' : 'Quote';
  const languageHref = language === 'es' ? '/en/' : '/';

  return (
    <header className="sticky top-0 z-40 bg-indigo-900 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={home} className="flex items-center gap-2" aria-label="Ibercarga home"><Truck size={23}/><span className="font-display text-xl">IBERCARGA</span></Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link to={home} className="hover:text-indigo-200">{language === 'es' ? 'Inicio' : 'Home'}</Link>
          <a href="#servicios" className="hover:text-indigo-200">{servicesLabel}</a>
          <a href="#presupuesto" className="hover:text-indigo-200">{quoteLabel}</a>
          <Link to={languageHref} className="rounded border border-indigo-500 px-2 py-1 text-sm">{language === 'es' ? 'EN' : 'ES'}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:+34624473123" className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-indigo-900"><Phone size={17}/><span className="hidden sm:inline">+34 624 473 123</span></a>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {open && <nav className="space-y-3 border-t border-indigo-700 px-4 py-4 md:hidden">
        <Link onClick={() => setOpen(false)} to={home} className="block">{language === 'es' ? 'Inicio' : 'Home'}</Link>
        <a onClick={() => setOpen(false)} href="#servicios" className="block">{servicesLabel}</a>
        <a onClick={() => setOpen(false)} href="#presupuesto" className="block">{quoteLabel}</a>
        <Link onClick={() => setOpen(false)} to={languageHref} className="block">{language === 'es' ? 'English' : 'Español'}</Link>
      </nav>}
    </header>
  );
}
