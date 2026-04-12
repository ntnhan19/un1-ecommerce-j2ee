import React from 'react';
import { useSize } from '../../context/SizeContext';
import SizeForm from '../ai/SizeForm';
import SizeRecommendation from '../ai/SizeRecommendation';
import './MySizeDrawer.css';

const MySizeDrawer = () => {
    const { isDrawerOpen, toggleDrawer, recommendation, currentProduct } = useSize();

    if (!isDrawerOpen) return null;

    return (
        <div>
            <div
                className="size-drawer-overlay"
                onClick={() => toggleDrawer(false)}
            />

            <div className="size-drawer-panel">
                <div>
                    <div className="size-drawer-header">
                        <div>
                            <h2 className="size-drawer-title">
                                {recommendation ? 'Kết quả tư vấn size' : 'MySize Assist'}
                            </h2>
                            {currentProduct?.name && (
                                <p style={{ margin: '0.35rem 0 0', color: '#666', fontSize: '0.9rem' }}>
                                    {currentProduct.name}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => toggleDrawer(false)}
                            className="size-drawer-close"
                            aria-label="Close drawer"
                        >
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="size-drawer-body">
                        {!recommendation ? <SizeForm /> : <SizeRecommendation />}
                    </div>

                    {recommendation && (
                        <div className="size-drawer-footer">
                            <button onClick={() => toggleDrawer(false)}>
                                Đóng
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MySizeDrawer;
