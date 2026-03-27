import React from 'react';
import '../styles/components/ContactUs.css';
// QUAN TRỌNG: Gọi file Header và Footer vào đây
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const ContactUs = () => {
  return (
    <div className="page-wrapper">
      {/* Lắp Header */}
      <Header />

      <div className="contact-container">
        <h1 className="page-title">CONTACT US</h1>

        <div className="contact-intro">
          <p>Chúng tôi rất mong nhận được phản hồi từ bạn, vui lòng liên hệ với chúng tôi qua nền tảng bên dưới, chúng tôi sẽ trả lời sớm nhất có thể.</p>
          <p className="email-highlight">Email address: placeholder1@.com</p>
          <p>Nếu bạn liên hệ với chúng tôi về đơn đặt hàng, vui lòng đọc trang Câu hỏi thường gặp của chúng tôi.</p>
        </div>

        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder="Name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email *" required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <input type="tel" placeholder="Phone number" className="form-input" />
          </div>

          <div className="form-group">
            <textarea placeholder="Comment" rows="5" className="form-input"></textarea>
          </div>

          <button type="submit" className="submit-btn">Send</button>
        </form>
      </div>

      {/* Lắp Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;