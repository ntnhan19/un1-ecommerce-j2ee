import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import DashboardOverview from '../../components/admin/DashboardOverview';
import '../../styles/components/Admin.css';

const AdminDashboard = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                <AdminHeader title="Tổng quan" />
                <div className="admin-content">
                    <div className="admin-page-header">
                        <div>
                            <h2 className="admin-page-title">Dashboard</h2>
                            <p className="admin-page-subtitle">Chào mừng trở lại! Đây là tổng quan hoạt động của cửa hàng.</p>
                        </div>
                    </div>
                    <DashboardOverview />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
