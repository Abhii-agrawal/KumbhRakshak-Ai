@echo off
title 🔱 KumbhRakshak AI — Prayagraj Emergency Control Room
cd /d "%~dp0"

echo =========================================================================
echo   🔱 KumbhRakshak AI: Emergency Command & Disaster Mitigation System
echo   Viksit Bharat Young Leaders Dialogue (VBYLD) - Hack for Social Cause
echo =========================================================================
echo.
echo [1/2] Initializing FastAPI Microservice & AI Telemetry Engine...
echo       - Dynamic Dijkstra Green Corridor Routing Active
echo       - Computer Vision Radial Anomaly & Circle Formation Triage Active
echo       - Prayagraj Sangam 6-Sector GIS Map Active
echo.
echo [2/2] Launching Command Center Dashboard at:
echo       Local URL : http://localhost:8000
echo       API Docs  : http://localhost:8000/docs
echo =========================================================================
echo.

start "" "http://localhost:8000"

if exist "venv\Scripts\python.exe" (
    "venv\Scripts\python.exe" -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
) else (
    python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
)

pause
