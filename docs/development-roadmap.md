# Development Roadmap & Google Antigravity Handoff Guide

## Phase 1: Foundation (Completed in AI Studio)
- [x] Three-color healthcare design system established (#F7F9F8, #176B5B, #D9A441).
- [x] Professional presentation tier devoid of AI tropes, fake chatbots, or marketing jargon.
- [x] Complete 8-page navigational architecture (Home, Dashboard, Area Analysis, Service Gaps, Comparison, Interactive Map, Reports, Data Management).
- [x] Leaflet map integration with OpenStreetMap tile layer, custom markers, and district info popups.
- [x] Clean Spring Boot 3.2 Maven backend skeleton with full controller, service, repository, and DTO layers.
- [x] Complete MySQL relational database schema and synthetic dataset.
- [x] Deterministic C numerical analytics engine foundation with Makefile.
- [x] Architectural documentation and API contracts.

---

## Phase 2: Next Development Phase (For Google Antigravity)

### [ ] Step 1: Complete MySQL Integration
- Launch MySQL 8.0 instance:
  ```bash
  mysql -u root -p < database/schema.sql
  mysql -u root -p < database/sample_data.sql
  ```
- Configure connection credentials in `backend/src/main/resources/application.properties`.
- Verify entity persistence via Spring Data JPA.

### [ ] Step 2: Complete CSV Upload & Server-side Validation
- Connect the frontend `DataManagement` view to a Spring Boot `MultipartFile` endpoint: `POST /api/data/upload`.
- Implement Apache Commons CSV parsing in `backend/src/main/java/com/maternalhealth/analyzer/service/DataIngestionService.java`.
- Validate required columns, data types, geographic bounding boxes, and range bounds (0-100%).

### [ ] Step 3: Implement C Analytics Engine Integration
- Compile the C module into a shared library:
  ```bash
  cd analytics && gcc -shared -fPIC -O3 src/*.c -Iinclude -o libmaternal_analyzer.so
  ```
- Expose via JNI or Java Foreign Function & Memory API (Project Panama) in `backend/src/main/java/com/maternalhealth/analyzer/service/AnalyticsEngineBridge.java`.
- Leverage C routines for batch-processing district datasets during CSV import.

### [ ] Step 4: PDF Report Generation
- Implement OpenPDF / iText or server-side headless browser report generation in `backend/src/main/java/com/maternalhealth/analyzer/service/ReportService.java`.
- Generate district service-gap profiles and executive summaries.

### [ ] Step 5: Authentication & Role-Based Access Control (RBAC)
- Configure Spring Security with JWT tokens for `ADMINISTRATOR`, `HEALTH_PLANNER`, and `DATA_ANALYST` roles.
- Protect data upload and area modification endpoints behind role authorization.

### [ ] Step 6: End-to-End System Testing & Dockerization
- Add `docker-compose.yml` orchestrating MySQL, Spring Boot backend, and Vite frontend.
- Execute unit and integration tests across frontend and backend.
