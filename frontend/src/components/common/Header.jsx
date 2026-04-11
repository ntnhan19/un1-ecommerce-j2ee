import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import { useAuth } from "../../context/AuthContext";
import "../../styles/components/header.css";

const Header = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      {/* Left Section - Navigation Menu */}
      <div className="header-left">
        <nav className="nav-menu">
          <Link to="/" className="nav-item">
            SHOP
          </Link>
          <Link to="/products/nam" className="nav-item">
            NAM
          </Link>
          <Link to="/products/nu" className="nav-item">
            NỮ
          </Link>
          <Link to="/track-order" className="nav-item">
            TRA CỨU
          </Link>

        </nav>
      </div>

      {/* Center Section - Logo */}
      <div className="header-center">
        <Link to="/" className="logo-link">
          <img
            src="/un1-logo.png"
            alt="UN1"
            className="logo-image"
          />
        </Link>
      </div>

      {/* Right Section - Icons & Login */}
      <div className="header-right">
        <form
          className="header-search-form"
          onSubmit={(e) => {
            e.preventDefault();
            const query = e.target.search.value;
            if (query.trim()) {
              navigate(`/search?q=${encodeURIComponent(query)}`);
            }
          }}
        >
          <input
            type="text"
            name="search"
            placeholder="Tìm kiếm..."
            className="header-search-input"
          />
          <button type="submit" className="header-search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>

        <div className="icon-shopping-card">
          <Link to="/cart">
            <img
              src="/icon-shopping-card.svg"
              alt="Shopping"
              className="header-icon-image"
            />
            {totalItems > 0 && (
              <span className="header-badge">{totalItems}</span>
            )}
          </Link>
        </div>
        <div className="icon-liked-product">
          <Link to="/wishlist">
            <img
              src="/icon-liked-product.svg"
              alt="Like"
              className="header-icon-image"
            />
            {totalWishlistItems > 0 && (
              <span className="header-badge">{totalWishlistItems}</span>
            )}
          </Link>
        </div>
        {user && user.roles?.includes('ROLE_ADMIN') ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="/admin" className="admin-status-link" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              background: '#000',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '10px',
              fontWeight: '800',
              letterSpacing: '1.5px',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }}></span>
              WORKSPACE
            </Link>
            <button onClick={handleLogout} className="login-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#666' }}>
              LOGOUT
            </button>
          </div>
        ) : user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="/profile" className="login-link">
              {user.fullName || "Tài khoản"}
            </Link>
            <button onClick={handleLogout} className="login-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#666' }}>
              LOGOUT
            </button>
          </div>
        ) : (
          <Link to="/auth-login" className="login-link">
            Đăng Nhập
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

