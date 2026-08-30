import React from 'react';
import { ArrowRight, Info, Truck } from 'lucide-react';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Seo from '../seo/Seo';

function Prices({ language }) {
  const english = language === 'en';
  const cards = english ? [
    ['28–32 m precast beam', 'Route: 250–400 km', '€7,500–9,500', 'Extendable beam trailer', 'Permits and pilot car'],
    ['55–65 m wind blade', 'Route: 150–300 km', '€8,500–12,000', 'Wind blade transporter', 'Special permits'],
    ['60–90 t transformer', 'Route: 100–250 km', '€11,000–16,000', '10–12 line multi-axle', 'Route study'],
  ] : [
    ['Viga prefabricada 28–32 m', 'Ruta: 250–400 km', '7.500–9.500 €', 'Portavigas extensible', 'Permisos + coche piloto'],
    ['Pala eólica 55–65 m', 'Ruta: 150–300 km', '8.500–12.000 €', 'Transportador de palas', 'Permisos especiales'],
    ['Transformador 60–90 t', 'Ruta: 100–250 km', '11.000–16.000 €', 'Multiaxial 10–12 líneas', 'Estudio de itinerario'],
  ];
  return <section id="precios" className="section soft"><div className="wrap"><div className="center"><span className="kicker">Ibercarga</span><h2 className="display">{english ? 'Indicative prices' : 'Precios orientativos'}</h2><p className="lead">{english ? 'These figures are approximate and vary with dimensions, permits, loading and unloading.' : 'Estos importes son aproximados y pueden variar según dimensiones, permisos y operativas de carga/descarga.'}</p></div><div className="caseGrid">{cards.map(([title, route, price, item1, item2]) => <article key={title} className="case"><div className="caseBody"><span className="caseType">{english ? 'Reference operation' : 'Operación de referencia'}</span><h3>{title}</h3><div className="route">{route}</div><p className="permit">{item1} · {item2}</p><div className="priceLine"><small>{english ? 'Indicative price' : 'Precio orientativo'}</small><strong>{price}</strong></div></div></article>)}</div></div></section>;
}

function Process({ language }) {
  const english = language === 'en';
  const steps = english ? [
    [Info, 'Describe your transport', 'Provide origin, destination, cargo and requested date.'],
    [Truck, 'Planning and permits', 'The route, permits and pilot cars are reviewed when required.'],
    [ArrowRight, 'Coordinated execution', 'Specialist equipment and personnel are coordinated for the movement.'],
  ] : [
    [Info, 'Publica tu servicio', 'Rellena origen, destino, tipo de carga y fecha. Recibirás confirmación por email.'],
    [Truck, 'Planificación y permisos', 'Estudiamos el itinerario y gestionamos permisos y coches piloto si son necesarios.'],
    [ArrowRight, 'Ejecución segura', 'Transportamos con flota especializada y personal experto en cargas especiales.'],
  ];
  return <section id="como-funciona" className="section"><div className="wrap techShell"><div className="techHead"><h2 className="display">{english ? 'How does it work?' : '¿Cómo funciona?'}</h2></div><div className="techGrid processGrid">{steps.map(([Icon, title, text]) => <article key={title} className="techCard"><div className="icon"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="cta"><strong>{english ? 'Tell us about your operation' : 'Cuéntanos tu operación'}</strong><a href="#presupuesto" className="btn">{english ? 'Request a quote' : 'Solicitar presupuesto'}</a></div></div></section>;
}

function Gallery({ language }) {
  const images = [['/gallery/industrial.jpg', language === 'en' ? 'Industrial transport' : 'Transporte industrial'], ['/gallery/prefabricado.jpg', language === 'en' ? 'Precast concrete' : 'Prefabricado de hormigón'], ['/gallery/eolico.jpg', language === 'en' ? 'Wind energy' : 'Eólico'], ['/gallery/transformador.jpg', language === 'en' ? 'Transformer' : 'Transformador'], ['/gallery/maquinaria-pesada.jpg', language === 'en' ? 'Heavy equipment' : 'Maquinaria pesada'], ['/gallery/estructura-metalica.jpg', language === 'en' ? 'Steel structure' : 'Estructura metálica']];
  return <section id="galeria" className="section soft"><div className="wrap"><div className="center"><span className="kicker">Ibercarga</span><h2 className="display">{language === 'en' ? 'Recent work' : 'Trabajos recientes'}</h2></div><div className="caseGrid galleryGrid">{images.map(([src, alt]) => <article key={src} className="case"><img src={src} alt={alt} width="640" height="448" loading="lazy" /><div className="caseBody"><span className="caseType">{alt}</span></div></article>)}</div></div></section>;
}

function Testimonials({ language }) {
  const items = language === 'en' ? [
    ['Hormigones Norte S.A.', 'Ibercarga coordinated twelve 30 m beams, meeting the agreed schedule and permit requirements.', 'Laura M. – Site Manager'],
    ['Parque Eólico Cantábrico', 'Clear coordination for wind blades, route, escorts and substation manoeuvres.', 'Diego R. – Site Manager'],
    ['ElectroRed Ibérica', 'An 85 t transformer movement with technical study and consistent communication.', 'Marta M. – Logistics Manager'],
  ] : [
    ['Hormigones Norte S.A.', 'Ibercarga nos movió 12 vigas de 30 m con una coordinación impecable. Cumplieron plazos y permisos sin sorpresas.', 'Laura M. – Jefa de Obra'],
    ['Parque Eólico Cantábrico', 'Excelente en las palas eólicas. Itinerario, escoltas y maniobras en subestación con máxima seguridad.', 'Diego R. – Site Manager'],
    ['ElectroRed Ibérica', 'Traslado de transformador 85 t con multiaxial y estudio técnico. Comunicación clara y cero incidencias.', 'Marta M. – Responsable Logística'],
  ];
  return <section data-section="testimonios" className="section"><div className="wrap"><div className="center"><span className="kicker">Ibercarga</span><h2 className="display">{language === 'en' ? 'Testimonials' : 'Testimonios'}</h2></div><div className="bottomGrid testimonialGrid">{items.map(([company, text, person]) => <article key={company} className="panel"><p>“{text}”</p><h3>{company}</h3><p>{person}</p></article>)}</div></div></section>;
}

function FAQ({ page }) {
  return <section id="faq" className="section soft"><div className="wrap"><div className="center"><span className="kicker">FAQ</span><h2 className="display">{page.language === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes'}</h2></div><div className="faqGrid">{page.faq.map(({ question, answer }) => <article key={question} className="panel"><h3>{question}</h3><p>{answer}</p></article>)}</div></div></section>;
}

export default function HomePage({ page }) {
  return <div data-layout="v12" className="v12-shell"><Seo page={page} /><Header language={page.language} /><main><Hero page={page}><CTA language={page.language} /></Hero><Prices language={page.language} /><Process language={page.language} /><Gallery language={page.language} /><Testimonials language={page.language} /><FAQ page={page} /></main><Footer language={page.language} /></div>;
}
