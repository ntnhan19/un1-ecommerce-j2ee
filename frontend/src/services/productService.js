import axiosInstance from '../api/axiosInstance';

const productService = {
  getProducts: async (params = {}) => {
    try {
      // Lọc bỏ null/undefined để không gửi param thừa lên server
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v != null)
      );
      const response = await axiosInstance.get('/api/products', { params: cleanParams });
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch products');
    }
  },

  // Thêm mới
  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/api/categories');
      return response.data; // List<CategoryResponse>
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch categories');
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch product details');
    }
  },

  searchProducts: async (keyword, page = 0, size = 10) => {
    try {
      const response = await axiosInstance.get('/api/products', {
        params: { keyword, page, size }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Search failed');
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await axiosInstance.post('/api/products', productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to create product');
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await axiosInstance.put(`/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to update product');
    }
  },

  deleteProduct: async (id) => {
    try {
      await axiosInstance.delete(`/api/products/${id}`);
    } catch (error) {
      throw error.response?.data || new Error('Failed to delete product');
    }
  },

  recommendSize: async (payload) => {
    try {
      const response = await axiosInstance.post('/api/size-recommendations', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to get size recommendation');
    }
  }
};

export default productService;