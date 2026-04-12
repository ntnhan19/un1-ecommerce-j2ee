// src/context/CartContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);   // data từ server
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');

  // ── Fetch cart từ server ──────────────────────────────────────────────────
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/api/cart');
      // items trả về từ CartResponse
      setCartItems(res.data?.data?.items || []);
    } catch (err) {
      // Nếu chưa login thì cart rỗng, không cần báo lỗi
      if (err.response?.status !== 401) {
        console.error('Failed to fetch cart:', err);
      }
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load cart khi mount (user đã login)
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ── Add to cart ───────────────────────────────────────────────────────────
  const addToCart = async (product, quantity = 1, size = 'M', color = 'Đen') => {
    try {
      const res = await axiosInstance.post('/api/cart/items', {
        productId: product.id,
        quantity,
        size,
        color,
      });
      setCartItems(res.data?.data?.items || []);
    } catch (err) {
      const msg = err.response?.data?.message || 'Không thể thêm vào giỏ hàng';
      throw new Error(msg); // để UI bắt & hiển thị
    }
  };

  // ── Update quantity ───────────────────────────────────────────────────────
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const res = await axiosInstance.patch(`/api/cart/items/${cartItemId}`, { quantity });
      setCartItems(res.data?.data?.items || []);
    } catch (err) {
      console.error('Update quantity failed:', err);
    }
  };

  // ── Remove item ───────────────────────────────────────────────────────────
  const removeFromCart = async (cartItemId) => {
    try {
      const res = await axiosInstance.delete(`/api/cart/items/${cartItemId}`);
      setCartItems(res.data?.data?.items || []);
    } catch (err) {
      console.error('Remove item failed:', err);
    }
  };

  // ── Clear cart (gọi sau khi đặt hàng thành công) ─────────────────────────
  const clearCart = () => {
    // Backend đã clear trong OrderService, chỉ cần reset state
    setCartItems([]);
    setCoupon('');
  };

  // ── Tính toán ─────────────────────────────────────────────────────────────
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity, 0
  );

  const discount = coupon === 'SAVE10' ? Math.round(subtotal * 0.1) : 0;

  const total = Math.max(subtotal - discount, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code) => setCoupon(code);

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      subtotal,
      discount,
      total,
      totalItems,
      coupon,
      fetchCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      applyCoupon,
    }}>
      {children}
    </CartContext.Provider>
  );
};