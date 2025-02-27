import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material';
import { CartItem as CartItemType } from './cart';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
}

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={item.image}
        alt={item.pizzaName}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{item.pizzaName}</Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity: {item.quantity}
        </Typography>
        <Typography variant="body1">
          ${(item.price * item.quantity).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={onRemove}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
} 