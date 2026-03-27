import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/pages/order-success.css';
import { fireConfetti } from '../utils/confetti';
import { OrderContext } from '../context/OrderContext';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const { orders } = useContext(OrderContext);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
        // Fire confetti
        fireConfetti();
    }, []);

    // Get true order number from context or use fallback formatting
    const currentOrder = orders?.find(o => o.id === orderId);
    let displayOrderNumber = orderId;
    if (currentOrder?.orderNumber) {
        displayOrderNumber = currentOrder.orderNumber;
    } else if (orderId && !orderId.startsWith('ORD')) {
        // Fallback consistent structure formatting if context not loaded yet
        displayOrderNumber = `ORD-${new Date().getFullYear()}-${String(orderId).slice(-4).padStart(3, '0')}`;
    }

    // Calculate estimated delivery (3-5 days from now)
    const today = new Date();
    const deliveryStart = new Date(today);
    deliveryStart.setDate(today.getDate() + 3);
    const deliveryEnd = new Date(today);
    deliveryEnd.setDate(today.getDate() + 5);

    const formatDate = (date) => {
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    };

    return (
        <div className="order-success-page">
            <Header />
            <div className="success-content-wrapper">
                <main className="success-container">
                    {/* Animated Success Icon */}
                    <div className="success-icon-wrapper">
                        <div className="success-icon-circle">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="success-title">Đặt hàng thành công!</h1>
                    <p className="success-message">
                        Cảm ơn bạn đã tin tưởng và mua sắm tại UN1.<br />
                        Đơn hàng của bạn đang được hệ thống xử lý.
                    </p>

                    <div className="order-info-card">
                        <div className="order-info-row">
                            <span className="info-label">Mã đơn hàng:</span>
                            <span className="info-value order-id">{displayOrderNumber}</span>
                        </div>
                        <div className="order-info-row">
                            <span className="info-label">Dự kiến giao hàng:</span>
                            <span className="info-value date">{formatDate(deliveryStart)} - {formatDate(deliveryEnd)}</span>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="order-timeline">
                        <div className="timeline-step active">
                            <div className="step-icon">✓</div>
                            <span className="step-label">Đã đặt hàng</span>
                        </div>
                        <div className="timeline-line active"></div>
                        <div className="timeline-step">
                            <div className="step-icon">2</div>
                            <span className="step-label">Đang xử lý</span>
                        </div>
                        <div className="timeline-line"></div>
                        <div className="timeline-step">
                            <div className="step-icon">3</div>
                            <span className="step-label">Đang giao</span>
                        </div>
                        <div className="timeline-line"></div>
                        <div className="timeline-step">
                            <div className="step-icon">4</div>
                            <span className="step-label">Đã giao</span>
                        </div>
                    </div>

                    {/* Membership Promo */}
                    <div className="membership-promo">
                        <div className="promo-content">
                            <h3>Tham gia UN1 Club</h3>
                            <p>Tích điểm và nhận ưu đãi độc quyền cho thành viên.</p>
                            <Link to="/auth-register" className="btn-join-club">Đăng ký ngay</Link>
                        </div>
                    </div>

                    <div className="success-actions">
                        <Link to="/orders" className="btn-view-order">
                            Xem đơn hàng
                        </Link>
                        <Link to="/" className="btn-continue-shopping">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default OrderSuccess;
