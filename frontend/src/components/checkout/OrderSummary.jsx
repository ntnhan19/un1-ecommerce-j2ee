import React from 'react';
import { useCart } from '../../hooks/useCart';
import '../../styles/components/Checkout.css';

const OrderSummary = ({ shippingCost = 0 }) => {
  const { cartItems, subtotal } = useCart();

  const calculateTotal = () => {
    return subtotal + shippingCost;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VND';
  };

  const total = calculateTotal();

  return (
    <div className="order-summary">
      <h3>Tổng đơn hàng | {cartItems.length} sản phẩm</h3>

      <div className="order-items">
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-image">
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x100?text=Product';
                }}
              />
            </div>
            <div className="item-details">
              <h4>{item.name}</h4>
              {item.size && <p>Size: {item.size}</p>}
              {item.color && <p>Màu: {item.color}</p>}
              <p>Số lượng: {item.quantity}</p>
              <p className="item-price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-calculation">
        <div className="calc-row">
          <span>Tổng:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {shippingCost > 0 && (
          <div className="calc-row">
            <span>Phí vận chuyển:</span>
            <span>{formatPrice(shippingCost)}</span>
          </div>
        )}
        <div className="calc-row total-row">
          <span>Tổng đơn đặt hàng:</span>
          <span className="total-amount">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
