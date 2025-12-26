import api from './api';

export const orderService = {
    // Create order
    createOrder: async (orderData) => {
        return await api.post('/orders', orderData);
    },

    // Get my orders
    getMyOrders: async () => {
        return await api.get('/orders/myorders');
    },

    // Get order by ID
    getOrder: async (id) => {
        return await api.get(`/orders/${id}`);
    },

    // Update order to paid
    updateOrderToPaid: async (id, paymentResult) => {
        return await api.put(`/orders/${id}/pay`, paymentResult);
    },

    // Get all orders (admin)
    getAllOrders: async () => {
        return await api.get('/orders');
    },

    // Update order to delivered (admin)
    updateOrderToDelivered: async (id) => {
        return await api.put(`/orders/${id}/deliver`);
    },

    // Update order status (admin)
    updateOrderStatus: async (id, status) => {
        return await api.put(`/orders/${id}/status`, { status });
    },
};
