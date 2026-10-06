package com.maternalhealth.analyzer.dto;

import java.util.List;

public class DashboardSummaryDto {
    private DashboardKpiDto kpis;
    private List<AreaSummaryDto> areas;
    private List<ServiceGapItemDto> priorityGaps;
    private String dataPeriod;
    private String disclaimer;

    public DashboardSummaryDto() {}

    public DashboardSummaryDto(DashboardKpiDto kpis, List<AreaSummaryDto> areas, List<ServiceGapItemDto> priorityGaps, String dataPeriod, String disclaimer) {
        this.kpis = kpis;
        this.areas = areas;
        this.priorityGaps = priorityGaps;
        this.dataPeriod = dataPeriod;
        this.disclaimer = disclaimer;
    }

    public DashboardKpiDto getKpis() { return kpis; }
    public void setKpis(DashboardKpiDto kpis) { this.kpis = kpis; }

    public List<AreaSummaryDto> getAreas() { return areas; }
    public void setAreas(List<AreaSummaryDto> areas) { this.areas = areas; }

    public List<ServiceGapItemDto> getPriorityGaps() { return priorityGaps; }
    public void setPriorityGaps(List<ServiceGapItemDto> priorityGaps) { this.priorityGaps = priorityGaps; }

    public String getDataPeriod() { return dataPeriod; }
    public void setDataPeriod(String dataPeriod) { this.dataPeriod = dataPeriod; }

    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
}
