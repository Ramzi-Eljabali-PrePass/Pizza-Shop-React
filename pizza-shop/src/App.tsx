import './App.css'
import { Container } from "@mui/material";
import PizzaGrid from './components/PizzaOrderPage/PizzaView/PizzaGrid';
import NavBar from './components/NavBar';
import { useCart } from './components/PizzaOrderPage/cart/CartContext';
import { useState } from 'react';
import CartDrawer from './components/PizzaOrderPage/cart/CartDrawer';

function App() {
  const { getCartItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <NavBar 
        shopName="Jared's Pizza Shop" 
        cartItemCount={getCartItemCount()}
        onCartClicked={() => setIsCartOpen(true)}
      />
      <div style={{paddingTop: "64px"}}>
        <Container>
          <PizzaGrid />
        </Container>
      </div>
      <CartDrawer 
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

export default App
