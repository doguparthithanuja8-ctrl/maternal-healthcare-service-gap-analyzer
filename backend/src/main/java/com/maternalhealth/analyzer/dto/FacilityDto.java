package com.maternalhealth.analyzer.dto;

public class FacilityDto {
    private String id;
    private String name;
    private String facilityType;
    private int maternityBeds;
    private int skilledBirthAttendants;
    private boolean hasEmergencyTransport;
    private boolean hasDiagnosticLab;
    private boolean hasBloodStorage;
    private String operatingHours;

    public FacilityDto() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFacilityType() { return facilityType; }
    public void setFacilityType(String facilityType) { this.facilityType = facilityType; }

    public int getMaternityBeds() { return maternityBeds; }
    public void setMaternityBeds(int maternityBeds) { this.maternityBeds = maternityBeds; }

    public int getSkilledBirthAttendants() { return skilledBirthAttendants; }
    public void setSkilledBirthAttendants(int skilledBirthAttendants) { this.skilledBirthAttendants = skilledBirthAttendants; }

    public boolean isHasEmergencyTransport() { return hasEmergencyTransport; }
    public void setHasEmergencyTransport(boolean hasEmergencyTransport) { this.hasEmergencyTransport = hasEmergencyTransport; }

    public boolean isHasDiagnosticLab() { return hasDiagnosticLab; }
    public void setHasDiagnosticLab(boolean hasDiagnosticLab) { this.hasDiagnosticLab = hasDiagnosticLab; }

    public boolean isHasBloodStorage() { return hasBloodStorage; }
    public void setHasBloodStorage(boolean hasBloodStorage) { this.hasBloodStorage = hasBloodStorage; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }
}
