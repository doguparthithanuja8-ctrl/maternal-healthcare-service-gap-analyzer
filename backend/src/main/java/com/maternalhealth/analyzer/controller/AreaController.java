package com.maternalhealth.analyzer.controller;

import com.maternalhealth.analyzer.dto.AreaDetailDto;
import com.maternalhealth.analyzer.dto.AreaSummaryDto;
import com.maternalhealth.analyzer.dto.IndicatorDetailDto;
import com.maternalhealth.analyzer.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/areas")
@CrossOrigin
public class AreaController {

    private final AreaService areaService;

    @Autowired
    public AreaController(AreaService areaService) {
        this.areaService = areaService;
    }

    @GetMapping
    public ResponseEntity<List<AreaSummaryDto>> getAllAreas() {
        return ResponseEntity.ok(areaService.getAllAreaSummaries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AreaDetailDto> getAreaById(@PathVariable String id) {
        return ResponseEntity.ok(areaService.getAreaDetail(id));
    }

    @GetMapping("/{id}/indicators")
    public ResponseEntity<List<IndicatorDetailDto>> getAreaIndicators(@PathVariable String id) {
        return ResponseEntity.ok(areaService.getSyntheticIndicatorsForArea(id));
    }
}
