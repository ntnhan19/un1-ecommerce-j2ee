import React from 'react';
import { OrderStatus } from '../../pages/orders/orderTypes';
import { Icons } from '../../pages/orders/orderConstants';

const OrderFilter = ({ filters, onFilterChange, searchQuery, onSearchChange }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Icons.Search />
        </div>
        <input
          type="text"
          placeholder="Tìm theo mã đơn hàng..."
          className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50 text-sm"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full md:w-48">
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-sm cursor-pointer outline-none"
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
