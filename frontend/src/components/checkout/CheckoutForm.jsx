import React from 'react';
import '../../pages/Checkout.css';

const CheckoutForm = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSavedAddressClick = () => {
    alert('Tính năng đang cập nhật');
  };

  return (
    <div className="checkout-form">
      <div className="form-tabs">
        <button className="tab-button active">Nhập địa chỉ</button>
        <button className="tab-button" onClick={handleSavedAddressClick}>Địa chỉ sẵn có</button>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName">Tên: <span className="required">*</span></label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            placeholder="Vui lòng nhập đầy đủ tên..."
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Họ: <span className="required">*</span></label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            placeholder="Vui lòng nhập đầy đủ họ..."
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="province">Tỉnh: <span className="required">*</span></label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province || ''}
            onChange={handleChange}
            placeholder="Nhập địa chỉ tỉnh..."
            className={errors.province ? 'error' : ''}
          />
          {errors.province && <span className="error-message">{errors.province}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="district">Quận: <span className="required">*</span></label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district || ''}
            onChange={handleChange}
            placeholder="Nhập địa chỉ quận..."
            className={errors.district ? 'error' : ''}
          />
          {errors.district && <span className="error-message">{errors.district}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="ward">Phường: <span className="required">*</span></label>
          <input
            type="text"
            id="ward"
            name="ward"
            value={formData.ward || ''}
            onChange={handleChange}
            placeholder="Nhập địa chỉ phường..."
            className={errors.ward ? 'error' : ''}
          />
          {errors.ward && <span className="error-message">{errors.ward}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="detailAddress">Chi tiết địa chỉ: <span className="required">*</span></label>
          <input
            type="text"
            id="detailAddress"
            name="detailAddress"
            value={formData.detailAddress || ''}
            onChange={handleChange}
            placeholder="Vui lòng nhập địa chỉ chi tiết..."
            className={errors.detailAddress ? 'error' : ''}
          />
          {errors.detailAddress && <span className="error-message">{errors.detailAddress}</span>}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
