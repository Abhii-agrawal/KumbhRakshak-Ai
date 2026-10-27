import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';
import { CrowdMetrics } from './CrowdMetrics';

export const AnalyticsView = ({ summary = {}, sectors = [] }) => {
  const hourlyData = [
    { time: '04:00 AM (Brahma Muhurta)', pilgrims: '42,000', density: '94%', snan: 'Peak Holy Dip' },
    { time: '08:00 AM (Morning Surge)', pilgrims: '38,500', density: '88%', snan: 'Heavy Congregation' },
    { time: '12:00 PM (Midday Flow)', pilgrims: '26,400', density: '65%', snan: 'Normal Inflow' },
    { time: '04:00 PM (Pre-Aarti)', pilgrims: '34,200', density: '78%', snan: 'Evening Surge' },
    { time: '07:00 PM (Maha Aarti)', pilgrims: '46,800', density: '96%', snan: 'Critical Choke Warning' },
  ];

  return (
    <div className="w-full space-y-5 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/60 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-600/40">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              Predictive Crowd Dynamics &amp; Stampede Risk Analytics
            </h2>
            <p className="text-xs text-cyan-200/80">
              AI-driven inflow velocity curves, bottleneck simulations, and real-time Triveni Sangam capacity telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-900/90 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-mono text-cyan-300">
            Prediction Engine: <strong>YOLOv8 + NetworkX</strong>
          </div>
        </div>
      </div>

      {/* Hourly Density Breakdown Table */}
      <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Holy Dip (Snan) Surge Time Distribution &amp; Predictive Risk Index</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-3">
          {hourlyData.map((slot, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                {slot.time}
              </div>
              <div className="text-lg font-black font-mono text-white">
                {slot.pilgrims}
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Peak Density:</span>
                <span className={`font-mono font-bold ${parseInt(slot.density) > 85 ? 'text-red-400' : 'text-amber-400'}`}>
                  {slot.density}
                </span>
              </div>
              <div className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block ${parseInt(slot.density) > 85 ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
                {slot.snan}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Sector Occupancy & Capacity Progress Bars */}
      <CrowdMetrics sectors={sectors} summary={summary} />
    </div>
  );
};

export default AnalyticsView;
