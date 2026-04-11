import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import profileService from '../../services/profileService';

const PersonalInfo = ({ user: initialUser }) => {
    const { updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: initialUser?.fullName || '',
        email: initialUser?.email || '',
        phone: initialUser?.phone || ''
    });

    useEffect(() => {
        setFormData({
            fullName: initialUser?.fullName || '',
            email: initialUser?.email || '',
            phone: initialUser?.phone || ''
        });
    }, [initialUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!formData.fullName.trim()) {
            nextErrors.fullName = 'Vui lòng nhập họ và tên';
        }

        if (formData.phone && !/^[0-9+\s-]{8,20}$/.test(formData.phone.trim())) {
            nextErrors.phone = 'Số điện thoại không hợp lệ';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSaving(true);
        try {
            const updatedUser = await profileService.updateProfile({
                fullName: formData.fullName.trim(),
                phone: formData.phone.trim()
            });
            updateUser(updatedUser);
            setIsEditing(false);
            toast.success('Đã cập nhật thông tin cá nhân');
        } catch (error) {
            toast.error(error?.message || 'Không thể cập nhật thông tin');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            fullName: initialUser?.fullName || '',
            email: initialUser?.email || '',
            phone: initialUser?.phone || ''
        });
        setErrors({});
        setIsEditing(false);
    };

    return (
        <div className="personal-info-section">
            <div className="section-header">
                <h2>Thông tin cá nhân</h2>
                {!isEditing && (
                    <button className="btn-edit" onClick={() => setIsEditing(true)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Chỉnh sửa
                    </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="edit-form">
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
                        {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            disabled
                        />
                        <span className="helper-text">Email đang được dùng làm tài khoản đăng nhập</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Ví dụ: 0912345678"
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={handleCancel}>
                            Hủy
                        </button>
                        <button type="submit" className="btn-save" disabled={isSaving}>
                            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="info-display">
                    <div className="info-item">
                        <span className="info-label">Họ và tên:</span>
                        <span className="info-value">{formData.fullName || 'Chưa cập nhật'}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{formData.email}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Số điện thoại:</span>
                        <span className="info-value">{formData.phone || 'Chưa cập nhật'}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Phương thức đăng nhập:</span>
                        <span className="info-value">
                            {initialUser?.authProvider === 'GOOGLE'
                                ? initialUser?.passwordLoginEnabled
                                    ? 'Google và mật khẩu'
                                    : 'Google'
                                : 'Email và mật khẩu'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalInfo;
