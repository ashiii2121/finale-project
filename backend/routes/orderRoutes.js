import express from 'express';
import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    getAllOrders,
    updateOrderToDelivered,
    updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';
import { orderValidation, mongoIdValidation } from '../middleware/validation.js';
import { orderLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// User routes
router.post('/', protect, orderLimiter, orderValidation, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, mongoIdValidation, getOrderById);
router.put('/:id/pay', protect, mongoIdValidation, updateOrderToPaid);

// Admin routes
router.get('/', protect, authorize('admin'), getAllOrders);
router.put(
    '/:id/deliver',
    protect,
    authorize('admin'),
    mongoIdValidation,
    updateOrderToDelivered
);
router.put(
    '/:id/status',
    protect,
    authorize('admin'),
    mongoIdValidation,
    updateOrderStatus
);

export default router;
