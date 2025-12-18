import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Product from './models/Product.js';
import connectDatabase from './config/database.js';

// Load env vars
dotenv.config();

// Sample products data
const products = [
    {
        name: "Women's Summer Dress",
        description: "Elegant summer dress perfect for any occasion. Made with premium cotton blend fabric.",
        price: 49.99,
        originalPrice: 79.99,
        category: "women",
        subcategory: "dresses",
        brand: "Ashion",
        image: "/img/product/product-1.jpg",
        images: ["/img/product/product-1.jpg", "/img/product/product-2.jpg"],
        stock: 50,
        sizes: ["S", "M", "L", "XL"],
        colors: ["red", "blue", "white"],
        rating: 4.5,
        numReviews: 24,
        label: "sale",
        discount: 37,
        isFeatured: true,
    },
    {
        name: "Men's Casual Shirt",
        description: "Comfortable casual shirt for everyday wear. 100% cotton material.",
        price: 39.99,
        originalPrice: 59.99,
        category: "men",
        subcategory: "shirts",
        brand: "Ashion",
        image: "/img/product/product-3.jpg",
        images: ["/img/product/product-3.jpg"],
        stock: 75,
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["blue", "black", "gray"],
        rating: 4.2,
        numReviews: 18,
        label: "new",
        discount: 33,
        isFeatured: true,
    },
    {
        name: "Designer Handbag",
        description: "Luxury designer handbag with premium leather finish.",
        price: 129.99,
        originalPrice: 199.99,
        category: "bags",
        subcategory: "handbags",
        brand: "Ashion Premium",
        image: "/img/product/product-4.jpg",
        images: ["/img/product/product-4.jpg"],
        stock: 30,
        sizes: [],
        colors: ["black", "brown", "tan"],
        rating: 4.8,
        numReviews: 42,
        label: "hot",
        discount: 35,
        isFeatured: true,
    },
    {
        name: "Running Shoes",
        description: "High-performance running shoes with advanced cushioning technology.",
        price: 89.99,
        originalPrice: 129.99,
        category: "shoes",
        subcategory: "athletic",
        brand: "Ashion Sport",
        image: "/img/product/product-5.jpg",
        images: ["/img/product/product-5.jpg"],
        stock: 60,
        sizes: ["7", "8", "9", "10", "11"],
        colors: ["white", "black", "blue"],
        rating: 4.6,
        numReviews: 35,
        label: "new",
        discount: 31,
        isFeatured: false,
    },
    {
        name: "Leather Jacket",
        description: "Classic leather jacket with modern styling. Genuine leather.",
        price: 199.99,
        originalPrice: 299.99,
        category: "men",
        subcategory: "jackets",
        brand: "Ashion Premium",
        image: "/img/product/product-6.jpg",
        images: ["/img/product/product-6.jpg"],
        stock: 25,
        sizes: ["M", "L", "XL"],
        colors: ["black", "brown"],
        rating: 4.9,
        numReviews: 56,
        label: "hot",
        discount: 33,
        isFeatured: true,
    },
    {
        name: "Sunglasses",
        description: "Stylish sunglasses with UV protection. Polarized lenses.",
        price: 59.99,
        originalPrice: 89.99,
        category: "accessories",
        subcategory: "eyewear",
        brand: "Ashion",
        image: "/img/product/product-7.jpg",
        images: ["/img/product/product-7.jpg"],
        stock: 100,
        sizes: [],
        colors: ["black", "tortoise", "gold"],
        rating: 4.3,
        numReviews: 28,
        label: "sale",
        discount: 33,
        isFeatured: false,
    },
    {
        name: "Women's Jeans",
        description: "Comfortable skinny jeans with stretch fabric. Perfect fit.",
        price: 69.99,
        originalPrice: 99.99,
        category: "women",
        subcategory: "jeans",
        brand: "Ashion",
        image: "/img/product/product-8.jpg",
        images: ["/img/product/product-8.jpg"],
        stock: 80,
        sizes: ["26", "28", "30", "32"],
        colors: ["blue", "black", "gray"],
        rating: 4.4,
        numReviews: 31,
        label: "new",
        discount: 30,
        isFeatured: false,
    },
    {
        name: "Watch",
        description: "Elegant wristwatch with stainless steel band. Water resistant.",
        price: 149.99,
        originalPrice: 249.99,
        category: "accessories",
        subcategory: "watches",
        brand: "Ashion Premium",
        image: "/img/product/product-9.jpg",
        images: ["/img/product/product-9.jpg"],
        stock: 40,
        sizes: [],
        colors: ["silver", "gold", "black"],
        rating: 4.7,
        numReviews: 45,
        label: "hot",
        discount: 40,
        isFeatured: true,
    },
];

const seedDatabase = async () => {
    try {
        // Connect to database
        await connectDatabase();

        console.log('🗑️  Clearing existing data...');

        // Clear existing data
        await User.deleteMany();
        await Product.deleteMany();

        console.log('👤 Creating admin user...');

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: process.env.ADMIN_EMAIL || 'admin@ashion.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@123456',
            role: 'admin',
            phone: '+1234567890',
            address: {
                street: '123 Admin Street',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA',
            },
        });

        console.log('✅ Admin user created:', admin.email);

        console.log('👤 Creating test user...');

        // Create test user
        const user = await User.create({
            name: 'Test User',
            email: 'user@test.com',
            password: 'User@123456',
            role: 'user',
            phone: '+1234567891',
            address: {
                street: '456 User Avenue',
                city: 'Los Angeles',
                state: 'CA',
                zipCode: '90001',
                country: 'USA',
            },
        });

        console.log('✅ Test user created:', user.email);

        console.log('📦 Creating products...');

        // Create products
        const createdProducts = await Product.insertMany(products);

        console.log(`✅ ${createdProducts.length} products created`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📝 Login Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Admin:');
        console.log(`  Email: ${admin.email}`);
        console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`);
        console.log('\nTest User:');
        console.log(`  Email: ${user.email}`);
        console.log('  Password: User@123456');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seed function
seedDatabase();
