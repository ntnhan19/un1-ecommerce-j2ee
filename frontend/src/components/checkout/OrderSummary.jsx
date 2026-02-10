import React from 'react';
import '../../pages/Checkout.css';

const OrderSummary = ({ cartItems = [], shippingCost = 0 }) => {
  // Mock data for demonstration - replace with actual cart data
  const mockItems = cartItems.length > 0 ? cartItems : [
    {
      id: 1,
      name: 'Áo khoác nam',
      image: '/placeholder-product.jpg',
      price: 1399000,
      quantity: 1,
      size: 'L',
      color: 'Đen'
    }
  ];

  const calculateSubtotal = () => {
    return mockItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // 8% VAT
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax + shippingCost;
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VND';
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal();

  return (
    <div className="order-summary">
      <h3>Tổng đơn hàng | {mockItems.length} sản phẩm</h3>
      
      <div className="order-items">
        {mockItems.map((item) => (
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
        <div className="calc-row tax-row">
          <span>Đã bao gồm thuế giá trị gia tăng:</span>
          <span>{formatPrice(tax)}</span>
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
