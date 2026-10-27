import React, { useState, useEffect } from 'react';
import { X, Video, ShieldCheck, Eye, RefreshCw, AlertTriangle } from 'lucide-react';

export const CCTVModal = ({ camera, isOpen, onClose, onTriggerSOS }) => {
  const [streamTime, setStreamTime] = useState(new Date().toLocaleTimeString());
  const [headcount, setHeadcount] = useState(342);
  const [anomalyMode, setAnomalyMode] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setStreamTime(new Date().toLocaleTimeString());
      setHeadcount((prev) => Math.max(120, prev + Math.floor(Math.random() * 7) - 3));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !camera) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0B111D] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
              anomalyMode ? 'bg-red-950/60 border-red-500/60 text-red-400' : 'bg-slate-800 border-slate-700 text-cyan-400'
            }`}>
              <Video className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{camera.label}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono">
                  LIVE 1080P HD
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                AI Spatial Clustering &amp; Radial Gathering Stream • 30 FPS • Low Latency
              </p>
            </div>
          </div>

          {/* Test Anomaly Toggle for Judges / Demo */}
          <div className="flex items-center space-x-1.5 self-start sm:self-auto bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setAnomalyMode(false)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                !anomalyMode ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Normal Flow
            </button>
            <button
              onClick={() => setAnomalyMode(true)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors flex items-center space-x-1 ${
                anomalyMode ? 'bg-red-600 text-white shadow-sm shadow-red-600/40 animate-pulse' : 'text-slate-400 hover:text-red-400'
              }`}
            >
              <AlertTriangle className="w-3 h-3" />
              <span>🚨 Simulate Injury / Circle</span>
            </button>
          </div>
        </div>

        {/* Video Screen Simulation */}
        <div className="relative w-full h-80 rounded-2xl bg-black border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
          {/* Subtle moving grid simulation */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* Top Overlays: Live REC & Stream Metadata */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 bg-red-950/80 border border-red-500/60 px-2.5 py-1 rounded-lg text-red-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>LIVE REC</span>
            </div>
            <div className="bg-slate-900/80 px-2.5 py-1 rounded-lg text-slate-300 border border-slate-800">
              {streamTime} • CAM-ID: {camera.type?.toUpperCase()}-882
            </div>
          </div>

          {/* Center Simulated AI Detection Bounding Boxes */}
          {!anomalyMode ? (
            /* Normal Laminar Flow */
            <div className="relative z-10 flex items-center justify-center">
              <div className="w-56 h-28 border-2 border-dashed border-cyan-400/80 rounded-xl bg-cyan-500/5 flex flex-col items-center justify-center text-center p-2 shadow-lg shadow-cyan-500/10">
                <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40 mb-1">
                  YOLOv8 DETECTED: {headcount} PERSONS
                </span>
                <span className="text-[11px] text-slate-300 font-medium">
                  Flow Direction: Unidirectional (Ghat Bound)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono mt-0.5">
                  Flow Divergence: 0.02 (Normal Steady Stream)
                </span>
              </div>
            </div>
          ) : (
            /* 🚨 SUDDEN INJURY & RADIAL CIRCLE GATHERING ANOMALY */
            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* Pulsing Circle Formation Overlay (DBSCAN Spatial Ring) */}
              <div className="relative w-64 h-40 rounded-full border-2 border-dashed border-red-500 bg-red-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.35)] animate-pulse">
                
                {/* Onlooker Ring Label */}
                <div className="absolute -top-3.5 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                  ⭕ Radial Circle Gathering: 34 Onlookers
                </div>

                {/* Inward Optical Flow Convergence Vectors */}
                <div className="absolute inset-0 flex items-center justify-around pointer-events-none text-red-400 font-mono text-[10px]">
                  <span>➔</span>
                  <span>➔</span>
                  <span>➔</span>
                </div>

                {/* Center Void & Fallen Pilgrim Detection Box */}
                <div className="w-32 h-14 border-2 border-amber-400 rounded-lg bg-amber-950/70 flex flex-col items-center justify-center text-center p-1 shadow-lg shadow-amber-500/20">
                  <span className="text-[9px] font-bold bg-amber-500/30 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/50">
                    ⚠️ RECUMBENT PILGRIM
                  </span>
                  <span className="text-[9px] text-slate-200 mt-0.5 font-mono">
                    Pose W/H: 2.7 (Fallen)
                  </span>
                </div>

                {/* Radius metric */}
                <div className="absolute -bottom-3 bg-slate-900 border border-red-500/60 text-red-300 text-[9px] font-mono px-2 py-0.5 rounded-md">
                  Void Radius: 2.2m • Inward Flow: 94%
                </div>
              </div>
            </div>
          )}

          {/* Bottom Overlays: Health telemetry from camera vision */}
          <div className="relative z-10 flex items-center justify-between text-[11px] bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className={`w-3.5 h-3.5 ${anomalyMode ? 'text-red-400' : 'text-emerald-400'}`} />
              <span>
                {anomalyMode ? 'Crowd Velocity: 0.1 m/s (Local Stagnation)' : 'Crowd Velocity: 1.2 m/s'}
              </span>
            </div>
            <div className={`font-semibold ${anomalyMode ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
              {anomalyMode ? '🚨 CHOKE & COLLAPSE: CRITICAL' : 'Choke Risk: Low'}
            </div>
          </div>
        </div>

        {/* Footer controls & Direct Emergency Dispatch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
          <div className="text-slate-400 text-center sm:text-left">
            {anomalyMode ? (
              <span className="text-red-300 font-medium">
                ⚠️ Radial Gathering anomaly requires immediate paramedic triage.
              </span>
            ) : (
              <span>Triveni Sangam Surveillance Grid • Sector Security Desk</span>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {anomalyMode && onTriggerSOS && (
              <button
                onClick={() => onTriggerSOS('SEC_02')}
                className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-lg shadow-red-600/30 active:scale-95"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>🚑 Auto-Dispatch Green Corridor</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition-colors"
            >
              Close Feed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCTVModal;
