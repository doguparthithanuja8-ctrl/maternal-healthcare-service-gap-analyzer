-- ============================================================================
-- MATERNAL HEALTHCARE ACCESSIBILITY & SERVICE GAP ANALYZER
-- Sample Synthetic Demonstration Dataset
-- ============================================================================
-- IMPORTANT NOTICE:
-- The records in this file represent SYNTHETIC/DEMO DATA generated specifically
-- for technical testing, architectural validation, and software demonstration.
-- They do NOT represent official government statistics, real patient data, or
-- actual clinical records. All coordinates and metrics are illustrative.
-- ============================================================================

USE maternal_health_analyzer;

-- Clean existing demo data in reverse order of foreign keys
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE service_indicators;
TRUNCATE TABLE healthcare_facilities;
TRUNCATE TABLE areas;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- Insert Synthetic Areas
-- ----------------------------------------------------------------------------
INSERT INTO areas (id, name, code, region, population, target_reproductive_pop, area_sq_km, terrain_type, latitude, longitude, status) VALUES
('area-001', 'North Riverdale District', 'NRD-01', 'Northern Province', 245000, 58000, 1420.50, 'PLAINS', 24.120000, 88.240000, 'ACTIVE'),
('area-002', 'Highland Valley Division', 'HVD-02', 'Eastern Highlands', 178000, 41000, 2890.00, 'MOUNTAINOUS', 24.650000, 89.120000, 'ACTIVE'),
('area-003', 'Coastal Delta Zone', 'CDZ-03', 'Southern Delta', 312000, 76000, 1850.25, 'COASTAL', 22.350000, 89.980000, 'ACTIVE'),
('area-004', 'Central Metro Corridor', 'CMC-04', 'Central Province', 520000, 134000, 680.00, 'URBAN', 23.710000, 90.410000, 'ACTIVE'),
('area-005', 'West Foothills Sub-district', 'WFS-05', 'Western Border', 142000, 33500, 2100.80, 'HILLY', 23.950000, 88.900000, 'ACTIVE'),
('area-006', 'Lake Basin Community', 'LBC-06', 'Central Province', 198000, 46200, 1150.40, 'PLAINS', 23.400000, 90.150000, 'ACTIVE');

-- ----------------------------------------------------------------------------
-- Insert Synthetic Healthcare Facilities
-- ----------------------------------------------------------------------------
INSERT INTO healthcare_facilities (id, area_id, name, facility_type, maternity_beds, skilled_birth_attendants, has_emergency_transport, has_diagnostic_lab, has_blood_storage, operating_hours, latitude, longitude) VALUES
('fac-101', 'area-001', 'Riverdale District General Hospital', 'DISTRICT_HOSPITAL', 45, 14, TRUE, TRUE, TRUE, 'TWENTY_FOUR_SEVEN', 24.125000, 88.242000),
('fac-102', 'area-001', 'East Riverdale Community Health Center', 'COMMUNITY_HEALTH_CENTRE', 12, 4, FALSE, TRUE, FALSE, 'TWELVE_HOUR', 24.180000, 88.290000),
('fac-103', 'area-001', 'North Outpost Primary Health Centre', 'PRIMARY_HEALTH_CENTRE', 4, 1, FALSE, FALSE, FALSE, 'DAY_ONLY', 24.230000, 88.190000),

('fac-201', 'area-002', 'Highland Valley District Referral Hospital', 'DISTRICT_HOSPITAL', 28, 7, TRUE, TRUE, FALSE, 'TWENTY_FOUR_SEVEN', 24.648000, 89.118000),
('fac-202', 'area-002', 'Pine Ridge Community Health Center', 'COMMUNITY_HEALTH_CENTRE', 8, 2, FALSE, FALSE, FALSE, 'TWELVE_HOUR', 24.710000, 89.050000),
('fac-203', 'area-002', 'Summit Pass Health Post', 'PRIMARY_HEALTH_CENTRE', 2, 1, FALSE, FALSE, FALSE, 'DAY_ONLY', 24.590000, 89.250000),

('fac-301', 'area-003', 'Delta Haven Subdistrict Hospital', 'SUB_DISTRICT_HOSPITAL', 30, 8, TRUE, TRUE, FALSE, 'TWENTY_FOUR_SEVEN', 22.348000, 89.975000),
('fac-302', 'area-003', 'Estuary Island Health Centre', 'COMMUNITY_HEALTH_CENTRE', 6, 2, FALSE, FALSE, FALSE, 'DAY_ONLY', 22.280000, 90.050000),
('fac-303', 'area-003', 'Creek Side Maternity Post', 'MATERNITY_CLINIC', 4, 2, FALSE, FALSE, FALSE, 'TWELVE_HOUR', 22.410000, 89.920000),

('fac-401', 'area-004', 'Central Metro Women & Children Hospital', 'DISTRICT_HOSPITAL', 95, 38, TRUE, TRUE, TRUE, 'TWENTY_FOUR_SEVEN', 23.712000, 90.412000),
('fac-402', 'area-004', 'North Metro Polyclinic & Maternity Unit', 'COMMUNITY_HEALTH_CENTRE', 24, 12, TRUE, TRUE, TRUE, 'TWENTY_FOUR_SEVEN', 23.750000, 90.390000),
('fac-403', 'area-004', 'Capital West Maternity Centre', 'MATERNITY_CLINIC', 18, 8, TRUE, TRUE, FALSE, 'TWELVE_HOUR', 23.690000, 90.440000),

('fac-501', 'area-005', 'West Foothills Rural Hospital', 'SUB_DISTRICT_HOSPITAL', 16, 4, FALSE, TRUE, FALSE, 'TWELVE_HOUR', 23.945000, 88.895000),
('fac-502', 'area-005', 'Border Ridge Health Center', 'PRIMARY_HEALTH_CENTRE', 4, 1, FALSE, FALSE, FALSE, 'DAY_ONLY', 23.990000, 88.840000),

('fac-601', 'area-006', 'Lake Basin Community Health Centre', 'COMMUNITY_HEALTH_CENTRE', 20, 6, TRUE, TRUE, FALSE, 'TWENTY_FOUR_SEVEN', 23.398000, 90.145000),
('fac-602', 'area-006', 'South Shore Primary Post', 'PRIMARY_HEALTH_CENTRE', 6, 2, FALSE, FALSE, FALSE, 'DAY_ONLY', 23.340000, 90.190000);

-- ----------------------------------------------------------------------------
-- Insert Synthetic Service Indicators (Year 2026, Q3)
-- ----------------------------------------------------------------------------
INSERT INTO service_indicators (id, area_id, period_year, period_quarter, anc_coverage_pct, institutional_delivery_pct, postnatal_care_pct, skilled_workforce_density, diagnostic_availability_score, emergency_transport_coverage_pct, calculated_accessibility_index) VALUES
('ind-001', 'area-001', 2026, 3, 76.40, 81.20, 68.50, 4.20, 72.00, 64.00, 72.85),
('ind-002', 'area-002', 2026, 3, 51.20, 46.80, 41.50, 2.10, 38.00, 32.50, 43.68),
('ind-003', 'area-003', 2026, 3, 58.60, 54.10, 49.30, 2.60, 44.50, 41.00, 49.75),
('ind-004', 'area-004', 2026, 3, 89.50, 92.40, 84.10, 6.80, 91.00, 88.50, 89.40),
('ind-005', 'area-005', 2026, 3, 44.30, 39.50, 35.80, 1.80, 32.00, 28.00, 36.60),
('ind-006', 'area-006', 2026, 3, 71.80, 74.50, 65.20, 3.80, 66.00, 59.00, 67.25);

-- ----------------------------------------------------------------------------
-- Insert Demo System Users (Passwords are salted hashes in production)
-- ----------------------------------------------------------------------------
INSERT INTO users (id, username, email, password_hash, full_name, role, department, is_active) VALUES
('usr-001', 'planner.admin', 'planner.admin@healthagency.local', '$2a$12$e6n...demoHashOnlyForDemonstration...', 'Dr. Elena Vance', 'ADMINISTRATOR', 'Directorate of Healthcare Planning', TRUE),
('usr-002', 'analyst.marcus', 'm.chen@healthagency.local', '$2a$12$k8s...demoHashOnlyForDemonstration...', 'Marcus Chen', 'HEALTH_PLANNER', 'District Services Assessment', TRUE),
('usr-003', 'research.aisha', 'aisha.r@healthagency.local', '$2a$12$w3d...demoHashOnlyForDemonstration...', 'Aisha Rahman', 'DATA_ANALYST', 'Epidemiology & Coverage Analytics', TRUE);
