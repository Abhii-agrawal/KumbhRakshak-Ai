import React from 'react';
import { 
  X, 
  AlertOctagon, 
  Users, 
  AlertTriangle, 
  ArrowRight, 
  ShieldAlert, 
  Navigation,
  CheckCircle2
} from 'lucide-react';

export const RedZonesModal = ({ isOpen, onClose, sectors = [], onDispatchSector }) => {
  if (!isOpen) return null;

  // Filter red zones (>85% occupancy or RED_ALERT status)
  const redZones = sectors.filter((s) => s.risk_status === 'RED_ALERT' || (s.occupancy_pct || 0) > 85);

  const displayZones = redZones.length > 0 ? redZones : [
    { sector_id: 'SEC_01', sector_name: 'Sangam Nose (Main Bathing Ghat)', occupancy_pct: 92.0, current_crowd: 4600, max_capacity: 5000, risk_factor: 'Congestion on main riverbank steps during holy dip hour', mitigation: 'One-way barricade deployed; excess crowd redirected to Sector 2' },
    { sector_id: 'SEC_02', sector_name: 'Pontoon Bridge 3 (Choke Point)', occupancy_pct: 88.5, current_crowd: 1062, max_capacity: 1200, risk_factor: 'Narrow 6-meter bridge bottlenecks pedestrian flow', mitigation: 'AI Megaphone active; gating pulse pauses entry every 90 seconds' },
    { sector_id: 'SEC_04', sector_name: 'Subedarganj Holding Area', occupancy_pct: 87.8, current_crowd: 8780, max_capacity: 10000, risk_factor: 'Surge inflow from Subedarganj special trains', mitigation: 'Holding zone buffering 4,000 pilgrims before ghat release' },
    { sector_id: 'SEC_06', sector_name: 'Arail Ghat Sector', occupancy_pct: 85.2, current_crowd: 3408, max_capacity: 4000, risk_factor: 'Evening Aarti congregation bottleneck on south ramp', mitigation: 'Arail bypass road opened for emergency exit' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0D131F] border border-red-500/40 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 border-b border-slate-800 pb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-red-600/40">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Critical Red Zones &amp; Stampede Prevention</span>
              <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                {displayZones.length} SECTORS OVER 85%
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated choke-point diversion &amp; dynamic emergency corridor routing
            </p>
          </div>
        </div>

        {/* Zones List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {displayZones.map((zone) => (
            <div
              key={zone.sector_id}
              className="p-4 rounded-2xl bg-slate-900/90 border border-red-500/30 hover:border-red-500/60 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold text-red-400 uppercase">
                    {zone.sector_id}
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {zone.sector_name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black font-mono text-red-400">
                    {zone.occupancy_pct}% Density
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {zone.current_crowd?.toLocaleString()} / {zone.max_capacity?.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, zone.occupancy_pct)}%` }}
                />
              </div>

              {/* Risk Factor and Mitigation */}
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 text-[11px] space-y-1">
                <div className="text-red-300 flex items-start space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span><strong>Hazard:</strong> {zone.risk_factor || 'Severe pilgrim density bottleneck; stampede warning triggered.'}</span>
                </div>
                <div className="text-emerald-300 flex items-start space-x-1.5 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span><strong>Active Action:</strong> {zone.mitigation || 'Field staff diverted crowd to secondary bypass; megaphone broadcast active.'}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  onClose();
                  if (onDispatchSector) onDispatchSector(zone.sector_id);
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-red-600/30 active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Dispatch Green Corridor From {zone.sector_id}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RedZonesModal;
