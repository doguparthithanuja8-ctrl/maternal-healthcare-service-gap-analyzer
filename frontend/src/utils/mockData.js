/**
 * Synthetic Healthcare Planning Demonstration Dataset
 *
 * IMPORTANT DISCLAIMER:
 * This data is synthetic and generated solely for testing, demonstration, and
 * architecture verification. It does NOT represent verified government statistics
 * or real clinical patients.
 */

export const BENCHMARKS = {
  ANC_COV: {
    code: 'ANC_COV',
    name: 'Antenatal Care 4+ Visits Coverage',
    target: 80.0,
    unit: '%',
    weight: 0.18,
    description: 'Percentage of pregnant women attending at least 4 antenatal care visits.'
  },
  INST_DELIV: {
    code: 'INST_DELIV',
    name: 'Institutional Delivery Rate',
    target: 85.0,
    unit: '%',
    weight: 0.20,
    description: 'Proportion of births occurring in qualified healthcare facilities.'
  },
  PNC_CARE: {
    code: 'PNC_CARE',
    name: 'Postnatal Care within 48 Hours',
    target: 75.0,
    unit: '%',
    weight: 0.16,
    description: 'Percentage of mothers receiving clinical checkup within 48h after birth.'
  },
  SKILLED_STAFF: {
    code: 'SKILLED_STAFF',
    name: 'Skilled Workforce Density',
    target: 4.5,
    unit: 'per 10k',
    weight: 0.18,
    description: 'Certified midwives and medical officers per 10,000 target reproductive population.'
  },
  DIAGNOSTIC_SCORE: {
    code: 'DIAGNOSTIC_SCORE',
    name: 'Diagnostic Availability Score',
    target: 75.0,
    unit: 'Score',
    weight: 0.14,
    description: 'Standardized readiness index for ultrasound, hemoglobin testing, and blood typing.'
  },
  EMERG_TRANSPORT: {
    code: 'EMERG_TRANSPORT',
    name: 'Emergency Transport 45min Reach',
    target: 70.0,
    unit: '%',
    weight: 0.14,
    description: 'Percentage of community settlements within 45-minute ambulance transfer to referral center.'
  }
};

export const MOCK_AREAS = [
  {
    id: 'area-001',
    name: 'North Riverdale District',
    code: 'NRD-01',
    region: 'Northern Province',
    population: 245000,
    targetReproductivePop: 58000,
    areaSqKm: 1420.5,
    terrainType: 'Plains',
    latitude: 24.1200,
    longitude: 88.2400,
    accessibilityIndex: 72.85,
    accessibilityTier: 'Moderate Access',
    indicators: [
      { code: 'ANC_COV', name: 'ANC 4+ Coverage', observed: 76.4, target: 80.0, unit: '%', gapPct: 4.5, priority: 'Adequate' },
      { code: 'INST_DELIV', name: 'Institutional Delivery', observed: 81.2, target: 85.0, unit: '%', gapPct: 4.5, priority: 'Adequate' },
      { code: 'PNC_CARE', name: 'Postnatal Care (48h)', observed: 68.5, target: 75.0, unit: '%', gapPct: 8.7, priority: 'Adequate' },
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 4.2, target: 4.5, unit: 'per 10k', gapPct: 6.7, priority: 'Adequate' },
      { code: 'DIAGNOSTIC_SCORE', name: 'Diagnostic Availability', observed: 72.0, target: 75.0, unit: 'Score', gapPct: 4.0, priority: 'Adequate' },
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 64.0, target: 70.0, unit: '%', gapPct: 8.6, priority: 'Adequate' }
    ],
    facilities: [
      { id: 'fac-101', name: 'Riverdale District General Hospital', type: 'District Hospital', beds: 45, attendants: 14, ambulance: true, lab: true, hours: '24/7' },
      { id: 'fac-102', name: 'East Riverdale Community Health Center', type: 'Community Health Centre', beds: 12, attendants: 4, ambulance: false, lab: true, hours: '12 Hours' },
      { id: 'fac-103', name: 'North Outpost Primary Health Centre', type: 'Primary Health Centre', beds: 4, attendants: 1, ambulance: false, lab: false, hours: 'Day Only' }
    ],
    gaps: [
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 64.0, target: 70.0, gapPct: 8.6, priority: 'Moderate Gap' }
    ]
  },
  {
    id: 'area-002',
    name: 'Highland Valley Division',
    code: 'HVD-02',
    region: 'Eastern Highlands',
    population: 178000,
    targetReproductivePop: 41000,
    areaSqKm: 2890.0,
    terrainType: 'Mountainous',
    latitude: 24.6500,
    longitude: 89.1200,
    accessibilityIndex: 43.68,
    accessibilityTier: 'Priority Planning Need',
    indicators: [
      { code: 'ANC_COV', name: 'ANC 4+ Coverage', observed: 51.2, target: 80.0, unit: '%', gapPct: 36.0, priority: 'High Gap' },
      { code: 'INST_DELIV', name: 'Institutional Delivery', observed: 46.8, target: 85.0, unit: '%', gapPct: 44.9, priority: 'High Gap' },
      { code: 'PNC_CARE', name: 'Postnatal Care (48h)', observed: 41.5, target: 75.0, unit: '%', gapPct: 44.7, priority: 'High Gap' },
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 2.1, target: 4.5, unit: 'per 10k', gapPct: 53.3, priority: 'Critical Gap' },
      { code: 'DIAGNOSTIC_SCORE', name: 'Diagnostic Availability', observed: 38.0, target: 75.0, unit: 'Score', gapPct: 49.3, priority: 'High Gap' },
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 32.5, target: 70.0, unit: '%', gapPct: 53.6, priority: 'Critical Gap' }
    ],
    facilities: [
      { id: 'fac-201', name: 'Highland Valley District Referral Hospital', type: 'District Hospital', beds: 28, attendants: 7, ambulance: true, lab: true, hours: '24/7' },
      { id: 'fac-202', name: 'Pine Ridge Community Health Center', type: 'Community Health Centre', beds: 8, attendants: 2, ambulance: false, lab: false, hours: '12 Hours' },
      { id: 'fac-203', name: 'Summit Pass Health Post', type: 'Primary Health Centre', beds: 2, attendants: 1, ambulance: false, lab: false, hours: 'Day Only' }
    ],
    gaps: [
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport 45m', observed: 32.5, target: 70.0, gapPct: 53.6, priority: 'Priority Gap' },
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 2.1, target: 4.5, gapPct: 53.3, priority: 'Priority Gap' },
      { code: 'DIAGNOSTIC_SCORE', name: 'Diagnostic Availability', observed: 38.0, target: 75.0, gapPct: 49.3, priority: 'Priority Gap' },
      { code: 'INST_DELIV', name: 'Institutional Delivery', observed: 46.8, target: 85.0, gapPct: 44.9, priority: 'Priority Gap' }
    ]
  },
  {
    id: 'area-003',
    name: 'Coastal Delta Zone',
    code: 'CDZ-03',
    region: 'Southern Delta',
    population: 312000,
    targetReproductivePop: 76000,
    areaSqKm: 1850.25,
    terrainType: 'Coastal',
    latitude: 22.3500,
    longitude: 89.9800,
    accessibilityIndex: 49.75,
    accessibilityTier: 'Priority Planning Need',
    indicators: [
      { code: 'ANC_COV', name: 'ANC 4+ Coverage', observed: 58.6, target: 80.0, unit: '%', gapPct: 26.8, priority: 'Moderate Gap' },
      { code: 'INST_DELIV', name: 'Institutional Delivery', observed: 54.1, target: 85.0, unit: '%', gapPct: 36.4, priority: 'High Gap' },
      { code: 'PNC_CARE', name: 'Postnatal Care (48h)', observed: 49.3, target: 75.0, unit: '%', gapPct: 34.3, priority: 'High Gap' },
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 2.6, target: 4.5, unit: 'per 10k', gapPct: 42.2, priority: 'High Gap' },
      { code: 'DIAGNOSTIC_SCORE', name: 'Diagnostic Availability', observed: 44.5, target: 75.0, unit: 'Score', gapPct: 40.7, priority: 'High Gap' },
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 41.0, target: 70.0, unit: '%', gapPct: 41.4, priority: 'High Gap' }
    ],
    facilities: [
      { id: 'fac-301', name: 'Delta Haven Subdistrict Hospital', type: 'Subdistrict Hospital', beds: 30, attendants: 8, ambulance: true, lab: true, hours: '24/7' },
      { id: 'fac-302', name: 'Estuary Island Health Centre', type: 'Community Health Centre', beds: 6, attendants: 2, ambulance: false, lab: false, hours: 'Day Only' },
      { id: 'fac-303', name: 'Creek Side Maternity Post', type: 'Maternity Clinic', beds: 4, attendants: 2, ambulance: false, lab: false, hours: '12 Hours' }
    ],
    gaps: [
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 2.6, target: 4.5, gapPct: 42.2, priority: 'Priority Gap' },
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 41.0, target: 70.0, gapPct: 41.4, priority: 'Priority Gap' },
      { code: 'DIAGNOSTIC_SCORE', name: 'Diagnostic Availability', observed: 44.5, target: 75.0, gapPct: 40.7, priority: 'Priority Gap' }
    ]
  },
  {
    id: 'area-004',
    name: 'Central Metro Corridor',
    code: 'CMC-04',
    region: 'Central Province',
    population: 520000,
    targetReproductivePop: 134000,
    areaSqKm: 680.0,
    terrainType: 'Urban',
    latitude: 23.7100,
    longitude: 90.4100,
    accessibilityIndex: 89.40,
    accessibilityTier: 'Adequate Access',
    indicators: [
      { code: 'ANC_COV', name: 'ANC 4+ Coverage', observed: 89.5, target: 80.0, unit: '%', gapPct: 0.0, priority: 'Adequate' },
      { code: 'INST_DELIV', name: 'Institutional Delivery', observed: 92.4, target: 85.0, unit: '%', gapPct: 0.0, priority: 'Adequate' },
      { code: 'PNC_CARE', name: 'Postnatal Care (48h)', observed: 84.1, target: 75.0, unit: '%', gapPct: 0.0, priority: 'Adequate' },
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 6.8, target: 4.5, unit: 'per 10k', gapPct: 0.0, priority: 'Adequate' },
      { code: 'DIAGNOSTIC_SCORE', name: 'Diagnostic Availability', observed: 91.0, target: 75.0, unit: 'Score', gapPct: 0.0, priority: 'Adequate' },
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 88.5, target: 70.0, unit: '%', gapPct: 0.0, priority: 'Adequate' }
    ],
    facilities: [
      { id: 'fac-401', name: 'Central Metro Women & Children Hospital', type: 'District Hospital', beds: 95, attendants: 38, ambulance: true, lab: true, hours: '24/7' },
      { id: 'fac-402', name: 'North Metro Polyclinic & Maternity Unit', type: 'Community Health Centre', beds: 24, attendants: 12, ambulance: true, lab: true, hours: '24/7' },
      { id: 'fac-403', name: 'Capital West Maternity Centre', type: 'Maternity Clinic', beds: 18, attendants: 8, ambulance: true, lab: false, hours: '12 Hours' }
    ],
    gaps: []
  },
  {
    id: 'area-005',
    name: 'West Foothills Sub-district',
    code: 'WFS-05',
    region: 'Western Border',
    population: 142000,
    targetReproductivePop: 33500,
    areaSqKm: 2100.8,
    terrainType: 'Hilly',
    latitude: 23.9500,
    longitude: 88.9000,
    accessibilityIndex: 36.60,
    accessibilityTier: 'High Service Gap',
    indicators: [
      { code: 'ANC_COV', name: 'ANC 4+ Coverage', observed: 44.3, target: 80.0, unit: '%', gapPct: 44.6, priority: 'High Gap' },
      { code: 'INST_DELIV', name: 'Institutional Delivery', observed: 39.5, target: 85.0, unit: '%', gapPct: 53.5, priority: 'Critical Gap' },
      { code: 'PNC_CARE', name: 'Postnatal Care (48h)', observed: 35.8, target: 75.0, unit: '%', gapPct: 52.3, priority: 'Critical Gap' },
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 1.8, target: 4.5, unit: 'per 10k', gapPct: 60.0, priority: 'Critical Gap' },
      { code: 'DIAGNOSTIC_SCORE', name: 'Diagnostic Availability', observed: 32.0, target: 75.0, unit: 'Score', gapPct: 57.3, priority: 'Critical Gap' },
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 28.0, target: 70.0, unit: '%', gapPct: 60.0, priority: 'Critical Gap' }
    ],
    facilities: [
      { id: 'fac-501', name: 'West Foothills Rural Hospital', type: 'Subdistrict Hospital', beds: 16, attendants: 4, ambulance: false, lab: true, hours: '12 Hours' },
      { id: 'fac-502', name: 'Border Ridge Health Center', type: 'Primary Health Centre', beds: 4, attendants: 1, ambulance: false, lab: false, hours: 'Day Only' }
    ],
    gaps: [
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 1.8, target: 4.5, gapPct: 60.0, priority: 'Priority Gap' },
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 28.0, target: 70.0, gapPct: 60.0, priority: 'Priority Gap' },
      { code: 'DIAGNOSTIC_SCORE', name: 'Diagnostic Availability', observed: 32.0, target: 75.0, gapPct: 57.3, priority: 'Priority Gap' },
      { code: 'INST_DELIV', name: 'Institutional Delivery', observed: 39.5, target: 85.0, gapPct: 53.5, priority: 'Priority Gap' },
      { code: 'PNC_CARE', name: 'Postnatal Care (48h)', observed: 35.8, target: 75.0, gapPct: 52.3, priority: 'Priority Gap' }
    ]
  },
  {
    id: 'area-006',
    name: 'Lake Basin Community',
    code: 'LBC-06',
    region: 'Central Province',
    population: 198000,
    targetReproductivePop: 46200,
    areaSqKm: 1150.4,
    terrainType: 'Plains',
    latitude: 23.4000,
    longitude: 90.1500,
    accessibilityIndex: 67.25,
    accessibilityTier: 'Moderate Access',
    indicators: [
      { code: 'ANC_COV', name: 'ANC 4+ Coverage', observed: 71.8, target: 80.0, unit: '%', gapPct: 10.3, priority: 'Moderate Gap' },
      { code: 'INST_DELIV', name: 'Institutional Delivery', observed: 74.5, target: 85.0, unit: '%', gapPct: 12.4, priority: 'Moderate Gap' },
      { code: 'PNC_CARE', name: 'Postnatal Care (48h)', observed: 65.2, target: 75.0, unit: '%', gapPct: 13.1, priority: 'Moderate Gap' },
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 3.8, target: 4.5, unit: 'per 10k', gapPct: 15.6, priority: 'Moderate Gap' },
      { code: 'DIAGNOSTIC_SCORE', name: 'Diagnostic Availability', observed: 66.0, target: 75.0, unit: 'Score', gapPct: 12.0, priority: 'Moderate Gap' },
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 59.0, target: 70.0, unit: '%', gapPct: 15.7, priority: 'Moderate Gap' }
    ],
    facilities: [
      { id: 'fac-601', name: 'Lake Basin Community Health Centre', type: 'Community Health Centre', beds: 20, attendants: 6, ambulance: true, lab: true, hours: '24/7' },
      { id: 'fac-602', name: 'South Shore Primary Post', type: 'Primary Health Centre', beds: 6, attendants: 2, ambulance: false, lab: false, hours: 'Day Only' }
    ],
    gaps: [
      { code: 'EMERG_TRANSPORT', name: 'Emergency Transport Reach', observed: 59.0, target: 70.0, gapPct: 15.7, priority: 'Moderate Gap' },
      { code: 'SKILLED_STAFF', name: 'Skilled Workforce Density', observed: 3.8, target: 4.5, gapPct: 15.6, priority: 'Moderate Gap' }
    ]
  }
];

export const MOCK_DASHBOARD_DATA = {
  kpis: {
    areasAnalyzed: 6,
    healthcareFacilities: 16,
    skilledHealthcareWorkers: 118,
    averageAncCoveragePct: 65.3,
    averageAccessibilityIndex: 59.9,
    areasWithSignificantGaps: 3
  },
  dataPeriod: '2026 Q3 Planning Cycle',
  lastUpdated: 'October 2026',
  disclaimer: 'This analytical index is defined for project-level comparison of service availability. It is not a clinical or medical-risk score.'
};
