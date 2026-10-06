package com.maternalhealth.analyzer.service;

import com.maternalhealth.analyzer.dto.*;
import com.maternalhealth.analyzer.exception.ResourceNotFoundException;
import com.maternalhealth.analyzer.model.Area;
import com.maternalhealth.analyzer.repository.AreaRepository;
import com.maternalhealth.analyzer.repository.HealthcareFacilityRepository;
import com.maternalhealth.analyzer.repository.ServiceIndicatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AreaService {

    private final AreaRepository areaRepository;
    private final HealthcareFacilityRepository facilityRepository;
    private final ServiceIndicatorRepository indicatorRepository;

    @Autowired
    public AreaService(AreaRepository areaRepository,
                       HealthcareFacilityRepository facilityRepository,
                       ServiceIndicatorRepository indicatorRepository) {
        this.areaRepository = areaRepository;
        this.facilityRepository = facilityRepository;
        this.indicatorRepository = indicatorRepository;
    }

    public List<AreaSummaryDto> getAllAreaSummaries() {
        List<Area> dbAreas = areaRepository.findAll();
        if (!dbAreas.isEmpty()) {
            return dbAreas.stream().map(this::mapToSummary).collect(Collectors.toList());
        }
        return getSyntheticAreaSummaries();
    }

    public AreaDetailDto getAreaDetail(String id) {
        Optional<Area> areaOpt = areaRepository.findById(id);
        if (areaOpt.isPresent()) {
            Area area = areaOpt.get();
            AreaDetailDto dto = new AreaDetailDto();
            dto.setId(area.getId());
            dto.setName(area.getName());
            dto.setCode(area.getCode());
            dto.setRegion(area.getRegion());
            dto.setPopulation(area.getPopulation());
            dto.setTargetReproductivePop(area.getTargetReproductivePop());
            dto.setLatitude(area.getLatitude().doubleValue());
            dto.setLongitude(area.getLongitude().doubleValue());
            dto.setIndicators(getSyntheticIndicatorsForArea(id));
            dto.setFacilities(getSyntheticFacilitiesForArea(id));
            dto.setIdentifiedGaps(getSyntheticGapsForArea(id));
            dto.setAccessibilityIndex(calculateIndex(dto.getIndicators()));
            dto.setAccessibilityTier(deriveTier(dto.getAccessibilityIndex()));
            return dto;
        }

        // Check synthetic fallback
        return getSyntheticAreaSummaries().stream()
                .filter(a -> a.getId().equalsIgnoreCase(id))
                .findFirst()
                .map(this::convertSummaryToDetail)
                .orElseThrow(() -> new ResourceNotFoundException("Area not found with identifier: " + id));
    }

    private AreaSummaryDto mapToSummary(Area a) {
        AreaSummaryDto dto = new AreaSummaryDto();
        dto.setId(a.getId());
        dto.setName(a.getName());
        dto.setCode(a.getCode());
        dto.setRegion(a.getRegion());
        dto.setPopulation(a.getPopulation());
        dto.setLatitude(a.getLatitude().doubleValue());
        dto.setLongitude(a.getLongitude().doubleValue());
        dto.setFacilityCount(facilityRepository.findByAreaId(a.getId()).size());
        dto.setAncCoveragePct(72.5);
        dto.setAccessibilityIndex(68.4);
        dto.setAccessibilityTier("Moderate Access");
        dto.setIdentifiedGapsCount(2);
        return dto;
    }

    private AreaDetailDto convertSummaryToDetail(AreaSummaryDto s) {
        AreaDetailDto dto = new AreaDetailDto();
        dto.setId(s.getId());
        dto.setName(s.getName());
        dto.setCode(s.getCode());
        dto.setRegion(s.getRegion());
        dto.setPopulation(s.getPopulation());
        dto.setTargetReproductivePop((long)(s.getPopulation() * 0.24));
        dto.setLatitude(s.getLatitude());
        dto.setLongitude(s.getLongitude());
        dto.setAccessibilityIndex(s.getAccessibilityIndex());
        dto.setAccessibilityTier(s.getAccessibilityTier());
        dto.setIndicators(getSyntheticIndicatorsForArea(s.getId()));
        dto.setFacilities(getSyntheticFacilitiesForArea(s.getId()));
        dto.setIdentifiedGaps(getSyntheticGapsForArea(s.getId()));
        return dto;
    }

    public List<AreaSummaryDto> getSyntheticAreaSummaries() {
        List<AreaSummaryDto> list = new ArrayList<>();
        list.add(createSummary("area-001", "North Riverdale District", "NRD-01", "Northern Province", 245000, 3, 19, 76.4, 72.85, "Moderate Access", 2, 24.12, 88.24));
        list.add(createSummary("area-002", "Highland Valley Division", "HVD-02", "Eastern Highlands", 178000, 3, 10, 51.2, 43.68, "Priority Planning Need", 4, 24.65, 89.12));
        list.add(createSummary("area-003", "Coastal Delta Zone", "CDZ-03", "Southern Delta", 312000, 3, 12, 58.6, 49.75, "Priority Planning Need", 3, 22.35, 89.98));
        list.add(createSummary("area-004", "Central Metro Corridor", "CMC-04", "Central Province", 520000, 3, 58, 89.5, 89.40, "Adequate Access", 0, 23.71, 90.41));
        list.add(createSummary("area-005", "West Foothills Sub-district", "WFS-05", "Western Border", 142000, 2, 5, 44.3, 36.60, "High Service Gap", 5, 23.95, 88.90));
        list.add(createSummary("area-006", "Lake Basin Community", "LBC-06", "Central Province", 198000, 2, 8, 71.8, 67.25, "Moderate Access", 2, 23.40, 90.15));
        return list;
    }

    private AreaSummaryDto createSummary(String id, String name, String code, String region, long pop, int facs, int staff, double anc, double index, String tier, int gaps, double lat, double lon) {
        AreaSummaryDto d = new AreaSummaryDto();
        d.setId(id);
        d.setName(name);
        d.setCode(code);
        d.setRegion(region);
        d.setPopulation(pop);
        d.setFacilityCount(facs);
        d.setSkilledWorkersCount(staff);
        d.setAncCoveragePct(anc);
        d.setAccessibilityIndex(index);
        d.setAccessibilityTier(tier);
        d.setIdentifiedGapsCount(gaps);
        d.setLatitude(lat);
        d.setLongitude(lon);
        return d;
    }

    public List<IndicatorDetailDto> getSyntheticIndicatorsForArea(String areaId) {
        List<IndicatorDetailDto> list = new ArrayList<>();
        double m = areaId.equals("area-004") ? 1.15 : (areaId.equals("area-005") ? 0.55 : (areaId.equals("area-002") ? 0.65 : 0.90));
        
        list.add(new IndicatorDetailDto("ANC_COV", "Antenatal Care 4+ Visits Coverage", clamp(80.0 * m, 10, 98), 80.0, "%", calcGap(clamp(80.0 * m, 10, 98), 80.0), status(clamp(80.0 * m, 10, 98), 80.0), 0.18));
        list.add(new IndicatorDetailDto("INST_DELIV", "Institutional Delivery Rate", clamp(85.0 * m, 15, 99), 85.0, "%", calcGap(clamp(85.0 * m, 15, 99), 85.0), status(clamp(85.0 * m, 15, 99), 85.0), 0.20));
        list.add(new IndicatorDetailDto("PNC_CARE", "Postnatal Care within 48 Hours", clamp(75.0 * m, 10, 95), 75.0, "%", calcGap(clamp(75.0 * m, 10, 95), 75.0), status(clamp(75.0 * m, 10, 95), 75.0), 0.16));
        list.add(new IndicatorDetailDto("SKILLED_STAFF", "Skilled Workforce Density (per 10k pop)", clamp(4.5 * m, 0.8, 8.0), 4.5, "per 10k", calcGap(clamp(4.5 * m, 0.8, 8.0), 4.5), status(clamp(4.5 * m, 0.8, 8.0), 4.5), 0.18));
        list.add(new IndicatorDetailDto("DIAGNOSTIC_SCORE", "Diagnostic Availability Score", clamp(75.0 * m, 15, 98), 75.0, "Score", calcGap(clamp(75.0 * m, 15, 98), 75.0), status(clamp(75.0 * m, 15, 98), 75.0), 0.14));
        list.add(new IndicatorDetailDto("EMERG_TRANSPORT", "Emergency Transport 45min Reach", clamp(70.0 * m, 12, 95), 70.0, "%", calcGap(clamp(70.0 * m, 12, 95), 70.0), status(clamp(70.0 * m, 12, 95), 70.0), 0.14));
        return list;
    }

    public List<FacilityDto> getSyntheticFacilitiesForArea(String areaId) {
        List<FacilityDto> list = new ArrayList<>();
        FacilityDto f1 = new FacilityDto();
        f1.setId("fac-" + areaId + "-1");
        f1.setName("Referral General Hospital & Maternity Wing");
        f1.setFacilityType("DISTRICT_HOSPITAL");
        f1.setMaternityBeds(32);
        f1.setSkilledBirthAttendants(11);
        f1.setHasEmergencyTransport(true);
        f1.setHasDiagnosticLab(true);
        f1.setHasBloodStorage(true);
        f1.setOperatingHours("24/7");

        FacilityDto f2 = new FacilityDto();
        f2.setId("fac-" + areaId + "-2");
        f2.setName("Community Health Center - East Wing");
        f2.setFacilityType("COMMUNITY_HEALTH_CENTRE");
        f2.setMaternityBeds(10);
        f2.setSkilledBirthAttendants(3);
        f2.setHasEmergencyTransport(false);
        f2.setHasDiagnosticLab(true);
        f2.setHasBloodStorage(false);
        f2.setOperatingHours("12 Hours");

        list.add(f1);
        list.add(f2);
        return list;
    }

    public List<ServiceGapItemDto> getSyntheticGapsForArea(String areaId) {
        List<ServiceGapItemDto> gaps = new ArrayList<>();
        List<IndicatorDetailDto> indicators = getSyntheticIndicatorsForArea(areaId);
        String name = getAreaName(areaId);

        for (IndicatorDetailDto ind : indicators) {
            if (ind.getGapPercentage() > 10.0) {
                String priority = ind.getGapPercentage() > 40.0 ? "High" : (ind.getGapPercentage() > 20.0 ? "Moderate" : "Adequate");
                gaps.add(new ServiceGapItemDto(areaId, name, ind.getCode(), ind.getName(), ind.getObservedValue(), ind.getBenchmarkTarget(), ind.getGapPercentage(), priority));
            }
        }
        return gaps;
    }

    private String getAreaName(String id) {
        switch (id) {
            case "area-001": return "North Riverdale District";
            case "area-002": return "Highland Valley Division";
            case "area-003": return "Coastal Delta Zone";
            case "area-004": return "Central Metro Corridor";
            case "area-005": return "West Foothills Sub-district";
            case "area-006": return "Lake Basin Community";
            default: return "Target District";
        }
    }

    private double clamp(double val, double min, double max) {
        return Math.round(Math.max(min, Math.min(max, val)) * 10.0) / 10.0;
    }

    private double calcGap(double observed, double target) {
        if (observed >= target) return 0.0;
        return Math.round(((target - observed) / target * 100.0) * 10.0) / 10.0;
    }

    private String status(double observed, double target) {
        double gap = calcGap(observed, target);
        if (gap == 0.0) return "Adequate";
        if (gap > 35.0) return "Priority Gap";
        return "Moderate Gap";
    }

    private double calculateIndex(List<IndicatorDetailDto> list) {
        double weighted = 0;
        double wSum = 0;
        for (IndicatorDetailDto i : list) {
            double norm = Math.min(100.0, (i.getObservedValue() / i.getBenchmarkTarget()) * 100.0);
            weighted += norm * i.getWeight();
            wSum += i.getWeight();
        }
        return Math.round((weighted / wSum) * 100.0) / 100.0;
    }

    private String deriveTier(double index) {
        if (index >= 75.0) return "Adequate Access";
        if (index >= 55.0) return "Moderate Access";
        if (index >= 40.0) return "Priority Planning Need";
        return "High Service Gap";
    }
}
