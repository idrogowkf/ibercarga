// api/send-quote.js  (CommonJS, Node runtime)
// Usa fetch nativo; no necesitas instalar "resend".

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

function renderAdminHTML(p) {
  return `
  <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
    <h2 style="margin:0 0 16px">Nueva solicitud de presupuesto</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
      <tr><td><b>Origen</b></td><td>${p.origen || "-"}</td></tr>
      <tr><td><b>Destino</b></td><td>${p.destino || "-"}</td></tr>
      <tr><td><b>Tipo de carga</b></td><td>${p.tipo || "-"}</td></tr>
      <tr><td><b>Nº piezas</b></td><td>${p.piezas || "-"}</td></tr>
      <tr><td><b>Fecha</b></td><td>${p.fecha || "-"}</td></tr>
      <tr><td><b>Vehículo</b></td><td>${p.vehiculo || "-"}</td></tr>
      <tr><td><b>Nombre/Organización</b></td><td>${p.nombre || "-"}</td></tr>
      <tr><td><b>Teléfono</b></td><td>${p.telefono || "-"}</td></tr>
      <tr><td><b>Email</b></td><td>${p.email || "-"}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:13px;color:#555">
      Recibido automáticamente desde ibercarga.com
    </p>
  </div>`;
}
function renderClientHTML(p) {
  return `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
    <div style="background:#0d47a1;color:#fff;padding:20px;border-radius:10px 10px 0 0">
      <h1 style="margin:0;font-size:22px">Ibercarga</h1>
      <p style="margin:6px 0 0">Confirmación de solicitud de presupuesto</p>
    </div>
    <div style="border:1px solid #eee;border-top:0;padding:20px;border-radius:0 0 10px 10px">
      <p>Hola${p.nombre ? ` ${p.nombre}` : ""},</p>
      <p>Hemos recibido tu solicitud. Estos son los datos:</p>
      <ul>
        <li><b>Origen → Destino:</b> ${p.origen || "-"} → ${p.destino || "-"}</li>
        <li><b>Tipo de carga:</b> ${p.tipo || "-"}</li>
        <li><b>Nº piezas:</b> ${p.piezas || "-"}</li>
        <li><b>Fecha:</b> ${p.fecha || "-"}</li>
        <li><b>Vehículo:</b> ${p.vehiculo || "-"}</li>
      </ul>
      <p>En breve te contactaremos con propuestas de transportistas verificados.</p>
      <p style="margin-top:16px">Un saludo,<br/>Equipo Ibercarga<br/>+34 624 473 123</p>
    </div>
  </div>`;
}

async function sendResendEmail({ to, subject, html }) {
  if (!RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
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
    throw new Error(`Resend error: ${resp.status} ${resp.statusText} ${body}`);
  }
  return resp.json();
}

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return text(res, 405, "Method Not Allowed");
    }

    // Parse body seguro
    let data = req.body;
    if (!data || typeof data !== "object") {
      const raw = await new Promise((resolve, reject) => {
        let chunks = "";
        req.on("data", (c) => (chunks += c));
        req.on("end", () => resolve(chunks));
        req.on("error", reject);
      });
      try { data = JSON.parse(raw || "{}"); } catch {
        return json(res, 400, { ok: false, error: "Invalid JSON body" });
      }
    }

    const required = ["origen", "destino", "tipo", "email"];
    const missing = required.filter((k) => !data[k]);
    if (missing.length) {
      return json(res, 400, { ok: false, error: `Faltan campos: ${missing.join(", ")}` });
    }

    // 1) Admin
    await sendResendEmail({
      to: ADMIN_EMAIL,
      subject: `Nueva solicitud: ${data.origen} → ${data.destino} (${data.tipo})`,
      html: renderAdminHTML(data),
    });

    // 2) Cliente
    await sendResendEmail({
      to: data.email,
      subject: "Hemos recibido tu solicitud – Ibercarga",
      html: renderClientHTML(data),
    });

    return json(res, 200, { ok: true });
  } catch (err) {
    console.error("send-quote error:", err?.message || err);
    return json(res, 500, { ok: false, error: String(err?.message || err) });
  }
};
