import React from 'react';
import { 
  HeartPulse, 
  Droplet, 
  Thermometer, 
  Activity, 
  ShieldCheck, 
  Volume2, 
  Radio, 
  AlertTriangle,
  Hospital
} from 'lucide-react';
import { HealthAndVoicePanel } from './HealthAndVoicePanel';

export const HealthAlertsView = ({ summary = {}, sectors = [] }) => {
  return (
    <div className="w-full space-y-5 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/40">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              Triveni Sangam Public Health &amp; Bio-Surveillance Command
            </h2>
            <p className="text-xs text-purple-200/80">
              Syndromic fever screening, Ganga water CPCB sensor telemetry, and AI megaphone broadcasts
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-900/90 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-mono text-emerald-300">
            CPCB Sensor: <strong>PASS (Safe Bathing)</strong>
          </div>
          <div className="bg-purple-950/80 border border-purple-500/40 px-3.5 py-2 rounded-xl text-xs font-mono text-purple-300">
            Fever Triage: <strong>ACTIVE</strong>
          </div>
        </div>
      </div>

      {/* Main Integrated Health and Voice Panel */}
      <HealthAndVoicePanel telemetrySummary={summary} sectors={sectors} />
    </div>
  );
};

export default HealthAlertsView;
