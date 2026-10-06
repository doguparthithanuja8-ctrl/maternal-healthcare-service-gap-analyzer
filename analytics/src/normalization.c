/**
 * @file normalization.c
 * @brief Transparent Indicator Normalization Routines
 */

#include "../include/analyzer.h"

double normalize_indicator(double observed, double benchmark, int higher_is_better) {
    if (benchmark <= 0.0) {
        return 0.0;
    }

    double normalized = 0.0;
    if (higher_is_better) {
        /* Ratio of observed to benchmark target, capped at 100.0 */
        normalized = (observed / benchmark) * 100.0;
    } else {
        /* Inverse ratio for indicators where lower is better */
        if (observed <= 0.0) {
            normalized = 100.0;
        } else {
            normalized = (benchmark / observed) * 100.0;
        }
    }

    if (normalized > 100.0) {
        normalized = 100.0;
    }
    if (normalized < 0.0) {
        normalized = 0.0;
    }

    return normalized;
}
