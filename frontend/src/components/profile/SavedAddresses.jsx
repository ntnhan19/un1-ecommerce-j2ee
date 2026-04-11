import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { toast } from 'react-toastify';

const initialFormData = {
    label: '',
    fullName: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    detailAddress: '',
    isDefault: false
};

const SavedAddresses = () => {
    const { addresses, loading, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUser();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    const resetForm = () => {
        setFormData(initialFormData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingId) {
                await updateAddress(editingId, formData);
                setEditingId(null);
                toast.success('Đã cập nhật địa chỉ thành công');
            } else {
                await addAddress(formData);
                setIsAdding(false);
                toast.success('Đã thêm địa chỉ mới thành công');
            }
            resetForm();
        } catch (error) {
            toast.error(error?.message || 'Không thể lưu địa chỉ');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (address) => {
        setFormData({
            label: address.label,
            fullName: address.fullName,
            phone: address.phone,
            province: address.province,
            district: address.district,
            ward: address.ward,
            detailAddress: address.detailAddress,
            isDefault: address.isDefault
        });
        setEditingId(address.id);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        resetForm();
    };

    const handleDelete = async (addressId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
            try {
                await deleteAddress(addressId);
                toast.success('Đã xóa địa chỉ');
            } catch (error) {
                toast.error(error?.message || 'Không thể xóa địa chỉ');
            }
        }
    };

    const handleSetDefault = async (addressId) => {
        try {
            await setDefaultAddress(addressId);
            toast.success('Đã đặt làm địa chỉ mặc định');
        } catch (error) {
            toast.error(error?.message || 'Không thể cập nhật địa chỉ mặc định');
        }
    };

    return (
        <div className="saved-addresses-section">
            <div className="section-header">
                <h2>Địa chỉ đã lưu</h2>
                {!isAdding && !editingId && (
                    <button className="btn-add" onClick={() => setIsAdding(true)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Thêm địa chỉ mới
                    </button>
                )}
            </div>

            {(isAdding || editingId) && (
                <form onSubmit={handleSubmit} className="address-form">
                    <div className="form-group">
                        <label htmlFor="label">Nhãn địa chỉ</label>
                        <input
                            type="text"
                            id="label"
                            name="label"
                            value={formData.label}
                            onChange={handleChange}
                            placeholder="Ví dụ: Nhà riêng"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="fullName">Họ và tên</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="province">Tỉnh/Thành phố</label>
                            <input
                                type="text"
                                id="province"
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="district">Quận/Huyện</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ward">Phường/Xã</label>
                        <input
                            type="text"
                            id="ward"
                            name="ward"
                            value={formData.ward}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="detailAddress">Địa chỉ chi tiết</label>
                        <textarea
                            id="detailAddress"
                            name="detailAddress"
                            value={formData.detailAddress}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Số nhà, tên đường..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="checkbox-field">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={formData.isDefault}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    isDefault: e.target.checked
                                }))}
                            />
                            <span>Đặt làm địa chỉ mặc định</span>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={handleCancel}>
                            Hủy
                        </button>
                        <button type="submit" className="btn-save" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm địa chỉ'}
                        </button>
                    </div>
                </form>
            )}

            <div className="addresses-list">
                {loading && !isAdding && !editingId ? (
                    <div className="empty-state">
                        <h3>Đang tải địa chỉ...</h3>
                    </div>
                ) : addresses.length > 0 ? (
                    addresses.map(address => (
                        <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                            {address.isDefault && <span className="default-badge">Mặc định</span>}

                            <div className="address-header">
                                <h3>{address.label}</h3>
                                <div className="address-actions">
                                    {!address.isDefault && (
                                        <button
                                            type="button"
                                            className="btn-set-default"
                                            onClick={() => handleSetDefault(address.id)}
                                            title="Đặt làm mặc định"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn-icon"
                                        onClick={() => handleEdit(address)}
                                        title="Chỉnh sửa"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-icon btn-delete"
                                        onClick={() => handleDelete(address.id)}
                                        title="Xóa"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="address-body">
                                <p className="address-name">{address.fullName}</p>
                                <p className="address-phone">{address.phone}</p>
                                <p className="address-detail">
                                    {address.detailAddress}, {address.ward}, {address.district}, {address.province}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    !isAdding && !editingId && (
                        <div className="empty-state">
                            <div className="empty-icon">Address</div>
                            <h3>Chưa có địa chỉ nào</h3>
                            <p>Thêm địa chỉ để thanh toán nhanh hơn</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default SavedAddresses;
