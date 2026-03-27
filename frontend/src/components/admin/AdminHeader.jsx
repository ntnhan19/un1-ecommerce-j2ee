import React from 'react';
import '../../styles/components/Admin.css';

const AdminHeader = ({ title }) => {
    return (
        <header className="admin-header">
            <h1 className="admin-header-title">{title}</h1>
            <div className="admin-header-right">
                <span className="admin-header-name">Admin</span>
                <div className="admin-header-avatar">AD</div>
            </div>
        </header>
    );
};

export default AdminHeader;
