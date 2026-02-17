import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';

const CouponInput = () => {
  const { applyCoupon, coupon } = useCart();
  const [input, setInput] = useState('');

  return (
    <div className="coupon-section">
      <h3>Mã giảm giá</h3>
      <div className="coupon-input-group">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nhập mã giảm giá"
          className="coupon-input"
        />
        <button
          onClick={() => applyCoupon(input.trim())}
          className="coupon-btn"
        >
          Áp dụng
        </button>
      </div>

      {coupon && (
        <div className="coupon-success">
          Đã áp dụng mã: {coupon}
        </div>
      )}
    </div>
  );
};

export default CouponInput;

