const { Resend } = require("resend");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Allow", "POST");
        return res.end("");
    }

    try {
        const body = await readJson(req);
        const {
            origen = "",
            destino = "",
            tipo = "",
            piezas = "",
            fecha = "",
            nombre = "",
            telefono = "",
            email = "",
            vehiculo = ""
        } = body || {};

        if (!origen || !destino || !tipo || !email || !nombre) {
            return json(res, 400, { ok: false, error: "Campos requeridos: origen, destino, tipo, nombre, email" });
        }

        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        const FROM_EMAIL = process.env.FROM_EMAIL || "Ibercarga <no-reply@ibercarga.com>";
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "transporte@ibercarga.com";

        if (!RESEND_API_KEY) {
            return json(res, 500, { ok: false, error: "Falta RESEND_API_KEY" });
        }

        const resend = new Resend(RESEND_API_KEY);
        const now = new Date().toLocaleString("es-ES");

        const adminHtml = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:720px;margin:auto">
        <h2 style="margin:0 0 4px">Nueva solicitud de presupuesto</h2>
        <div style="color:#666;font-size:13px;margin-bottom:12px">${now}</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#222">
          ${row("Origen", origen)}
          ${row("Destino", destino)}
          ${row("Tipo de carga", tipo)}
          ${row("Vehículo", vehiculo)}
          ${row("Nº de piezas", piezas)}
          ${row("Fecha", fecha)}
          ${row("Nombre/Org.", nombre)}
          ${row("Teléfono", telefono)}
          ${row("Email (cliente)", email)}
        </table>
        <p style="font-size:13px;color:#444;margin-top:12px">
          Respondiendo a este correo, contactarás al cliente (Reply-To).
        </p>
      </div>
    `;

        const resumenHtml = `
      <table style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;width:100%;max-width:640px;margin:auto;border-collapse:collapse">
        <tr>
          <td style="padding:16px 0;text-align:center">
            <img src="https://ibercarga.com/favicon.svg" alt="Ibercarga" width="44" height="44" style="display:inline-block;margin-bottom:8px" />
            <div style="font-size:20px;font-weight:700;color:#111">Ibercarga</div>
            <div style="color:#666;font-size:13px">Solicitud recibida • ${now}</div>
          </td>
        </tr>
        <tr>
          <td style="background:#0d47a1;color:#fff;padding:16px 20px;border-radius:12px">
            <div style="font-size:16px;font-weight:600;margin-bottom:4px">Resumen de la solicitud</div>
            <div style="opacity:.9;font-size:14px">Gracias, ${escapeHtml(nombre)}. Te contactaremos muy pronto.</div>
          </td>
        </tr>
        <tr><td style="height:8px"></td></tr>
        <tr>
          <td style="border:1px solid #eee;border-radius:12px;padding:16px">
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#222">
              ${row("Origen", origen)}
              ${row("Destino", destino)}
              ${row("Tipo de carga", tipo)}
              ${row("Vehículo", vehiculo)}
              ${row("Nº de piezas", piezas)}
              ${row("Fecha", fecha)}
              ${row("Nombre/Org.", nombre)}
              ${row("Teléfono", telefono)}
              ${row("Email", email)}
            </table>
          </td>
        </tr>
        <tr><td style="height:12px"></td></tr>
        <tr>
          <td style="color:#666;font-size:12px;text-align:center">
            Ibercarga · ${PHONE_FOOTER()} · transporte@ibercarga.com
          </td>
        </tr>
      </table>
    `;

        // 1) para empresa
        const adminSend = await resend.emails.send({
            from: FROM_EMAIL,
            to: [ADMIN_EMAIL],
            subject: `Nueva solicitud • ${origen} → ${destino} • ${tipo}`,
            html: adminHtml,
            reply_to: email
        });

        // 2) para cliente
        const clientSend = await resend.emails.send({
            from: FROM_EMAIL,
            to: [email],
            subject: "Hemos recibido tu solicitud • Ibercarga",
            html: resumenHtml
        });

        return json(res, 200, { ok: true, adminId: adminSend?.id || null, clientId: clientSend?.id || null });
    } catch (err) {
        console.error("send-quote error:", err);
        return json(res, 500, { ok: false, error: toSafeError(err) });
    }
};

// utils
function PHONE_FOOTER() {
    return "+34 624 473 123";
}

function readJson(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (c) => (data += c));
        req.on("end", () => {
            try { resolve(JSON.parse(data || "{}")); } catch (e) { reject(e); }
        });
        req.on("error", reject);
    });
}

function json(res, code, obj) {
    res.statusCode = code;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(obj));
}

function row(label, value) {
    return `
    <tr>
      <td style="padding:8px 0;color:#666;width:160px">${escapeHtml(label)}</td>
      <td style="padding:8px 0;font-weight:600">${escapeHtml(value || "-")}</td>
    </tr>
  `;
}

function escapeHtml(str = "") {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function toSafeError(e) {
    try { return e?.name || e?.message ? { name: e.name, message: e.message } : { message: String(e) }; }
    catch { return { message: "unknown" }; }
}
