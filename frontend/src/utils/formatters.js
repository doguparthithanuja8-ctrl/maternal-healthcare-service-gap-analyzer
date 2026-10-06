/**
 * Formatting and Display Utilities
 */

export function formatNumber(val) {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return new Intl.NumberFormat('en-US').format(val);
}

export function formatPercent(val, decimals = 1) {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return `${Number(val).toFixed(decimals)}%`;
}

export function formatIndex(val, decimals = 1) {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return Number(val).toFixed(decimals);
}

export function getTierColorClass(tier) {
  switch (tier) {
    case 'Adequate Access':
      return 'text-[#176B5B] bg-[#E6F0EC] border-[#176B5B]/30';
    case 'Moderate Access':
      return 'text-[#475569] bg-slate-100 border-slate-300';
    case 'Priority Planning Need':
    case 'High Service Gap':
      return 'text-[#8C651A] bg-[#FBF3E2] border-[#D9A441]/40';
    default:
      return 'text-slate-700 bg-slate-100 border-slate-200';
  }
}

export function getPriorityColorClass(priority) {
  const p = (priority || '').toLowerCase();
  if (p.includes('priority') || p.includes('critical') || p.includes('high')) {
    return 'text-[#8C651A] bg-[#FBF3E2] border-[#D9A441]/40';
  }
  if (p.includes('moderate')) {
    return 'text-slate-700 bg-slate-100 border-slate-300';
  }
  return 'text-[#176B5B] bg-[#E6F0EC] border-[#176B5B]/30';
}
