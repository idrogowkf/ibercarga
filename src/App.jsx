import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Truck, Search, MapPin, ShieldCheck, ArrowRight, Phone, Mail, Image as ImageIcon } from "lucide-react";

// -------------------- Config ----------------------
const PHONE = "+34 624 473 123";
const EMAIL = "transporte@ibercarga.com";

// Rutas de imágenes (pon los ficheros en /public/...)
const HERO_IMG = "/hero/ibercarga-aspa.jpg";
const GALLERY = [
    { src: "/gallery/industrial.jpg", title: "Industrial" },
    { src: "/gallery/prefabricado.jpg", title: "Prefabricado de hormigón" },
    { src: "/gallery/eolico.jpg", title: "Eólico (palas / tramos)" },
    { src: "/gallery/transformador.jpg", title: "Transformadores" },
    { src: "/gallery/maquinaria-pesada.jpg", title: "Maquinaria pesada" },
    { src: "/gallery/estructura-metalica.jpg", title: "Estructuras metálicas" },
];

// -------------------- UI ----------------------
function Navbar() {
    return (
        <header className="sticky top-0 z-40 bg-indigo-700 text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <Truck className="w-7 h-7 text-white" />
                        <span className="font-bold text-lg">Ibercarga</span>
                        <span className="hidden md:inline text-sm text-indigo-200">· Transporte Especial</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        <Link to="/" className="hover:text-indigo-200">Home</Link>
                        <Link to="/como-funciona" className="hover:text-indigo-200">Cómo funciona</Link>
                        <Link to="/ofertas" className="hover:text-indigo-200">Ofertas</Link>
                        <a href="#contacto" className="hover:text-indigo-200">Contacto</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

// -------------------- Pages ----------------------
function Home() {
    return (
        <div>
            {/* HERO */}
            <section className="relative w-full">
                <div className="relative h-[56vh] md:h-[72vh]">
                    <img
                        src={HERO_IMG}
                        alt="Camión Ibercarga transportando aspa de aerogenerador"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl mx-auto px-4">
                            <h1 className="font-display text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
                                Ibercarga
                            </h1>
                            <p className="font-display text-white/95 max-w-3xl mt-4 text-2xl md:text-3xl lg:text-4xl drop-shadow-[0_3px_16px_rgba(0,0,0,0.35)]">
                                Transporte especial y sobredimensionado en toda España:
                                eólico, prefabricado de hormigón, industrial, transformadores y más.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección formulario con FONDO ÍNDIGO */}
            <PresupuestoSection />

            {/* Cómo funciona (resumen) */}
            <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-10">
                <div className="text-center">
                    <Search className="w-10 h-10 mx-auto mb-4 text-indigo-700" />
                    <h3 className="font-semibold mb-2">1. Publica tu carga</h3>
                    <p className="text-gray-600 text-sm">Indica origen, destino, dimensiones, fechas y tipo de transporte especial.</p>
                </div>
                <div className="text-center">
                    <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-indigo-700" />
                    <h3 className="font-semibold mb-2">2. Recibe ofertas seguras</h3>
                    <p className="text-gray-600 text-sm">Transportistas verificados envían presupuestos. Elegimos la opción idónea contigo.</p>
                </div>
                <div className="text-center">
                    <ArrowRight className="w-10 h-10 mx-auto mb-4 text-indigo-700" />
                    <h3 className="font-semibold mb-2">3. Gestión total</h3>
                    <p className="text-gray-600 text-sm">Coordinación integral, permisos y seguimiento hasta la entrega.</p>
                </div>
            </section>

            {/* Galería */}
            <section className="bg-gray-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                        <ImageIcon className="w-5 h-5 text-indigo-700" />
                        <h2 className="text-2xl font-bold">Especialidades</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {GALLERY.map((g) => (
                            <figure key={g.src} className="group relative rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
                                <img src={g.src} alt={g.title} className="w-full h-56 object-cover group-hover:scale-[1.02] transition" />
                                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                                    <div className="font-semibold">{g.title}</div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            <FAQSection />

            <ContactoSection />
        </div>
    );
}

function PresupuestoSection() {
    const [form, setForm] = useState({
        origen: "", destino: "", tipo: "", vehiculo: "",
        piezas: "", fecha: "", nombre: "", telefono: "", email: ""
    });
    const [toast, setToast] = useState(null);

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    async function enviarPresupuesto(e) {
        e.preventDefault();
        setToast({ type: "loading", msg: "Enviando solicitud..." });
        try {
            const r = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await r.json();
            if (!r.ok || !data.ok) throw new Error(data.error || "Error al enviar");
            setToast({ type: "ok", msg: "¡Solicitud enviada! Te hemos enviado un correo de confirmación." });
            setForm({ origen: "", destino: "", tipo: "", vehiculo: "", piezas: "", fecha: "", nombre: "", telefono: "", email: "" });
        } catch {
            setToast({ type: "err", msg: "No se pudo enviar. Intenta de nuevo o llámanos al " + PHONE });
        }
    }

    return (
        <section className="bg-indigo-700 py-14 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Tarjeta blanca para destacar sobre el azul */}
                <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-indigo-100 px-5 py-6 md:px-10 md:py-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl text-gray-900">Obtener presupuesto</h2>
                            <p className="text-gray-600 mt-2 text-sm md:text-base">
                                Respuesta rápida. También puedes escribirnos a{" "}
                                <a className="underline font-medium" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                            </p>
                        </div>
                        <div className="hidden lg:block text-sm text-gray-600">
                            <div className="font-semibold text-gray-800">Atención directa</div>
                            <div>{PHONE}</div>
                            <div>{EMAIL}</div>
                        </div>
                    </div>

                    <form onSubmit={enviarPresupuesto} className="grid md:grid-cols-4 gap-4">
                        <input name="origen" value={form.origen} onChange={onChange} className="h-12 px-4 rounded-xl border focus:ring-2 focus:ring-indigo-200" placeholder="Origen" />
                        <input name="destino" value={form.destino} onChange={onChange} className="h-12 px-4 rounded-xl border focus:ring-2 focus:ring-indigo-200" placeholder="Destino" />
                        <input name="tipo" value={form.tipo} onChange={onChange} className="h-12 px-4 rounded-xl border focus:ring-2 focus:ring-indigo-200" placeholder="Tipo de carga" />
                        <input name="vehiculo" value={form.vehiculo} onChange={onChange} className="h-12 px-4 rounded-xl border focus:ring-2 focus:ring-indigo-200" placeholder="Selector de vehículo" />
                        <input name="piezas" value={form.piezas} onChange={onChange} className="h-12 px-4 rounded-xl border focus:ring-2 focus:ring-indigo-200" placeholder="Nº de piezas" />
                        <input type="date" name="fecha" value={form.fecha} onChange={onChange} className="h-12 px-4 rounded-xl border focus:ring-2 focus:ring-indigo-200" />
                        <input name="nombre" value={form.nombre} onChange={onChange} className="h-12 px-4 rounded-xl border focus:ring-2 focus:ring-indigo-200" placeholder="Nombre u organización" />
                        <input name="telefono" value={form.telefono} onChange={onChange} className="h-12 px-4 rounded-xl border focus:ring-2 focus:ring-indigo-200" placeholder="Teléfono de contacto" />
                        <input name="email" type="email" value={form.email} onChange={onChange} className="h-12 px-4 rounded-xl border focus:ring-2 focus:ring-indigo-200 md:col-span-2" placeholder="Correo electrónico" />
                        <button className="h-12 bg-indigo-700 text-white rounded-xl hover:bg-indigo-800 md:col-span-2 shadow-lg">
                            Obtener presupuesto
                        </button>
                    </form>

                    {toast && (
                        <div className={`mt-5 p-4 rounded-xl text-sm ${toast.type === "ok"
                                ? "bg-emerald-50 border border-emerald-200"
                                : toast.type === "err"
                                    ? "bg-rose-50 border border-rose-200"
                                    : "bg-gray-50 border"
                            }`}>
                            {toast.msg}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Preguntas frecuentes</h2>
                <div className="space-y-6 text-left">
                    <div>
                        <h3 className="font-medium">¿Qué tipo de cargas se pueden publicar?</h3>
                        <p className="text-sm text-gray-600">Todas las cargas especiales: prefabricado, eólico, maquinaria industrial, transformadores, etc.</p>
                    </div>
                    <div>
                        <h3 className="font-medium">¿Cómo verifican a los transportistas?</h3>
                        <p className="text-sm text-gray-600">Licencia, seguros y experiencia comprobada antes de aprobar perfiles y rutas.</p>
                    </div>
                    <div>
                        <h3 className="font-medium">¿Tiene coste publicar?</h3>
                        <p className="text-sm text-gray-600">Publicar es gratis. Solo pagas el transporte cuando confirmas la propuesta.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactoSection() {
    return (
        <section id="contacto" className="pt-16">
            <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-bold mb-3">Contacto</h2>
                    <p className="text-gray-600 mb-4">
                        ¿Tienes dudas o prefieres que te llamemos? Escríbenos y te respondemos rápido.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-700" /> {PHONE}</li>
                        <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-700" /> <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a></li>
                    </ul>
                </div>
                <div className="border rounded-2xl p-4">
                    <iframe
                        title="Mapa Ibercarga"
                        className="w-full h-64 rounded-xl"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-9.4%2C35.5%2C3.6%2C43.9&layer=mapnik"
                    />
                    <p className="text-xs text-gray-500 mt-2">Cobertura nacional: principales corredores y puertos de España.</p>
                </div>
            </div>

            {/* FOOTER ÍNDIGO */}
            <footer className="bg-indigo-700 text-indigo-100 mt-14">
                <div className="max-w-7xl mx-auto px-4 py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-2">
                    <div>© {new Date().getFullYear()} Ibercarga. Todos los derechos reservados.</div>
                    <div className="flex items-center gap-4">
                        <a href={`mailto:${EMAIL}`} className="underline hover:text-white">{EMAIL}</a>
                        <span>{PHONE}</span>
                    </div>
                </div>
            </footer>
        </section>
    );
}

function Ofertas() {
    const demoListings = [
        { id: 1, title: "Transporte de 4 vigas prefabricadas 32 m", route: "Talavera → Madrid", budget: "7.800 €" },
        { id: 2, title: "Movimiento de transformador 75 t", route: "Bilbao → Zaragoza", budget: "12.500 €" },
        { id: 3, title: "Palas eólicas 58 m (3 uds)", route: "Cádiz → Tarifa", budget: "9.900 €" },
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 py-14">
            <h2 className="text-2xl font-bold mb-6">Últimas solicitudes</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {demoListings.map((l) => (
                    <div key={l.id} className="p-5 rounded-2xl border bg-white shadow-sm">
                        <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin className="w-4 h-4" /> {l.route}</div>
                        <h3 className="mt-2 font-semibold">{l.title}</h3>
                        <div className="mt-2 text-sm">Presupuesto de referencia: {l.budget}</div>
                        <button className="mt-4 w-full bg-indigo-700 text-white rounded-xl py-2 hover:bg-indigo-800">Enviar oferta</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ComoFunciona() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-14">
            <h2 className="text-2xl font-bold mb-6">Cómo funciona Ibercarga</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Publicas tu necesidad (origen, destino, tipo, medidas, fechas).</li>
                <li>Validamos la viabilidad, permisos y flota adecuada.</li>
                <li>Recibes propuesta con precio y planificación.</li>
                <li>Asignamos flota y coordinamos operación y seguimiento.</li>
                <li>Entrega y cierre con documentación.</li>
            </ol>
            <div className="mt-8">
                <Link to="/" className="inline-block bg-indigo-700 text-white px-5 py-2 rounded-lg hover:bg-indigo-800">Solicitar presupuesto</Link>
            </div>
        </div>
    );
}

// -------------------- App ----------------------
export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white text-gray-900">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ofertas" element={<Ofertas />} />
                    <Route path="/como-funciona" element={<ComoFunciona />} />
                </Routes>
            </div>
        </Router>
    );
}
