# 🚨 QUICK FIX - Backend Connection Issue

**Error:** `ERR_CONNECTION_REFUSED` on port 5000  
**Cause:** Backend crashed - MongoDB not running  
**Fix:** Start MongoDB service

---

## ⚡ QUICK FIX (1 Minute)

### **Step 1: Start MongoDB**

**Option A: Using Windows Services**
1. Press `Windows + R`
2. Type `services.msc` and press Enter
3. Find "MongoDB" in the list
4. Right-click → Start

**Option B: Using PowerShell (as Administrator)**
```bash
# Open PowerShell as Administrator
# Press Windows + X → Windows PowerShell (Admin)

# Start MongoDB
net start MongoDB
```

### **Step 2: Backend Will Auto-Restart**
- Nodemon is watching for changes
- Backend will automatically reconnect
- Wait 5-10 seconds

### **Step 3: Verify**
Visit: http://localhost:5000/api/v1/health

Should see:
```json
{
  "success": true,
  "database": {
    "status": "connected"
  }
}
```

---

## 🎯 ALTERNATIVE: Use MongoDB Atlas (Cloud)

If local MongoDB doesn't work:

### **1. Create Free Account**
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up (free)
- Create M0 (free) cluster

### **2. Get Connection String**
- Click "Connect"
- Choose "Connect your application"
- Copy connection string

### **3. Update Backend .env**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ashion?retryWrites=true&w=majority
```

### **4. Restart Backend**
Backend will auto-restart with nodemon

---

## ✅ AFTER MONGODB STARTS

**You'll see in backend terminal:**
```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected
```

**Then refresh browser:**
- Products will load
- Login will work
- Everything functional!

---

## 🔍 CHECK IF MONGODB IS RUNNING

```bash
# In PowerShell
net start | findstr MongoDB

# If you see "MongoDB" → it's running ✅
# If nothing → it's not running ❌
```

---

## 💡 QUICK DIAGNOSIS

**Your Error:**
```
:5000/api/v1/auth/admin/login:1 Failed to load resource: net::ERR_CONNECTION_REFUSED
```

**Means:**
- ❌ Backend can't start
- ❌ MongoDB not connected
- ❌ API endpoints unreachable

**Solution:**
- ✅ Start MongoDB
- ✅ Backend auto-restarts
- ✅ Everything works!

---

## 🎯 CURRENT STATUS

```
Frontend:   ✅ RUNNING (http://localhost:5173)
Backend:    ❌ CRASHED (MongoDB not connected)
MongoDB:    ❌ NOT RUNNING

FIX:        Start MongoDB service!
```

---

## 📝 STEP-BY-STEP

1. **Open PowerShell as Administrator**
   - Press `Windows + X`
   - Click "Windows PowerShell (Admin)"

2. **Start MongoDB**
   ```bash
   net start MongoDB
   ```

3. **Wait 10 seconds**
   - Backend will auto-restart

4. **Refresh browser**
   - http://localhost:5173
   - Everything should work!

---

## ✨ THAT'S IT!

Once MongoDB is running:
- ✅ Backend connects
- ✅ API works
- ✅ Login works
- ✅ Products load
- ✅ **Everything functional!**

---

**The code is perfect - we just need MongoDB running!** 💪

**Start MongoDB and you're good to go!** 🚀
