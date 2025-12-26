# 🔗 Frontend-Backend Integration Checklist

**Goal:** Connect your beautiful frontend to your production-ready backend  
**Time:** 8-14 hours  
**Status:** Ready to start

---

## ✅ Pre-Integration Checklist

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] MongoDB running and seeded
- [ ] Both servers tested and working independently

---

## 📦 Step 1: Install Dependencies (5 min)

```bash
# In project root
npm install axios
```

- [ ] axios installed successfully

---

## 🔧 Step 2: Create API Services (2 hours)

### Create `src/services/api.js`

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
```

- [ ] Created `src/services/api.js`

### Create `src/services/authService.js`

```javascript
import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  adminLogin: async (credentials) => {
    const response = await api.post('/auth/admin/login', credentials);
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  logout: async () => {
    await api.get('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.user;
  },

  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    if (response.success) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },
};
```

- [ ] Created `src/services/authService.js`

### Create `src/services/productService.js`

```javascript
import api from './api';

export const productService = {
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await api.get(`/products?${queryString}`);
  },

  getProduct: async (id) => {
    return await api.get(`/products/${id}`);
  },

  getFeaturedProducts: async () => {
    return await api.get('/products/featured');
  },

  createProduct: async (productData) => {
    return await api.post('/products', productData);
  },

  updateProduct: async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
  },

  deleteProduct: async (id) => {
    return await api.delete(`/products/${id}`);
  },
};
```

- [ ] Created `src/services/productService.js`

### Create `src/services/orderService.js`

```javascript
import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    return await api.post('/orders', orderData);
  },

  getMyOrders: async () => {
    return await api.get('/orders/myorders');
  },

  getOrder: async (id) => {
    return await api.get(`/orders/${id}`);
  },

  getAllOrders: async () => {
    return await api.get('/orders');
  },

  updateOrderStatus: async (id, status) => {
    return await api.put(`/orders/${id}/status`, { status });
  },
};
```

- [ ] Created `src/services/orderService.js`

---

## 🔐 Step 3: Update Authentication (3 hours)

### Update `src/pages/Login.jsx`

Find the handleSubmit function and replace with:

```javascript
import { authService } from '../services/authService';

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
```

- [ ] Updated `Login.jsx`
- [ ] Tested user login

### Update `src/pages/Register.jsx`

```javascript
import { authService } from '../services/authService';

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
```

- [ ] Updated `Register.jsx`
- [ ] Tested user registration

### Update `src/admin/AdminLogin.jsx`

```javascript
import { authService } from '../services/authService';

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
```

- [ ] Updated `AdminLogin.jsx`
- [ ] Tested admin login

---

## 📦 Step 4: Connect Products (2 hours)

### Update `src/components/Products.jsx`

Add at the top:
```javascript
import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
```

Replace the component logic:
```javascript
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  // Rest of your existing JSX...
};
```

- [ ] Updated `Products.jsx`
- [ ] Products loading from API
- [ ] Tested product display

### Update `src/pages/ShopPage.jsx`

Similar changes - fetch products from API with filters

- [ ] Updated `ShopPage.jsx`
- [ ] Filters working with API

### Update `src/pages/MensPage.jsx`

```javascript
const response = await productService.getProducts({ category: 'men' });
```

- [ ] Updated `MensPage.jsx`
- [ ] Men's products filtering correctly

### Update `src/pages/WomensPage.jsx`

```javascript
const response = await productService.getProducts({ category: 'women' });
```

- [ ] Updated `WomensPage.jsx`
- [ ] Women's products filtering correctly

---

## 🛒 Step 5: Connect Cart & Orders (2 hours)

### Update `src/pages/CartPage.jsx`

Add checkout function:
```javascript
import { orderService } from '../services/orderService';

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

- [ ] Updated cart checkout
- [ ] Orders creating in database
- [ ] Tested order flow

---

## 👨‍💼 Step 6: Connect Admin Panel (3 hours)

### Update `src/admin/ProductsManagement.jsx`

```javascript
import { productService } from '../services/productService';
import { useState, useEffect } from 'react';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts();
      setProducts(response.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (productData) => {
    try {
      await productService.createProduct(productData);
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleUpdate = async (id, productData) => {
    try {
      await productService.updateProduct(id, productData);
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  // Rest of your component...
};
```

- [ ] Updated `ProductsManagement.jsx`
- [ ] Can create products
- [ ] Can update products
- [ ] Can delete products

### Update `src/admin/OrdersManagement.jsx`

```javascript
import { orderService } from '../services/orderService';

const fetchOrders = async () => {
  try {
    const response = await orderService.getAllOrders();
    setOrders(response.orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  }
};
```

- [ ] Updated `OrdersManagement.jsx`
- [ ] Orders loading from API
- [ ] Can update order status

---

## 🎨 Step 7: Add Loading & Error States (1 hour)

Add to all components:
- [ ] Loading spinners
- [ ] Error messages
- [ ] Success notifications
- [ ] Empty states

---

## ✅ Step 8: Final Testing (2 hours)

### User Flow Testing
- [ ] Register new user
- [ ] Login as user
- [ ] Browse products
- [ ] Add to cart
- [ ] Checkout (create order)
- [ ] View order history
- [ ] Logout

### Admin Flow Testing
- [ ] Login as admin (admin@ashion.com / Admin@123456)
- [ ] View dashboard
- [ ] Create new product
- [ ] Edit product
- [ ] Delete product
- [ ] View orders
- [ ] Update order status
- [ ] Logout

### Error Handling Testing
- [ ] Test with wrong credentials
- [ ] Test with network offline
- [ ] Test with invalid data
- [ ] Test 401 redirect to login
- [ ] Test 403 unauthorized access

---

## 🎉 Integration Complete!

Once all checkboxes are checked, your app is fully integrated!

### Next Steps:
1. Review `ACTION_PLAN.md` for Phase 2 enhancements
2. Add email notifications
3. Add password reset
4. Write unit tests
5. Deploy to production

---

**Estimated Total Time:** 8-14 hours  
**Current Progress:** [ ] 0% → Target: [✓] 100%

**You've got this! 💪**
