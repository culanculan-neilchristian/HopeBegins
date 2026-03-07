@echo off
set "SCRIPT_DIR=%~dp0"
set "FRONTEND_DIR=%SCRIPT_DIR%.."

echo Starting Hope Begins Frontend (Next.js)...
cd /d "%FRONTEND_DIR%"
npm run dev
