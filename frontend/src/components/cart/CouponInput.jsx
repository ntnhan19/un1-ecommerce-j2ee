import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';

const CouponInput = () => {
  const { applyCoupon, coupon } = useCart();
  const [input, setInput] = useState('');

  return (
    <div className="coupon-input flex items-center gap-2 mt-4">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Nhập mã giảm giá"
        className="border rounded px-2 py-1"
      />
      <button
        onClick={() => applyCoupon(input.trim())}
        className="bg-black text-white px-3 py-1 rounded"
      >
        Áp dụng
      </button>

      {coupon && (
        <span className="ml-2 text-green-600">
          Đã áp dụng: {coupon}
        </span>
      )}
    </div>
  );
};

export default CouponInput;
