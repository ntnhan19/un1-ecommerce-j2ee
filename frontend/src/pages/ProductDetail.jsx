import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import MySizeDrawer from "../components/common/MySizeDrawer";
import ProductReviews from "../components/product/ProductReviews";
import { useSize } from "../context/SizeContext";
import { useCart } from "../hooks/useCart";
import productService from "../services/productService";
import "../styles/pages/product-detail.css";

const ProductDetail = () => {
    const { category, id } = useParams();
    const navigate = useNavigate();
    const { attachProduct, toggleDrawer, recommendation } = useSize();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedImage, setSelectedImage] = useState(0);
    const [descExpanded, setDescExpanded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
                attachProduct(data);
                const firstColor = data.colors?.[0]?.name || data.variants?.[0]?.colorName || "";
                setSelectedColor(firstColor);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Sản phẩm không tồn tại hoặc đã bị xóa.");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const formatPrice = (price) => {
        if (typeof price === "string") return price;
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
    };

    const colors = product?.colors || [];
    const variants = product?.variants || [];

    // Sizes còn hàng theo màu đang chọn
    const availableSizes = useMemo(() => {
        if (!selectedColor) return product?.sizes || [];
        return variants
            .filter(v => v.colorName === selectedColor)
            .map(v => ({ size: v.size, inStock: v.stock > 0 }))
            .filter((v, i, arr) => arr.findIndex(x => x.size === v.size) === i);
    }, [variants, product?.sizes, selectedColor]);

    // Reset size khi đổi màu
    useEffect(() => {
        const inStockSizes = availableSizes.filter(s => s.inStock).map(s => s.size);
        if (!inStockSizes.length) { setSelectedSize(""); return; }
        if (!inStockSizes.includes(selectedSize)) {
            const rec = recommendation?.recommendedSize;
            setSelectedSize(rec && inStockSizes.includes(rec) ? rec : inStockSizes[0]);
        }
    }, [availableSizes, recommendation]);

    const selectedVariant = useMemo(() =>
        variants.find(v => v.colorName === selectedColor && v.size === selectedSize) || null,
        [variants, selectedColor, selectedSize]
    );

    // Trạng thái stock tổng thể
    const totalStock = product?.stock ?? 0;
    const stockStatus = totalStock === 0
        ? { label: "Hết hàng", color: "#ef4444" }
        : totalStock <= 5
            ? { label: `Còn ${totalStock} sản phẩm`, color: "#f59e0b" }
            : { label: "Còn hàng", color: "#22c55e" };

    const images = product?.imageUrls?.length
        ? product.imageUrls
        : ["/placeholder-product.png"];

    const validateSize = () => {
        if (!selectedSize) {
            document.querySelector(".size-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
            toast.error("Vui lòng chọn kích thước!");
            return false;
        }
        return true;
    };

    const handleAddToCart = async () => {
        if (!validateSize()) return;
        try {
            await addToCart(product, 1, selectedSize, selectedColor);
            toast.success("Đã thêm vào giỏ hàng!");
        } catch (err) {
            toast.error(err.message || "Không thể thêm vào giỏ hàng");
        }
    };

    const handleBuyNow = async () => {
        if (!validateSize()) return;
        try {
            await addToCart(product, 1, selectedSize, selectedColor);
            navigate("/checkout");
        } catch (err) {
            toast.error(err.message || "Không thể thêm vào giỏ hàng");
        }
    };

    if (loading) return (
        <div className="product-detail-page">
            <Header />
            <div style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="spinner" />
            </div>
            <Footer />
        </div>
    );

    if (error || !product) return (
        <div className="product-detail-page">
            <Header />
            <main style={{ paddingTop: "150px", textAlign: "center", minHeight: "60vh" }}>
                <h1 style={{ fontSize: "120px", color: "var(--color-border-tertiary)", margin: 0 }}>404</h1>
                <h2 style={{ fontSize: "24px", margin: "20px 0" }}>Sản phẩm không tồn tại</h2>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "30px" }}>
                    Sản phẩm có thể đã hết hàng, bị gỡ bỏ hoặc bạn đã nhập sai đường dẫn.
                </p>
                <button className="btn-primary" onClick={() => navigate(`/products/${category || "nam"}`)}>
                    Quay lại cửa hàng
                </button>
            </main>
            <Footer />
        </div>
    );

    const isLongDesc = product.description?.length > 240;

    return (
        <>
            <div className="product-detail-page">
                <Header />
                <main className="product-detail-main">

                    {/* Breadcrumb */}
                    <nav className="pd-breadcrumb">
                        <span onClick={() => navigate(`/products/${category || "nam"}`)} className="pd-breadcrumb-link">
                            {category === "nu" ? "Nữ" : "Nam"}
                        </span>
                        <span className="pd-breadcrumb-sep">›</span>
                        <span style={{ color: "var(--color-text-secondary)" }}>{product.name}</span>
                    </nav>

                    <div className="pd-layout">

                        {/* ── Gallery ── */}
                        <div className="pd-gallery">
                            <div className="pd-main-img">
                                <img src={images[selectedImage]} alt={product.name} />
                            </div>
                            {images.length > 1 && (
                                <div className="pd-thumbs">
                                    {images.map((img, i) => (
                                        <div
                                            key={i}
                                            className={`pd-thumb ${selectedImage === i ? "active" : ""}`}
                                            onClick={() => setSelectedImage(i)}
                                        >
                                            <img src={img} alt={`${product.name} ${i + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── Info Panel ── */}
                        <div className="pd-info">

                            {/* Status badge */}
                            <div className="pd-stock-badge">
                                <span className="pd-stock-dot" style={{ background: stockStatus.color }} />
                                {stockStatus.label}
                            </div>

                            {/* Name & meta */}
                            <div>
                                <p className="pd-meta">
                                    {product.categoryName && `${product.categoryName} · `}
                                    {product.gender === "MALE" ? "Nam" : product.gender === "FEMALE" ? "Nữ" : "Unisex"}
                                </p>
                                <h1 className="pd-name">{product.name}</h1>
                            </div>

                            <p className="pd-price">{formatPrice(product.price)}</p>

                            <div className="pd-divider" />

                            {/* Color selector */}
                            {colors.length > 0 && (
                                <div className="pd-section">
                                    <p className="pd-section-label">
                                        Màu sắc — <strong style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{selectedColor}</strong>
                                    </p>
                                    <div className="pd-colors">
                                        {colors.map(color => (
                                            <button
                                                key={color.name}
                                                className={`pd-color-btn ${selectedColor === color.name ? "active" : ""}`}
                                                style={{ background: color.hex || "#111" }}
                                                title={color.name}
                                                onClick={() => setSelectedColor(color.name)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size selector */}
                            <div className="pd-section size-section">
                                <div className="pd-section-header">
                                    <p className="pd-section-label" style={{ marginBottom: 0 }}>Kích thước</p>
                                    <button
                                        className="pd-ai-link"
                                        onClick={() => { attachProduct(product); toggleDrawer(true); }}
                                    >
                                        ✦ Tư vấn size bằng AI
                                    </button>
                                </div>
                                <div className="pd-sizes">
                                    {availableSizes.map(({ size, inStock }) => {
                                        const isRec = recommendation?.recommendedSize === size;
                                        return (
                                            <button
                                                key={size}
                                                className={`pd-size-btn ${selectedSize === size ? "active" : ""} ${!inStock ? "oos" : ""}`}
                                                onClick={() => inStock && setSelectedSize(size)}
                                                disabled={!inStock}
                                                title={!inStock ? "Hết hàng" : ""}
                                            >
                                                {size}
                                                {isRec && <span className="pd-ai-tag">AI gợi ý</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                {/* Hiển thị size nào hết hàng thay vì tồn kho số */}
                                {availableSizes.some(s => !s.inStock) && (
                                    <p className="pd-oos-note">
                                        {availableSizes.filter(s => !s.inStock).map(s => s.size).join(", ")} — hết hàng với màu này
                                    </p>
                                )}
                            </div>

                            {/* CTA buttons */}
                            <div className="pd-actions">
                                <button className="pd-btn-buy" onClick={handleBuyNow}>Mua ngay</button>
                                <button className="pd-btn-cart" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                            </div>

                            <div className="pd-divider" />

                            {/* Description */}
                            {product.description && (
                                <div className="pd-section">
                                    <p className="pd-section-label">Mô tả sản phẩm</p>
                                    <div className={`pd-desc ${descExpanded ? "expanded" : ""}`}>
                                        <p>{product.description}</p>
                                        {!descExpanded && isLongDesc && <div className="pd-desc-fade" />}
                                    </div>
                                    {isLongDesc && (
                                        <button className="pd-expand-btn" onClick={() => setDescExpanded(p => !p)}>
                                            {descExpanded ? "Thu gọn ↑" : "Xem thêm ↓"}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="pd-reviews-wrap">
                        <ProductReviews productId={product.id} />
                    </div>
                </main>
                <Footer />
            </div>
            <MySizeDrawer />
        </>
    );
};

export default ProductDetail;