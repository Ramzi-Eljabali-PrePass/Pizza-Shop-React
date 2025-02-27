import React, { StrictMode }  from "react"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { CartProvider } from './components/PizzaOrderPage/cart/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)
