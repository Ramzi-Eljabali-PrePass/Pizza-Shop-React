import React, { StrictMode }  from "react"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CartProvider } from './components/PizzaOrderPage/cart/CartContext'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
