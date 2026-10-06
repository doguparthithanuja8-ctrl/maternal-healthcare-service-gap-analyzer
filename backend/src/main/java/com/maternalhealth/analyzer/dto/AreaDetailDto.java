package com.maternalhealth.analyzer.dto;

import java.util.List;

public class AreaDetailDto {
    private String id;
    private String name;
    private String code;
    private String region;
    private long population;
    private long targetReproductivePop;
    private double accessibilityIndex;
    private String accessibilityTier;
    private List<IndicatorDetailDto> indicators;
    private List<FacilityDto> facilities;
    private List<ServiceGapItemDto> identifiedGaps;
    private double latitude;
    private double longitude;

    public AreaDetailDto() {}

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

    public long getTargetReproductivePop() { return targetReproductivePop; }
    public void setTargetReproductivePop(long targetReproductivePop) { this.targetReproductivePop = targetReproductivePop; }

    public double getAccessibilityIndex() { return accessibilityIndex; }
    public void setAccessibilityIndex(double accessibilityIndex) { this.accessibilityIndex = accessibilityIndex; }

    public String getAccessibilityTier() { return accessibilityTier; }
    public void setAccessibilityTier(String accessibilityTier) { this.accessibilityTier = accessibilityTier; }

    public List<IndicatorDetailDto> getIndicators() { return indicators; }
    public void setIndicators(List<IndicatorDetailDto> indicators) { this.indicators = indicators; }

    public List<FacilityDto> getFacilities() { return facilities; }
    public void setFacilities(List<FacilityDto> facilities) { this.facilities = facilities; }

    public List<ServiceGapItemDto> getIdentifiedGaps() { return identifiedGaps; }
    public void setIdentifiedGaps(List<ServiceGapItemDto> identifiedGaps) { this.identifiedGaps = identifiedGaps; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
}
