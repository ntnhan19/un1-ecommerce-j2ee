import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';

const PersonalInfo = ({ user: initialUser }) => {
    const { updateProfile } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: initialUser?.firstName || '',
        lastName: initialUser?.lastName || '',
        email: initialUser?.email || '',
        phone: initialUser?.phone || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            firstName: initialUser?.firstName || '',
            lastName: initialUser?.lastName || '',
            email: initialUser?.email || '',
            phone: initialUser?.phone || ''
        });
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
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="lastName">Họ</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">Tên</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
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

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={handleCancel}>
                            Hủy
                        </button>
                        <button type="submit" className="btn-save">
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            ) : (
                <div className="info-display">
                    <div className="info-item">
                        <span className="info-label">Họ và tên:</span>
                        <span className="info-value">{formData.lastName} {formData.firstName}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{formData.email}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Số điện thoại:</span>
                        <span className="info-value">{formData.phone}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalInfo;
