# Maternal Healthcare Accessibility & Service Gap Analyzer

A data-driven decision-support platform for analyzing maternal healthcare service availability, composite accessibility indexes, and infrastructure service gaps across communities and administrative districts.

## QUICK START (Presentation Demo)

The **main application** lives in `frontend/`. It runs fully offline using bundled synthetic district data (no MySQL, no Spring Boot, no API keys required).

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** — all eight views (Home, Dashboard, Area Analysis, Service Gaps, Map, Area Comparison, Reports, Data Management) work from local data.

Production build:

```bash
cd frontend
npm run build
```

Optional: set `VITE_ENABLE_BACKEND=true` in a `frontend/.env` file to prefer the Spring Boot API on port 8080 when available. Default is local-only for stable demos.

> **Note:** The repository root also contains a separate TypeScript/Vite scaffold (`src/App.tsx`). That is **not** the healthcare analyzer UI — use `frontend/` for the presentation.

> **IMPORTANT DISCLAIMER**:
> This platform is an area-level decision-support and healthcare planning system.
> It does **NOT**:
> - Diagnose medical diseases or obstetric complications
> - Predict individual pregnancy outcomes or clinical trajectories
> - Predict maternal mortality rates for individuals
> - Recommend medical treatment, prescriptions, or clinical procedures
> - Classify individual pregnant women as high or low clinical risk
> - Replace licensed doctors, midwives, or clinical healthcare professionals
> - Make unsupported clinical claims
>
> The system analyzes **service-level** and **area-level** availability data only.

---

## 1. Project Purpose
Public health agencies, regional administrators, and healthcare planners frequently struggle to identify which geographical jurisdictions suffer from disproportionate shortages in obstetric emergency transport, qualified midwives, essential diagnostic equipment, and antenatal care infrastructure.

This platform bridges this critical planning gap by:
1. Standardizing area-level maternal health service indicators.
2. Quantifying deficits against national healthcare planning benchmarks.
3. Formulating an explainable, deterministic **Project-Defined Healthcare Accessibility Index**.
4. Visualizing disparities on interactive GIS maps and bilateral district comparisons.
5. Prioritizing resource investments to optimize public health outcomes.

---

## 2. Core Architecture & Workflow
```
Healthcare Dataset (CSV / Health Census)
                    ↓
Data Validation & Schema Ingestion Engine
                    ↓
Relational Database (MySQL 8.0)
                    ↓
C Numerical Analytics Engine (Normalization & Gap Calculus)
                    ↓
Spring Boot 3 REST API Layer (DTOs & Service Layer)
                    ↓
React + Vite Healthcare Decision-Support Frontend
                    ↓
Dashboard · Interactive Map · Area Comparison · Planning Reports
```

---

## 3. Technology Stack

### Frontend
- **Framework**: React 19, JavaScript (ES2022), HTML5, CSS3
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4 with a strict 3-color enterprise healthcare palette (60-30-10)
- **Mapping & GIS**: Leaflet 1.9.4 & OpenStreetMap
- **Icons**: Lucide React

### Backend
- **Framework**: Java 17, Spring Boot 3.2.3, Spring Data JPA
- **Build & Dependency Management**: Apache Maven 3.8+
- **Database Engine**: MySQL 8.0 (with in-memory H2 fallback for testing)
- **API Standard**: RESTful JSON over HTTP

### Analytics Foundation
- **Language**: ANSI C (C99 / C11)
- **Build Tool**: GNU Make / CMake
- **Purpose**: Transparent, deterministic indicator normalization, gap calculus, and accessibility ranking

---

## 4. Repository Folder Structure
```
├── /frontend               # Standalone React + Vite Frontend Application
│   ├── index.html          # HTML entry point with Leaflet styles
│   ├── package.json        # Frontend NPM dependencies & scripts
│   ├── vite.config.js      # Vite build configuration
│   └── src/
│       ├── App.jsx         # Client-side router & navigation state
│       ├── main.jsx        # React root mounter
│       ├── charts/         # Clean SVG bar & distribution charts
│       ├── components/     # Reusable UI controls (Navbar, Sidebar, DataTable, MetricCard, etc.)
│       ├── layouts/        # MainLayout frame
│       ├── maps/           # Leaflet OpenStreetMap component
│       ├── pages/          # 8 core views (Home, Dashboard, Areas, Gaps, Map, Compare, Reports, Data)
│       ├── services/       # REST API service layer with graceful offline fallbacks
│       ├── styles/         # Healthcare color tokens & main CSS
│       └── utils/          # Formatting, mock data, client-side index calculator
│
├── /backend                # Standalone Spring Boot Maven Backend
│   ├── pom.xml             # Maven dependencies (Spring Boot, JPA, MySQL)
│   ├── README.md           # Backend developer documentation
│   └── src/main/
│       ├── resources/      # application.properties (DB, CORS, server port)
│       └── java/com/maternalhealth/analyzer/
│           ├── AnalyzerApplication.java
│           ├── config/     # CorsConfig, WebConfig
│           ├── controller/ # AreaController, DashboardController, ServiceGapController, ComparisonController, FacilityController
│           ├── dto/        # Strongly-typed data transfer objects
│           ├── exception/  # GlobalExceptionHandler, ResourceNotFoundException
│           ├── model/      # JPA entities (Area, HealthcareFacility, ServiceIndicator, User)
│           ├── repository/ # Spring Data JPA repositories
│           └── service/    # AreaService, DashboardService, ServiceGapService, ComparisonService
│
├── /analytics              # Deterministic C Numerical Analytics Engine
│   ├── Makefile            # Build targets (all, run, clean)
│   ├── README.md           # Analytics mathematical specification
│   ├── include/            # analyzer.h header
│   └── src/                # normalization.c, gap_calculator.c, accessibility_index.c, main.c
│
├── /database               # Relational Database Schemas & Data
│   ├── schema.sql          # MySQL DDL (tables, foreign keys, indexes)
│   └── sample_data.sql     # Synthetic demonstration seed data
│
├── /dataset                # Benchmark Guidelines & CSV Datasets
│   ├── maternal_health_district_data.csv
│   ├── indicators_benchmark.csv
│   ├── facilities_inventory.csv
│   └── README.md
│
├── /docs                   # Technical Architecture & Handoff Documentation
│   ├── architecture.md     # Component interactions and pipeline
│   ├── api.md              # REST API contract and endpoint docs
│   ├── database.md         # Data dictionary and ER schema
│   └── development-roadmap.md # Phase-by-phase execution roadmap
│
├── .env.example            # Environment configuration template
└── README.md               # Main project README
```

---

## 5. Frontend Setup & Execution
```bash
# Navigate to frontend directory
cd frontend

# Install NPM dependencies
npm install

# Start Vite development server (Port 3000)
npm run dev

# Production build
npm run build
```

---

## 6. Backend Setup & Execution
```bash
# Ensure Java 17+ and Maven are installed
cd backend

# Build Maven project
mvn clean install

# Run Spring Boot service (Port 8080)
mvn spring-boot:run
```
The REST API will be accessible at: `http://localhost:8080/api`.

---

## 7. Database Setup (MySQL 8.0)
```bash
# 1. Login to your local MySQL instance
mysql -u root -p

# 2. Execute schema initialization
mysql -u root -p < database/schema.sql

# 3. Populate synthetic demonstration dataset
mysql -u root -p < database/sample_data.sql
```

---

## 8. C Analytics Engine Compilation & Execution
```bash
cd analytics
make
make run
```

---

## 9. Environment Variables
Copy `.env.example` to `.env`:
```env
# Frontend API Base URL
VITE_API_BASE_URL="http://localhost:8080/api"

# Default Map Center (Bangladesh/Regional Demo cluster)
VITE_MAP_DEFAULT_LAT="23.684994"
VITE_MAP_DEFAULT_LNG="89.500000"
VITE_MAP_DEFAULT_ZOOM="7"

# Backend MySQL Configuration
SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/maternal_health_analyzer?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
SPRING_DATASOURCE_USERNAME="root"
SPRING_DATASOURCE_PASSWORD=""
```

---

## 10. Sample Data Disclaimer
All records in `database/sample_data.sql` and `/dataset/` represent **Synthetic/Demo Data** created exclusively for software demonstration and architectural validation. They do not represent official government statistics or real clinical patients.

---

## 11. Planned Analytics Component & Explainable Accessibility Index
The **Project-Defined Healthcare Accessibility Index** is calculated deterministically via:
$$\text{Accessibility Index} = \frac{\sum_{i=1}^{n} \left(\text{Normalized Score}_i \times \text{Weight}_i\right)}{\sum_{i=1}^{n} \text{Weight}_i}$$

Where $\text{Normalized Score}_i = \min\left(100.0, \frac{\text{Observed}_i}{\text{Benchmark}_i} \times 100.0\right)$.

### Core Indicators & Policy Benchmarks:
1. **ANC 4+ Coverage**: Benchmark 80.0% (Weight: 0.18)
2. **Institutional Delivery Rate**: Benchmark 85.0% (Weight: 0.20)
3. **Postnatal Care within 48h**: Benchmark 75.0% (Weight: 0.16)
4. **Skilled Workforce Density**: Benchmark 4.5 per 10k target pop (Weight: 0.18)
5. **Diagnostic Readiness Score**: Benchmark 75.0 (Weight: 0.14)
6. **Emergency Transport 45m Reach**: Benchmark 70.0% (Weight: 0.14)

---

## 12. Three-Color Design System (60-30-10 Rule)
The user interface strictly adheres to an enterprise healthcare design standard without AI branding, gradients, or glowing cards:
- **Color 1 — 60% Primary Canvas**: `#F7F9F8` (Ultra-light neutral background for large surfaces and viewport canvas).
- **Color 2 — 30% Secondary Structural**: `#176B5B` (Deep healthcare green for navigation, sidebar, primary actions, and key headings).
- **Color 3 — 10% Accent Highlight**: `#D9A441` (Warm amber/gold used sparingly for priority gaps, benchmark variance, and alerts).

---

## NEXT DEVELOPMENT PHASE

Checklist for continuing development in **Google Antigravity**:

- [ ] Complete MySQL integration (link live MySQL daemon to Spring Boot Data JPA)
- [ ] Complete CSV upload endpoint in Spring Boot (`POST /api/data/upload`)
- [ ] Complete server-side data validation pipeline with CSV error reporting
- [ ] Implement accessibility index formulas in production database stored procedures or Java services
- [ ] Implement C analytics engine shared library (`.so`/`.dylib`) with JNI or Project Panama bindings
- [ ] Implement service-gap ranking and automated district priority sorting
- [ ] Connect dashboard to live Spring Boot REST APIs with end-to-end telemetry
- [ ] Complete Leaflet map integration with district polygon shapefiles (GeoJSON)
- [ ] Complete area comparison export to PDF/Excel
- [ ] Implement PDF report generation using OpenPDF or headless printing
- [ ] Add authentication and role-based access control (RBAC: Admin, Health Planner, Data Analyst)
- [ ] Perform end-to-end automated testing and Docker containerization (`docker-compose.yml`)
