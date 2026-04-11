import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import productService from '../../services/productService';
import ProductCardSkeleton from '../product/ProductCardSkeleton';

const RecommendedProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Fetching top 4 products for recommendations
        const data = await productService.getProducts({ size: 4, sort: 'id,asc' });
        setProducts(data.content || []);
      } catch (err) {
        console.error('Error fetching recommended products:', err);
        setError('Không thể tải gợi ý sản phẩm.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return (
      <div className="recommended-section">
        <h3>SẢN PHẨM GỢI Ý</h3>
        <div className="recommended-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="recommended-card-skeleton" style={{ height: '300px', background: '#f8f8f8', opacity: 0.5 }}></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || products.length === 0) return null;

  return (
    <div className="recommended-section">
      <h3>SẢN PHẨM GỢI Ý</h3>

      <div className="recommended-grid">
        {products.map(p => {
          const image = (p.imageUrls && p.imageUrls.length > 0) ? p.imageUrls[0] : (p.image || '/placeholder-product.png');
          return (
            <div key={p.id} className="recommended-card">
              <img
                src={image}
                alt={p.name}
                className="recommended-card-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200?text=Product';
                }}
              />

              <div className="recommended-card-content">
                <h4 className="recommended-card-name">{p.name}</h4>

                <p className="recommended-card-price">
                  {formatPrice(p.price)}
                </p>

                <button
                  onClick={() =>
                    addToCart({
                      ...p,
                      quantity: 1,
                      color: (p.colors && p.colors.length > 0) ? p.colors[0] : 'Đen',
                      size: (p.sizes && p.sizes.length > 0) ? p.sizes[0] : 'M',
                    })
                  }
                  className="recommended-card-btn"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedProducts;


