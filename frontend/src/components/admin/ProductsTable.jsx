import React, { useState, useEffect, useCallback } from 'react';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import { formatCurrency } from '../../utils/formatters';
import ProductModal from './product-modal/ProductModal';
import '../../styles/components/Admin.css';

const PRODUCT_TYPE_LABEL = {
    TOP: 'Áo trên',
    BOTTOM: 'Quần',
    DRESS: 'Váy',
    OUTERWEAR: 'Áo ngoài',
};

const GENDER_LABEL = {
    MALE: 'Nam',
    FEMALE: 'Nữ',
    UNISEX: 'Unisex',
};

const Toast = ({ message, type, onClose }) => (
    <div style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
        background: type === 'success' ? '#16a34a' : '#dc2626',
        color: '#fff', padding: '0.85rem 1.25rem', borderRadius: 8,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'flex', alignItems: 'center', gap: '0.65rem',
        fontSize: '0.85rem', fontWeight: 500, maxWidth: 360,
        animation: 'fadeIn 0.2s ease',
    }}>
        <span>{type === 'success' ? '✓' : '✕'}</span>
        <span style={{ flex: 1 }}>{message}</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.7, fontSize: '1rem' }}>×</button>
    </div>
);

const DeleteConfirmModal = ({ product, onConfirm, onCancel }) => (
    <div className="admin-modal-overlay" onClick={onCancel}>
        <div className="admin-modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
                <span className="admin-modal-title" style={{ color: '#dc2626' }}>Xóa sản phẩm</span>
                <button className="admin-btn-icon" onClick={onCancel}>×</button>
            </div>
            <div style={{ padding: '1.25rem 1.5rem' }}>
                <p style={{ margin: 0, color: '#444', lineHeight: 1.6, fontSize: '0.88rem' }}>
                    Bạn có chắc muốn xóa <strong style={{ color: '#111' }}>{product.name}</strong>?
                    <br />
                    <span style={{ color: '#dc2626' }}>Hành động này không thể hoàn tác.</span>
                </p>
            </div>
            <div className="admin-modal-footer">
                <button className="admin-btn admin-btn-secondary" onClick={onCancel}>Hủy bỏ</button>
                <button className="admin-btn admin-btn-danger" onClick={onConfirm}>Xóa sản phẩm</button>
            </div>
        </div>
    </div>
);

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [productsData, categoriesData] = await Promise.all([
                productService.getProducts({ size: 200 }),
                categoryService.getAllCategories(),
            ]);
            setProducts(productsData.content || []);
            setCategories(categoriesData || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            showToast('Không thể tải dữ liệu. Kiểm tra kết nối!', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => { fetchData(); }, [fetchData]);

    // Filter
    const filtered = products.filter(p => {
        const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
        const matchCat = categoryFilter === 'all' || p.categoryId?.toString() === categoryFilter;
        const matchType = typeFilter === 'all' || p.productType === typeFilter;
        return matchSearch && matchCat && matchType;
    });

    const handleAdd = () => { setEditProduct(null); setModalOpen(true); };
    const handleEdit = (product) => { setEditProduct(product); setModalOpen(true); };

    const handleSave = async (payload) => {
        const totalStock = payload.variants.reduce((sum, v) => sum + (parseInt(v.stock) || 0), 0);

        const finalPayload = {
            ...payload,
            stock: totalStock
        };

        try {
            if (editProduct) {
                const updated = await productService.updateProduct(editProduct.id, finalPayload);
                setProducts((prev) => prev.map((p) => (p.id === editProduct.id ? updated : p)));
            } else {
                const created = await productService.createProduct(finalPayload);
                setProducts((prev) => [created, ...prev]);
            }
            setModalOpen(false);
        } catch (error) {
            console.error("Chi tiết lỗi 400:", error);
            // In ra lỗi từ Backend để dễ debug hơn
            const errorMsg = error.message || (error.errors ? JSON.stringify(error.errors) : 'Vui lòng kiểm tra lại dữ liệu nhập');
            alert('Lưu thất bại: ' + errorMsg);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await productService.deleteProduct(deleteTarget.id);
            setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
            showToast('Đã xóa sản phẩm!');
        } catch (error) {
            showToast('Xóa thất bại: ' + (error.message || 'Lỗi hệ thống'), 'error');
        } finally {
            setDeleteTarget(null);
        }
    };

    if (loading) {
        return <div className="admin-loading">Đang tải dữ liệu sản phẩm...</div>;
    }

    return (
        <div>
            {/* Toolbar */}
            <div className="admin-toolbar">
                <div className="admin-search">
                    <svg className="admin-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <select
                        className="admin-select"
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                    >
                        <option value="all">Tất cả danh mục</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id.toString()}>{c.name}</option>
                        ))}
                    </select>
                    <select
                        className="admin-select"
                        value={typeFilter}
                        onChange={e => setTypeFilter(e.target.value)}
                    >
                        <option value="all">Tất cả loại</option>
                        <option value="TOP">Áo trên</option>
                        <option value="BOTTOM">Quần</option>
                        <option value="DRESS">Váy</option>
                        <option value="OUTERWEAR">Áo ngoài</option>
                    </select>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleAdd}>
                        + THÊM SẢN PHẨM
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">DANH SÁCH SẢN PHẨM</h3>
                    <span className="admin-card-sub">{filtered.length} / {products.length} sản phẩm</span>
                </div>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>SẢN PHẨM</th>
                                <th>DANH MỤC</th>
                                <th>LOẠI / GIỚI</th>
                                <th>GIÁ</th>
                                <th>TỒN KHO</th>
                                <th>TRẠNG THÁI</th>
                                <th style={{ textAlign: 'right' }}>THAO TÁC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">📦</div>
                                            <h3>Không tìm thấy sản phẩm</h3>
                                            <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(product => (
                                    <tr key={product.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                {product.imageUrls?.length > 0 ? (
                                                    <img
                                                        src={product.imageUrls[0]}
                                                        alt={product.name}
                                                        className="admin-table-img"
                                                        style={{ width: 48, height: 56, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                                                    />
                                                ) : (
                                                    <div style={{ width: 48, height: 56, background: '#f0f0f0', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: '1.25rem', flexShrink: 0 }}>
                                                        ☐
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="admin-table-product-name">{product.name}</div>
                                                    <div className="admin-table-sub">ID #{product.id}</div>
                                                    {product.colors?.length > 0 && (
                                                        <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>
                                                            {product.colors.slice(0, 5).map((c, i) => (
                                                                <span key={i} title={c.name} style={{
                                                                    width: 10, height: 10, borderRadius: '50%',
                                                                    background: c.hex || '#ccc',
                                                                    border: '1px solid rgba(0,0,0,0.1)',
                                                                    display: 'inline-block',
                                                                }} />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="admin-badge-category">
                                                {product.categoryName || '—'}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '0.8rem', color: '#555' }}>
                                                {PRODUCT_TYPE_LABEL[product.productType] || product.productType || '—'}
                                            </div>
                                            <div className="admin-table-sub">
                                                {GENDER_LABEL[product.gender] || product.gender || ''}
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 700, color: '#111', fontSize: '0.88rem' }}>
                                            {formatCurrency(product.price)}
                                        </td>
                                        <td>
                                            <span style={{
                                                fontWeight: 700,
                                                color: product.stock === 0 ? '#dc2626' : product.stock < 10 ? '#d97706' : '#333',
                                                fontSize: '0.88rem',
                                            }}>
                                                {product.stock}
                                            </span>
                                            {product.variants?.length > 0 && (
                                                <div className="admin-table-sub">{product.variants.length} variants</div>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${product.stock > 0 ? 'active' : 'cancelled'}`}>
                                                {product.stock > 0 ? 'ĐANG BÁN' : 'HẾT HÀNG'}
                                            </span>
                                            {product.featured && (
                                                <div style={{ marginTop: 4 }}>
                                                    <span className="status-badge processing" style={{ fontSize: '0.65rem' }}>NỔI BẬT</span>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                                <button className="admin-btn-icon" title="Chỉnh sửa" onClick={() => handleEdit(product)}>
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </button>
                                                <button className="admin-btn-icon danger" title="Xóa" onClick={() => setDeleteTarget(product)}>
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    </svg>
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

            {/* Modals */}
            {modalOpen && (
                <ProductModal
                    product={editProduct}
                    categories={categories}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {deleteTarget && (
                <DeleteConfirmModal
                    product={deleteTarget}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default ProductsTable;