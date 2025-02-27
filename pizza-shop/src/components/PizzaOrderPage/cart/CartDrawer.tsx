import { Drawer, Box, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const cartItems = Object.values(cart);

  const handleCheckout = () => {
    onClose(); // Close the drawer
    clearCart(); // Clear the cart
    navigate('/order-tracking', { state: { customerName } }); // Pass customer name to order tracking
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCustomerName('');
  };

  const handleConfirmCheckout = () => {
    if (customerName.trim()) {
      handleCheckout();
      handleCloseDialog();
    }
  };

  return (
    <>
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
              onClick={handleOpenDialog}
            >
              Checkout
            </Button>
          )}
        </Box>
      </Drawer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Enter Your Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleConfirmCheckout}
            disabled={!customerName.trim()}
          >
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartDrawer;