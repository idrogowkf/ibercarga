import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<HomePage language="es"/>}/>
    <Route path="/en/" element={<HomePage language="en"/>}/>
    <Route path="/en/:slug/" element={<ServicePage language="en"/>}/>
    <Route path="/:slug/" element={<ServicePage language="es"/>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes></BrowserRouter>;
}
