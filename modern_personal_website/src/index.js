import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './config/i18n'
import './styles/tokens.css'
import './styles/base.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Translations load over HTTP; wait for them instead of flashing raw keys. */}
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>
);
