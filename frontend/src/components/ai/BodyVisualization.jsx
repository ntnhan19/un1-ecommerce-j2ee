import React from 'react';
import { useSize } from '../../context/SizeContext';

const BodyVisualization = () => {
    const { measurements } = useSize();
    const { height, weight } = measurements;

    // Simple logic to adjust SVG based on measurements
    const scale = height ? Math.min(Math.max((height / 170), 0.8), 1.2) : 1;
    const widthScale = weight ? Math.min(Math.max((weight / 60), 0.8), 1.4) : 1;

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-200 min-h-[400px]">
            <div className="relative" style={{ transform: `scale(${scale})` }}>
                <svg
                    width="120"
                    height="300"
                    viewBox="0 0 120 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-all duration-500 ease-out"
                >
                    {/* Simple Humanoid Shape */}
                    <circle cx="60" cy="30" r="20" fill="#E5E7EB" />
                    <path
                        d={`M${60 - 25 * widthScale} 60 H${60 + 25 * widthScale} L${60 + 20 * widthScale} 140 H${60 - 20 * widthScale} Z`}
                        fill="#D1D5DB"
                    />
                    <rect x={60 - 15 * widthScale} y="140" width={10 * widthScale} height="100" fill="#9CA3AF" />
                    <rect x={60 + 5 * widthScale} y="140" width={10 * widthScale} height="100" fill="#9CA3AF" />
                </svg>

                {/* Indicators */}
                <div className="absolute top-1/4 -right-16 text-xs font-medium text-gray-500 flex flex-col items-center">
                    <div className="w-8 h-[1px] bg-gray-300 mb-1"></div>
                    Vai
                </div>
                <div className="absolute top-1/2 -right-16 text-xs font-medium text-gray-500 flex flex-col items-center">
                    <div className="w-8 h-[1px] bg-gray-300 mb-1"></div>
                    Ngực
                </div>
                <div className="absolute bottom-1/3 -right-16 text-xs font-medium text-gray-500 flex flex-col items-center">
                    <div className="w-8 h-[1px] bg-gray-300 mb-1"></div>
                    Eo
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm font-medium italic">
                    Hình ảnh mô phỏng dựa trên số đo của bạn
                </p>
            </div>
        </div>
    );
};

export default BodyVisualization;
