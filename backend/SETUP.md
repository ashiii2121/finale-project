# 🚀 Backend Setup Guide

Complete guide to set up and run the React Ashion Backend API.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js

## 🔧 Step-by-Step Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Express.js (web framework)
- Mongoose (MongoDB ODM)
- JWT (authentication)
- bcrypt (password hashing)
- Security packages (helmet, cors, rate-limit, etc.)

### 3. Set Up MongoDB

#### Option A: Local MongoDB

1. **Install MongoDB** from [mongodb.com](https://www.mongodb.com/try/download/community)

2. **Start MongoDB service:**

   **Windows:**
   ```bash
   # Start MongoDB as a service (run as Administrator)
   net start MongoDB
   
   # Or run mongod directly
   mongod --dbpath "C:\data\db"
   ```

   **macOS:**
   ```bash
   brew services start mongodb-community
   ```

   **Linux:**
   ```bash
   sudo systemctl start mongod
   ```

3. **Verify MongoDB is running:**
   ```bash
   mongosh
   # or
   mongo
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `.env` file with your connection string

### 4. Configure Environment Variables

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file with your settings:**

   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000

   # Database Configuration
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/react-ashion
   
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/react-ashion

   # JWT Configuration (CHANGE THIS!)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
   JWT_EXPIRE=7d
   JWT_COOKIE_EXPIRE=7

   # CORS Configuration
   CLIENT_URL=http://localhost:5173
   ADMIN_URL=http://localhost:5173/admin

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # Admin Configuration
   ADMIN_EMAIL=admin@ashion.com
   ADMIN_PASSWORD=Admin@123456
   ```

   **⚠️ IMPORTANT:** 
   - Change `JWT_SECRET` to a strong random string (minimum 32 characters)
   - In production, use strong passwords and keep `.env` file secure
   - Never commit `.env` file to version control

### 5. Seed the Database (Optional but Recommended)

Populate the database with initial data (admin user, test user, and sample products):

```bash
npm run seed
```

This will create:
- **Admin User:** admin@ashion.com / Admin@123456
- **Test User:** user@test.com / User@123456
- **8 Sample Products** in various categories

### 6. Start the Server

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

### 7. Verify Installation

Test the API health endpoint:

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-18T10:00:00.000Z"
}
```

## 🧪 Testing the API

### Test Authentication

1. **Register a new user:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "password": "Password123"
     }'
   ```

2. **Login:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "Password123"
     }'
   ```

3. **Admin Login:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/admin/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@ashion.com",
       "password": "Admin@123456"
     }'
   ```

### Test Products

```bash
# Get all products
curl http://localhost:5000/api/products

# Get featured products
curl http://localhost:5000/api/products/featured

# Search products
curl "http://localhost:5000/api/products?search=dress&category=women"
```

## 🔒 Security Features Implemented

✅ **JWT Authentication** - Secure token-based authentication  
✅ **httpOnly Cookies** - Prevents XSS attacks  
✅ **Password Hashing** - bcrypt with salt rounds  
✅ **Rate Limiting** - Prevents brute force attacks  
✅ **Input Validation** - express-validator for all inputs  
✅ **Sanitization** - Prevents MongoDB injection and XSS  
✅ **CORS** - Configured for specific origins  
✅ **Helmet** - Security headers  
✅ **Environment Variables** - Sensitive data protection  

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product CRUD
│   └── orderController.js   # Order management
├── middleware/
│   ├── auth.js             # JWT verification
│   ├── validation.js       # Input validation
│   ├── rateLimiter.js      # Rate limiting
│   └── errorHandler.js     # Error handling
├── models/
│   ├── User.js             # User schema
│   ├── Product.js          # Product schema
│   └── Order.js            # Order schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── productRoutes.js    # Product endpoints
│   └── orderRoutes.js      # Order endpoints
├── utils/
│   └── sendToken.js        # Token utility
├── .env                    # Environment variables
├── .env.example            # Environment template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── README.md              # API documentation
├── seed.js                # Database seeder
└── server.js              # Main application
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running
2. Check your `MONGODB_URI` in `.env`
3. For Windows, start MongoDB service: `net start MongoDB`

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change `PORT` in `.env` to a different port (e.g., 5001)
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   ```

### JWT Secret Error

**Error:** `secretOrPrivateKey must have a value`

**Solution:**
Make sure `JWT_SECRET` is set in your `.env` file with a strong value.

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
Run `npm install` to install all dependencies.

## 🔄 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Seed database
npm run seed

# Check for updates
npm outdated

# Update dependencies
npm update
```

## 📊 Environment Modes

### Development Mode
- Detailed error messages
- Request logging with Morgan
- Auto-reload with Nodemon

### Production Mode
- Minimal error details
- HTTPS enforcement for cookies
- Optimized performance

## 🌐 API Endpoints Summary

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register user |
| POST | /api/auth/login | Public | Login user |
| POST | /api/auth/admin/login | Public | Admin login |
| GET | /api/auth/me | Private | Get current user |
| GET | /api/auth/logout | Private | Logout user |
| PUT | /api/auth/profile | Private | Update profile |
| PUT | /api/auth/password | Private | Change password |
| GET | /api/products | Public | Get all products |
| GET | /api/products/:id | Public | Get single product |
| GET | /api/products/featured | Public | Get featured products |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| POST | /api/orders | Private | Create order |
| GET | /api/orders/myorders | Private | Get user orders |
| GET | /api/orders/:id | Private | Get order by ID |
| PUT | /api/orders/:id/pay | Private | Mark as paid |
| GET | /api/orders | Admin | Get all orders |
| PUT | /api/orders/:id/deliver | Admin | Mark as delivered |
| PUT | /api/orders/:id/status | Admin | Update status |

## 📝 Next Steps

1. ✅ Backend is set up and running
2. 🔄 Update frontend to connect to backend API
3. 🔄 Replace localStorage with API calls
4. 🔄 Implement real authentication in frontend
5. 🔄 Connect admin panel to backend
6. 🔄 Add payment gateway integration
7. 🔄 Deploy to production

## 🤝 Need Help?

- Check the main [README.md](./README.md) for API documentation
- Review error messages in the console
- Ensure all environment variables are set correctly
- Verify MongoDB is running and accessible

---

**Happy Coding! 🚀**
