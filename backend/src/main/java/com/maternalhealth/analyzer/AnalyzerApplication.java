package com.maternalhealth.analyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Maternal Healthcare Accessibility & Service Gap Analyzer Backend Application.
 * 
 * DISCLAIMER:
 * This system provides decision-support analysis for maternal healthcare services
 * and resource distribution at the area/district level.
 * It is NOT a medical diagnosis tool, does NOT predict individual pregnancy outcomes,
 * and does NOT replace licensed healthcare professionals.
 */
@SpringBootApplication
public class AnalyzerApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnalyzerApplication.class, args);
    }
}
