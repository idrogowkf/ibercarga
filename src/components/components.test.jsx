import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CTA from './CTA';
import Header from './Header';
import Hero from './Hero';
import QuoteForm from './QuoteForm';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe('V12 shared components', () => {
  it('uses the approved V12 identity, hero and quote card primitives', () => {
    const { container } = render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Header /><Hero><CTA /></Hero></MemoryRouter>);
    expect(container.querySelector('header.v12-header .mark')).toHaveTextContent('');
    expect(container.querySelectorAll('header.v12-header .mark i')).toHaveLength(3);
    expect(screen.getByRole('heading', { level: 1, name: 'Ibercarga' })).toHaveClass('display', 'heroTitle');
    expect(container.querySelector('section.hero')).toBeInTheDocument();
    expect(screen.getByText('Soluciones')).toHaveAttribute('href', '#precios');
    expect(screen.getByRole('heading', { name: 'Obtén tu presupuesto en minutos' })).toBeInTheDocument();
  });

  it('renders the form with the approved V12 quote card structure', () => {
    const { container } = render(<QuoteForm />);
    expect(container.querySelector('form.quoteCard')).toBeInTheDocument();
    expect(container.querySelector('button.btn.btnPrimary')).toBeInTheDocument();
  });

  it('links the language selector to the exact service equivalent', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Header language="es" home={false} alternatePath="/en/transformer-transport" /></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'ES ▾' })).toHaveAttribute('href', '/en/transformer-transport');
  });

  it('posts the untouched V12 form fields exactly to /api/send-quote', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    render(<QuoteForm />);
    fireEvent.change(screen.getByPlaceholderText('Origen (Ciudad o CP)'), { target: { value: 'Bilbao' } });
    fireEvent.change(screen.getByPlaceholderText('Destino (Ciudad o CP)'), { target: { value: 'Madrid' } });
    fireEvent.change(screen.getByPlaceholderText('Tipo de carga (ej. vigas 30m, 4 uds)'), { target: { value: 'Viga 30 m' } });
    fireEvent.change(screen.getByLabelText('Fecha del servicio'), { target: { value: '2026-09-10' } });
    fireEvent.change(screen.getByPlaceholderText('Nombre o empresa'), { target: { value: 'ACME' } });
    fireEvent.change(screen.getByPlaceholderText('Teléfono'), { target: { value: '600000000' } });
    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'logistica@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Obtener presupuesto/ }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/send-quote');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({
      origen: 'Bilbao', destino: 'Madrid', tipo: 'Viga 30 m', vehiculo: 'Góndola cama baja', piezas: 1,
      fecha: '2026-09-10', nombre: 'ACME', telefono: '600000000', email: 'logistica@example.com',
    });
  });

  it('keeps every form control labelled and localizes English presentation without changing field names', () => {
    render(<QuoteForm language="en" />);
    expect(screen.getByLabelText('Origin (city or postcode)')).toHaveAttribute('name', 'origen');
    expect(screen.getByLabelText('Destination (city or postcode)')).toHaveAttribute('name', 'destino');
    expect(screen.getByLabelText('Cargo type (for example, a 30 m beam)')).toHaveAttribute('name', 'tipo');
    expect(screen.getByLabelText('Name or company')).toHaveAttribute('name', 'nombre');
    expect(screen.getByLabelText('Telephone')).toHaveAttribute('name', 'telefono');
    expect(screen.getByLabelText('Email address')).toHaveAttribute('name', 'email');
    expect(screen.getByRole('button', { name: /Request a quote/ })).toBeInTheDocument();
  });
});
