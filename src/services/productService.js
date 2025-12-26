import api from './api';

export const productService = {
    // Get all products
    getProducts: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await api.get(`/products${queryString ? `?${queryString}` : ''}`);
    },

    // Get single product
    getProduct: async (id) => {
        return await api.get(`/products/${id}`);
    },

    // Get featured products
    getFeaturedProducts: async () => {
        return await api.get('/products?isFeatured=true');
    },

    // Create product (admin)
    createProduct: async (productData) => {
        return await api.post('/products', productData);
    },

    // Update product (admin)
    updateProduct: async (id, productData) => {
        return await api.put(`/products/${id}`, productData);
    },

    // Delete product (admin)
    deleteProduct: async (id) => {
        return await api.delete(`/products/${id}`);
    },
};
