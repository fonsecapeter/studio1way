import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './components/app';

import './assets/scss/base.scss';
import './assets/img/favicon.ico';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </HelmetProvider>,
);