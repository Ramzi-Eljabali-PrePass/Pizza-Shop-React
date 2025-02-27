import { Drawer, Box, Typography, IconButton, CardMedia, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from './CartContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CartItem from './CartItem';
import React from 'react';
import { PizzaOptionProps } from '../PizzaView/PizzaOption';


interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart } = useCart();
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
            <CartItem 
              key={item.pizzaName} 
              item={item}
              onRemove={() => removeFromCart(item.pizzaName)}
            />
          ))
        )}
      </Box>
    </Drawer>
  );
};

function PizzaOption({ pizzaName, image, description, price }: PizzaOptionProps) {
  const { addToCart } = useCart();  // Get addToCart function from context

return (
  <Card sx={{ width: 150, height: 100, m: 2 }}>
    <CardMedia
      component="img"
      height="140"
      width="140"
      image={image}
      alt={pizzaName}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {pizzaName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
        ${price.toFixed(2)}
      </Typography>
    </CardContent>
    <CardActions>
      <Button 
        size="small" 
        color="primary" 
        onClick={() => addToCart(pizzaName, price, image)}>
        Add to Order
      </Button>
    </CardActions>
  </Card>
);
}

export default CartDrawer;