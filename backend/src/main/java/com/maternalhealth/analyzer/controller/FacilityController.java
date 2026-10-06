package com.maternalhealth.analyzer.controller;

import com.maternalhealth.analyzer.dto.FacilityDto;
import com.maternalhealth.analyzer.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin
public class FacilityController {

    private final FacilityService facilityService;

    @Autowired
    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @GetMapping("/{areaId}")
    public ResponseEntity<List<FacilityDto>> getFacilitiesByArea(@PathVariable String areaId) {
        return ResponseEntity.ok(facilityService.getFacilitiesForArea(areaId));
    }
}
