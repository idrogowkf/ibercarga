import '@testing-library/jest-dom/vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import '../test/setup';
import { findServiceByPath, homePages } from '../data/services';
import HomePage from './HomePage';
import ServicePage from './ServicePage';

describe('page composition', () => {
  it('keeps every approved V12 home section in its original order', () => {
    const { container } = render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><HomePage page={homePages.es} /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'Ibercarga' })).toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute('data-layout', 'v12');
    expect([...container.querySelectorAll('main > section')].map((node) => node.id || node.getAttribute('data-section'))).toEqual([
      null, 'precios', 'como-funciona', 'galeria', 'testimonios', 'faq',
    ]);
  });

  it('renders a reusable landing with breadcrumb, unique content, FAQ, related links and form', () => {
    const page = findServiceByPath('/transporte-eolico');
    const { container } = render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={[page.path]}><Routes><Route path={page.path} element={<ServicePage page={page} />} /></Routes></MemoryRouter>);
    expect(container.querySelector('[data-layout="v12"]')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: page.heading })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Migas de pan' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Preguntas frecuentes sobre transporte eólico' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Servicios relacionados' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Obtener presupuesto/ })).toBeInTheDocument();
  });

  it('renders the existing English home with English hero content', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><HomePage page={homePages.en} /></MemoryRouter>);
    expect(screen.getByText(homePages.en.intro)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request a quote/ })).toBeInTheDocument();
  });
});
