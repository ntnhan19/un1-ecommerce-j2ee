import axiosInstance from '../api/axiosInstance';

const unwrap = (response) => response.data?.data ?? response.data;

const dashboardService = {
    getOverviewStats: async () => {
        try {
            const res = await axiosInstance.get('/api/dashboard/stats');
            return unwrap(res);
        } catch {
            return null;
        }
    },
    getRevenueChart: async () => {
        try {
            const res = await axiosInstance.get('/api/dashboard/revenue-chart');
            return unwrap(res) || [];
        } catch {
            return [];
        }
    },
    getTopProducts: async () => {
        try {
            const res = await axiosInstance.get('/api/dashboard/top-products');
            return unwrap(res) || [];
        } catch {
            return [];
        }
    },
    getRecentOrders: async () => {
        try {
            const res = await axiosInstance.get('/api/dashboard/recent-orders');
            const data = unwrap(res) || [];
            // Map backend fields → frontend fields
            return data.map(o => ({
                ...o,
                total: o.total ?? o.totalAmount,
                date: o.date ?? o.orderDate,
            }));
        } catch {
            return [];
        }
    }
};

export default dashboardService;