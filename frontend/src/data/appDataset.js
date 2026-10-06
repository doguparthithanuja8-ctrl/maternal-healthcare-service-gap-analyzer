/**
 * Single source of truth for demo/presentation data.
 * Normalizes raw district records, recomputes gaps and accessibility index deterministically.
 */

import { MOCK_AREAS as RAW_AREAS, BENCHMARKS } from '../utils/mockData.js';
import { computeAccessibilityIndex, classifyAccessibilityTier } from '../utils/accessibilityIndex.js';
import { computePercentageGap, classifyGapPriority } from '../utils/gapLogic.js';

function enrichIndicator(rawInd) {
  const meta = BENCHMARKS[rawInd.code] || {};
  const target = rawInd.target ?? meta.target ?? 0;
  const weight = meta.weight ?? 0.166;
  const gapPct = computePercentageGap(rawInd.observed, target);
  const priority = classifyGapPriority(gapPct);

  return {
    code: rawInd.code,
    name: rawInd.name || meta.name || rawInd.code,
    observed: rawInd.observed,
    target,
    unit: rawInd.unit || meta.unit || '',
    weight,
    gapPct,
    priority,
  };
}

function buildAreaGaps(indicators) {
  return indicators
    .filter((ind) => ind.gapPct >= 25)
    .sort((a, b) => b.gapPct - a.gapPct)
    .map((ind) => ({
      code: ind.code,
      name: ind.name,
      observed: ind.observed,
      target: ind.target,
      gapPct: ind.gapPct,
      priority: ind.priority,
    }));
}

function normalizeArea(raw) {
  const indicators = (raw.indicators || []).map(enrichIndicator);
  const accessibilityIndex = computeAccessibilityIndex(indicators);
  const accessibilityTier = classifyAccessibilityTier(accessibilityIndex);
  const gaps = buildAreaGaps(indicators);

  return {
    ...raw,
    indicators,
    accessibilityIndex,
    accessibilityTier,
    gaps,
  };
}

let cached = null;

export function getNormalizedAreas() {
  if (!cached) {
    cached = RAW_AREAS.map(normalizeArea);
  }
  return cached;
}

export function getAreaById(id) {
  return getNormalizedAreas().find((a) => a.id === id) || getNormalizedAreas()[0];
}

export function getAreaSummaries() {
  return getNormalizedAreas().map((a) => ({
    id: a.id,
    name: a.name,
    code: a.code,
    region: a.region,
    population: a.population,
    facilityCount: a.facilities.length,
    skilledWorkersCount: a.facilities.reduce((sum, f) => sum + (f.attendants || 0), 0),
    ancCoveragePct: a.indicators.find((i) => i.code === 'ANC_COV')?.observed || 0,
    accessibilityIndex: a.accessibilityIndex,
    accessibilityTier: a.accessibilityTier,
    identifiedGapsCount: a.gaps.length,
    latitude: a.latitude,
    longitude: a.longitude,
  }));
}

export function getAllServiceGaps() {
  const rows = [];
  getNormalizedAreas().forEach((area) => {
    area.indicators.forEach((ind) => {
      if (ind.gapPct <= 5) return;
      rows.push({
        areaId: area.id,
        areaName: area.name,
        region: area.region,
        indicatorCode: ind.code,
        indicatorName: ind.name,
        observedValue: ind.observed,
        benchmarkTarget: ind.target,
        gapPercentage: ind.gapPct,
        unit: ind.unit,
        priority: ind.priority,
      });
    });
  });
  return rows.sort((a, b) => b.gapPercentage - a.gapPercentage);
}

export function getDashboardPayload() {
  const areas = getNormalizedAreas();
  const summaries = getAreaSummaries();
  const allGaps = getAllServiceGaps();

  const avg = (code) => {
    const vals = areas.map((a) => a.indicators.find((i) => i.code === code)?.observed).filter((v) => v != null);
    if (!vals.length) return 0;
    return Math.round((vals.reduce((s, v) => s + v, 0) / vals.length) * 10) / 10;
  };

  const averageAccessibilityIndex =
    Math.round((areas.reduce((s, a) => s + a.accessibilityIndex, 0) / areas.length) * 100) / 100;

  const areasWithSignificantGaps = areas.filter((a) => a.accessibilityIndex < 55).length;

  return {
    kpis: {
      areasAnalyzed: areas.length,
      healthcareFacilities: areas.reduce((s, a) => s + a.facilities.length, 0),
      skilledHealthcareWorkers: areas.reduce(
        (s, a) => s + a.facilities.reduce((fs, f) => fs + (f.attendants || 0), 0),
        0
      ),
      averageAncCoveragePct: avg('ANC_COV'),
      averageAccessibilityIndex,
      areasWithSignificantGaps,
    },
    indicatorAverages: {
      ANC_COV: avg('ANC_COV'),
      INST_DELIV: avg('INST_DELIV'),
      PNC_CARE: avg('PNC_CARE'),
      SKILLED_STAFF: avg('SKILLED_STAFF'),
      DIAGNOSTIC_SCORE: avg('DIAGNOSTIC_SCORE'),
      EMERG_TRANSPORT: avg('EMERG_TRANSPORT'),
    },
    areas: summaries,
    priorityGaps: allGaps.filter((g) => g.gapPercentage >= 25).slice(0, 6),
    dataPeriod: '2026 Q3 Planning Cycle',
    lastUpdated: 'October 2026',
    disclaimer:
      'This analytical index is defined for project-level comparison of service availability. It is not a clinical or medical-risk score.',
  };
}

export function compareAreasPayload(idA, idB) {
  const areaA = getAreaById(idA);
  const areaB = getAreaById(idB);

  const rows = [
    {
      metric: 'Composite Accessibility Index',
      valueA: areaA.accessibilityIndex,
      valueB: areaB.accessibilityIndex,
      benchmark: 75.0,
      unit: 'Score',
      delta: Math.round((areaA.accessibilityIndex - areaB.accessibilityIndex) * 10) / 10,
    },
  ];

  areaA.indicators.forEach((indA) => {
    const indB = areaB.indicators.find((i) => i.code === indA.code) || indA;
    rows.push({
      metric: indA.name,
      valueA: indA.observed,
      valueB: indB.observed,
      benchmark: indA.target,
      unit: indA.unit,
      delta: Math.round((indA.observed - indB.observed) * 10) / 10,
    });
  });

  return { areaA, areaB, metricRows: rows };
}

export const DATASET_CATALOG = [
  {
    id: 'maternal_health_district_data',
    name: 'Maternal Health District Indicators',
    records: 6,
    fields: ['area_id', 'anc_coverage_pct', 'institutional_delivery_pct', 'postnatal_care_pct', 'skilled_workforce_density', 'diagnostic_availability_score', 'emergency_transport_coverage_pct'],
    lastProcessed: '2026-10-02',
    qualityStatus: 'Validated (demo)',
  },
  {
    id: 'facilities_inventory',
    name: 'Healthcare Facilities Inventory',
    records: 16,
    fields: ['facility_id', 'area_id', 'facility_type', 'maternity_beds', 'skilled_attendants'],
    lastProcessed: '2026-10-02',
    qualityStatus: 'Validated (demo)',
  },
  {
    id: 'indicators_benchmark',
    name: 'National Planning Benchmarks',
    records: 6,
    fields: ['indicator_code', 'benchmark_target', 'weight', 'unit'],
    lastProcessed: '2026-10-01',
    qualityStatus: 'Reference (demo)',
  },
];
