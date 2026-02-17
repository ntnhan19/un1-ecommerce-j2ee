import React from 'react';
import { OrderStatus } from '../../pages/orders/orderTypes';
import { Icons } from '../../pages/orders/orderConstants';

const OrderFilter = ({ filters, onFilterChange, searchQuery, onSearchChange }) => {
  return (
    <div className="order-filter">
      <div className="search-container">
        <div className="search-icon">
          <Icons.Search />
        </div>
        <input
          type="text"
          placeholder="Tìm theo mã đơn hàng..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="filter-select-container">
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="filter-select"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value={OrderStatus.PENDING}>Chờ xử lý</option>
          <option value={OrderStatus.SHIPPING}>Đang giao</option>
          <option value={OrderStatus.COMPLETED}>Hoàn thành</option>
          <option value={OrderStatus.CANCELLED}>Đã hủy</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFilter;
