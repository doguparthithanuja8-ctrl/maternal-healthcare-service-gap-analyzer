package com.maternalhealth.analyzer.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "healthcare_facilities")
public class HealthcareFacility {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "area_id", nullable = false, length = 36)
    private String areaId;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "facility_type", nullable = false, length = 50)
    private String facilityType;

    @Column(name = "maternity_beds", nullable = false)
    private Integer maternityBeds = 0;

    @Column(name = "skilled_birth_attendants", nullable = false)
    private Integer skilledBirthAttendants = 0;

    @Column(name = "has_emergency_transport", nullable = false)
    private Boolean hasEmergencyTransport = false;

    @Column(name = "has_diagnostic_lab", nullable = false)
    private Boolean hasDiagnosticLab = false;

    @Column(name = "has_blood_storage", nullable = false)
    private Boolean hasBloodStorage = false;

    @Column(name = "operating_hours", length = 30)
    private String operatingHours = "TWELVE_HOUR";

    @Column(precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 6)
    private BigDecimal longitude;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public HealthcareFacility() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAreaId() { return areaId; }
    public void setAreaId(String areaId) { this.areaId = areaId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFacilityType() { return facilityType; }
    public void setFacilityType(String facilityType) { this.facilityType = facilityType; }

    public Integer getMaternityBeds() { return maternityBeds; }
    public void setMaternityBeds(Integer maternityBeds) { this.maternityBeds = maternityBeds; }

    public Integer getSkilledBirthAttendants() { return skilledBirthAttendants; }
    public void setSkilledBirthAttendants(Integer skilledBirthAttendants) { this.skilledBirthAttendants = skilledBirthAttendants; }

    public Boolean getHasEmergencyTransport() { return hasEmergencyTransport; }
    public void setHasEmergencyTransport(Boolean hasEmergencyTransport) { this.hasEmergencyTransport = hasEmergencyTransport; }

    public Boolean getHasDiagnosticLab() { return hasDiagnosticLab; }
    public void setHasDiagnosticLab(Boolean hasDiagnosticLab) { this.hasDiagnosticLab = hasDiagnosticLab; }

    public Boolean getHasBloodStorage() { return hasBloodStorage; }
    public void setHasBloodStorage(Boolean hasBloodStorage) { this.hasBloodStorage = hasBloodStorage; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
