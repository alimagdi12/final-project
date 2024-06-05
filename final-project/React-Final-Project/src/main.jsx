import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CategoryProvider } from './contexts/CategoriesContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { ProductsProvider } from './contexts/ProductsContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuctionProvider } from './contexts/AuctionContext.jsx'
import { ColorProvider } from './contexts/ColorContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <ColorProvider>
    <CategoryProvider>
      <ProductsProvider>
        <AuctionProvider>
          <CartProvider>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>,
          </BrowserRouter>
        </CartProvider>
        </AuctionProvider>
      </ProductsProvider>
    </CategoryProvider>
    </ColorProvider>
    
  </UserProvider>
)
