import React from 'react';

export default function StatusBadge({ status, size = 'normal' }) {
  const s = (status || '').toLowerCase();
  let colorStyle = 'text-slate-700 bg-slate-100 border-slate-300';
  let dotStyle = 'bg-slate-500';

  if (s.includes('adequate')) {
    colorStyle = 'text-[#176B5B] bg-[#E6F0EC] border-[#176B5B]/30';
    dotStyle = 'bg-[#176B5B]';
  } else if (s.includes('moderate')) {
    colorStyle = 'text-slate-700 bg-slate-100 border-slate-300';
    dotStyle = 'bg-slate-500';
  } else if (s.includes('priority') || s.includes('high') || s.includes('critical')) {
    colorStyle = 'text-[#8C651A] bg-[#FBF3E2] border-[#D9A441]/40';
    dotStyle = 'bg-[#D9A441]';
  }

  const pxPy = size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-sm border ${pxPy} ${colorStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotStyle}`} />
      <span className="whitespace-nowrap">{status}</span>
    </span>
  );
}
