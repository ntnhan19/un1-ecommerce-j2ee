import React, { useState, useMemo } from 'react';
import Header from '../../components/common/Header';
import { useOrder } from '../../hooks/useOrder';
import { OrderStatus } from './orderTypes';
import OrderFilter from '../../components/orders/OrderFilter';
import OrderCard from '../../components/orders/OrderCard';
import EmptyState from '../../components/orders/EmptyState';
import '../../styles/components/OrderManagement.css';

const ITEMS_PER_PAGE = 3;

const OrderManagement = () => {
  const { orders } = useOrder();
  const [filters, setFilters] = useState({
    status: 'ALL',
    timeRange: 'ALL',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filters.status !== 'ALL' && order.status !== filters.status) return false;
      if (searchQuery && !order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.timeRange !== 'ALL') {
        const orderDate = new Date(order.date).getTime();
        const now = new Date().getTime();
        const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);
        if (filters.timeRange === '7days' && diffDays > 7) return false;
        if (filters.timeRange === '30days' && diffDays > 30) return false;
        if (filters.timeRange === '6months' && diffDays > 180) return false;
      }
      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders, filters, searchQuery]);

  const displayedOrders = filteredOrders.slice(0, visibleCount);

  return (
    <div className="order-management-page">
      <Header />

      <div className="order-management-container">
        <div className="order-title-bar">
          <h1>LỊCH SỬ ĐƠN HÀNG</h1>
          <p className="order-subtitle">Theo dõi và quản lý các đơn hàng của bạn</p>
        </div>

        <div className="order-content">
          <OrderFilter
            filters={filters}
            onFilterChange={setFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="order-list">
            {displayedOrders.length > 0 ? (
              <>
                {displayedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
                {visibleCount < filteredOrders.length && (
                  <div className="load-more-container">
                    <button
                      onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                      className="btn-load-more"
                    >
                      Tải thêm đơn hàng
                    </button>
                  </div>
                )}
              </>
            ) : <EmptyState />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
