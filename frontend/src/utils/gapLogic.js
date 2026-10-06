/**
 * Gap calculus aligned with analytics/src/gap_calculator.c
 */

export function computePercentageGap(observed, benchmark) {
  const obs = Number(observed);
  const target = Number(benchmark);
  if (!Number.isFinite(obs) || !Number.isFinite(target) || target <= 0) return 0;
  if (obs >= target) return 0;
  return Math.round(((target - obs) / target) * 1000) / 10;
}

export function classifyGapPriority(percentageGap) {
  const gap = Number(percentageGap) || 0;
  if (gap <= 15) return 'Adequate';
  if (gap < 30) return 'Moderate Gap';
  if (gap < 50) return 'High Gap';
  return 'Critical Gap';
}
