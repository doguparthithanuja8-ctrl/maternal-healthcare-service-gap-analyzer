# System Architecture Specification

## 1. High-Level System Flow
```
Raw Healthcare Dataset (CSV/JSON/Ministry Exports)
                    ↓
Data Validation & Schema Ingestion Engine
                    ↓
Relational Storage (MySQL 8.0)
                    ↓
C Numerical Analytics Engine (Normalization & Gap Calculus)
                    ↓
Spring Boot 3 REST API Layer (DTOs & Domain Services)
                    ↓
Vite + React Decision-Support Frontend (3-Color Healthcare Design)
                    ↓
Executive Dashboard · Interactive Leaflet Map · Bi-Lateral Area Comparison · Planning Reports
```

## 2. Component Separation & Responsibilities

### Frontend (`/frontend` & `/src`)
- **Technology**: React 19, Vite, Tailwind CSS, Leaflet, OpenStreetMap.
- **Strict Separation**: Presentation and visualization only. Business rules, weighted normalization, and rankings are calculated via the API or transparent analytical utilities.
- **Design System**: 60-30-10 discipline using `#F7F9F8` (60% neutral canvas), `#176B5B` (30% deep healthcare green), and `#D9A441` (10% warm amber accent). Zero AI tropes, zero gradients, zero pill badge sandwiches.

### Backend (`/backend`)
- **Technology**: Java 17, Spring Boot 3.2, Spring Data JPA, Maven.
- **Pattern**: Controller-Service-Repository-DTO pattern. Never expose JPA entities directly to the client; all domain transformations occur through structured DTOs.
- **Resilience**: Service layer includes synthetic domain fallbacks to ensure development and review velocity even before live MySQL daemon linkage.

### Analytics Component (`/analytics`)
- **Technology**: ANSI C with standard mathematical libraries.
- **Role**: High-speed numerical normalization, benchmark delta calculations, and deterministic accessibility ranking.
- **Transparency**: Fully deterministic, explainable, and reproducible formulas. No opaque heuristics or black-box algorithms.

### Database Layer (`/database`)
- **Technology**: MySQL 8.0 InnoDB engine with UTF-8 Unicode collation.
- **Tables**: `areas`, `healthcare_facilities`, `service_indicators`, `users`.
- **Integrity**: Referential integrity enforced with cascading delete constraints and indexed geospatial/foreign keys.

## 3. Strict Boundary & Non-Clinical Declarations
1. **Area-Level Only**: All inputs and outputs describe territorial aggregates (districts, sub-districts, facilities).
2. **Not Diagnostic**: The system explicitly does not diagnose diseases, predict patient-level maternal outcomes, assess individual patient risk, or recommend medical prescriptions.
