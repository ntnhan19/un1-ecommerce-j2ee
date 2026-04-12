import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSize } from '../../context/SizeContext';
import './SizeForm.css';

const SizeForm = () => {
    const { measurements, updateMeasurements, calculateSize, clearData, currentProduct, loading, error } = useSize();
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Lấy thêm hàm 'setValue' từ useForm để điều khiển thanh trượt custom
    const { register, handleSubmit, watch, reset, setValue } = useForm({
        defaultValues: measurements
    });

    const fitPreference = watch('fitPreference');

    // Đảm bảo giá trị luôn là số nguyên từ 0-4 (mặc định là 2: Tiêu chuẩn)
    const currentFit = parseInt(fitPreference !== undefined && fitPreference !== '' ? fitPreference : 2, 10);
    const fitLabels = ['Rất ôm', 'Ôm', 'Tiêu chuẩn', 'Thoải mái', 'Rộng'];

    useEffect(() => {
        reset(measurements);
    }, [measurements, reset]);

    const onSubmit = async (data) => {
        const payload = {
            gender: data.gender,
            age: parseInt(data.age, 10),
            height: parseFloat(data.height),
            weight: parseFloat(data.weight),
            fitPreference: currentFit, // Lấy giá trị đã parse an toàn

            shoulder: data.shoulder ? parseFloat(data.shoulder) : null,
            chest: data.chest ? parseFloat(data.chest) : null,
            waist: data.waist ? parseFloat(data.waist) : null,
            hips: data.hips ? parseFloat(data.hips) : null,
        };

        updateMeasurements(payload);
        await calculateSize({ id: currentProduct?.id }, payload);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="size-form-container">
            {!currentProduct?.id && (
                <div className="error-message" style={{ marginBottom: '1rem', color: '#dc2626', background: '#fee2e2', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                    Vui lòng mở tư vấn size từ trang chi tiết sản phẩm để hệ thống biết bạn đang xem mẫu nào.
                </div>
            )}

            <div className="size-form-grid">
                <div className="size-form-field">
                    <label className="size-form-label">Giới tính *</label>
                    <div className="size-form-select-wrapper">
                        <select {...register('gender', { required: true })} className="size-form-select">
                            <option value="">Chọn</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                        <div className="size-form-select-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="size-form-field">
                    <label className="size-form-label">Tuổi *</label>
                    <input type="number" placeholder="VD: 24" {...register('age', { required: true, min: 10, max: 100 })} className="size-form-input" />
                </div>
            </div>

            <div className="size-form-grid">
                <div className="size-form-field">
                    <label className="size-form-label">Chiều cao (cm) *</label>
                    <input type="number" placeholder="VD: 165" {...register('height', { required: true, min: 120, max: 230 })} className="size-form-input" />
                </div>
                <div className="size-form-field">
                    <label className="size-form-label">Cân nặng (kg) *</label>
                    <input type="number" placeholder="VD: 55" {...register('weight', { required: true, min: 30, max: 200 })} className="size-form-input" />
                </div>
            </div>

            {/* THANH TRƯỢT TÙY CHỈNH (CUSTOM SLIDER) MỚI */}
            <div className="size-form-slider-container">
                <label className="size-form-label" style={{ marginBottom: '0.5rem' }}>Sở thích độ rộng</label>

                {/* Input ẩn để react-hook-form vẫn theo dõi được data */}
                <input type="hidden" {...register('fitPreference')} value={currentFit} />

                <div className="custom-slider-wrapper">
                    <div className="custom-slider-track">
                        {/* Thanh màu đen chạy theo điểm active */}
                        <div className="custom-slider-fill" style={{ width: `${(currentFit / 4) * 100}%` }}></div>

                        {/* Các điểm click */}
                        <div className="custom-slider-steps">
                            {[0, 1, 2, 3, 4].map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    className={`custom-slider-step-btn ${currentFit === val ? 'active' : ''}`}
                                    onClick={() => setValue('fitPreference', val, { shouldDirty: true })}
                                    aria-label={`Chọn mức độ: ${fitLabels[val]}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Nhãn hiển thị bên dưới */}
                    <div className="size-form-slider-labels">
                        {fitLabels.map((label, index) => (
                            <span
                                key={index}
                                className={currentFit === index ? 'active-label' : ''}
                                style={{ transform: index === 0 ? 'translateX(-30%)' : index === 4 ? 'translateX(30%)' : 'none' }}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
                <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    style={{
                        background: 'none', border: 'none', color: '#4b5563', fontSize: '0.875rem',
                        fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem',
                        cursor: 'pointer', padding: 0
                    }}
                >
                    <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                    Nhập số đo chi tiết (Tùy chọn)
                </button>

                {showAdvanced && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', border: '1px dashed #d1d5db' }}>
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
                            Hệ thống AI có thể tự ước lượng số đo dựa vào chiều cao và cân nặng. Tuy nhiên, nếu bạn cung cấp số đo thực tế, kết quả sẽ chính xác tuyệt đối.
                        </p>
                        <div className="size-form-grid" style={{ marginBottom: '1rem' }}>
                            <div className="size-form-field">
                                <label className="size-form-label">Rộng vai (cm)</label>
                                <input type="number" step="0.1" placeholder="VD: 40" {...register('shoulder')} className="size-form-input" />
                            </div>
                            <div className="size-form-field">
                                <label className="size-form-label">Vòng ngực (cm)</label>
                                <input type="number" step="0.1" placeholder="VD: 85" {...register('chest')} className="size-form-input" />
                            </div>
                        </div>
                        <div className="size-form-grid">
                            <div className="size-form-field">
                                <label className="size-form-label">Vòng eo (cm)</label>
                                <input type="number" step="0.1" placeholder="VD: 65" {...register('waist')} className="size-form-input" />
                            </div>
                            <div className="size-form-field">
                                <label className="size-form-label">Vòng hông (cm)</label>
                                <input type="number" step="0.1" placeholder="VD: 90" {...register('hips')} className="size-form-input" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <div className="error-message" style={{ color: '#dc2626', fontSize: '0.875rem', fontWeight: 500 }}>
                    {error}
                </div>
            )}

            <button
                type="button"
                onClick={() => {
                    clearData();
                    reset({
                        gender: '', height: '', weight: '', age: '',
                        fitPreference: 2, shoulder: '', chest: '', waist: '', hips: '',
                    });
                }}
                className="size-form-clear-btn"
                style={{ marginTop: 'auto' }}
            >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="size-form-clear-text">Xóa dữ liệu của bạn</span>
            </button>

            <div className="size-form-actions">
                <button
                    type="submit"
                    className="size-form-btn size-form-btn-primary"
                    disabled={loading || !currentProduct?.id}
                    style={{ gridColumn: '1 / -1' }}
                >
                    {loading ? 'Đang phân tích...' : '✨ Xem Gợi Ý Size'}
                </button>
            </div>
        </form>
    );
};

export default SizeForm;