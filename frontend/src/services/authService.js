import axiosInstance from '../api/axiosInstance';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;
