import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, updateItemAttributes, parsePrice } = useCart();

  // Available options
  const availableSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = [
    { name: 'Đen', value: 'black' },
    { name: 'Trắng', value: 'white' },
    { name: 'Xám', value: 'gray' },
    { name: 'Xanh Navy', value: 'navy' },
    { name: 'Be', value: 'beige' },
  ];

  const [selectedSize, setSelectedSize] = useState(item.size || 'M');
  const [selectedColor, setSelectedColor] = useState(item.color || 'Đen');

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);
    if (updateItemAttributes) {
      updateItemAttributes(item.id, { size: newSize });
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    if (updateItemAttributes) {
      updateItemAttributes(item.id, { color: newColor });
    }
  };

  // Calculate prices
  const itemPrice = parsePrice(item.price);
  const itemTotal = itemPrice * item.quantity;

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>

        {/* Size and Color Selectors */}
        <div className="item-attributes">
          <div className="attribute-group">
            <label className="attribute-label">Màu sắc:</label>
            <select
              className="attribute-select"
              value={selectedColor}
              onChange={handleColorChange}
            >
              {availableColors.map(color => (
                <option key={color.value} value={color.name}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          <div className="attribute-group">
            <label className="attribute-label">Size:</label>
            <select
              className="attribute-select"
              value={selectedSize}
              onChange={handleSizeChange}
            >
              {availableSizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="item-price">Giá: {itemPrice.toLocaleString()} VND</p>

        <div className="quantity-controls">
          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity === 1}
          >
            −
          </button>

          <span className="qty-value">{item.quantity}</span>

          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
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
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;


