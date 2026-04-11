import React, { useState } from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import { Icons } from '../../pages/orders/orderConstants';
import ReturnModal from './ReturnModal';

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN');
  const formatCurrency = (a) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a);

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="order-card-info">
          <Icons.Package />
          <div>
            <h3 className="order-number">{order.orderNumber}</h3>
            <p className="order-date">{formatDate(order.date)}</p>
          </div>
        </div>
        <div className="order-card-actions">
          <OrderStatusBadge status={order.status} />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
          >
            <Icons.ChevronRight />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="order-card-details">
          {/* Order Info Grid */}
          <div className="order-info-grid">
            <div className="info-item">
              <span className="info-label">Mã đơn hàng:</span>
              <span className="info-value">{order.orderNumber}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Ngày đặt:</span>
              <span className="info-value">{formatDate(order.date)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Khách hàng:</span>
              <span className="info-value">{order.customerName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{order.customerEmail}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Số điện thoại:</span>
              <span className="info-value">{order.customerPhone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Địa chỉ giao hàng:</span>
              <span className="info-value">{order.shippingAddress}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mã vận đơn:</span>
              <span className="info-value tracking-number-value">{order.trackingNumber}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tổng tiền:</span>
              <span className="info-value total-amount-value">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>

          {/* Items Section */}
          <div className="order-items-section">
            <h3 className="order-items-title">Sản phẩm đã đặt</h3>
            {order.items.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} className="order-item-image" />
                <div className="order-item-info">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-attributes">
                    {item.color && <span className="order-item-attr">Màu: <strong>{item.color}</strong></span>}
                    {item.size && <span className="order-item-attr">Size: <strong>{item.size}</strong></span>}
                  </div>
                  <div className="order-item-quantity">{item.quantity}</div>
                  <div className="order-item-price">{formatCurrency(item.price)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tracking Button */}
          <div className="tracking-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={`https://spx.vn/tracking?id=${order.trackingNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-track-shipping"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Tra cứu vận chuyển chi tiết
            </a>

            {['completed', 'completed', 'DELIVERED', 'COMPLETED'].includes(order.status) && (
              <button
                className="btn-return-order"
                onClick={() => setShowReturnModal(true)}
                style={{ padding: '0.75rem 1.5rem', background: '#fff', border: '1px solid #333', color: '#333', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Yêu cầu Đổi / Trả hàng
              </button>
            )}
          </div>
        </div>
      )}

      {showReturnModal && (
        <ReturnModal
          order={order}
          onClose={() => setShowReturnModal(false)}
          onSubmit={(data) => {
            console.log("Return request:", data);
            alert("Yêu cầu của bạn đã được gửi thành công!");
            setShowReturnModal(false);
          }}
        />
      )}
    </div>
  );
};

export default OrderCard;
