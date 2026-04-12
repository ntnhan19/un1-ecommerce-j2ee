// components/admin/InventoryTable.jsx
import React, { useState, useEffect, useCallback } from 'react';
import productService from '../../services/productService';
import { formatCurrency } from '../../utils/formatters';
import '../../styles/components/Admin.css';

const InventoryTable = () => {
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [stockFilter, setStockFilter] = useState('all');

    const fetchInventory = useCallback(async () => {
        setLoading(true);
        try {
            const data = await productService.getProducts({ size: 500 });
            const products = data.content || [];
            // Flatten: mỗi variant thành 1 row kèm thông tin product
            const rows = [];
            products.forEach(p => {
                (p.variants || []).forEach(v => {
                    rows.push({
                        productId: p.id,
                        productName: p.name,
                        productImage: p.imageUrls?.[0],
                        categoryName: p.categoryName,
                        price: p.price,
                        variantId: v.id,
                        size: v.size,
                        colorName: v.colorName,
                        colorHex: v.colorHex,
                        stock: v.stock ?? 0,
                    });
                });
            });
            setVariants(rows);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchInventory(); }, [fetchInventory]);

    const filtered = variants.filter(v => {
        const matchSearch =
            v.productName?.toLowerCase().includes(search.toLowerCase()) ||
            v.colorName?.toLowerCase().includes(search.toLowerCase()) ||
            v.size?.toLowerCase().includes(search.toLowerCase());
        const matchStock =
            stockFilter === 'all' ? true :
                stockFilter === 'out' ? v.stock === 0 :
                    stockFilter === 'low' ? v.stock > 0 && v.stock < 10 :
                        v.stock >= 10;
        return matchSearch && matchStock;
    });

    const totalStock = variants.reduce((s, v) => s + v.stock, 0);
    const outOfStock = variants.filter(v => v.stock === 0).length;
    const lowStock = variants.filter(v => v.stock > 0 && v.stock < 10).length;

    if (loading) return <div className="admin-loading">Đang tải tồn kho...</div>;

    return (
        <div>
            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                {[
                    { label: 'Tổng tồn kho', value: totalStock.toLocaleString('vi-VN'), color: '#333' },
                    { label: 'Sắp hết hàng (< 10)', value: lowStock, color: '#d97706' },
                    { label: 'Hết hàng', value: outOfStock, color: '#dc2626' },
                ].map(card => (
                    <div key={card.label} className="admin-card" style={{ padding: '1rem 1.25rem', marginBottom: 0 }}>
                        <div style={{ fontSize: '0.72rem', color: '#aaa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{card.label}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: card.color, marginTop: '0.25rem' }}>{card.value}</div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="admin-toolbar">
                <div className="admin-search">
                    <svg className="admin-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm, màu, size..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[
                        { key: 'all', label: 'Tất cả' },
                        { key: 'low', label: '⚠ Sắp hết' },
                        { key: 'out', label: '✕ Hết hàng' },
                        { key: 'ok', label: '✓ Còn hàng' },
                    ].map(f => (
                        <button
                            key={f.key}
                            className={`admin-filter-tab ${stockFilter === f.key ? 'active' : ''}`}
                            onClick={() => setStockFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">Tồn kho theo variant</h3>
                    <span className="admin-card-sub">{filtered.length} / {variants.length} variants</span>
                </div>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Danh mục</th>
                                <th>Màu</th>
                                <th>Size</th>
                                <th>Giá</th>
                                <th>Tồn kho</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={7}>
                                    <div className="admin-empty">
                                        <div className="admin-empty-icon">📦</div>
                                        <h3>Không có dữ liệu</h3>
                                    </div>
                                </td></tr>
                            ) : filtered.map((v, i) => (
                                <tr key={`${v.variantId}-${i}`}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                            {v.productImage
                                                ? <img src={v.productImage} alt="" style={{ width: 40, height: 48, objectFit: 'cover', borderRadius: 5, flexShrink: 0 }} />
                                                : <div style={{ width: 40, height: 48, background: '#f0f0f0', borderRadius: 5, flexShrink: 0 }} />
                                            }
                                            <div>
                                                <div className="admin-table-product-name">{v.productName}</div>
                                                <div className="admin-table-sub">#{v.productId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="admin-badge-category">{v.categoryName || '—'}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <span style={{ width: 12, height: 12, borderRadius: '50%', background: v.colorHex || '#ccc', border: '1px solid rgba(0,0,0,0.1)', display: 'inline-block', flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.82rem' }}>{v.colorName}</span>
                                        </div>
                                    </td>
                                    <td><span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{v.size}</span></td>
                                    <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{formatCurrency(v.price)}</td>
                                    <td>
                                        <span style={{
                                            fontWeight: 800, fontSize: '0.95rem',
                                            color: v.stock === 0 ? '#dc2626' : v.stock < 10 ? '#d97706' : '#111',
                                        }}>{v.stock}</span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${v.stock === 0 ? 'cancelled' : v.stock < 10 ? 'processing' : 'active'}`}>
                                            {v.stock === 0 ? 'Hết hàng' : v.stock < 10 ? 'Sắp hết' : 'Còn hàng'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="admin-pagination">
                    <span className="admin-pagination-info">Hiển thị {filtered.length} / {variants.length} variants</span>
                </div>
            </div>
        </div>
    );
};

export default InventoryTable;