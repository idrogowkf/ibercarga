import React, { useState } from "react";
import { Truck, Phone, Mail, Info, ArrowRight } from "lucide-react";

// -----------------------------
// Formulario de Presupuesto
// -----------------------------
function FormPresupuesto() {
    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState(null);
    const [msg, setMsg] = useState("");
    const [form, setForm] = useState({
        origen: "",
        destino: "",
        tipo: "",
        vehiculo: "Góndola cama baja",
        piezas: 1,
        fecha: "",
        nombre: "",
        telefono: "",
        email: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({
            ...f,
            [name]: name === "piezas" ? Number(value) : value,
        }));
    };

    async function onSubmit(e) {
        e.preventDefault();
        setOk(null);
        setMsg("");

        const required = [
            "origen",
            "destino",
            "tipo",
            "vehiculo",
            "piezas",
            "fecha",
            "nombre",
            "telefono",
            "email",
        ];
        for (const k of required) {
            if (!form[k] && form[k] !== 0) {
                setOk(false);
                setMsg("Por favor completa todos los campos obligatorios.");
                return;
            }
        }

        try {
            setLoading(true);
            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Error HTTP ${res.status}: ${text || "sin detalle"}`);
            }
            const data = await res.json().catch(() => ({}));
            if (data?.ok) {
                setOk(true);
                setMsg("¡Solicitud enviada! Te hemos enviado un email de confirmación.");
            } else {
                throw new Error("La API no devolvió ok=true");
            }
        } catch (err) {
            console.error(err);
            setOk(false);
            setMsg("No pudimos enviar tu solicitud. Inténtalo de nuevo en un momento.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl shadow-xl"
        >
            <input
                name="origen"
                value={form.origen}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-lg border"
                placeholder="Origen (Ciudad o CP)"
                required
            />
            <input
                name="destino"
                value={form.destino}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-lg border"
                placeholder="Destino (Ciudad o CP)"
                required
            />

            <input
                name="tipo"
                value={form.tipo}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-lg border md:col-span-2"
                placeholder="Tipo de carga (ej. vigas 30m, 4 uds)"
                required
            />

            <div>
                <label className="block text-sm text-gray-600 mb-1">Vehículo</label>
                <select
                    name="vehiculo"
                    value={form.vehiculo}
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-lg border bg-white"
                    required
                >
                    <option>Góndola cama baja</option>
                    <option>Portavigas extensible</option>
                    <option>Plataforma extensible</option>
                    <option>Modular hidráulico (SPMT)</option>
                    <option>Transportador de palas eólicas</option>
                    <option>Multiaxial (8-14 ejes)</option>
                </select>
            </div>

            <div>
                <label className="block text-sm text-gray-600 mb-1">Número de piezas</label>
                <input
                    name="piezas"
                    type="number"
                    min={1}
                    step={1}
                    value={form.piezas}
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-lg border"
                    required
                />
            </div>

            <div>
                <label className="block text-sm text-gray-600 mb-1">Fecha del servicio</label>
                <input
                    name="fecha"
                    type="date"
                    value={form.fecha}
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-lg border"
                    required
                />
            </div>

            <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-lg border"
                placeholder="Nombre o empresa"
                required
            />
            <input
                name="telefono"
                value={form.telefono}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-lg border"
                placeholder="Teléfono"
                required
            />
            <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-lg border md:col-span-2"
                placeholder="Correo electrónico"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-black text-white rounded-xl py-3 hover:bg-gray-800 disabled:opacity-60 flex items-center justify-center gap-2"
            >
                {loading ? "Enviando..." : <>Obtener presupuesto <ArrowRight size={18} /></>}
            </button>

            {ok !== null && (
                <div
                    className={`md:col-span-2 mt-1 p-3 rounded-xl text-sm ${ok
                            ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                            : "bg-rose-50 border border-rose-200 text-rose-700"
                        }`}
                >
                    {msg}
                </div>
            )}
        </form>
    );
}

// -----------------------------
// Hero (portada)
// -----------------------------
function Hero() {
    return (
        <section className="relative">
            <div
                className="h-[56vh] md:h-[72vh] w-full bg-center bg-cover"
                style={{ backgroundImage: "url('/hero/ibercarga-aspa.jpg')" }}
            >
                <div className="h-full w-full bg-indigo-900/50 flex items-center">
                    <div className="max-w-6xl mx-auto px-4">
                        <h1 className="font-display text-white text-5xl md:text-7xl leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
                            Ibercarga
                        </h1>
                        <p className="mt-4 text-white/95 text-xl md:text-2xl max-w-3xl leading-snug">
                            Transporte especial y sobredimensionado en toda España:
                            eólico, prefabricado de hormigón, industrial, transformadores y más.
                        </p>
                        <div className="mt-8 flex gap-3">
                            <a
                                href="#presupuesto"
                                className="bg-white text-indigo-700 font-semibold rounded-xl px-5 py-3 hover:bg-indigo-50"
                            >
                                Obtener presupuesto
                            </a>
                            <a
                                href="#como-funciona"
                                className="bg-transparent border border-white text-white rounded-xl px-5 py-3 hover:bg-white/10"
                            >
                                Cómo funciona
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// -----------------------------
// Header & Footer
// -----------------------------
function Header() {
    return (
        <header className="bg-indigo-800 text-white">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2">
                    <Truck size={22} />
                    <span className="font-display text-xl">Ibercarga</span>
                </a>
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#presupuesto" className="hover:underline">Presupuesto</a>
                    <a href="#precios" className="hover:underline">Precios</a>
                    <a href="#como-funciona" className="hover:underline">Cómo funciona</a>
                    <a href="#contacto" className="hover:underline">Contacto</a>
                </nav>
                <a
                    href="tel:+34624473123"
                    className="flex items-center gap-2 bg-white text-indigo-800 rounded-lg px-3 py-2 hover:bg-indigo-50"
                >
                    <Phone size={18} />
                    <span className="hidden sm:inline">+34 624 473 123</span>
                </a>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="bg-indigo-900 text-indigo-100">
            <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
                <div>
                    <div className="flex items-center gap-2">
                        <Truck size={20} />
                        <span className="font-display text-xl">Ibercarga</span>
                    </div>
                    <p className="mt-3 text-sm text-indigo-200/90">
                        Transporte especial y sobredimensionado en toda España.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Enlaces</h4>
                    <ul className="space-y-1 text-indigo-200">
                        <li><a href="#presupuesto" className="hover:underline">Presupuesto</a></li>
                        <li><a href="#precios" className="hover:underline">Precios</a></li>
                        <li><a href="#como-funciona" className="hover:underline">Cómo funciona</a></li>
                        <li><a href="#faq" className="hover:underline">Preguntas frecuentes</a></li>
                    </ul>
                </div>
                <div id="contacto">
                    <h4 className="font-semibold mb-2">Contacto</h4>
                    <p className="flex items-center gap-2">
                        <Phone size={16} /> +34 624 473 123
                    </p>
                    <p className="flex items-center gap-2 mt-1">
                        <Mail size={16} /> <a href="mailto:transporte@ibercarga.com" className="underline">transporte@ibercarga.com</a>
                    </p>
                </div>
            </div>
            <div className="border-t border-indigo-700/60">
                <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-indigo-300">
                    © {new Date().getFullYear()} Ibercarga. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

// -----------------------------
// Cómo Funciona
// -----------------------------
function ComoFunciona() {
    const pasos = [
        {
            icon: <Info size={22} />,
            titulo: "Publica tu servicio",
            txt: "Rellena origen, destino, tipo de carga y fecha. Recibirás confirmación por email.",
        },
        {
            icon: <Truck size={22} />,
            titulo: "Planificación y permisos",
            txt: "Estudiamos el itinerario y gestionamos permisos y coches piloto si son necesarios.",
        },
        {
            icon: <ArrowRight size={22} />,
            titulo: "Ejecución segura",
            txt: "Transportamos con flota especializada y personal experto en cargas especiales.",
        },
    ];
    return (
        <section id="como-funciona" className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
                    ¿Cómo funciona?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {pasos.map((p, i) => (
                        <div key={i} className="rounded-2xl border shadow-sm p-6">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                                {p.icon}
                            </div>
                            <h3 className="text-lg font-semibold">{p.titulo}</h3>
                            <p className="text-gray-600 mt-2">{p.txt}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-8">
                    <a href="#presupuesto" className="inline-block bg-indigo-700 text-white px-6 py-3 rounded-xl hover:bg-indigo-800">
                        Solicitar presupuesto
                    </a>
                </div>
            </div>
        </section>
    );
}

// -----------------------------
// Precios orientativos
// -----------------------------
function Precios() {
    return (
        <section id="precios" className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
                    Precios orientativos
                </h2>
                <p className="text-gray-600 mb-8">
                    Estos importes son aproximados y pueden variar según dimensiones, permisos y operativas de carga/descarga.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="rounded-2xl border shadow-sm bg-white p-6">
                        <h3 className="font-semibold text-lg">Viga prefabricada 28–32 m</h3>
                        <p className="text-sm text-gray-600 mt-1">Ruta: 250–400 km</p>
                        <div className="text-3xl font-bold mt-4">7.500–9.500 €</div>
                        <ul className="mt-4 text-sm text-gray-600 list-disc pl-5">
                            <li>Portavigas extensible</li>
                            <li>Permisos + coche piloto</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border shadow-sm bg-white p-6">
                        <h3 className="font-semibold text-lg">Pala eólica 55–65 m</h3>
                        <p className="text-sm text-gray-600 mt-1">Ruta: 150–300 km</p>
                        <div className="text-3xl font-bold mt-4">8.500–12.000 €</div>
                        <ul className="mt-4 text-sm text-gray-600 list-disc pl-5">
                            <li>Transportador de palas</li>
                            <li>Permisos especiales</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border shadow-sm bg-white p-6">
                        <h3 className="font-semibold text-lg">Transformador 60–90 t</h3>
                        <p className="text-sm text-gray-600 mt-1">Ruta: 100–250 km</p>
                        <div className="text-3xl font-bold mt-4">11.000–16.000 €</div>
                        <ul className="mt-4 text-sm text-gray-600 list-disc pl-5">
                            <li>Multiaxial 10–12 líneas</li>
                            <li>Estudio de itinerario</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

// -----------------------------
// Galería 6 imágenes
// -----------------------------
function Galeria() {
    const imgs = [
        { src: "/gallery/industrial.jpg", alt: "Transporte industrial" },
        { src: "/gallery/prefabricado.jpg", alt: "Prefabricado de hormigón" },
        { src: "/gallery/eolico.jpg", alt: "Eólico" },
        { src: "/gallery/transformador.jpg", alt: "Transformador" },
        { src: "/gallery/maquinaria-pesada.jpg", alt: "Maquinaria pesada" },
        { src: "/gallery/estructura-metalica.jpg", alt: "Estructura metálica" },
    ];
    return (
        <section id="galeria" className="bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
                    Trabajos recientes
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {imgs.map((it, idx) => (
                        <div key={idx} className="overflow-hidden rounded-xl border bg-white">
                            <img
                                src={it.src}
                                alt={it.alt}
                                className="w-full h-56 object-cover hover:scale-[1.02] transition-transform"
                                loading="lazy"
                            />
                            <div className="p-3 text-sm text-gray-700">{it.alt}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// -----------------------------
// Testimonios
// -----------------------------
function Testimonios() {
    const items = [
        {
            empresa: "Hormigones Norte S.A.",
            texto:
                "Ibercarga nos movió 12 vigas de 30 m con una coordinación impecable. Cumplieron plazos y permisos sin sorpresas.",
            persona: "Laura M. – Jefa de Obra",
        },
        {
            empresa: "Parque Eólico Cantábrico",
            texto:
                "Excelente en las palas eólicas. Itinerario, escoltas y maniobras en subestación con máxima seguridad.",
            persona: "Diego R. – Site Manager",
        },
        {
            empresa: "ElectroRed Ibérica",
            texto:
                "Traslado de transformador 85 t con multiaxial y estudio técnico. Comunicación clara y zero incidencias.",
            persona: "Marta M. – Responsable Logística",
        },
    ];
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
                    Testimonios
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((t, i) => (
                        <div key={i} className="rounded-2xl border shadow-sm p-6">
                            <p className="text-gray-700 italic">“{t.texto}”</p>
                            <div className="mt-4 text-sm text-gray-600">
                                <div className="font-semibold">{t.empresa}</div>
                                <div>{t.persona}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// -----------------------------
// FAQ
// -----------------------------
function FAQ() {
    const faqs = [
        {
            q: "¿Qué documentos necesitáis para un transporte especial?",
            a: "Dimensiones/peso exactos, puntos de carga/descarga y fecha prevista. Nosotros tramitamos permisos y vehículos piloto.",
        },
        {
            q: "¿Cuánto tarda un presupuesto?",
            a: "Normalmente entre 1 y 4 horas laborales. Urgentes: llámanos al +34 624 473 123.",
        },
        {
            q: "¿Trabajáis en toda España?",
            a: "Sí, y también operamos rutas transfronterizas bajo solicitud.",
        },
    ];
    return (
        <section id="faq" className="bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
                    Preguntas frecuentes
                </h2>
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div key={i} className="rounded-2xl border bg-white p-6">
                            <h3 className="font-semibold text-lg">{f.q}</h3>
                            <p className="text-gray-700 mt-2">{f.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// -----------------------------
// Sección de Presupuesto (wrapper con color)
// -----------------------------
function PresupuestoSection() {
    return (
        <section id="presupuesto" className="bg-indigo-700 py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-white font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
                    Obtén tu presupuesto en minutos
                </h2>
                <p className="text-indigo-100 mb-8">
                    Rellena el formulario y recibirás confirmación por email. Nosotros también lo recibimos en{" "}
                    <b>transporte@ibercarga.com</b>.
                </p>
                <FormPresupuesto />
            </div>
        </section>
    );
}

// -----------------------------
// App principal
// -----------------------------
export default function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main>
                <Hero />
                <PresupuestoSection />
                <Precios />
                <ComoFunciona />
                <Galeria />
                <Testimonios />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}
