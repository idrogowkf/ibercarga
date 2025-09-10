// api/send-quote.js

// ⚙️ Configuración
const FROM_EMAIL = process.env.FROM_EMAIL || "Ibercarga <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contacto@ibercarga.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Ibercarga <no-reply@TU-DOMINIO-VERIFICADO.com>";
// Reemplaza TU-DOMINIO-VERIFICADO.com por tu dominio verificado en Resend.
// En Vercel, añade variables: RESEND_API_KEY (obligatoria), ADMIN_EMAIL (opcional), FROM_EMAIL (opcional).

// 👉 Util: lee body JSON con fallback (por si el hosting no lo parsea)
async function readJsonBody(req) {
    if (req.body && typeof req.body === "object") return req.body;
    const chunks = [];
    for await (const ch of req) chunks.push(ch);
    const raw = Buffer.concat(chunks).toString("utf8") || "{}";
    try { return JSON.parse(raw); } catch { return {}; }
}

// 👉 Validación básica
function validatePayload(payload) {
    const required = ["origen", "destino", "tipo", "vehiculo", "piezas", "fecha", "nombre", "telefono", "email"];
    for (const k of required) {
        const val = String(payload[k] ?? "").trim();
        if (!val) return `Falta el campo: ${k}`;
    }
    if (!/.+@.+\..+/.test(payload.email)) return "El correo no es válido";
    return null;
}

// 👉 HTML helpers
const styles = `font-family: Arial, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, 'Helvetica Neue', sans-serif;`;
const row = (label, value) => `
  <tr>
    <td style="padding:10px 12px;color:#374151;font-weight:600;background:#F9FAFB;border:1px solid #eef2f7">${label}</td>
    <td style="padding:10px 12px;color:#111827;border:1px solid #eef2f7">${value}</td>
  </tr>
`;

function card(inner, origin) {
    const logo = `${origin?.replace(/\/$/, "") || "https://ibercarga.vercel.app"}/favicon.svg`;
    return `
    <div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:14px;box-shadow:0 6px 20px rgba(0,0,0,.06);overflow:hidden">
      <div style="background:linear-gradient(135deg,#1F4FFF,#1D4ED8,#0EA5E9);padding:18px">
        <table width="100%"><tr>
          <td width="42"><img src="${logo}" width="32" height="32" style="display:block;border-radius:6px"/></td>
          <td><div style="color:#fff;font-weight:800;font-size:18px;letter-spacing:.3px">Ibercarga</div>
          <div style="color:#DBEAFE;font-size:12px">Colossal Movement</div></td>
        </tr></table>
      </div>
      <div style="padding:20px">${inner}</div>
      <div style="padding:14px 20px;border-top:1px solid #eef2f7;color:#6b7280;font-size:12px">
        © ${new Date().getFullYear()} Ibercarga · +34 624 473 123 · contacto@ibercarga.com
      </div>
    </div>
  `;
}
// 👉 Plantilla Admin
function adminEmailHtml(data, origin) {
    const inner = `
    <h2 style="margin:0 0 10px 0;color:#111827">Nueva solicitud de presupuesto</h2>
    <p style="margin:0 0 12px 0;color:#4B5563">Has recibido una nueva solicitud desde el formulario web.</p>
    <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #eef2f7;border-radius:10px;overflow:hidden">
      ${row("Ruta", `${data.origen} → ${data.destino}`)}
      ${row("Tipo de carga", data.tipo)}
      ${row("N.º de piezas", data.piezas)}
      ${row("Fecha del servicio", data.fecha)}
      ${row("Vehículo", data.vehiculo)}
      ${row("Nombre/Organización", data.nombre)}
      ${row("Teléfono", data.telefono)}
      ${row("Email cliente", data.email)}
    </table>
  `;
    return `<div style="${styles}">${card(inner, origin)}</div>`;
}

// 👉 Plantilla Cliente
function clientEmailHtml(data, origin) {
    const inner = `
    <h2 style="margin:0 0 10px 0;color:#111827">¡Gracias por tu solicitud, ${escapeHtml(data.nombre)}!</h2>
    <p style="margin:0 0 12px 0;color:#4B5563">
      Hemos recibido tu petición de presupuesto y nuestro equipo te contactará en breve.<br/>
      A continuación, el resumen:
    </p>
    <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #eef2f7;border-radius:10px;overflow:hidden">
      ${row("Ruta", `${data.origen} → ${data.destino}`)}
      ${row("Tipo de carga", data.tipo)}
      ${row("N.º de piezas", data.piezas)}
      ${row("Fecha del servicio", data.fecha)}
      ${row("Vehículo", data.vehiculo)}
      ${row("Contacto", `${escapeHtml(data.nombre)} · ${escapeHtml(data.telefono)}`)}
    </table>
    <p style="margin:14px 0 0 0;color:#374151">
      Si necesitas añadir planos, fotos o medidas exactas, puedes responder a este correo.
    </p>
    <p style="margin:6px 0 0 0;color:#111827;font-weight:600">Ibercarga · +34 624 473 123</p>
  `;
    return `<div style="${styles}">${card(inner, origin)}</div>`;
}

// 👉 Escapar HTML mínimo
function escapeHtml(s = "") {
    return String(s).replace(/[&<>"']/g, (m) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
}

// 👉 Enviar con Resend via fetch (sin instalar SDK)
async function sendEmail(payload) {
    const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY || ""}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (!r.ok) {
        const txt = await r.text().catch(() => "");
        throw new Error(`Resend error: ${txt || r.status}`);
    }
}
// 👉 Handler principal para Vercel
export default async function handler(req, res) {
    // Solo POST
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ ok: false, error: "Method Not Allowed" });
    }

    try {
        if (!process.env.RESEND_API_KEY) {
            return res.status(500).json({ ok: false, error: "Falta RESEND_API_KEY en variables de entorno" });
        }

        const origin = req.headers.origin || "";
        const body = await readJsonBody(req);

        // Validar
        const err = validatePayload(body);
        if (err) return res.status(400).json({ ok: false, error: err });

        // Asuntos
        const adminSubject = `Nueva solicitud — ${body.tipo} (${body.piezas} uds) ${body.origen} → ${body.destino}`;
        const clientSubject = `Ibercarga — Solicitud recibida (${body.origen} → ${body.destino})`;

        // 1) Correo Admin
        await sendEmail({
            from: FROM_EMAIL,            // debe ser un remitente verificado en Resend
            to: [ADMIN_EMAIL],
            subject: adminSubject,
            html: adminEmailHtml(body, origin),
            reply_to: body.email,
        });

        // 2) Correo Cliente
        await sendEmail({
            from: FROM_EMAIL,
            to: [body.email],
            subject: clientSubject,
            html: clientEmailHtml(body, origin),
        });

        return res.status(200).json({ ok: true });
    } catch (e) {
        return res.status(500).json({ ok: false, error: e?.message || "Unknown error" });
    }
}
