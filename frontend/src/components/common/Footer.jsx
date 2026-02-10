import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement subscription logic
    console.log("Subscribe with email:", email);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-image">
          <img src="/src/assets/images/un1-logo.png" alt="Footer" />
        </div>
        <div className="footer-section about-section">
          <h3 className="footer-title">ABOUT UNI</h3>
          <ul className="footer-links">
            <li>
              <Link to="/about-us">about us</Link>
            </li>
            <li>
              <Link to="/delivery">delivery</Link>
            </li>
            <li>
              <Link to="/careers">careers</Link>
            </li>
            <li>
              <Link to="/">at uni</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h3 className="footer-title">CONTACT</h3>
          <ul className="footer-links">
            <li>
              <a href="mailto:uni2026@gmail.com">uni2026@gmail.com</a>
            </li>
            <li>
              <a href="tel:+840312345678">84+ 0312345678</a>
            </li>
          </ul>
        </div>

        <div className="footer-section policies-section">
          <h3 className="footer-title">RETURN POLICY</h3>
          <ul className="footer-links">
            <li>
              <Link to="/sales-policy">Sales Policy</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping & Delivery Policy</Link>
            </li>
            <li>
              <Link to="/returns">Returns & Refunds Policy</Link>
            </li>
            <li>
              <Link to="/exchange">Exchange Policy</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section newsletter-section">
          <h3 className="footer-title">
            <span style={{ whiteSpace: "nowrap", display: "inline-block" }}>
              Đăng ký thành viên
            </span>
          </h3>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-btn">
              Gửi
            </button>
          </form>
          <p className="login-prompt">
            Bạn đã có tài khoản? <Link to="/auth/login">→</Link>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">@2026 UNI</p>
      </div>
    </footer>
  );
};

export default Footer;
