import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { SiteRoutes } from './App';

export function renderPage(pathname) {
  return renderToString(
    <StaticRouter location={pathname} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SiteRoutes />
    </StaticRouter>,
  );
}
