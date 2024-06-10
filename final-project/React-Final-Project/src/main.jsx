// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CategoryProvider } from './contexts/CategoriesContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { AuctionProvider } from './contexts/AuctionContext.jsx';
import { ColorProvider } from './contexts/ColorContext.jsx';
import LoveProvider from './contexts/LoveContext.jsx';
import { SocketProvider } from './contexts/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <ColorProvider>
      <LoveProvider>
        <CategoryProvider>
          <ProductsProvider>
            <AuctionProvider>
              <CartProvider>
                <BrowserRouter>
                  <SocketProvider>
                    <React.StrictMode>
                      <App />
                    </React.StrictMode>
                  </SocketProvider>
                </BrowserRouter>
              </CartProvider>
            </AuctionProvider>
          </ProductsProvider>
        </CategoryProvider>
      </LoveProvider>
    </ColorProvider>
  </UserProvider>
);
