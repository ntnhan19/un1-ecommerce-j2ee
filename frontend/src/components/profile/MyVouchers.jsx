import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MyVouchers = () => {
    // Mock vouchers data
    const [vouchers] = useState([
        {
            id: '1',
            code: 'WELCOME50',
            title: 'Giảm 50K cho đơn hàng đầu tiên',
            discount: '50.000đ',
            minOrder: '500.000đ',
            expiryDate: '2026-03-31',
            status: 'active',
            description: 'Áp dụng cho đơn hàng từ 500.000đ'
        },
        {
            id: '2',
            code: 'FREESHIP',
            title: 'Miễn phí vận chuyển',
            discount: 'Free Ship',
            minOrder: '300.000đ',
            expiryDate: '2026-04-15',
            status: 'active',
            description: 'Miễn phí vận chuyển cho đơn hàng từ 300.000đ'
        },
        {
            id: '3',
            code: 'SALE100',
            title: 'Giảm 100K cho đơn hàng',
            discount: '100.000đ',
            minOrder: '1.000.000đ',
            expiryDate: '2026-02-10',
            status: 'expired',
            description: 'Áp dụng cho đơn hàng từ 1.000.000đ'
        }
    ]);

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        toast.success(`Đã copy mã: ${code}`);
    };

    const activeVouchers = vouchers.filter(v => v.status === 'active');
    const expiredVouchers = vouchers.filter(v => v.status === 'expired');

    return (
        <div className="vouchers-section">
            <div className="section-header">
                <h2>Voucher của tôi</h2>
                <p className="section-subtitle">Tổng số voucher: {vouchers.length} ({activeVouchers.length} còn hiệu lực)</p>
            </div>

            {/* Active Vouchers */}
            {activeVouchers.length > 0 && (
                <>
                    <h3 className="voucher-category-title">Voucher khả dụng</h3>
                    <div className="vouchers-grid">
                        {activeVouchers.map(voucher => (
                            <div key={voucher.id} className="voucher-card active">
                                <div className="voucher-header">
                                    <div className="voucher-discount">{voucher.discount}</div>
                                    <div className="voucher-status">Còn hiệu lực</div>
                                </div>
                                <div className="voucher-body">
                                    <h4 className="voucher-title">{voucher.title}</h4>
                                    <p className="voucher-description">{voucher.description}</p>
                                    <div className="voucher-details">
                                        <span className="voucher-code">Mã: <strong>{voucher.code}</strong></span>
                                        <span className="voucher-expiry">HSD: {new Date(voucher.expiryDate).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>
                                <div className="voucher-footer">
                                    <button
                                        className="btn-copy-code"
                                        onClick={() => copyToClipboard(voucher.code)}
                                    >
                                        Copy mã
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Expired Vouchers */}
            {expiredVouchers.length > 0 && (
                <>
                    <h3 className="voucher-category-title" style={{ marginTop: '2rem' }}>Voucher đã hết hạn</h3>
                    <div className="vouchers-grid">
                        {expiredVouchers.map(voucher => (
                            <div key={voucher.id} className="voucher-card expired">
                                <div className="voucher-header">
                                    <div className="voucher-discount">{voucher.discount}</div>
                                    <div className="voucher-status">Hết hạn</div>
                                </div>
                                <div className="voucher-body">
                                    <h4 className="voucher-title">{voucher.title}</h4>
                                    <p className="voucher-description">{voucher.description}</p>
                                    <div className="voucher-details">
                                        <span className="voucher-code">Mã: <strong>{voucher.code}</strong></span>
                                        <span className="voucher-expiry">HSD: {new Date(voucher.expiryDate).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {vouchers.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🎟️</div>
                    <h3>Chưa có voucher nào</h3>
                    <p>Bạn chưa có voucher nào. Hãy theo dõi các chương trình khuyến mãi!</p>
                </div>
            )}
        </div>
    );
};

export default MyVouchers;
