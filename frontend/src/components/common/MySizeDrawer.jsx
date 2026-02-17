import React from 'react';
import { useSize } from '../../context/SizeContext';
import SizeForm from '../ai/SizeForm';
import SizeRecommendation from '../ai/SizeRecommendation';
import './MySizeDrawer.css';

const MySizeDrawer = () => {
    const { isDrawerOpen, toggleDrawer, recommendation } = useSize();

    if (!isDrawerOpen) return null;

    return (
        <div>
            {/* Backdrop */}
            <div
                className="size-drawer-overlay"
                onClick={() => toggleDrawer(false)}
            />

            {/* Drawer Panel */}
            <div className="size-drawer-panel">
                <div>
                    {/* Header */}
                    <div className="size-drawer-header">
                        <h2 className="size-drawer-title">
                            {recommendation ? 'MySize Assist' : 'Thông tin của bạn'}
                        </h2>
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

                    {/* Content Body */}
                    <div className="size-drawer-body">
                        {!recommendation ? (
                            <SizeForm />
                        ) : (
                            <SizeRecommendation />
                        )}
                    </div>

                    {/* Footer */}
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
