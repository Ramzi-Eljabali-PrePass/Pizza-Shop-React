export interface CartItem {
  pizzaName: string;
  price: number;
  image: any;
  quantity: number;
}

export interface CartContextType {
  cart: { [key: string]: CartItem };
  addToCart: (pizzaName: string, price: number, image: any) => void;
  removeFromCart: (pizzaName: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCartItemCount: () => number;
} 