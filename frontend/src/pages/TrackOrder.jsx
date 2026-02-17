import React, { useState } from 'react';
import { useOrder } from '../hooks/useOrder';
import Header from '../components/common/Header';
import OrderStatusBadge from '../components/orders/OrderStatusBadge';
import '../styles/components/TrackOrder.css';

const TrackOrder = () => {
    const { orders } = useOrder();
    const [formData, setFormData] = useState({
        email: '',
        orderNumber: ''
    });
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState('');
    const [isSearched, setIsSearched] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsSearched(true);

        // Validate input
        if (!formData.email.trim() || !formData.orderNumber.trim()) {
            setError('Vui lòng nhập đầy đủ thông tin');
            setSearchResult(null);
            return;
        }

        // Search for order
        const foundOrder = orders.find(
            order =>
                order.customerEmail?.toLowerCase() === formData.email.toLowerCase() &&
                order.orderNumber === formData.orderNumber
        );

        if (foundOrder) {
            setSearchResult(foundOrder);
        } else {
            setSearchResult(null);
            setError('Không tìm thấy đơn hàng. Vui lòng kiểm tra lại email và mã đơn hàng.');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCarrierTrackingUrl = (trackingNumber) => {
        // Default to SPX tracking - you can customize based on shipping method
        return `https://spx.vn/tracking?id=${trackingNumber}`;
    };

    return (
        <div className="track-order-page">
            <Header />

            <div className="track-order-container">
                <div className="track-order-header">
                    <h1>Tra cứu đơn hàng</h1>
                    <p>Nhập email và mã đơn hàng để kiểm tra trạng thái đơn hàng của bạn</p>
                </div>

                <div className="track-order-form-wrapper">
                    <form onSubmit={handleSubmit} className="track-order-form">
                        <div className="form-group">
                            <label htmlFor="email">Email đặt hàng</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="orderNumber">Mã đơn hàng</label>
                            <input
                                type="text"
                                id="orderNumber"
                                name="orderNumber"
                                value={formData.orderNumber}
                                onChange={handleChange}
                                placeholder="ORD-2026-001"
                                required
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="btn-track">
                            Tra cứu đơn hàng
                        </button>
                    </form>
                </div>

                {searchResult && (
                    <div className="order-result">
                        <div className="order-result-header">
                            <h2>Thông tin đơn hàng</h2>
                            <OrderStatusBadge status={searchResult.status} />
                        </div>

                        <div className="order-info-grid">
                            <div className="info-item">
                                <span className="info-label">Mã đơn hàng:</span>
                                <span className="info-value">{searchResult.orderNumber}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Ngày đặt:</span>
                                <span className="info-value">{formatDate(searchResult.date)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Khách hàng:</span>
                                <span className="info-value">{searchResult.customerName}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Email:</span>
                                <span className="info-value">{searchResult.customerEmail}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Số điện thoại:</span>
                                <span className="info-value">{searchResult.customerPhone}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Địa chỉ giao hàng:</span>
                                <span className="info-value">{searchResult.shippingAddress}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Mã vận đơn:</span>
                                <span className="info-value tracking-number">{searchResult.trackingNumber}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Tổng tiền:</span>
                                <span className="info-value total-amount">{formatCurrency(searchResult.totalAmount)}</span>
                            </div>
                        </div>

                        <div className="order-items-section">
                            <h3>Sản phẩm đã đặt</h3>
                            <div className="order-items-list">
                                {searchResult.items.map((item) => (
                                    <div key={item.id} className="order-item-card">
                                        <img src={item.image} alt={item.name} className="item-image" />
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <div className="item-attributes">
                                                {item.color && <span>Màu: {item.color}</span>}
                                                {item.size && <span>Size: {item.size}</span>}
                                            </div>
                                            <p className="item-quantity">Số lượng: {item.quantity}</p>
                                            <p className="item-price">{formatCurrency(item.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="tracking-actions">
                            <a
                                href={getCarrierTrackingUrl(searchResult.trackingNumber)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-track-shipping"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                Tra cứu vận chuyển chi tiết
                            </a>
                        </div>
                    </div>
                )}

                {isSearched && !searchResult && !error && (
                    <div className="no-result">
                        <p>Không tìm thấy đơn hàng với thông tin đã nhập.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
