import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getProductById } from "../utils/mockProducts";
import MySizeDrawer from "../components/common/MySizeDrawer";
import { useSize } from "../context/SizeContext";
import "../styles/pages/product-detail.css";

const ProductDetail = () => {
    const { category, id } = useParams();
    const navigate = useNavigate();
    const product = getProductById(category, id);
    const { toggleDrawer } = useSize();

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="product-detail-page">
                <Header />
                <div className="product-not-found">
                    <h2>Sản phẩm không tồn tại</h2>
                    <button onClick={() => navigate(`/products/${category}`)}>
                        Quay lại
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    const handleAddToCart = () => {
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
            alert("Vui lòng chọn kích thước!");
            return;
        }
        console.log("Add to cart:", {
            product: product.name,
            color: product.colors?.[selectedColor]?.name || "Default",
            size: selectedSize,
            quantity,
        });
        alert("Đã thêm vào giỏ hàng!");
    };

    const images = product.images || [product.image];

    return (
        <>
            <div className="product-detail-page">
                <Header />
                <main className="product-detail-main">
                    {/* Back Button */}
                    <button
                        className="back-button"
                        onClick={() => navigate(`/products/${category}`)}
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
                            <p className="product-detail-price">{product.price}</p>

                            {/* Add to Cart Button */}
                            <button className="add-to-cart-detail" onClick={handleAddToCart}>
                                <span className="cart-icon"></span>
                                Thêm vào giỏ hàng
                            </button>
                            {/* Color Selection */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="product-options">
                                    <h3 className="options-title">Màu sắc và kích thước</h3>
                                    <div className="color-swatches">
                                        {product.colors.map((color, index) => (
                                            <div key={index} className="color-option">
                                                <div
                                                    className={`color-swatch ${selectedColor === index ? "selected" : ""
                                                        }`}
                                                    style={{ backgroundColor: color.hex }}
                                                    onClick={() => setSelectedColor(index)}
                                                />
                                                <span className="color-name">{color.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="size-selection">
                                    <button
                                        className="size-guide-link"
                                        onClick={() => toggleDrawer(true)}
                                        type="button"
                                    >
                                        Tư vấn size theo số đo →
                                    </button>
                                    <div className="size-chart">
                                        <div className="size-chart-row size-chart-header">
                                            <div className="size-cell header-cell">Size</div>
                                            {product.sizes.map((size) => (
                                                <div
                                                    key={size}
                                                    className={`size-cell ${selectedSize === size ? "selected" : ""
                                                        }`}
                                                    onClick={() => setSelectedSize(size)}
                                                >
                                                    {size}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="size-chart-row">
                                            <div className="size-cell header-cell">Ngực (cm)</div>
                                            {product.sizes.map((size) => (
                                                <div key={size} className="size-cell">-</div>
                                            ))}
                                        </div>
                                        <div className="size-chart-row">
                                            <div className="size-cell header-cell">Vai (cm)</div>
                                            {product.sizes.map((size) => (
                                                <div key={size} className="size-cell">-</div>
                                            ))}
                                        </div>
                                        <div className="size-chart-row">
                                            <div className="size-cell header-cell">Dài (cm)</div>
                                            {product.sizes.map((size) => (
                                                <div key={size} className="size-cell">-</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="product-description-section">
                        <h3 className="description-title">Mô tả sản phẩm</h3>
                        <div className="description-content">
                            {product.description && <p>{product.description}</p>}
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

                <Footer />
            </div>

            {/* AI Size Assistant Drawer - Outside main container */}
            <MySizeDrawer />
        </>
    );
};

export default ProductDetail;
