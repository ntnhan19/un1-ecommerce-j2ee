import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import productService from "../services/productService";
import MySizeDrawer from "../components/common/MySizeDrawer";
import { useSize } from "../context/SizeContext";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import ProductReviews from "../components/product/ProductReviews";
import "../styles/pages/product-detail.css";

const ProductDetail = () => {
    const { category, id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toggleDrawer } = useSize();
    const { addToCart } = useCart();

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Sản phẩm không tồn tại hoặc đã bị xóa.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const formatPrice = (price) => {
        if (typeof price === 'string') return price;
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <Header />
                <div className="loading-state" style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="spinner"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-page">
                <Header />
                <main className="product-detail-main" style={{ paddingTop: '150px', textAlign: 'center', minHeight: '60vh' }}>
                    <div className="not-found-container" style={{ padding: '50px 20px' }}>
                        <h1 style={{ fontSize: '120px', color: '#f0f0f0', margin: '0' }}>404</h1>
                        <h2 style={{ fontSize: '24px', margin: '20px 0' }}>Rất tiếc! Sản phẩm không tồn tại</h2>
                        <p style={{ color: '#666', marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
                            Sản phẩm bạn đang tìm kiếm có thể đã hết hàng, bị gỡ bỏ hoặc bạn đã nhập sai đường dẫn.
                        </p>
                        <button 
                            className="buy-now-btn" 
                            onClick={() => navigate(`/products/${category || 'nam'}`)}
                            style={{ 
                                padding: '15px 40px', 
                                background: '#000', 
                                color: '#fff', 
                                border: 'none',
                                cursor: 'pointer',
                                letterSpacing: '2px',
                                fontWeight: 'bold'
                            }}
                        >
                            QUAY LẠI CỬA HÀNG
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const validateSize = () => {
        if (!selectedSize) {
            // Scroll to size selection
            const sizeSection = document.querySelector('.size-selection');
            if (sizeSection) {
                sizeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Add highlight effect
                sizeSection.classList.add('highlight-required');
                setTimeout(() => {
                    sizeSection.classList.remove('highlight-required');
                }, 2000);
            }
            toast.error("Vui lòng chọn kích thước!");
            return false;
        }
        return true;
    };

    const createCartItem = () => {
        return {
            ...product,
            id: `${product.id}-${selectedSize}-${selectedColor}`, // Unique ID for variation
            baseId: product.id,
            size: selectedSize,
            color: product.colors?.[selectedColor] || "Default",
            image: images[selectedImage],
            // Note: addToCart in CartContext currently forces +1, but it will store the custom attributes
        };
    };

    const handleAddToCart = () => {
        if (!validateSize()) return;

        addToCart(createCartItem());
        toast.success("Đã thêm vào giỏ hàng!");
    };

    const handleBuyNow = () => {
        if (!validateSize()) return;

        addToCart(createCartItem());
        navigate('/checkout');
    };

    const images = (product.imageUrls && product.imageUrls.length > 0) ? product.imageUrls : [product.image || "/placeholder-product.png"];

    return (
        <>
            <div className="product-detail-page">
                <Header />
                <main className="product-detail-main">
                    {/* Back Button */}
                    <button
                        className="back-button"
                        onClick={() => navigate(`/products/${category || product.categoryName?.toLowerCase() || 'nam'}`)}
                    >
                        BACK
                    </button>

                    <div className="product-detail-container">
                        {/* Image Gallery */}
                        <div className="product-gallery">
                            <div className="main-image">
                                <img src={images[selectedImage]} alt={product.name} />
                            </div>
                            <div className="thumbnail-images">
                                {images.slice(0, 4).map((img, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail ${selectedImage === index ? "active" : ""
                                            }`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={img} alt={`${product.name} ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="product-info-section">
                            <h1 className="product-detail-title">Thông tin sản phẩm</h1>

                            <h2 className="product-detail-name">{product.name}</h2>
                            <p className="product-detail-price">{formatPrice(product.price)}</p>

                            <div className="product-actions">
                                <button className="add-to-cart-detail" onClick={handleAddToCart}>
                                    <span className="cart-icon"></span>
                                    Thêm vào giỏ hàng
                                </button>
                                <button className="buy-now-detail" onClick={handleBuyNow}>
                                    Mua ngay
                                </button>
                            </div>
                            {/* Color Selection - Updated for List<String> from API */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="product-options" style={{ marginBottom: '25px' }}>
                                    <h3 className="options-title">Màu sắc</h3>
                                    <div className="color-options-list" style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                                        {product.colors.map((color, index) => (
                                            <button
                                                key={index}
                                                className={`color-btn ${selectedColor === index ? "active" : ""}`}
                                                onClick={() => setSelectedColor(index)}
                                                style={{
                                                    padding: '8px 16px',
                                                    border: selectedColor === index ? '2px solid #000' : '1px solid #ddd',
                                                    background: selectedColor === index ? '#f5f5f5' : '#fff',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    borderRadius: '2px',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection - Simplified for List<String> from API */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="size-selection">
                                    <div className="size-selection-header">
                                        <h3 className="options-title">Kích thước</h3>
                                        <button
                                            className="size-guide-link"
                                            onClick={() => toggleDrawer(true)}
                                            type="button"
                                            style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', padding: '0', fontSize: '13px' }}
                                        >
                                            Hướng dẫn chọn size theo số đo →
                                        </button>
                                    </div>
                                    <div className="size-options-list" style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                className={`size-btn ${selectedSize === size ? "active" : ""}`}
                                                onClick={() => setSelectedSize(size)}
                                                style={{
                                                    padding: '10px 20px',
                                                    border: selectedSize === size ? '2px solid #000' : '1px solid #ddd',
                                                    background: selectedSize === size ? '#000' : '#fff',
                                                    color: selectedSize === size ? '#fff' : '#000',
                                                    cursor: 'pointer',
                                                    minWidth: '60px',
                                                    fontWeight: 'bold',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="product-description-section">
                        <h3 className="description-title">Mô tả sản phẩm</h3>
                        <div className="description-content">
                            {product.description && <p style={{ whiteSpace: "pre-line" }}>{product.description}</p>}
                            {product.material && (
                                <div className="material-info">
                                    <strong>CHẤT LIỆU:</strong>
                                    <p style={{ whiteSpace: "pre-line" }}>{product.material}</p>
                                </div>
                            )}
                            {product.careInstructions && (
                                <div className="care-instructions">
                                    <strong>Hướng dẫn bảo quản:</strong>
                                    <p style={{ whiteSpace: "pre-line" }}>
                                        {product.careInstructions}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                    <ProductReviews productId={product.id} />
                </div>

                <Footer />
            </div>

            {/* AI Size Assistant Drawer - Outside main container */}
            <MySizeDrawer />
        </>
    );
};

export default ProductDetail;
