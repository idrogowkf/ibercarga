import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root');
const application = <React.StrictMode><App/></React.StrictMode>;
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, application);
else ReactDOM.createRoot(root).render(application);
