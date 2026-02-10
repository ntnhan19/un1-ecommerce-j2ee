import React from 'react';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item flex items-center gap-4 border-b py-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />

      <div className="flex-1">
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm text-gray-500">
          Màu: {item.color} | Size: {item.size}
        </div>
        <div className="text-sm">Giá: {item.price.toLocaleString()} VND</div>

        <div className="flex items-center mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity === 1}
          >-</button>

          <span className="mx-2">{item.quantity}</span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >+</button>
        </div>
      </div>

      <div className="font-bold">
        {(item.price * item.quantity).toLocaleString()} VND
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 ml-4"
      >
        X
      </button>
    </div>
  );
};

export default CartItem;
