import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Header from '../components/common/Header';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import CouponInput from '../components/cart/CouponInput';
import RecommendedProducts from '../components/cart/RecommendedProducts';
import '../styles/components/ShoppingCart.css';

const ShoppingCart = () => {
  const { cartItems } = useCart();

  const isEmpty = cartItems.length === 0;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <Header />

      <div className="cart-title-bar">
        <h1>GIỎ HÀNG CỦA BẠN</h1>
        {!isEmpty && (
          <p className="cart-subtitle">
            Bạn có {totalItems} sản phẩm trong giỏ hàng
          </p>
        )}
      </div>

      {/* Empty cart state */}
      {isEmpty && (
        <div className="cart-content">
          <div className="cart-main">
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Giỏ hàng trống</h2>
              <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
              <Link to="/" className="btn-continue-shopping">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart with items */}
      {!isEmpty && (
        <div className="cart-content">
          <div className="cart-main">
            <div className="cart-items-list">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <CouponInput />

            <div className="cart-actions">
              <Link to="/" className="btn-continue-shopping">
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          <div className="cart-sidebar">
            <CartSummary />
          </div>
        </div>
      )}

      {/* Recommended products */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <RecommendedProducts />
      </div>
    </div>
  );
};

export default ShoppingCart;

