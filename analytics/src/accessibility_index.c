/**
 * @file accessibility_index.c
 * @brief Composite Accessibility Index Formulation and Ranking
 */

#include "../include/analyzer.h"
#include <stdlib.h>

double compute_area_accessibility_index(AreaAccessibilityAssessment *assessment) {
    if (!assessment) return 0.0;

    double weighted_sum = 0.0;
    double total_weight = 0.0;
    int priority_gap_count = 0;

    for (int i = 0; i < NUM_CORE_INDICATORS; ++i) {
        IndicatorObservation *obs = &assessment->indicators[i];
        calculate_indicator_gap(obs);

        weighted_sum += obs->normalized_score * obs->indicator_weight;
        total_weight += obs->indicator_weight;

        if (obs->priority >= GAP_PRIORITY_MODERATE) {
            priority_gap_count++;
        }
    }

    assessment->total_priority_gaps = priority_gap_count;

    if (total_weight > 0.0) {
        assessment->composite_accessibility_index = weighted_sum / total_weight;
    } else {
        assessment->composite_accessibility_index = 0.0;
    }

    return assessment->composite_accessibility_index;
}

static int compare_accessibility(const void *a, const void *b) {
    const AreaAccessibilityAssessment *areaA = (const AreaAccessibilityAssessment *)a;
    const AreaAccessibilityAssessment *areaB = (const AreaAccessibilityAssessment *)b;

    /* Lower score ranks first (greatest accessibility need) */
    if (areaA->composite_accessibility_index < areaB->composite_accessibility_index) return -1;
    if (areaA->composite_accessibility_index > areaB->composite_accessibility_index) return 1;
    return 0;
}

void rank_areas_by_accessibility(AreaAccessibilityAssessment *assessments, size_t count) {
    if (!assessments || count < 2) return;
    qsort(assessments, count, sizeof(AreaAccessibilityAssessment), compare_accessibility);
}
