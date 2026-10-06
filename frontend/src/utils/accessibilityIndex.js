/**
 * Transparent Client-Side Accessibility Index Calculator
 * (Mirrors the exact deterministic logic of the C Analytics Engine)
 */

export function computeAccessibilityIndex(indicators) {
  if (!indicators || !indicators.length) return 0.0;

  let weightedSum = 0;
  let totalWeight = 0;

  indicators.forEach(ind => {
    const obs = Number(ind.observed || ind.observedValue || 0);
    const target = Number(ind.target || ind.benchmarkTarget || 1);
    const weight = Number(ind.weight ?? 0.166);

    // Normalization clamped between 0 and 100
    const normalized = Math.min(100.0, Math.max(0.0, (obs / target) * 100.0));
    weightedSum += normalized * weight;
    totalWeight += weight;
  });

  if (totalWeight <= 0) return 0.0;
  return Math.round((weightedSum / totalWeight) * 100) / 100;
}

export function classifyAccessibilityTier(score) {
  if (score >= 75.0) return 'Adequate Access';
  if (score >= 55.0) return 'Moderate Access';
  if (score >= 40.0) return 'Priority Planning Need';
  return 'High Service Gap';
}
