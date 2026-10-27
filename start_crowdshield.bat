@echo off
title KumbhRakshak - CrowdShield AI System
cd /d "%~dp0CrowdShield--AI-Based-Crowd-and-Disaster-Management"

echo =====================================================================
echo  Starting KumbhRakshak / CrowdShield AI Management System
echo =====================================================================
echo.
echo Dashboard URL : http://localhost:8000
echo API Docs URL  : http://localhost:8000/docs
echo WebSocket URL : ws://localhost:8000/ws
echo.
echo Press Ctrl+C in this terminal to stop the server.
echo =====================================================================
echo.

venv\Scripts\python.exe run_crowdshield.py
pause
