import React from 'react';
import { ArrowRight, FileCheck2, Map, Ruler, Warehouse } from 'lucide-react';

export default function TechnicalCentreFeature({ language = 'es' }) {
  const english = language === 'en';
  const topics = english
    ? [[FileCheck2, 'Permits'], [Map, 'Route surveys'], [Ruler, 'Quotation data'], [Warehouse, 'Precast logistics']]
    : [[FileCheck2, 'Permisos'], [Map, 'Estudios de ruta'], [Ruler, 'Datos para presupuestar'], [Warehouse, 'Logística de prefabricados']];
  return (
    <section id="centro-tecnico" className="technicalFeature section">
      <div className="wrap technicalFeatureShell">
        <div className="technicalFeatureVisual"><img src="/gallery/estructura-metalica.jpg" alt={english ? 'Technical planning for special transport' : 'Planificación técnica de transporte especial'} width="760" height="620" loading="lazy" /></div>
        <div className="technicalFeatureContent">
          <span className="kicker">{english ? 'Technical Centre' : 'Centro técnico'}</span>
          <h2 className="display">{english ? 'Practical knowledge before anything moves' : 'Conocimiento técnico para decidir antes de movilizar'}</h2>
          <p>{english ? 'Clear guides for preparing permits, checking routes and sending the information that makes an abnormal-load enquiry useful.' : 'Guías claras para preparar permisos, comprobar itinerarios y aportar los datos que convierten una consulta de transporte especial en una propuesta útil.'}</p>
          <div className="technicalTopics">{topics.map(([Icon, label]) => <span key={label}><Icon size={18} aria-hidden="true" />{label}</span>)}</div>
          <a className="btn technicalFeatureLink" href={english ? '/en/guides' : '/guias'}>{english ? 'Explore the Technical Centre' : 'Explorar el Centro técnico'} <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
