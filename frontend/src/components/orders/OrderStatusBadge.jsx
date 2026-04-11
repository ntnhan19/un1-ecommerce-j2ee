import React from 'react';
import { OrderStatus } from '../../pages/orders/orderTypes';

const OrderStatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case OrderStatus.PENDING: return 'status-pending';
      case OrderStatus.SHIPPING: return 'status-shipping';
      case OrderStatus.COMPLETED: return 'status-completed';
      case OrderStatus.CANCELLED: return 'status-cancelled';
      default: return 'status-default';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case OrderStatus.PENDING: return 'Chờ xử lý';
      case OrderStatus.SHIPPING: return 'Đang giao';
      case OrderStatus.COMPLETED: return 'Hoàn thành';
      case OrderStatus.CANCELLED: return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <span className={`order-status-badge ${getStatusClass()}`}>
      {getStatusText()}
    </span>
  );
};

export default OrderStatusBadge;
