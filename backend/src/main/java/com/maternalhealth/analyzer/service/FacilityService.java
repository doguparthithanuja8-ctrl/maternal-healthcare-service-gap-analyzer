package com.maternalhealth.analyzer.service;

import com.maternalhealth.analyzer.dto.FacilityDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacilityService {

    private final AreaService areaService;

    @Autowired
    public FacilityService(AreaService areaService) {
        this.areaService = areaService;
    }

    public List<FacilityDto> getFacilitiesForArea(String areaId) {
        return areaService.getSyntheticFacilitiesForArea(areaId);
    }
}
