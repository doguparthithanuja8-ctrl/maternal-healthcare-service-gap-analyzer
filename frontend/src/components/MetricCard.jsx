import React from 'react';

export default function MetricCard({ title, value, unit, subtitle, benchmark, highlight = false }) {
  return (
    <div className={`p-4 bg-white border rounded transition-colors ${highlight ? 'border-[#D9A441]' : 'border-slate-200 hover:border-slate-300'}`}>
      <div className="text-xs font-medium text-slate-500 tracking-tight uppercase mb-1">
        {title}
      </div>
      <div className="flex items-baseline gap-1.5 mb-1.5">
        <span className={`text-2xl font-bold tracking-tight tabular-nums ${highlight ? 'text-[#8C651A]' : 'text-slate-900'}`}>
          {value}
        </span>
        {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
      </div>
      {(subtitle || benchmark) && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          {subtitle && <span>{subtitle}</span>}
          {subtitle && benchmark && <span aria-hidden="true">·</span>}
          {benchmark && (
            <span>
              Target: <strong className="font-semibold text-slate-700 tabular-nums">{benchmark}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
