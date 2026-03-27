import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../../styles/components/featured-products.css";

const CategorySplit = () => {
  return (
    <div className="category-split">
      <div className="category-item category-women">
        <img src="/src/assets/images/categories/woman.png" alt="Women" />
        <div className="category-overlay">
          <Link to="/products/nu" className="category-label">WOMEN</Link>
        </div>
      </div>

      <div className="category-item category-men">
        <img src="/src/assets/images/categories/man.png" alt="Men" />
        <div className="category-overlay">
          <Link to="/products/nam" className="category-label">MEN</Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "ÁO KHOÁC DÁNG NGẮN",
      price: "2.599.000 VND",
      image: "/src/assets/images/products/1.png",
    },
    {
      id: 2,
      name: "ÁO MĂNG TÔ KẺ SỌC ZW COLLECTION",
      price: "5.999.000 VND",
      image: "/src/assets/images/products/2.png",
    },
    {
      id: 3,
      name: "ÁO KHOÁC ĐỆM VAI MỀM",
      price: "1.899.000 VND",
      image: "/src/assets/images/products/3.png",
    },
    {
      id: 4,
      name: "ÁO KHOÁC CÀI CHÉO",
      price: "5.999.000 VND",
      image: "/src/assets/images/products/4.png",
    },
    {
      id: 5,
      name: "ÁO KHOÁC NHẸ CÓ TÚI",
      price: "2.599.000 VND",
      image: "/src/assets/images/products/5.png",
    },
  ];

  return (
    <section className="featured-products">
      {/* Category split (Women / Men) - follows Figma layout */}

      <h2 className="featured-title">FEATURES PRODUCTS</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <hr className="divider" />
      <CategorySplit />
    </section>
  );
};

export default FeaturedProducts;
