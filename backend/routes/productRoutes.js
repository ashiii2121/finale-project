import express from 'express';
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import {
    productValidation,
    mongoIdValidation,
    paginationValidation,
} from '../middleware/validation.js';
import { searchLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public routes
router.get('/', paginationValidation, searchLimiter, getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', mongoIdValidation, getProduct);

// Admin routes
router.post(
    '/',
    protect,
    authorize('admin'),
    productValidation,
    createProduct
);
router.put(
    '/:id',
    protect,
    authorize('admin'),
    mongoIdValidation,
    updateProduct
);
router.delete(
    '/:id',
    protect,
    authorize('admin'),
    mongoIdValidation,
    deleteProduct
);

export default router;
