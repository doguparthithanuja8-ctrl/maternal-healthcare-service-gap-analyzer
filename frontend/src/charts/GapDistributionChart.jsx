import React from 'react';

export default function GapDistributionChart({ adequateCount = 0, moderateCount = 0, priorityCount = 0 }) {
  const total = adequateCount + moderateCount + priorityCount;
  if (total === 0) return null;

  const adequatePct = Math.round((adequateCount / total) * 100);
  const moderatePct = Math.round((moderateCount / total) * 100);
  const priorityPct = 100 - adequatePct - moderatePct;

  return (
    <div className="space-y-3">
      {/* Segmented bar */}
      <div className="h-5 w-full flex rounded-sm overflow-hidden bg-slate-100">
        {adequateCount > 0 && (
          <div
            style={{ width: `${adequatePct}%` }}
            className="bg-[#176B5B] transition-all"
            title={`Adequate Coverage: ${adequateCount} areas (${adequatePct}%)`}
          />
        )}
        {moderateCount > 0 && (
          <div
            style={{ width: `${moderatePct}%` }}
            className="bg-slate-400 transition-all"
            title={`Moderate Gap: ${moderateCount} areas (${moderatePct}%)`}
          />
        )}
        {priorityCount > 0 && (
          <div
            style={{ width: `${priorityPct}%` }}
            className="bg-[#D9A441] transition-all"
            title={`Priority Gap: ${priorityCount} areas (${priorityPct}%)`}
          />
        )}
      </div>

      {/* Legend with tabular numbers */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#176B5B] rounded-sm shrink-0" />
          <span className="text-slate-600 truncate">Adequate ({adequateCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-slate-400 rounded-sm shrink-0" />
          <span className="text-slate-600 truncate">Moderate Gap ({moderateCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-[#D9A441] rounded-sm shrink-0" />
          <span className="text-slate-600 truncate">Priority Gap ({priorityCount})</span>
        </div>
      </div>
    </div>
  );
}
