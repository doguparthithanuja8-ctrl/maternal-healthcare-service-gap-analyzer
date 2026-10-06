# Maternal Healthcare Accessibility & Service Gap Analyzer (Backend)

## Architecture Overview
The backend is built with **Java 17, Spring Boot 3.2.x, and Maven**, providing clean REST endpoints for:
- Area summaries and regional distributions (`/api/areas`)
- Area detailed assessment with service indicators and gap scoring (`/api/areas/{id}`)
- Executive dashboard metrics (`/api/dashboard`)
- Service gap prioritization and filtering (`/api/gaps`)
- Bi-lateral area accessibility comparison (`/api/compare`)
- Facility inventory by jurisdiction (`/api/facilities/{areaId}`)

## Medical & Regulatory Scope
The backend handles area-level aggregates and service indicators exclusively. It **does not store individual clinical records, personal medical data, or diagnostic scoring**.

## Setup & Running

### Requirements
- OpenJDK 17 or higher
- Apache Maven 3.8+
- MySQL 8.0+ (Optional for local testing; fallback in-memory synthetic seed is provided)

### Configuration
Environment variables can be supplied via shell or `.env`:
```bash
export SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3306/maternal_health_analyzer"
export SPRING_DATASOURCE_USERNAME="root"
export SPRING_DATASOURCE_PASSWORD="your_password"
export CORS_ALLOWED_ORIGINS="http://localhost:3000,http://localhost:5173"
```

### Build & Run
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The REST API will be available at `http://localhost:8080/api`.
