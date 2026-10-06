package com.maternalhealth.analyzer.repository;

import com.maternalhealth.analyzer.model.ServiceIndicator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceIndicatorRepository extends JpaRepository<ServiceIndicator, String> {
    List<ServiceIndicator> findByAreaId(String areaId);
    Optional<ServiceIndicator> findTopByAreaIdOrderByPeriodYearDescPeriodQuarterDesc(String areaId);
}
