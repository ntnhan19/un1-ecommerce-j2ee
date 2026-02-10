// src/context/CartContext.jsx
import { createContext, useState, useMemo } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = useMemo(
    () => cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
    [cartItems]
  );

  const applyCoupon = (code) => {
    setCoupon(code);
    setDiscount(code === "SAVE10" ? Math.round(subtotal * 0.1) : 0);
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(items =>
      items.map(i =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(i => i.id !== id));
  };

  const addToCart = (product) => {
    setCartItems(items => {
      const found = items.find(i => i.id === product.id);
      if (found) {
        return items.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      subtotal,
      discount,
      total: Math.max(subtotal - discount, 0),
      coupon,
      applyCoupon,
      updateQuantity,
      removeFromCart,
      addToCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
