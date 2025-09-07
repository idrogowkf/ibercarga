// api/send-quote.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ ok: false, error: "Method Not Allowed" });
    }

    try {
        const {
            origen,
            destino,
            tipo,
            piezas,
            fecha,
            nombre,
            telefono,
            email,     // <-- NUEVO: email del cliente
            vehiculo,
        } = req.body || {};

        // Validación de campos
        const required = { origen, destino, tipo, piezas, fecha, nombre, telefono, email, vehiculo };
        for (const [k, v] of Object.entries(required)) {
            if (!v) return res.status(400).json({ ok: false, error: `Falta el campo: ${k}` });
        }

        // Logo (usa el favicon del sitio)
        const origin = req.headers.origin || "https://ibercarga.vercel.app";
        const logoUrl = `${origin}/favicon.svg`;

        // HTML básico común (estilos Ibercarga)
        const styles = `
      font-family: Arial, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, 'Helvetica Neue', sans-serif;
    `;
        const card = (content) => `
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;box-shadow:0 6px 20px rgba(0,0,0,.06);overflow:hidden">
        <div style="background:linear-gradient(135deg,#4338CA,#1D4ED8,#0EA5E9);padding:18px">
          <table width="100%"><tr>
            <td width="42"><img src="${logoUrl}" width="32" height="32" style="display:block;border-radius:6px"/></td>
            <td><div style="color:#fff;font-weight:800;font-size:18px;letter-spacing:.3px">Ibercarga</div>
            <div style="color:#DBEAFE;font-size:12px">Colossal Movement</div></td>
          </tr></table>
        </div>
        <div style="padding:20px">${content}</div>
        <div style="padding:14px 20px;border-top:1px solid #eef2f7;color:#6b7280;font-size:12px">
          © ${new Date().getFullYear()} Ibercarga · +34 624 473 123 · contacto@ibercarga.com
        </div>
      </div>
    `;

        const row = (label, value) => `
      <tr>
        <td style="padding:8px 12px;color:#374151;font-weight:600;background:#F9FAFB;border:1px solid #eef2f7">${label}</td>
        <td style="padding:8px 12px;color:#111827;border:1px solid #eef2f7">${value}</td>
      </tr>
    `;

        // -------- Correo para TI (admin) --------
        const adminSubject = `Nueva solicitud — ${tipo} (${piezas} uds) ${origen} → ${destino}`;
        const adminHtmlInner = `
      <h2 style="margin:0 0 10px 0;color:#111827">Nueva solicitud de presupuesto</h2>
      <p style="margin:0 0 12px 0;color:#4B5563">Has recibido una nueva solicitud desde el formulario web.</p>
      <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #eef2f7;border-radius:10px;overflow:hidden">
        ${row("Ruta", `${origen} → ${destino}`)}
        ${row("Tipo de carga", tipo)}
        ${row("N.º de piezas", piezas)}
        ${row("Fecha del servicio", fecha)}
        ${row("Vehículo", vehiculo)}
        ${row("Nombre/Organización", nombre)}
        ${row("Teléfono", telefono)}
        ${row("Email cliente", email)}
      </table>
    `;
        const adminHtml = `<div style="${styles}">${card(adminHtmlInner)}</div>`;

        // -------- Correo para el CLIENTE --------
        const clientSubject = `Ibercarga — Solicitud recibida (${origen} → ${destino})`;
        const clientHtmlInner = `
      <h2 style="margin:0 0 10px 0;color:#111827">¡Gracias por tu solicitud, ${nombre}!</h2>
      <p style="margin:0 0 12px 0;color:#4B5563">
        Hemos recibido tu petición de presupuesto y nuestro equipo te contactará en breve.<br/>
        A continuación, el resumen:
      </p>
      <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #eef2f7;border-radius:10px;overflow:hidden">
        ${row("Ruta", `${origen} → ${destino}`)}
        ${row("Tipo de carga", tipo)}
        ${row("N.º de piezas", piezas)}
        ${row("Fecha del servicio", fecha)}
        ${row("Vehículo", vehiculo)}
        ${row("Contacto", `${nombre} · ${telefono}`)}
      </table>
      <p style="margin:14px 0 0 0;color:#374151">
        Si necesitas añadir planos, fotos o medidas exactas, puedes responder a este correo.
      </p>
      <p style="margin:6px 0 0 0;color:#111827;font-weight:600">Ibercarga · +34 624 473 123</p>
    `;
        const clientHtml = `<div style="${styles}">${card(clientHtmlInner)}</div>`;

        // Envío vía Resend (2 emails)
        const send = async (payload) =>
            fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

        // 1) Admin
        const r1 = await send({
            from: "Ibercarga <no-reply@ibercarga.dev>", // usa un remitente verificado en Resend
            to: ["contacto@ibercarga.com"],
            subject: adminSubject,
            html: adminHtml,
            reply_to: email, // para que puedas responder directo al cliente
        });

        if (!r1.ok) {
            const err = await r1.text().catch(() => "");
            return res.status(500).json({ ok: false, error: `Resend admin error: ${err}` });
        }

        // 2) Cliente
        const r2 = await send({
            from: "Ibercarga <no-reply@ibercarga.dev>",
            to: [email],
            subject: clientSubject,
            html: clientHtml,
        });

        if (!r2.ok) {
            const err = await r2.text().catch(() => "");
            // Aunque falle el mail al cliente, devolvemos 200 para no cortar la UX.
            return res.status(200).json({ ok: true, warning: `No se pudo enviar al cliente: ${err}` });
        }

        return res.status(200).json({ ok: true });
    } catch (e) {
        return res.status(500).json({ ok: false, error: e?.message || "Unknown error" });
    }
}
