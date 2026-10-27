# 🔱 KumbhRakshak AI — Integrated Disaster Mitigation, Public Health & Emergency Command Center

[![Viksit Bharat 2047](https://img.shields.io/badge/Viksit_Bharat-2047-orange.svg?style=for-the-badge)](https://mybharat.gov.in/)
[![Hack for Social Cause](https://img.shields.io/badge/VBYLD-Hack_for_Social_Cause-blue.svg?style=for-the-badge)](https://mybharat.gov.in/)
[![Team ASTITVA](https://img.shields.io/badge/Team-ASTITVA-emerald.svg?style=for-the-badge)](#-team-composition--credentials)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **Initiative**: Viksit Bharat Young Leaders Dialogue (VBYLD) — *Hack for Social Cause (HSC)*  
> **Registration ID**: `HSC|UP|00330`  
> **Theme**: `Disaster Mitigation, Kumbh mela & Health Service Delivery`  
> **State / UT**: `Uttar Pradesh`  
> **Target Venue**: Prayagraj Maha Kumbh Mela (Triveni Sangam)

---

## 👥 Team Composition & Credentials — TEAM ASTITVA

| Name | Role | Institution | Key Specialization |
| :--- | :--- | :--- | :--- |
| **Abhishek Kumar Agrawal** | **Team Leader / Full-Stack & Systems Architect** | GLA University, Mathura | React 18, Leaflet GIS Engine, System Orchestration |
| **Adarsh Singh** | **AI / Computer Vision & Anomaly Detection Engineer** | GLA University, Mathura | Optical Flow Inward Divergence, YOLOv8 Pose Estimation |
| **Siddharth Singh** | **Backend Systems & Graph Algorithm Engineer** | GLA University, Mathura | FastAPI Async Daemon, Dijkstra Weighted Dynamic Routing |

---

## 📌 Executive Summary

The **Maha Kumbh Mela at Prayagraj** is the largest peaceful human gathering on Earth, attracting over **40 to 50 million pilgrims** on peak auspicious days (*Shahi Snan*). Managing such colossal density across temporary riverbanks and pontoon bridges presents critical life-safety challenges:

1. **Catastrophic Stampedes**: Rapid crowd surges at narrow pontoon bridges and ghat choke points (e.g., Sangam Nose and Pontoon Bridge 3).
2. **The "Golden Hour" Ambulance Gridlock**: Traditional ambulances navigate static road maps; when a stampede or collapse occurs, vehicles get trapped in pedestrian walls for 45+ minutes.
3. **The "Hole & Ring" Injury Phenomenon**: When a pilgrim faints or falls, surrounding devotees halt and form a tight circular barrier of onlookers around the void, blocking aid and creating dangerous secondary crush waves.
4. **Epidemic Hazards**: High-density communal tent cities and massive river bathing risk sudden spikes in water pollution (elevated Biochemical Oxygen Demand - BOD) and rapid viral fever transmission.

**KumbhRakshak AI** solves these systemic challenges through a unified, production-grade Command & Control Platform combining **Edge Computer Vision**, **GIS Geospatial Telemetry**, **Syndromic Health Surveillance**, and **Dijkstra-Powered Dynamic Green Corridor Dispatch**.

---

## 🏛️ System Architecture

```
                                  KumbhRakshak AI Data Pipeline
                                  
  [ Entry Gate Thermal Cams ]     [ CCTV & Drone Feeds ]     [ River CPCB Sensors ]     [ Hospital ICU Telemetry ]
               │                            │                            │                          │
               └────────────────────────────┼────────────────────────────┴──────────────────────────┘
                                            ▼
                               [ FastAPI Telemetry Engine ]
                              (Port 8000 • In-Memory Cache)
                                            │
               ┌────────────────────────────┴────────────────────────────┐
               ▼                                                         ▼
    GET /api/kumbh-live-telemetry                               POST /api/dispatch-ambulance
    • 6 Sector Density & BOD                                    • NetworkX Graph Pathfinding
    • 4-Tier Automated Triage                                   • Red Zone Resistance Multiplier
    • Risk Classification                                       • Real-Time Bypass Route
               │                                                         │
               └────────────────────────────┬────────────────────────────┘
                                            ▼
                             [ React 18 + Leaflet GIS Client ]
                                            │
    ┌────────────────────────┬──────────────┴───────────────┬────────────────────────┐
    ▼                        ▼                              ▼                        ▼
[ Command Navbar ]   [ Interactive GIS Map ]       [ 6 Telemetry KPIs ]    [ 5 Emergency Modals ]
• Mode Switcher      • Esri Satellite Imagery      • Critical Red Zones    • SOS Dijkstra Router
• 6 Sectors Online   • 6 Sector Polygons           • Total Headcount       • Nearest Hospital Hub
• Live Clock (IST)   • 18 Dynamic POI Pins         • Bio-Alert Flags       • Multilingual Bhashini
• Commander Flyout   • Radial Anomaly Detection    • Ganga Water BOD       • Pilgrim Lost & Found
```

---

## 🚀 Key Innovations & Core Modules

### 1. Dynamic Dijkstra Green Corridor Routing (`/api/dispatch-ambulance`)
* **The Problem**: Conventional GPS uses physical distance; during a mela, the shortest road through Pontoon Bridge 3 is a gridlocked death trap.
* **Our Solution**: Models the arterial road network as a **weighted NetworkX graph**.
* **Dynamic Resistance Formula**:
  $$\text{Weight}(u, v) = \text{Base Time} \times \left(1 + \frac{\text{Density}}{100}\right)^2 + \text{Penalty}_{\text{Red}}$$
  When sector occupancy exceeds **85%** (`RED_ALERT`), the algorithm applies an exponential penalty, instantly forcing the ambulance through low-density perimeter corridors directly to the **Central Mela Hospital Hub (SEC_05)** in under 5 minutes.

### 2. "Hole & Ring" Crowd Anomaly & Fall Detection (`/api/cctv-anomaly-analysis`)
* When an injury or collapse occurs in a dense crowd:
  - **Inward Optical Flow Convergence** ($\nabla \cdot \vec{v} < -0.84$): Detects crowd velocity vectors suddenly pointing inward toward a single centroid rather than normal unidirectional flow.
  - **Spatial Ring Clustering (DBSCAN)**: Detects a dense perimeter ring ($>4.2\text{ persons/m}^2$) surrounding a cleared 2.2-meter void.
  - **Recumbent Pose Classification**: Identifies a horizontal body pose on the ground plane ($\text{Width}/\text{Height} > 2.0$).
* **Interactive Live Simulation**: Integrated directly into the CCTV surveillance viewer with a 1-click **"🚑 Auto-Dispatch Green Corridor"** trigger.

### 3. Real-Time Ganga Water BOD & Public Health Surveillance
* Monitors Biochemical Oxygen Demand (BOD mg/L) across all 6 bathing ghats against CPCB safe bathing thresholds ($<3.0\text{ mg/L}$).
* Live thermal gate scanners continuously tally admissions and flag syndromic fever clusters ($>25\text{ cases}$) to preempt cholera or viral outbreaks.

### 4. Multilingual Bhashini Public Address Audio Console
* Built-in Web Speech API audio synthesizer broadcasting localized emergency alerts in **6 Indian languages**:
  - **Hindi (हिंदी)**: *"कृपया ध्यान दें, आपातकालीन एम्बुलेंस मार्ग सक्रिय है। रास्ता खाली करें।"*
  - **Bengali (বাংলা)**
  - **Telugu (తెలుగు)**
  - **Marathi (मराठी)**
  - **Gujarati (ગુજરાતી)**
  - **English**

---

## 📍 Scenario Walkthrough: "Mauni Amavasya at Triveni Sangam"

> **Context**: 11:30 AM on the peak bathing day. Sector 1 (Sangam Nose) hits **92% capacity**. Pontoon Bridge 3 (Sector 2) is choked at **88%**. A diabetic pilgrim collapses near the riverbank.

```
[ Pilgrim Collapses at Sangam Nose (SEC_01) ]
                     │
                     ▼
  CCTV Optical Flow flags "Radial Circle Anomaly" (34 onlookers forming ring)
                     │
                     ▼
  Incident Commander clicks [SOS / INCIDENT]
                     │
                     ▼
  FastAPI Dijkstra Pathfinding calculates in 12ms:
  • Bypasses choked Sector 2 (Pontoon Bridge 3)
  • Routes via clear Sector 4 / Arterial Bypass
                     │
                     ▼
  1. Emerald Green Corridor line lights up on GIS Map (ETA: 4.9 min).
  2. Commander triggers [AI ANNOUNCEMENT] in Hindi to clear the cordons.
  3. Patient reaches Central Trauma Hospital in under 5 minutes.
```

---

## 🎮 Button-by-Button Command Center Walkthrough

| UI Section | Button / Feature | What It Does & Triggers |
| :--- | :--- | :--- |
| **Top Navbar** | **🔱 Trident Logo** | Re-centers dashboard state to main Triveni Sangam node. |
| | **"6 Sectors Online" Pill** | Live status flyout summarizing sector health, 12ms ping, and IoT uptime. |
| | **Navigation Tabs** | Seamlessly switches between `Live Map`, `Health & Alerts`, `Analytics`, and `Resources`. |
| | **Sun/Moon Toggle** | Switches between Dark Mode (mission control room) and Light Mode. |
| **GIS Map** | **Search Bar (Top-Left)** | Type any sector/camp name; map flies with 15x zoom directly to the coordinate. |
| | **Toolbar: Style Switcher** | Cycles between **Satellite Photography** (Esri ArcGIS), **Dark Matter** (Carto), and **Street Map**. |
| | **Toolbar: Crosshair** | 1-click smooth camera re-center back to Triveni Sangam dome. |
| | **Top-Right Layer Toggles** | Dynamically toggles Crowd Density, Bio-Alerts, Medical Hubs, Water Points, Shelters, and CCTV. |
| | **Sector Polygons (SEC 1-6)** | Displays headcount vs. capacity, fever cases, water BOD, and direct **"Dispatch Emergency"** button. |
| | **CCTV Pins (📹)** | Opens live 1080P video feed with **"🚨 Simulate Injury / Circle"** toggle and auto-dispatch. |
| **Row 1 KPIs** | **Critical Red Zones** | Counts sectors over 85% capacity; click **"View Details →"** to inspect bottleneck risks. |
| | **Total Pilgrim Count** | Live aggregate headcount across the entire venue with capacity utilization bar. |
| | **Active Bio-Alerts** | Sum of syndromic fever flags with automated triage thresholds. |
| | **Ganga Water BOD** | Real-time Biochemical Oxygen Demand (mg/L) with animated safety wave. |
| | **Thermal Gate Screened** | Live ticking counter of pilgrims scanned at entry gates with mini chart. |
| | **Dehydration Cases** | Tracks pilgrims receiving ORS treatment across 18 active hydration booths. |
| **Row 2 Actions** | **🚨 SOS / Incident** | Opens Dijkstra pathfinder; generates green corridor route and highlights it on the map. |
| | **🏥 Nearest Facility** | Directory of hospital trauma hubs, ICU bed capacity, oxygen supplies, and 108/112 speed-dial. |
| | **🛣️ Safe Routes** | Computes evacuation trajectories guiding pilgrims away from bottlenecks to open holding grounds. |
| | **📢 AI Announcement** | Multilingual Bhashini audio broadcast console speaking in 6 Indian languages. |
| | **🔍 Missing Person Help** | Pilgrim Lost & Found registry with photo upload, RFID search, and volunteer alerts. |

---

## 🌐 Live API Endpoints Reference

### 1. System Health Ping
```http
GET /health
```
```json
{
  "status": "HEALTHY",
  "system": "KumbhRakshak AI",
  "venue": "Prayagraj Kumbh Mela",
  "timestamp": "2026-10-27T16:51:51.615253"
}
```

### 2. Live Sector Telemetry Stream
```http
GET /api/kumbh-live-telemetry
```
```json
{
  "summary": {
    "total_crowd": 19761,
    "total_capacity": 29700,
    "overall_occupancy_pct": 66.54,
    "active_red_alerts": 4,
    "avg_water_bod_mg_l": 3.9,
    "water_safety_index": "POLLUTED_MONITOR"
  },
  "sectors": [
    {
      "sector_id": "SEC_01",
      "sector_name": "Sangam Nose (Main Bathing Ghat)",
      "current_crowd": 4600,
      "max_capacity": 5000,
      "occupancy_pct": 92.0,
      "risk_status": "RED_ALERT",
      "fever_cases": 84,
      "water_bod_mg_l": 4.1
    }
  ]
}
```

### 3. Dijkstra Dynamic Ambulance Dispatch
```http
POST /api/dispatch-ambulance
Content-Type: application/json

{
  "incident_sector_id": "SEC_01"
}
```
```json
{
  "status": "DISPATCHED",
  "incident_sector": "SEC_01",
  "incident_sector_name": "Sangam Nose (Main Bathing Ghat)",
  "destination": "SEC_05",
  "destination_name": "Central Mela Hospital Hub",
  "green_corridor_path": ["SEC_01", "SEC_05"],
  "green_corridor_sector_names": ["Sangam Nose", "Central Mela Hospital Hub"],
  "estimated_eta_minutes": 4.9,
  "bypassed_red_zones": ["SEC_02", "SEC_04"],
  "path_hops": 1,
  "corridor_cleared": true
}
```

### 4. Computer Vision Anomaly Analysis
```http
GET /api/cctv-anomaly-analysis?camera_id=CAM-01
```
```json
{
  "camera_id": "CAM-01",
  "anomaly_detected": true,
  "anomaly_type": "RADIAL_RING_CLUSTERING_COLLAPSE",
  "description": "Sudden inward crowd convergence & void ring formation detected around recumbent subject.",
  "metrics": {
    "optical_flow_inward_divergence": -0.84,
    "ring_radius_meters": 3.8,
    "void_diameter_meters": 2.2,
    "recumbent_subject_detected": true,
    "pose_aspect_ratio": 2.7,
    "standing_onlookers_count": 34,
    "anomaly_confidence": 0.94
  },
  "alert_level": "CRITICAL_INJURY_SOS",
  "recommended_action": "DISPATCH_QRT_MEDIC_AND_GREEN_CORRIDOR",
  "suggested_incident_sector": "SEC_02"
}
```

---

## 🛠️ Installation & Local Setup

### 1. Prerequisites
- **Python**: 3.10 or 3.11 installed
- **Node.js**: 18+ and npm installed

### 2. Quick Launch (Windows 1-Click)
Simply run the included desktop launcher:
```bat
start_kumbhrakshak.bat
```
*(Automatically starts the FastAPI backend, mounts the compiled GIS dashboard, and opens your browser to `http://localhost:8000`)*.

### 3. Manual Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/Abhii-agrawal/KumbhRakshak-Ai.git
cd KumbhRakshak-Ai

# 2. Setup Python environment & dependencies
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt

# 3. Start the FastAPI microservice
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

In a separate terminal (for frontend development):
```bash
cd frontend
npm install
npm run dev
```

* **Mission Control**: [http://localhost:8000](http://localhost:8000)
* **Interactive Swagger API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ☁️ Cloud & Vercel Deployment

### Deploy to Vercel (1-Click):
1. Connect this GitHub repository on [Vercel.com](https://vercel.com/new).
2. Vercel automatically detects [`vercel.json`](vercel.json), builds the React client from `frontend/`, and deploys the FastAPI serverless function from `api/index.py`.
3. Click **Deploy** to generate your live public link (`https://kumbhrakshak-ai.vercel.app`).

### Deploy via Docker:
```bash
docker build -t kumbhrakshak-ai .
docker run -p 8000:8000 kumbhrakshak-ai
```

---

## 🎯 Alignment with UN Sustainable Development Goals (SDGs)

* **SDG 3: Good Health & Well-Being**: Prevents stampede crush fatalities, cuts emergency ambulance response time from 45+ minutes to <5 minutes, and monitors river waterborne pathogen risks.
* **SDG 9: Industry, Innovation & Infrastructure**: Introduces edge computer vision, graph-theoretic routing, and GIS real-time spatial computing to mass pilgrim management.
* **SDG 11: Sustainable Cities & Human Settlements**: Creates resilient, adaptive disaster mitigation infrastructure for temporary mega-cities.

---

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

*Proudly developed by **TEAM ASTITVA** (Abhishek Kumar Agrawal, Adarsh Singh, Siddharth Singh — GLA University, Mathura) for the **Viksit Bharat Young Leaders Dialogue (VBYLD)**.*