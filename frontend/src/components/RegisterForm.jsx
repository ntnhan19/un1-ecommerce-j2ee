// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const password = watch("password", "");
  const { login } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setRegisterError('');

    try {
      // Mock registration - Replace with real API call later
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create mock user from registration data
      const newUser = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.email.split('@')[0],
        lastName: 'User',
        phone: '0123456789',
        birthday: data.birthday,
        gender: data.gender
      };

      // Auto-login after successful registration
      login(newUser);

      // Redirect to profile
      navigate('/profile');
    } catch (error) {
      setRegisterError('Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-form-container">

      <form onSubmit={handleSubmit(onSubmit)}>
        {registerError && (
          <div className="error-message" style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fee', borderRadius: '4px', color: '#c00' }}>
            {registerError}
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Địa Chỉ Email* :</label>
          <input
            className="form-input"
            placeholder="Nhập địa chỉ hợp lệ"
            {...register("email", {
              required: "Email là bắt buộc",
              pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Mật Khẩu* :</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-input"
            {...register("password", {
              required: "Mật khẩu là bắt buộc",
              minLength: { value: 8, message: "Tối thiểu 8 ký tự" },
              maxLength: { value: 20, message: "Tối đa 20 ký tự" },
            })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
          <p className="helper-text">
            Mật khẩu phải có từ 8 đến 20 kí tự bao gồm cả chữ và số. Có thể sử dụng các ký hiệu sau !@#$%^&*()
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">Nhập Lại Mật Khẩu* :</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-input"
            {...register("confirmPassword", {
              validate: value => value === password || "Mật khẩu không khớp"
            })}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="showPassReg"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassReg">Hiện Mật Khẩu</label>
        </div>

        <div className="form-group">
          <label className="form-label">Sinh Nhật :</label>
          <input
            type="date"
            className="form-input"
            style={{ maxWidth: '250px' }}
            {...register("birthday")}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Giới Tính:</label>
          <div className="radio-group">
            <label><input type="radio" value="Nam" {...register("gender")} /> Nam</label>
            <label><input type="radio" value="Nu" {...register("gender")} /> Nữ</label>
            <label><input type="radio" value="Other" {...register("gender")} /> Bỏ Chọn</label>
          </div>
        </div>

        <div className="link-group">
          <a href="#" className="link-text">Điều Khoản Sử Dụng</a>
          <a href="#" className="link-text">Chính Sách Bảo Mật</a>
        </div>

        <div className="checkbox-group" style={{ alignItems: 'flex-start' }}>
          <input
            type="checkbox"
            id="policy"
            {...register("policy", { required: "Bạn phải đồng ý với điều khoản" })}
          />
          <label htmlFor="policy">Tôi đã đọc kĩ Điều Khoản Sử Dụng và Chính Sách Bảo Mật khi đăng ký thành viên của cửa hàng</label>
        </div>
        {errors.policy && <p className="error-message">{errors.policy.message}</p>}

        <button type="submit" className="btn-black" disabled={isLoading}>
          {isLoading ? 'Đang đăng ký...' : 'Đăng Ký'}
        </button>
      </form>

      {onSwitchToLogin && (
        <div className="back-to-login">
          <p>Đã có tài khoản?</p>
          <button className="btn-black" onClick={onSwitchToLogin}>
            Đăng Nhập
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;