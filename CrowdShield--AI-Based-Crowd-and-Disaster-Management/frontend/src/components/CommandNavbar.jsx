import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChevronDown, 
  Sun, 
  Moon, 
  Radio, 
  MapPin, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const CommandNavbar = ({ activeTab, onTabChange, redAlertCount = 0 }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: true }));
  const [themeDark, setThemeDark] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('Prayagraj 2025-26');
  const [sectorSummaryOpen, setSectorSummaryOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = !themeDark;
    setThemeDark(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const tabs = [
    { id: 'live-map', label: 'Live Map' },
    { id: 'health-alerts', label: 'Health & Alerts' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'resources', label: 'Resources' },
  ];

  return (
    <header className="w-full bg-[#090D16]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-6 py-2.5 z-50 flex items-center justify-between select-none relative">
      {/* Left: Brand, Title & Location Dropdown */}
      <div className="flex items-center space-x-4">
        {/* Stylized Trident Icon */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('live-map')}>
          <div className="text-white text-2xl font-black tracking-wider flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] hover:scale-110 transition-transform">
            🔱
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold tracking-tight text-white font-sans">
                KumbhRakshak AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-normal -mt-0.5">
              Command &amp; Disaster Mitigation Center
            </p>
          </div>
        </div>

        {/* Location Dropdown Pill */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 text-slate-200 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedVenue}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 z-50 text-xs text-slate-300 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Select Active Event Venue
              </div>
              <button 
                onClick={() => {
                  setSelectedVenue('Prayagraj 2025-26');
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 hover:bg-slate-800 flex items-center justify-between ${
                  selectedVenue.includes('Prayagraj') ? 'text-white font-bold bg-slate-800/60' : 'text-slate-300'
                }`}
              >
                <span>Prayagraj Sangam Core</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </button>
              <button 
                onClick={() => {
                  setSelectedVenue('Haridwar 2027');
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 hover:bg-slate-800 flex items-center justify-between ${
                  selectedVenue.includes('Haridwar') ? 'text-white font-bold bg-slate-800/60' : 'text-slate-400'
                }`}
              >
                <span>Haridwar Kumbh (2027)</span>
                <span className="text-[10px] text-slate-500">Upcoming</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedVenue('Ujjain 2028');
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 hover:bg-slate-800 flex items-center justify-between ${
                  selectedVenue.includes('Ujjain') ? 'text-white font-bold bg-slate-800/60' : 'text-slate-400'
                }`}
              >
                <span>Ujjain Simhastha (2028)</span>
                <span className="text-[10px] text-slate-500">Planning</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center: Navigation Tabs Pill Bar */}
      <nav className="hidden md:flex items-center bg-slate-950/80 p-1 rounded-full border border-slate-800/90 shadow-inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-slate-800 text-white shadow-md shadow-black/40 border border-slate-700/60 scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Right: Live Sectors Online, Clock, Theme Toggle & User Avatar */}
      <div className="flex items-center space-x-3.5">
        {/* Online Sectors Badge */}
        <div className="relative">
          <button
            onClick={() => setSectorSummaryOpen(!sectorSummaryOpen)}
            className="flex items-center space-x-2 bg-slate-900/90 hover:bg-slate-850 px-3 py-1.5 rounded-full border border-slate-800 hover:border-slate-700 shadow-sm text-xs transition-all active:scale-95"
            title="Click to view Sector Health breakdown"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-200 font-semibold text-[11px] font-sans">
              6 Sectors Online
            </span>
          </button>

          {/* Quick Sector Summary Flyout */}
          {sectorSummaryOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 text-xs text-slate-300 animate-in fade-in zoom-in-95 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Live Sector Status
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">ALL PINGING</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>SEC_01: Sangam Nose</span>
                  <span className="text-red-400 font-mono font-bold text-[11px]">92% Critical</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SEC_02: Pontoon Bridge 3</span>
                  <span className="text-amber-400 font-mono font-bold text-[11px]">68% Choke</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SEC_03: Akhara Tent City</span>
                  <span className="text-emerald-400 font-mono font-bold text-[11px]">42% Safe</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SEC_04: Subedarganj Holding</span>
                  <span className="text-red-400 font-mono font-bold text-[11px]">88% Critical</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SEC_05: Central Hospital Hub</span>
                  <span className="text-amber-400 font-mono font-bold text-[11px]">55% Alert</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SEC_06: Arail Ghat Sector</span>
                  <span className="text-emerald-400 font-mono font-bold text-[11px]">31% Safe</span>
                </div>
              </div>
              <button
                onClick={() => setSectorSummaryOpen(false)}
                className="w-full mt-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold rounded-lg text-center"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Live Clock with IST */}
        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-300 font-mono tracking-tight bg-slate-900/60 px-2.5 py-1 rounded-xl border border-slate-800/80">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{currentTime} IST</span>
        </div>

        {/* Theme Toggle Icon */}
        <button
          onClick={handleToggleTheme}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95"
          title="Toggle Light/Dark Theme"
        >
          {themeDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
        </button>

        {/* User Profile Avatar with Flyout */}
        <div className="relative">
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-slate-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            title="Commander Profile"
          >
            A
          </button>

          {avatarOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-xs text-slate-300 animate-in fade-in zoom-in-95 space-y-3">
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  AV
                </div>
                <div>
                  <div className="font-bold text-white text-sm leading-tight">Anand Verma, IPS</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Incident Commander</div>
                </div>
              </div>

              <div className="space-y-1 text-[11px] text-slate-300">
                <div><strong>Station:</strong> Prayagraj ICCC Hub</div>
                <div><strong>Badge ID:</strong> UP-KM-2025-CMD-01</div>
                <div><strong>Duty Status:</strong> <span className="text-emerald-400 font-bold">On Active Watch</span></div>
              </div>

              <button
                onClick={() => setAvatarOpen(false)}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
              >
                Close Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CommandNavbar;
