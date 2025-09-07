import React, { useState } from "react";
import { Truck, MapPin, Search, ShieldCheck, Star, CheckCircle2, ArrowRight } from "lucide-react";

/* ====== BLOQUES ====== */

function TrustBar() {
    const items = [
        { label: "Transportistas verificados", icon: <ShieldCheck className="w-5 h-5" />, tint: "text-emerald-600" },
        { label: "Ahorro medio 18–30%", icon: <Star className="w-5 h-5" />, tint: "text-amber-500" },
        { label: "Cobertura España + UE", icon: <CheckCircle2 className="w-5 h-5" />, tint: "text-indigo-600" },
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 -mt-10">
            <div className="grid md:grid-cols-3 gap-4">
                {items.map((it, i) => (
                    <div key={i} className="bg-white/90 backdrop-blur rounded-xl border shadow-sm p-4 flex items-center gap-3">
                        <span className={`${it.tint}`}>{it.icon}</span>
                        <span className="font-medium">{it.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CityChips() {
    const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga", "Zaragoza", "Murcia", "Alicante", "A Coruña"];
    return (
        <div className="max-w-7xl mx-auto px-4 mt-6">
            <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                    <span key={c} className="px-3 py-1.5 rounded-full border text-sm bg-white hover:border-indigo-300 cursor-pointer">
                        {c}
                    </span>
                ))}
            </div>
        </div>
    );
}

function Categories() {
    const cats = [
        { name: "Maquinaria industrial", tint: "bg-indigo-50 text-indigo-700 border-indigo-100" },
        { name: "Prefabricados de hormigón", tint: "bg-amber-50 text-amber-700 border-amber-100" },
        { name: "Eólico (palas/tótems)", tint: "bg-emerald-50 text-emerald-700 border-emerald-100" },
        { name: "Transformadores", tint: "bg-rose-50 text-rose-700 border-rose-100" },
        { name: "Sobredimensionado", tint: "bg-sky-50 text-sky-700 border-sky-100" },
        { name: "Obra civil/pesado", tint: "bg-teal-50 text-teal-700 border-teal-100" },
    ];
    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-xl font-bold mb-4">Categorías populares</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {cats.map((c) => (
                        <div key={c.name} className={`rounded-xl border p-4 ${c.tint}`}>
                            {c.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function RecentListings() {
    const items = [
        { id: 1, title: "Traslado de prensa 35 t", route: "Bilbao → Zaragoza", date: "Hace 2 h", tags: ["Industrial", "Góndola"], budget: "Presupuesto abierto" },
        { id: 2, title: "Vigas prefabricadas 30 m (4 uds)", route: "Talavera → Madrid", date: "Hoy", tags: ["Prefabricado", "Extensible"], budget: "7.800 € estimado" },
        { id: 3, title: "Pala eólica 58 m", route: "Cádiz → Tarifa", date: "Ayer", tags: ["Eólico", "Escolta"], budget: "9.900 € estimado" },
        { id: 4, title: "Transformador 75 t", route: "Bilbao → Burgos", date: "Esta semana", tags: ["Transformador", "Especial"], budget: "12.500 € estimado" },
    ];
    return (
        <section className="py-10 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">{/* ojo: mx-auto (no mx_auto) */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Últimas solicitudes</h3>
                    <a href="#presupuesto" className="text-indigo-700 hover:underline text-sm">Obtener presupuesto</a>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {items.map((it) => (
                        <div key={it.id} className="bg-white rounded-xl border shadow-sm p-4">
                            <div className="text-sm text-gray-500">{it.date}</div>
                            <h4 className="font-semibold mt-1">{it.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <MapPin className="w-4 h-4" />
                                {it.route}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {it.tags.map((t) => (
                                    <span key={t} className="text-xs px-2 py-1 rounded-full border bg-gray-50">{t}</span>
                                ))}
                            </div>
                            <div className="mt-3 text-sm">
                                <span className="text-gray-500">Referencia: </span>
                                <span className="font-medium">{it.budget}</span>
                            </div>
                            <button className="mt-4 w-full rounded-lg bg-indigo-600 text-white py-2 text-sm hover:bg-indigo-700">
                                Enviar oferta
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    const steps = [
        { n: 1, title: "Publica tu carga", desc: "Origen, destino, tipo, medidas y fechas." },
        { n: 2, title: "Recibe ofertas", desc: "Transportistas verificados compiten por tu trabajo." },
        { n: 3, title: "Elige y ahorra", desc: "Compara valoraciones y precio. Gestiona todo online." },
    ];
    return (
        <section id="comofunciona" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-bold text-center">¿Cómo funciona?</h3>
                <p className="text-center text-gray-600 mt-2">Simple, transparente y seguro.</p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {steps.map((s) => (
                        <div key={s.n} className="p-6 rounded-2xl border bg-white shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                                {s.n}
                            </div>
                            <h4 className="font-semibold mt-3">{s.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ====== GALERÍA (6 imágenes) ====== */
function Gallery() {
    const images = [
        "/gallery/industrial.jpg",
        "/gallery/prefabricado.jpg",
        "/gallery/eolico.jpg",
        "/gallery/transformador.jpg",
        "/gallery/puente.jpg",
        "/gallery/grua.jpg",
    ];

    return (
        <section className="py-14 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-bold text-center mb-8">Equipos y Maquinas</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((src, i) => (
                        <div key={i} className="overflow-hidden rounded-xl shadow-sm border">
                            <img
                                src={src}
                                alt={`Proyecto ${i + 1}`}
                                className="w-full h-48 object-cover hover:scale-105 transition-transform"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ====== TESTIMONIOS (3 empresas) ====== */
function Testimonials() {
    const items = [
        {
            empresa: "Construcciones Iberia",
            texto: "Gracias a Ibercarga pudimos transportar vigas prefabricadas de 30 m en tiempo récord, reduciendo costes y evitando retrasos en obra.",
            persona: "Juan Pérez · Director de Proyectos",
        },
        {
            empresa: "Enercon",
            texto: "Gestionaron el traslado de nuestras palas eólicas de 58 m con permisos y escoltas. Todo seguro y a tiempo.",
            persona: "María López · Responsable Logística",
        },
        {
            empresa: "Industrias del Norte",
            texto: "Trasladamos un transformador de 80 toneladas sin complicaciones. Ibercarga nos dio tranquilidad y ahorro.",
            persona: "Carles Gómez · Jefe de Planta",
        },
    ];

    return (
        <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-bold text-center mb-10">Lo que dicen las empresas</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((t, i) => (
                        <div key={i} className="p-6 border rounded-xl shadow-sm bg-gray-50 flex flex-col">
                            <p className="text-gray-700 flex-1">“{t.texto}”</p>
                            <div className="mt-4">
                                <p className="font-semibold">{t.empresa}</p>
                                <p className="text-sm text-gray-500">{t.persona}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const faqs = [
        { q: "¿Cuánto cuesta publicar?", a: "Publicar es gratis. Pagas el transporte al aceptar una oferta." },
        { q: "¿Cómo verifican a los transportistas?", a: "Documentación, seguros, experiencia y evaluaciones de clientes." },
        { q: "¿Gestionan permisos y escoltas?", a: "Sí, el transportista incluye permisos/seguridad cuando aplica." },
    ];
    return (
        <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl font-bold text-center">Preguntas frecuentes</h3>
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                    {faqs.map((f, i) => (
                        <div key={i} className="p-5 rounded-2xl border bg-white shadow-sm">
                            <h4 className="font-semibold">{f.q}</h4>
                            <p className="text-sm text-gray-600 mt-1">{f.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
/* ====== FOOTER ====== */
function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div>
                    <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        <span className="font-bold text-lg">Ibercarga</span>
                    </div>
                    <p className="mt-2 text-gray-600">Marketplace de transporte especial y cargas pesadas.</p>
                </div>
                <div>
                    <h5 className="font-semibold">Para clientes</h5>
                    <ul className="mt-2 space-y-1 text-gray-600">
                        <li><a href="#presupuesto" className="hover:underline">Obtener presupuesto</a></li>
                        <li><a href="#comofunciona" className="hover:underline">Cómo funciona</a></li>
                        <li><a href="#" className="hover:underline">Precios</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold">Para transportistas</h5>
                    <ul className="mt-2 space-y-1 text-gray-600">
                        <li><a href="#" className="hover:underline">Registro</a></li>
                        <li><a href="#" className="hover:underline">Ofertas disponibles</a></li>
                        <li><a href="#" className="hover:underline">Verificación</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold">Contacto</h5>
                    <ul className="mt-2 space-y-1 text-gray-600">
                        <li>+34 624 473 123</li>
                        <li>contacto@ibercarga.com</li>
                        <li>Castilla-La Mancha, España</li>
                    </ul>
                </div>
            </div>
            <div className="border-t">
                <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-gray-500 flex items-center justify-between">
                    <div>© {new Date().getFullYear()} Ibercarga. Todos los derechos reservados.</div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:underline">Privacidad</a>
                        <a href="#" className="hover:underline">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
/* ====== NAV + HERO + FORM + SECCIONES ====== */

export default function App() {
    const [form, setForm] = useState({
        origen: "",
        destino: "",
        tipo: "",
        piezas: "",
        fecha: "",
        nombre: "",
        telefono: "",
        email: "",
        vehiculo: ""
    });
    const [toast, setToast] = useState("");

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();

        // Validación
        for (const [k, v] of Object.entries(form)) {
            if (!v) {
                setToast("Completa todos los campos para obtener tu presupuesto.");
                return;
            }
        }

        try {
            const resp = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await resp.json();

            if (!resp.ok || !data.ok) {
                throw new Error(data.error || "No se pudo enviar el correo");
            }

            setToast("✅ ¡Solicitud enviada! Te hemos enviado un resumen a tu correo.");
            // Limpieza opcional:
            // setForm({ origen:"", destino:"", tipo:"", piezas:"", fecha:"", nombre:"", telefono:"", email:"", vehiculo:"" });
        } catch (err) {
            // Fallback mailto
            const body =
                `Ruta: ${form.origen} → ${form.destino}%0D%0A` +
                `Tipo: ${form.tipo}%0D%0A` +
                `Piezas: ${form.piezas}%0D%0A` +
                `Fecha: ${form.fecha}%0D%0A` +
                `Vehículo: ${form.vehiculo}%0D%0A` +
                `Nombre: ${form.nombre}%0D%0A` +
                `Teléfono: ${form.telefono}%0D%0A` +
                `Email: ${form.email}%0D%0A`;

            window.location.href =
                `mailto:contacto@ibercarga.com` +
                `?cc=${encodeURIComponent(form.email)}` +
                `&subject=${encodeURIComponent("Solicitud de presupuesto Ibercarga")}` +
                `&body=${body}`;

            setToast("⚠️ Hubo un problema enviando automáticamente. Abrimos tu correo para que lo envíes.");
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* NAV */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="h-16 flex items-center justify-between">
                        <a href="#top" className="flex items-center gap-2">
                            <Truck className="w-6 h-6" />
                            <span className="font-bold text-lg">Ibercarga</span>
                            <span className="hidden md:inline text-sm text-gray-500">· Colossal Movement</span>
                        </a>
                        <nav className="flex items-center gap-4 text-sm">
                            <a href="#comofunciona" className="hover:text-indigo-700">Cómo funciona</a>
                            <a href="#contacto" className="hover:text-indigo-700">Contacto</a>
                            <a href="#presupuesto" className="hidden sm:inline px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                                Obtener presupuesto
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section id="top" className="relative bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-600 text-white">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                            Ibercarga: ofertas para tu transporte especial
                        </h1>
                        <p className="mt-3 text-white/90">
                            Publica tu ruta y tipo de carga. Transportistas verificados envían presupuestos en horas.
                        </p>
                        <ul className="mt-4 text-sm text-white/90 space-y-1">
                            <li>• Sobredimensionado, industrial, prefabricado, eólico</li>
                            <li>• Permisos, escoltas y documentación incluidos</li>
                            <li>• Atención al cliente: <b>+34 624 473 123</b></li>
                        </ul>
                    </div>

                    {/* Formulario principal */}
                    <div className="bg-white text-gray-900 rounded-2xl shadow-xl border p-4 md:p-5" id="presupuesto">
                        <div className="flex items-center gap-2 mb-2">
                            <Search className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-semibold">Obtener presupuesto</h3>
                        </div>
                        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-3">
                            <div className="relative">
                                <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                                <input name="origen" value={form.origen} onChange={onChange} className="w-full pl-9 pr-3 py-2 rounded-lg border" placeholder="Origen (Ciudad o CP)" />
                            </div>
                            <div className="relative">
                                <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                                <input name="destino" value={form.destino} onChange={onChange} className="w-full pl-9 pr-3 py-2 rounded-lg border" placeholder="Destino (Ciudad o CP)" />
                            </div>
                            <input name="tipo" value={form.tipo} onChange={onChange} className="w-full px-3 py-2 rounded-lg border md:col-span-2" placeholder="Tipo de carga (ej. vigas 30 m / transformador 75 t)" />
                            <input name="piezas" type="number" min="1" value={form.piezas} onChange={onChange} className="w-full px-3 py-2 rounded-lg border" placeholder="Número de piezas" />
                            <input name="fecha" type="date" value={form.fecha} onChange={onChange} className="w-full px-3 py-2 rounded-lg border" />
                            <input name="nombre" value={form.nombre} onChange={onChange} className="w-full px-3 py-2 rounded-lg border" placeholder="Nombre u organización" />
                            <input name="telefono" type="tel" value={form.telefono} onChange={onChange} className="w-full px-3 py-2 rounded-lg border" placeholder="Teléfono de contacto" />
                            {/* Email del cliente */}
                            <input name="email" type="email" value={form.email} onChange={onChange} className="w-full px-3 py-2 rounded-lg border md:col-span-2" placeholder="Correo electrónico" />
                            {/* Vehículo */}
                            <select name="vehiculo" value={form.vehiculo} onChange={onChange} className="w-full px-3 py-2 rounded-lg border md:col-span-2 bg-white">
                                <option value="">Selector de vehículo</option>
                                <option>Góndola</option>
                                <option>Cama baja</option>
                                <option>Extensible</option>
                                <option>Especial sobredimensionado</option>
                            </select>
                            <button className="md:col-span-2 rounded-lg bg-indigo-600 text-white py-2 font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2">
                                <ArrowRight className="w-4 h-4" />
                                Obtener presupuesto
                            </button>
                        </form>
                        {toast && (
                            <div className="mt-3 text-sm p-3 rounded-lg bg-emerald-50 border border-emerald-200 whitespace-pre-line">
                                {toast}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Secciones adicionales */}
            <TrustBar />
            <CityChips />
            <Categories />
            <RecentListings />
            <HowItWorks />
            <Gallery />
            <Testimonials />
            <FAQ />

            {/* CONTACTO */}
            <section id="contacto" className="py-16 bg-gray-50 border-t">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Contáctanos</h3>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Gracias por tu mensaje. Te contactaremos pronto."); }} className="grid gap-4">
                            <input type="text" placeholder="Nombre" className="border px-4 py-3 rounded-lg" required />
                            <input type="email" placeholder="Correo electrónico" className="border px-4 py-3 rounded-lg" required />
                            <input type="tel" placeholder="Teléfono" className="border px-4 py-3 rounded-lg" required />
                            <textarea placeholder="Mensaje" className="border px-4 py-3 rounded-lg" rows="5" required />
                            <button className="bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">Enviar</button>
                        </form>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6">Información</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>📞 +34 624 473 123</li>
                            <li>📧 contacto@ibercarga.com</li>
                            <li>🏢 Castilla-La Mancha, España</li>
                        </ul>
                        <div className="mt-6 text-sm text-gray-500">Atendemos por WhatsApp y videollamada bajo cita.</div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
