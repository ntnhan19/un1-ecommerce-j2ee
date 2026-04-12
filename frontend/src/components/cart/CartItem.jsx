import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = ['Đen', 'Trắng', 'Xám', 'Xanh Navy', 'Be'];

  // Size/color lưu trên server rồi, chỉ dùng để hiển thị
  const [size, setSize] = useState(item.size || 'M');
  const [color, setColor] = useState(item.color || 'Đen');

  const itemPrice = Number(item.price);
  const itemTotal = itemPrice * item.quantity;

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.productImage} alt={item.productName} />
      </div>

      <div className="item-details">
        <h4 className="item-name">{item.productName}</h4>

        <div className="item-attributes">
          <div className="attribute-group">
            <label className="attribute-label">Màu sắc:</label>
            {/* Hiển thị thôi — muốn đổi variant thì xóa & thêm lại */}
            <span className="attribute-value">{color}</span>
          </div>
          <div className="attribute-group">
            <label className="attribute-label">Size:</label>
            <span className="attribute-value">{size}</span>
          </div>
        </div>

        <p className="item-price">Giá: {itemPrice.toLocaleString()} VND</p>

        <div className="quantity-controls">
          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity === 1}
          >−</button>

          <span className="qty-value">{item.quantity}</span>

          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >+</button>
        </div>
      </div>

      <div className="item-total">
        <div className="item-total-price">
          {itemTotal.toLocaleString()} VND
        </div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="remove-btn"
          title="Xóa sản phẩm"
        >✕</button>
      </div>
    </div>
  );
};

export default CartItem;