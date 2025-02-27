import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import vegetarianImg from '../../../assets/vegetarian.jpg';
import pepperoniImg from '../../../assets/pepperoni.jpg';
import hawaiianImg from '../../../assets/hawaiian.jpg';
import cheeseImg from '../../../assets/cheese.jpg';
import { useCart } from '../cart/CartContext';


export interface PizzaOptionProps {
  pizzaName: string;
  image: any;  // Changed from complex Vite type
  description: string;
  price: number;
}

export const PIZZA_OPTIONS: PizzaOptionProps[] = [
  {
    pizzaName: "Vegetarian",
    image: vegetarianImg,
    description: "Fresh vegetables, mushrooms, and olives on our signature sauce",
    price: 14.99
  },
  {
    pizzaName: "Pepperoni",
    image: pepperoniImg,
    description: "Classic pepperoni with mozzarella cheese, and our signature sauce",
    price: 13.99
  },
  {
    pizzaName: "Hawaiian",
    image: hawaiianImg,
    description: "Ham and pineapple with a sweet and savory blend",
    price: 15.99
  },
  {
    pizzaName: "Cheese",
    image: cheeseImg,
    description: "Our signature blend of mozzarella and marinara sauce",
    price: 12.99
  }
];

export default function PizzaOption({ pizzaName, image, description, price }: PizzaOptionProps) {
    const { addToCart } = useCart();  // Get addToCart function from context
  
  return (
    <Card sx={{ width: 345, height: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
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

