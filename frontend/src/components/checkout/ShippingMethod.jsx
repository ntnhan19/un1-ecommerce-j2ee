import React from 'react';
import '../../pages/Checkout.css';

const ShippingMethod = ({ selectedMethod, setSelectedMethod, errors }) => {
  const shippingMethods = [
    {
      id: 'standard',
      name: 'Giao hàng tiêu chuẩn',
      price: 30000,
      time: '3-5 ngày'
    },
    {
      id: 'express',
      name: 'Giao hàng nhanh',
      price: 50000,
      time: '1-2 ngày'
    },
    {
      id: 'same-day',
      name: 'Giao hàng trong ngày',
      price: 80000,
      time: 'Trong ngày'
    }
  ];

  const handleMethodChange = (methodId) => {
    setSelectedMethod(methodId);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VND';
  };

  return (
    <div className="shipping-method">
      <h3>Phương thức vận chuyển</h3>
      <div className="shipping-options">
        {shippingMethods.map((method) => (
          <div 
            key={method.id} 
            className={`shipping-option ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => handleMethodChange(method.id)}
          >
            <input
              type="radio"
              id={method.id}
              name="shipping"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => handleMethodChange(method.id)}
            />
            <label htmlFor={method.id}>
              <div className="method-info">
                <span className="method-name">{method.name}</span>
                <span className="method-time">{method.time}</span>
              </div>
              <span className="method-price">{formatPrice(method.price)}</span>
            </label>
          </div>
        ))}
      </div>
      {errors.shippingMethod && (
        <span className="error-message">{errors.shippingMethod}</span>
      )}
    </div>
  );
};

export default ShippingMethod;
