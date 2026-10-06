/**
 * @file gap_calculator.c
 * @brief Service Gap Calculation & Priority Classification
 */

#include "../include/analyzer.h"

GapPriorityLevel evaluate_gap_priority(double percentage_gap) {
    if (percentage_gap <= 0.0) {
        return GAP_PRIORITY_ADEQUATE;
    } else if (percentage_gap < 15.0) {
        return GAP_PRIORITY_ADEQUATE;
    } else if (percentage_gap < 30.0) {
        return GAP_PRIORITY_MODERATE;
    } else if (percentage_gap < 50.0) {
        return GAP_PRIORITY_HIGH;
    } else {
        return GAP_PRIORITY_CRITICAL;
    }
}

void calculate_indicator_gap(IndicatorObservation *obs) {
    if (!obs) return;

    obs->normalized_score = normalize_indicator(obs->observed_value, obs->benchmark_target, 1);

    if (obs->observed_value < obs->benchmark_target) {
        obs->absolute_gap = obs->benchmark_target - obs->observed_value;
        obs->percentage_gap = (obs->absolute_gap / obs->benchmark_target) * 100.0;
    } else {
        obs->absolute_gap = 0.0;
        obs->percentage_gap = 0.0;
    }

    obs->priority = evaluate_gap_priority(obs->percentage_gap);
}
