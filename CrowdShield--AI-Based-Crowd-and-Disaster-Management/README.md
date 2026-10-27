# 🔱 KumbhRakshak AI
### Integrated Disaster Mitigation, Health Bio-Surveillance & Emergency Response System for Mass Gatherings
**Target Event & Deployment**: Prayagraj Maha Kumbh Mela (Triveni Sangam)  
**Initiative**: Viksit Bharat Young Leaders Dialogue (VBYLD) — *Hack for Social Cause*

---

## 📌 Executive Summary & Problem Statement

The **Maha Kumbh Mela at Prayagraj** is the largest peaceful human gathering on Earth, attracting over **50 to 100 million pilgrims** across a temporary, shifting floodplain. Managing such colossal density presents critical socio-technical challenges:

1. **Catastrophic Stampede Hazards**: Narrow choke points such as Pontoon Bridge 3, bathing ghat bottlenecks at Sangam Nose, and railway holding gates experience exponential crowd surges within minutes.
2. **Dynamic Floodplain Geography**: Shifting riverbanks, temporary pontoon bridges, and unpaved arterial tracks make static evacuation plans obsolete.
3. **Bio-Surveillance & Disease Outbreaks**: High-density communal tent cities (Akhara sectors) risk rapid syndromic transmission (acute fever, waterborne diseases) and mass dehydration.
4. **Golden Hour Ambulance Paralysis**: Gridlocked roads delay emergency paramedics, resulting in preventable fatalities during cardiac arrest, heatstroke, or physical crushing.

**KumbhRakshak AI** solves these systemic challenges through a unified, production-grade Command & Control Platform combining **Edge CV Detection**, **GIS Geospatial Alerts**, **Syndromic Health Surveillance**, and **Dijkstra-Powered Dynamic Green Corridor Dispatch**.

---

## 🏛️ The 4-Pillar System Architecture

```
                                      +---------------------------------------------+
                                      |          PRAYAGRAJ KUMBH MELA GROUND        |
                                      | (Sangam Nose, Pontoon Bridges, Tent Cities) |
                                      +----------------------+----------------------+
                                                             |
                                      +----------------------v----------------------+
                                      |            IoT & MULTI-SOURCE INGESTION     |
                                      |  - CCTV / Drone Feeds (YOLOv8 Detection)    |
                                      |  - Thermal Scanners (Fever Flagging)        |
                                      |  - CPCB Water Sensors (BOD Quality mg/L)    |
                                      +----------------------+----------------------+
                                                             |
                                      +----------------------v----------------------+
                                      |         KUMBHRAKSHAK AI BACKEND CORE        |
                                      |              (FastAPI / Python)             |
                                      +----------------------+----------------------+
                                                             |
                 +---------------------------+---------------+---------------------------+
                 |                           |                                           |
                 v                           v                                           v
      +---------------------+     +---------------------+                     +---------------------+
      |   PILLAR 1: CROWD   |     | PILLAR 2: BIO-HEALTH|                     | PILLAR 4: GREEN     |
      |   DENSITY ENGINE    |     |   SURVEILLANCE      |                     | CORRIDOR DISPATCH   |
      | - Occupancy %       |     | - Syndromic Triage  |                     | - NetworkX Graph    |
      | - Stochastic Flow   |     | - Fever Flags (>25) |                     | - Dijkstra Routing  |
      | - Surge Prediction  |     | - Water BOD Sensors |                     | - Red Zone Bypass   |
      +----------+----------+     +----------+----------+                     +----------+----------+
                 |                           |                                           |
                 +---------------------------+---------------+---------------------------+
                                                             |
                                              (REST APIs + 3s Auto-Telemetry)
                                                             |
                                      +----------------------v----------------------+
                                      |            PILLAR 3: GIS COMMAND            |
                                      |          & DISASTER CONTROL CENTER          |
                                      |      (React 18 + Leaflet + Tailwind)        |
                                      +----------------------+----------------------+
                                                             |
                 +---------------------------+---------------+---------------------------+
                 |                           |                                           |
                 v                           v                                           v
      +---------------------+     +---------------------+                     +---------------------+
      |   INTERACTIVE GIS   |     |  AI BHASHINI VOICE  |                     | REAL-TIME AMBULANCE |
      |   SECTOR MAP        |     |  PUBLIC MEGAPHONE   |                     | ROUTE VISUALIZATION |
      | - Sangam Coordinates|     | - Hindi PA Audio    |                     | - Turn-by-Turn Path |
      | - Dynamic Color Pins|     | - Crowd Diversion   |                     | - Live ETA in Mins  |
      | - Rich Telemetry Pop|     | - Emergency Siren   |                     | - Bypassed Chokepts |
      +---------------------+     +---------------------+                     +---------------------+
```

---

## 🚀 Key Modules & Functional Components

### 1. Pillar 1: Crowd Density & Stampede Prevention
- Computes real-time capacity utilization across monitored sectors (`Sangam Nose`, `Pontoon Bridge 3`, `Akhara Sector 4`, `Subedarganj`, `Central Hospital`, `Arail Ghat`).
- Automatically triggers high-priority **RED_ALERT** warnings when sector occupancy exceeds **85%**.

### 2. Pillar 2: Syndromic Bio-Surveillance & Water Quality
- **Automated Thermal Screening**: Continuous live headcount counter tracking gate admissions.
- **Fever Flagging**: Highlights medical clusters when fever cases surpass threshold (`>25`), flagging potential enteric or respiratory outbreaks.
- **Ganga Water Quality (BOD)**: Live Biochemical Oxygen Demand monitoring in mg/L with CPCB safe bathing compliance indicator (`< 3.0 mg/L`).

### 3. Pillar 3: Interactive Geospatial GIS Map (`GISMap.jsx`)
- Built on Leaflet with high-contrast CartoDB tiles centered at Prayagraj Triveni Sangam (`[25.4281, 81.8847]`).
- Visualizes sectors with color-coded severity:
  - 🔴 **Red Alert (`#EF4444`)**: >85% Capacity (Imminent Stampede Hazard)
  - 🟣 **Bio Alert (`#8B5CF6`)**: >25 Fever Cases (Medical Triage Required)
  - 🟡 **Amber Warning (`#F59E0B`)**: >65% Capacity (Heavy Congestion)
  - 🟢 **Green Safe (`#10B981`)**: Normal Flow
- Interactive popups allow operators to inspect capacity, fever flags, water safety, and trigger **🚨 Report Emergency Here**.

### 4. Pillar 4: Dijkstra Dynamic Green Corridor Router (`EmergencyRouter.jsx`)
- Graph representation of the temporary Kumbh Mela arterial road network built with **NetworkX**.
- **Congestion Penalty Weights**: RED sectors receive massive travel time penalties (`+80 min penalty weight`), forcing Dijkstra’s algorithm to navigate ambulances around stampede danger zones.
- Real-time response returns optimal green corridor hops, estimated ETA in minutes, and an explicit list of bypassed choke points.

---

## 🇮🇳 Ground Reality Mitigations

| Challenge in Mass Pilgrimages | KumbhRakshak Ground Reality Mitigation |
| :--- | :--- |
| **5G / Cellular Blackouts** | Offline-capable Edge architecture with local CSV state caching and graceful fallbacks that continue operating when telecom towers drop under load. |
| **Elderly & Non-Smartphone Pilgrims** | **AI Bhashini Hindi Megaphone**: Dedicated public address synthesizers (`SpeechSynthesisUtterance` with `lang="hi-IN"`) vocalizing turn-by-turn crowd diversion and emergency clearance announcements over camp loudspeakers. |
| **Waterborne Illness in Sangam** | Continuous BOD monitoring sensor integrations alerting mela authorities before contamination spikes reach bathing ghats. |
| **Foot-Medic & First Responder Triage** | One-click dispatch interface calculating the safest, congestion-penalized path to **Central Mela Hospital Hub (SEC_05)**. |

---

## 📊 Benchmark Sector Dataset (`kumbh_data.csv`)

| Sector ID | Sector Name | Latitude | Longitude | Max Capacity | Current Crowd | Risk Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC_01** | Sangam Nose (Main Bathing Ghat) | 25.4281 | 81.8847 | 5,000 | 4,250 | **CRITICAL / RED_ALERT** |
| **SEC_02** | Pontoon Bridge 3 (Choke Point) | 25.4310 | 81.8812 | 1,200 | 1,050 | **HIGH / RED_ALERT** |
| **SEC_03** | Akhara Sector 4 Tent City | 25.4240 | 81.8905 | 8,000 | 3,400 | **MODERATE_BIO_ALERT** |
| **SEC_04** | Subedarganj Holding Area | 25.4360 | 81.8750 | 10,000 | 3,800 | **SAFE / GREEN** |
| **SEC_05** | Central Mela Hospital Hub | 25.4295 | 81.8830 | 1,500 | 520 | **MEDICAL_HUB** |
| **SEC_06** | Arail Ghat Sector | 25.4190 | 81.8790 | 4,000 | 2,800 | **WARNING / AMBER** |

---

## 🛠️ Tech Stack

- **Backend**: Python 3.12, FastAPI, Uvicorn, NetworkX (Graph Pathfinding), Pydantic, CSV / Pandas
- **Frontend**: React 18, Tailwind CSS, Leaflet, React-Leaflet, Lucide Icons, Web Speech API (Bhashini Engine)
- **Deployment**: Single-port unified FastAPI server serving production Vite bundle with hot reload dev capabilities

---

## ⚡ Quickstart Guide

### Prerequisites
- Python 3.11+
- Node.js 18+

### 1. Start the Backend Server
```bash
# From repository root
cd CrowdShield--AI-Based-Crowd-and-Disaster-Management

# Activate virtual environment
.\venv\Scripts\activate

# Run FastAPI backend
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
The unified backend and compiled frontend will be live at:
- **Interactive Dashboard**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`

### 2. Run Frontend in Development Mode (Optional)
```bash
cd frontend
npm install
npm run dev
```
The Vite development server with hot-module reloading will run at `http://localhost:5173`.

### 3. One-Click Batch Scripts (Windows)
- Double-click **`start_crowdshield.bat`** to start the full system.
- Double-click **`dev_frontend.bat`** to start the Vite dev server.

---

## 🧪 Testing & Validation

Run the automated backend test suite:
```bash
python test_backend.py
```
**Test Results (100% Passed)**:
- `GET /health` ➔ `200 OK` (`HEALTHY`)
- `GET /api/kumbh-live-telemetry` ➔ `200 OK` (Sectors 6/6 verified with dynamic alert rules)
- `POST /api/dispatch-ambulance` ➔ `200 OK` (Dijkstra green corridor avoiding choke points)
- Invalid Sector Validation ➔ `400 Bad Request` properly handled

---

## 🎖️ Hackathon Submission Alignment

- **Event**: Viksit Bharat Young Leaders Dialogue (VBYLD)
- **Track**: Hack for Social Cause
- **Mission**: Zero-Preventable-Casualty Mass Gatherings via Indigenous AI & Edge Compute for Viksit Bharat 2047.
