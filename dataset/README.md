# Synthetic Maternal Healthcare Demonstration Dataset

## Important Notice & Disclaimer
The datasets in this directory are **synthetic demonstration data** created strictly for:
- Validating system ingestion routines and CSV parsers.
- Demonstrating dashboard aggregations, chart generation, and geographical mapping.
- Providing consistent unit-test input data for backend REST endpoints.

**These files do not contain real personal healthcare data, clinical diagnostic outcomes, or verified government statistics.** They must not be cited as real-world epidemiologic evidence.

## Files
1. `maternal_health_district_data.csv`: Aggregated district/sub-district demographic information, coordinates, and observed service indicators.
2. `indicators_benchmark.csv`: Analytical target benchmarks and relative indicator weights for computing the Project Accessibility Index.
3. `facilities_inventory.csv`: Service-level infrastructure inventory by administrative area (maternity beds, staffed providers, transport availability).
