@echo off
set "SCRIPT_DIR=%~dp0"
set "BACKEND_DIR=%SCRIPT_DIR%..\..\hopebeginbackend"

echo Starting Hope Begins Backend (Django)...
cd /d "%BACKEND_DIR%"
if not exist "venv\Scripts\python.exe" (
    echo [ERROR] Virtual environment not found in %BACKEND_DIR%\venv. 
    pause
    exit /b 1
)
.\venv\Scripts\python.exe manage.py runserver 3003
