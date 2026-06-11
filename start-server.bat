@echo off
setlocal
cd /d "%~dp0"
set "PORT=4173"
set "HOST=127.0.0.1"
set "URL=http://%HOST%:%PORT%/"

echo Starting My Travel Web...
echo URL: %URL%
echo.

where python >nul 2>nul
if %errorlevel%==0 (
  start "" "%URL%"
  python -m http.server %PORT% --bind %HOST%
  goto :eof
)

where py >nul 2>nul
if %errorlevel%==0 (
  start "" "%URL%"
  py -m http.server %PORT% --bind %HOST%
  goto :eof
)

where npx >nul 2>nul
if %errorlevel%==0 (
  start "" "%URL%"
  npx --yes vite --host %HOST% --port %PORT%
  goto :eof
)

echo No Python or Node.js runtime was found.
echo Please install Python 3 or Node.js, then run this file again.
pause
