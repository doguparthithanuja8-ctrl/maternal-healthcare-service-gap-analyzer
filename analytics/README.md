# Maternal Healthcare Analytics Engine (C Foundation)

## Purpose
This component implements the core mathematical and deterministic calculation routines for:
1. **Indicator Normalization**: Mapping heterogeneous units (percentages, staff density ratios, infrastructure availability scores) onto a consistent `0.0 – 100.0` scale against defined policy benchmarks.
2. **Deterministic Service Gap Detection**: Comparing observed indicators against benchmark planning targets.
3. **Project-Defined Healthcare Accessibility Index**: Formulating an explainable weighted composite metric of area service availability.
4. **Service Gap Ranking**: Sorting areas by accessibility need to inform regional resource planning.

## Medical & Regulatory Disclaimer
> **IMPORTANT**:
> This analytical index is defined for project-level comparison of service availability. It is **not** a clinical or medical-risk score.
> It does **not**:
> - Diagnose disease or maternal complications
> - Predict individual pregnancy outcomes
> - Predict maternal mortality
> - Recommend medical treatment
> - Replace healthcare professionals or clinical judgement

## Building & Testing the C Component
```bash
cd analytics
make
make run
```

## Antigravity Integration Roadmap
During the Google Antigravity phase:
1. Compile into a shared library (`libmaternal_analyzer.so` or `.dylib`).
2. Expose Java Native Interface (JNI) or Foreign Function & Memory API (Project Panama / JNA) bindings into `backend/src/main/java/com/maternalhealth/analyzer/service/`.
3. Provide batch CSV analysis pipelines for high-throughput population dataset evaluations.
