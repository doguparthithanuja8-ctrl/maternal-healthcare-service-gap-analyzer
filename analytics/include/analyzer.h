/**
 * @file analyzer.h
 * @brief Header for Maternal Healthcare Service Gap & Accessibility Index Engine
 *
 * NOTE: This analytical engine provides transparent, deterministic, and explainable
 * area-level service gap calculation and normalization.
 *
 * DISCLAIMER:
 * This analytical index is defined for project-level comparison of service availability.
 * It is not a clinical or medical-risk score. It does not perform individual medical
 * diagnosis, predict clinical outcomes, or replace healthcare planning specialists.
 */

#ifndef ANALYZER_H
#define ANALYZER_H

#include <stddef.h>

#define MAX_NAME_LEN 128
#define NUM_CORE_INDICATORS 6

/* Indicator Indices */
#define IDX_ANC_COVERAGE        0
#define IDX_INST_DELIVERY       1
#define IDX_POSTNATAL_CARE      2
#define IDX_SKILLED_WORKFORCE   3
#define IDX_DIAGNOSTIC_SCORE    4
#define IDX_EMERG_TRANSPORT     5

/* Priority Categorization */
typedef enum {
    GAP_PRIORITY_ADEQUATE = 0,
    GAP_PRIORITY_MODERATE = 1,
    GAP_PRIORITY_HIGH     = 2,
    GAP_PRIORITY_CRITICAL = 3
} GapPriorityLevel;

/* Indicator Observation Record */
typedef struct {
    char indicator_code[32];
    char indicator_name[64];
    double observed_value;
    double benchmark_target;
    double normalized_score;      /* 0.0 to 100.0 */
    double absolute_gap;          /* benchmark - observed (if observed < benchmark) */
    double percentage_gap;        /* (benchmark - observed) / benchmark * 100.0 */
    double indicator_weight;      /* Sum of weights across indicators = 1.0 */
    GapPriorityLevel priority;
} IndicatorObservation;

/* Area Assessment Record */
typedef struct {
    char area_id[64];
    char area_name[MAX_NAME_LEN];
    long population;
    IndicatorObservation indicators[NUM_CORE_INDICATORS];
    double composite_accessibility_index; /* 0.0 to 100.0 */
    int total_priority_gaps;
} AreaAccessibilityAssessment;

/* Function Prototypes */

/**
 * Normalizes an observed value against its standard benchmark target.
 * Clamps normalized score between 0.0 and 100.0.
 */
double normalize_indicator(double observed, double benchmark, int higher_is_better);

/**
 * Calculates absolute and percentage gaps against the target benchmark.
 */
void calculate_indicator_gap(IndicatorObservation *obs);

/**
 * Determines gap priority based on transparent numerical thresholds.
 */
GapPriorityLevel evaluate_gap_priority(double percentage_gap);

/**
 * Computes the weighted composite accessibility index for an administrative area.
 */
double compute_area_accessibility_index(AreaAccessibilityAssessment *assessment);

/**
 * Sorts areas in ascending order of accessibility index (areas with lowest access first).
 */
void rank_areas_by_accessibility(AreaAccessibilityAssessment *assessments, size_t count);

#endif /* ANALYZER_H */
