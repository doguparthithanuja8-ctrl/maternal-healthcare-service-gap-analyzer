# Database Schema & Data Dictionary

## Database Engine
- **Engine**: MySQL 8.0 / InnoDB
- **Character Set**: `utf8mb4`
- **Collation**: `utf8mb4_unicode_ci`

## Entity Relationship Overview
```
+---------------+        1:N        +-----------------------+
|     areas     |-------------------| healthcare_facilities |
+---------------+                   +-----------------------+
        |
        | 1:N
        v
+--------------------+
| service_indicators |
+--------------------+

+---------------+ (Standalone RBAC)
|     users     |
+---------------+
```

## Schema Entities

### 1. `areas`
| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | VARCHAR(36) | NO (PK) | Primary UUID identifier |
| `name` | VARCHAR(120) | NO | Official administrative district name |
| `code` | VARCHAR(30) | NO (UNIQUE) | Standard jurisdiction code (e.g. `NRD-01`) |
| `region` | VARCHAR(100) | NO | State / Province / Zone |
| `population` | INT UNSIGNED | NO | Total resident population |
| `target_reproductive_pop` | INT UNSIGNED | NO | Women of reproductive age (15-49) |
| `area_sq_km` | DECIMAL(10,2) | NO | Geographic surface area in km² |
| `terrain_type` | ENUM | NO | `PLAINS`, `COASTAL`, `HILLY`, `MOUNTAINOUS`, `URBAN` |
| `latitude` | DECIMAL(10,6) | NO | Administrative center latitude |
| `longitude` | DECIMAL(10,6) | NO | Administrative center longitude |
| `status` | ENUM | NO | `ACTIVE`, `ARCHIVED` |

### 2. `healthcare_facilities`
| Column | Type | Nullable | Description |
|---|---|---|---|
| `id` | VARCHAR(36) | NO (PK) | Primary facility UUID |
| `area_id` | VARCHAR(36) | NO (FK) | Reference to `areas(id)` |
| `name` | VARCHAR(150) | NO | Health facility name |
| `facility_type` | ENUM | NO | Level of care (Primary, Community, Hospital) |
| `maternity_beds` | INT UNSIGNED | NO | Dedicated maternity bed count |
| `skilled_birth_attendants` | INT UNSIGNED | NO | Staffed midwives / OB-GYN doctors |
| `has_emergency_transport` | BOOLEAN | NO | Dedicated transfer ambulance available |
| `has_diagnostic_lab` | BOOLEAN | NO | On-site essential obstetric labs |
| `has_blood_storage` | BOOLEAN | NO | Cold-chain blood storage capacity |
| `operating_hours` | ENUM | NO | `TWENTY_FOUR_SEVEN`, `TWELVE_HOUR`, `DAY_ONLY` |

### 3. `service_indicators`
Stores periodic area-level observations:
- `anc_coverage_pct`: Antenatal care 4+ visits coverage
- `institutional_delivery_pct`: Institutional facility birth rate
- `postnatal_care_pct`: Postnatal checkup within 48h
- `skilled_workforce_density`: Attendants per 10k target population
- `diagnostic_availability_score`: Readiness score (0-100)
- `emergency_transport_coverage_pct`: 45-minute ambulance reach
- `calculated_accessibility_index`: Normalized project accessibility index
