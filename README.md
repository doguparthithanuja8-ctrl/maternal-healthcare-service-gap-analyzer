# Maternal Healthcare Accessibility & Service Gap Analyzer

A data-driven web application designed to analyze maternal healthcare accessibility, identify healthcare service gaps, and compare healthcare availability across different areas.

## Overview

The **Maternal Healthcare Accessibility & Service Gap Analyzer** helps identify areas that may require improvements in maternal healthcare services.

The system analyzes healthcare indicators such as:

- ANC (Antenatal Care) coverage
- Institutional delivery
- Postnatal care
- Skilled healthcare workforce
- Diagnostic availability
- Emergency transport accessibility
- Healthcare facilities

The application calculates an **Accessibility Index** by comparing observed healthcare indicators with defined benchmarks.

## Key Features

- 📊 Interactive healthcare dashboard
- 🏥 Healthcare facility analysis
- 📍 Geographic visualization using maps
- 📈 Maternal healthcare indicator analysis
- 🚨 Service gap identification
- 🔎 Area-wise analysis
- ⚖️ Area comparison
- 📑 Report generation and CSV export
- 📂 Dataset and data-quality information
- 📊 Accessibility Index calculation
- 🔄 Data-driven calculations from project datasets

## Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Leaflet

### Backend
- Java
- Spring Boot

### Database
- MySQL

### Analytics
- Python / JavaScript-based data processing
- C analytics module

### Data
- CSV datasets
- Healthcare indicators
- Facility information
- Benchmark data

## Project Structure

```text
Maternal-Healthcare-Accessibility-Service-Gap-Analyzer/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   └── Spring Boot application
│
├── dataset/
│   ├── maternal_health_district_data.csv
│   ├── indicators_benchmark.csv
│   └── facilities_inventory.csv
│
├── database/
│   └── SQL schema and database files
│
├── analytics/
│   └── Analytics module
│
└── README.md
```

## Accessibility Index

The application compares observed healthcare indicators with predefined benchmarks.

### Formula

```text
Normalized Score = min(100, Observed / Benchmark × 100)

Accessibility Index =
Σ(Normalized Score × Weight) / Σ(Weights)
```

The resulting score is used to understand the relative accessibility of maternal healthcare services across different areas.

## How to Run

### 1. Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

### 2. Open the Frontend

```bash
cd frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Application

```bash
npm run dev
```

Open the URL shown by Vite in your browser.

## Data

The project uses healthcare datasets containing area-level indicators and healthcare facility information.

The application processes the datasets dynamically to generate:

- Accessibility scores
- Service gaps
- Area rankings
- Healthcare statistics
- Comparisons
- Reports

The datasets used in this project are intended for **demonstration and analytical purposes**.

## Important Note

This project is a **healthcare planning and analytics system**.

It does not:

- Diagnose medical conditions
- Provide medical treatment
- Predict individual pregnancy outcomes
- Replace healthcare professionals

The system focuses on **area-level healthcare accessibility and service-gap analysis**.

## Future Improvements

- Live database/API integration
- Real-time healthcare data updates
- Advanced predictive analytics
- Additional geographic datasets
- Automated report generation
- Role-based access
- Cloud deployment

## Author

**Thanuja D**

B.Tech Computer Science (CSE)

---

⭐ If you find this project useful, consider giving the repository a star.
