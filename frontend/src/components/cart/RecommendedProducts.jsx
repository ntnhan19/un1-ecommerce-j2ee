import React from 'react';
import { useCart } from '../../hooks/useCart';

const mockProducts = [
  { id: 101, name: 'Áo Polo', price: 350000, image: '/assets/images/polo.jpg' },
  { id: 102, name: 'Quần Jeans', price: 650000, image: '/assets/images/jeans.jpg' },
  { id: 103, name: 'Áo Sơ Mi', price: 450000, image: '/assets/images/shirt.jpg' },
  { id: 104, name: 'Quần Kaki', price: 550000, image: '/assets/images/kaki.jpg' },
];

const RecommendedProducts = () => {
  const { addToCart } = useCart();

  return (
    <div className="recommended-section">
      <h3>SẢN PHẨM GỢI Ý</h3>

      <div className="recommended-grid">
        {mockProducts.map(p => (
          <div key={p.id} className="recommended-card">
            <img
              src={p.image}
              alt={p.name}
              className="recommended-card-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200?text=Product';
              }}
            />

            <div className="recommended-card-content">
              <h4 className="recommended-card-name">{p.name}</h4>

              <p className="recommended-card-price">
                {p.price.toLocaleString()} VND
              </p>

              <button
                onClick={() =>
                  addToCart({
                    ...p,
                    quantity: 1,
                    color: 'Đen',
                    size: 'M',
                  })
                }
                className="recommended-card-btn"
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;

