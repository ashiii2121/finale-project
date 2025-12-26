# 🚀 Quick Reference Guide

**React Ashion E-Commerce Platform - Quick Commands & Info**

---

## ⚡ Quick Start (3 Commands)

```bash
# 1. Install dependencies
npm install && cd backend && npm install && cd ..

# 2. Setup & seed database
cd backend && npm run seed && cd ..

# 3. Start everything (2 terminals)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
npm run dev
```

**Done!** Visit http://localhost:5173

---

## 🔑 Default Credentials

**Admin:**
```
Email: admin@ashion.com
Password: Admin@123456
URL: http://localhost:5173/admin/login
```

**Test User:**
```
Email: user@test.com
Password: User@123456
URL: http://localhost:5173/login
```

---

## 📡 API Endpoints

**Base URL:** `http://localhost:5000/api/v1`

### Auth
- `POST /auth/register` - Register
- `POST /auth/login` - Login
- `POST /auth/admin/login` - Admin login
- `GET /auth/me` - Get user

### Products
- `GET /products` - All products
- `GET /products/:id` - Single product
- `POST /products` - Create (admin)
- `PUT /products/:id` - Update (admin)
- `DELETE /products/:id` - Delete (admin)

### Orders
- `POST /orders` - Create order
- `GET /orders/myorders` - My orders
- `GET /orders` - All orders (admin)
- `PUT /orders/:id/status` - Update status (admin)

### Health
- `GET /health` - Health check

---

## 🛠️ Common Commands

### Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend
npm run dev

# Seed database
cd backend && npm run seed

# Build for production
npm run build
```

### Database
```bash
# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Check MongoDB status
net start | findstr MongoDB
```

### Testing
```bash
# Health check
curl http://localhost:5000/api/v1/health

# Get products
curl http://localhost:5000/api/v1/products

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"User@123456"}'
```

---

## 🔧 Environment Variables

**Frontend (`.env`):**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

**Backend (`backend/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ashion
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

---

## 📊 Project Stats

- **Lines of Code:** ~25,000
- **Components:** 40+
- **API Endpoints:** 20+
- **Database Models:** 3
- **Security Features:** 8
- **Performance Optimizations:** 5

---

## 🚨 Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
net start MongoDB

# Check .env file exists
ls backend/.env

# Restart backend
cd backend && npm run dev
```

### Frontend errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Restart dev server
npm run dev
```

### Database issues
```bash
# Reseed database
cd backend && npm run seed

# Check MongoDB connection
mongo --eval "db.adminCommand('ping')"
```

### API errors
```bash
# Check health
curl http://localhost:5000/api/v1/health

# Check logs
# See backend terminal output
```

---

## 📁 Key Files

```
📄 README.md              - Main documentation
📄 CHANGELOG.md           - Version history
📄 HOW_TO_RUN.md         - Setup guide
📄 .env                   - Frontend config
📄 backend/.env           - Backend config
📄 backend/server.js      - Main server
📄 src/App.jsx            - Main app
📄 src/services/api.js    - API client
```

---

## 🎯 URLs

**Frontend:**
- Home: http://localhost:5173
- Login: http://localhost:5173/login
- Register: http://localhost:5173/register
- Admin: http://localhost:5173/admin/login

**Backend:**
- API: http://localhost:5000/api/v1
- Health: http://localhost:5000/api/v1/health

---

## 💡 Pro Tips

1. **Always start MongoDB first**
2. **Use nodemon for auto-restart**
3. **Check browser console for errors**
4. **Use Network tab to debug API calls**
5. **Keep terminals open to see logs**

---

## 🔗 Quick Links

- [Full Documentation](README.md)
- [API Docs](README.md#-api-documentation)
- [Installation Guide](README.md#-installation)
- [Changelog](CHANGELOG.md)
- [How to Run](HOW_TO_RUN.md)

---

## 📞 Support

**Issues?**
- Check [Troubleshooting](#-troubleshooting)
- See [Documentation](README.md)
- Open GitHub issue

---

**Made with ❤️ and React**
