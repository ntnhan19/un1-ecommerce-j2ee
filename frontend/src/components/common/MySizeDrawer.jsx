import React from 'react';
import { useSize } from '../../context/SizeContext';
import SizeForm from '../ai/SizeForm';
import SizeRecommendation from '../ai/SizeRecommendation';

const MySizeDrawer = () => {
    const { isDrawerOpen, toggleDrawer, recommendation } = useSize();

    if (!isDrawerOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={() => toggleDrawer(false)}
            />

            {/* Drawer Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md pointer-events-auto transition-transform animate-in slide-in-from-right duration-500 ease-out">
                    <div className="h-full flex flex-col bg-white shadow-2xl overflow-y-auto">
                        {/* Header */}
                        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-100">
                            <h2 className="text-2xl font-medium text-gray-900 leading-none">
                                {recommendation ? 'MySize Assist' : 'Thông tin của bạn'}
                            </h2>
                            <button
                                onClick={() => toggleDrawer(false)}
                                className="text-gray-400 hover:text-black transition-colors"
                                aria-label="Close drawer"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="relative flex-1 px-8 py-8">
                            {!recommendation ? (
                                <SizeForm />
                            ) : (
                                <SizeRecommendation />
                            )}
                        </div>

                        {/* Footer */}
                        {recommendation && (
                            <div className="px-8 py-8 border-t border-gray-100">
                                <button
                                    onClick={() => toggleDrawer(false)}
                                    className="w-full py-4 rounded-full border border-gray-900 text-lg font-medium hover:bg-gray-50 transition-all uppercase tracking-widest"
                                >
                                    Đóng
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySizeDrawer;
