import React, { useState } from 'react';
import '../../styles/components/Checkout.css';
import { useUser } from '../../hooks/useUser';

const CheckoutForm = ({ formData, setFormData, errors }) => {
  const { user, addresses } = useUser();
  const [activeTab, setActiveTab] = useState('new');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      addressId: null // Clear address id if manually edited
    }));
  };

  const handleSavedAddressClick = () => {
    setActiveTab('saved');
  };

  const handleNewAddressClick = () => {
    setActiveTab('new');
    setFormData({
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      province: '',
      district: '',
      ward: '',
      detailAddress: '',
      addressId: null
    });
  };

  const handleSelectAddress = (address) => {
    // Split fullName into roughly firstName (last word) and lastName (rest)
    const nameParts = address.fullName ? address.fullName.trim().split(' ') : [];
    const firstName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : '';
    const lastName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';

    setFormData(prev => ({
      ...prev,
      firstName: firstName || prev.firstName,
      lastName: lastName || prev.lastName,
      email: user?.email || prev.email,
      phone: address.phone || prev.phone,
      province: address.province || '',
      district: address.district || '',
      ward: address.ward || '',
      detailAddress: address.detailAddress || '',
      addressId: address.id
    }));
    setActiveTab('new');
  };

  return (
    <div className="checkout-form">
      <div className="form-tabs">
        <button
          className={`tab-button ${activeTab === 'new' ? 'active' : ''}`}
          onClick={handleNewAddressClick}
        >
          Nhập địa chỉ
        </button>
        <button
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={handleSavedAddressClick}
        >
          Địa chỉ sẵn có
        </button>
      </div>

      {activeTab === 'saved' ? (
        <div className="saved-addresses-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginTop: '20px' }}>
          {addresses && addresses.length > 0 ? (
            addresses.map(address => (
              <div
                key={address.id}
                className="address-card"
                onClick={() => handleSelectAddress(address)}
                style={{
                  border: '1px solid #ddd', padding: '15px', borderRadius: '8px', cursor: 'pointer',
                  transition: 'border-color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#000'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#ddd'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px' }}>{address.label || 'Địa chỉ'} {address.isDefault && <span style={{ fontSize: '12px', background: '#eee', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>Mặc định</span>}</h4>
                </div>
                <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '500' }}>{address.fullName} - {address.phone}</p>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  {address.detailAddress}, {address.ward}, {address.district}, {address.province}
                </p>
                <div style={{ marginTop: '10px' }}>
                  <button type="button" style={{
                    padding: '6px 16px', background: '#000', color: '#fff', border: 'none',
                    borderRadius: '4px', fontSize: '13px', cursor: 'pointer'
                  }}>
                    Sử dụng địa chỉ này
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '30px', textAlign: 'center', background: '#f9f9f9', borderRadius: '8px' }}>
              <p style={{ margin: 0, color: '#666' }}>Bạn chưa có địa chỉ nào được lưu.</p>
              <button
                type="button"
                onClick={handleNewAddressClick}
                style={{ marginTop: '15px', padding: '8px 16px', background: 'transparent', border: '1px solid #000', borderRadius: '4px', cursor: 'pointer' }}
              >
                Nhập địa chỉ mới
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="form-grid">
          {formData.addressId && (
            <div className="selected-address-banner" style={{ gridColumn: '1 / -1', background: '#e0f7fa', padding: '12px 15px', borderRadius: '4px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span role="img" aria-label="info" style={{ fontSize: '18px' }}>ℹ️</span>
              <span style={{ color: '#006064', fontWeight: '500', fontSize: '14px' }}>
                Đang sử dụng địa chỉ đã lưu. Thay đổi thông tin bên dưới sẽ tạo thành địa chỉ giao hàng mới.
              </span>
            </div>
          )}
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
            <label htmlFor="email">Email: <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="email@example.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại: <span className="required">*</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="0123456789"
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
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
      )}
    </div>
  );
};

export default CheckoutForm;
