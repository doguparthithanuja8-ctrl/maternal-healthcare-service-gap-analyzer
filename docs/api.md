# REST API Specification

Base URL: `http://localhost:8080/api` (configurable via `VITE_API_BASE_URL`)

## 1. Overview Endpoints

### `GET /api/dashboard`
Returns high-level KPI cards, list of areas with status summaries, and high-priority service gaps.
#### Response:
```json
{
  "kpis": {
    "areasAnalyzed": 6,
    "healthcareFacilities": 16,
    "skilledHealthcareWorkers": 118,
    "averageAncCoveragePct": 65.3,
    "averageAccessibilityIndex": 59.9,
    "areasWithSignificantGaps": 3
  },
  "areas": [ ... ],
  "priorityGaps": [ ... ],
  "dataPeriod": "2026 Q3 Planning Cycle",
  "disclaimer": "This analytical index is defined for project-level comparison of service availability. It is not a clinical or medical-risk score."
}
```

---

### `GET /api/areas`
Returns collection of administrative areas with core summary statistics and geographic coordinates.

---

### `GET /api/areas/{id}`
Returns granular area details, including demographic breakdowns, facilities inventory, full indicator array, and identified service gaps.

---

### `GET /api/indicators/{areaId}`
Returns raw and normalized service indicator records for the specified area.

---

### `GET /api/facilities/{areaId}`
Returns inventory of healthcare facilities, bed capacity, skilled staff count, and 24/7 emergency service indicators.

---

### `GET /api/gaps`
#### Query Parameters:
- `priority`: `ALL` | `High` | `Moderate` | `Adequate`
Returns list of observed service gaps against target planning benchmarks.

---

### `GET /api/compare?areaA={idA}&areaB={idB}`
Returns bilateral comparison matrix comparing indicators, workforce density, and composite accessibility indices between two jurisdictions.
