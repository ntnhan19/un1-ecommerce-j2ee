import axiosInstance from '../api/axiosInstance';

const orderService = {
    getOrders: async (params = {}) => {
        try {
            const response = await axiosInstance.get('/api/orders', { params });
            return response.data?.data || response.data;
        } catch (error) {
            throw error.response?.data || new Error('Không thể tải đơn hàng');
        }
    },
    updateOrderStatus: async (id, status) => {
        try {
            const response = await axiosInstance.patch(`/api/orders/${id}/status`, { status });
            return response.data?.data || response.data;
        } catch (error) {
            throw error.response?.data || new Error('Cập nhật trạng thái thất bại');
        }
    }
};

export default orderService;