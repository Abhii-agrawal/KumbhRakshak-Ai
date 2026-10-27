import React from 'react';
import { 
  Users, 
  Activity, 
  PlusCircle, 
  Droplet, 
  Tent, 
  Square, 
  Video 
} from 'lucide-react';

export const MapLayersPanel = ({ layers, onToggleLayer }) => {
  const layerItems = [
    {
      id: 'crowdDensity',
      label: 'Crowd Density',
      icon: <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/80 inline-block" />,
    },
    {
      id: 'bioAlerts',
      label: 'Bio-Alerts',
      icon: <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500/80 inline-block" />,
    },
    {
      id: 'medicalFacilities',
      label: 'Medical Facilities',
      icon: <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400/80 inline-block" />,
    },
    {
      id: 'waterPoints',
      label: 'Water Points',
      icon: <Droplet className="w-3 h-3 text-cyan-400" />,
    },
    {
      id: 'shelters',
      label: 'Shelters',
      icon: <Tent className="w-3 h-3 text-emerald-400" />,
    },
    {
      id: 'sectors',
      label: 'Sectors',
      icon: <Square className="w-3 h-3 text-slate-400" />,
    },
    {
      id: 'liveCctv',
      label: 'Live CCTV',
      icon: <Video className="w-3 h-3 text-slate-400" />,
    },
  ];

  return (
    <div className="bg-[#0B111D]/90 backdrop-blur-md border border-slate-800/90 rounded-2xl p-3.5 shadow-2xl min-w-[170px] select-none pointer-events-auto">
      <div className="text-xs font-bold text-white mb-2.5 tracking-tight px-1">
        Map Layers
      </div>
      <div className="space-y-1.5">
        {layerItems.map((item) => {
          const isEnabled = layers[item.id] !== false;
          return (
            <div
              key={item.id}
              onClick={() => onToggleLayer(item.id)}
              className={`flex items-center space-x-2.5 px-2 py-1.5 rounded-lg cursor-pointer text-xs transition-colors ${
                isEnabled
                  ? 'text-slate-200 hover:bg-slate-800/60 font-medium'
                  : 'text-slate-500 hover:bg-slate-800/40 line-through opacity-70'
              }`}
            >
              <div className="w-4 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <span className="text-[11px] leading-none">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapLayersPanel;
