package com.maternalhealth.analyzer.repository;

import com.maternalhealth.analyzer.model.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AreaRepository extends JpaRepository<Area, String> {
    Optional<Area> findByCode(String code);
    List<Area> findByRegion(String region);
    List<Area> findByStatus(String status);
}
