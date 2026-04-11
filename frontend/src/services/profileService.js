import axiosInstance from '../api/axiosInstance';

const profileService = {
  getProfile: async () => {
    const response = await axiosInstance.get('/api/users/me');
    return response.data;
  },

  updateProfile: async (payload) => {
    const response = await axiosInstance.put('/api/users/me', payload);
    return response.data;
  },

  changePassword: async (payload) => {
    const response = await axiosInstance.put('/api/users/me/password', payload);
    return response.data;
  },

  getAddresses: async () => {
    const response = await axiosInstance.get('/api/users/me/addresses');
    return response.data;
  },

  createAddress: async (payload) => {
    const response = await axiosInstance.post('/api/users/me/addresses', payload);
    return response.data;
  },

  updateAddress: async (addressId, payload) => {
    const response = await axiosInstance.put(`/api/users/me/addresses/${addressId}`, payload);
    return response.data;
  },

  deleteAddress: async (addressId) => {
    const response = await axiosInstance.delete(`/api/users/me/addresses/${addressId}`);
    return response.data;
  },

  setDefaultAddress: async (addressId) => {
    const response = await axiosInstance.patch(`/api/users/me/addresses/${addressId}/default`);
    return response.data;
  }
};

export default profileService;
