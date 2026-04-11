import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import "../../styles/components/product-card.css";

const ProductCard = ({ product, category }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  
  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const productImage = (product.imageUrls && product.imageUrls.length > 0) 
    ? product.imageUrls[0] 
    : (product.image || "/placeholder-product.png");

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={productImage} alt={product.name} />
        <button
          className={`wishlist-btn ${inWishlist ? "active" : ""}`}
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
        >
          {inWishlist ? "♥" : "♡"}
        </button>
        <button
          className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {isAdded ? "Đã thêm" : "Thêm vào giỏ"}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <Link
          to={`/product/${product.categoryName?.toLowerCase() || category || "nam"}/${product.id}`}
          className="product-link"
        >
          Chi tiết
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

