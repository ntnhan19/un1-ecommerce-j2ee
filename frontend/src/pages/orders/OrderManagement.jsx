import React, { useState, useMemo } from 'react';
import { MOCK_ORDERS } from './orderConstants';
import { OrderStatus } from './orderTypes';
import OrderFilter from '../../components/orders/OrderFilter';
import OrderCard from '../../components/orders/OrderCard';
import EmptyState from '../../components/orders/EmptyState';

const ITEMS_PER_PAGE = 3;

const OrderManagement = () => {
  const [filters, setFilters] = useState({
    status: 'ALL',
    timeRange: 'ALL',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((order) => {
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
  }, [filters, searchQuery]);

  const displayedOrders = filteredOrders.slice(0, visibleCount);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">G</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">Gemini Mart</h1>
              <p className="text-xs text-gray-500">Order Management</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử đơn hàng</h2>
          <p className="text-gray-600 text-sm">Theo dõi và quản lý các giao dịch của bạn.</p>
        </div>

        <OrderFilter
          filters={filters}
          onFilterChange={setFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="space-y-4">
          {displayedOrders.length > 0 ? (
            <>
              {displayedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
              {visibleCount < filteredOrders.length && (
                <div className="pt-6 text-center">
                  <button
                    onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                  >
                    Tải thêm đơn hàng
                  </button>
                </div>
              )}
            </>
          ) : <EmptyState />}
        </div>
      </main>
    </div>
  );
};

export default OrderManagement;
