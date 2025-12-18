# 🎯 Quick Start Guide - React Ashion Backend

Get the backend up and running in 5 minutes!

## ⚡ Quick Setup (5 Steps)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env and set your JWT_SECRET (minimum 32 characters)
```

### 3. Start MongoDB
```bash
# Windows (run as Administrator)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 4. Seed Database (Optional)
```bash
npm run seed
```

### 5. Start Server
```bash
npm run dev
```

## ✅ Verify It's Working

Visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "success": true,
  "message": "Server is running"
}
```

## 🔑 Default Credentials (After Seeding)

**Admin:**
- Email: `admin@ashion.com`
- Password: `Admin@123456`

**Test User:**
- Email: `user@test.com`
- Password: `User@123456`

## 🚀 Common Commands

```bash
npm run dev      # Start development server
npm start        # Start production server
npm run seed     # Populate database with sample data
```

## 📡 API Base URL

```
http://localhost:5000/api
```

## 🔗 Quick API Tests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Test@123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ashion.com","password":"Admin@123456"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB not connecting | Start MongoDB service |
| Port 5000 in use | Change PORT in .env |
| JWT error | Set JWT_SECRET in .env |
| Module not found | Run `npm install` |

## 📚 Full Documentation

- [Complete Setup Guide](./SETUP.md)
- [API Documentation](./README.md)

---

**Need help?** Check the full [SETUP.md](./SETUP.md) guide!
