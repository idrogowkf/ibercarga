import React from 'react';

export default function Alert({ type = 'info', children, onClose }) {
  const tone = type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-slate-50 border-slate-200 text-slate-700';
  return (
    <div className={`mt-4 rounded-xl border p-3 text-sm ${tone}`} role="status">
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">{type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️'}</div>
        <div className="flex-1">{children}</div>
        {onClose && <button type="button" onClick={onClose} className="shrink-0 rounded-lg px-2 py-1 hover:bg-black/5" aria-label="Cerrar">✖</button>}
      </div>
    </div>
  );
}
