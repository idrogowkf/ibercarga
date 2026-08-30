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

  it('renders a same-page quote action targeting the shared form', () => {
    window.history.pushState({}, '', '/en/heavy-haul');
    const { container } = render(<App />);
    expect(container.querySelector('a.floatQuote')).toHaveAttribute('href', '#presupuesto');
  });
});
