@echo off
echo ========================================
echo   MongoDB Service Starter
echo ========================================
echo.
echo This script requires Administrator privileges
echo.
echo Starting MongoDB service...
echo.

net start MongoDB

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   MongoDB started successfully!
    echo ========================================
    echo.
    echo You can now run the backend server
    echo Run: start-backend.bat
    echo.
) else (
    echo.
    echo ========================================
    echo   Failed to start MongoDB
    echo ========================================
    echo.
    echo Please run this script as Administrator
    echo Right-click and select "Run as administrator"
    echo.
    echo Or start MongoDB manually:
    echo   mongod --dbpath "C:\data\db"
    echo.
)

pause
