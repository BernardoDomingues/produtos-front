import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { LoginProvider } from "./providers/login";
import { ProductsProvider } from './providers/products';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </LoginProvider>
  </React.StrictMode>
);
