import React from 'react';
import { 
  AlertOctagon, 
  Users, 
  HeartPulse, 
  Droplet, 
  Scan, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Radio
} from 'lucide-react';

export const KPIDashboard = ({ 
  summary = {}, 
  sectors = [], 
  onViewRedZoneDetails,
  thermalCount = 148566 
}) => {
  const totalCrowd = summary.total_crowd ?? (sectors.reduce((acc, s) => acc + (s.current_crowd || 0), 0) || 19761);
  const totalCapacity = summary.total_capacity ?? (sectors.reduce((acc, s) => acc + (s.max_capacity || 0), 0) || 29700);
  const overallOccupancy = summary.overall_occupancy_pct ?? ((totalCrowd / totalCapacity) * 100).toFixed(2);
  const redAlertsCount = summary.active_red_alerts ?? (sectors.filter((s) => s.risk_status === 'RED_ALERT' || (s.occupancy_pct || 0) > 85).length || 4);
  const totalFever = summary.total_fever_flags ?? (sectors.reduce((acc, s) => acc + (s.fever_cases || 0), 0) || 464);
  const avgBOD = summary.avg_water_bod_mg_l ?? (sectors.length ? (sectors.reduce((acc, s) => acc + (s.water_bod_mg_l || 0), 0) / sectors.length).toFixed(1) : 3.9);
  const dehydrationTotal = summary.total_dehydration_cases ?? (sectors.reduce((acc, s) => acc + (s.dehydration_cases || 0), 0) || 253);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 w-full">
      {/* ------------------------------------------------------------- */}
      {/* Card 1: Critical Red Zones (Red Glowing Hero Card)            */}
      {/* ------------------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-red-950/50 via-red-900/20 to-slate-900/80 border border-red-500/40 shadow-xl shadow-red-950/30 flex flex-col justify-between group transition-all hover:border-red-400/60">
        <div className="flex items-start space-x-3">
          <div className="relative flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-600/50 text-white">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl bg-red-400 opacity-30"></span>
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white tracking-tight">
              {redAlertsCount} Critical Red Zones
            </h4>
            <p className="text-[11px] text-red-300/80 mt-0.5">
              Sectors &gt;85% occupancy
            </p>
          </div>
        </div>

        <div className="mt-4 pt-2">
          <button
            onClick={onViewRedZoneDetails}
            className="w-full bg-red-900/40 hover:bg-red-850/60 border border-red-500/40 text-red-200 hover:text-white rounded-xl py-1.5 px-3 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all group-hover:shadow-md group-hover:shadow-red-600/20 active:scale-95"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Card 2: Total Pilgrim Count                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-2xl p-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
        <div>
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Total Pilgrim Count</span>
          </div>

          <div className="mt-2.5 flex items-baseline space-x-1.5">
            <span className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
              {Number(totalCrowd).toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              / {Number(totalCapacity).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-3">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-cyan-400 h-full rounded-full shadow-sm shadow-cyan-400/80 transition-all duration-700"
              style={{ width: `${Math.min(100, overallOccupancy)}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 mt-1.5 text-right font-mono font-medium">
            {overallOccupancy}% Capacity
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Card 3: Active Bio-Alerts                                     */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-2xl p-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
        <div>
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
            <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Active Bio-Alerts</span>
          </div>

          <div className="mt-2.5 flex items-baseline space-x-1.5">
            <span className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
              {totalFever}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              fever flags
            </span>
          </div>
        </div>

        <div className="mt-3">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-rose-500 to-purple-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (totalFever / 600) * 100)}%` }}
            />
          </div>
          <div className="text-[11px] text-rose-400 mt-1.5 font-medium">
            Syndromic Triage
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Card 4: Ganga Water BOD                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-2xl p-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
        <div>
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
            <Droplet className="w-4 h-4 text-cyan-400" />
            <span>Ganga Water BOD</span>
          </div>

          <div className="mt-2.5 flex items-baseline space-x-1.5">
            <span className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
              {avgBOD}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              mg/L
            </span>
          </div>
        </div>

        <div className="mt-2 flex flex-col justify-end">
          {/* Smooth cyan wave curve graphic */}
          <div className="h-6 w-full flex items-center overflow-hidden">
            <svg className="w-full h-5 text-cyan-400" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
              <path 
                d="M0,10 Q15,0 30,10 T60,10 T90,10 T100,10" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          <div className="text-[11px] text-amber-400 font-semibold -mt-0.5">
            Monitoring Advised
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Card 5: Thermal Gate Screened                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-2xl p-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
        <div>
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
            <Scan className="w-4 h-4 text-indigo-400" />
            <span>Thermal Gate Screened</span>
          </div>

          <div className="mt-2.5 flex items-baseline space-x-1">
            <span className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
              {thermalCount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-end justify-between">
          <span className="text-[10px] text-slate-400">
            6 Entry Gate Scanners Active
          </span>
          {/* Mini vertical bar chart */}
          <div className="flex items-end space-x-1 h-6 flex-shrink-0">
            <span className="w-1 bg-slate-600 h-2 rounded-t"></span>
            <span className="w-1 bg-slate-500 h-3.5 rounded-t"></span>
            <span className="w-1 bg-cyan-400 h-5 rounded-t"></span>
            <span className="w-1 bg-cyan-400 h-3 rounded-t"></span>
            <span className="w-1 bg-cyan-300 h-6 rounded-t"></span>
            <span className="w-1 bg-slate-500 h-4 rounded-t"></span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Card 6: Dehydration Cases                                     */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-2xl p-4 bg-slate-900/80 backdrop-blur-md border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
        <div>
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Dehydration Cases</span>
          </div>

          <div className="mt-2.5 flex items-baseline space-x-1.5">
            <span className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
              {dehydrationTotal}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              pilgrims
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-end justify-between">
          <span className="text-[10px] text-slate-400">
            18 ORS Booths Active
          </span>
          {/* Mini vertical bar chart */}
          <div className="flex items-end space-x-1 h-6 flex-shrink-0">
            <span className="w-1 bg-slate-600 h-1.5 rounded-t"></span>
            <span className="w-1 bg-slate-500 h-3 rounded-t"></span>
            <span className="w-1 bg-slate-400 h-4.5 rounded-t"></span>
            <span className="w-1 bg-amber-400 h-3 rounded-t"></span>
            <span className="w-1 bg-amber-300 h-5 rounded-t"></span>
            <span className="w-1 bg-slate-400 h-2 rounded-t"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;
