export default function Alert({ type = "success", children, onClose }) {
    const palette = type === "success"
        ? { bg: "bg-green-50", border: "border-green-200", text: "text-green-800" }
        : { bg: "bg-red-50", border: "border-red-200", text: "text-red-800" };

    return (
        <div className={`mt-4 rounded-lg border ${palette.bg} ${palette.border} px-4 py-3`}>
            <div className={`text-sm ${palette.text} flex items-start gap-3`}>
                <span className="font-semibold">{type === "success" ? "¡Listo!" : "Ups…"}</span>
                <span className="flex-1">{children}</span>
                {onClose && (
                    <button onClick={onClose} className="text-sm underline">Cerrar</button>
                )}
            </div>
        </div>
    );
}
