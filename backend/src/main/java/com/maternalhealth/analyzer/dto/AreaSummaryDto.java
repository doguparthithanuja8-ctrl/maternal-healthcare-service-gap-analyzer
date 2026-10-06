package com.maternalhealth.analyzer.dto;

public class AreaSummaryDto {
    private String id;
    private String name;
    private String code;
    private String region;
    private long population;
    private int facilityCount;
    private int skilledWorkersCount;
    private double ancCoveragePct;
    private double accessibilityIndex;
    private String accessibilityTier;
    private int identifiedGapsCount;
    private double latitude;
    private double longitude;

    public AreaSummaryDto() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public long getPopulation() { return population; }
    public void setPopulation(long population) { this.population = population; }

    public int getFacilityCount() { return facilityCount; }
    public void setFacilityCount(int facilityCount) { this.facilityCount = facilityCount; }

    public int getSkilledWorkersCount() { return skilledWorkersCount; }
    public void setSkilledWorkersCount(int skilledWorkersCount) { this.skilledWorkersCount = skilledWorkersCount; }

    public double getAncCoveragePct() { return ancCoveragePct; }
    public void setAncCoveragePct(double ancCoveragePct) { this.ancCoveragePct = ancCoveragePct; }

    public double getAccessibilityIndex() { return accessibilityIndex; }
    public void setAccessibilityIndex(double accessibilityIndex) { this.accessibilityIndex = accessibilityIndex; }

    public String getAccessibilityTier() { return accessibilityTier; }
    public void setAccessibilityTier(String accessibilityTier) { this.accessibilityTier = accessibilityTier; }

    public int getIdentifiedGapsCount() { return identifiedGapsCount; }
    public void setIdentifiedGapsCount(int identifiedGapsCount) { this.identifiedGapsCount = identifiedGapsCount; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
}
