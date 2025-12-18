# React Ashion Backend API

A secure, production-ready REST API for the React Ashion E-Commerce platform built with Node.js, Express, and MongoDB.

## 🔐 Security Features

- ✅ **JWT Authentication** with httpOnly cookies
- ✅ **Password Hashing** using bcrypt
- ✅ **Rate Limiting** to prevent abuse
- ✅ **Input Validation & Sanitization** with express-validator
- ✅ **MongoDB Injection Prevention** with express-mongo-sanitize
- ✅ **XSS Protection** with xss-clean
- ✅ **Security Headers** with Helmet
- ✅ **CORS Configuration** for cross-origin requests
- ✅ **Environment Variables** for sensitive data

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## 🚀 Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
- Set `MONGODB_URI` to your MongoDB connection string
- Change `JWT_SECRET` to a strong random string (min 32 characters)
- Update other variables as needed

4. **Start MongoDB:**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

5. **Run the server:**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Admin Login
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@ashion.com",
  "password": "Admin@123456"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### Logout
```http
GET /api/auth/logout
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

#### Update Password
```http
PUT /api/auth/password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=12&category=women&minPrice=10&maxPrice=100&sort=-createdAt&search=dress
```

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12, max: 100)
- `category` - Filter by category (men, women, accessories, shoes, bags, other)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort field (prefix with - for descending)
- `search` - Search in name and description

#### Get Single Product
```http
GET /api/products/:id
```

#### Get Featured Products
```http
GET /api/products/featured
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "name": "Summer Dress",
  "description": "Beautiful summer dress",
  "price": 49.99,
  "originalPrice": 79.99,
  "category": "women",
  "brand": "Ashion",
  "image": "/img/product/product-1.jpg",
  "stock": 50,
  "sizes": ["S", "M", "L"],
  "colors": ["red", "blue"],
  "label": "sale",
  "discount": 37
}
```

#### Update Product (Admin Only)
```http
PUT /api/products/:id
Authorization: Bearer {admin-token}
Content-Type: application/json
```

#### Delete Product (Admin Only)
```http
DELETE /api/products/:id
Authorization: Bearer {admin-token}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "product_id",
      "name": "Product Name",
      "quantity": 2,
      "image": "/img/product/product-1.jpg",
      "price": 49.99,
      "size": "M",
      "color": "red"
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "card",
  "itemsPrice": 99.98,
  "taxPrice": 8.00,
  "shippingPrice": 5.00,
  "totalPrice": 112.98
}
```

#### Get My Orders
```http
GET /api/orders/myorders
Authorization: Bearer {token}
```

#### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer {token}
```

#### Update Order to Paid
```http
PUT /api/orders/:id/pay
Authorization: Bearer {token}
Content-Type: application/json

{
  "id": "payment_id",
  "status": "completed",
  "update_time": "2025-12-18T10:00:00Z",
  "email_address": "payer@example.com"
}
```

#### Get All Orders (Admin Only)
```http
GET /api/orders
Authorization: Bearer {admin-token}
```

#### Update Order to Delivered (Admin Only)
```http
PUT /api/orders/:id/deliver
Authorization: Bearer {admin-token}
```

#### Update Order Status (Admin Only)
```http
PUT /api/orders/:id/status
Authorization: Bearer {admin-token}
Content-Type: application/json

{
  "status": "shipped"
}
```

Status values: `pending`, `processing`, `shipped`, `delivered`, `cancelled`

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Tokens are sent in two ways:

1. **httpOnly Cookie** (Primary, more secure)
2. **Authorization Header** (Fallback)

### Using httpOnly Cookies (Recommended)

Tokens are automatically stored in httpOnly cookies when you login. Just make sure to include credentials in your requests:

```javascript
fetch('http://localhost:5000/api/auth/me', {
  credentials: 'include'
})
```

### Using Authorization Header

```http
Authorization: Bearer your-jwt-token-here
```

## 🛡️ Rate Limiting

Different endpoints have different rate limits:

- **General API**: 100 requests per 15 minutes
- **Authentication**: 5 attempts per 15 minutes
- **Password Reset**: 3 attempts per hour
- **Create Order**: 10 orders per hour
- **Search**: 30 requests per minute

## 🔐 Password Requirements

Passwords must:
- Be at least 6 characters long
- Contain at least one uppercase letter
- Contain at least one lowercase letter
- Contain at least one number

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## 🗄️ Database Models

### User Model
- name, email, password (hashed)
- role (user/admin)
- phone, address
- isActive, lastLogin
- timestamps

### Product Model
- name, description, price, originalPrice
- category, subcategory, brand
- image, images array
- stock, sizes, colors
- rating, numReviews
- label, discount
- isFeatured, isActive
- timestamps

### Order Model
- user (reference)
- orderItems array
- shippingAddress
- paymentMethod, paymentResult
- prices (items, tax, shipping, total)
- isPaid, paidAt
- isDelivered, deliveredAt
- status
- timestamps

## 🧪 Testing

Test the API health:
```bash
curl http://localhost:5000/api/health
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/react-ashion |
| JWT_SECRET | JWT signing secret | (required) |
| JWT_EXPIRE | JWT expiration time | 7d |
| JWT_COOKIE_EXPIRE | Cookie expiration (days) | 7 |
| CLIENT_URL | Frontend URL for CORS | http://localhost:5173 |
| RATE_LIMIT_WINDOW_MS | Rate limit window | 900000 |
| RATE_LIMIT_MAX_REQUESTS | Max requests per window | 100 |

## 🚨 Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting
- **helmet** - Security headers
- **cors** - CORS middleware
- **cookie-parser** - Cookie parsing
- **express-mongo-sanitize** - MongoDB injection prevention
- **xss-clean** - XSS protection
- **dotenv** - Environment variables
- **morgan** - HTTP request logger

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License

---

**Built with ❤️ for React Ashion E-Commerce Platform**
