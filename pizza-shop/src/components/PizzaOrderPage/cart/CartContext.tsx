import React, { createContext, useState, useContext } from 'react';
import { CartItem, CartContextType } from './cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

  const addToCart = (pizzaName: string, price: number, image: any) => {
    setCart(currentCart => {
      const updatedCart = { ...currentCart };
      if (pizzaName in updatedCart) {
        updatedCart[pizzaName] = {
          ...updatedCart[pizzaName],
          quantity: updatedCart[pizzaName].quantity + 1
        };
      } else {
        updatedCart[pizzaName] = {
          pizzaName,
          price,
          image,
          quantity: 1
        };
      }
      return updatedCart;
    });
  };

  const removeFromCart = (pizzaName: string) => {
    setCart(currentCart => {
      const updatedCart = { ...currentCart };
      if (updatedCart[pizzaName].quantity > 1) {
        updatedCart[pizzaName] = {
          ...updatedCart[pizzaName],
          quantity: updatedCart[pizzaName].quantity - 1
        };
      } else {
        delete updatedCart[pizzaName];
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const getTotal = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}