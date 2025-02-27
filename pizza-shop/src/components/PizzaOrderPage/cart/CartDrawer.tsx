import { Drawer, Box, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, clearCart, getTotal } = useCart();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartItems = Object.values(cart);

  const handleCheckout = async () => {
    if (!customerName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Create order object
      const orderData = {
        customerName: customerName.trim(),
        items: cartItems.map(item => `${item.pizzaName} (x${item.quantity})`),
        status: 'received',
        timestamp: serverTimestamp(),
        total: getTotal(),
      };

      // Add order to Firestore
      const docRef = await addDoc(collection(db, 'orders'), orderData);

      // Close drawer and clear cart
      onClose();
      clearCart();

      // Navigate to order tracking with the order ID
      navigate('/order-tracking', { 
        state: { 
          orderId: docRef.id,
          customerName: customerName.trim() 
        } 
      });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
      handleCloseDialog();
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCustomerName('');
    setIsSubmitting(false);
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
            <>
              {cartItems.map((item) => (
                <CartItem 
                  key={item.pizzaName} 
                  item={item}
                  onRemove={() => removeFromCart(item.pizzaName)}
                />
              ))}
              <Typography variant="h6" sx={{ mt: 2, textAlign: 'right' }}>
                Total: ${getTotal().toFixed(2)}
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={handleOpenDialog}
              >
                Checkout
              </Button>
            </>
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
            disabled={isSubmitting}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleCheckout}
            disabled={!customerName.trim() || isSubmitting}
            color="primary"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Order'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartDrawer;