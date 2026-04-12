import React from 'react';
import { useCart } from '../../hooks/useCart';
import '../../styles/components/Checkout.css';

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='100' viewBox='0 0 80 100'%3E%3Crect width='80' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='11' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";

const OrderSummary = ({ shippingCost = 0 }) => {
  const { cartItems, subtotal } = useCart();

  const total = subtotal + shippingCost;

  const formatPrice = (price) => Number(price).toLocaleString('vi-VN') + ' VND';

  return (
    <div className="order-summary">
      <h3>Tổng đơn hàng | {cartItems.length} sản phẩm</h3>

      <div className="order-items">
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-image">
              <img
                src={item.productImage || FALLBACK_IMG}
                alt={item.productName}
                onError={(e) => { e.target.src = FALLBACK_IMG; }}
              />
            </div>
            <div className="item-details">
              {/* ✅ productName thay vì name */}
              <h4>{item.productName}</h4>
              {item.size && <p>Size: {item.size}</p>}
              {item.color && <p>Màu: {item.color}</p>}
              <p>Số lượng: {item.quantity}</p>
              {/* ✅ format price đúng kiểu số */}
              <p className="item-price">{formatPrice(item.price)}</p>
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