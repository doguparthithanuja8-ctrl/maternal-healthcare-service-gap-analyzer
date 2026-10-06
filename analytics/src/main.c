/**
 * @file main.c
 * @brief Demonstration runner for the C Accessibility Analytics Engine
 */

#include <stdio.h>
#include <string.h>
#include "../include/analyzer.h"

int main(void) {
    printf("=================================================================\n");
    printf("MATERNAL HEALTHCARE ACCESSIBILITY & SERVICE GAP ANALYZER\n");
    printf("Core Numerical Analytics Engine (C Component Foundation)\n");
    printf("=================================================================\n");
    printf("DISCLAIMER: Project-level decision support only. Not clinical diagnosis.\n\n");

    AreaAccessibilityAssessment demo_area;
    memset(&demo_area, 0, sizeof(demo_area));
    strncpy(demo_area.area_id, "area-002", sizeof(demo_area.area_id) - 1);
    strncpy(demo_area.area_name, "Highland Valley Division", sizeof(demo_area.area_name) - 1);
    demo_area.population = 178000;

    /* Indicator 0: ANC 4+ Coverage */
    strncpy(demo_area.indicators[0].indicator_code, "ANC_COV", 31);
    strncpy(demo_area.indicators[0].indicator_name, "ANC 4+ Coverage", 63);
    demo_area.indicators[0].observed_value = 51.2;
    demo_area.indicators[0].benchmark_target = 80.0;
    demo_area.indicators[0].indicator_weight = 0.18;

    /* Indicator 1: Institutional Delivery */
    strncpy(demo_area.indicators[1].indicator_code, "INST_DELIV", 31);
    strncpy(demo_area.indicators[1].indicator_name, "Institutional Delivery", 63);
    demo_area.indicators[1].observed_value = 46.8;
    demo_area.indicators[1].benchmark_target = 85.0;
    demo_area.indicators[1].indicator_weight = 0.20;

    /* Indicator 2: Postnatal Care 48h */
    strncpy(demo_area.indicators[2].indicator_code, "PNC_CARE", 31);
    strncpy(demo_area.indicators[2].indicator_name, "Postnatal Care (48h)", 63);
    demo_area.indicators[2].observed_value = 41.5;
    demo_area.indicators[2].benchmark_target = 75.0;
    demo_area.indicators[2].indicator_weight = 0.16;

    /* Indicator 3: Skilled Workforce Density */
    strncpy(demo_area.indicators[3].indicator_code, "SKILLED_STAFF", 31);
    strncpy(demo_area.indicators[3].indicator_name, "Skilled Workforce Density", 63);
    demo_area.indicators[3].observed_value = 2.1;
    demo_area.indicators[3].benchmark_target = 4.5;
    demo_area.indicators[3].indicator_weight = 0.18;

    /* Indicator 4: Diagnostic Score */
    strncpy(demo_area.indicators[4].indicator_code, "DIAGNOSTIC_SCORE", 31);
    strncpy(demo_area.indicators[4].indicator_name, "Diagnostic Availability", 63);
    demo_area.indicators[4].observed_value = 38.0;
    demo_area.indicators[4].benchmark_target = 75.0;
    demo_area.indicators[4].indicator_weight = 0.14;

    /* Indicator 5: Emergency Transport Reach */
    strncpy(demo_area.indicators[5].indicator_code, "EMERG_TRANSPORT", 31);
    strncpy(demo_area.indicators[5].indicator_name, "Emergency Transport 45m", 63);
    demo_area.indicators[5].observed_value = 32.5;
    demo_area.indicators[5].benchmark_target = 70.0;
    demo_area.indicators[5].indicator_weight = 0.14;

    double score = compute_area_accessibility_index(&demo_area);

    printf("Analysis for: %s (Population: %ld)\n", demo_area.area_name, demo_area.population);
    printf("Composite Accessibility Index: %.2f / 100.00\n", score);
    printf("Identified Service Gaps count: %d\n\n", demo_area.total_priority_gaps);

    printf("%-26s | %-8s | %-8s | %-8s | %-12s\n", "Indicator", "Observed", "Target", "Gap %%", "Priority");
    printf("-----------------------------------------------------------------------------\n");
    for (int i = 0; i < NUM_CORE_INDICATORS; ++i) {
        IndicatorObservation *obs = &demo_area.indicators[i];
        const char *prio_str = "Adequate";
        if (obs->priority == GAP_PRIORITY_MODERATE) prio_str = "Moderate Gap";
        if (obs->priority == GAP_PRIORITY_HIGH) prio_str = "High Gap";
        if (obs->priority == GAP_PRIORITY_CRITICAL) prio_str = "Priority Gap";

        printf("%-26s | %7.1f  | %7.1f  | %6.1f%%  | %-12s\n",
               obs->indicator_name, obs->observed_value, obs->benchmark_target,
               obs->percentage_gap, prio_str);
    }
    printf("\nEngine test run completed successfully.\n");
    return 0;
}
