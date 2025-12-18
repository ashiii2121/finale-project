import { body, param, query, validationResult } from 'express-validator';

// Validation error handler
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};

// User registration validation
export const registerValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    validate,
];

// User login validation
export const loginValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('password').notEmpty().withMessage('Password is required'),

    validate,
];

// Update profile validation
export const updateProfileValidation = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('phone')
        .optional()
        .trim()
        .matches(/^[\d\s\-\+\(\)]+$/)
        .withMessage('Please provide a valid phone number'),

    validate,
];

// Product validation
export const productValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ max: 100 })
        .withMessage('Product name cannot exceed 100 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ max: 2000 })
        .withMessage('Description cannot exceed 2000 characters'),

    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .isIn(['men', 'women', 'accessories', 'shoes', 'bags', 'other'])
        .withMessage('Invalid category'),

    body('stock')
        .notEmpty()
        .withMessage('Stock is required')
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),

    body('image').notEmpty().withMessage('Product image is required'),

    validate,
];

// Order validation
export const orderValidation = [
    body('orderItems')
        .isArray({ min: 1 })
        .withMessage('Order must contain at least one item'),

    body('orderItems.*.product')
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Invalid product ID'),

    body('orderItems.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be at least 1'),

    body('shippingAddress.street')
        .trim()
        .notEmpty()
        .withMessage('Street address is required'),

    body('shippingAddress.city')
        .trim()
        .notEmpty()
        .withMessage('City is required'),

    body('shippingAddress.state')
        .trim()
        .notEmpty()
        .withMessage('State is required'),

    body('shippingAddress.zipCode')
        .trim()
        .notEmpty()
        .withMessage('Zip code is required')
        .matches(/^[\d\-\s]+$/)
        .withMessage('Invalid zip code format'),

    body('shippingAddress.country')
        .trim()
        .notEmpty()
        .withMessage('Country is required'),

    body('paymentMethod')
        .notEmpty()
        .withMessage('Payment method is required')
        .isIn(['card', 'paypal', 'cod'])
        .withMessage('Invalid payment method'),

    validate,
];

// MongoDB ID validation
export const mongoIdValidation = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    validate,
];

// Pagination validation
export const paginationValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),

    validate,
];
