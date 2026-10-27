# Multi-stage Dockerfile for KumbhRakshak AI
# Combines compiled React + Leaflet frontend and FastAPI backend

FROM python:3.11-slim

WORKDIR /app

# Install Python requirements
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend files
COPY backend/ /app/backend/

# Copy compiled frontend static assets
COPY frontend/dist/ /app/frontend/dist/

# Expose port (default 8000)
ENV PORT=8000
EXPOSE 8000

# Start Uvicorn production server
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
