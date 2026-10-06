-- ============================================================================
-- MATERNAL HEALTHCARE ACCESSIBILITY & SERVICE GAP ANALYZER
-- Relational Database Schema (MySQL 8.0+)
-- ============================================================================
-- IMPORTANT DISCLAIMER:
-- This application and schema are designed strictly for SERVICE-LEVEL and
-- AREA-LEVEL accessibility analysis and healthcare resource planning.
-- It does NOT store individual patient health records, diagnostic predictions,
-- clinical assessments, or personal maternal health outcomes.
-- ============================================================================

CREATE DATABASE IF NOT EXISTS maternal_health_analyzer
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE maternal_health_analyzer;

-- ----------------------------------------------------------------------------
-- 1. Table: areas
-- Stores geographic administrative units (districts, sub-districts, zones)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS areas (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    code VARCHAR(30) NOT NULL UNIQUE,
    region VARCHAR(100) NOT NULL,
    population INT UNSIGNED NOT NULL DEFAULT 0,
    target_reproductive_pop INT UNSIGNED NOT NULL DEFAULT 0,
    area_sq_km DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    terrain_type ENUM('PLAINS', 'COASTAL', 'HILLY', 'MOUNTAINOUS', 'URBAN') NOT NULL DEFAULT 'PLAINS',
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    status ENUM('ACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_areas_region (region),
    INDEX idx_areas_code (code)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 2. Table: healthcare_facilities
-- Stores service-level facility inventory within areas
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS healthcare_facilities (
    id VARCHAR(36) PRIMARY KEY,
    area_id VARCHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    facility_type ENUM('PRIMARY_HEALTH_CENTRE', 'COMMUNITY_HEALTH_CENTRE', 'SUB_DISTRICT_HOSPITAL', 'DISTRICT_HOSPITAL', 'MATERNITY_CLINIC') NOT NULL,
    maternity_beds INT UNSIGNED NOT NULL DEFAULT 0,
    skilled_birth_attendants INT UNSIGNED NOT NULL DEFAULT 0,
    has_emergency_transport BOOLEAN NOT NULL DEFAULT FALSE,
    has_diagnostic_lab BOOLEAN NOT NULL DEFAULT FALSE,
    has_blood_storage BOOLEAN NOT NULL DEFAULT FALSE,
    operating_hours ENUM('TWENTY_FOUR_SEVEN', 'TWELVE_HOUR', 'DAY_ONLY') NOT NULL DEFAULT 'TWELVE_HOUR',
    latitude DECIMAL(10, 6) NULL,
    longitude DECIMAL(10, 6) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_facilities_area FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE,
    INDEX idx_facilities_area (area_id),
    INDEX idx_facilities_type (facility_type)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 3. Table: service_indicators
-- Observed values of area-level maternal health service availability
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_indicators (
    id VARCHAR(36) PRIMARY KEY,
    area_id VARCHAR(36) NOT NULL,
    period_year INT NOT NULL,
    period_quarter TINYINT NULL,
    anc_coverage_pct DECIMAL(5, 2) NOT NULL COMMENT 'Antenatal care 4+ visits coverage percentage',
    institutional_delivery_pct DECIMAL(5, 2) NOT NULL COMMENT 'Percentage of deliveries occurring in facilities',
    postnatal_care_pct DECIMAL(5, 2) NOT NULL COMMENT 'Postnatal checkup within 48h percentage',
    skilled_workforce_density DECIMAL(6, 2) NOT NULL COMMENT 'Skilled midwives/doctors per 10k target pop',
    diagnostic_availability_score DECIMAL(5, 2) NOT NULL COMMENT 'Standardized diagnostic readiness 0-100',
    emergency_transport_coverage_pct DECIMAL(5, 2) NOT NULL COMMENT 'Area covered within 45min ambulance transfer',
    calculated_accessibility_index DECIMAL(5, 2) NULL COMMENT 'Project analytical index (0-100)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_indicators_area FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE CASCADE,
    INDEX idx_indicators_area_period (area_id, period_year, period_quarter)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 4. Table: users
-- Application access control and planning analyst accounts
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    role ENUM('ADMINISTRATOR', 'HEALTH_PLANNER', 'DATA_ANALYST', 'VIEWER') NOT NULL DEFAULT 'HEALTH_PLANNER',
    department VARCHAR(100) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
) ENGINE=InnoDB;
