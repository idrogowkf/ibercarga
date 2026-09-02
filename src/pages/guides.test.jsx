import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import GuidePage from './GuidePage';
import GuidesIndexPage from './GuidesIndexPage';
import { guides, guidesIndexPages } from '../data/guides';

afterEach(cleanup);

describe('technical guide page', () => {
  it.each([
    [guidesIndexPages.es, 'Autorización de transporte especial en España'],
    [guidesIndexPages.en, 'Planning an abnormal-load permit in Spain'],
  ])('renders the visual hub without author promotion', (page, firstGuide) => {
    const { container } = render(<MemoryRouter><GuidesIndexPage page={page} /></MemoryRouter>);
    expect(container.querySelectorAll('.guideVisualCard')).toHaveLength(3);
    expect(container.querySelectorAll('.guideVisualCard img')).toHaveLength(3);
    expect(screen.getByRole('heading', { name: firstGuide })).toBeTruthy();
    expect(container).not.toHaveTextContent(page.language === 'en' ? 'Planning precast beam transport and delivery' : 'Planificación del transporte de vigas prefabricadas');
    expect(screen.queryByText('Luis Idrogo')).toBeNull();
    expect(container.querySelector('#presupuesto')).toBeNull();
  });

  it.each([
    ['/guias/autorizacion-transporte-especial-espana', 'Autorización de transporte especial en España', 'Solicitar presupuesto'],
    ['/guias/datos-presupuesto-transporte-especial', 'Qué datos necesita un presupuesto de transporte especial', 'Solicitar presupuesto'],
    ['/guias/estudio-ruta-transporte-especial', 'Cómo se realiza un estudio de ruta de transporte especial', 'Solicitar presupuesto'],
    ['/en/guides/abnormal-load-permit-spain', 'Planning an abnormal-load permit in Spain', 'Request a quote'],
    ['/en/guides/special-transport-quote-information', 'Preparing a useful special transport enquiry', 'Request a quote'],
    ['/en/guides/abnormal-load-route-survey', 'What an abnormal-load route survey should establish', 'Request a quote'],
  ])('renders a scan-friendly article without redundant quote forms on %s', (path, heading, quoteLabel) => {
    const page = guides.find((guide) => guide.path === path);
    const { container } = render(<MemoryRouter><GuidePage page={page} /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeTruthy();
    expect(screen.queryByText('Luis Idrogo')).toBeNull();
    expect(container.querySelector('a[href="/autor/luis-idrogo"], a[href="/en/author/luis-idrogo"]')).toBeNull();
    expect(screen.getAllByRole('link', { name: quoteLabel })).toHaveLength(1);
    expect(document.querySelector('#presupuesto')).toBeNull();
    expect(screen.getByRole('navigation', { name: page.language === 'en' ? 'On this page' : 'En esta guía' })).toBeTruthy();
    expect(container.querySelectorAll('.articleStepCard').length).toBe(page.sections.length);
    expect(screen.getByRole('heading', { name: page.language === 'en' ? 'Other technical guides' : 'Otras guías técnicas' })).toBeTruthy();
    expect(container.querySelectorAll('.relatedGuideSection .guideVisualCard')).toHaveLength(3);
    expect(container.querySelector('.relatedGuideSection')).not.toHaveTextContent(page.language === 'en' ? 'Planning precast beam transport and delivery' : 'Planificación del transporte de vigas prefabricadas');
  });

  it('shows identified official permit sources', () => {
    const page = guides.find(({ path }) => path === '/guias/autorizacion-transporte-especial-espana');
    render(<MemoryRouter><GuidePage page={page} /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /Dirección General de Tráfico/ })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Reglamento General de Circulación/ })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Servei Català de Trànsit/ })).toBeTruthy();
  });
});
