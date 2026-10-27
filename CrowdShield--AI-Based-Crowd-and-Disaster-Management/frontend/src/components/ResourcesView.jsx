import React from 'react';
import { 
  ShieldCheck, 
  Hospital, 
  LifeBuoy, 
  Users, 
  Radio, 
  CheckCircle2, 
  PhoneCall,
  Flame,
  Truck
} from 'lucide-react';

export const ResourcesView = () => {
  const resourceCategories = [
    {
      title: 'Advanced Life Support (ALS) Ambulances',
      count: '45 Active Units',
      status: 'Ready / Patrolling',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      icon: <Hospital className="w-5 h-5 text-emerald-400" />,
      details: 'Stationed at Central Mela Hospital, Sangam Nose, Pontoon Bridge 3, and Arail Ghat.',
      hotline: '108 / +91-532-2400108',
    },
    {
      title: 'NDRF & River Water Rescue Patrol Boats',
      count: '16 High-Speed Motorboats',
      status: 'On Water (Confluence Patrol)',
      statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      icon: <LifeBuoy className="w-5 h-5 text-sky-400" />,
      details: 'Stationed at Triveni Sangam deep confluence point with divers, life rings, and thermal sonar.',
      hotline: '+91-532-2400112',
    },
    {
      title: 'Field Volunteers & Disaster Scouts',
      count: '2,400 Personnel',
      status: 'Active on Ghats',
      statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      icon: <Users className="w-5 h-5 text-purple-400" />,
      details: 'Trained in CPR, lost child identification, and pedestrian surge barrier gating.',
      hotline: 'Channel 4 Radio Net',
    },
    {
      title: 'Potable Water Tankers & ORS Stations',
      count: '48 Water Tankers & 18 Booths',
      status: 'Continuous Refill',
      statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      icon: <Truck className="w-5 h-5 text-cyan-400" />,
      details: 'Supplying 1.2 million liters daily to Akhara tent cities, holding zones, and riverbanks.',
      hotline: '+91-532-2400115',
    },
  ];

  return (
    <div className="w-full space-y-5 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              Emergency Logistics &amp; Response Resource Command
            </h2>
            <p className="text-xs text-emerald-200/80">
              Live deployment tracking of emergency ambulances, NDRF river rescue boats, and field volunteers
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-900/90 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-mono text-emerald-300">
            Resource Readiness: <strong>100% OPERATIONAL</strong>
          </div>
        </div>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resourceCategories.map((res, i) => (
          <div
            key={i}
            className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-slate-800 border border-slate-700">
                  {res.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {res.title}
                  </h4>
                  <div className="text-xs font-mono font-bold text-slate-300 mt-0.5">
                    {res.count}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${res.statusColor}`}>
                {res.status}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {res.details}
            </p>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Emergency Contact: <strong className="font-mono text-white">{res.hotline}</strong></span>
              </span>
              <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold rounded-lg transition-colors">
                Inspect Units
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesView;
