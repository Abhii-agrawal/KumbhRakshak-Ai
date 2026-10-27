import React, { useState, useEffect } from 'react';
import { GISMap } from '../components/GISMap';
import { HealthAndVoicePanel } from '../components/HealthAndVoicePanel';
import { CrowdMetrics } from '../components/CrowdMetrics';
import { EmergencyRouter } from '../components/EmergencyRouter';
import { 
  ShieldAlert, 
  Radio, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  Activity, 
  Layers, 
  AlertTriangle 
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const Index = () => {
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [activeCorridorRoute, setActiveCorridorRoute] = useState(null);
  const [selectedSectorId, setSelectedSectorId] = useState('SEC_01');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Poll live telemetry from /api/kumbh-live-telemetry
  const fetchTelemetry = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/kumbh-live-telemetry`);
      if (res.ok) {
        const data = await res.json();
        setTelemetry(data);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.warn('Telemetry poll notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    if (!autoRefresh) return;
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const sectors = telemetry?.sectors || [];
  const summary = telemetry?.summary || {};

  // When user clicks "Report Emergency" on map popup, pass to Emergency Router
  const handleReportEmergencyFromMap = (sectorId) => {
    setSelectedSectorId(sectorId);
    // Smooth scroll to emergency router
    const el = document.getElementById('emergency-router-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased selection:bg-rose-500 selection:text-white">
      {/* Top Global Command Navigation Bar */}
      <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800 shadow-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Hackathon Title */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-indigo-600 shadow-lg shadow-rose-600/30">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>KumbhRakshak AI</span>
                  <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full font-mono">
                    v2.0
                  </span>
                </h1>
                <span className="hidden sm:inline-block text-gray-500">|</span>
                <span className="hidden sm:inline-flex items-center space-x-1 text-xs text-amber-300/90 font-medium bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>VBYLD Hack for Social Cause</span>
                </span>
              </div>
              <p className="text-xs text-gray-400">
                AI Stampede Prevention, Bio-Surveillance &amp; Dynamic Green Corridor • Prayagraj Triveni Sangam
              </p>
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center space-x-3 self-end md:self-auto text-xs">
            {/* Live Indicator */}
            <div className="flex items-center space-x-2 bg-gray-850 px-3 py-1.5 rounded-lg border border-gray-700/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-gray-300 font-medium">LIVE TELEMETRY</span>
              {lastUpdated && <span className="text-gray-500 font-mono">({lastUpdated})</span>}
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={fetchTelemetry}
              className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 transition-all active:scale-95"
              title="Refresh telemetry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Command Center Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Top Section: GIS Map & Sector Crowd Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: GIS Leaflet Map (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm font-bold text-gray-200">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Geospatial Sector Grid (Prayagraj Triveni Sangam)</span>
              </div>
              <span className="text-xs text-gray-400">Click marker for sector inspection</span>
            </div>

            <GISMap
              sectors={sectors}
              onReportEmergency={handleReportEmergencyFromMap}
              greenCorridorRoute={activeCorridorRoute}
            />
          </div>

          {/* Right: Health, Water & AI Bhashini Voice Command (5 cols) */}
          <div className="lg:col-span-5">
            <HealthAndVoicePanel
              telemetrySummary={summary}
              sectors={sectors}
            />
          </div>
        </div>

        {/* Middle Section: Crowd Density Progress & Status Badges */}
        <div className="w-full">
          <CrowdMetrics
            sectors={sectors}
            summary={summary}
            selectedSectorId={selectedSectorId}
            onSelectSector={(sid) => setSelectedSectorId(sid)}
          />
        </div>

        {/* Bottom Section: Dynamic Ambulance Green Corridor Router */}
        <div id="emergency-router-section" className="w-full">
          <EmergencyRouter
            sectors={sectors}
            initialSelectedSector={selectedSectorId}
            onRouteCalculated={(routeData) => setActiveCorridorRoute(routeData)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-gray-950 py-6 text-center text-xs text-gray-500">
        <p>
          KumbhRakshak AI • Developed for <span className="text-gray-300 font-semibold">Viksit Bharat Young Leaders Dialogue (VBYLD)</span>
        </p>
        <p className="mt-1 text-[11px] text-gray-600">
          Target Deployment: Prayagraj Kumbh Mela • Triveni Sangam Sector Command Center
        </p>
      </footer>
    </div>
  );
};

export default Index;
