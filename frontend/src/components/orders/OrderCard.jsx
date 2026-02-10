import React, { useState } from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import { Icons } from '../../pages/orders/orderConstants';

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formatDate = (d) => new Date(d).toLocaleDateString('vi-VN');
  const formatCurrency = (a) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(a);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Icons.Package />
          <div>
            <h3 className="text-sm font-bold text-gray-900">{order.orderNumber}</h3>
            <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <button onClick={() => setIsExpanded(!isExpanded)} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
            <Icons.ChevronRight />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="px-6 py-4 animate-in fade-in duration-300">
          <div className="text-sm font-bold text-gray-900 mb-2">Chi tiết sản phẩm</div>
          {order.items.map(item => (
            <div key={item.id} className="flex gap-4 py-3 border-b border-gray-50 last:border-0">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-gray-100" />
              <div className="flex-1 text-sm">
                <div className="font-semibold text-gray-800">{item.name}</div>
                <div className="text-gray-500">{item.quantity} x {formatCurrency(item.price)}</div>
              </div>
            </div>
          ))}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="text-xs text-gray-400 font-bold uppercase mb-1">Địa chỉ giao hàng:</div>
            <div className="text-xs text-gray-700">{order.shippingAddress}</div>
          </div>
          <div className="mt-4 text-right">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Tổng thanh toán: </span>
            <span className="text-xl font-bold text-blue-600">{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
