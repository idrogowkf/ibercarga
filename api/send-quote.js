// api/send-quote.js
//
// Envío de solicitud de presupuesto (empresa + copia al cliente) usando Resend.
// Requiere en Vercel (Project → Settings → Environment Variables):
//   RESEND_API_KEY = re_***************************
//   FROM_EMAIL     = Ibercarga <no-reply@send.ibercarga.com>   (o el remitente que tengas verificado)
//   COMPANY_EMAIL  = transporte@ibercarga.com
//
// También acepta GET ?ping=1 para comprobación rápida.

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM_EMAIL =
    process.env.FROM_EMAIL || "Ibercarga <no-reply@send.ibercarga.com>";
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || "transporte@ibercarga.com";

// Util: escapado muy básico para evitar HTML no deseado en los correos
function esc(s = "") {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Plantilla HTML común (branding Ibercarga)
function wrapHTML(title, contentHTML) {
    return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>${esc(title)}</title>
    <meta name="color-scheme" content="light only">
  </head>
  <body style="margin:0;background:#0b2b5e;font-family:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b2b5e;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:640px;background:#ffffff;border-radius:14px;overflow:hidden">
            <tr>
              <td style="background:#0b2b5e;padding:28px 28px;color:#fff;">
                <div style="display:flex;align-items:center;gap:12px">
                  <img src="https://ibercarga.com/favicon.svg" alt="Ibercarga" width="28" height="28" style="display:block;"/>
                  <div style="font-size:20px;font-weight:700;letter-spacing:.2px">Ibercarga</div>
                </div>
                <div style="margin-top:6px;font-size:13px;opacity:.85">
                  Transporte especial y sobredimensionado en toda España
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;color:#0b1a2f">
                ${contentHTML}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:#f1f5fb;color:#0b1a2f;font-size:12px;line-height:1.5">
                <div><strong>Ibercarga</strong> · Atención directa: <a href="tel:+34624473123" style="color:#0b2b5e;text-decoration:none">+34 624 473 123</a></div>
                <div>Correo: <a href="mailto:transporte@ibercarga.com" style="color:#0b2b5e;text-decoration:none">transporte@ibercarga.com</a></div>
                <div style="margin-top:6px;opacity:.7">Este correo se envió automáticamente desde ibercarga.com</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Cuerpo para correo interno (empresa)
function adminHTML(data) {
    const {
        origen,
        destino,
        tipo,
        piezas,
        fecha,
        nombre,
        telefono,
        email,
        vehiculo,
        mensaje,
    } = data;

    const rows = `
    <tr><td style="padding:8px 0;color:#475569">Origen</td><td style="padding:8px 0;text-align:right"><strong>${esc(origen)}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#475569">Destino</td><td style="padding:8px 0;text-align:right"><strong>${esc(destino)}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#475569">Tipo de carga</td><td style="padding:8px 0;text-align:right"><strong>${esc(tipo)}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#475569">Vehículo</td><td style="padding:8px 0;text-align:right"><strong>${esc(vehiculo)}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#475569">Nº de piezas</td><td style="padding:8px 0;text-align:right"><strong>${esc(piezas)}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#475569">Fecha del servicio</td><td style="padding:8px 0;text-align:right"><strong>${esc(fecha)}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#475569">Nombre / organización</td><td style="padding:8px 0;text-align:right"><strong>${esc(nombre)}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#475569">Teléfono</td><td style="padding:8px 0;text-align:right"><a href="tel:${esc(
        telefono
    )}" style="color:#0b2b5e;text-decoration:none"><strong>${esc(
        telefono
    )}</strong></a></td></tr>
    <tr><td style="padding:8px 0;color:#475569">Email</td><td style="padding:8px 0;text-align:right"><a href="mailto:${esc(
        email
    )}" style="color:#0b2b5e;text-decoration:none"><strong>${esc(
        email
    )}</strong></a></td></tr>
  `;

    const msgBlock = mensaje
        ? `<div style="margin-top:16px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px">
        <div style="font-size:12px;color:#475569;margin-bottom:6px">Mensaje adicional del cliente</div>
        <div style="white-space:pre-wrap;line-height:1.5">${esc(mensaje)}</div>
      </div>`
        : "";

    return wrapHTML(
        "Nueva solicitud de presupuesto",
        `
    <h1 style="margin:0;font-size:22px;line-height:1.2">Nueva solicitud de presupuesto</h1>
    <p style="margin:8px 0 18px;color:#475569">Recibida desde el formulario de ibercarga.com</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
      ${rows}
    </table>
    ${msgBlock}
  `
    );
}

// Cuerpo para correo al cliente (acuse de recibo)
function clientHTML(data) {
    const { nombre } = data;
    const saludo = nombre ? `Hola, ${esc(nombre)}.` : "Hola.";

    const resumen = `
    <ul style="padding-left:18px;margin:0;line-height:1.7;color:#0b1a2f">
      <li><strong>Origen:</strong> ${esc(data.origen)}</li>
      <li><strong>Destino:</strong> ${esc(data.destino)}</li>
      <li><strong>Tipo de carga:</strong> ${esc(data.tipo)}</li>
      <li><strong>Vehículo:</strong> ${esc(data.vehiculo)}</li>
      <li><strong>Piezas:</strong> ${esc(data.piezas)}</li>
      <li><strong>Fecha del servicio:</strong> ${esc(data.fecha)}</li>
      <li><strong>Contacto:</strong> ${esc(data.telefono)} · ${esc(
        data.email
    )}</li>
    </ul>
  `;

    return wrapHTML(
        "Hemos recibido tu solicitud",
        `
    <h1 style="margin:0;font-size:22px;line-height:1.2">¡Gracias por contactarnos!</h1>
    <p style="margin:8px 0 14px">${saludo} Hemos recibido tu solicitud de presupuesto. Nuestro equipo te responderá en breve.</p>
    <div style="margin:12px 0 6px;font-size:14px;color:#475569">Resumen:</div>
    ${resumen}
    <div style="margin-top:18px">
      Si necesitas añadir información (medidas, pesos, permisos, etc.), respóndenos a
      <a href="mailto:transporte@ibercarga.com" style="color:#0b2b5e;text-decoration:none">transporte@ibercarga.com</a>
      o llámanos al <a href="tel:+34624473123" style="color:#0b2b5e;text-decoration:none">+34 624 473 123</a>.
    </div>
  `
    );
}

// Enviar email vía Resend con fetch (sin dependencias)
async function sendEmail({ from, to, subject, html }) {
    if (!RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY missing");
    }
    const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: Array.isArray(to) ? to : [to],
            subject,
            html,
        }),
    });

    if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(`Resend error ${resp.status}: ${text}`);
    }
    return resp.json();
}

// Validación mínima del payload
function parseBody(req) {
    const b = req.body || {};
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
        if (!b[k] && b[k] !== 0) {
            throw new Error(`Campo requerido faltante: ${k}`);
        }
    }
    return {
        origen: String(b.origen || "").trim(),
        destino: String(b.destino || "").trim(),
        tipo: String(b.tipo || "").trim(),
        vehiculo: String(b.vehiculo || "").trim(),
        piezas: String(b.piezas ?? "").trim(),
        fecha: String(b.fecha || "").trim(),
        nombre: String(b.nombre || "").trim(),
        telefono: String(b.telefono || "").trim(),
        email: String(b.email || "").trim(),
        mensaje: String(b.mensaje || "").trim(),
    };
}

module.exports = async (req, res) => {
    try {
        // CORS ligero si el form llamase desde otros orígenes (mismo origen no lo necesita)
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        if (req.method === "OPTIONS") {
            res.statusCode = 200;
            return res.end();
        }

        // Ping rápido
        if (req.method === "GET" && (req.query?.ping || req.query?.ping === "1")) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            return res.end(JSON.stringify({ ok: true, route: "send-quote", mode: "GET-ping" }));
        }

        if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Allow", "POST,GET,OPTIONS");
            return res.end("Method Not Allowed");
        }

        const data = parseBody(req);

        // Emails
        const adminSubject = "Nueva solicitud de presupuesto – Ibercarga";
        const clientSubject = "Hemos recibido tu solicitud – Ibercarga";

        const adminHtml = adminHTML(data);
        const clientHtml = clientHTML(data);

        let empresaOK = false;
        let clienteOK = false;

        // Enviar a empresa
        try {
            await sendEmail({
                from: FROM_EMAIL,
                to: COMPANY_EMAIL,
                subject: adminSubject,
                html: adminHtml,
            });
            empresaOK = true;
        } catch (e) {
            console.error("[send-quote] Error enviando a empresa:", e?.message || e);
        }

        // Enviar al cliente
        try {
            await sendEmail({
                from: FROM_EMAIL,
                to: data.email,
                subject: clientSubject,
                html: clientHtml,
            });
            clienteOK = true;
        } catch (e) {
            console.error("[send-quote] Error enviando al cliente:", e?.message || e);
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.end(JSON.stringify({ ok: true, delivered: { empresa: empresaOK, cliente: clienteOK } }));
    } catch (err) {
        console.error("[send-quote] Error general:", err?.message || err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.end(JSON.stringify({ ok: false, error: "internal_error" }));
    }
};
