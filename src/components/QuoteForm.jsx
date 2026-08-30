import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Alert from './Alert';

const initialForm = {
  origen: '', destino: '', tipo: '', vehiculo: 'Góndola cama baja', piezas: 1,
  fecha: '', nombre: '', telefono: '', email: ''
};

export default function QuoteForm({ language = 'es', source = 'website' }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const copy = language === 'es' ? {
    origin: 'Origen (Ciudad o CP)', destination: 'Destino (Ciudad o CP)', cargo: 'Tipo de carga, dimensiones y peso',
    vehicle: 'Vehículo orientativo', pieces: 'Número de piezas', date: 'Fecha prevista', name: 'Nombre o empresa',
    phone: 'Teléfono', email: 'Correo electrónico', submit: 'Hablar con un consultor', sending: 'Enviando…',
    success: 'Solicitud enviada. Un consultor de Ibercarga revisará la información y se pondrá en contacto contigo.',
    error: 'No pudimos enviar la solicitud. Llámanos al +34 624 473 123 o inténtalo de nuevo.'
  } : {
    origin: 'Origin (city or postcode)', destination: 'Destination (city or postcode)', cargo: 'Cargo type, dimensions and weight',
    vehicle: 'Indicative equipment', pieces: 'Number of pieces', date: 'Preferred date', name: 'Name or company',
    phone: 'Telephone', email: 'Email address', submit: 'Speak to a consultant', sending: 'Sending…',
    success: 'Request sent. An Ibercarga consultant will review the details and contact you.',
    error: 'The request could not be sent. Call +34 624 473 123 or try again.'
  };

  function update(event) {
    const { name, value, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'number' ? Number(value) : value }));
  }

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source, language })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error('Quote request failed');
      setResult({ type: 'success', text: copy.success });
      setForm(initialForm);
      window.dataLayer?.push({ event: 'quote_request_success', quote_source: source, language });
    } catch (error) {
      console.error(error);
      setResult({ type: 'error', text: copy.error });
      window.dataLayer?.push({ event: 'quote_request_error', quote_source: source, language });
    } finally {
      setLoading(false);
    }
  }

  const field = 'w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200';

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-4 rounded-2xl bg-white p-6 shadow-xl md:grid-cols-2">
      <input name="origen" value={form.origen} onChange={update} className={field} placeholder={copy.origin} required />
      <input name="destino" value={form.destino} onChange={update} className={field} placeholder={copy.destination} required />
      <textarea name="tipo" value={form.tipo} onChange={update} className={`${field} md:col-span-2`} placeholder={copy.cargo} rows="3" required />
      <div>
        <label className="mb-1 block text-sm text-slate-600">{copy.vehicle}</label>
        <select name="vehiculo" value={form.vehiculo} onChange={update} className={`${field} bg-white`}>
          <option>Góndola cama baja</option><option>Portavigas extensible</option><option>Plataforma extensible</option>
          <option>Modular hidráulico / SPMT</option><option>Transportador eólico</option><option>Por determinar</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-slate-600">{copy.pieces}</label>
        <input name="piezas" type="number" min="1" value={form.piezas} onChange={update} className={field} required />
      </div>
      <div><label className="mb-1 block text-sm text-slate-600">{copy.date}</label><input name="fecha" type="date" value={form.fecha} onChange={update} className={field} required /></div>
      <input name="nombre" value={form.nombre} onChange={update} className={field} placeholder={copy.name} required />
      <input name="telefono" value={form.telefono} onChange={update} className={field} placeholder={copy.phone} required />
      <input name="email" type="email" value={form.email} onChange={update} className={field} placeholder={copy.email} required />
      <button disabled={loading} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800 disabled:opacity-60 md:col-span-2">
        {loading ? copy.sending : <>{copy.submit}<ArrowRight size={18} /></>}
      </button>
      {result && <Alert type={result.type} onClose={() => setResult(null)}>{result.text}</Alert>}
    </form>
  );
}
