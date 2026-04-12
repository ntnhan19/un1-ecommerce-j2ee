import React, { useState } from 'react';
import { SIZE_PRESETS, PRESET_COLORS } from './constants';

const TabColorSize = ({ form, onColorsChange, onSizesChange }) => {
    const [colorName, setColorName] = useState('');
    const [colorHex, setColorHex] = useState('#111111');
    const [customSize, setCustomSize] = useState('');

    const addColor = () => {
        if (!colorName.trim()) return;
        if (form.colors.find(c => c.name.toLowerCase() === colorName.trim().toLowerCase())) return;
        onColorsChange([...form.colors, { name: colorName.trim(), hex: colorHex }]);
        setColorName('');
    };

    const addPresetColor = (preset) => {
        if (form.colors.find(c => c.name === preset.name)) return;
        onColorsChange([...form.colors, preset]);
    };

    const removeColor = (name) => onColorsChange(form.colors.filter(c => c.name !== name));

    const toggleSize = (size) => {
        if (form.sizes.includes(size)) {
            onSizesChange(form.sizes.filter(s => s !== size));
        } else {
            onSizesChange([...form.sizes, size]);
        }
    };

    const addCustomSize = () => {
        if (!customSize.trim() || form.sizes.includes(customSize.trim())) return;
        onSizesChange([...form.sizes, customSize.trim().toUpperCase()]);
        setCustomSize('');
    };

    const applyPreset = (preset) => {
        const newSizes = SIZE_PRESETS[preset].filter(s => !form.sizes.includes(s));
        onSizesChange([...form.sizes, ...newSizes]);
    };

    return (
        <div className="pm-tab-content">
            <div className="pm-section">
                <div className="pm-section-title">Màu sắc</div>
                <div className="pm-section-sub">Thêm màu sắc cho sản phẩm. Variants sẽ được tạo từ tổ hợp màu × size.</div>

                <div className="pm-preset-colors">
                    {PRESET_COLORS.map(p => (
                        <button
                            key={p.name}
                            type="button"
                            className={`pm-preset-color-btn ${form.colors.find(c => c.name === p.name) ? 'selected' : ''}`}
                            onClick={() => addPresetColor(p)}
                            title={p.name}
                        >
                            <span className="pm-color-swatch" style={{ background: p.hex }} />
                            {p.name}
                        </button>
                    ))}
                </div>

                <div className="pm-color-add-row">
                    <input
                        className="pm-input pm-input-sm"
                        placeholder="Tên màu (VD: Olive)"
                        value={colorName}
                        onChange={e => setColorName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addColor())}
                    />
                    <input
                        type="color"
                        className="pm-color-picker"
                        value={colorHex}
                        onChange={e => setColorHex(e.target.value)}
                    />
                    <button type="button" className="pm-btn-add" onClick={addColor}>+ Thêm</button>
                </div>

                {form.colors.length > 0 && (
                    <div className="pm-color-chips">
                        {form.colors.map(c => (
                            <div key={c.name} className="pm-color-chip">
                                <span className="pm-color-swatch-sm" style={{ background: c.hex }} />
                                <span>{c.name}</span>
                                <button type="button" className="pm-chip-remove" onClick={() => removeColor(c.name)}>×</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pm-section">
                <div className="pm-section-title">Size</div>
                <div className="pm-section-sub">Chọn size nhanh hoặc thêm size tùy chỉnh.</div>

                <div className="pm-size-presets">
                    <button type="button" className="pm-preset-btn" onClick={() => applyPreset('clothes')}>
                        Quần áo (XS–XXL)
                    </button>
                    <button type="button" className="pm-preset-btn" onClick={() => applyPreset('pants')}>
                        Quần dài (28–34)
                    </button>
                </div>

                <div className="pm-size-grid">
                    {[...SIZE_PRESETS.clothes, ...SIZE_PRESETS.pants, ...form.sizes.filter(s => !SIZE_PRESETS.clothes.includes(s) && !SIZE_PRESETS.pants.includes(s))].filter((s, i, arr) => arr.indexOf(s) === i).map(size => (
                        <button
                            key={size}
                            type="button"
                            className={`pm-size-btn ${form.sizes.includes(size) ? 'active' : ''}`}
                            onClick={() => toggleSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                <div className="pm-color-add-row">
                    <input
                        className="pm-input pm-input-sm"
                        placeholder="Size tùy chỉnh (VD: FREESIZE, 36...)"
                        value={customSize}
                        onChange={e => setCustomSize(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustomSize())}
                    />
                    <button type="button" className="pm-btn-add" onClick={addCustomSize}>+ Thêm</button>
                </div>

                {form.sizes.length > 0 && (
                    <div className="pm-size-summary">
                        Đã chọn: <strong>{form.sizes.join(', ')}</strong>
                        {form.colors.length > 0 && (
                            <span className="pm-variant-count">
                                → {form.sizes.length * form.colors.length} variants
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabColorSize;