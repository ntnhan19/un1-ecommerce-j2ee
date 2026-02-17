import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const CartSummary = () => {
  const { cartItems, subtotal, discount, total } = useCart();

  return (
    <div className="cart-summary">
      <h3>TÓM TẮT ĐƠN HÀNG</h3>

      {/* Product List */}
      <div className="summary-products">
        {cartItems.map((item) => (
          <div key={item.id} className="summary-product-item">
            <div className="summary-product-name">{item.name}</div>
            <div className="summary-product-details">
              <span className="summary-product-attr">
                Màu: <strong>{item.color || 'Đen'}</strong>
              </span>
              <span className="summary-product-attr">
                Size: <strong>{item.size || 'M'}</strong>
              </span>
              <span className="summary-product-attr">
                SL: <strong>{item.quantity}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row">
        <span className="summary-label">Tổng cộng</span>
        <span className="summary-value">{subtotal.toLocaleString()} VND</span>
      </div>

      {discount > 0 && (
        <div className="summary-row">
          <span className="summary-label">Giảm giá</span>
          <span className="summary-value summary-discount">-{discount.toLocaleString()} VND</span>
        </div>
      )}

      <div className="summary-total">
        <span>Thành tiền</span>
        <span className="summary-total-amount">{total.toLocaleString()} VND</span>
      </div>

      <div className="cart-actions">
        <Link to="/checkout" className="btn-checkout">
          Tiến hành thanh toán
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;

