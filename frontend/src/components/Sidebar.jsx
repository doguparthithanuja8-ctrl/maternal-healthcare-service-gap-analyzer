import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  AlertTriangle, 
  Map as MapIcon, 
  GitCompare, 
  FileText, 
  Database, 
  Home as HomeIcon,
  ShieldCheck
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'areas', label: 'Area Analysis', icon: MapPin },
  { id: 'gaps', label: 'Service Gaps', icon: AlertTriangle },
  { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'compare', label: 'Area Comparison', icon: GitCompare },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'data', label: 'Data Management', icon: Database },
];

export default function Sidebar({ currentRoute, onNavigate, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-[#176B5B] text-white flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top Header */}
        <div>
          <div className="p-5 border-b border-white/10">
            <div className="text-xs uppercase tracking-widest text-[#D9A441] font-semibold mb-1">
              Healthcare Analytics
            </div>
            <div className="text-sm font-bold tracking-tight text-white leading-snug">
              Maternal Healthcare
              <span className="block text-white/80 font-normal text-xs">Accessibility & Gap Analyzer</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-medium
                    transition-colors text-left
                    ${isActive 
                      ? 'bg-white/15 text-white font-semibold border-l-2 border-[#D9A441]' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D9A441]' : 'text-white/70'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Scope & Disclaimer Card */}
        <div className="p-4 border-t border-white/10 text-[11px] text-white/75 space-y-2">
          <div className="flex items-center gap-1.5 font-medium text-white/90">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Service-Level Scope</span>
          </div>
          <p className="leading-relaxed text-white/70">
            Decision-support for area accessibility planning. Not clinical diagnostic software.
          </p>
          <div className="pt-1 text-[10px] text-white/50 border-t border-white/10">
            Version 1.0.0 · Project Foundation
          </div>
        </div>
      </aside>
    </>
  );
}
