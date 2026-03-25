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
  const { user } = useAuth();

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
            src="/src/assets/images/un1-logo.png"
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
              src="/src/assets/images/icon-shopping-card.svg"
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
              src="/src/assets/images/icon-liked-product.svg"
              alt="Like"
              className="header-icon-image"
            />
            {totalWishlistItems > 0 && (
              <span className="header-badge">{totalWishlistItems}</span>
            )}
          </Link>
        </div>
        {user ? (
          <Link to="/profile" className="login-link">
            {user.fullName || "Tài khoản"}
          </Link>
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

