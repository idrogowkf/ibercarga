import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FloatingActions from './components/FloatingActions';
import { authors, guideRoutes, guides, guidesIndexPages } from './data/guides.mjs';
import { homePages, serviceRoutes } from './data/services';
import AuthorPage from './pages/AuthorPage';
import GuidePage from './pages/GuidePage';
import GuidesIndexPage from './pages/GuidesIndexPage';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';

export function SiteRoutes() {
  return <>
      <Routes>
        <Route path="/" element={<HomePage page={homePages.es} />} />
        <Route path="/en" element={<HomePage page={homePages.en} />} />
        {serviceRoutes.map((page) => <Route key={page.path} path={page.path} element={<ServicePage page={page} />} />)}
        <Route path={guidesIndexPages.es.path} element={<GuidesIndexPage page={guidesIndexPages.es} />} />
        <Route path={guidesIndexPages.en.path} element={<GuidesIndexPage page={guidesIndexPages.en} />} />
        <Route path={authors.es.path} element={<AuthorPage page={authors.es} />} />
        <Route path={authors.en.path} element={<AuthorPage page={authors.en} />} />
        {guides.map((page) => <Route key={page.path} path={page.path} element={<GuidePage page={page} />} />)}
        <Route path="*" element={<main className="section"><div className="wrap"><h1>404</h1><p>La página solicitada no existe.</p><a href="/">Volver a Ibercarga</a></div></main>} />
      </Routes>
      <FloatingActions />
    </>;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SiteRoutes />
    </BrowserRouter>
  );
}
