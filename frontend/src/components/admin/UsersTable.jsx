import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/components/Admin.css';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axiosInstance.get('/api/admin/users')
            .then(res => {
                // Unwrap ApiResponse wrapper: { success, data: [...] }
                const data = res.data?.data || res.data;
                setUsers(Array.isArray(data) ? data : data?.content || []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = users.filter(u =>
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.fullName?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="admin-loading">Đang tải danh sách người dùng...</div>;

    return (
        <div>
            <div className="admin-toolbar">
                <div className="admin-search">
                    <svg className="admin-search-icon" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        placeholder="Tìm theo tên, email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">Danh sách người dùng</h3>
                    <span className="admin-card-sub">{filtered.length} người dùng</span>
                </div>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Người dùng</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Vai trò</th>
                                <th>Ngày tạo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">👤</div>
                                            <h3>Không có người dùng nào</h3>
                                        </div>
                                    </td>
                                </tr>
                            ) : filtered.map(u => (
                                <tr key={u.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                            <div style={{
                                                width: 34, height: 34, borderRadius: '50%',
                                                background: '#111', color: '#fff',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
                                            }}>
                                                {(u.fullName || u.email || '?').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="admin-table-product-name">
                                                    {u.fullName || '—'}
                                                </div>
                                                <div className="admin-table-sub">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ color: '#2563eb', fontSize: '0.83rem' }}>{u.email}</td>
                                    <td style={{ fontSize: '0.83rem' }}>{u.phone || '—'}</td>
                                    <td>
                                        {(u.roles || []).map(role => (
                                            <span key={role}
                                                className={`status-badge ${role === 'ROLE_ADMIN' ? 'processing' : 'active'}`}
                                                style={{ marginRight: '0.25rem' }}>
                                                {role.replace('ROLE_', '')}
                                            </span>
                                        ))}
                                    </td>
                                    <td style={{ color: '#888', fontSize: '0.8rem' }}>
                                        {u.createdAt
                                            ? new Date(u.createdAt).toLocaleDateString('vi-VN')
                                            : '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="admin-pagination">
                    <span className="admin-pagination-info">{filtered.length} / {users.length} người dùng</span>
                </div>
            </div>
        </div>
    );
};

export default UsersTable;