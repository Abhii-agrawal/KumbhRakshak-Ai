import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Search, 
  UserCheck, 
  Camera, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';

export const MissingPersonModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const mockFoundPersons = [
    {
      id: 'MP-2025-081',
      name: 'Rameshwar Prasad (Age 68)',
      origin: 'Varanasi, UP',
      lastSeen: 'Pontoon Bridge 3',
      currentLocation: 'Sector 5 Holding Camp Booth 2',
      status: 'Safely Located',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      time: '12 mins ago',
    },
    {
      id: 'MP-2025-094',
      name: 'Sunita Devi (Age 45)',
      origin: 'Patna, Bihar',
      lastSeen: 'Sangam Nose Ghat',
      currentLocation: 'Sector 1 Police Help Desk',
      status: 'Reunited with Family',
      statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      time: '34 mins ago',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0D131F] border border-slate-700/80 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3.5 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-600/40">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Pilgrim Lost &amp; Found Portal</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono">
                AI FACE MATCH
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live CCTV facial recognition &amp; lost family search across Triveni Sangam sectors
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'search' ? 'bg-slate-800 text-white shadow' : 'text-slate-400'
            }`}
          >
            Search Located Pilgrims
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'register' ? 'bg-slate-800 text-white shadow' : 'text-slate-400'
            }`}
          >
            Register Missing Pilgrim
          </button>
        </div>

        {activeTab === 'search' ? (
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, token ID, or home city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 pr-10"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            </div>

            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {mockFoundPersons.map((p) => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{p.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Origin: <span className="text-slate-200">{p.origin}</span> • Last Seen: {p.lastSeen}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center justify-between pt-1 border-t border-slate-800">
                    <span>At: {p.currentLocation}</span>
                    <span className="text-slate-500 font-mono text-[10px]">{p.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-3 text-xs"
          >
            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold">Missing Person Report Filed Successfully!</div>
                <p className="text-[11px] text-slate-300">
                  CCTV cameras and field volunteers at all 6 sectors have been notified with high priority.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Missing Person Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Approximate Age</label>
                    <input
                      type="number"
                      placeholder="e.g. 55"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Last Known Sector</label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200">
                      <option>SEC_01: Sangam Nose</option>
                      <option>SEC_02: Pontoon Bridge 3</option>
                      <option>SEC_03: Akhara Tent City</option>
                      <option>SEC_04: Subedarganj Holding</option>
                      <option>SEC_06: Arail Ghat</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91-XXXXXXXXXX"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Broadcast AI Search Alert
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default MissingPersonModal;
