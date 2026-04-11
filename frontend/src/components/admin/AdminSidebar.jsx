import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/Admin.css';

const navItems = [
    { path: '/admin', label: 'Tổng quan', icon: '', exact: true },
    { path: '/admin/products', label: 'Sản phẩm', icon: '' },
    { path: '/admin/collections', label: 'Bộ sưu tập', icon: '' },
    { path: '/admin/orders', label: 'Đơn hàng', icon: '' },
];

const AdminSidebar = () => {
    const location = useLocation();

    const isActive = (item) => {
        if (item.exact) return location.pathname === item.path;
        return location.pathname.startsWith(item.path);
    };

    return (
        <aside className="admin-sidebar">
            {/* Logo */}
            <div className="admin-sidebar-logo">
                <img src="/un1-logo.png" alt="UN1" />
                <span className="admin-sidebar-label">Admin Panel</span>
            </div>

            {/* Navigation */}
            <nav className="admin-sidebar-nav">
                <div className="admin-nav-section">Quản lý</div>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`admin-nav-item ${isActive(item) ? 'active' : ''}`}
                    >
                        <span className="admin-nav-icon">{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="admin-sidebar-footer">
                <Link to="/" className="admin-back-btn">
                    ← Về trang chủ
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
