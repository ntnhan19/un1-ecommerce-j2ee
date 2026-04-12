import axiosInstance from '../api/axiosInstance';

const categoryService = {
    getAllCategories: async () => {
        try {
            const response = await axiosInstance.get('/api/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error.response?.data || new Error('Không thể tải danh sách danh mục');
        }
    },

    getCategoryById: async (id) => {
        try {
            const response = await axiosInstance.get(`/api/categories/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Không tìm thấy thông tin danh mục');
        }
    },

    saveCategory: async (categoryData) => {
        try {
            if (categoryData.id) {
                const response = await axiosInstance.put(`/api/categories/${categoryData.id}`, categoryData);
                return response.data;
            } else {
                const response = await axiosInstance.post('/api/categories', categoryData);
                return response.data;
            }
        } catch (error) {
            throw error.response?.data || new Error('Không thể lưu danh mục');
        }
    },

    deleteCategory: async (id) => {
        try {
            await axiosInstance.delete(`/api/categories/${id}`);
        } catch (error) {
            throw error.response?.data || new Error('Xóa danh mục thất bại');
        }
    }
};

export default categoryService;