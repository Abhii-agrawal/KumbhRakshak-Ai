import React from 'react';
import { 
  Siren, 
  MapPin, 
  Share2, 
  Volume2, 
  Users, 
  ChevronRight 
} from 'lucide-react';

export const ActionToolbar = ({ 
  onTriggerSOS, 
  onFindFacility, 
  onSafeRoutes, 
  onOpenAnnouncements, 
  onMissingPerson 
}) => {
  const actions = [
    {
      id: 'sos',
      title: 'SOS / Incident',
      subtitle: 'Report an emergency',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600/30 to-rose-600/20 border border-red-500/40 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform shadow-md shadow-red-600/20">
          <Siren className="w-5 h-5 animate-pulse" />
        </div>
      ),
      onClick: onTriggerSOS,
    },
    {
      id: 'facility',
      title: 'Nearest Facility',
      subtitle: 'Find medical help',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-200 group-hover:scale-105 transition-transform">
          <MapPin className="w-5 h-5 text-sky-400" />
        </div>
      ),
      onClick: onFindFacility,
    },
    {
      id: 'routes',
      title: 'Safe Routes',
      subtitle: 'Navigate to safe zones',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-200 group-hover:scale-105 transition-transform">
          <Share2 className="w-5 h-5 text-emerald-400" />
        </div>
      ),
      onClick: onSafeRoutes,
    },
    {
      id: 'announcement',
      title: 'AI Announcement',
      subtitle: 'Multi-language broadcast',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform shadow-md shadow-purple-600/20">
          <Volume2 className="w-5 h-5" />
        </div>
      ),
      onClick: onOpenAnnouncements,
    },
    {
      id: 'missing',
      title: 'Missing Person Help',
      subtitle: 'Report / search',
      icon: (
        <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-200 group-hover:scale-105 transition-transform">
          <Users className="w-5 h-5 text-amber-400" />
        </div>
      ),
      onClick: onMissingPerson,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 w-full">
      {actions.map((act) => (
        <div
          key={act.id}
          onClick={act.onClick}
          className="group relative flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-850/90 border border-slate-800/90 hover:border-slate-700 shadow-xl cursor-pointer transition-all duration-200 select-none active:scale-[0.98]"
        >
          <div className="flex items-center space-x-3">
            {act.icon}
            <div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {act.title}
              </div>
              <div className="text-[11px] text-slate-400">
                {act.subtitle}
              </div>
            </div>
          </div>

          <div className="w-6 h-6 rounded-full flex items-center justify-center text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionToolbar;
