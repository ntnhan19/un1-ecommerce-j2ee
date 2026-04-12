import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import CollectionsTable from '../../components/admin/CollectionsTable';
import '../../styles/components/Admin.css';

const AdminCollections = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                <AdminHeader title="CONTENT MANAGEMENT" />
                <div className="admin-content" style={{ padding: '2.5rem' }}>
                    <div className="admin-page-header" style={{ marginBottom: '2.5rem' }}>
                        <div>
                            <h2 className="admin-page-title" style={{ fontWeight: '800', letterSpacing: '1px' }}>
                                NEW COLLECTIONS
                            </h2>
                            <p className="admin-page-subtitle" style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#666' }}>
                                Quản lý các bộ sưu tập theo mùa, biểu ngữ truyền thông và Album lookbook trên trang chủ.
                            </p>
                        </div>
                        <div className="admin-header-actions">
                            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#aaa', letterSpacing: '1px' }}>
                                LIVE STATUS: ONLINE
                            </span>
                        </div>
                    </div>

                    <CollectionsTable />
                </div>
            </div>
        </div>
    );
};

export default AdminCollections;
