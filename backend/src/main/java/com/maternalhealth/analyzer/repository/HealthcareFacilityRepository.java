package com.maternalhealth.analyzer.repository;

import com.maternalhealth.analyzer.model.HealthcareFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthcareFacilityRepository extends JpaRepository<HealthcareFacility, String> {
    List<HealthcareFacility> findByAreaId(String areaId);
    List<HealthcareFacility> findByFacilityType(String facilityType);
}
