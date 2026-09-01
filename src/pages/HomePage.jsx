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
    [ArrowRight, 'Ejecución coordinada', 'Coordinamos medios, personal y comunicaciones de acuerdo con la planificación de la operación.'],
  ];
  return <section id="como-funciona" className="section"><div className="wrap techShell"><div className="techHead"><h2 className="display">{english ? 'How does it work?' : '¿Cómo funciona?'}</h2></div><div className="techGrid processGrid">{steps.map(([Icon, title, text]) => <article key={title} className="techCard"><div className="icon"><Icon size={22} /></div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="cta"><strong>{english ? 'Tell us about your operation' : 'Cuéntanos tu operación'}</strong><a href="#presupuesto" className="btn">{english ? 'Request a quote' : 'Solicitar presupuesto'}</a></div></div></section>;
}

function Gallery({ language }) {
  const english = language === 'en';
  const images = english ? [
    ['/gallery/industrial.jpg', 'Industrial transport', '/en/industrial-transport'], ['/gallery/prefabricado.jpg', 'Precast concrete', '/en/precast-concrete-transport'], ['/gallery/eolico.jpg', 'Wind energy', '/en/wind-turbine-transport'], ['/gallery/transformador.jpg', 'Transformer', '/en/transformer-transport'], ['/gallery/maquinaria-pesada.jpg', 'Heavy equipment', '/en/heavy-machinery-transport'], ['/gallery/estructura-metalica.jpg', 'Steel structure', '/en/steel-structure-transport'],
  ] : [
    ['/gallery/industrial.jpg', 'Transporte industrial', '/transporte-industrial'], ['/gallery/prefabricado.jpg', 'Prefabricado de hormigón', '/transporte-prefabricados'], ['/gallery/eolico.jpg', 'Eólico', '/transporte-eolico'], ['/gallery/transformador.jpg', 'Transformador', '/transporte-transformadores'], ['/gallery/maquinaria-pesada.jpg', 'Maquinaria pesada', '/transporte-maquinaria-pesada'], ['/gallery/estructura-metalica.jpg', 'Estructura metálica', '/transporte-estructuras-metalicas'],
  ];
  return <section id="galeria" className="section soft"><div className="wrap"><div className="center"><span className="kicker">Ibercarga</span><h2 className="display">{english ? 'Transport solutions by cargo type' : 'Soluciones por tipo de carga'}</h2></div><div className="caseGrid galleryGrid">{images.map(([src, alt, path]) => <article key={src} className="case"><a className="galleryLink" href={path}><img src={src} alt={alt} width="640" height="448" loading="lazy" /><div className="caseBody"><span className="caseType">{alt}</span><strong>{english ? 'View service' : 'Ver servicio'} <ArrowRight size={15} aria-hidden="true" /></strong></div></a></article>)}</div></div></section>;
}

function PlanningCriteria({ language }) {
  const items = language === 'en' ? [
    ['Cargo information', 'Dimensions, mass, support points and handling restrictions define the starting transport configuration.'],
    ['Route feasibility', 'Clearances, swept paths, structures and final access are checked against the loaded combination.'],
    ['Arrival coordination', 'Factory, haulage, crane and site teams work to one delivery and contingency sequence.'],
  ] : [
    ['Información de carga', 'Dimensiones, masa, apoyos y restricciones de manipulación definen la configuración inicial de transporte.'],
    ['Viabilidad del recorrido', 'Gálibos, giros, estructuras y último acceso se comprueban frente al conjunto cargado.'],
    ['Coordinación de llegada', 'Fábrica, transporte, grúa y obra trabajan con una única secuencia de entrega y contingencia.'],
  ];
  return <section data-section="criterios" className="section"><div className="wrap"><div className="center"><span className="kicker">Ibercarga</span><h2 className="display">{language === 'en' ? 'Technical planning criteria' : 'Criterios de planificación técnica'}</h2></div><div className="bottomGrid testimonialGrid">{items.map(([title, text]) => <article key={title} className="panel"><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}

function FAQ({ page }) {
  return <section id="faq" className="section soft"><div className="wrap"><div className="center"><span className="kicker">FAQ</span><h2 className="display">{page.language === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes'}</h2></div><div className="faqGrid">{page.faq.map(({ question, answer }) => <article key={question} className="panel"><h3>{question}</h3><p>{answer}</p></article>)}</div></div></section>;
}

export default function HomePage({ page }) {
  return <div data-layout="v12" className="v12-shell"><Seo page={page} /><Header language={page.language} /><main><Hero page={page}><CTA language={page.language} /></Hero><Prices language={page.language} /><Process language={page.language} /><Gallery language={page.language} /><PlanningCriteria language={page.language} /><FAQ page={page} /></main><Footer language={page.language} /></div>;
}
