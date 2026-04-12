import React, { useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import productService from '../../services/productService';

const RecommendedProducts = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
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
        {products.map((product) => {
          const image = (product.imageUrls && product.imageUrls.length > 0)
            ? product.imageUrls[0]
            : (product.image || '/placeholder-product.png');

          return (
            <div key={product.id} className="recommended-card">
              <img
                src={image}
                alt={product.name}
                className="recommended-card-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200?text=Product';
                }}
              />

              <div className="recommended-card-content">
                <h4 className="recommended-card-name">{product.name}</h4>
                <p className="recommended-card-price">{formatPrice(product.price)}</p>

                <button
                  onClick={() =>
                    addToCart({
                      ...product,
                      quantity: 1,
                      color: (product.colors && product.colors.length > 0) ? (product.colors[0].name || product.colors[0]) : 'Đen',
                      size: (product.sizes && product.sizes.length > 0) ? product.sizes[0] : 'M',
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
