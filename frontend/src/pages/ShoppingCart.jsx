import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import CouponInput from '../components/cart/CouponInput';
import RecommendedProducts from '../components/cart/RecommendedProducts';

const ShoppingCart = () => {
  const { cartItems } = useCart();

  const isEmpty = cartItems.length === 0;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="shopping-cart max-w-4xl mx-auto p-4">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Shopping Cart</h2>

      {/* Cart info */}
      {!isEmpty && (
        <p className="text-gray-500 mb-6">
          You have {totalItems} item{totalItems > 1 ? 's' : ''} in your cart
        </p>
      )}

      {/* Empty cart state */}
      {isEmpty && (
        <div className="empty-cart flex flex-col items-center justify-center h-[40vh] mb-8 text-center">
          <img
            src="/assets/images/empty-cart.png"
            alt="Empty cart"
            className="w-32 mb-4"
          />
          <p className="text-lg font-semibold mb-2">
            Your cart is currently empty
          </p>
          <Link
            to="/"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Continue shopping
          </Link>
        </div>
      )}

      {/* Cart items */}
      {!isEmpty && (
        <>
          <div className="flex flex-col gap-4 mb-6">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <CouponInput />
          <CartSummary />
        </>
      )}

      {/* Recommended products - always visible */}
      <RecommendedProducts />
    </div>
  );
};

export default ShoppingCart;
