import React from 'react';

/**
 * Clean Healthcare Analytical Comparison Bar Chart
 * Adheres strictly to the 3-color design palette:
 * Canvas: #F7F9F8, Bars: #176B5B, Benchmark/Highlight: #D9A441
 */
export default function BarChart({ data = [], height = 260, title, showBenchmark = true }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-xs text-slate-500 border border-dashed border-slate-200 rounded">
        No comparative metric data available
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => Math.max(d.value || 0, d.benchmark || 0)), 100);

  return (
    <div className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-700">
          <span>{title}</span>
          {showBenchmark && (
            <div className="flex items-center gap-3 font-normal text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#176B5B] rounded-sm" /> Observed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#D9A441] rounded-sm" /> Target Benchmark
              </span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3.5">
        {data.map((item, idx) => {
          const val = Number(item.value || 0);
          const bench = Number(item.benchmark || 100);
          const pct = Math.min(100, Math.max(0, (val / maxValue) * 100));
          const benchPct = Math.min(100, Math.max(0, (bench / maxValue) * 100));
          const isGap = val < bench;

          return (
            <div key={idx} className="group">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium text-slate-800 truncate max-w-xs">{item.label}</span>
                <div className="flex items-center gap-2 tabular-nums">
                  <span className="font-semibold text-slate-900">
                    {val}{item.unit || '%'}
                  </span>
                  {showBenchmark && (
                    <span className="text-slate-400 text-[11px]">
                      / {bench}{item.unit || '%'}
                    </span>
                  )}
                </div>
              </div>

              {/* Bar track */}
              <div className="relative h-4 bg-slate-100 rounded-sm overflow-hidden">
                {/* Benchmark marker line */}
                {showBenchmark && (
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[#D9A441] z-10"
                    style={{ left: `${benchPct}%` }}
                    title={`Benchmark Target: ${bench}${item.unit || '%'}`}
                  />
                )}

                {/* Progress bar */}
                <div
                  className={`h-full transition-all duration-300 rounded-sm ${
                    isGap ? 'bg-[#176B5B]' : 'bg-[#176B5B]'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
