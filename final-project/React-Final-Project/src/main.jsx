import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CategoryProvider } from './contexts/CategoriesContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import { ProductsProvider } from './contexts/ProductsContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <CategoryProvider>
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <React.StrictMode>
              <App />
            </React.StrictMode>,
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </CategoryProvider>
  </UserProvider>
)
