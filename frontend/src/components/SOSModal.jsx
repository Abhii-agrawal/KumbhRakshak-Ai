import React, { useState, useEffect } from 'react';
import { 
  X, 
  Siren, 
  Hospital, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  Loader2, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const SOSModal = ({ 
  isOpen, 
  onClose, 
  sectors = [], 
  onRouteCalculated,
  defaultOriginSector = 'SEC_01'
}) => {
  const [selectedOrigin, setSelectedOrigin] = useState(defaultOriginSector);
  const [loading, setLoading] = useState(false);
  const [routeResult, setRouteResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (defaultOriginSector) {
      setSelectedOrigin(defaultOriginSector);
    }
  }, [defaultOriginSector, isOpen]);

  if (!isOpen) return null;

  const handleDispatch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/dispatch-ambulance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incident_sector_id: selectedOrigin }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Dispatch route computation failed');
      }
      const data = await res.json();
      setRouteResult(data);
      if (onRouteCalculated) onRouteCalculated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0D131F] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/40">
            <Siren className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Emergency SOS &amp; Dynamic Green Corridor</span>
              <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-full font-mono">
                DIJKSTRA PATHFINDER
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct emergency evacuation corridor to Central Mela Hospital Hub bypassing stampede choke points
            </p>
          </div>
        </div>

        {/* Origin Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Select Incident Sector (Emergency Origin)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {sectors
              .filter((s) => s.sector_id !== 'SEC_05')
              .map((sec) => (
                <button
                  key={sec.sector_id}
                  onClick={() => setSelectedOrigin(sec.sector_id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedOrigin === sec.sector_id
                      ? 'bg-rose-950/60 border-rose-500 text-white shadow-md shadow-rose-950/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    {sec.sector_id}
                  </div>
                  <div className="text-xs font-bold truncate">
                    {sec.sector_name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Density: <span className="font-mono font-bold text-slate-200">{sec.occupancy_pct || 75}%</span>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Dispatch Action Button */}
        <div>
          <button
            onClick={handleDispatch}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2 transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Computing AI Green Corridor...</span>
              </>
            ) : (
              <>
                <Siren className="w-4 h-4 animate-bounce" />
                <span>Clear Green Corridor To Central Hospital</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Route Details */}
        {routeResult && (
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/40 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>CORRIDOR CLEARED</span>
              </div>
              <div className="text-xs font-mono text-emerald-300 font-bold">
                ETA: {routeResult.estimated_eta_minutes} min ({routeResult.path_hops} hops)
              </div>
            </div>

            <div className="text-xs text-slate-300 flex flex-wrap items-center gap-2">
              {routeResult.green_corridor_sector_names.map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs">
                    {step}
                  </span>
                  {idx < routeResult.green_corridor_sector_names.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {routeResult.bypassed_red_zone_names?.length > 0 && (
              <div className="text-[11px] text-slate-400 flex items-center space-x-2 pt-1">
                <span className="text-red-400 font-bold">Choke Points Bypassed:</span>
                <span>{routeResult.bypassed_red_zone_names.join(', ')}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SOSModal;
