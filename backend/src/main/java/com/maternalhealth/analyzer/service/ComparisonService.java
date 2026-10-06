package com.maternalhealth.analyzer.service;

import com.maternalhealth.analyzer.dto.AreaComparisonDto;
import com.maternalhealth.analyzer.dto.AreaDetailDto;
import com.maternalhealth.analyzer.dto.IndicatorDetailDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComparisonService {

    private final AreaService areaService;

    @Autowired
    public ComparisonService(AreaService areaService) {
        this.areaService = areaService;
    }

    public AreaComparisonDto compareAreas(String areaIdA, String areaIdB) {
        AreaDetailDto a = areaService.getAreaDetail(areaIdA);
        AreaDetailDto b = areaService.getAreaDetail(areaIdB);

        List<AreaComparisonDto.ComparisonMetricRowDto> rows = new ArrayList<>();

        rows.add(new AreaComparisonDto.ComparisonMetricRowDto(
                "Composite Accessibility Index",
                a.getAccessibilityIndex(),
                b.getAccessibilityIndex(),
                75.0,
                "Score (0-100)",
                round(a.getAccessibilityIndex() - b.getAccessibilityIndex())
        ));

        // Map through indicators
        for (IndicatorDetailDto indA : a.getIndicators()) {
            IndicatorDetailDto indB = b.getIndicators().stream()
                    .filter(i -> i.getCode().equals(indA.getCode()))
                    .findFirst()
                    .orElse(indA);

            rows.add(new AreaComparisonDto.ComparisonMetricRowDto(
                    indA.getName(),
                    indA.getObservedValue(),
                    indB.getObservedValue(),
                    indA.getBenchmarkTarget(),
                    indA.getUnit(),
                    round(indA.getObservedValue() - indB.getObservedValue())
            ));
        }

        return new AreaComparisonDto(a, b, rows);
    }

    private double round(double v) {
        return Math.round(v * 10.0) / 10.0;
    }
}
