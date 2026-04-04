import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import productService from "../../services/productService";
import "../../styles/components/featured-products.css";

const CategorySplit = () => {
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/public/product-collections");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setCollections(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch collections:", err);
      }
    };
    fetchCollections();
  }, []);

  return (
    <>
      <div className="category-split">
        {collections.map((col) => (
          <div 
            key={col.id} 
            className="category-item" 
            onClick={() => setActiveAlbum(col)}
          >
            <img src={col.coverUrl} alt={col.name} />
            <div className="category-overlay">
              <div className="collection-info">
                <span className="collection-tag">COLLECTION</span>
                <button className="category-label-pill">{col.name}</button>
                <p className="collection-desc">{col.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Album Modal Pop-up */}
      {activeAlbum && (
        <div className="album-modal-overlay" onClick={() => setActiveAlbum(null)}>
          <div className="album-modal-content" onClick={e => e.stopPropagation()}>
            <button className="album-close-btn" onClick={() => setActiveAlbum(null)}>&times;</button>
            <div className="album-gallery">
              {activeAlbum.galleryUrls?.map((url, index) => (
                <img key={index} src={url} alt={`Album ${index}`} className="album-img" />
              ))}
            </div>
            <div className="album-footer">
              <Link 
                to={`/products/${activeAlbum.name.toLowerCase().includes('women') ? 'nu' : 'nam'}`} 
                className="album-shop-btn"
              >
                SHOP THE COLLECTION
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
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
        const data = await productService.getProducts({ featured: true, size: 5, sort: "id,desc" });
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
