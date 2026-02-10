import React, { useState } from 'react';
import CheckoutForm from '../components/checkout/CheckoutForm';
import ShippingMethod from '../components/checkout/ShippingMethod';
import PaymentMethod from '../components/checkout/PaymentMethod';
import OrderSummary from '../components/checkout/OrderSummary';
import './Checkout.css';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    province: '',
    district: '',
    ward: '',
    detailAddress: ''
  });
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Giao hàng', name: 'shipping' },
    { number: 2, title: 'Thanh toán', name: 'payment' },
    { number: 3, title: 'Xác nhận', name: 'review' }
  ];

  const getShippingCost = () => {
    const shippingCosts = {
      'standard': 30000,
      'express': 50000,
      'same-day': 80000
    };
    return shippingCosts[shippingMethod] || 0;
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'Vui lòng nhập tên';
      }
      if (!formData.lastName?.trim()) {
        newErrors.lastName = 'Vui lòng nhập họ';
      }
      if (!formData.province?.trim()) {
        newErrors.province = 'Vui lòng nhập tỉnh';
      }
      if (!formData.district?.trim()) {
        newErrors.district = 'Vui lòng nhập quận';
      }
      if (!formData.ward?.trim()) {
        newErrors.ward = 'Vui lòng nhập phường';
      }
      if (!formData.detailAddress?.trim()) {
        newErrors.detailAddress = 'Vui lòng nhập địa chỉ chi tiết';
      }
      if (!shippingMethod) {
        newErrors.shippingMethod = 'Vui lòng chọn phương thức vận chuyển';
      }
    }

    if (step === 2) {
      if (!paymentMethod) {
        newErrors.paymentMethod = 'Vui lòng chọn phương thức thanh toán';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      const orderData = {
        shippingInfo: formData,
        shippingMethod,
        paymentMethod,
        shippingCost: getShippingCost()
      };

      console.log('Order submitted:', orderData);
      
      // Redirect to order confirmation page
      window.location.href = '/order-confirm';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2 className="section-title">THANH TOÁN</h2>
            <CheckoutForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
            <ShippingMethod
              selectedMethod={shippingMethod}
              setSelectedMethod={setShippingMethod}
              errors={errors}
            />
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h2 className="section-title">PHƯƠNG THỨC THANH TOÁN</h2>
            <PaymentMethod
              selectedMethod={paymentMethod}
              setSelectedMethod={setPaymentMethod}
              errors={errors}
            />
            <div className="info-summary">
              <h3>Thông tin giao hàng</h3>
              <p><strong>Người nhận:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Địa chỉ:</strong> {formData.detailAddress}, {formData.ward}, {formData.district}, {formData.province}</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content review-step">
            <h2 className="section-title">XÁC NHẬN ĐỐN HÀNG</h2>
            
            <div className="review-section">
              <h3>Thông tin giao hàng</h3>
              <div className="review-info">
                <p><strong>Người nhận:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Địa chỉ:</strong> {formData.detailAddress}, {formData.ward}, {formData.district}, {formData.province}</p>
                <p><strong>Phương thức vận chuyển:</strong> {
                  shippingMethod === 'standard' ? 'Giao hàng tiêu chuẩn (3-5 ngày)' :
                  shippingMethod === 'express' ? 'Giao hàng nhanh (1-2 ngày)' :
                  'Giao hàng trong ngày'
                }</p>
              </div>
            </div>

            <div className="review-section">
              <h3>Phương thức thanh toán</h3>
              <div className="review-info">
                <p><strong>{
                  paymentMethod === 'cod' ? 'COD - Thanh toán khi nhận hàng' :
                  paymentMethod === 'vnpay' ? 'VN PAY - Thanh toán qua VNPay' :
                  paymentMethod === 'momo' ? 'Momo - Thanh toán qua ví Momo' :
                  'Chuyển khoản ngân hàng'
                }</strong></p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <nav className="header-nav">
          <div className="nav-left">
            <a href="/">SHOP</a>
            <a href="/men">NAM</a>
            <a href="/women">NỮ</a>
            <a href="/sale">SALE</a>
          </div>
          <div className="logo">un1</div>
          <div className="nav-right">
            <a href="/cart">🛒</a>
            <a href="/wishlist">♡</a>
            <a href="/login">Đăng Nhập</a>
          </div>
        </nav>
      </header>

      <div className="checkout-title-bar">
        <h1>Checkout & Payment</h1>
      </div>

      <div className="checkout-stepper">
        {steps.map((step, index) => (
          <div key={step.number} className="stepper-item">
            <div className={`step-circle ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span className="step-title">{step.title}</span>
            {index < steps.length - 1 && (
              <div className={`step-line ${currentStep > step.number ? 'completed' : ''}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          {renderStepContent()}

          <div className="checkout-actions">
            {currentStep > 1 && (
              <button className="btn-back" onClick={handleBack}>
                ← Quay lại
              </button>
            )}
            {currentStep < 3 ? (
              <button className="btn-continue" onClick={handleNext}>
                Tiếp tục →
              </button>
            ) : (
              <button className="btn-submit" onClick={handleSubmit}>
                Đặt hàng
              </button>
            )}
          </div>
        </div>

        <div className="checkout-sidebar">
          <OrderSummary shippingCost={getShippingCost()} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
