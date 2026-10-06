package com.maternalhealth.analyzer.controller;

import com.maternalhealth.analyzer.dto.AreaComparisonDto;
import com.maternalhealth.analyzer.service.ComparisonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/compare")
@CrossOrigin
public class ComparisonController {

    private final ComparisonService comparisonService;

    @Autowired
    public ComparisonController(ComparisonService comparisonService) {
        this.comparisonService = comparisonService;
    }

    @GetMapping
    public ResponseEntity<AreaComparisonDto> compare(
            @RequestParam(defaultValue = "area-001") String areaA,
            @RequestParam(defaultValue = "area-002") String areaB) {
        return ResponseEntity.ok(comparisonService.compareAreas(areaA, areaB));
    }
}
