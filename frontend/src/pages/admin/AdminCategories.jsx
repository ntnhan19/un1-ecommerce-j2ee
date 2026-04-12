import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import CategoriesTable from '../../components/admin/CategoriesTable';
import '../../styles/components/Admin.css';

const AdminCategories = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                <AdminHeader title="Quản lý danh mục" />
                <div className="admin-content">
                    <div className="admin-page-header">
                        <div>
                            <h2 className="admin-page-title">Danh mục</h2>
                            <p className="admin-page-subtitle">Thêm, sửa, xóa các danh mục phân loại sản phẩm.</p>
                        </div>
                    </div>
                    <CategoriesTable />
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;