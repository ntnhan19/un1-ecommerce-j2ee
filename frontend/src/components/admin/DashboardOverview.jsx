import React from 'react';
import { Link } from 'react-router-dom';
import {
    mockDashboardStats,
    mockRevenueData,
    mockOrders,
    mockTopProducts,
    formatCurrency,
    getStatusLabel,
} from '../../utils/mockAdmin';
import '../../styles/components/Admin.css';

const StatCard = ({ label, value, growth, icon, iconClass }) => {
    const isPositive = growth >= 0;
    return (
        <div className="stat-card">
            <div className="stat-card-info">
                <span className="stat-label">{label}</span>
                <span className="stat-value">{value}</span>
                <span className={`stat-growth ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(growth)}% so với tháng trước
                </span>
            </div>

        </div>
    );
};

const RevenueChart = () => {
    const maxRevenue = Math.max(...mockRevenueData.map((d) => d.revenue));

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <span className="admin-card-title">Doanh thu 6 tháng gần nhất</span>
                <span className="admin-card-action">Xem chi tiết →</span>
            </div>
            <div className="chart-container">
                <div className="chart-bars">
                    {mockRevenueData.map((d) => {
                        const heightPct = (d.revenue / maxRevenue) * 100;
                        return (
                            <div key={d.month} className="chart-bar-group">
                                <div
                                    className="chart-bar"
                                    style={{ height: `${heightPct}%` }}
                                >
                                    <div className="chart-bar-tooltip">
                                        {formatCurrency(d.revenue)}<br />{d.orders} đơn
                                    </div>
                                </div>
                                <span className="chart-bar-label">{d.month}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const RecentOrders = () => {
    const recent = mockOrders.slice(0, 5);
    return (
        <div className="admin-card" style={{ marginTop: '1.5rem' }}>
            <div className="admin-card-header">
                <span className="admin-card-title">Đơn hàng gần nhất</span>
                <Link to="/admin/orders" className="admin-card-action">Xem tất cả →</Link>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Ngày</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recent.map((order) => (
                            <tr key={order.id}>
                                <td style={{ fontWeight: 600, color: '#333', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                                    {order.id}
                                </td>
                                <td>
                                    <div style={{ fontWeight: 500, color: '#333' }}>{order.customer}</div>
                                    <div className="admin-table-sub">{order.email}</div>
                                </td>
                                <td style={{ color: '#666', fontSize: '0.82rem' }}>{order.date}</td>
                                <td style={{ fontWeight: 600, color: '#333' }}>{formatCurrency(order.total)}</td>
                                <td>
                                    <span className={`status-badge ${order.status}`}>
                                        {getStatusLabel(order.status)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TopProducts = () => {
    const rankClasses = ['gold', 'silver', 'bronze', '', ''];
    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <span className="admin-card-title">Top sản phẩm bán chạy</span>
                <Link to="/admin/products" className="admin-card-action">Xem tất cả →</Link>
            </div>
            <div className="top-products-list">
                {mockTopProducts.map((p, i) => (
                    <div key={i} className="top-product-item">
                        <div className={`top-product-rank ${rankClasses[i]}`}>{i + 1}</div>
                        <div className="top-product-info">
                            <div className="top-product-name">{p.name}</div>
                            <div className="top-product-category">{p.category}</div>
                        </div>
                        <div className="top-product-stats">
                            <div className="top-product-sold">{p.sold} đã bán</div>
                            <div className="top-product-revenue">{formatCurrency(p.revenue)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DashboardOverview = () => {
    const stats = mockDashboardStats;

    return (
        <div>
            {/* Stat Cards */}
            <div className="admin-stats-grid">
                <StatCard
                    label="Tổng doanh thu"
                    value={formatCurrency(stats.totalRevenue)}
                    growth={stats.revenueGrowth}

                    iconClass="revenue"
                />
                <StatCard
                    label="Tổng đơn hàng"
                    value={stats.totalOrders.toLocaleString('vi-VN')}
                    growth={stats.ordersGrowth}

                    iconClass="orders"
                />
                <StatCard
                    label="Sản phẩm"
                    value={stats.totalProducts}
                    growth={stats.productsGrowth}

                    iconClass="products"
                />
                <StatCard
                    label="Khách hàng"
                    value={stats.totalCustomers.toLocaleString('vi-VN')}
                    growth={stats.customersGrowth}
                    icon="" iconClass="customers"
                />
            </div>

            {/* Chart + Top Products */}
            <div className="admin-dashboard-grid">
                <RevenueChart />
                <TopProducts />
            </div>

            {/* Recent Orders */}
            <RecentOrders />
        </div>
    );
};

export default DashboardOverview;
