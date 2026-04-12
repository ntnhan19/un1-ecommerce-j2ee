import React, { useState, useCallback } from 'react';
import { buildInitialForm } from './constants';
import TabBasic from './TabBasic';
import TabColorSize from './TabColorSize';
import TabVariants from './TabVariants';
import './ProductModal.css';

const TABS = [
    { key: 'basic', label: 'Cơ bản' },
    { key: 'colorsize', label: 'Màu & Size' },
    { key: 'variants', label: 'Variants' },
];

const ProductModal = ({ product, categories = [], onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState('basic');
    const [form, setForm] = useState(() => buildInitialForm(product));
    const [saving, setSaving] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
    }, []);

    const handleFieldChange = useCallback((name, value) => {
        setForm(p => ({ ...p, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const imageUrls = form.imageUrls
                ? form.imageUrls.split(',').map(u => u.trim()).filter(Boolean)
                : [];

            const variants = form.variants.map(v => {
                // Hàm xử lý an toàn: đổi phẩy thành chấm và ép kiểu
                const parseSafe = (val) => {
                    if (val === '' || val === null || val === undefined) return null;
                    const num = Number(String(val).replace(',', '.'));
                    return isNaN(num) ? null : num;
                };

                return {
                    id: v.id || null,
                    size: v.size,
                    colorName: v.colorName,
                    colorHex: v.colorHex,
                    stock: parseInt(v.stock) || 0,
                    measurements: {
                        chestWidth: parseSafe(v.measurements.chestWidth),
                        shoulderWidth: parseSafe(v.measurements.shoulderWidth),
                        waistWidth: parseSafe(v.measurements.waistWidth),
                        hipWidth: parseSafe(v.measurements.hipWidth),
                        sleeveLength: parseSafe(v.measurements.sleeveLength),
                        bodyLength: parseSafe(v.measurements.bodyLength),
                        thighWidth: parseSafe(v.measurements.thighWidth),
                        inseam: parseSafe(v.measurements.inseam)
                    }
                };
            });

            const payload = {
                name: form.name,
                productType: form.productType,
                gender: form.gender,
                categoryId: form.categoryId ? Number(form.categoryId) : null,
                price: Number(form.price),
                description: form.description,
                imageUrls,
                featured: form.featured,
                colors: form.colors,
                sizes: form.sizes,
                variants, // Data variants giờ đã sạch sẽ, không còn NaN
            };
            await onSave(payload);
        } finally {
            setSaving(false);
        }
    };

    const isBasicTabValid = Boolean(
        form.name?.trim() &&
        form.productType &&
        form.gender &&
        String(form.price).trim() !== ''
    );

    const tabDone = {
        basic: isBasicTabValid,
        colorsize: form.colors.length > 0 && form.sizes.length > 0,
        variants: form.variants.length > 0,
    };

    const tabIdx = TABS.findIndex(t => t.key === activeTab);

    const missingFields = [];
    if (!form.name?.trim()) missingFields.push('Tên SP');
    if (!form.productType) missingFields.push('Loại SP');
    if (!form.gender) missingFields.push('Giới tính');
    if (String(form.price).trim() === '') missingFields.push('Giá bán');

    return (
        <div className="pm-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="pm-modal">
                <div className="pm-header">
                    <div>
                        <div className="pm-title">
                            {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                        </div>
                        <div className="pm-subtitle">
                            {product ? product.name : 'Điền thông tin để tạo sản phẩm mới'}
                        </div>
                    </div>
                    <button className="pm-close" onClick={onClose} type="button">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
                        </svg>
                    </button>
                </div>

                <div className="pm-tabs-bar">
                    {TABS.map((t, i) => (
                        <button
                            key={t.key}
                            type="button"
                            className={`pm-tab-btn ${activeTab === t.key ? 'active' : ''} ${tabDone[t.key] ? 'done' : ''}`}
                            onClick={() => setActiveTab(t.key)}
                        >
                            <span className="pm-tab-num">{tabDone[t.key] ? '✓' : i + 1}</span>
                            {t.label}
                            {t.key === 'variants' && form.variants.length > 0 && (
                                <span className="pm-tab-badge">{form.variants.length}</span>
                            )}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                    <div className="pm-body">
                        {activeTab === 'basic' && (
                            <TabBasic form={form} onChange={handleChange} onFieldChange={handleFieldChange} categories={categories} />
                        )}
                        {activeTab === 'colorsize' && (
                            <TabColorSize
                                form={form}
                                onColorsChange={colors => setForm(p => ({ ...p, colors }))}
                                onSizesChange={sizes => setForm(p => ({ ...p, sizes }))}
                            />
                        )}
                        {activeTab === 'variants' && (
                            <TabVariants
                                form={form}
                                onVariantsChange={variants => setForm(p => ({ ...p, variants }))}
                            />
                        )}
                    </div>

                    <div className="pm-footer">
                        <div className="pm-footer-nav">
                            {tabIdx > 0 && (
                                <button type="button" className="pm-btn pm-btn-ghost" onClick={() => setActiveTab(TABS[tabIdx - 1].key)}>
                                    ← Trước
                                </button>
                            )}
                            {tabIdx < TABS.length - 1 && (
                                <button type="button" className="pm-btn pm-btn-secondary" onClick={() => setActiveTab(TABS[tabIdx + 1].key)}>
                                    Tiếp →
                                </button>
                            )}
                        </div>
                        <div className="pm-footer-actions">
                            {!isBasicTabValid && (
                                <span style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}>
                                    * Thiếu: {missingFields.join(', ')}
                                </span>
                            )}

                            <button type="button" className="pm-btn pm-btn-ghost" onClick={onClose}>Hủy</button>
                            <button
                                type="submit"
                                className="pm-btn pm-btn-primary"
                                disabled={!isBasicTabValid || saving}
                                title={!isBasicTabValid ? 'Vui lòng điền đủ Tên, Loại SP, Giới tính và Giá' : ''}
                            >
                                {saving ? 'Đang lưu...' : (product ? 'Lưu thay đổi' : 'Tạo sản phẩm')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;