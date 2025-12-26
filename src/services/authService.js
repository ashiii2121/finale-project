import api from './api';

export const authService = {
    // Register user
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    },

    // Login user
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    },

    // Admin login
    adminLogin: async (credentials) => {
        const response = await api.post('/auth/admin/login', credentials);
        if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    },

    // Logout
    logout: async () => {
        try {
            await api.get('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.user;
    },

    // Update profile
    updateProfile: async (userData) => {
        const response = await api.put('/auth/profile', userData);
        if (response.success) {
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    },

    // Update password
    updatePassword: async (passwords) => {
        return await api.put('/auth/password', passwords);
    },

    // Forgot password
    forgotPassword: async (email) => {
        return await api.post('/auth/forgot-password', { email });
    },

    // Reset password
    resetPassword: async (token, password) => {
        return await api.post(`/auth/reset-password/${token}`, { password });
    },
};
