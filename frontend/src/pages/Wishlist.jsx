import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/components/Wishlist.css';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleRemove = (productId) => {
        removeFromWishlist(productId);
    };

    const isEmpty = wishlist.length === 0;

    return (
        <div className="wishlist-container">
            <Header />

            <div className="wishlist-title-bar">
                <h1>Sản Phẩm Yêu Thích</h1>
                {!isEmpty && (
                    <p className="wishlist-subtitle">
                        Bạn có {wishlist.length} sản phẩm trong danh sách yêu thích
                    </p>
                )}
            </div>

            <div className="wishlist-content">
                {isEmpty ? (
                    <div className="empty-wishlist">
                        <div className="empty-wishlist-icon">♡</div>
                        <h2>Danh sách yêu thích trống</h2>
                        <p>Bạn chưa có sản phẩm nào trong danh sách yêu thích</p>
                        <Link to="/" className="btn-continue-shopping">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlist.map((product) => (
                            <div key={product.id} className="wishlist-item">
                                <button
                                    className="remove-wishlist-btn"
                                    onClick={() => handleRemove(product.id)}
                                    aria-label="Xóa khỏi yêu thích"
                                >
                                    ×
                                </button>
                                <Link
                                    to={`/product/${product.category || 'nam'}/${product.id}`}
                                    className="wishlist-item-link"
                                >
                                    <div className="wishlist-item-image">
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                    <div className="wishlist-item-info">
                                        <h3 className="wishlist-item-name">{product.name}</h3>
                                        <p className="wishlist-item-price">{product.price}</p>
                                    </div>
                                </Link>
                                <button
                                    className="wishlist-add-to-cart-btn"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Thêm vào giỏ
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Wishlist;
