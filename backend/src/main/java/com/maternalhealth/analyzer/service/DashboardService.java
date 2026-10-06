package com.maternalhealth.analyzer.service;

import com.maternalhealth.analyzer.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    private final AreaService areaService;

    @Autowired
    public DashboardService(AreaService areaService) {
        this.areaService = areaService;
    }

    public DashboardSummaryDto getDashboardSummary() {
        List<AreaSummaryDto> areas = areaService.getAllAreaSummaries();

        int totalAreas = areas.size();
        int totalFacilities = areas.stream().mapToInt(AreaSummaryDto::getFacilityCount).sum();
        int totalWorkers = areas.stream().mapToInt(AreaSummaryDto::getSkilledWorkersCount).sum();
        double avgAnc = areas.stream().mapToDouble(AreaSummaryDto::getAncCoveragePct).average().orElse(0.0);
        double avgIndex = areas.stream().mapToDouble(AreaSummaryDto::getAccessibilityIndex).average().orElse(0.0);
        int areasWithGaps = (int) areas.stream().filter(a -> a.getIdentifiedGapsCount() >= 2).count();

        DashboardKpiDto kpis = new DashboardKpiDto(
                totalAreas,
                totalFacilities,
                totalWorkers,
                Math.round(avgAnc * 10.0) / 10.0,
                Math.round(avgIndex * 10.0) / 10.0,
                areasWithGaps
        );

        List<ServiceGapItemDto> priorityGaps = new ArrayList<>();
        for (AreaSummaryDto a : areas) {
            priorityGaps.addAll(areaService.getSyntheticGapsForArea(a.getId()));
        }

        // Filter top priority gaps
        List<ServiceGapItemDto> topGaps = priorityGaps.stream()
                .filter(g -> "High".equalsIgnoreCase(g.getPriority()))
                .limit(6)
                .toList();

        return new DashboardSummaryDto(
                kpis,
                areas,
                topGaps,
                "2026 Q3 Planning Cycle",
                "This analytical index is defined for project-level comparison of service availability. It is not a clinical or medical-risk score."
        );
    }
}
