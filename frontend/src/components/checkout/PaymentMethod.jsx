import React from 'react';
import '../../pages/Checkout.css';

const PaymentMethod = ({ selectedMethod, setSelectedMethod, errors }) => {
  const paymentMethods = [
    {
      id: 'cod',
      name: 'COD',
      description: 'Thanh toán khi nhận hàng',
      icon: '💵'
    },
    {
      id: 'vnpay',
      name: 'VN PAY',
      description: 'Thanh toán qua VNPay',
      icon: '💳'
    },
    {
      id: 'momo',
      name: 'Momo',
      description: 'Thanh toán qua ví Momo',
      icon: '📱'
    },
    {
      id: 'banking',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản trực tiếp',
      icon: '🏦'
    }
  ];

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <div className="payment-method">
      <h3>Phương thức thanh toán</h3>
      <div className="payment-dropdown">
        <select
          value={selectedMethod || ''}
          onChange={handleMethodChange}
          className={errors.paymentMethod ? 'error' : ''}
        >
          <option value="">Chọn phương thức thanh toán</option>
          {paymentMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.icon} {method.name} - {method.description}
            </option>
          ))}
        </select>
        <span className="dropdown-arrow">▼</span>
      </div>
      {errors.paymentMethod && (
        <span className="error-message">{errors.paymentMethod}</span>
      )}

      {selectedMethod && (
        <div className="payment-info">
          {selectedMethod === 'cod' && (
            <p className="info-text">
              <strong>Thanh toán khi nhận hàng:</strong> Bạn sẽ thanh toán trực tiếp cho người giao hàng khi nhận được sản phẩm.
            </p>
          )}
          {selectedMethod === 'vnpay' && (
            <p className="info-text">
              <strong>VNPay:</strong> Bạn sẽ được chuyển đến cổng thanh toán VNPay để hoàn tất giao dịch.
            </p>
          )}
          {selectedMethod === 'momo' && (
            <p className="info-text">
              <strong>Momo:</strong> Quét mã QR hoặc đăng nhập ứng dụng Momo để thanh toán.
            </p>
          )}
          {selectedMethod === 'banking' && (
            <p className="info-text">
              <strong>Chuyển khoản ngân hàng:</strong> Thông tin tài khoản sẽ được gửi qua email sau khi đặt hàng.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
