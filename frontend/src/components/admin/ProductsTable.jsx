import React, { useState, useEffect } from 'react';
import { mockAdminProducts, formatCurrency, COLOR_MAP, getColorHex } from '../../utils/mockAdmin';
import productService from '../../services/productService';
import '../../styles/components/Admin.css';

// ---- Color Swatch Component ----
// Renders a square swatch + name label below, matching the reference image style
const ColorSwatch = ({ color, size = 'md' }) => {
    const isLight = isLightColor(color.hex);
    const swatchSize = size === 'sm' ? 32 : 48;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
            <div
                style={{
                    width: swatchSize,
                    height: swatchSize,
                    backgroundColor: color.hex,
                    border: isLight ? '1.5px solid #ccc' : '1.5px solid transparent',
                    borderRadius: 4,
                    flexShrink: 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                }}
                title={color.name}
            />
            <span style={{
                fontSize: '0.65rem',
                color: '#555',
                textAlign: 'center',
                lineHeight: 1.2,
                maxWidth: swatchSize + 8,
                wordBreak: 'break-word',
            }}>
                {color.name}
            </span>
        </div>
    );
};

// Determine if a hex color is light (to add a visible border)
const isLightColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 180;
};

// ---- Color Editor in Modal ----
// Allows adding/removing colors with name input + color picker
const ColorEditor = ({ colors, onChange }) => {
    const [newName, setNewName] = useState('');
    const [newHex, setNewHex] = useState('#000000');

    const handleAdd = () => {
        const trimmed = newName.trim();
        if (!trimmed) return;
        // Auto-fill hex from COLOR_MAP if name matches
        const autoHex = getColorHex(trimmed);
        const hex = autoHex !== '#CCCCCC' ? autoHex : newHex;
        if (colors.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) return; // no duplicates
        onChange([...colors, { name: trimmed, hex }]);
        setNewName('');
        setNewHex('#000000');
    };

    const handleRemove = (name) => {
        onChange(colors.filter((c) => c.name !== name));
    };

    const handleHexChange = (name, hex) => {
        onChange(colors.map((c) => (c.name === name ? { ...c, hex } : c)));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }
    };

    return (
        <div>
            {/* Existing colors */}
            {colors.length > 0 && (
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
                    marginBottom: '0.75rem', padding: '0.75rem',
                    background: '#fafafa', borderRadius: 6, border: '1px solid #f0f0f0',
                }}>
                    {colors.map((c) => (
                        <div key={c.name} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            gap: '0.3rem', position: 'relative',
                        }}>
                            {/* Color swatch with inline hex picker */}
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    width: 44, height: 44,
                                    backgroundColor: c.hex,
                                    border: isLightColor(c.hex) ? '1.5px solid #ccc' : '1.5px solid transparent',
                                    borderRadius: 4,
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}>
                                    {/* Hidden color input overlaid on swatch */}
                                    <input
                                        type="color"
                                        value={c.hex}
                                        onChange={(e) => handleHexChange(c.name, e.target.value)}
                                        title="Đổi màu"
                                        style={{
                                            position: 'absolute', inset: 0, width: '100%', height: '100%',
                                            opacity: 0, cursor: 'pointer', padding: 0, border: 'none',
                                        }}
                                    />
                                </div>
                                {/* Remove button */}
                                <button
                                    type="button"
                                    onClick={() => handleRemove(c.name)}
                                    title="Xóa màu"
                                    style={{
                                        position: 'absolute', top: -6, right: -6,
                                        width: 16, height: 16, borderRadius: '50%',
                                        background: '#dc2626', color: '#fff', border: 'none',
                                        fontSize: '0.6rem', cursor: 'pointer', lineHeight: 1,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700,
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                            <span style={{ fontSize: '0.65rem', color: '#555', maxWidth: 52, textAlign: 'center', lineHeight: 1.2 }}>
                                {c.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Add new color row */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tên màu (VD: Đen, Be...)"
                    style={{
                        flex: 1, padding: '0.5rem 0.65rem', border: '1px solid #e0e0e0',
                        borderRadius: 6, fontSize: '0.82rem', background: '#fafafa',
                    }}
                />
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 6,
                        backgroundColor: newHex,
                        border: isLightColor(newHex) ? '1.5px solid #ccc' : '1.5px solid #ddd',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                        overflow: 'hidden', cursor: 'pointer',
                    }}>
                        <input
                            type="color"
                            value={newHex}
                            onChange={(e) => setNewHex(e.target.value)}
                            title="Chọn màu"
                            style={{
                                position: 'absolute', inset: 0, width: '100%', height: '100%',
                                opacity: 0, cursor: 'pointer', padding: 0, border: 'none',
                            }}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!newName.trim()}
                    style={{
                        padding: '0.5rem 0.9rem', background: '#333', color: '#fff',
                        border: 'none', borderRadius: 6, fontSize: '0.82rem',
                        fontWeight: 600, cursor: 'pointer', flexShrink: 0,
                        opacity: newName.trim() ? 1 : 0.4,
                    }}
                >
                    + Thêm
                </button>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#888', margin: '0.4rem 0 0' }}>
                💡 Nhập tên màu tiếng Việt (Đen, Trắng, Be...) để tự động nhận diện màu. Click vào ô màu để chỉnh hex.
            </p>
        </div>
    );
};

// ---- Size Chart Editor ----
const SizeChartEditor = ({ sizeChart, onChange }) => {
    // Default structure if empty
    const defaultChart = {
        S: { chest: '', shoulder: '', length: '' },
        M: { chest: '', shoulder: '', length: '' },
        L: { chest: '', shoulder: '', length: '' },
        XL: { chest: '', shoulder: '', length: '' },
    };

    const chart = sizeChart || defaultChart;
    const sizes = ['S', 'M', 'L', 'XL'];
    const metrics = [
        { key: 'chest', label: 'Ngực (cm)' },
        { key: 'shoulder', label: 'Vai (cm)' },
        { key: 'length', label: 'Dài (cm)' },
    ];

    const handleChange = (size, metric, value) => {
        onChange({
            ...chart,
            [size]: {
                ...chart[size],
                [metric]: value
            }
        });
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <table className="admin-table" style={{ fontSize: '0.85rem' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px', background: '#f9f9f9' }}>Size</th>
                        {sizes.map(size => (
                            <th key={size} style={{ padding: '8px', background: '#f9f9f9', textAlign: 'center' }}>
                                {size}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {metrics.map(metric => (
                        <tr key={metric.key}>
                            <td style={{ fontWeight: 600, padding: '8px' }}>{metric.label}</td>
                            {sizes.map(size => (
                                <td key={`${size}-${metric.key}`} style={{ padding: '4px' }}>
                                    <input
                                        type="text"
                                        value={chart[size]?.[metric.key] || ''}
                                        onChange={(e) => handleChange(size, metric.key, e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '4px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            textAlign: 'center'
                                        }}
                                        placeholder="-"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// ---- Product Modal ----
const EMPTY_PRODUCT = {
    name: '',
    category: 'nam',
    price: '',
    stock: '',
    status: 'active',
    featured: false,
    colors: [],
    sizes: 'S, M, L, XL',
    imageUrls: '', // Added for free-form URL input
    description: '',
    material: '',
    careInstructions: '',
    sizeChart: {
        S: { chest: '', shoulder: '', length: '' },
        M: { chest: '', shoulder: '', length: '' },
        L: { chest: '', shoulder: '', length: '' },
        XL: { chest: '', shoulder: '', length: '' },
    }
};

const ProductModal = ({ product, onClose, onSave }) => {
    const [form, setForm] = useState(
        product
            ? {
                ...EMPTY_PRODUCT,
                ...product,
                sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes,
                imageUrls: Array.isArray(product.imageUrls) ? product.imageUrls.join(', ') : (product.imageUrls || ''),
                sizeChart: product.sizeChart || EMPTY_PRODUCT.sizeChart
            }
            : EMPTY_PRODUCT
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleColorsChange = (colors) => {
        setForm((prev) => ({ ...prev, colors }));
    };

    const handleSizeChartChange = (newChart) => {
        setForm(prev => ({ ...prev, sizeChart: newChart }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="admin-modal" style={{ maxWidth: 800 }}>
                <div className="admin-modal-header">
                    <span className="admin-modal-title">
                        {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                    </span>
                    <button className="admin-modal-close" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="admin-modal-body">
                        <div className="admin-form-grid">
                            <div className="admin-form-group full-width">
                                <label>Tên sản phẩm *</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="VD: ÁO KHOÁC PHA LEN"
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Danh mục</label>
                                <select name="category" value={form.category} onChange={handleChange}>
                                    <option value="nam">Nam</option>
                                    <option value="nu">Nữ</option>
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label>Trạng thái</label>
                                <select name="status" value={form.status} onChange={handleChange}>
                                    <option value="active">Đang bán</option>
                                    <option value="out_of_stock">Hết hàng</option>
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', height: '100%', marginTop: '1.5rem' }}>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={form.featured}
                                        onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                                        style={{ width: '18px', height: '18px' }}
                                    />
                                    <span>Sản phẩm nổi bật</span>
                                </label>
                            </div>
                            <div className="admin-form-group">
                                <label>Giá (VND) *</label>
                                <input
                                    name="price"
                                    type="number"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="VD: 1399000"
                                    required
                                    min="0"
                                />
                            </div>
                            <div className="admin-form-group full-width">
                                <label>Link hình ảnh (Phân cách bằng dấu phẩy) *</label>
                                <textarea
                                    name="imageUrls"
                                    value={form.imageUrls}
                                    onChange={handleChange}
                                    placeholder="VD: https://images.com/anh1.jpg, https://images.com/anh2.jpg"
                                    rows={2}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '6px',
                                        fontFamily: 'inherit',
                                        resize: 'vertical'
                                    }}
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label>Tồn kho</label>
                                <input
                                    name="stock"
                                    type="number"
                                    value={form.stock}
                                    onChange={handleChange}
                                    placeholder="VD: 50"
                                    min="0"
                                />
                            </div>
                            <div className="admin-form-group full-width">
                                <label>Mô tả sản phẩm</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Áo nỉ dáng suông..."
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '6px',
                                        fontFamily: 'inherit',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div className="admin-form-group full-width">
                                <label>Chất liệu (xuống dòng để tạo gạch đầu dòng)</label>
                                <textarea
                                    name="material"
                                    value={form.material}
                                    onChange={handleChange}
                                    placeholder={"+ LỚP NGOÀI: 80% cotton...\n+ CHI TIẾT: 20% polyester..."}
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '6px',
                                        fontFamily: 'inherit',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div className="admin-form-group full-width">
                                <label>Hướng dẫn bảo quản</label>
                                <textarea
                                    name="careInstructions"
                                    value={form.careInstructions}
                                    onChange={handleChange}
                                    placeholder={"Giặt máy ở nhiệt độ tối đa 30ºC...\nKhông sử dụng nước tẩy..."}
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '6px',
                                        fontFamily: 'inherit',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div className="admin-form-group full-width">
                                <label>Kích thước (phân cách bằng dấu phẩy)</label>
                                <input
                                    name="sizes"
                                    value={form.sizes}
                                    onChange={handleChange}
                                    placeholder="S, M, L, XL"
                                />
                            </div>

                            {/* Size Chart Editor - full width */}
                            <div className="admin-form-group full-width">
                                <label>Bảng thông số kích thước</label>
                                <SizeChartEditor sizeChart={form.sizeChart} onChange={handleSizeChartChange} />
                            </div>

                            {/* Color Editor - full width */}
                            <div className="admin-form-group full-width">
                                <label>Màu sắc ({form.colors.length} màu)</label>
                                <ColorEditor colors={form.colors} onChange={handleColorsChange} />
                            </div>
                        </div>
                    </div>
                    <div className="admin-modal-footer">
                        <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
                            Hủy
                        </button>
                        <button type="submit" className="admin-btn admin-btn-primary">
                            {product ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ---- Main Table ----
const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [viewDescription, setViewDescription] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await productService.getProducts({ size: 100 }); // Get all for simplicity
            setProducts(data.content || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            alert('Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filtered = (products || []).filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = categoryFilter === 'all' || p.categoryName?.toLowerCase() === categoryFilter.toLowerCase() || p.category === categoryFilter;
        return matchSearch && matchCat;
    });

    const handleAdd = () => { setEditProduct(null); setModalOpen(true); };
    const handleEdit = (product) => { setEditProduct(product); setModalOpen(true); };
    const handleDelete = async (id) => { 
        try {
            await productService.deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            setDeleteConfirm(null);
        } catch (error) {
            alert('Xóa thất bại: ' + (error.message || 'Lỗi hệ thống'));
        }
    };

    const handleSave = async (data) => {
        // Map frontend 'nam'/'nu' to backend categoryId
        const categoryId = data.category === 'nam' ? 1 : (data.category === 'nu' ? 2 : null);
        
        // Final payload preparation
        const payload = {
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
            categoryId,
            sizes: typeof data.sizes === 'string' 
                ? data.sizes.split(',').map(s => s.trim()).filter(Boolean) 
                : data.sizes,
            imageUrls: typeof data.imageUrls === 'string' 
                ? data.imageUrls.split(',').map(u => u.trim()).filter(Boolean) 
                : data.imageUrls
        };

        try {
            if (editProduct) {
                const updated = await productService.updateProduct(editProduct.id, payload);
                setProducts((prev) => prev.map((p) => (p.id === editProduct.id ? updated : p)));
            } else {
                const created = await productService.createProduct(payload);
                setProducts((prev) => [created, ...prev]);
            }
            setModalOpen(false);
        } catch (error) {
            alert('Lưu thất bại: ' + (error.message || 'Lỗi hệ thống'));
        }
    };

    const statusLabel = (s) => (s === 'active' ? 'Đang bán' : 'Hết hàng');

    return (
        <div>
            {/* Toolbar */}
            <div className="admin-toolbar">
                <div className="admin-search">
                    <span className="admin-search-icon"></span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="admin-filter-tabs">
                    {[
                        { key: 'all', label: 'Tất cả' },
                        { key: 'nam', label: 'Nam' },
                        { key: 'nu', label: 'Nữ' },
                    ].map((f) => (
                        <button
                            key={f.key}
                            className={`admin-filter-tab ${categoryFilter === f.key ? 'active' : ''}`}
                            onClick={() => setCategoryFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleAdd} style={{ marginLeft: 'auto' }}>
                    + Thêm sản phẩm
                </button>
            </div>

            {/* Table */}
            <div className="admin-card">
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Mô tả</th>
                                <th>Danh mục</th>
                                <th>Giá</th>
                                <th>Tồn kho</th>
                                <th>Màu sắc</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">🔍</div>
                                            <h3>Không tìm thấy sản phẩm</h3>
                                            <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((product) => (
                                    <tr key={product.id}>
                                        {/* Product name + image */}
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                {product.imageUrls && product.imageUrls.length > 0 ? (
                                                    <img src={product.imageUrls[0]} alt={product.name} className="admin-table-img" />
                                                ) : product.image ? (
                                                    <img src={product.image} alt={product.name} className="admin-table-img" />
                                                ) : (
                                                    <div style={{
                                                        width: 40, height: 50, borderRadius: 4,
                                                        background: '#f5f5f5', display: 'flex',
                                                        alignItems: 'center', justifyContent: 'center',
                                                        fontSize: '1.2rem', border: '1px solid #e0e0e0',
                                                    }}>
                                                        👕
                                                    </div>
                                                )}
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <div className="admin-table-product-name">{product.name}</div>
                                                        {product.featured && (
                                                            <span style={{ 
                                                                background: '#fef3c7', 
                                                                color: '#92400e', 
                                                                fontSize: '0.65rem', 
                                                                padding: '2px 6px', 
                                                                borderRadius: '4px',
                                                                fontWeight: 700
                                                            }}>NỔI BẬT</span>
                                                        )}
                                                    </div>
                                                    <div className="admin-table-sub">ID: {product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div 
                                                className="admin-table-desc" 
                                                title="Click để xem chi tiết"
                                                onClick={() => setViewDescription(product)}
                                                style={{
                                                    maxWidth: '220px',
                                                    fontSize: '0.8rem',
                                                    lineHeight: '1.4',
                                                    color: '#666',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {product.description || <em style={{ color: '#ccc' }}>Chưa có mô tả</em>}
                                            </div>
                                        </td>
                                        <td style={{ textTransform: 'capitalize' }}>
                                            {product.categoryName || (product.category === 'nam' ? 'Nam' : 'Nữ')}
                                        </td>
                                        <td style={{ fontWeight: 600, color: '#333' }}>
                                            {formatCurrency(product.price)}
                                        </td>
                                        <td>
                                            <span style={{ fontWeight: 600, color: product.stock === 0 ? '#dc2626' : '#333' }}>
                                                {product.stock}
                                            </span>
                                        </td>

                                        {/* Color Swatches column */}
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                                                {product.colors && product.colors.slice(0, 4).map((c) => (
                                                    <ColorSwatch key={c.name} color={c} size="sm" />
                                                ))}
                                                {product.colors && product.colors.length > 4 && (
                                                    <div style={{
                                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                                        gap: '0.25rem',
                                                    }}>
                                                        <div style={{
                                                            width: 32, height: 32, borderRadius: 4,
                                                            background: '#f0f0f0', border: '1px solid #ddd',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: '0.72rem', fontWeight: 600, color: '#666',
                                                        }}>
                                                            +{product.colors.length - 4}
                                                        </div>
                                                        <span style={{ fontSize: '0.65rem', color: '#888' }}>thêm</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td>
                                            <span className={`status-badge ${product.stock > 0 ? 'active' : 'out_of_stock'}`}>
                                                {product.stock > 0 ? 'Đang bán' : 'Hết hàng'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="table-actions">
                                                <button className="admin-btn-icon" title="Chỉnh sửa" onClick={() => handleEdit(product)}>
                                                    ✏️
                                                </button>
                                                <button className="admin-btn-icon danger" title="Xóa" onClick={() => setDeleteConfirm(product.id)}>
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="admin-pagination">
                    <span className="admin-pagination-info">
                        Hiển thị {filtered.length} / {products.length} sản phẩm
                    </span>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {modalOpen && (
                <ProductModal
                    product={editProduct}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {/* View Description Modal */}
            {viewDescription && (
                <div className="admin-modal-overlay" onClick={() => setViewDescription(null)}>
                    <div className="admin-modal" style={{ maxWidth: 500 }}>
                        <div className="admin-modal-header">
                            <span className="admin-modal-title">Chi tiết mô tả: {viewDescription.name}</span>
                            <button className="admin-modal-close" onClick={() => setViewDescription(null)}>✕</button>
                        </div>
                        <div className="admin-modal-body">
                            <div style={{ 
                                whiteSpace: 'pre-line', 
                                fontSize: '0.9rem', 
                                lineHeight: '1.6',
                                color: '#333'
                            }}>
                                {viewDescription.description || <em style={{ color: '#ccc' }}>Chưa có mô tả</em>}
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <button className="admin-btn admin-btn-secondary" onClick={() => setViewDescription(null)}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
                <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="admin-modal" style={{ maxWidth: 400 }}>
                        <div className="admin-modal-header">
                            <span className="admin-modal-title">Xác nhận xóa</span>
                            <button className="admin-modal-close" onClick={() => setDeleteConfirm(null)}>✕</button>
                        </div>
                        <div className="admin-modal-body">
                            <p style={{ color: '#555', margin: 0 }}>
                                Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
                            </p>
                        </div>
                        <div className="admin-modal-footer">
                            <button className="admin-btn admin-btn-secondary" onClick={() => setDeleteConfirm(null)}>
                                Hủy
                            </button>
                            <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                                Xóa sản phẩm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsTable;
