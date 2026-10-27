import os
import asyncio
import random
import threading
import json
from datetime import datetime
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

# Import existing modules
from .simulation import update_density
from .detection import detect_anomaly
from .yolov8_detect import camera_stream
from .routers import api_router

app = FastAPI(title="CrowdShield Backend", version="1.0")

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Zones and simulation data (Coordinates in [lng, lat] for MapLibre/GeoJSON) ---
ZONES = [
    {"id": "main-entrance", "name": "Main Entrance", "isGate": True, "coordinates": [72.8777, 19.0760]},
    {"id": "food-court", "name": "Food Court", "isGate": False, "coordinates": [72.8780, 19.0770]},
    {"id": "stage-area", "name": "Stage Area", "isGate": False, "coordinates": [72.8790, 19.0780]},
    {"id": "corridor-a", "name": "Corridor A", "isGate": False, "coordinates": [72.8800, 19.0790]},
    {"id": "corridor-b", "name": "Corridor B", "isGate": False, "coordinates": [72.8810, 19.0800]},
    {"id": "parking-gate", "name": "Parking Gate", "isGate": True, "coordinates": [72.8820, 19.0810]},
]

zone_data = {
    z["id"]: {
        **z,
        "density": random.randint(35, 65),
        "utilization": random.randint(35, 65),
        "sparklineData": [random.randint(25, 55) for _ in range(5)]
    }
    for z in ZONES
}

clients = []  # Connected WebSocket clients
camera_alerts = []

# --- Background YOLOv8 detection ---
def run_camera():
    global camera_alerts
    try:
        for _, alerts in camera_stream(0):
            camera_alerts = alerts
    except Exception as e:
        print(f"Camera stream notice: {e}")

threading.Thread(target=run_camera, daemon=True).start()

# --- Crowd simulation functions ---
def update_zones():
    for z in zone_data.values():
        arrivals = random.randint(0, 4)
        departures = random.randint(0, 3)
        z["density"] = max(10, min(100, z["density"] + arrivals - departures))
        z["utilization"] = z["density"]
        z["sparklineData"].append(z["density"])
        if len(z["sparklineData"]) > 20:
            z["sparklineData"].pop(0)

def compute_kpis():
    total_people = sum(z["density"] for z in zone_data.values())
    zones_above_70 = sum(1 for z in zone_data.values() if z["density"] > 70)
    zones_above_90 = sum(1 for z in zone_data.values() if z["density"] > 90)
    return {
        "totalPeople": total_people,
        "zonesAbove70": zones_above_70,
        "zonesAbove90": zones_above_90,
        "alertsLast10Min": zones_above_70
    }

async def broadcast(message: dict):
    dead_clients = []
    for ws in clients:
        try:
            await ws.send_text(json.dumps(message))
        except Exception:
            dead_clients.append(ws)
    for ws in dead_clients:
        if ws in clients:
            clients.remove(ws)

# --- API Endpoints ---
@app.get("/api/metrics")
async def get_metrics():
    update_zones()
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "zones": list(zone_data.values()),
        "kpis": compute_kpis()
    }

@app.get("/api/zones")
@app.get("/api/geo/zones")
async def get_zones():
    update_zones()
    return JSONResponse(list(zone_data.values()))

# Include modular API routers
app.include_router(api_router)

# --- WebSocket for frontend ---
@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    clients.append(ws)
    try:
        while True:
            await asyncio.sleep(2)  # update every 2 seconds
            update_zones()
            kpis = compute_kpis()
            alerts = detect_anomaly(list(zone_data.values())) + camera_alerts
            payload = {
                "type": "zone_update",
                "zones": list(zone_data.values()),
                "kpis": kpis,
                "alerts": alerts
            }
            await ws.send_text(json.dumps(payload))
            for alert in alerts:
                alert_payload = {
                    "type": "alert",
                    "payload": alert
                }
                await ws.send_text(json.dumps(alert_payload))
    except WebSocketDisconnect:
        if ws in clients:
            clients.remove(ws)
    except Exception:
        if ws in clients:
            clients.remove(ws)

# Serve built frontend static files if available
dist_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "dist")
if os.path.exists(dist_dir):
    app.mount("/", StaticFiles(directory=dist_dir, html=True), name="static")
else:
    @app.get("/")
    async def home():
        return {"message": "CrowdShield Backend is running! Build frontend to view dashboard."}
