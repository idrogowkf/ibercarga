import { useState } from "react";

export default function useSendQuote() {
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [error, setError] = useState("");

    async function sendQuote(payload) {
        try {
            setStatus("loading");
            setError("");

            const res = await fetch("/api/send-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || data?.ok !== true) {
                setStatus("error");
                setError(data?.error || "No se pudo enviar el correo.");
                return { ok: false, data };
            }

            setStatus("success");
            return { ok: true, data };
        } catch (e) {
            setStatus("error");
            setError(e?.message || "Error de red.");
            return { ok: false, error: e };
        }
    }

    function reset() {
        setStatus("idle");
        setError("");
    }

    return { status, error, sendQuote, reset };
}
