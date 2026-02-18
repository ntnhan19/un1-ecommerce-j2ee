import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ProductsTable from '../../components/admin/ProductsTable';
import '../../styles/components/Admin.css';

const AdminProducts = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                <AdminHeader title="Quản lý sản phẩm" />
                <div className="admin-content">
                    <div className="admin-page-header">
                        <div>
                            <h2 className="admin-page-title">Sản phẩm</h2>
                            <p className="admin-page-subtitle">Quản lý toàn bộ danh mục sản phẩm của cửa hàng.</p>
                        </div>
                    </div>
                    <ProductsTable />
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
