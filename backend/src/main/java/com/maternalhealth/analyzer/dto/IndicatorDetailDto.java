package com.maternalhealth.analyzer.dto;

public class IndicatorDetailDto {
    private String code;
    private String name;
    private double observedValue;
    private double benchmarkTarget;
    private String unit;
    private double gapPercentage;
    private String status; // "Adequate", "Moderate Gap", "Priority Gap"
    private double weight;

    public IndicatorDetailDto() {}

    public IndicatorDetailDto(String code, String name, double observedValue, double benchmarkTarget, String unit, double gapPercentage, String status, double weight) {
        this.code = code;
        this.name = name;
        this.observedValue = observedValue;
        this.benchmarkTarget = benchmarkTarget;
        this.unit = unit;
        this.gapPercentage = gapPercentage;
        this.status = status;
        this.weight = weight;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getObservedValue() { return observedValue; }
    public void setObservedValue(double observedValue) { this.observedValue = observedValue; }

    public double getBenchmarkTarget() { return benchmarkTarget; }
    public void setBenchmarkTarget(double benchmarkTarget) { this.benchmarkTarget = benchmarkTarget; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public double getGapPercentage() { return gapPercentage; }
    public void setGapPercentage(double gapPercentage) { this.gapPercentage = gapPercentage; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }
}
