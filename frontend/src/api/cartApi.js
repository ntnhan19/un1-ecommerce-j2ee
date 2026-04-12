// src/api/cartApi.js
import axiosInstance from './axiosInstance';

export const cartApi = {
    getCart: () =>
        axiosInstance.get('/api/cart'),

    addItem: (productId, quantity, size, color) =>
        axiosInstance.post('/api/cart/items', { productId, quantity, size, color }),

    updateItem: (itemId, quantity, size, color) =>
        axiosInstance.put(`/api/cart/items/${itemId}`, { quantity, size, color }),

    removeItem: (itemId) =>
        axiosInstance.delete(`/api/cart/items/${itemId}`),

    clearCart: () =>
        axiosInstance.delete('/api/cart'),
};