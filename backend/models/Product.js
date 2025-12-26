import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            trim: true,
            maxlength: [100, 'Product name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a product description'],
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a product price'],
            min: [0, 'Price cannot be negative'],
        },
        originalPrice: {
            type: Number,
            min: [0, 'Original price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a product category'],
            enum: ['men', 'women', 'accessories', 'shoes', 'bags', 'other'],
        },
        subcategory: {
            type: String,
            trim: true,
        },
        brand: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Please provide a product image'],
        },
        images: [
            {
                type: String,
            },
        ],
        stock: {
            type: Number,
            required: [true, 'Please provide stock quantity'],
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        sizes: [
            {
                type: String,
                enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            },
        ],
        colors: [
            {
                type: String,
            },
        ],
        rating: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot be more than 5'],
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        label: {
            type: String,
            enum: ['new', 'sale', 'hot', ''],
            default: '',
        },
        discount: {
            type: Number,
            min: [0, 'Discount cannot be negative'],
            max: [100, 'Discount cannot exceed 100%'],
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes for better query performance
productSchema.index({ name: 'text', description: 'text' }); // Text search
productSchema.index({ category: 1, price: 1 }); // Category + price filtering
productSchema.index({ createdAt: -1 }); // Sort by newest first
productSchema.index({ isFeatured: 1 }); // Featured products
productSchema.index({ isActive: 1 }); // Active products filter
productSchema.index({ category: 1, isFeatured: 1 }); // Category + featured combo

const Product = mongoose.model('Product', productSchema);

export default Product;
