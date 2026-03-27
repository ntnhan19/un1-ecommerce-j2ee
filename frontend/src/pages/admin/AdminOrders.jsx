import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import OrdersTable from '../../components/admin/OrdersTable';
import '../../styles/components/Admin.css';

const AdminOrders = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                <AdminHeader title="Quản lý đơn hàng" />
                <div className="admin-content">
                    <div className="admin-page-header">
                        <div>
                            <h2 className="admin-page-title">Đơn hàng</h2>
                            <p className="admin-page-subtitle">Xem và cập nhật trạng thái tất cả đơn hàng.</p>
                        </div>
                    </div>
                    <OrdersTable />
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
