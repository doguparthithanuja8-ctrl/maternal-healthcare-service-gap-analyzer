package com.maternalhealth.analyzer.dto;

public class DashboardKpiDto {
    private int areasAnalyzed;
    private int healthcareFacilities;
    private int skilledHealthcareWorkers;
    private double averageAncCoveragePct;
    private double averageAccessibilityIndex;
    private int areasWithSignificantGaps;

    public DashboardKpiDto() {}

    public DashboardKpiDto(int areasAnalyzed, int healthcareFacilities, int skilledHealthcareWorkers, double averageAncCoveragePct, double averageAccessibilityIndex, int areasWithSignificantGaps) {
        this.areasAnalyzed = areasAnalyzed;
        this.healthcareFacilities = healthcareFacilities;
        this.skilledHealthcareWorkers = skilledHealthcareWorkers;
        this.averageAncCoveragePct = averageAncCoveragePct;
        this.averageAccessibilityIndex = averageAccessibilityIndex;
        this.areasWithSignificantGaps = areasWithSignificantGaps;
    }

    public int getAreasAnalyzed() { return areasAnalyzed; }
    public void setAreasAnalyzed(int areasAnalyzed) { this.areasAnalyzed = areasAnalyzed; }

    public int getHealthcareFacilities() { return healthcareFacilities; }
    public void setHealthcareFacilities(int healthcareFacilities) { this.healthcareFacilities = healthcareFacilities; }

    public int getSkilledHealthcareWorkers() { return skilledHealthcareWorkers; }
    public void setSkilledHealthcareWorkers(int skilledHealthcareWorkers) { this.skilledHealthcareWorkers = skilledHealthcareWorkers; }

    public double getAverageAncCoveragePct() { return averageAncCoveragePct; }
    public void setAverageAncCoveragePct(double averageAncCoveragePct) { this.averageAncCoveragePct = averageAncCoveragePct; }

    public double getAverageAccessibilityIndex() { return averageAccessibilityIndex; }
    public void setAverageAccessibilityIndex(double averageAccessibilityIndex) { this.averageAccessibilityIndex = averageAccessibilityIndex; }

    public int getAreasWithSignificantGaps() { return areasWithSignificantGaps; }
    public void setAreasWithSignificantGaps(int areasWithSignificantGaps) { this.areasWithSignificantGaps = areasWithSignificantGaps; }
}
