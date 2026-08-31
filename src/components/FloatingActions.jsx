import React from 'react';
import { useLocation } from 'react-router-dom';

const WHATSAPP_NUMBER = '34624473123';
const WHATSAPP_MESSAGE = 'Hola. Necesito información sobre un transporte especial.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const copy = {
  es: { actions: 'Acciones de contacto', quote: 'Solicitar presupuesto' },
  en: { actions: 'Contact actions', quote: 'Request a quote' },
};

export default function FloatingActions() {
  const { pathname } = useLocation();
  const language = pathname.split('/')[1] === 'en' ? 'en' : 'es';
  const labels = copy[language];
  return (
    <aside className="floatingActions" aria-label={labels.actions}>
      <a className="floatQuote" href="#presupuesto">{labels.quote}</a>
      <a className="floatWhatsApp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M27.3 4.7A15.7 15.7 0 0 0 2.6 23.6L.5 31.5l8.1-2.1A15.7 15.7 0 1 0 27.3 4.7Zm-11.1 24a12.7 12.7 0 0 1-6.5-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5a12.7 12.7 0 1 1 10.8 6Zm7-9.5c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.7-.2-1 .2-.3.4-1.1 1.3-1.4 1.6-.3.3-.5.3-.9.1-2.4-1.2-4-2.2-5.6-5-.4-.7.4-.7 1.2-2.3.1-.3.1-.6 0-.8-.1-.2-1-2.5-1.4-3.4-.4-.9-.8-.8-1-.8h-.9c-.3 0-.8.1-1.2.6-.4.4-1.6 1.6-1.6 3.9s1.7 4.5 1.9 4.8c.2.3 3.3 5.1 8.1 7.1 3 1.3 4.2 1.4 5.7 1.2.9-.1 2.4-1 2.8-1.9.3-.9.3-1.7.2-1.9-.2-.2-.5-.3-.9-.5Z" />
        </svg>
      </a>
    </aside>
  );
}
