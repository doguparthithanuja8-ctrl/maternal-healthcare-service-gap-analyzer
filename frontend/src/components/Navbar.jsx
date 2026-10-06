import React from 'react';
import { Download, UploadCloud, Menu } from 'lucide-react';

export default function Navbar({ currentRoute, onNavigate, onToggleMobileSidebar }) {
  const getPageTitle = (route) => {
    switch (route) {
      case 'home': return 'Platform Overview';
      case 'dashboard': return 'Executive Dashboard';
      case 'areas': return 'District & Area Analysis';
      case 'gaps': return 'Service Gap Priority Matrix';
      case 'map': return 'Geographic Accessibility Map';
      case 'compare': return 'Bilateral Area Comparison';
      case 'reports': return 'Planning Report Generator';
      case 'data': return 'Dataset Validation & Management';
      default: return 'Healthcare Planning';
    }
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Zone 1: Brand Wordmark (Single text element) + Mobile trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
          className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span
          onClick={() => onNavigate('home')}
          className="text-sm font-bold tracking-tight text-[#176B5B] cursor-pointer hover:opacity-90 select-none"
        >
          Maternal Healthcare Analyzer
        </span>
      </div>

      {/* Zone 2: Contextual Current View */}
      <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span>Planning Cycle 2026 Q3</span>
        <span aria-hidden="true">·</span>
        <span className="text-slate-800 font-semibold">{getPageTitle(currentRoute)}</span>
      </div>

      {/* Zone 3: Primary Quick Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate('data')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-[#176B5B] hover:bg-slate-100 border border-slate-200 rounded transition-colors whitespace-nowrap"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Upload Dataset</span>
        </button>
        <button
          onClick={() => onNavigate('reports')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#176B5B] hover:bg-[#125447] rounded transition-colors whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Summary</span>
        </button>
      </div>
    </header>
  );
}
