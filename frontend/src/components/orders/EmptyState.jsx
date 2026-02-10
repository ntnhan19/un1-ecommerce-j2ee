import React from 'react';
import { Icons } from '../../pages/orders/orderConstants';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
      <div className="mb-6 p-6 bg-gray-50 rounded-full text-gray-300">
        <Icons.EmptyState />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy đơn hàng</h3>
      <p className="text-gray-500 text-center max-w-sm px-6 text-sm leading-relaxed">
        Bạn chưa có đơn hàng nào khớp với tiêu chí tìm kiếm này.
      </p>
    </div>
  );
};

export default EmptyState;
