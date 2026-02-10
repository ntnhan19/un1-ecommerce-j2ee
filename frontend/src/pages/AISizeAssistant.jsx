import React from 'react';
import { useSize } from '../context/SizeContext';
import MySizeDrawer from '../components/common/MySizeDrawer';

const AISizeAssistant = () => {
    const { toggleDrawer } = useSize();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">AI Size Assistant</h1>
                <p className="text-lg text-gray-500 leading-relaxed italic">
                    "Trang 11 Figma - Ngọc Hân - USER Page"
                </p>
            </div>

            <button
                onClick={() => toggleDrawer(true)}
                className="bg-black text-white px-10 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
                Mở MySize Assist
            </button>

            <MySizeDrawer />

            <div className="mt-20 p-8 border border-dashed border-gray-300 rounded-2xl max-w-md text-center text-gray-400">
                <p>Đây là demo cho chức năng Drawer.<br />Trong thực tế, nút này sẽ nằm cạnh mục chọn Size ở trang Chi tiết sản phẩm.</p>
            </div>
        </div>
    );
};

export default AISizeAssistant;
