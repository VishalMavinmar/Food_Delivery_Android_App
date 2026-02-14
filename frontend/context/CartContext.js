import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
  setCart((prev) => {
    const existing = prev.find(item => item.id === food.id);

    if (existing) {
      return prev.map(item =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prev, { ...food, quantity: 1 }];
  });
};


  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
