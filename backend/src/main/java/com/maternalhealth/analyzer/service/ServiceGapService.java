package com.maternalhealth.analyzer.service;

import com.maternalhealth.analyzer.dto.AreaSummaryDto;
import com.maternalhealth.analyzer.dto.ServiceGapItemDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceGapService {

    private final AreaService areaService;

    @Autowired
    public ServiceGapService(AreaService areaService) {
        this.areaService = areaService;
    }

    public List<ServiceGapItemDto> getGapsForArea(String areaId) {
        return areaService.getSyntheticGapsForArea(areaId);
    }

    public List<ServiceGapItemDto> getAllGaps(String priorityFilter) {
        List<AreaSummaryDto> areas = areaService.getAllAreaSummaries();
        List<ServiceGapItemDto> allGaps = new ArrayList<>();
        for (AreaSummaryDto a : areas) {
            allGaps.addAll(areaService.getSyntheticGapsForArea(a.getId()));
        }

        if (priorityFilter != null && !priorityFilter.isBlank() && !"ALL".equalsIgnoreCase(priorityFilter)) {
            return allGaps.stream()
                    .filter(g -> g.getPriority().equalsIgnoreCase(priorityFilter))
                    .collect(Collectors.toList());
        }
        return allGaps;
    }
}
