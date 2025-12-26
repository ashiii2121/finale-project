# 🚀 Git & GitHub Setup Guide

**Step-by-step guide to add your project to GitHub**

---

## 📋 PREREQUISITES

Before starting, make sure you have:
- ✅ Git installed on your computer
- ✅ GitHub account created
- ✅ Repository created on GitHub (https://github.com/ashiii2121/finale-project)

---

## 🔧 STEP-BY-STEP GUIDE

### **Step 1: Check if Git is Installed**

Open PowerShell and run:
```bash
git --version
```

**Expected output:** `git version 2.x.x`

**If not installed:**
- Download from: https://git-scm.com/download/win
- Install with default settings
- Restart PowerShell

---

### **Step 2: Configure Git (First Time Only)**

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your-email@example.com"

# Verify configuration
git config --list
```

---

### **Step 3: Navigate to Your Project**

```bash
cd "c:\Users\ashik\Desktop\finale project\finale-project"
```

---

### **Step 4: Initialize Git Repository**

```bash
# Initialize git
git init

# Check status
git status
```

---

### **Step 5: Create .gitignore File**

Make sure you have a `.gitignore` file in the root directory with:

```
# Dependencies
node_modules/
backend/node_modules/

# Environment variables
.env
backend/.env
.env.local
.env.production

# Build files
dist/
build/
.vite/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Testing
coverage/
.nyc_output/

# Misc
*.swp
*.swo
*~
```

---

### **Step 6: Add All Files to Git**

```bash
# Add all files
git add .

# Check what will be committed
git status
```

**You should see:**
- Green text = files ready to commit
- Red text = files not tracked (should be in .gitignore)

---

### **Step 7: Create First Commit**

```bash
git commit -m "Initial commit: React Ashion E-Commerce Platform"
```

**Expected output:** `X files changed, Y insertions(+)`

---

### **Step 8: Add GitHub Remote**

```bash
# Add remote repository
git remote add origin https://github.com/ashiii2121/finale-project.git

# Verify remote
git remote -v
```

**Expected output:**
```
origin  https://github.com/ashiii2121/finale-project.git (fetch)
origin  https://github.com/ashiii2121/finale-project.git (push)
```

---

### **Step 9: Push to GitHub**

```bash
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Username: `ashiii2121`
- Password: Use **Personal Access Token** (not your GitHub password)

---

### **Step 10: Verify on GitHub**

1. Go to: https://github.com/ashiii2121/finale-project
2. Refresh the page
3. You should see all your files!

---

## 🔑 CREATING PERSONAL ACCESS TOKEN (If Needed)

If Git asks for password:

1. **Go to GitHub:**
   - https://github.com/settings/tokens

2. **Click "Generate new token (classic)"**

3. **Configure token:**
   - Note: "finale-project access"
   - Expiration: 90 days (or custom)
   - Select scopes: ✅ repo (all)

4. **Click "Generate token"**

5. **Copy the token** (you won't see it again!)

6. **Use token as password** when Git prompts

---

## 🚨 COMMON ISSUES & FIXES

### **Issue 1: "fatal: not a git repository"**
**Fix:**
```bash
git init
```

### **Issue 2: "remote origin already exists"**
**Fix:**
```bash
git remote remove origin
git remote add origin https://github.com/ashiii2121/finale-project.git
```

### **Issue 3: "failed to push some refs"**
**Fix:**
```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### **Issue 4: "Permission denied"**
**Fix:** Use Personal Access Token instead of password

### **Issue 5: ".env file showing in git"**
**Fix:**
```bash
# Remove from git
git rm --cached .env
git rm --cached backend/.env

# Add to .gitignore
echo ".env" >> .gitignore
echo "backend/.env" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove .env files from git"
git push
```

---

## ✅ VERIFICATION CHECKLIST

After pushing, verify:
- [ ] Go to https://github.com/ashiii2121/finale-project
- [ ] See all your files
- [ ] README.md displays properly
- [ ] .env files are NOT visible (should be in .gitignore)
- [ ] node_modules are NOT visible (should be in .gitignore)

---

## 📝 QUICK COMMANDS REFERENCE

```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull from GitHub
git pull

# View commit history
git log --oneline

# Check remote
git remote -v
```

---

## 🔄 UPDATING YOUR PROJECT LATER

When you make changes:

```bash
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Description of changes"

# 4. Push to GitHub
git push
```

---

## 🎯 COMPLETE WORKFLOW

```bash
# Navigate to project
cd "c:\Users\ashik\Desktop\finale project\finale-project"

# Initialize git (first time only)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: React Ashion E-Commerce Platform"

# Add remote (first time only)
git remote add origin https://github.com/ashiii2121/finale-project.git

# Push
git branch -M main
git push -u origin main
```

---

## 💡 TIPS

1. **Always check .gitignore** before first commit
2. **Never commit .env files** (contains secrets)
3. **Write meaningful commit messages**
4. **Commit often** (small, logical changes)
5. **Pull before push** if working with others

---

## 🆘 NEED HELP?

If you get stuck:
1. Check the error message carefully
2. Look for the issue in "Common Issues" section
3. Make sure .gitignore is correct
4. Verify your GitHub token is valid

---

## ✨ SUCCESS!

Once pushed, your project will be at:
**https://github.com/ashiii2121/finale-project**

Share it proudly! 🎉

---

**Created:** December 26, 2025  
**For:** React Ashion E-Commerce Platform  
**Repository:** https://github.com/ashiii2121/finale-project
