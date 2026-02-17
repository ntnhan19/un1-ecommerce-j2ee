import React from 'react';
import { Icons } from '../../pages/orders/orderConstants';

const EmptyState = () => {
  return (
    <div className="order-empty-state">
      <div className="empty-icon">
        <Icons.EmptyState />
      </div>
      <h3 className="empty-title">Không tìm thấy đơn hàng</h3>
      <p className="empty-message">
        Bạn chưa có đơn hàng nào khớp với tiêu chí tìm kiếm này.
      </p>
    </div>
  );
};

export default EmptyState;
