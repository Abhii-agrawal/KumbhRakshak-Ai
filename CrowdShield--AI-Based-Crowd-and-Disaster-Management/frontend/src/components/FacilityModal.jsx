import React from 'react';
import { 
  X, 
  MapPin, 
  Hospital, 
  Droplet, 
  Tent, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';

export const FacilityModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const facilities = [
    {
      name: 'Central Mela Hospital Hub (SEC_05)',
      type: 'Hospital / Trauma Center',
      distance: '0.4 km',
      beds: '120 ICU Beds Available',
      phone: '108 / +91-532-2400108',
      status: 'Open 24/7',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      name: 'Sangam Nose First Aid & Triage Camp (SEC_01)',
      type: 'Emergency First Aid',
      distance: '0.1 km',
      beds: '15 Emergency Stretchers',
      phone: '+91-532-2400109',
      status: 'High Load',
      statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      name: 'Akhara Sector 4 Medical Tent (SEC_03)',
      type: 'Syndromic Triage & Fever Camp',
      distance: '0.8 km',
      beds: '40 Quarantine Beds',
      phone: '+91-532-2400110',
      status: 'Active Bio-Triage',
      statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      name: 'Arail Ghat ORS & Hydration Post (SEC_06)',
      type: 'ORS & Heatstroke Care',
      distance: '1.2 km',
      beds: '24 ORS Dispensers',
      phone: 'Mela Control Desk',
      status: 'Open 24/7',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/40">
            <Hospital className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Nearest Medical Facilities &amp; Emergency Camps
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live proximity directory for pilgrims across Prayagraj Triveni Sangam sectors
            </p>
          </div>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {fac.name}
                  </h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {fac.type} • <span className="text-sky-400 font-mono font-semibold">{fac.distance}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${fac.statusColor}`}>
                  {fac.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                <span>{fac.beds}</span>
                <span className="text-slate-300 font-mono flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-emerald-400" />
                  {fac.phone}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilityModal;
