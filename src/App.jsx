import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import FloatingActions from './components/FloatingActions';
import { homePages, serviceRoutes } from './data/services';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomePage page={homePages.es} />} />
        <Route path="/en" element={<HomePage page={homePages.en} />} />
        {serviceRoutes.map((page) => <Route key={page.path} path={page.path} element={<ServicePage page={page} />} />)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <FloatingActions />
    </BrowserRouter>
  );
}
