import React, { useState } from 'react';
import { PRODUCT_TYPES, GENDERS } from './constants';

const ImagePreview = ({ urls }) => {
    const [errors, setErrors] = useState({});
    if (!urls || urls.length === 0) return null;
    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            {urls.slice(0, 6).map((url, i) =>
                errors[i] ? (
                    <div key={i} style={{ width: 56, height: 56, background: '#2a2a32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🖼</div>
                ) : (
                    <img key={i} src={url} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 6 }} onError={() => setErrors(p => ({ ...p, [i]: true }))} />
                )
            )}
        </div>
    );
};

const TabBasic = ({ form, onChange, onFieldChange, categories }) => {
    const imageUrls = form.imageUrls ? form.imageUrls.split(',').map(u => u.trim()).filter(Boolean) : [];

    return (
        <div className="pm-tab-content">
            <div className="pm-section">
                <div className="pm-section-title">Thông tin cơ bản</div>
                <div className="pm-grid-2">
                    <div className="pm-field pm-field-full">
                        <label className="pm-label">TÊN SẢN PHẨM <span className="pm-required">*</span></label>
                        <input
                            className="pm-input"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="VD: Áo Thun Basic Unisex"
                            required
                        />
                    </div>
                    <div className="pm-field">
                        <label className="pm-label">LOẠI SẢN PHẨM <span className="pm-required">*</span></label>
                        <div className="pm-type-grid">
                            {PRODUCT_TYPES.map(t => (
                                <button
                                    key={t.value}
                                    type="button"
                                    className={`pm-type-btn ${form.productType === t.value ? 'active' : ''}`}
                                    onClick={() => onFieldChange('productType', t.value)}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                        {form.productType && (
                            <div className="pm-hint">{PRODUCT_TYPES.find(t => t.value === form.productType)?.desc}</div>
                        )}
                    </div>
                    <div className="pm-field">
                        <label className="pm-label">GIỚI TÍNH <span className="pm-required">*</span></label>
                        <div className="pm-radio-group">
                            {GENDERS.map(g => (
                                <button
                                    key={g.value}
                                    type="button"
                                    className={`pm-radio-card ${form.gender === g.value ? 'active' : ''}`}
                                    onClick={() => onFieldChange('gender', g.value)}
                                >
                                    {g.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="pm-field">
                        <label className="pm-label">DANH MỤC</label>
                        <select className="pm-select" name="categoryId" value={form.categoryId || ''} onChange={onChange}>
                            <option value="">-- Không có --</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="pm-field">
                        <label className="pm-label">GIÁ BÁN (VNĐ) <span className="pm-required">*</span></label>
                        <input
                            className="pm-input"
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={onChange}
                            placeholder="VD: 350000"
                            min="0"
                            required
                        />
                    </div>
                    <div className="pm-field">
                        <label className="pm-label">NỔI BẬT</label>
                        <label className="pm-toggle">
                            <input
                                type="checkbox"
                                checked={form.featured}
                                onChange={e => onFieldChange('featured', e.target.checked)}
                            />
                            <span className="pm-toggle-track">
                                <span className="pm-toggle-thumb" />
                            </span>
                            <span className="pm-toggle-label">{form.featured ? 'Hiển thị nổi bật' : 'Không nổi bật'}</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="pm-section">
                <div className="pm-section-title">Mô tả & Hình ảnh</div>
                <div className="pm-field pm-field-full">
                    <label className="pm-label">MÔ TẢ SẢN PHẨM</label>
                    <textarea
                        className="pm-input pm-textarea"
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        placeholder="Mô tả chất liệu, phong cách, cách mặc..."
                        rows={3}
                    />
                </div>
                <div className="pm-field pm-field-full">
                    <label className="pm-label">URL HÌNH ẢNH <span className="pm-hint-inline">(cách nhau bằng dấu phẩy)</span></label>
                    <textarea
                        className="pm-input pm-textarea"
                        name="imageUrls"
                        value={form.imageUrls}
                        onChange={onChange}
                        placeholder="https://cdn.example.com/img1.jpg, https://cdn.example.com/img2.jpg"
                        rows={2}
                    />
                    <ImagePreview urls={imageUrls} />
                </div>
            </div>
        </div>
    );
};

export default TabBasic;