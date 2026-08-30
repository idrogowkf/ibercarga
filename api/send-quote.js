// api/send-quote.js

// ==========================
// Config y utilidades
// ==========================
const TO_EMPRESA = process.env.TO_EMPRESA || "transporte@ibercarga.com";
const FROM_EMAIL =
    process.env.FROM_EMAIL || "Ibercarga <no-reply@ibercarga.com>";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

const BRAND = {
    name: "Ibercarga",
    primary: "#1e3a8a",   // Indigo 800
    light: "#eef2ff",   // Indigo 50
    text: "#0f172a",   // Slate 900
    muted: "#475569",   // Slate 600
    border: "#e2e8f0",   // Slate 200
    logoUrl: "https://ibercarga.com/favicon.svg"
};

function escapeHTML(s) {
    return String(s ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function row(label, value) {
    return `
    <tr>
      <td width="40%" style="padding:10px 12px;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-size:13px">${label}</td>
      <td width="60%" style="padding:10px 12px;border-bottom:1px solid ${BRAND.border};color:${BRAND.text};font-weight:600;font-size:14px">${escapeHTML(value ?? "-")}</td>
    </tr>
  `;
}

// ==========================
// Plantillas HTML de correo
// ==========================
function emailAdminHTML(data) {
    const {
        origen, destino, tipo, piezas, fecha,
        nombre, telefono, email, vehiculo
    } = data;

    return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta name="x-ibercarga" content="admin-quote"/>
<title>Solicitud de Presupuesto – ${BRAND.name}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.light};font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BRAND.light};padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#fff;border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden">
          <tr>
            <td style="background:${BRAND.primary};padding:20px 24px;color:#fff">
              <table width="100%"><tr>
                <td align="left" style="font-size:18px;font-weight:700;letter-spacing:.2px">
                  Solicitud de presupuesto
                </td>
                <td align="right">
                  <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="28" height="28" style="display:inline-block;vertical-align:middle"/>
                </td>
              </tr></table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px">
              <p style="margin:0 0 12px 0;color:${BRAND.text};font-size:16px;line-height:1.5">
                Hola equipo, ha entrado una nueva solicitud de presupuesto:
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px;border-collapse:collapse">
                ${row("Origen", origen)}
                ${row("Destino", destino)}
                ${row("Tipo de carga", tipo)}
                ${row("Piezas", String(piezas))}
                ${row("Fecha", fecha)}
                ${row("Vehículo", vehiculo)}
                ${row("Nombre", nombre)}
                ${row("Teléfono", telefono)}
                ${row("Email", email)}
              </table>

              <div style="margin-top:20px;padding:14px;border:1px dashed ${BRAND.border};border-radius:10px;color:${BRAND.muted};font-size:13px;line-height:1.5">
                Consejo: responde al cliente dentro de las próximas 2 horas para maximizar la conversión.
              </div>

              <p style="margin:16px 0 0 0;color:${BRAND.muted};font-size:12px">
                Recibido por ${BRAND.name} · ${new Date().toLocaleString("es-ES")}
              </p>
            </td>
          </tr>
        </table>
        <p style="color:${BRAND.muted};font-size:12px;margin:12px 0 0 0">
          Este correo es automático. No responder a esta dirección.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function emailClientHTML(data) {
    const {
        origen, destino, tipo, piezas, fecha,
        nombre, vehiculo
    } = data;

    return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<title>Hemos recibido tu solicitud – ${BRAND.name}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.light};font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BRAND.light};padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#fff;border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden">
          <tr>
            <td style="background:${BRAND.primary};padding:20px 24px;color:#fff">
              <table width="100%"><tr>
                <td align="left" style="font-size:18px;font-weight:700;letter-spacing:.2px">
                  ¡Gracias, ${escapeHTML(nombre || "cliente")}!
                </td>
                <td align="right">
                  <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="28" height="28" style="display:inline-block;vertical-align:middle"/>
                </td>
              </tr></table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px">
              <p style="margin:0 0 12px 0;color:${BRAND.text};font-size:16px;line-height:1.5">
                Hemos recibido tu solicitud de presupuesto y te responderemos en breve.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px;border-collapse:collapse">
                ${row("Origen", origen)}
                ${row("Destino", destino)}
                ${row("Tipo de carga", tipo)}
                ${row("Piezas", String(piezas))}
                ${row("Fecha", fecha)}
                ${row("Vehículo", vehiculo)}
              </table>

              <a href="https://ibercarga.com" style="display:inline-block;margin-top:18px;background:${BRAND.primary};color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:700">
                Visitar Ibercarga
              </a>

              <p style="margin:16px 0 0 0;color:${BRAND.muted};font-size:12px">
                Si tu solicitud es urgente, puedes llamarnos directamente.
              </p>
            </td>
          </tr>
        </table>
        <p style="color:${BRAND.muted};font-size:12px;margin:12px 0 0 0">
          Este correo es informativo. No responder a esta dirección.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ==========================
// Envío con Resend (fetch)
// ==========================
async function resendSend({ from, to, subject, html, text, reply_to }) {
    if (!RESEND_API_KEY) {
        return { ok: false, status: 500, error: "Missing RESEND_API_KEY" };
    }
    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: Array.isArray(to) ? to : [to],
            subject,
            html,
            text,
            reply_to,
        }),
    });

    let payload = null;
    try { payload = await res.json(); } catch { }

    if (!res.ok) {
        return { ok: false, status: res.status, error: payload || await res.text() };
    }
    return { ok: true, status: res.status, id: payload?.id || null };
}

// ==========================
// Handler HTTP (Vercel)
// ==========================
module.exports = async (req, res) => {
    // CORS básico
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        return res.end();
    }

    // GET ping rápido
    if (req.method === "GET") {
        const ping = (req.query && req.query.ping) || (req.url.includes("ping=") ? "1" : "");
        if (ping) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            return res.end(JSON.stringify({ ok: true, route: "send-quote", mode: "GET-ping" }));
        }
        res.statusCode = 405;
        return res.end("Method Not Allowed");
    }

    // Solo POST real
    if (req.method !== "POST") {
        res.statusCode = 405;
        return res.end("Method Not Allowed");
    }

    try {
        // Parse JSON
        let body = req.body;
        if (!body) {
            const chunks = [];
            for await (const chunk of req) chunks.push(chunk);
            const raw = Buffer.concat(chunks).toString("utf8");
            body = raw ? JSON.parse(raw) : {};
        }

        const data = {
            origen: (body.origen || "").trim(),
            destino: (body.destino || "").trim(),
            tipo: (body.tipo || "").trim(),
            piezas: Number(body.piezas || 0),
            fecha: (body.fecha || "").trim(),
            nombre: (body.nombre || "").trim(),
            telefono: (body.telefono || "").trim(),
            email: (body.email || "").trim(),
            vehiculo: (body.vehiculo || "").trim(),
        };

        // Validación mínima
        if (!data.origen || !data.destino || !data.tipo || !data.nombre || !data.email) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            return res.end(JSON.stringify({ ok: false, error: "Faltan campos obligatorios." }));
        }

        // Título
        const subject = `Solicitud de presupuesto – ${data.origen} → ${data.destino}`;

        // Textos en claro por si el cliente no muestra HTML
        const textAdmin =
            `Nueva solicitud de presupuesto:

Origen: ${data.origen}
Destino: ${data.destino}
Tipo: ${data.tipo}
Piezas: ${data.piezas}
Fecha: ${data.fecha}
Vehículo: ${data.vehiculo}

Nombre: ${data.nombre}
Teléfono: ${data.telefono}
Email: ${data.email}

${BRAND.name}`;

        const textClient =
            `¡Hola ${data.nombre}!

Hemos recibido tu solicitud de presupuesto:

${data.origen} → ${data.destino}
Tipo: ${data.tipo}
Piezas: ${data.piezas}
Fecha: ${data.fecha}
Vehículo: ${data.vehiculo}

Te responderemos en breve.
${BRAND.name} – https://ibercarga.com`;

        // Enviar a empresa
        let deliveredEmpresa = false;
        const r1 = await resendSend({
            from: FROM_EMAIL,
            to: TO_EMPRESA,
            subject,
            html: emailAdminHTML(data),
            text: textAdmin,
            reply_to: data.email || undefined,
        });
        deliveredEmpresa = !!r1.ok;

        // Enviar copia al cliente (si proporcionó email)
        let deliveredCliente = false;
        if (data.email) {
            const r2 = await resendSend({
                from: FROM_EMAIL,
                to: data.email,
                subject: "Hemos recibido tu solicitud – Ibercarga",
                html: emailClientHTML(data),
                text: textClient,
                // reply_to opcionalmente podrías poner tu correo de empresa
            });
            deliveredCliente = !!r2.ok;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.end(JSON.stringify({
            ok: true,
            delivered: { empresa: deliveredEmpresa, cliente: deliveredCliente },
        }));
    } catch (err) {
        // Error genérico
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.end(JSON.stringify({ ok: false, error: "SERVER_ERROR" }));
    }
};
