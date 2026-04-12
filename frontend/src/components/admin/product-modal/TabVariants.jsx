import React, { useState } from 'react';
import { MEASUREMENTS_CONFIG, makeVariant } from './constants';

const VariantRow = ({ variant, productType, onUpdate, onRemove }) => {
    const [expanded, setExpanded] = useState(false);
    const measurements = MEASUREMENTS_CONFIG[productType] || [];

    const updateMeasurement = (key, val) => {
        onUpdate({ ...variant, measurements: { ...variant.measurements, [key]: val } });
    };

    return (
        <div className="pm-variant-row">
            <div className="pm-variant-header" onClick={() => setExpanded(!expanded)}>
                <div className="pm-variant-identity">
                    <span className="pm-variant-color-dot" style={{ background: variant.colorHex }} />
                    <span className="pm-variant-label">{variant.size} / {variant.colorName}</span>
                </div>
                <div className="pm-variant-stock-group">
                    <label className="pm-variant-stock-label">Tồn kho</label>
                    <input
                        className="pm-input pm-input-stock"
                        type="number"
                        min="0"
                        value={variant.stock}
                        onClick={e => e.stopPropagation()}
                        onChange={e => onUpdate({ ...variant, stock: parseInt(e.target.value) || 0 })}
                    />
                </div>
                {measurements.length > 0 && (
                    <button type="button" className="pm-variant-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}>
                        {expanded ? 'Thu gọn ▲' : 'Số đo ▼'}
                    </button>
                )}
                <button type="button" className="pm-variant-remove" onClick={e => { e.stopPropagation(); onRemove(); }}>×</button>
            </div>

            {expanded && measurements.length > 0 && (
                <div className="pm-variant-measurements">
                    <div className="pm-measurements-note">
                        Số đo giúp AI tư vấn size chính xác hơn cho khách hàng
                    </div>
                    <div className="pm-measurements-grid">
                        {measurements.map(m => (
                            <div key={m.key} className="pm-meas-field">
                                <label className="pm-meas-label">{m.label}</label>
                                <div className="pm-meas-input-wrap">
                                    <input
                                        className="pm-input pm-input-sm"
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        placeholder={m.placeholder}
                                        value={variant.measurements[m.key] || ''}
                                        onChange={e => updateMeasurement(m.key, e.target.value)}
                                    />
                                    <span className="pm-meas-unit">{m.unit}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const TabVariants = ({ form, onVariantsChange }) => {
    const generateFromColorSize = () => {
        if (!form.colors.length || !form.sizes.length) return;
        const existing = new Map(form.variants.map(v => [`${v.size}__${v.colorName}`, v]));
        const generated = [];
        form.sizes.forEach(size => {
            form.colors.forEach(color => {
                const key = `${size}__${color.name}`;
                if (existing.has(key)) {
                    generated.push(existing.get(key));
                } else {
                    generated.push(makeVariant(size, color.name, color.hex));
                }
            });
        });
        onVariantsChange(generated);
    };

    const updateVariant = (idx, updated) => {
        const next = [...form.variants];
        next[idx] = updated;
        onVariantsChange(next);
    };

    const removeVariant = (idx) => {
        onVariantsChange(form.variants.filter((_, i) => i !== idx));
    };

    const setBulkStock = (stock) => {
        onVariantsChange(form.variants.map(v => ({ ...v, stock: parseInt(stock) || 0 })));
    };

    const totalStock = form.variants.reduce((s, v) => s + (parseInt(v.stock) || 0), 0);

    return (
        <div className="pm-tab-content">
            <div className="pm-section">
                <div className="pm-section-header">
                    <div>
                        <div className="pm-section-title">Variants & Tồn kho</div>
                        <div className="pm-section-sub">Mỗi variant = 1 tổ hợp size × màu với tồn kho riêng và số đo AI</div>
                    </div>
                    <div className="pm-variant-actions">
                        <div className="pm-bulk-stock">
                            <span>Đặt tất cả:</span>
                            <input
                                className="pm-input pm-input-stock"
                                type="number"
                                min="0"
                                placeholder="SL"
                                onChange={e => setBulkStock(e.target.value)}
                            />
                        </div>
                        <button type="button" className="pm-btn-gen" onClick={generateFromColorSize}>
                            ⚡ Tạo từ màu × size
                        </button>
                    </div>
                </div>

                {form.variants.length === 0 ? (
                    <div className="pm-empty-variants">
                        <div className="pm-empty-icon">📦</div>
                        <div>Chưa có variant nào</div>
                        <div className="pm-empty-hint">Thiết lập màu & size ở tab trước, rồi bấm "Tạo từ màu × size"</div>
                    </div>
                ) : (
                    <div className="pm-variant-list">
                        {form.variants.map((v, idx) => (
                            <VariantRow
                                key={v._key || v.id || idx}
                                variant={v}
                                productType={form.productType}
                                onUpdate={updated => updateVariant(idx, updated)}
                                onRemove={() => removeVariant(idx)}
                            />
                        ))}
                    </div>
                )}

                {form.variants.length > 0 && (
                    <div className="pm-variant-summary">
                        <span>{form.variants.length} variants</span>
                        <span>•</span>
                        <span>Tổng tồn kho: <strong>{totalStock}</strong></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabVariants;