import axiosInstance from '../api/axiosInstance';

const productService = {
  getProducts: async (params = {}) => {
    try {
      // Mapping categories 'nam' and 'nu' to IDs if needed, but for now we'll pass them directly
      // Or assuming category names map directly to the backend category search
      const response = await axiosInstance.get('/api/products', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch products');
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
      const params = { keyword, page, size };
      const response = await axiosInstance.get('/api/products', { params });
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
  }
};

export default productService;
