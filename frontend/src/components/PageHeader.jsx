import React from 'react';

export default function PageHeader({ title, subtitle, kicker, actions }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
      <div>
        {kicker && (
          <div className="text-xs font-semibold text-[#176B5B] uppercase tracking-wider mb-1">
            {kicker}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2.5 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
