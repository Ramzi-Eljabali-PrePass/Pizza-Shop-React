import { Drawer, Box, Typography, IconButton, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const cartItems = Object.values(cart);

  const handleCheckout = () => {
    onClose(); // Close the drawer
    clearCart(); // Clear the cart
    navigate('/order-tracking'); // Navigate to order tracking
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 350, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          cartItems.map((item) => (
            <CartItem 
              key={item.pizzaName} 
              item={item}
              onRemove={() => removeFromCart(item.pizzaName)}
            />
          ))
        )}
        {cartItems.length > 0 && (
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;