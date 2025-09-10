// api/send-quote.js  (CommonJS, Node runtime)
//
// No requiere instalar "resend"; usa fetch nativo de Node 18+/22.
// Asegúrate de tener en Vercel estas ENV VARS (Production/Preview):
// - RESEND_API_KEY = re_....
// - FROM_EMAIL = "Ibercarga <onboarding@resend.dev>"  (hasta verificar ibercarga.com)
// - ADMIN_EMAIL = "contacto@ibercarga.com"            (tu correo de recepción)

const FROM_EMAIL = process.env.FROM_EMAIL || "Ibercarga <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contacto@ibercarga.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

function json(res, status, data) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(data));
}

function text(res, status, message) {
    res.statusCode = status;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(message);
}

function renderAdminHTML(payload) {
    const {
        origen, destino, tipo, piezas, fecha, nombre, telefono, email, vehiculo,
    } = payload;
    return `
  <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
    <h2 style="margin:0 0 16px">Nueva solicitud de presupuesto</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td><b>Origen</b></td><td>${origen || "-"}</td></tr>
      <tr><td><b>Destino</b></td><td>${destino || "-"}</td></tr>
      <tr><td><b>Tipo de carga</b></td><td>${tipo || "-"}</td></tr>
      <tr><td><b>Nº piezas</b></td><td>${piezas || "-"}</td></tr>
      <tr><td><b>Fecha</b></td><td>${fecha || "-"}</td></tr>
      <tr><td><b>Vehículo</b></td><td>${vehiculo || "-"}</td></tr>
      <tr><td><b>Nombre/Organización</b></td><td>${nombre || "-"}</td></tr>
      <tr><td><b>Teléfono</b></td><td>${telefono || "-"}</td></tr>
      <tr><td><b>Email</b></td><td>${email || "-"}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:13px;color:#555">
      Recibido automáticamente desde ibercarga.com
    </p>
  </div>`;
}

function renderClientHTML(payload) {
    const {
        origen, destino, tipo, piezas, fecha, nombre, vehiculo,
    } = payload;
    return `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
    <div style="background:#0d47a1;color:#fff;padding:20px;border-radius:10px 10px 0 0">
      <h1 style="margin:0;font-size:22px">Ibercarga</h1>
      <p style="margin:6px 0 0">Confirmación de solicitud de presupuesto</p>
    </div>
    <div style="border:1px solid #eee;border-top:0;padding:20px;border-radius:0 0 10px 10px">
      <p>Hola${nombre ? ` ${nombre}` : ""},</p>
      <p>Hemos recibido tu solicitud. Estos son los datos:</p>
      <ul>
        <li><b>Origen → Destino:</b> ${origen || "-"} → ${destino || "-"}</li>
        <li><b>Tipo de carga:</b> ${tipo || "-"}</li>
        <li><b>Nº piezas:</b> ${piezas || "-"}</li>
        <li><b>Fecha:</b> ${fecha || "-"}</li>
        <li><b>Vehículo:</b> ${vehiculo || "-"}</li>
      </ul>
      <p>En breve te contactaremos con propuestas de transportistas verificados.</p>
      <p style="margin-top:16px">Un saludo,<br/>Equipo Ibercarga<br/>+34 624 473 123</p>
    </div>
  </div>`;
}

async function sendResendEmail({ to, subject, html }) {
    if (!RESEND_API_KEY) {
        throw new Error("Missing RESEND_API_KEY");
    }
    const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: FROM_EMAIL,
            to: Array.isArray(to) ? to : [to],
            subject,
            html,
        }),
    });

    if (!resp.ok) {
        const body = await resp.text().catch(() => "");
        const msg = `Resend error: ${resp.status} ${resp.statusText} ${body}`;
        throw new Error(msg);
    }
    return resp.json();
}

module.exports = async (req, res) => {
    try {
        if (req.method !== "POST") {
            res.setHeader("Allow", "POST");
            return text(res, 405, "Method Not Allowed");
        }

        // Body puede venir ya como objeto (Vercel) o como string.
        let data = req.body;
        if (!data || typeof data !== "object") {
            const raw = await new Promise((resolve, reject) => {
                let chunks = "";
                req.on("data", (c) => (chunks += c));
                req.on("end", () => resolve(chunks));
                req.on("error", reject);
            });
            try { data = JSON.parse(raw || "{}"); } catch (e) {
                return json(res, 400, { ok: false, error: "Invalid JSON body" });
            }
        }

        const required = ["origen", "destino", "tipo", "email"];
        const missing = required.filter((k) => !data[k]);
        if (missing.length) {
            return json(res, 400, { ok: false, error: `Faltan campos: ${missing.join(", ")}` });
        }

        // 1) Email al admin
        const adminHtml = renderAdminHTML(data);
        await sendResendEmail({
            to: ADMIN_EMAIL,
            subject: `Nueva solicitud: ${data.origen} → ${data.destino} (${data.tipo})`,
            html: adminHtml,
        });

        // 2) Email de confirmación al cliente
        const clientHtml = renderClientHTML(data);
        await sendResendEmail({
            to: data.email,
            subject: "Hemos recibido tu solicitud – Ibercarga",
            html: clientHtml,
        });

        return json(res, 200, { ok: true });
    } catch (err) {
        // Log para ver en Vercel → Deployment → Functions
        console.error("send-quote error:", err?.message || err);
        return json(res, 500, { ok: false, error: String(err?.message || err) });
    }
};
