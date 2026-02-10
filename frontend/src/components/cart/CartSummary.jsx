import React from 'react';
import { useCart } from '../../hooks/useCart';

const CartSummary = () => {
  const { subtotal, discount, total } = useCart();

  return (
    <div className="cart-summary bg-gray-50 p-4 rounded">
      <div className="flex justify-between mb-2">
        <span>Tổng cộng</span>
        <span>{subtotal.toLocaleString()} VND</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Giảm giá</span>
        <span>-{discount.toLocaleString()} VND</span>
      </div>

      <div className="flex justify-between font-bold text-lg">
        <span>Thành tiền</span>
        <span>{total.toLocaleString()} VND</span>
      </div>
    </div>
  );
};

export default CartSummary;
