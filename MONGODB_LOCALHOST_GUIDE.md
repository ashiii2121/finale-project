# 🚀 MongoDB Localhost Connection Guide

**Date:** December 27, 2025  
**Goal:** Connect MongoDB to localhost for your project

---

## 📋 CURRENT SITUATION

Your backend is configured to connect to:
```
mongodb://localhost:27017/ashion
```

But MongoDB service is not running, causing the backend to crash.

---

## ✅ STEP-BY-STEP SOLUTION

### **Step 1: Check MongoDB Installation**

Open PowerShell (normal, not admin) and run:
```powershell
Get-Service MongoDB
```

**Expected Results:**

**If MongoDB is installed:**
```
Status   Name               DisplayName
------   ----               -----------
Stopped  MongoDB            MongoDB Server
```

**If MongoDB is NOT installed:**
```
Get-Service : Cannot find any service with service name 'MongoDB'
```

---

### **Step 2: Start MongoDB Service**

**Option A: Using PowerShell (Admin Required)**

1. **Open PowerShell as Administrator:**
   - Press `Windows + X`
   - Click "Terminal (Admin)" or "PowerShell (Admin)"

2. **Run this command:**
   ```powershell
   net start MongoDB
   ```

3. **Expected Output:**
   ```
   The MongoDB service is starting.
   The MongoDB service was started successfully.
   ```

**Option B: Using Services App**

1. Press `Windows + R`
2. Type `services.msc` and press Enter
3. Find "MongoDB Server" in the list
4. Right-click → Start

**Option C: Using Quick Fix Script**

1. Right-click `QUICK_FIX.bat` in your project folder
2. Click "Run as Administrator"
3. Follow the prompts

---

### **Step 3: Verify MongoDB is Running**

```powershell
# Check service status
Get-Service MongoDB

# Should show:
# Status: Running
```

Or check with:
```powershell
# Try to connect
mongosh
# Or older versions:
mongo
```

---

### **Step 4: Verify Backend Connection**

After starting MongoDB, your backend should automatically restart (nodemon).

**Check backend terminal for:**
```
✅ MongoDB Connected: localhost
📊 Database Name: ashion
🚀 Server running in development mode on port 5000
📡 API: http://localhost:5000/api
🏥 Health: http://localhost:5000/api/health
```

---

### **Step 5: Seed Database (First Time Only)**

If this is your first time running the project:

```bash
cd backend
npm run seed
```

**Expected Output:**
```
✅ MongoDB Connected
✅ Database cleared
✅ Admin user created
✅ 8 products created
✅ Database seeded successfully!
```

---

### **Step 6: Test the Connection**

**Test 1: Health Check**
```bash
curl http://localhost:5000/api/v1/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "database": {
    "status": "connected",
    "name": "ashion"
  }
}
```

**Test 2: Get Products**
```bash
curl http://localhost:5000/api/v1/products
```

**Test 3: Open Browser**
- Go to http://localhost:5173
- Products should load!

---

## 🔧 TROUBLESHOOTING

### **Problem 1: MongoDB Service Not Found**

**Error:**
```
Cannot find any service with service name 'MongoDB'
```

**Solution:** MongoDB is not installed. You have 2 options:

**Option A: Install MongoDB Locally**
1. Download from: https://www.mongodb.com/try/download/community
2. Run installer with default settings
3. MongoDB service will be created automatically
4. Start the service (see Step 2)

**Option B: Use MongoDB Atlas (Cloud - Recommended)**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (M0 Sandbox)
4. Get connection string
5. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ashion
   ```
6. Restart backend

---

### **Problem 2: Access Denied When Starting Service**

**Error:**
```
Access is denied
```

**Solution:**
- You must run PowerShell **as Administrator**
- Press `Windows + X` → "Terminal (Admin)"
- Then run `net start MongoDB`

---

### **Problem 3: Service Starts But Backend Still Crashes**

**Check backend terminal for error message:**

**Error: "ECONNREFUSED"**
```javascript
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- MongoDB is not listening on default port
- Check MongoDB configuration
- Or use MongoDB Atlas instead

**Error: "Authentication failed"**
```javascript
MongoError: Authentication failed
```

**Solution:**
- Check your `.env` file
- Make sure MONGODB_URI is correct
- For localhost, use: `mongodb://localhost:27017/ashion`

---

### **Problem 4: Backend Connects But No Products**

**Solution:**
```bash
cd backend
npm run seed
```

This will populate the database with sample products.

---

## 📝 CONFIGURATION FILES

### **Backend .env File**

Your backend should have this configuration:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/ashion

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URLs
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5173/admin
```

**Location:** `backend/.env`

---

### **Database Configuration**

**File:** `backend/config/database.js`

```javascript
import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
```

---

## 🎯 QUICK COMMANDS REFERENCE

```powershell
# Check if MongoDB is installed
Get-Service MongoDB

# Start MongoDB (requires admin)
net start MongoDB

# Stop MongoDB (requires admin)
net stop MongoDB

# Check MongoDB status
Get-Service MongoDB | Select-Object Status, Name, DisplayName

# Connect to MongoDB shell
mongosh
# or
mongo

# Test backend health
curl http://localhost:5000/api/v1/health

# Seed database
cd backend
npm run seed
```

---

## 🚀 COMPLETE STARTUP SEQUENCE

**Every time you start working on the project:**

1. **Start MongoDB:**
   ```powershell
   # As Administrator
   net start MongoDB
   ```

2. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend:**
   ```bash
   # In project root
   npm run dev
   ```

4. **Open Browser:**
   - http://localhost:5173

---

## 📊 CONNECTION FLOW

```
Frontend (Port 5173)
    ↓
    → Makes API requests to Backend
    ↓
Backend (Port 5000)
    ↓
    → Connects to MongoDB
    ↓
MongoDB (Port 27017)
    ↓
    → Stores/Retrieves Data
```

**All three must be running for the app to work!**

---

## ✅ SUCCESS INDICATORS

### **MongoDB Running:**
```powershell
PS> Get-Service MongoDB

Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

### **Backend Connected:**
```
✅ MongoDB Connected: localhost
📊 Database Name: ashion
🚀 Server running in development mode on port 5000
```

### **Frontend Working:**
```
VITE v7.1.7  ready in 1434 ms
➜  Local:   http://localhost:5173/
```

### **Browser:**
- Products load on home page
- No "Failed to load products" error
- Registration/Login works

---

## 🆘 STILL HAVING ISSUES?

### **Option 1: Use MongoDB Atlas (Easiest)**

**Advantages:**
- ✅ No local installation needed
- ✅ Always available (cloud-based)
- ✅ Free tier available
- ✅ No admin rights required

**Setup:**
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0 Sandbox)
3. Create database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get connection string
6. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ashion?retryWrites=true&w=majority
   ```
7. Restart backend
8. Seed database: `npm run seed`

---

### **Option 2: Use Docker (Advanced)**

If you have Docker installed:

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Your backend will connect automatically
```

---

## 📚 ADDITIONAL RESOURCES

**MongoDB Documentation:**
- Installation: https://docs.mongodb.com/manual/installation/
- Getting Started: https://docs.mongodb.com/manual/tutorial/getting-started/

**MongoDB Atlas:**
- Free Tier: https://www.mongodb.com/cloud/atlas/register
- Documentation: https://docs.atlas.mongodb.com/

**Project Documentation:**
- `START_MONGODB.md` - MongoDB troubleshooting
- `URGENT_STATUS.md` - Quick status summary
- `PROJECT_ANALYSIS_REPORT.md` - Complete analysis

---

## 🎉 FINAL CHECKLIST

Before you start coding:

- [ ] MongoDB service is running
- [ ] Backend terminal shows "MongoDB Connected"
- [ ] Frontend is running on port 5173
- [ ] Browser shows products loading
- [ ] No errors in console

**Once all checked, you're ready to go!** 🚀

---

**Created:** December 27, 2025 09:00 AM  
**Purpose:** Connect MongoDB to localhost  
**Status:** Ready to use  
**Next:** Start MongoDB service and enjoy your app! 🎉
