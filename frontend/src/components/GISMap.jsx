import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Polygon, 
  Marker, 
  Popup, 
  Polyline, 
  useMap 
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  Search, 
  Layers, 
  Map as MapIcon, 
  Crosshair, 
  Plus, 
  Minus, 
  AlertTriangle, 
  Users, 
  Thermometer, 
  Droplet, 
  Activity, 
  Navigation,
  Tent,
  Video
} from 'lucide-react';
import { MapLayersPanel } from './MapLayersPanel';

// Fix standard Leaflet default marker icons safely
try {
  if (L?.Icon?.Default?.prototype) {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }
} catch (e) {
  console.warn('Leaflet icon config ignored:', e);
}

// Prayagraj Sangam Core benchmark coordinates
const PRAYAGRAJ_SANGAM_COORDS = [25.4281, 81.8847];

// Tile Layer Providers
const TILE_PROVIDERS = {
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
    subdomains: 'abc',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
  },
  street: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abc',
  },
};

// Sector Polygon Boundaries matching Prayagraj Ghats around Triveni Sangam
const SECTOR_POLYGONS = {
  SEC_01: {
    id: 'SEC_01',
    name: 'Sector 1',
    full_name: 'Sangam Nose (Main Bathing Ghat)',
    coords: [
      [25.4365, 81.8725],
      [25.4395, 81.8860],
      [25.4315, 81.8865],
      [25.4285, 81.8765],
    ],
    center: [25.4340, 81.8810],
    defaultDensity: 92,
    color: '#EF4444',
    fillColor: 'rgba(239, 68, 68, 0.40)',
    hasWarning: true,
  },
  SEC_02: {
    id: 'SEC_02',
    name: 'Sector 2',
    full_name: 'Pontoon Bridge 3 (Choke Point)',
    coords: [
      [25.4395, 81.8860],
      [25.4410, 81.8970],
      [25.4330, 81.8995],
      [25.4315, 81.8865],
    ],
    center: [25.4365, 81.8920],
    defaultDensity: 68,
    color: '#F59E0B',
    fillColor: 'rgba(245, 158, 11, 0.40)',
    hasMedical: true,
  },
  SEC_03: {
    id: 'SEC_03',
    name: 'Sector 3',
    full_name: 'Akhara Sector 4 Tent City',
    coords: [
      [25.4410, 81.8970],
      [25.4405, 81.9090],
      [25.4325, 81.9095],
      [25.4330, 81.8995],
    ],
    center: [25.4370, 81.9040],
    defaultDensity: 42,
    color: '#10B981',
    fillColor: 'rgba(16, 185, 129, 0.40)',
    hasShelter: true,
  },
  SEC_04: {
    id: 'SEC_04',
    name: 'Sector 4',
    full_name: 'Subedarganj Holding Area',
    coords: [
      [25.4280, 81.8690],
      [25.4285, 81.8765],
      [25.4215, 81.8755],
      [25.4210, 81.8680],
    ],
    center: [25.4250, 81.8725],
    defaultDensity: 88,
    color: '#EF4444',
    fillColor: 'rgba(239, 68, 68, 0.40)',
    hasWarning: true,
    hasShelter: true,
  },
  SEC_05: {
    id: 'SEC_05',
    name: 'Sector 5',
    full_name: 'Central Mela Hospital Hub',
    coords: [
      [25.4270, 81.8785],
      [25.4265, 81.8950],
      [25.4200, 81.8945],
      [25.4205, 81.8780],
    ],
    center: [25.4235, 81.8865],
    defaultDensity: 55,
    color: '#F59E0B',
    fillColor: 'rgba(245, 158, 11, 0.40)',
    hasMedical: true,
  },
  SEC_06: {
    id: 'SEC_06',
    name: 'Sector 6',
    full_name: 'Arail Ghat Sector',
    coords: [
      [25.4265, 81.8950],
      [25.4320, 81.9160],
      [25.4240, 81.9170],
      [25.4200, 81.8945],
    ],
    center: [25.4260, 81.9050],
    defaultDensity: 31,
    color: '#10B981',
    fillColor: 'rgba(16, 185, 129, 0.40)',
    hasGreenPulse: true,
  },
};

// Predefined POI Markers across Prayagraj Sangam grounds
const POI_MARKERS = [
  // Medical Facilities (cyan cross in blue circle)
  { type: 'medical', lat: 25.4335, lon: 81.8730, label: 'Sector 1 First Aid' },
  { type: 'medical', lat: 25.4375, lon: 81.8935, label: 'Pontoon 3 Medical Desk' },
  { type: 'medical', lat: 25.4345, lon: 81.9015, label: 'Sector 3 Medical Post' },
  { type: 'medical', lat: 25.4245, lon: 81.8755, label: 'Sector 4 Emergency Clinic' },
  { type: 'medical', lat: 25.4225, lon: 81.8885, label: 'Central Hospital Trauma Hub' },

  // Water Points (cyan droplet)
  { type: 'water', lat: 25.4300, lon: 81.8795, label: 'Sangam Water Station 1' },
  { type: 'water', lat: 25.4275, lon: 81.8880, label: 'Triveni Pure Water Post' },
  { type: 'water', lat: 25.4215, lon: 81.8710, label: 'Subedarganj Hydration Booth' },
  { type: 'water', lat: 25.4285, lon: 81.9080, label: 'Arail Ghat Water Dispenser' },

  // Shelters (green tent)
  { type: 'shelter', lat: 25.4365, lon: 81.9065, label: 'Akhara Camp Cluster A' },
  { type: 'shelter', lat: 25.4270, lon: 81.8715, label: 'Holding Area Dormitory' },
  { type: 'shelter', lat: 25.4230, lon: 81.8815, label: 'Sangam Pilgrim Night Shelter' },

  // Live CCTV Cameras
  { type: 'cctv', lat: 25.4320, lon: 81.8835, label: 'Pontoon Bridge 3 Camera 01' },
  { type: 'cctv', lat: 25.4275, lon: 81.8830, label: 'Sangam Nose North Camera 04' },
  { type: 'cctv', lat: 25.4340, lon: 81.8950, label: 'Sector 2 Arterial Camera 02' },

  // Incident Alert Markers (Red warning circle)
  { type: 'incident', lat: 25.4350, lon: 81.8830, label: 'High Density Bottleneck' },
  { type: 'incident', lat: 25.4230, lon: 81.8735, label: 'Queue Choke Alert' },
  { type: 'incident', lat: 25.4360, lon: 81.9080, label: 'Bio Triage Sector 4 Notice' },
];

// Helper to create HTML DivIcons
const createSectorBadgeIcon = (name, density, color) => {
  return L.divIcon({
    className: 'custom-sector-badge-wrapper',
    html: `
      <div style="
        background: rgba(13, 19, 31, 0.88);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.7);
        border-radius: 12px;
        padding: 5px 10px;
        color: #ffffff;
        font-family: ui-sans-serif, system-ui, sans-serif;
        text-align: center;
        min-width: 78px;
        backdrop-filter: blur(8px);
        transform: translate(-50%, -50%);
        pointer-events: auto;
        cursor: pointer;
      ">
        <div style="font-size: 11px; font-weight: 700; letter-spacing: -0.01em; color: #f1f5f9;">
          ${name}
        </div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 3px; font-size: 11px; font-weight: 800; color: ${color}; margin-top: 1px;">
          <span style="font-size: 10px;">👥</span>
          <span>${density}%</span>
        </div>
      </div>
    `,
    iconSize: [80, 40],
    iconAnchor: [40, 20],
  });
};

const createSangamCenterIcon = () => {
  return L.divIcon({
    className: 'custom-sangam-center-wrapper',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translate(-50%, -50%); pointer-events: none;">
        <!-- Pulsing concentric rings -->
        <div style="position: absolute; width: 68px; height: 68px; border-radius: 50%; border: 1.5px solid rgba(56, 189, 248, 0.5); animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid rgba(56, 189, 248, 0.8); background: rgba(14, 165, 233, 0.15);"></div>
        
        <!-- Center Dome / Temple Badge -->
        <div style="width: 32px; height: 32px; border-radius: 50%; background: #0f172a; border: 2px solid #38bdf8; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(56, 189, 248, 0.8); z-index: 10;">
          <span style="font-size: 16px;">🛕</span>
        </div>
        
        <!-- Triveni Sangam Label -->
        <div style="margin-top: 6px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(6px); border: 1px solid rgba(56, 189, 248, 0.4); padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 800; color: #ffffff; letter-spacing: 0.02em; white-space: nowrap; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);">
          Triveni Sangam
        </div>
      </div>
    `,
    iconSize: [80, 80],
    iconAnchor: [40, 40],
  });
};

const createRiverLabelIcon = (name, color = '#38bdf8') => {
  return L.divIcon({
    className: 'custom-river-label',
    html: `
      <div style="
        font-family: Georgia, Cambria, 'Times New Roman', serif;
        font-style: italic;
        font-weight: 700;
        font-size: 15px;
        color: ${color};
        opacity: 0.85;
        letter-spacing: 0.12em;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9), 0 0 12px rgba(56, 189, 248, 0.4);
        transform: translate(-50%, -50%);
        pointer-events: none;
        user-select: none;
      ">
        ${name}
      </div>
    `,
    iconSize: [80, 24],
    iconAnchor: [40, 12],
  });
};

const createPlaceLabelIcon = (name) => {
  return L.divIcon({
    className: 'custom-place-label',
    html: `
      <div style="
        font-family: ui-sans-serif, system-ui, sans-serif;
        font-weight: 700;
        font-size: 13px;
        color: #e2e8f0;
        letter-spacing: 0.08em;
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.95);
        transform: translate(-50%, -50%);
        pointer-events: none;
        user-select: none;
      ">
        ${name}
      </div>
    `,
    iconSize: [70, 20],
    iconAnchor: [35, 10],
  });
};

const createPOIIcon = (type) => {
  let content = '';
  if (type === 'medical') {
    content = `<div style="width: 22px; height: 22px; border-radius: 50%; background: #0284c7; border: 1.5px solid #38bdf8; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);"><span style="color: #ffffff; font-size: 13px; font-weight: 900; line-height: 1;">+</span></div>`;
  } else if (type === 'water') {
    content = `<div style="width: 22px; height: 22px; border-radius: 50%; background: #0369a1; border: 1.5px solid #38bdf8; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);"><span style="color: #ffffff; font-size: 11px;">💧</span></div>`;
  } else if (type === 'shelter') {
    content = `<div style="width: 22px; height: 22px; border-radius: 50%; background: #065f46; border: 1.5px solid #34d399; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);"><span style="color: #ffffff; font-size: 11px;">⛺</span></div>`;
  } else if (type === 'cctv') {
    content = `<div style="width: 22px; height: 22px; border-radius: 50%; background: #1e293b; border: 1.5px solid #94a3b8; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);"><span style="color: #ffffff; font-size: 11px;">📹</span></div>`;
  } else if (type === 'incident') {
    content = `<div style="width: 22px; height: 22px; border-radius: 50%; background: #dc2626; border: 1.5px solid #f87171; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);"><span style="color: #ffffff; font-size: 11px; font-weight: 900;">!</span></div>`;
  }

  return L.divIcon({
    className: 'custom-poi-marker',
    html: `<div style="transform: translate(-50%, -50%); cursor: pointer;">${content}</div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
};

// Map View Controller for Zoom & Pan triggers
const MapController = ({ center, zoom, searchTarget, mapRef }) => {
  const map = useMap();

  useEffect(() => {
    if (mapRef) {
      mapRef.current = map;
    }
    // Invalidate size on load to guarantee zero gray gaps
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);
    const t3 = setTimeout(() => map.invalidateSize(), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [map, mapRef]);

  useEffect(() => {
    if (searchTarget) {
      map.flyTo(searchTarget, 15, { duration: 1.2 });
    }
  }, [searchTarget, map]);

  return null;
};

export const GISMap = ({ 
  sectors = [], 
  onSelectSector, 
  greenCorridorRoute = null, 
  onTriggerSOS,
  onOpenCCTV
}) => {
  const [mapStyle, setMapStyle] = useState('satellite'); // 'satellite' | 'dark' | 'street'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState(null);
  const [layersOpen, setLayersOpen] = useState(true);
  const mapRef = useRef(null);

  // Layer toggles
  const [layers, setLayers] = useState({
    crowdDensity: true,
    bioAlerts: true,
    medicalFacilities: true,
    waterPoints: true,
    shelters: true,
    sectors: true,
    liveCctv: true,
  });

  const toggleLayer = (layerId) => {
    setLayers((prev) => ({ ...prev, [layerId]: !prev[layerId] }));
  };

  // Combine static polygon configuration with dynamic backend telemetry
  const sectorData = useMemo(() => {
    return Object.values(SECTOR_POLYGONS).map((poly) => {
      const match = sectors.find((s) => s.sector_id === poly.id);
      const density = match ? match.occupancy_pct : poly.defaultDensity;
      let color = '#10B981';
      let fillColor = 'rgba(16, 185, 129, 0.40)';

      if (density > 85) {
        color = '#EF4444';
        fillColor = 'rgba(239, 68, 68, 0.42)';
      } else if (density > 65) {
        color = '#F59E0B';
        fillColor = 'rgba(245, 158, 11, 0.42)';
      }

      return {
        ...poly,
        density,
        color,
        fillColor,
        current_crowd: match?.current_crowd || 4200,
        max_capacity: match?.max_capacity || 5000,
        fever_cases: match?.fever_cases || 14,
        water_bod: match?.water_bod_mg_l || 2.8,
        risk_status: match?.risk_status || (density > 85 ? 'RED_ALERT' : density > 65 ? 'AMBER_WARNING' : 'GREEN_SAFE'),
      };
    });
  }, [sectors]);

  // Handle search filter
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    const found = sectorData.find(
      (s) => s.name.toLowerCase().includes(q) || s.full_name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    );
    if (found) {
      setSearchTarget(found.center);
    }
  };

  // Build route polyline latlngs if green corridor active
  const corridorLatLngs = useMemo(() => {
    if (!greenCorridorRoute || !greenCorridorRoute.green_corridor_path) return null;
    const sectorMap = new Map(sectorData.map((s) => [s.id, s.center]));
    return greenCorridorRoute.green_corridor_path.map((sid) => sectorMap.get(sid)).filter(Boolean);
  }, [greenCorridorRoute, sectorData]);

  const activeTile = TILE_PROVIDERS[mapStyle] || TILE_PROVIDERS.satellite;

  return (
    <div 
      className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl bg-[#070B13] select-none"
      style={{ height: '620px', minHeight: '620px', width: '100%' }}
    >
      {/* ------------------------------------------------------------- */}
      {/* Top-Left Floating Search Box                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-auto">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search sector, camp, facility..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 sm:w-72 bg-[#0B111D]/85 backdrop-blur-md border border-slate-700/80 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-400 shadow-xl focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 pr-9 transition-all"
          />
          <button type="submit" className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white">
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Left Floating Toolbar: Layers, Styles, Crosshair, Zoom       */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute top-20 left-4 z-[1000] bg-[#0B111D]/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-1.5 flex flex-col items-center space-y-2 text-slate-300 shadow-2xl pointer-events-auto">
        {/* Toggle Layers Card */}
        <button
          onClick={() => setLayersOpen(!layersOpen)}
          className={`p-2 rounded-xl transition-colors ${
            layersOpen ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
          }`}
          title="Toggle Map Layers Panel"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Toggle Map Satellite / Dark Tile Style */}
        <button
          onClick={() => {
            const next = mapStyle === 'satellite' ? 'dark' : mapStyle === 'dark' ? 'street' : 'satellite';
            setMapStyle(next);
          }}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title={`Switch Map Style (Currently: ${mapStyle.toUpperCase()})`}
        >
          <MapIcon className="w-4 h-4" />
        </button>

        {/* Recenter on Sangam */}
        <button
          onClick={() => {
            mapRef.current?.flyTo(PRAYAGRAJ_SANGAM_COORDS, 14, { duration: 1.0 });
          }}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Recenter on Triveni Sangam"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-4 h-[1px] bg-slate-700 my-0.5"></div>

        {/* Zoom In */}
        <button
          onClick={() => {
            mapRef.current?.zoomIn();
          }}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => {
            mapRef.current?.zoomOut();
          }}
          className="p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Top-Right Floating Layers Box                                 */}
      {/* ------------------------------------------------------------- */}
      {layersOpen && (
        <div className="absolute top-4 right-4 z-[1000] pointer-events-auto">
          <MapLayersPanel layers={layers} onToggleLayer={toggleLayer} />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Bottom-Right Floating Crowd Density Legend                    */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-[#0B111D]/90 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3 shadow-2xl min-w-[170px] pointer-events-auto select-none">
        <div className="text-[11px] font-bold text-slate-300 mb-1.5 px-0.5">
          Crowd Density
        </div>
        <div className="w-full h-2 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600 shadow-inner"></div>
        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 px-0.5 font-medium">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Active Green Corridor Notification on Map                     */}
      {/* ------------------------------------------------------------- */}
      {greenCorridorRoute && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-emerald-950/90 border border-emerald-500/70 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl flex items-center space-x-3 text-emerald-200 text-xs animate-bounce pointer-events-auto">
          <Navigation className="w-4 h-4 text-emerald-400 animate-spin" />
          <div className="flex items-center space-x-2">
            <span className="font-bold text-emerald-300">GREEN CORRIDOR ACTIVE</span>
            <span className="text-slate-400">•</span>
            <span>ETA: {greenCorridorRoute.estimated_eta_minutes} min to Central Hospital</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Main Leaflet Map Engine                                       */}
      {/* ------------------------------------------------------------- */}
      <MapContainer
        center={PRAYAGRAJ_SANGAM_COORDS}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full z-0"
        style={{ height: '100%', width: '100%', background: '#070B13' }}
      >
        <MapController center={PRAYAGRAJ_SANGAM_COORDS} zoom={14} searchTarget={searchTarget} mapRef={mapRef} />

        {/* Tile Layer (Satellite Aerial Photography or Dark Matter) */}
        <TileLayer
          key={activeTile.url}
          attribution={activeTile.attribution}
          url={activeTile.url}
          subdomains={activeTile.subdomains || 'abc'}
          maxZoom={19}
        />

        {/* River Watermark Typography Overlay */}
        <Marker position={[25.4385, 81.8720]} icon={createRiverLabelIcon('Ganga', '#38bdf8')} />
        <Marker position={[25.4245, 81.8920]} icon={createRiverLabelIcon('Yamuna', '#38bdf8')} />

        {/* Regional Place Labels: Naini & Jhunsi */}
        <Marker position={[25.4190, 81.8610]} icon={createPlaceLabelIcon('Naini')} />
        <Marker position={[25.4310, 81.9160]} icon={createPlaceLabelIcon('Jhunsi')} />

        {/* Triveni Sangam Center Radar & Dome Pin */}
        <Marker position={PRAYAGRAJ_SANGAM_COORDS} icon={createSangamCenterIcon()} />

        {/* Green Corridor Polyline Route if active */}
        {corridorLatLngs && Array.isArray(corridorLatLngs) && corridorLatLngs.length > 1 && (
          <>
            <Polyline
              positions={corridorLatLngs}
              pathOptions={{
                color: '#10B981',
                weight: 8,
                opacity: 0.55,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            <Polyline
              positions={corridorLatLngs}
              pathOptions={{
                color: '#34D399',
                weight: 4,
                opacity: 0.95,
                dashArray: '8, 8',
              }}
            />
          </>
        )}

        {/* Sector Polygons & Center Badge Markers */}
        {layers.sectors !== false &&
          sectorData.map((sec) => (
            <React.Fragment key={sec.id}>
              {/* Sector Area Polygon Overlay */}
              {Array.isArray(sec.coords) && sec.coords.length >= 3 && (
                <Polygon
                  positions={sec.coords}
                  pathOptions={{
                    color: sec.color,
                    fillColor: sec.fillColor,
                    fillOpacity: layers.crowdDensity !== false ? 0.42 : 0.15,
                    weight: 2,
                    dashArray: sec.density > 85 ? '4, 4' : undefined,
                  }}
                  eventHandlers={{
                    click: () => onSelectSector && onSelectSector(sec),
                  }}
                />
              )}

              {/* Sector Center Badge (e.g. "Sector 1 \n 👥 92%") */}
              {layers.crowdDensity !== false && (
                <Marker
                  position={sec.center}
                  icon={createSectorBadgeIcon(sec.name, sec.density, sec.color)}
                  eventHandlers={{
                    click: () => onSelectSector && onSelectSector(sec),
                  }}
                >
                  <Popup className="kumbh-custom-popup">
                    <div className="bg-[#0B111D] text-slate-100 p-4 rounded-2xl border border-slate-700 min-w-[240px] shadow-2xl font-sans">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
                        <div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">{sec.id}</div>
                          <div className="font-bold text-sm text-white">{sec.full_name}</div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${sec.color}25`, color: sec.color, border: `1px solid ${sec.color}50` }}>
                          {sec.density}%
                        </span>
                      </div>

                      <div className="text-xs space-y-1.5 text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Headcount:</span>
                          <span className="font-mono font-bold text-white">{sec.current_crowd.toLocaleString()} / {sec.max_capacity.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Fever Flags:</span>
                          <span className="font-mono text-purple-300 font-bold">{sec.fever_cases} cases</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Water BOD:</span>
                          <span className="font-mono text-cyan-300 font-bold">{sec.water_bod} mg/L</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onTriggerSOS && onTriggerSOS(sec.id)}
                        className="mt-3 w-full py-1.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Dispatch Emergency</span>
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )}
            </React.Fragment>
          ))}

        {/* Scattered POI Markers */}
        {POI_MARKERS.map((poi, idx) => {
          if (poi.type === 'medical' && layers.medicalFacilities === false) return null;
          if (poi.type === 'water' && layers.waterPoints === false) return null;
          if (poi.type === 'shelter' && layers.shelters === false) return null;
          if (poi.type === 'cctv' && layers.liveCctv === false) return null;
          if (poi.type === 'incident' && layers.bioAlerts === false) return null;

          return (
            <Marker key={idx} position={[poi.lat, poi.lon]} icon={createPOIIcon(poi.type)}>
              <Popup className="kumbh-custom-popup">
                <div className="bg-[#0B111D] text-slate-100 p-3 rounded-2xl border border-slate-700 min-w-[210px] text-xs font-sans space-y-2">
                  <div>
                    <div className="font-bold text-white text-xs">{poi.label}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-mono">
                      {poi.type.toUpperCase()} NODE • 24/7 ONLINE
                    </div>
                  </div>

                  {poi.type === 'cctv' && (
                    <button
                      onClick={() => onOpenCCTV && onOpenCCTV(poi)}
                      className="w-full py-1.5 px-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-cyan-600/30 active:scale-95"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>View Live HD Stream</span>
                    </button>
                  )}

                  {poi.type === 'medical' && (
                    <button
                      onClick={() => onTriggerSOS && onTriggerSOS('SEC_05')}
                      className="w-full py-1.5 px-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-sky-600/30 active:scale-95"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Route Ambulance Here</span>
                    </button>
                  )}

                  {poi.type === 'incident' && (
                    <button
                      onClick={() => onTriggerSOS && onTriggerSOS('SEC_01')}
                      className="w-full py-1.5 px-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-red-600/30 active:scale-95"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Deploy QRT Team</span>
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default GISMap;
