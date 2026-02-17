// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const LoginForm = ({ onSwitchToRegister }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');

    try {
      // Mock authentication - Replace with real API call later
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock validation - Accept any email/password for now
      // In production, this will be replaced with actual API call
      const mockUser = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.email.split('@')[0],
        lastName: 'User',
        phone: '0123456789'
      };

      // Login user
      login(mockUser);

      // Redirect to profile
      navigate('/profile');
    } catch (error) {
      setLoginError('Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-layout">
      {/* Left Side: Login Form */}
      <div className="left-panel">

        <form onSubmit={handleSubmit(onSubmit)}>
          {loginError && (
            <div className="error-message" style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fee', borderRadius: '4px', color: '#c00' }}>
              {loginError}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Địa Chỉ Email* :</label>
            <input
              className="form-input"
              placeholder="Nhập địa chỉ hợp lệ"
              {...register("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ"
                }
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Mật Khẩu* :</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              {...register("password", { required: "Mật khẩu là bắt buộc" })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}

            <p className="helper-text">
              Mật khẩu phải có từ 8 đến 20 kí tự bao gồm cả chữ và số.
              Có thể sử dụng các ký hiệu sau !@#$%^&*()
            </p>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="showPassLogin"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassLogin">Hiện Mật Khẩu</label>
          </div>

          <div className="link-group">
            <a href="#" className="link-text">Điều Khoản Sử Dụng</a>
            <a href="#" className="link-text">Chính Sách Bảo Mật</a>
          </div>

          <button type="submit" className="btn-black" disabled={isLoading}>
            {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>

          <div style={{ marginTop: '15px' }}>
            <a href="#" className="link-text">Quên Mật Khẩu?</a>
          </div>
        </form>
      </div>

      {/* Right Side: Switch to Register */}
      <div className="right-panel">
        <h2>Tạo Tài Khoản</h2>
        <p style={{ marginBottom: '20px' }}>
          Hãy tạo tài khoản ngay! Bạn có thể nhận được các dịch vụ đặc biệt cho riêng bạn...
        </p>
        <button className="btn-black" onClick={onSwitchToRegister}>
          Tạo Tài Khoản
        </button>
      </div>
    </div>
  );
};

export default LoginForm;