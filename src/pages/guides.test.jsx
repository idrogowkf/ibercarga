import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import GuidePage from './GuidePage';
import { guides } from '../data/guides';

afterEach(cleanup);

describe('technical guide page', () => {
  it.each([
    ['/guias/autorizacion-transporte-especial-espana', 'Autorización de transporte especial en España', 'Solicitar presupuesto'],
    ['/en/guides/precast-beam-transport', 'Planning precast beam transport and delivery', 'Request a quote'],
  ])('renders editorial, conversion and quote elements on %s', (path, heading, quoteLabel) => {
    const page = guides.find((guide) => guide.path === path);
    render(<MemoryRouter><GuidePage page={page} /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeTruthy();
    expect(screen.getAllByText('Luis Idrogo').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: quoteLabel }).length).toBeGreaterThanOrEqual(3);
    expect(document.querySelector('#presupuesto')).toBeTruthy();
  });
});
