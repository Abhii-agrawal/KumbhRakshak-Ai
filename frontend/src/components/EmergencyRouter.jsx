import React, { useState } from 'react';
import { 
  Siren, 
  Send, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Hospital, 
  Radio, 
  Loader2 
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const EmergencyRouter = ({ sectors = [], onRouteCalculated = null, initialSelectedSector = 'SEC_01' }) => {
  const [selectedSector, setSelectedSector] = useState(initialSelectedSector);
  const [loading, setLoading] = useState(false);
  const [routeResult, setRouteResult] = useState(null);
  const [error, setError] = useState(null);

  // Available incident origin sectors (excluding the hospital destination itself)
  const availableOrigins = sectors.length > 0 
    ? sectors.filter((s) => s.sector_id !== 'SEC_05')
    : [
        { sector_id: 'SEC_01', sector_name: 'Sangam Nose (Main Bathing Ghat)' },
        { sector_id: 'SEC_02', sector_name: 'Pontoon Bridge 3 (Choke Point)' },
        { sector_id: 'SEC_03', sector_name: 'Akhara Sector 4 Tent City' },
        { sector_id: 'SEC_04', sector_name: 'Subedarganj Holding Area' },
        { sector_id: 'SEC_06', sector_name: 'Arail Ghat Sector' },
      ];

  const handleDispatch = async () => {
    if (!selectedSector) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/dispatch-ambulance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          incident_sector_id: selectedSector,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to dispatch green corridor route');
      }

      const data = await response.json();
      setRouteResult(data);

      // Notify parent map or dashboard so GIS map can draw the corridor polyline
      if (onRouteCalculated) {
        onRouteCalculated(data);
      }
    } catch (err) {
      console.error('Dispatch error:', err);
      setError(err.message || 'Network error while contacting Kumbh Emergency Dispatch Engine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl font-sans text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/30">
            <Siren className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>AI Dynamic Green Corridor &amp; Emergency Dispatch</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Dijkstra algorithm pathfinder dynamically penalizes stampede choke points and clears routes to Central Hospital
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl self-start sm:self-auto text-emerald-300 text-xs font-semibold">
          <Hospital className="w-4 h-4 text-emerald-400" />
          <span>Destination: Central Mela Hospital (SEC_05)</span>
        </div>
      </div>

      {/* Control Panel: Sector Selector & Dispatch Button */}
      <div className="mt-5 p-4 rounded-xl bg-gray-950/80 border border-gray-800 flex flex-col sm:flex-row items-stretch sm:items-end gap-3.5">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Select Incident Sector (Emergency Origin)
          </label>
          <div className="relative">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 appearance-none font-medium cursor-pointer"
            >
              {availableOrigins.map((sec) => (
                <option key={sec.sector_id} value={sec.sector_id} className="bg-gray-900 text-white">
                  {sec.sector_id}: {sec.sector_name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-400">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="sm:w-56 flex-shrink-0">
          <button
            onClick={handleDispatch}
            disabled={loading}
            className="w-full h-[42px] bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:via-rose-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider px-5 rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-500/50 transition-all flex items-center justify-center space-x-2 active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Computing Dijkstra...</span>
              </>
            ) : (
              <>
                <Siren className="w-4 h-4 animate-bounce" />
                <span>Dispatch Green Corridor</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mt-4 p-3.5 rounded-xl bg-red-950/60 border border-red-500/60 text-red-300 text-xs flex items-center space-x-2.5">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Live Routing Result Details */}
      {routeResult && (
        <div className="mt-5 p-5 rounded-xl bg-gray-950/90 border border-emerald-500/40 shadow-xl space-y-4 animate-fadeIn">
          {/* Top Result Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-gray-800 gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="font-bold text-sm text-emerald-400 tracking-wide uppercase">
                Corridor Cleared &amp; Traffic Priority Granted
              </span>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-gray-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Estimated ETA:</span>
                <span className="text-emerald-300 font-bold text-sm">
                  {routeResult.estimated_eta_minutes} min
                </span>
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{routeResult.path_hops} Navigation Hops</span>
            </div>
          </div>

          {/* Optimal Route Steps */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>Optimal Green Corridor Path (Dijkstra Traversal):</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {routeResult.green_corridor_sector_names.map((stepName, index) => {
                const sectorId = routeResult.green_corridor_path[index];
                const isDestination = index === routeResult.green_corridor_sector_names.length - 1;
                const isOrigin = index === 0;

                return (
                  <React.Fragment key={sectorId}>
                    <div
                      className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium border shadow-sm ${
                        isOrigin
                          ? 'bg-rose-950/70 border-rose-500/70 text-rose-200'
                          : isDestination
                          ? 'bg-emerald-950/70 border-emerald-500/70 text-emerald-200'
                          : 'bg-gray-850 border-gray-700 text-gray-200'
                      }`}
                    >
                      {isOrigin && <Siren className="w-3.5 h-3.5 text-rose-400" />}
                      {isDestination && <Hospital className="w-3.5 h-3.5 text-emerald-400" />}
                      {!isOrigin && !isDestination && <span className="font-mono text-gray-400">{sectorId}</span>}
                      <span>{stepName}</span>
                    </div>

                    {index < routeResult.green_corridor_sector_names.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-emerald-500 flex-shrink-0 animate-pulse" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Congested Red Zones Bypassed Card */}
          <div className="p-3.5 rounded-xl bg-gray-900/90 border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-gray-300 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Congested Red Zones Safely Bypassed (Penalty Weights Applied):</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                The algorithm identified high-density stampede choke points and routed the ambulance around them.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {routeResult.bypassed_red_zone_names && routeResult.bypassed_red_zone_names.length > 0 ? (
                routeResult.bypassed_red_zone_names.map((name, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center space-x-1 bg-red-950/80 border border-red-500/50 text-red-300 text-[11px] px-2.5 py-1 rounded-lg font-semibold"
                  >
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    <span>{name}</span>
                  </span>
                ))
              ) : (
                <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  None Active on Primary Arterial
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyRouter;
