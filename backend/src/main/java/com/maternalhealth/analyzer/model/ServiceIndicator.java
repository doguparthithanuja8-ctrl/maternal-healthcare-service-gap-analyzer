package com.maternalhealth.analyzer.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_indicators")
public class ServiceIndicator {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "area_id", nullable = false, length = 36)
    private String areaId;

    @Column(name = "period_year", nullable = false)
    private Integer periodYear;

    @Column(name = "period_quarter")
    private Integer periodQuarter;

    @Column(name = "anc_coverage_pct", nullable = false, precision = 5, scale = 2)
    private BigDecimal ancCoveragePct;

    @Column(name = "institutional_delivery_pct", nullable = false, precision = 5, scale = 2)
    private BigDecimal institutionalDeliveryPct;

    @Column(name = "postnatal_care_pct", nullable = false, precision = 5, scale = 2)
    private BigDecimal postnatalCarePct;

    @Column(name = "skilled_workforce_density", nullable = false, precision = 6, scale = 2)
    private BigDecimal skilledWorkforceDensity;

    @Column(name = "diagnostic_availability_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal diagnosticAvailabilityScore;

    @Column(name = "emergency_transport_coverage_pct", nullable = false, precision = 5, scale = 2)
    private BigDecimal emergencyTransportCoveragePct;

    @Column(name = "calculated_accessibility_index", precision = 5, scale = 2)
    private BigDecimal calculatedAccessibilityIndex;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public ServiceIndicator() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAreaId() { return areaId; }
    public void setAreaId(String areaId) { this.areaId = areaId; }

    public Integer getPeriodYear() { return periodYear; }
    public void setPeriodYear(Integer periodYear) { this.periodYear = periodYear; }

    public Integer getPeriodQuarter() { return periodQuarter; }
    public void setPeriodQuarter(Integer periodQuarter) { this.periodQuarter = periodQuarter; }

    public BigDecimal getAncCoveragePct() { return ancCoveragePct; }
    public void setAncCoveragePct(BigDecimal ancCoveragePct) { this.ancCoveragePct = ancCoveragePct; }

    public BigDecimal getInstitutionalDeliveryPct() { return institutionalDeliveryPct; }
    public void setInstitutionalDeliveryPct(BigDecimal institutionalDeliveryPct) { this.institutionalDeliveryPct = institutionalDeliveryPct; }

    public BigDecimal getPostnatalCarePct() { return postnatalCarePct; }
    public void setPostnatalCarePct(BigDecimal postnatalCarePct) { this.postnatalCarePct = postnatalCarePct; }

    public BigDecimal getSkilledWorkforceDensity() { return skilledWorkforceDensity; }
    public void setSkilledWorkforceDensity(BigDecimal skilledWorkforceDensity) { this.skilledWorkforceDensity = skilledWorkforceDensity; }

    public BigDecimal getDiagnosticAvailabilityScore() { return diagnosticAvailabilityScore; }
    public void setDiagnosticAvailabilityScore(BigDecimal diagnosticAvailabilityScore) { this.diagnosticAvailabilityScore = diagnosticAvailabilityScore; }

    public BigDecimal getEmergencyTransportCoveragePct() { return emergencyTransportCoveragePct; }
    public void setEmergencyTransportCoveragePct(BigDecimal emergencyTransportCoveragePct) { this.emergencyTransportCoveragePct = emergencyTransportCoveragePct; }

    public BigDecimal getCalculatedAccessibilityIndex() { return calculatedAccessibilityIndex; }
    public void setCalculatedAccessibilityIndex(BigDecimal calculatedAccessibilityIndex) { this.calculatedAccessibilityIndex = calculatedAccessibilityIndex; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
