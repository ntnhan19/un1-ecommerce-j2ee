// src/context/CartContext.jsx
import { createContext, useState, useEffect, useMemo } from "react";

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

// Safe JSON parse with fallback
const safeParseJSON = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

export const CartProvider = ({ children }) => {
  // Lazy init từ localStorage — đọc 1 lần duy nhất khi mount
  const [cartItems, setCartItems] = useState(() => safeParseJSON('cart_items', []));
  const [coupon, setCoupon] = useState(() => safeParseJSON('cart_coupon', ''));

  // Persist cartItems xuống localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist coupon xuống localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('cart_coupon', JSON.stringify(coupon));
  }, [coupon]);

  const subtotal = useMemo(
    () => cartItems.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0),
    [cartItems]
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Discount reactive: tính lại mỗi khi subtotal hoặc coupon thay đổi
  // Không lưu discount vào state để tránh stale value khi thêm/xóa sản phẩm sau khi apply coupon
  const discount = useMemo(() => {
    if (coupon === 'SAVE10') return Math.round(subtotal * 0.1);
    return 0;
  }, [coupon, subtotal]);

  const applyCoupon = (code) => {
    setCoupon(code);
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
    setCoupon('');
    localStorage.removeItem('cart_items');
    localStorage.removeItem('cart_coupon');
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
