import { Container, Grid } from "@mui/material";
import PizzaOption, { PIZZA_OPTIONS } from "./PizzaOption";

export default function PizzaGrid() {
  return (
    <div className="container">
        {PIZZA_OPTIONS.map((pizza) => (
          <div>
          <PizzaOption 
          key={pizza.pizzaName} 
          image={pizza.image}
          pizzaName={pizza.pizzaName} 
          description={pizza.description} 
          price={pizza.price} />
        </div>
        ))}
    </div>
  );
}