import React, { useEffect, useState } from 'react';
import MySizeDrawer from '../components/common/MySizeDrawer';
import { useSize } from '../context/SizeContext';
import productService from '../services/productService';

const AISizeAssistant = () => {
    const { toggleDrawer, attachProduct, currentProduct } = useSize();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProducts({ size: 12, sort: 'id,desc' });
                setProducts(data.content || []);
                if (data.content?.length) {
                    attachProduct(data.content[0]);
                }
            } catch (error) {
                console.error('Cannot load products for AI size demo', error);
            }
        };

        fetchProducts();
    }, [attachProduct]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">AI Size Assistant</h1>
                <p className="text-lg text-gray-500 leading-relaxed">
                    Chọn một sản phẩm có dữ liệu variant và số đo để xem hệ thống AI estimation + Fit Engine hoạt động thế nào.
                </p>
            </div>

            <div className="w-full max-w-xl mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sản phẩm demo</label>
                <select
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                    value={currentProduct?.id || ''}
                    onChange={(e) => {
                        const selected = products.find((product) => String(product.id) === e.target.value);
                        attachProduct(selected || null);
                    }}
                >
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={() => toggleDrawer(true)}
                className="bg-black text-white px-10 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                disabled={!currentProduct?.id}
            >
                Mở MySize Assist
            </button>

            <MySizeDrawer />
        </div>
    );
};

export default AISizeAssistant;
