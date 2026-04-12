import React, { createContext, useContext, useState, useCallback } from 'react';
import productService from '../services/productService';

const SizeContext = createContext();

export const SizeProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [measurements, setMeasurements] = useState({
        gender: '',
        height: '',
        weight: '',
        age: '',
        fitPreference: 2,
        shoulder: '',
        chest: '',
        waist: '',
        hips: '',
    });
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleDrawer = (open) => setIsDrawerOpen(open ?? !isDrawerOpen);

    const attachProduct = useCallback((product) => {
        setCurrentProduct(prev => {
            if (product?.id !== prev?.id) {
                setRecommendation(null);
                setError('');
            }
            return product || null;
        });
    }, []);

    const updateMeasurements = (newMeasurements) => {
        setMeasurements((prev) => ({ ...prev, ...newMeasurements }));
    };

    const calculateSize = async (overrideProduct, overrideMeasurements) => {
        const product = overrideProduct || currentProduct;
        const input = overrideMeasurements ? { ...measurements, ...overrideMeasurements } : measurements;
        if (!product?.id) {
            setError('Vui lòng chọn sản phẩm trước khi tư vấn size.');
            return null;
        }

        setLoading(true);
        setError('');
        try {
            const payload = {
                productId: product.id,
                gender: input.gender,
                age: Number(input.age),
                height: Number(input.height),
                weight: Number(input.weight),
                fitPreference: Number(input.fitPreference),
                shoulder: input.shoulder ? Number(input.shoulder) : null,
                chest: input.chest ? Number(input.chest) : null,
                waist: input.waist ? Number(input.waist) : null,
                hips: input.hips ? Number(input.hips) : null,
            };
            const response = await productService.recommendSize(payload);
            setRecommendation(response);
            return response;
        } catch (err) {
            const message = err?.message || 'Không thể tư vấn size lúc này.';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const clearData = () => {
        setMeasurements({
            gender: '',
            height: '',
            weight: '',
            age: '',
            fitPreference: 2,
            shoulder: '',
            chest: '',
            waist: '',
            hips: '',
        });
        setRecommendation(null);
        setError('');
    };

    const resetRecommendation = () => {
        setRecommendation(null);
        setError('');
    };

    return (
        <SizeContext.Provider
            value={{
                isDrawerOpen,
                toggleDrawer,
                currentProduct,
                attachProduct,
                measurements,
                recommendation,
                loading,
                error,
                updateMeasurements,
                calculateSize,
                resetRecommendation,
                clearData,
            }}
        >
            {children}
        </SizeContext.Provider>
    );
};

export const useSize = () => {
    const context = useContext(SizeContext);
    if (!context) {
        throw new Error('useSize must be used within a SizeProvider');
    }
    return context;
};
