import React from 'react';
import PizzaOption, { PIZZA_OPTIONS } from "./PizzaOption";

export default function PizzaGrid() {
  return (
    <div className="container">
        {PIZZA_OPTIONS.map((pizza) => (
          <div key={pizza.pizzaName}>
            <PizzaOption 
              pizzaName={pizza.pizzaName} 
              image={pizza.image}
              description={pizza.description} 
              price={pizza.price} 
            />
          </div>
        ))}
    </div>
  );
}