// src/context/CartContext.jsx
import { createContext, useState, useMemo } from "react";

export const CartContext = createContext(null);

// Helper function to parse price from string or return number
const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    // Remove "VND" and spaces, then remove dots (thousand separators in Vietnamese)
    const cleaned = price.replace(/VND/gi, '').replace(/\s/g, '').replace(/\./g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = useMemo(
    () => cartItems.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0),
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
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

  const updateItemAttributes = (id, attributes) => {
    setCartItems(items =>
      items.map(i =>
        i.id === id ? { ...i, ...attributes } : i
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

  const clearCart = () => {
    setCartItems([]);
    setCoupon("");
    setDiscount(0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      subtotal,
      discount,
      total: Math.max(subtotal - discount, 0),
      totalItems,
      coupon,
      applyCoupon,
      updateQuantity,
      updateItemAttributes,
      removeFromCart,
      addToCart,
      clearCart,
      parsePrice // Export helper for components
    }}>
      {children}
    </CartContext.Provider>
  );
};


