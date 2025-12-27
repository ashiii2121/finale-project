@echo off
echo ========================================
echo   QUICK FIX - Start MongoDB
echo ========================================
echo.

echo Checking MongoDB status...
sc query MongoDB >nul 2>&1

if %errorlevel% neq 0 (
    echo [ERROR] MongoDB service not found!
    echo.
    echo Please install MongoDB from:
    echo https://www.mongodb.com/try/download/community
    echo.
    echo Or use MongoDB Atlas cloud database:
    echo https://www.mongodb.com/cloud/atlas
    echo.
    pause
    exit /b 1
)

echo MongoDB service found!
echo.
echo Starting MongoDB service...
echo (This requires Administrator privileges)
echo.

net start MongoDB

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCCESS! MongoDB is now running!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Backend will auto-restart (check backend terminal)
    echo 2. Wait 5 seconds for backend to connect
    echo 3. Refresh your browser at http://localhost:5173
    echo 4. Products should now load!
    echo.
    echo Press any key to seed the database...
    pause >nul
    
    cd backend
    echo.
    echo Seeding database...
    call npm run seed
    
    echo.
    echo ========================================
    echo   ALL DONE! Your platform is ready!
    echo ========================================
    echo.
    echo Test your platform:
    echo - Home: http://localhost:5173
    echo - Register: http://localhost:5173/register
    echo - Login: http://localhost:5173/login
    echo - Admin: http://localhost:5173/admin/login
    echo.
    echo Admin credentials:
    echo Email: admin@ashion.com
    echo Password: Admin@123456
    echo.
) else (
    echo.
    echo [ERROR] Failed to start MongoDB!
    echo.
    echo Possible reasons:
    echo 1. Not running as Administrator
    echo 2. MongoDB already running
    echo 3. MongoDB not installed correctly
    echo.
    echo Solutions:
    echo 1. Right-click this file and "Run as Administrator"
    echo 2. Check if MongoDB is already running: sc query MongoDB
    echo 3. Use MongoDB Atlas cloud database instead
    echo.
)

pause
