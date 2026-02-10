import React from 'react';
import { OrderStatus } from '../../pages/orders/orderTypes';

const OrderStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-amber-100 text-amber-700 border-amber-200';
      case OrderStatus.SHIPPING: return 'bg-blue-100 text-blue-700 border-blue-200';
      case OrderStatus.COMPLETED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case OrderStatus.CANCELLED: return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles()}`}>
      {getStatusText()}
    </span>
  );
};

export default OrderStatusBadge;
