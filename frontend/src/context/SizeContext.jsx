import React, { createContext, useContext, useState } from 'react';

const SizeContext = createContext();

export const SizeProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [measurements, setMeasurements] = useState({
        gender: '',
        height: 0,
        weight: 0,
        age: '',
        fitPreference: 2, // 0: Bó sát, 1: Vừa vặn (tiêu chuẩn), 2: Tiêu chuẩn, 3: Thoải mái, 4: Rộng
        shoulder: '',
        chest: '',
        waist: '',
        hips: '',
    });

    const [recommendation, setRecommendation] = useState(null);

    const toggleDrawer = (open) => setIsDrawerOpen(open ?? !isDrawerOpen);

    const updateMeasurements = (newMeasurements) => {
        setMeasurements((prev) => ({ ...prev, ...newMeasurements }));
    };

    const calculateSize = () => {
        const { height, weight } = measurements;
        if (!height || !weight) return null;

        let size = 'M';
        const bmi = weight / ((height / 100) ** 2);

        if (bmi < 18.5) size = 'XS';
        else if (bmi >= 18.5 && bmi < 22) size = 'S';
        else if (bmi >= 22 && bmi < 25) size = 'M';
        else if (bmi >= 25 && bmi < 30) size = 'L';
        else if (bmi >= 30 && bmi < 35) size = 'XL';
        else size = 'XXL';

        setRecommendation(size);
        return size;
    };

    const clearData = () => {
        setMeasurements({
            gender: '',
            height: 0,
            weight: 0,
            age: '',
            fitPreference: 2,
            shoulder: '',
            chest: '',
            waist: '',
            hips: '',
        });
        setRecommendation(null);
    }

    return (
        <SizeContext.Provider
            value={{
                isDrawerOpen,
                toggleDrawer,
                measurements,
                recommendation,
                updateMeasurements,
                calculateSize,
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
