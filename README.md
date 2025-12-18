<div align="center">

# 🛍️ React Ashion - E-Commerce Platform

### Modern Full-Stack E-Commerce Solution with Enterprise-Grade Security

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.3-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/ashiii2121/finale-project/graphs/commit-activity)

[🚀 Live Demo](#) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/ashiii2121/finale-project/issues) • [✨ Request Feature](https://github.com/ashiii2121/finale-project/issues)

</div>

---

## 📸 Screenshots

<div align="center">

### 🏠 Homepage
![Homepage](https://via.placeholder.com/800x400/ca1515/ffffff?text=Modern+E-Commerce+Homepage)

### 🛒 Shopping Experience
<table>
  <tr>
    <td><img src="https://via.placeholder.com/380x250/36a300/ffffff?text=Product+Catalog" alt="Products"/></td>
    <td><img src="https://via.placeholder.com/380x250/2a8a00/ffffff?text=Shopping+Cart" alt="Cart"/></td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/380x250/ca1515/ffffff?text=Admin+Dashboard" alt="Admin"/></td>
    <td><img src="https://via.placeholder.com/380x250/a01010/ffffff?text=Order+Management" alt="Orders"/></td>
  </tr>
</table>

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Frontend Features
- 🏪 **Modern E-Commerce UI** - Beautiful, responsive design
- 🛒 **Shopping Cart** - Real-time cart management
- ❤️ **Wishlist** - Save favorite products
- 🔍 **Advanced Search** - Filter by category, price, brand
- 📱 **Responsive Design** - Works on all devices
- 🎭 **Admin Panel** - Complete management dashboard
- 🌈 **Premium Animations** - Smooth transitions & effects
- 🎯 **SEO Optimized** - Better search rankings

</td>
<td width="50%">

### 🔐 Backend Features
- 🔑 **JWT Authentication** - Secure token-based auth
- 🍪 **httpOnly Cookies** - XSS & CSRF protection
- ✅ **Input Validation** - Comprehensive sanitization
- 🚦 **Rate Limiting** - Prevent abuse & attacks
- 🌐 **CORS Configured** - Secure cross-origin requests
- 🔒 **Password Hashing** - bcrypt encryption
- 🛡️ **Security Headers** - Helmet middleware
- 📊 **MongoDB ODM** - Mongoose models

</td>
</tr>
</table>

---

## 🏗️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Security & Tools
![Helmet](https://img.shields.io/badge/Helmet-0080FF?style=for-the-badge)
![bcrypt](https://img.shields.io/badge/bcrypt-338033?style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

---

## 🚀 Quick Start

### Prerequisites

```bash
📦 Node.js 16+
🗄️ MongoDB 5+
📝 npm or yarn
```

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/ashiii2121/finale-project.git
cd finale-project

# 2️⃣ Install frontend dependencies
npm install

# 3️⃣ Install backend dependencies
cd backend
npm install

# 4️⃣ Configure environment variables
cp .env.example .env
# Edit .env with your settings

# 5️⃣ Start MongoDB
net start MongoDB  # Windows (as Admin)
# OR
mongod --dbpath "C:\data\db"

# 6️⃣ Seed the database (optional)
npm run seed

# 7️⃣ Start backend server
npm run dev  # Runs on http://localhost:5000

# 8️⃣ Start frontend (in new terminal)
cd ..
npm run dev  # Runs on http://localhost:5173
```

### 🎓 Default Credentials

After seeding the database:

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 **Admin** | admin@ashion.com | Admin@123456 |
| 👤 **User** | user@test.com | User@123456 |

---

## 📁 Project Structure

```
finale-project/
│
├── 📂 backend/                    # Backend API
│   ├── 📂 config/                 # Configuration files
│   ├── 📂 controllers/            # Route controllers
│   ├── 📂 middleware/             # Custom middleware
│   ├── 📂 models/                 # Database models
│   ├── 📂 routes/                 # API routes
│   ├── 📂 utils/                  # Utility functions
│   ├── 📄 server.js               # Express app
│   ├── 📄 seed.js                 # Database seeder
│   └── 📄 package.json            # Backend dependencies
│
├── 📂 src/                        # Frontend source
│   ├── 📂 admin/                  # Admin panel components
│   ├── 📂 components/             # Reusable components
│   ├── 📂 context/                # React Context
│   ├── 📂 hooks/                  # Custom hooks
│   ├── 📂 pages/                  # Page components
│   ├── 📄 App.jsx                 # Main app component
│   └── 📄 main.jsx                # Entry point
│
├── 📂 public/                     # Static assets
├── 📄 package.json                # Frontend dependencies
├── 📄 vite.config.js              # Vite configuration
└── 📄 README.md                   # This file
```

---

## 🔐 Security Features

<div align="center">

| Feature | Implementation | Status |
|---------|---------------|--------|
| 🔑 **JWT Authentication** | Token-based auth with role management | ✅ |
| 🍪 **httpOnly Cookies** | Secure cookie storage (XSS protection) | ✅ |
| ✅ **Input Validation** | express-validator for all inputs | ✅ |
| 🚦 **Rate Limiting** | Prevent brute force attacks | ✅ |
| 🌐 **CORS** | Configured for specific origins | ✅ |
| 🔐 **Password Hashing** | bcrypt with salt rounds | ✅ |
| 🛡️ **Security Headers** | Helmet middleware | ✅ |
| 🚫 **NoSQL Injection** | Sanitization middleware | ✅ |
| 🔒 **XSS Protection** | xss-clean middleware | ✅ |
| 📝 **Environment Variables** | Sensitive data protection | ✅ |

</div>

---

## 📡 API Endpoints

<details>
<summary><b>🔐 Authentication Endpoints (7)</b></summary>

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/admin/login` | Admin login | Public |
| GET | `/api/auth/me` | Get current user | Private |
| GET | `/api/auth/logout` | Logout user | Private |
| PUT | `/api/auth/profile` | Update profile | Private |
| PUT | `/api/auth/password` | Change password | Private |

</details>

<details>
<summary><b>📦 Product Endpoints (6)</b></summary>

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get single product | Public |
| GET | `/api/products/featured` | Get featured products | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

</details>

<details>
<summary><b>🛒 Order Endpoints (7)</b></summary>

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create order | Private |
| GET | `/api/orders/myorders` | Get user orders | Private |
| GET | `/api/orders/:id` | Get order by ID | Private |
| PUT | `/api/orders/:id/pay` | Mark as paid | Private |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/deliver` | Mark as delivered | Admin |
| PUT | `/api/orders/:id/status` | Update status | Admin |

</details>

---

## 🎯 Features Showcase

### 🛒 Shopping Cart
- ✅ Add/remove products
- ✅ Update quantities
- ✅ Real-time price calculation
- ✅ Persistent storage (localStorage)
- ✅ Responsive design

### ❤️ Wishlist
- ✅ Save favorite products
- ✅ Quick add to cart
- ✅ Persistent storage
- ✅ Easy management

### 👨‍💼 Admin Dashboard
- ✅ Product management (CRUD)
- ✅ Order tracking
- ✅ Customer management
- ✅ Analytics & reports
- ✅ Settings configuration

### 🔍 Search & Filter
- ✅ Category filtering
- ✅ Price range filter
- ✅ Brand filtering
- ✅ Text search
- ✅ Sorting options

---

## 📊 Database Models

### 👤 User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  phone: String,
  address: Object,
  isActive: Boolean,
  lastLogin: Date
}
```

### 📦 Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  brand: String,
  image: String,
  stock: Number,
  rating: Number,
  isFeatured: Boolean
}
```

### 🛒 Order Model
```javascript
{
  user: ObjectId,
  orderItems: Array,
  shippingAddress: Object,
  paymentMethod: String,
  totalPrice: Number,
  isPaid: Boolean,
  status: String
}
```

---

## 🧪 Testing

```bash
# Test backend API
curl http://localhost:5000/api/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ashion.com","password":"Admin@123456"}'

# Test products endpoint
curl http://localhost:5000/api/products
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| 📖 [Backend README](backend/README.md) | Complete API documentation |
| 🚀 [Quick Start](backend/QUICKSTART.md) | 5-minute setup guide |
| 🔧 [Setup Guide](backend/SETUP.md) | Detailed setup instructions |
| 🔗 [Frontend Integration](FRONTEND_INTEGRATION.md) | Connect frontend to backend |
| 📦 [Delivery Summary](DELIVERY_SUMMARY.md) | What was delivered |

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. 🍴 Fork the Project
2. 🌿 Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. ✍️ Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the Branch (`git push origin feature/AmazingFeature`)
5. 🎉 Open a Pull Request

---

## 🐛 Known Issues

- ⚠️ Frontend needs to be integrated with backend API
- ⚠️ Payment gateway integration pending
- ⚠️ Email notifications not implemented

See the [open issues](https://github.com/ashiii2121/finale-project/issues) for a full list of proposed features and known issues.

---

## 📈 Roadmap

- [x] ✅ Backend API with security features
- [x] ✅ JWT authentication
- [x] ✅ Database models
- [x] ✅ Admin panel UI
- [ ] 🔄 Frontend-Backend integration
- [ ] 🔄 Payment gateway (Stripe/PayPal)
- [ ] 🔄 Email notifications
- [ ] 🔄 Product reviews & ratings
- [ ] 🔄 Advanced analytics
- [ ] 🔄 Multi-language support

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Ashik**

- 🌐 GitHub: [@ashiii2121](https://github.com/ashiii2121)
- 📧 Email: [Your Email]
- 💼 LinkedIn: [Your LinkedIn]

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend library
- [Express](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Vite](https://vitejs.dev/) - Build tool
- [Helmet](https://helmetjs.github.io/) - Security middleware
- [JWT](https://jwt.io/) - Authentication
- [bcrypt](https://www.npmjs.com/package/bcryptjs) - Password hashing

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ by [Ashik](https://github.com/ashiii2121)

[![GitHub stars](https://img.shields.io/github/stars/ashiii2121/finale-project?style=social)](https://github.com/ashiii2121/finale-project/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ashiii2121/finale-project?style=social)](https://github.com/ashiii2121/finale-project/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/ashiii2121/finale-project?style=social)](https://github.com/ashiii2121/finale-project/watchers)

**[⬆ Back to Top](#-react-ashion---e-commerce-platform)**

</div>
