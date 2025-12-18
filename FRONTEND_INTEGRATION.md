# 🔗 Frontend Integration Guide

Guide to connect your React Ashion frontend to the new secure backend API.

## 📋 Overview

This guide will help you integrate the frontend with the backend API, replacing localStorage-based authentication with real JWT authentication and API calls.

## 🚀 Quick Setup

### 1. Create API Service

Create `src/services/api.js` in your frontend:

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for httpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Token is automatically sent via httpOnly cookie
    // But you can also send it in header if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
```

### 2. Create Auth Service

Create `src/services/authService.js`:

```javascript
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
    await api.get('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
};
```

### 3. Create Product Service

Create `src/services/productService.js`:

```javascript
import api from './api';

export const productService = {
  // Get all products
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/products?${queryString}`);
  },

  // Get single product
  getProduct: async (id) => {
    return await api.get(`/products/${id}`);
  },

  // Get featured products
  getFeaturedProducts: async () => {
    return await api.get('/products/featured');
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
```

### 4. Create Order Service

Create `src/services/orderService.js`:

```javascript
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
```

### 5. Update Environment Variables

Create `.env` in frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Update Login Component

Update `src/pages/Login.jsx`:

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

### 7. Update Register Component

Update `src/pages/Register.jsx`:

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars, 1 uppercase, 1 number)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
```

### 8. Update Admin Login

Update `src/admin/AdminLogin.jsx`:

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.adminLogin(formData);
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        setError('Not authorized as admin');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <h1>Admin Panel</h1>
          <p>Sign in to access the dashboard</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Default: admin@ashion.com / Admin@123456</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
```

### 9. Update Products Component

Update `src/components/Products.jsx` to fetch from API:

```javascript
import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts({ limit: 8 });
      setProducts(response.products);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div className="product__item__pic">
                  <img src={product.image} alt={product.name} />
                  {product.label && (
                    <div className={`label ${product.label}`}>{product.label}</div>
                  )}
                  <ul className="product__hover">
                    <li>
                      <a href="#" onClick={(e) => { e.preventDefault(); addToWishlist(product); }}>
                        <span className="icon_heart_alt"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => { e.preventDefault(); addToCart(product); }}>
                        <span className="icon_bag_alt"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>{product.name}</h6>
                  <div className="product__price">
                    ${product.price}
                    {product.originalPrice && (
                      <span>${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
```

## 🔐 Authentication Flow

### Login Flow
1. User enters credentials
2. Frontend sends POST to `/api/auth/login`
3. Backend validates credentials
4. Backend sends JWT in httpOnly cookie + response
5. Frontend stores token in localStorage (backup)
6. Frontend redirects to home page

### Protected Routes
1. User tries to access protected route
2. Frontend checks if user is logged in
3. If yes, axios automatically sends cookie
4. Backend verifies JWT from cookie
5. Backend returns data or 401 error

### Logout Flow
1. User clicks logout
2. Frontend sends GET to `/api/auth/logout`
3. Backend clears cookie
4. Frontend clears localStorage
5. Frontend redirects to login

## 📦 Cart Integration

Update cart to sync with backend orders:

```javascript
const handleCheckout = async () => {
  try {
    const orderData = {
      orderItems: cartItems.map(item => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
      })),
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      paymentMethod: 'card',
      itemsPrice: cartTotal,
      taxPrice: cartTotal * 0.08,
      shippingPrice: 5.00,
      totalPrice: cartTotal * 1.08 + 5.00,
    };

    const response = await orderService.createOrder(orderData);
    console.log('Order created:', response.order);
    clearCart();
    navigate('/orders');
  } catch (error) {
    console.error('Order failed:', error);
  }
};
```

## 🎯 Next Steps

1. ✅ Create API services
2. ✅ Update login/register components
3. ✅ Update admin login
4. ✅ Fetch products from API
5. ⬜ Update cart to create orders
6. ⬜ Add loading states
7. ⬜ Add error handling
8. ⬜ Update admin panel to use API
9. ⬜ Add user profile page
10. ⬜ Add order history page

## 🐛 Common Issues

### CORS Errors
Make sure backend CORS is configured with your frontend URL in `.env`:
```env
CLIENT_URL=http://localhost:5173
```

### Cookie Not Sent
Make sure to use `withCredentials: true` in axios config.

### 401 Errors
Check if token is valid and not expired. Backend JWT expires in 7 days by default.

## 📚 Resources

- [Axios Documentation](https://axios-http.com/)
- [React Query](https://tanstack.com/query/latest) - For better data fetching
- [SWR](https://swr.vercel.app/) - Alternative to React Query

---

**Happy Integrating! 🚀**
