"""
CrowdShield Entrypoint

This script launches the FastAPI backend and serves the React frontend build.
It loads environment variables from `.env`, starts the API, WebSocket, and static files.
"""

import os
import sys
import uvicorn
from dotenv import load_dotenv

if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

def main():
    # Load environment variables
    load_dotenv()

    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))

    try:
        print(f"🚀 Starting CrowdShield backend on http://{host}:{port}")
    except Exception:
        print(f"Starting CrowdShield backend on http://{host}:{port}")

    # Run uvicorn with autoreload for dev
    uvicorn.run(
        "backend.main:app",
        host=host,
        port=port,
        reload=True,
    )

if __name__ == "__main__":
    main()
