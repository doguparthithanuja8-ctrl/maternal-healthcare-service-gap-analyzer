package com.maternalhealth.analyzer.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "areas")
public class Area {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, unique = true, length = 30)
    private String code;

    @Column(nullable = false, length = 100)
    private String region;

    @Column(nullable = false)
    private Long population;

    @Column(name = "target_reproductive_pop", nullable = false)
    private Long targetReproductivePop;

    @Column(name = "area_sq_km", precision = 10, scale = 2)
    private BigDecimal areaSqKm;

    @Column(name = "terrain_type", length = 30)
    private String terrainType;

    @Column(nullable = false, precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 10, scale = 6)
    private BigDecimal longitude;

    @Column(length = 20)
    private String status = "ACTIVE";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Area() {}

    public Area(String id, String name, String code, String region, Long population, Long targetReproductivePop, BigDecimal latitude, BigDecimal longitude) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.region = region;
        this.population = population;
        this.targetReproductivePop = targetReproductivePop;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public Long getPopulation() { return population; }
    public void setPopulation(Long population) { this.population = population; }

    public Long getTargetReproductivePop() { return targetReproductivePop; }
    public void setTargetReproductivePop(Long targetReproductivePop) { this.targetReproductivePop = targetReproductivePop; }

    public BigDecimal getAreaSqKm() { return areaSqKm; }
    public void setAreaSqKm(BigDecimal areaSqKm) { this.areaSqKm = areaSqKm; }

    public String getTerrainType() { return terrainType; }
    public void setTerrainType(String terrainType) { this.terrainType = terrainType; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
