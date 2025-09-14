// api/send-quote.js
const { Resend } = require("resend");

/** Util: validación básica de email */
function isEmail(x) {
    return typeof x === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

/** HTML muy simple para el correo (empresa y cliente) */
function emailHtml({ origen, destino, tipo, piezas, fecha, nombre, telefono, email, vehiculo }) {
    return `
  <div style="font-family:Inter,system-ui,Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
    <h1 style="margin:0 0 8px 0;font-size:22px;color:#111827">Nueva solicitud de presupuesto</h1>
    <p style="margin:0 0 16px 0;color:#374151">Ibercarga · Transporte especial</p>
    <table style="width:100%;border-collapse:collapse">
      <tbody>
        ${[
            ["Origen", origen],
            ["Destino", destino],
            ["Tipo de carga", tipo],
            ["Piezas", piezas],
            ["Fecha", fecha],
            ["Vehículo", vehiculo],
            ["Nombre / Organización", nombre],
            ["Teléfono", telefono],
            ["Email contacto", email],
        ]
            .map(
                ([k, v]) => `
        <tr>
          <td style="padding:8px 0;color:#6b7280;width:40%">${k}</td>
          <td style="padding:8px 0;color:#111827;font-weight:600">${v || "-"}</td>
        </tr>`
            )
            .join("")}
      </tbody>
    </table>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
    <p style="margin:0;color:#374151">Gracias por usar Ibercarga. Responderemos lo antes posible.</p>
  </div>
  `;
}

module.exports = async (req, res) => {
    try {
        // 1) Ping rápido
        if (req.method === "GET") {
            if (req.query && ("ping" in req.query)) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json; charset=utf-8");
                return res.end(JSON.stringify({ ok: true, route: "send-quote", mode: "GET-ping" }));
            }
            res.statusCode = 405;
            res.setHeader("Allow", "POST");
            return res.end("Method Not Allowed");
        }

        if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Allow", "POST");
            return res.end("Method Not Allowed");
        }

        // 2) Body
        const {
            origen = "",
            destino = "",
            tipo = "",
            piezas = "",
            fecha = "",
            nombre = "",
            telefono = "",
            email = "",
            vehiculo = "",
        } = typeof req.body === "object" && req.body ? req.body : {};

        // 3) Validación mínima
        if (!origen || !destino || !tipo || !vehiculo || !isEmail(email)) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            return res.end(
                JSON.stringify({
                    ok: false,
                    error: "Campos inválidos",
                    hint: "Requiere origen, destino, tipo, vehiculo, email válido",
                })
            );
        }

        // 4) Entorno / Resend
        const API_KEY = process.env.RESEND_API_KEY;
        let FROM = process.env.FROM_EMAIL;

        if (!API_KEY) {
            // Error claro si falta la clave
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            return res.end(JSON.stringify({ ok: false, error: "Falta RESEND_API_KEY en Vercel" }));
        }

        // Remitente: si no hay FROM_EMAIL válido, caer a onboarding
        if (!FROM || !isEmail((FROM.match(/<(.+)>/) || [])[1] || FROM)) {
            FROM = "onboarding@resend.dev";
        }

        // Dirección de la empresa (aquí recibirás siempre)
        const TO_EMPRESA = "transporte@ibercarga.com";

        const resend = new Resend(API_KEY);

        const subject = `Ibercarga – Presupuesto de ${origen} a ${destino} (${tipo})`;

        // 5) Enviar a la empresa
        const adminResp = await resend.emails.send({
            from: FROM,               // p.ej. "no-reply@ibercarga.com" verificado, o onboarding@resend.dev
            to: [TO_EMPRESA],
            reply_to: isEmail(email) ? email : undefined,
            subject,
            html: emailHtml({ origen, destino, tipo, piezas, fecha, nombre, telefono, email, vehiculo }),
        });

        // 6) Enviar al cliente (copia con agradecimiento)
        const clienteResp = await resend.emails.send({
            from: FROM,
            to: [email],
            subject: "Ibercarga – Hemos recibido tu solicitud de presupuesto",
            html: emailHtml({ origen, destino, tipo, piezas, fecha, nombre, telefono, email, vehiculo }),
        });

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.end(
            JSON.stringify({
                ok: true,
                delivered: {
                    empresa: adminResp?.id ? true : false,
                    cliente: clienteResp?.id ? true : false,
                },
            })
        );
    } catch (err) {
        // Error detallado (sin exponer claves)
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        return res.end(
            JSON.stringify({
                ok: false,
                error: String(err && err.message ? err.message : err),
                name: err && err.name,
                code: err && (err.code || err.statusCode),
            })
        );
    }
};
