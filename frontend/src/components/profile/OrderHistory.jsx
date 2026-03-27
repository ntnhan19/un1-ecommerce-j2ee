import React from 'react';
import { useOrder } from '../../hooks/useOrder';
import OrderCard from '../orders/OrderCard';

const OrderHistory = () => {
    const { orders } = useOrder();

    return (
        <div className="order-history-section">
            <div className="section-header">
                <h2>Lịch sử đơn hàng</h2>
                <p className="section-subtitle">Tổng số đơn hàng: {orders.length}</p>
            </div>

            {orders.length > 0 ? (
                <div className="order-list">
                    {orders.map(order => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h3>Chưa có đơn hàng nào</h3>
                    <p>Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!</p>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
