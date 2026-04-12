import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import profileService from '../../services/profileService';

const ChangePassword = () => {
    const { user, refreshUser } = useAuth();
    const requiresCurrentPassword = user?.passwordLoginEnabled !== false;
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (requiresCurrentPassword && !formData.currentPassword) {
            newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Mật khẩu phải có ít nhất 8 ký tự';
        } else if (formData.newPassword.length > 20) {
            newErrors.newPassword = 'Mật khẩu không được quá 20 ký tự';
        } else if (requiresCurrentPassword && formData.newPassword === formData.currentPassword) {
            newErrors.newPassword = 'Mật khẩu mới phải khác mật khẩu hiện tại';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await profileService.changePassword(formData);
            await refreshUser();
            setSuccessMessage(requiresCurrentPassword ? 'Đổi mật khẩu thành công' : 'Thiết lập mật khẩu thành công');
            toast.success(requiresCurrentPassword ? 'Đổi mật khẩu thành công' : 'Thiết lập mật khẩu thành công');
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            setErrors({ submit: error?.message || 'Không thể cập nhật mật khẩu. Vui lòng thử lại.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="change-password-section">
            <div className="section-header">
                <div>
                    <h2>{requiresCurrentPassword ? 'Đổi mật khẩu' : 'Thiết lập mật khẩu'}</h2>
                    <p className="section-subtitle">
                        {requiresCurrentPassword
                            ? 'Cập nhật mật khẩu của bạn để bảo mật tài khoản'
                            : 'Tài khoản này đang đăng nhập bằng Google. Bạn có thể đặt mật khẩu để đăng nhập bằng email sau này.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="password-form">
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}

                {errors.submit && (
                    <div className="error-message" style={{ marginBottom: '1rem' }}>
                        {errors.submit}
                    </div>
                )}

                {requiresCurrentPassword && (
                    <div className="form-group">
                        <label htmlFor="currentPassword">Mật khẩu hiện tại <span className="required">*</span></label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className={errors.currentPassword ? 'error' : ''}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => togglePasswordVisibility('current')}
                            >
                                {showPasswords.current ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.currentPassword && <span className="error-text">{errors.currentPassword}</span>}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="newPassword">Mật khẩu mới <span className="required">*</span></label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPasswords.new ? 'text' : 'password'}
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className={errors.newPassword ? 'error' : ''}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => togglePasswordVisibility('new')}
                        >
                            {showPasswords.new ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.newPassword && <span className="error-text">{errors.newPassword}</span>}
                    <p className="helper-text">Mật khẩu phải có từ 8 đến 20 ký tự, bao gồm cả chữ và số</p>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới <span className="required">*</span></label>
                    <div className="password-input-wrapper">
                        <input
                            type={showPasswords.confirm ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => togglePasswordVisibility('confirm')}
                        >
                            {showPasswords.confirm ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => {
                            setFormData({
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: ''
                            });
                            setErrors({});
                            setSuccessMessage('');
                        }}
                    >
                        Hủy
                    </button>
                    <button type="submit" className="btn-save" disabled={isLoading}>
                        {isLoading
                            ? 'Đang xử lý...'
                            : requiresCurrentPassword
                                ? 'Đổi mật khẩu'
                                : 'Thiết lập mật khẩu'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
