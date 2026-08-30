import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Alert from './Alert';

const initialForm = { origen: '', destino: '', tipo: '', vehiculo: 'Góndola cama baja', piezas: 1, fecha: '', nombre: '', telefono: '', email: '' };

const copy = {
  es: {
    origin: 'Origen (Ciudad o CP)', destination: 'Destino (Ciudad o CP)', cargo: 'Tipo de carga (ej. vigas 30m, 4 uds)',
    vehicle: 'Vehículo', pieces: 'Número de piezas', date: 'Fecha del servicio', name: 'Nombre o empresa', phone: 'Teléfono',
    email: 'Correo electrónico', submit: 'Obtener presupuesto', sending: 'Enviando...',
    success: '¡Solicitud enviada! Te hemos enviado una copia por email y el equipo de Ibercarga la está revisando.',
    error: 'No pudimos enviar tu solicitud. Inténtalo de nuevo en un momento.', apiError: 'La API no devolvió ok=true',
  },
  en: {
    origin: 'Origin (city or postcode)', destination: 'Destination (city or postcode)', cargo: 'Cargo type (for example, a 30 m beam)',
    vehicle: 'Vehicle', pieces: 'Number of pieces', date: 'Service date', name: 'Name or company', phone: 'Telephone',
    email: 'Email address', submit: 'Request a quote', sending: 'Sending...',
    success: 'Request sent. We have emailed you a copy and the Ibercarga team is reviewing the operation.',
    error: 'We could not send your request. Please try again in a moment.', apiError: 'The API did not return ok=true',
  },
};

const vehicleOptions = [
  ['Góndola cama baja', 'Low-loader'], ['Portavigas extensible', 'Extendable beam trailer'],
  ['Plataforma extensible', 'Extendable flatbed'], ['Modular hidráulico (SPMT)', 'Self-propelled modular transporter (SPMT)'],
  ['Transportador de palas eólicas', 'Wind turbine blade transporter'], ['Multiaxial (8-14 ejes)', 'Multi-axle trailer (8-14 axles)'],
];

export default function QuoteForm({ language = 'es' }) {
  const labels = copy[language] || copy.es;
  const english = language === 'en';
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState(initialForm);
  function onChange(event) {
    const { name, value, type } = event.target;
    setForm((current) => ({ ...current, [name]: name === 'piezas' || type === 'number' ? Number(value) : value }));
  }
  async function onSubmit(event) {
    event.preventDefault(); setOk(null); setMsg('');
    try {
      setLoading(true);
      const response = await fetch('/api/send-quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!response.ok) { const text = await response.text().catch(() => ''); throw new Error(`Error HTTP ${response.status}${text ? `: ${text}` : ''}`); }
      const data = await response.json().catch(() => ({}));
      if (!data?.ok) throw new Error(labels.apiError);
      setOk(true); setMsg(labels.success);
      setForm((current) => ({ ...current, tipo: '', piezas: 1, fecha: '', nombre: '', telefono: '', email: '' }));
    } catch (error) {
      console.error(error); setOk(false); setMsg(labels.error);
    } finally { setLoading(false); }
  }
  return (
    <form id="presupuesto" onSubmit={onSubmit} className="quoteCard">
      <h2>{english ? 'Request a tailored transport quote' : 'Obtén tu presupuesto en minutos'}</h2>
      <p>{english ? 'Complete the essential details. We will only request the technical information required for the operation.' : 'Completa los datos esenciales. Después solicitaremos únicamente la información técnica necesaria para la operación.'}</p>
      <div className="steps" aria-hidden="true"><span className="step on">1</span><span className="line" /><span className="step">2</span><span className="line" /><span className="step">3</span></div>
      <div className="quoteGrid">
        <div><label htmlFor="origen">{labels.origin}</label><input id="origen" name="origen" value={form.origen} onChange={onChange} placeholder={labels.origin} required /></div>
        <div><label htmlFor="destino">{labels.destination}</label><input id="destino" name="destino" value={form.destino} onChange={onChange} placeholder={labels.destination} required /></div>
      </div>
      <label htmlFor="tipo">{labels.cargo}</label><input id="tipo" name="tipo" value={form.tipo} onChange={onChange} placeholder={labels.cargo} required />
      <div className="quoteGrid">
        <div><label htmlFor="vehiculo">{labels.vehicle}</label><select id="vehiculo" name="vehiculo" value={form.vehiculo} onChange={onChange} required>{vehicleOptions.map(([value, translated]) => <option key={value} value={value}>{english ? translated : value}</option>)}</select></div>
        <div><label htmlFor="piezas">{labels.pieces}</label><input id="piezas" name="piezas" type="number" min={1} step={1} value={form.piezas} onChange={onChange} required /></div>
        <div><label htmlFor="fecha">{labels.date}</label><input id="fecha" name="fecha" type="date" value={form.fecha} onChange={onChange} required /></div>
        <div><label htmlFor="nombre">{labels.name}</label><input id="nombre" name="nombre" value={form.nombre} onChange={onChange} placeholder={labels.name} required /></div>
        <div><label htmlFor="telefono">{labels.phone}</label><input id="telefono" name="telefono" value={form.telefono} onChange={onChange} placeholder={labels.phone} required /></div>
        <div><label htmlFor="email">{labels.email}</label><input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder={labels.email} required /></div>
      </div>
      <button type="submit" disabled={loading} className="btn btnPrimary">{loading ? labels.sending : <>{labels.submit} <ArrowRight size={18} /></>}</button>
      <div className="secure">{english ? 'Secure request · Direct technical review' : 'Solicitud segura · Revisión técnica directa'}</div>
      {ok === true && <Alert type="success" onClose={() => setOk(null)}>{msg}</Alert>}
      {ok === false && <Alert type="error" onClose={() => setOk(null)}>{msg}</Alert>}
    </form>
  );
}
