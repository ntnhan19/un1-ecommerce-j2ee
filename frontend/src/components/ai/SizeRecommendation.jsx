import React from 'react';
import { useSize } from '../../context/SizeContext';

const SizeRecommendation = () => {
    const { recommendation, measurements, updateMeasurements } = useSize();

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

    const fitPreferences = ["Bó sát", "Vừa vặn", "Vừa vặn", "Thoải mái", "Rộng"];
    const currentFitPref = fitPreferences[measurements.fitPreference] || "Vừa vặn";

    const fitDetails = [
        { label: "Vai", value: "Vừa vặn" },
        { label: "Tay áo", value: "Vừa vặn" },
        { label: "Chiều rộng cơ thể", value: "Vừa vặn" }
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* User Stats Summary */}
            <div className="py-2 space-y-1">
                <p className="text-sm font-light text-gray-900">
                    {measurements.gender === 'male' ? 'Nam' : 'Nữ'}, {measurements.age} tuổi, {measurements.height} cm, {measurements.weight} kg
                </p>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-light text-gray-900">
                        Sở thích về độ vừa vặn: <span className="font-normal">{currentFitPref}</span>
                    </p>
                    <button
                        onClick={() => updateMeasurements({ recommendation: null })} // Go back to edit
                        className="text-[11px] font-medium border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-all"
                    >
                        THAY ĐỔI
                    </button>
                </div>
            </div>

            {/* Main Size Selector */}
            <div className="text-center space-y-6">
                <h3 className="font-bold text-lg">Đây là cỡ tiêu chuẩn</h3>
                <div className="flex justify-between items-end border-b border-gray-100 pb-2 relative">
                    {sizes.map(size => {
                        const isRecommended = size === recommendation;
                        return (
                            <div key={size} className="flex flex-col items-center group cursor-pointer">
                                {isRecommended && (
                                    <span className="text-[10px] font-medium text-gray-900 mb-1">Cỡ nên mặc</span>
                                )}
                                <span className={`text-xl transition-all ${isRecommended ? 'font-black scale-110 text-black' : 'font-light text-gray-400 group-hover:text-gray-600'}`}>
                                    {size}
                                </span>
                                {isRecommended && (
                                    <div className="absolute -bottom-[2px] w-12 h-[3px] bg-gray-900 rounded-full" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Fit Details */}
            <div className="space-y-8 pt-4">
                {fitDetails.map((item, idx) => (
                    <div key={idx} className="space-y-3">
                        <p className="text-[12px] text-gray-500 font-light">{item.label}</p>
                        <div className="w-full border border-gray-300 rounded-full py-2.5 text-center text-sm font-bold tracking-tight">
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Footer Item */}
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-lg font-light">Vai</span>
                <span className="text-lg font-bold">Vừa vặn</span>
            </div>
        </div>
    );
};

export default SizeRecommendation;
