package com.maternalhealth.analyzer.controller;

import com.maternalhealth.analyzer.dto.DashboardSummaryDto;
import com.maternalhealth.analyzer.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardSummaryDto> getDashboard() {
        return ResponseEntity.ok(dashboardService.getDashboardSummary());
    }
}
