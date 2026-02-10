import React from 'react';
import { useForm } from 'react-hook-form';
import { useSize } from '../../context/SizeContext';

const SizeForm = () => {
    const { measurements, updateMeasurements, calculateSize, clearData } = useSize();
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: measurements
    });

    const fitPreference = watch('fitPreference');

    const onSubmit = (data) => {
        updateMeasurements(data);
        calculateSize();
    };

    const fitLabels = ["Bó sát", "Vừa vặn", "Tiêu chuẩn", "Thoải mái", "Rộng"];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 flex flex-col h-full">
            {/* Gender Select */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Giới tính</label>
                <div className="relative">
                    <select
                        {...register('gender', { required: true })}
                        className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-black transition-all text-gray-500"
                    >
                        <option value="">Vui lòng chọn giới tính của bạn</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Age Input */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Tuổi</label>
                <input
                    type="number"
                    placeholder="Vui lòng nhập tuổi của bạn"
                    {...register('age', { required: true })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-black transition-all"
                />
            </div>

            {/* Height & Weight Inputs */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 text-nowrap">Chiều cao (cm)</label>
                    <input
                        type="number"
                        {...register('height', { required: true })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-black transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 text-nowrap">Cân nặng (kg)</label>
                    <input
                        type="number"
                        {...register('weight', { required: true })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-1 focus:ring-black transition-all"
                    />
                </div>
            </div>

            {/* Fit Preference Slider */}
            <div className="space-y-6 pt-2">
                <label className="text-sm font-medium text-gray-900">Sở thích về độ vừa vặn</label>
                <div className="px-2">
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="4"
                            step="1"
                            {...register('fitPreference')}
                            className="w-full h-0.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-500"
                        />
                        {/* Slider Dots */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
                            {[0, 1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-3 h-3 rounded-full border-2 ${fitPreference >= i ? 'bg-white border-gray-400' : 'bg-gray-100 border-gray-200'}`} />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between mt-4 text-[11px] font-medium text-gray-900">
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
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="text-sm font-medium border-b border-gray-400">Xóa dữ liệu của bạn</span>
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pb-4">
                <button
                    type="submit"
                    className="bg-black text-white py-4 rounded-full font-medium text-lg uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg"
                >
                    Thay đổi
                </button>
                <button
                    type="button"
                    onClick={() => { }} // Go back logic if needed
                    className="border border-gray-300 py-4 rounded-full font-medium text-lg uppercase tracking-widest hover:bg-gray-50 transition-all"
                >
                    Quay lại
                </button>
            </div>
        </form>
    );
};

export default SizeForm;
