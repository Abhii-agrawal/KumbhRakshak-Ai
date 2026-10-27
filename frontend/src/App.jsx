import React, { useState, useEffect } from 'react';
import { CommandNavbar } from './components/CommandNavbar';
import { GISMap } from './components/GISMap';
import { KPIDashboard } from './components/KPIDashboard';
import { ActionToolbar } from './components/ActionToolbar';
import { SOSModal } from './components/SOSModal';
import { RedZonesModal } from './components/RedZonesModal';
import { CCTVModal } from './components/CCTVModal';
import { AnnouncementModal } from './components/AnnouncementModal';
import { FacilityModal } from './components/FacilityModal';
import { MissingPersonModal } from './components/MissingPersonModal';
import { HealthAlertsView } from './components/HealthAlertsView';
import { AnalyticsView } from './components/AnalyticsView';
import { ResourcesView } from './components/ResourcesView';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const App = () => {
  const [telemetry, setTelemetry] = useState(null);
  const [activeTab, setActiveTab] = useState('live-map');
  const [thermalCount, setThermalCount] = useState(148566);
  const [activeCorridorRoute, setActiveCorridorRoute] = useState(null);

  // Modals
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosDefaultSector, setSosDefaultSector] = useState('SEC_01');
  const [redZonesModalOpen, setRedZonesModalOpen] = useState(false);
  const [cctvModalOpen, setCctvModalOpen] = useState(false);
  const [selectedCctv, setSelectedCctv] = useState(null);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [facilityModalOpen, setFacilityModalOpen] = useState(false);
  const [missingModalOpen, setMissingModalOpen] = useState(false);

  // Poll live telemetry from /api/kumbh-live-telemetry every 3 seconds
  const fetchTelemetry = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/kumbh-live-telemetry`);
      if (res.ok) {
        const data = await res.json();
        setTelemetry(data);
      }
    } catch (err) {
      console.warn('Telemetry poll notice:', err);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  // Tick the thermal gate screened counter continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setThermalCount((prev) => prev + Math.floor(Math.random() * 6) + 2);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const sectors = telemetry?.sectors || [];
  const summary = telemetry?.summary || {};

  const handleOpenSOS = (sectorId = 'SEC_01') => {
    setSosDefaultSector(sectorId);
    setSosModalOpen(true);
  };

  const handleOpenCCTV = (camera) => {
    setSelectedCctv(camera);
    setCctvModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070B13] text-slate-100 font-sans antialiased selection:bg-rose-500 selection:text-white flex flex-col w-full">
      {/* ------------------------------------------------------------- */}
      {/* 1. Top Navbar                                                 */}
      {/* ------------------------------------------------------------- */}
      <CommandNavbar 
        activeTab={activeTab} 
        onTabChange={(tabId) => setActiveTab(tabId)} 
        redAlertCount={summary.active_red_alerts || 4} 
      />

      {/* ------------------------------------------------------------- */}
      {/* 2. Main Dynamic Content Switcher                              */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 w-full flex flex-col p-3 sm:p-4 space-y-3.5 max-w-[1920px] mx-auto">
        {activeTab === 'live-map' && (
          <>
            {/* Leaflet Satellite Map with all overlays */}
            <div className="w-full flex-1 min-h-[580px] lg:min-h-[620px]">
              <GISMap
                sectors={sectors}
                greenCorridorRoute={activeCorridorRoute}
                onTriggerSOS={handleOpenSOS}
                onOpenCCTV={handleOpenCCTV}
                onSelectSector={(sec) => {
                  handleOpenSOS(sec.id);
                }}
              />
            </div>

            {/* Bottom Dashboard (Two Rows of Glassmorphic Cards) */}
            <div className="w-full space-y-3">
              {/* Row 1: 6 KPI Telemetry Cards */}
              <KPIDashboard
                summary={summary}
                sectors={sectors}
                thermalCount={thermalCount}
                onViewRedZoneDetails={() => setRedZonesModalOpen(true)}
              />

              {/* Row 2: 5 Interactive Action Trigger Cards */}
              <ActionToolbar
                onTriggerSOS={() => handleOpenSOS('SEC_01')}
                onFindFacility={() => setFacilityModalOpen(true)}
                onSafeRoutes={() => handleOpenSOS('SEC_02')}
                onOpenAnnouncements={() => setAnnouncementModalOpen(true)}
                onMissingPerson={() => setMissingModalOpen(true)}
              />
            </div>
          </>
        )}

        {/* Health & Alerts Tab View */}
        {activeTab === 'health-alerts' && (
          <HealthAlertsView summary={summary} sectors={sectors} />
        )}

        {/* Analytics Tab View */}
        {activeTab === 'analytics' && (
          <AnalyticsView summary={summary} sectors={sectors} />
        )}

        {/* Resources Tab View */}
        {activeTab === 'resources' && (
          <ResourcesView />
        )}
      </main>

      {/* ------------------------------------------------------------- */}
      {/* 3. Interactive Modals                                         */}
      {/* ------------------------------------------------------------- */}
      <SOSModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        sectors={sectors}
        defaultOriginSector={sosDefaultSector}
        onRouteCalculated={(route) => setActiveCorridorRoute(route)}
      />

      <RedZonesModal
        isOpen={redZonesModalOpen}
        onClose={() => setRedZonesModalOpen(false)}
        sectors={sectors}
        onDispatchSector={(sectorId) => handleOpenSOS(sectorId)}
      />

      <CCTVModal
        isOpen={cctvModalOpen}
        onClose={() => setCctvModalOpen(false)}
        camera={selectedCctv}
        onTriggerSOS={(secId) => {
          setCctvModalOpen(false);
          handleOpenSOS(secId || 'SEC_02');
        }}
      />

      <AnnouncementModal
        isOpen={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
      />

      <FacilityModal
        isOpen={facilityModalOpen}
        onClose={() => setFacilityModalOpen(false)}
      />

      <MissingPersonModal
        isOpen={missingModalOpen}
        onClose={() => setMissingModalOpen(false)}
      />
    </div>
  );
};

export default App;
