@echo off
title Our Travel Bucket List
echo ========================================================
echo   Our Travel Bucket List & Couple's Trip Tracker
echo ========================================================
echo.
echo Launching website at http://localhost:8000 ...
start http://localhost:8000
python -m http.server 8000
if %errorlevel% neq 0 (
    echo.
    echo Python server unavailable, opening index.html directly...
    start "" "index.html"
)
pause
