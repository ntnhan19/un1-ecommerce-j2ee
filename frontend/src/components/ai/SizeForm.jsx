import React from 'react';
import { useForm } from 'react-hook-form';
import { useSize } from '../../context/SizeContext';
import './SizeForm.css';

const SizeForm = () => {
    const { measurements, updateMeasurements, calculateSize, clearData } = useSize();
    const { register, handleSubmit, watch } = useForm({
        defaultValues: measurements
    });

    const fitPreference = watch('fitPreference');

    const onSubmit = (data) => {
        updateMeasurements(data);
        calculateSize();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="size-form-container">
            {/* Gender Select */}
            <div className="size-form-field">
                <label className="size-form-label">Giới tính</label>
                <div className="size-form-select-wrapper">
                    <select
                        {...register('gender', { required: true })}
                        className="size-form-select"
                    >
                        <option value="">Vui lòng chọn giới tính của bạn</option>
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

            {/* Age Input */}
            <div className="size-form-field">
                <label className="size-form-label">Tuổi</label>
                <input
                    type="number"
                    placeholder="Vui lòng nhập tuổi của bạn"
                    {...register('age', { required: true })}
                    className="size-form-input"
                />
            </div>

            {/* Height & Weight Inputs */}
            <div className="size-form-grid">
                <div className="size-form-field">
                    <label className="size-form-label">Chiều cao (cm)</label>
                    <input
                        type="number"
                        {...register('height', { required: true })}
                        className="size-form-input"
                    />
                </div>
                <div className="size-form-field">
                    <label className="size-form-label">Cân nặng (kg)</label>
                    <input
                        type="number"
                        {...register('weight', { required: true })}
                        className="size-form-input"
                    />
                </div>
            </div>

            {/* Fit Preference Slider */}
            <div className="size-form-slider-container">
                <label className="size-form-label">Sở thích về độ vừa vặn</label>
                <div className="size-form-slider-wrapper">
                    <div className="size-form-slider-track">
                        <input
                            type="range"
                            min="0"
                            max="4"
                            step="1"
                            {...register('fitPreference')}
                            className="size-form-slider"
                        />
                        {/* Slider Dots */}
                        <div className="size-form-slider-dots">
                            {[0, 1, 2, 3, 4].map(i => (
                                <div
                                    key={i}
                                    className={`size-form-slider-dot ${parseInt(fitPreference) >= i ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="size-form-slider-labels">
                        <span>Bó sát</span>
                        <span>Tiêu chuẩn</span>
                        <span>Rộng</span>
                    </div>
                </div>
            </div>

            {/* Clear Link */}
            <button
                type="button"
                onClick={clearData}
                className="size-form-clear-btn"
            >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="size-form-clear-text">Xóa dữ liệu của bạn</span>
            </button>

            {/* Spacer */}
            <div className="size-form-spacer" />

            {/* Action Buttons */}
            <div className="size-form-actions">
                <button
                    type="submit"
                    className="size-form-btn size-form-btn-primary"
                >
                    Thay đổi
                </button>
                <button
                    type="button"
                    onClick={() => { }}
                    className="size-form-btn size-form-btn-secondary"
                >
                    Quay lại
                </button>
            </div>
        </form>
    );
};

export default SizeForm;
