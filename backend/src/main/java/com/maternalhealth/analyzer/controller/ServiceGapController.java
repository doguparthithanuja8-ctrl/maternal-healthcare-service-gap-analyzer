package com.maternalhealth.analyzer.controller;

import com.maternalhealth.analyzer.dto.ServiceGapItemDto;
import com.maternalhealth.analyzer.service.ServiceGapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gaps")
@CrossOrigin
public class ServiceGapController {

    private final ServiceGapService serviceGapService;

    @Autowired
    public ServiceGapController(ServiceGapService serviceGapService) {
        this.serviceGapService = serviceGapService;
    }

    @GetMapping
    public ResponseEntity<List<ServiceGapItemDto>> getAllGaps(@RequestParam(required = false) String priority) {
        return ResponseEntity.ok(serviceGapService.getAllGaps(priority));
    }

    @GetMapping("/{areaId}")
    public ResponseEntity<List<ServiceGapItemDto>> getGapsForArea(@PathVariable String areaId) {
        return ResponseEntity.ok(serviceGapService.getGapsForArea(areaId));
    }
}
