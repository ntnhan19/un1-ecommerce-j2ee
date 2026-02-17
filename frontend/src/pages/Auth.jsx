// src/pages/Auth.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/components/Auth.css';

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  // Determine which form to show based on route
  useEffect(() => {
    if (location.pathname === '/auth-register') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  return (
    <div className="auth-page">
      <Header />

      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1 className="auth-title">
              {isLogin ? "Đăng Nhập" : "Tạo Tài Khoản"}
            </h1>
            <p className="auth-subtitle">
              {isLogin
                ? "Chào mừng bạn quay trở lại! Đăng nhập để tiếp tục mua sắm."
                : "Tạo tài khoản mới để trải nghiệm dịch vụ và nhận được các ưu đãi đặc biệt."}
            </p>
          </div>

          <div className="auth-card">
            {isLogin ? (
              <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;