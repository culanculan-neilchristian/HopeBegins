@echo off
set "SCRIPT_DIR=%~dp0"
set "FRONTEND_DIR=%SCRIPT_DIR%.."
set "BACKEND_DIR=%SCRIPT_DIR%..\..\hopebeginbackend"

echo Starting Hope Begins Full Stack...

:: Start Frontend in a new window
echo Starting Frontend (Next.js)...
start "Hope Begins Frontend" cmd /k "cd /d \"%FRONTEND_DIR%\" && npm run dev"

:: Start Backend in current window (to see logs)
echo Starting Backend (Django)...
cd /d "%BACKEND_DIR%"
if not exist "venv\Scripts\python.exe" (
    echo [ERROR] Virtual environment not found in %BACKEND_DIR%\venv. 
    echo Please make sure the backend is setup correctly.
    pause
    exit /b 1
)
.\venv\Scripts\python.exe manage.py runserver 3003
