package com.maternalhealth.analyzer.dto;

public class ServiceGapItemDto {
    private String areaId;
    private String areaName;
    private String indicatorCode;
    private String indicatorName;
    private double observedValue;
    private double benchmarkTarget;
    private double gapPercentage;
    private String priority; // "High", "Moderate", "Critical", "Adequate"

    public ServiceGapItemDto() {}

    public ServiceGapItemDto(String areaId, String areaName, String indicatorCode, String indicatorName, double observedValue, double benchmarkTarget, double gapPercentage, String priority) {
        this.areaId = areaId;
        this.areaName = areaName;
        this.indicatorCode = indicatorCode;
        this.indicatorName = indicatorName;
        this.observedValue = observedValue;
        this.benchmarkTarget = benchmarkTarget;
        this.gapPercentage = gapPercentage;
        this.priority = priority;
    }

    public String getAreaId() { return areaId; }
    public void setAreaId(String areaId) { this.areaId = areaId; }

    public String getAreaName() { return areaName; }
    public void setAreaName(String areaName) { this.areaName = areaName; }

    public String getIndicatorCode() { return indicatorCode; }
    public void setIndicatorCode(String indicatorCode) { this.indicatorCode = indicatorCode; }

    public String getIndicatorName() { return indicatorName; }
    public void setIndicatorName(String indicatorName) { this.indicatorName = indicatorName; }

    public double getObservedValue() { return observedValue; }
    public void setObservedValue(double observedValue) { this.observedValue = observedValue; }

    public double getBenchmarkTarget() { return benchmarkTarget; }
    public void setBenchmarkTarget(double benchmarkTarget) { this.benchmarkTarget = benchmarkTarget; }

    public double getGapPercentage() { return gapPercentage; }
    public void setGapPercentage(double gapPercentage) { this.gapPercentage = gapPercentage; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}
