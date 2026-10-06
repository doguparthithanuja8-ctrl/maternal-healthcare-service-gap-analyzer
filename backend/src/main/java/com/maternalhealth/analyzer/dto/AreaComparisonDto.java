package com.maternalhealth.analyzer.dto;

import java.util.List;

public class AreaComparisonDto {
    private AreaDetailDto areaA;
    private AreaDetailDto areaB;
    private List<ComparisonMetricRowDto> metricRows;

    public AreaComparisonDto() {}

    public AreaComparisonDto(AreaDetailDto areaA, AreaDetailDto areaB, List<ComparisonMetricRowDto> metricRows) {
        this.areaA = areaA;
        this.areaB = areaB;
        this.metricRows = metricRows;
    }

    public AreaDetailDto getAreaA() { return areaA; }
    public void setAreaA(AreaDetailDto areaA) { this.areaA = areaA; }

    public AreaDetailDto getAreaB() { return areaB; }
    public void setAreaB(AreaDetailDto areaB) { this.areaB = areaB; }

    public List<ComparisonMetricRowDto> getMetricRows() { return metricRows; }
    public void setMetricRows(List<ComparisonMetricRowDto> metricRows) { this.metricRows = metricRows; }

    public static class ComparisonMetricRowDto {
        private String metric;
        private double valueA;
        private double valueB;
        private double benchmark;
        private String unit;
        private double delta; // valueA - valueB

        public ComparisonMetricRowDto() {}

        public ComparisonMetricRowDto(String metric, double valueA, double valueB, double benchmark, String unit, double delta) {
            this.metric = metric;
            this.valueA = valueA;
            this.valueB = valueB;
            this.benchmark = benchmark;
            this.unit = unit;
            this.delta = delta;
        }

        public String getMetric() { return metric; }
        public void setMetric(String metric) { this.metric = metric; }

        public double getValueA() { return valueA; }
        public void setValueA(double valueA) { this.valueA = valueA; }

        public double getValueB() { return valueB; }
        public void setValueB(double valueB) { this.valueB = valueB; }

        public double getBenchmark() { return benchmark; }
        public void setBenchmark(double benchmark) { this.benchmark = benchmark; }

        public String getUnit() { return unit; }
        public void setUnit(String unit) { this.unit = unit; }

        public double getDelta() { return delta; }
        public void setDelta(double delta) { this.delta = delta; }
    }
}
