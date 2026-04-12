import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dashboardService from '../../services/dashboardService';
import { formatCurrency, getStatusLabel } from '../../utils/formatters';
import '../../styles/components/Admin.css';

const StatCard = ({ label, value, growth, iconClass }) => {
    const isPositive = growth >= 0;
    return (
        <div className="stat-card">
            <div className="stat-card-info">
                <span className="stat-label">{label}</span>
                <span className="stat-value">{value}</span>
                <span className={`stat-growth ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(growth || 0)}% so với tháng trước
                </span>
            </div>
        </div>
    );
};

const RevenueChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="admin-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
                <span style={{ color: '#888' }}>Chưa có dữ liệu biểu đồ doanh thu</span>
            </div>
        );
    }

    const maxRevenue = Math.max(...data.map((d) => d.revenue));

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <span className="admin-card-title">Doanh thu 6 tháng gần nhất</span>
                <span className="admin-card-action">Xem chi tiết →</span>
            </div>
            <div className="chart-container">
                <div className="chart-bars">
                    {data.map((d) => {
                        const heightPct = maxRevenue === 0 ? 0 : (d.revenue / maxRevenue) * 100;
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

const RecentOrders = ({ orders }) => {
    if (!orders || orders.length === 0) return null;

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
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td style={{ fontWeight: 600, color: '#333', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                                    {order.id}
                                </td>
                                <td>
                                    <div style={{ fontWeight: 500, color: '#333' }}>{order.customer}</div>
                                    <div className="admin-table-sub">{order.email}</div>
                                </td>
                                <td style={{ color: '#666', fontSize: '0.82rem' }}>{order.date || order.createdAt}</td>
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

const TopProducts = ({ products }) => {
    const rankClasses = ['gold', 'silver', 'bronze', '', ''];

    if (!products || products.length === 0) {
        return (
            <div className="admin-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#888' }}>Chưa có dữ liệu sản phẩm bán chạy</span>
            </div>
        );
    }

    return (
        <div className="admin-card">
            <div className="admin-card-header">
                <span className="admin-card-title">Top sản phẩm bán chạy</span>
                <Link to="/admin/products" className="admin-card-action">Xem tất cả →</Link>
            </div>
            <div className="top-products-list">
                {products.map((p, i) => (
                    <div key={i} className="top-product-item">
                        <div className={`top-product-rank ${rankClasses[i]}`}>{i + 1}</div>
                        <div className="top-product-info">
                            <div className="top-product-name">{p.name}</div>
                            <div className="top-product-category">{p.categoryName || p.category}</div>
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
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0, revenueGrowth: 0,
        totalOrders: 0, ordersGrowth: 0,
        totalProducts: 0, productsGrowth: 0,
        totalCustomers: 0, customersGrowth: 0
    });
    const [revenueData, setRevenueData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Gọi song song tất cả các API thống kê
                const [statsRes, chartRes, productsRes, ordersRes] = await Promise.all([
                    dashboardService.getOverviewStats(),
                    dashboardService.getRevenueChart(),
                    dashboardService.getTopProducts(),
                    dashboardService.getRecentOrders()
                ]);

                if (statsRes) setStats(statsRes);
                if (chartRes) setRevenueData(chartRes);
                if (productsRes) setTopProducts(productsRes);
                if (ordersRes) setRecentOrders(ordersRes);

            } catch (error) {
                console.error("Lỗi khi fetch data dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>⏳ Đang tải thống kê...</div>;
    }

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
                    value={(stats.totalOrders || 0).toLocaleString('vi-VN')}
                    growth={stats.ordersGrowth}
                    iconClass="orders"
                />
                <StatCard
                    label="Sản phẩm"
                    value={stats.totalProducts || 0}
                    growth={stats.productsGrowth}
                    iconClass="products"
                />
                <StatCard
                    label="Khách hàng"
                    value={(stats.totalCustomers || 0).toLocaleString('vi-VN')}
                    growth={stats.customersGrowth}
                    iconClass="customers"
                />
            </div>

            {/* Chart + Top Products */}
            <div className="admin-dashboard-grid">
                <RevenueChart data={revenueData} />
                <TopProducts products={topProducts} />
            </div>

            {/* Recent Orders */}
            <RecentOrders orders={recentOrders} />
        </div>
    );
};

export default DashboardOverview;