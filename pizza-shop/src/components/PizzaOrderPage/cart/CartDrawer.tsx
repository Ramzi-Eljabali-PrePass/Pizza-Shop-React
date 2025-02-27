import { Drawer, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from './CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart } = useCart();
  const cartItems = Object.values(cart);

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
            <Typography key={item.pizzaName}>{item.pizzaName}</Typography>
          ))
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer; 