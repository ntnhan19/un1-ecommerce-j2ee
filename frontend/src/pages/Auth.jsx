// src/pages/Auth.jsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/Auth.css'; // Import file CSS

const Auth = () => {
  // Mặc định hiển thị trang Login theo thiết kế
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="logo">un 1</div>
        <div className="page-title">
            {isLogin ? "Sign In" : "Create Account"}
        </div>
      </div>

      <div className="auth-card">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          /* Trong Register form không có nút back rõ ràng trong ảnh, 
             nhưng ta có thể thêm nút back hoặc click vào logo để quay lại nếu cần */
          <RegisterForm />
        )}
      </div>
    </div>
  );
};

export default Auth;