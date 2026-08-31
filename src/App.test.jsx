import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';

afterEach(cleanup);

describe('global V12 contact actions', () => {
  it('renders the configured WhatsApp action on every route', () => {
    window.history.pushState({}, '', '/transporte-eolico');
    render(<App />);
    const link = screen.getByRole('link', { name: 'WhatsApp' });
    expect(link).toHaveAttribute('href', 'https://wa.me/34624473123?text=Hola.%20Necesito%20informaci%C3%B3n%20sobre%20un%20transporte%20especial.');
  });

  it('renders the Spanish quote action on Spanish routes', () => {
    window.history.pushState({}, '', '/');
    const { container } = render(<App />);
    const quote = container.querySelector('a.floatQuote');
    expect(quote).toHaveAttribute('href', '#presupuesto');
    expect(quote).toHaveTextContent('Solicitar presupuesto');
    expect(screen.getByRole('complementary', { name: 'Acciones de contacto' })).toBeInTheDocument();
  });

  it('renders the English quote action on English routes', () => {
    window.history.pushState({}, '', '/en');
    const { container } = render(<App />);
    const quote = container.querySelector('a.floatQuote');
    expect(quote).toHaveAttribute('href', '#presupuesto');
    expect(quote).toHaveTextContent('Request a quote');
    expect(screen.getByRole('complementary', { name: 'Contact actions' })).toBeInTheDocument();
  });
});
