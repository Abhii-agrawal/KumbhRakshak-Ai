import React from 'react';
import { Users, TrendingUp, AlertTriangle, ShieldCheck, Activity, BarChart3, AlertOctagon } from 'lucide-react';

export const CrowdMetrics = ({ sectors = [], summary = {}, onSelectSector = null, selectedSectorId = null }) => {
  // Fallback Prayagraj sectors if not yet loaded from backend
  const displaySectors = sectors.length > 0 ? sectors : [
    { sector_id: 'SEC_01', sector_name: 'Sangam Nose (Main Bathing Ghat)', max_capacity: 5000, current_crowd: 4250, occupancy_pct: 85.0, risk_status: 'RED_ALERT' },
    { sector_id: 'SEC_02', sector_name: 'Pontoon Bridge 3 (Choke Point)', max_capacity: 1200, current_crowd: 1050, occupancy_pct: 87.5, risk_status: 'RED_ALERT' },
    { sector_id: 'SEC_03', sector_name: 'Akhara Sector 4 Tent City', max_capacity: 8000, current_crowd: 3400, occupancy_pct: 42.5, risk_status: 'PURPLE_BIO_ALERT' },
    { sector_id: 'SEC_04', sector_name: 'Subedarganj Holding Area', max_capacity: 10000, current_crowd: 3800, occupancy_pct: 38.0, risk_status: 'GREEN_SAFE' },
    { sector_id: 'SEC_05', sector_name: 'Central Mela Hospital Hub', max_capacity: 1500, current_crowd: 520, occupancy_pct: 34.7, risk_status: 'PURPLE_BIO_ALERT' },
    { sector_id: 'SEC_06', sector_name: 'Arail Ghat Sector', max_capacity: 4000, current_crowd: 2800, occupancy_pct: 70.0, risk_status: 'AMBER_WARNING' },
  ];

  const totalCrowd = summary.total_crowd ?? displaySectors.reduce((acc, s) => acc + s.current_crowd, 0);
  const totalCapacity = summary.total_capacity ?? displaySectors.reduce((acc, s) => acc + s.max_capacity, 0);
  const overallOccupancy = summary.overall_occupancy_pct ?? ((totalCrowd / totalCapacity) * 100).toFixed(1);

  // Status badge styling helper
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'RED_ALERT':
      case 'CRITICAL':
        return {
          label: 'CRITICAL',
          badgeClass: 'bg-red-500/20 text-red-300 border-red-500/50 shadow-sm shadow-red-500/30',
          barColor: 'from-red-600 to-rose-500',
          pulse: true,
        };
      case 'PURPLE_BIO_ALERT':
      case 'MODERATE_BIO_ALERT':
        return {
          label: 'BIO-ALERT',
          badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm shadow-purple-500/30',
          barColor: 'from-purple-600 to-indigo-500',
          pulse: false,
        };
      case 'AMBER_WARNING':
      case 'HIGH':
      case 'WARNING':
        return {
          label: 'HIGH DENSITY',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          barColor: 'from-amber-500 to-yellow-500',
          pulse: false,
        };
      case 'MEDICAL_HUB':
        return {
          label: 'HOSPITAL HUB',
          badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
          barColor: 'from-blue-600 to-cyan-500',
          pulse: false,
        };
      default:
        return {
          label: 'SAFE',
          badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          barColor: 'from-emerald-500 to-teal-400',
          pulse: false,
        };
    }
  };

  return (
    <div className="w-full bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl font-sans text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Sector Crowd Occupancy &amp; Density Telemetry
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Real-time pilgrim headcount vs rated dynamic capacity across Triveni Sangam sectors
            </p>
          </div>
        </div>

        {/* Aggregate Occupancy Chip */}
        <div className="flex items-center space-x-3 self-start sm:self-auto bg-gray-950/80 px-4 py-2 rounded-xl border border-gray-800">
          <Users className="w-4 h-4 text-cyan-400" />
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Total Event Occupancy</div>
            <div className="text-sm font-bold font-mono text-white">
              {totalCrowd.toLocaleString()} / {totalCapacity.toLocaleString()}{' '}
              <span className={`text-xs ml-1 font-bold ${Number(overallOccupancy) > 75 ? 'text-red-400' : 'text-emerald-400'}`}>
                ({overallOccupancy}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Progress Cards Grid - 2 Column Balanced Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {displaySectors.map((sector) => {
          const badge = getBadgeStyle(sector.risk_status);
          const isSelected = selectedSectorId === sector.sector_id;

          return (
            <div
              key={sector.sector_id}
              onClick={() => onSelectSector && onSelectSector(sector.sector_id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-gray-850 border-cyan-500/80 shadow-lg shadow-cyan-500/10 scale-[1.01]'
                  : 'bg-gray-900/80 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
              }`}
            >
              {/* Top Row: Sector Code & Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                  {sector.sector_id}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.badgeClass} flex items-center space-x-1`}>
                  {badge.pulse && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping inline-block mr-1"></span>}
                  <span>{badge.label}</span>
                </span>
              </div>

              {/* Sector Name */}
              <h4 className="text-sm font-bold text-white mb-3 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                {sector.sector_name}
              </h4>

              {/* Occupancy Numbers */}
              <div className="flex justify-between items-baseline mb-1.5 text-xs">
                <span className="text-gray-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-gray-500" />
                  <span>Headcount</span>
                </span>
                <span className="font-mono text-gray-200 font-semibold">
                  <span className="text-white font-bold">{sector.current_crowd.toLocaleString()}</span> / {sector.max_capacity.toLocaleString()}
                </span>
              </div>

              {/* Dynamic Animated Progress Bar */}
              <div className="w-full bg-gray-950 rounded-full h-2.5 overflow-hidden p-0.5 border border-gray-800">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${badge.barColor} transition-all duration-700`}
                  style={{ width: `${Math.min(100, sector.occupancy_pct)}%` }}
                />
              </div>

              {/* Bottom Percentage & Status Details */}
              <div className="flex items-center justify-between mt-2.5 text-[11px]">
                <span className="text-gray-400">
                  Density:{' '}
                  <span className={`font-mono font-bold ${sector.occupancy_pct > 85 ? 'text-red-400' : sector.occupancy_pct > 65 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {sector.occupancy_pct}%
                  </span>
                </span>

                <span className="text-gray-500 text-[10px]">
                  {sector.occupancy_pct > 85 ? (
                    <span className="text-red-400 flex items-center gap-0.5">
                      <AlertOctagon className="w-3 h-3" /> Stampede Hazard
                    </span>
                  ) : sector.occupancy_pct > 65 ? (
                    <span className="text-amber-400 flex items-center gap-0.5">
                      <AlertTriangle className="w-3 h-3" /> Heavy Congestion
                    </span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Safe Flow
                    </span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CrowdMetrics;
