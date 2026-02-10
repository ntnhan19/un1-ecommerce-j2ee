// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password", "");

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    // TODO: Call API register here
  };

  return (
    <div style={{width: '100%', padding: '0 20px'}}>
      <h2>Tạo Tài Khoản Thành Viên</h2>
      <p className="helper-text">Chúng tôi sẽ gửi thư xác nhận đến địa chỉ email...</p>

      <form onSubmit={handleSubmit(onSubmit)}>
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
              // Thêm pattern regex nếu cần check ký tự đặc biệt
            })} 
          />
           {errors.password && <p className="error-message">{errors.password.message}</p>}
           <p className="helper-text">
              Mật khẩu phải có từ 8 đến 20 kí tự bao gồm cả chữ và số...
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
                style={{width: '200px'}}
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

        <div className="checkbox-group" style={{alignItems: 'flex-start'}}>
            <input 
                type="checkbox" 
                id="policy"
                {...register("policy", { required: "Bạn phải đồng ý với điều khoản" })}
            />
            <label htmlFor="policy">Tôi đã đọc kĩ Điều Khoản Sử Dụng và Chính Sách Bảo Mật khi đăng ký thành viên của cửa hàng</label>
        </div>
        {errors.policy && <p className="error-message">{errors.policy.message}</p>}

        <button type="submit" className="btn-black">Đăng Ký</button>
      </form>
    </div>
  );
};

export default RegisterForm;