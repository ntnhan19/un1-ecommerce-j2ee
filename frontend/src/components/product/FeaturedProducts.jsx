import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import productService from "../../services/productService";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts({ size: 5, sort: "id,desc" });
        setProducts(data.content || []);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Không thể tải sản phẩm nổi bật.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="featured-products">
        <h2 className="featured-title">FEATURES PRODUCTS</h2>
        <div className="products-grid">
          {[...Array(5)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) return null;


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
