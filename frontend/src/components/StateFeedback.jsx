import React from 'react';

export function LoadingState({ message = 'Loading healthcare service data...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200 rounded">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-[#176B5B] rounded-full animate-spin mb-3" />
      <div className="text-xs font-medium text-slate-600">{message}</div>
    </div>
  );
}

export function EmptyState({ title = 'No Data Available', message = 'No healthcare records match the selected filter criteria.', action }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 rounded">
      <div className="text-sm font-semibold text-slate-800 mb-1">{title}</div>
      <p className="text-xs text-slate-500 max-w-sm mb-4">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

export function ErrorState({ title = 'Service Notice', message = 'Data service is currently unavailable. Using fallback analytical dataset.', onRetry }) {
  return (
    <div className="p-4 bg-white border border-[#D9A441]/40 rounded mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
      <div>
        <div className="font-semibold text-[#8C651A]">{title}</div>
        <div className="text-slate-600 mt-0.5">{message}</div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 font-medium text-xs text-white bg-[#176B5B] hover:bg-[#125447] rounded transition-colors whitespace-nowrap"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}
