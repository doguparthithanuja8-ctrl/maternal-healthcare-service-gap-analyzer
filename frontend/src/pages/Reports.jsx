import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import SectionCard from '../components/SectionCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import DataTable from '../components/DataTable.jsx';
import { getAreas } from '../services/areaService.js';
import { getAllServiceGaps } from '../data/appDataset.js';
import { buildCsv, downloadCsv } from '../utils/csvExport.js';
import { Download, FileText, CheckCircle, Printer } from 'lucide-react';

export default function Reports() {
  const [areas, setAreas] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState('ALL');
  const [reportFormat, setReportFormat] = useState('SUMMARY');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      const res = await getAreas();
      setAreas(res.data || []);
    }
    loadData();
  }, []);

  const handleDownloadCsv = () => {
    const filtered =
      selectedAreaId === 'ALL' ? areas : areas.filter((a) => a.id === selectedAreaId);

    if (reportFormat === 'GAPS_ONLY') {
      const gaps = getAllServiceGaps().filter(
        (g) => selectedAreaId === 'ALL' || g.areaId === selectedAreaId
      );
      const headers = [
        'Area ID',
        'Area Name',
        'Region',
        'Indicator Code',
        'Indicator',
        'Observed',
        'Benchmark',
        'Gap %',
        'Priority',
      ];
      const rows = gaps.map((g) => [
        g.areaId,
        g.areaName,
        g.region,
        g.indicatorCode,
        g.indicatorName,
        g.observedValue,
        g.benchmarkTarget,
        g.gapPercentage,
        g.priority,
      ]);
      downloadCsv(`maternal_health_gaps_${selectedAreaId.toLowerCase()}_2026.csv`, buildCsv(headers, rows));
    } else {
      const headers = [
        'Area ID',
        'Name',
        'Code',
        'Region',
        'Population',
        'ANC Coverage %',
        'Accessibility Index',
        'Status Tier',
        'Facility Count',
        'Skilled Workers',
      ];
      const rows = filtered.map((a) => [
        a.id,
        a.name,
        a.code,
        a.region,
        a.population,
        a.ancCoveragePct,
        a.accessibilityIndex,
        a.accessibilityTier,
        a.facilityCount,
        a.skilledWorkersCount,
      ]);
      downloadCsv(`maternal_health_report_${selectedAreaId.toLowerCase()}_2026.csv`, buildCsv(headers, rows));
    }

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  const reportColumns = [
    { header: 'Jurisdiction Code', accessor: 'code' },
    { header: 'District Name', accessor: 'name', render: val => <strong>{val}</strong> },
    { header: 'Region', accessor: 'region' },
    { header: 'Population', accessor: 'population', align: 'right', render: v => v?.toLocaleString() },
    { header: 'ANC 4+ (%)', accessor: 'ancCoveragePct', align: 'right', render: v => `${v}%` },
    { header: 'Accessibility Index', accessor: 'accessibilityIndex', align: 'right', render: v => <span className="tabular-nums font-bold">{v}</span> },
    { header: 'Planning Priority', accessor: 'accessibilityTier', align: 'center', render: v => <StatusBadge status={v} size="small" /> }
  ];

  const filteredAreas = selectedAreaId === 'ALL'
    ? areas
    : areas.filter(a => a.id === selectedAreaId);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Planning Report Generation"
        subtitle="Compile standardized executive summaries, district accessibility dossiers, and raw tabular data exports."
        kicker="Reports & Export"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print View</span>
            </button>
            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#176B5B] hover:bg-[#125447] rounded transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>
        }
      />

      {downloadSuccess && (
        <div className="p-3 bg-[#E6F0EC] border border-[#176B5B]/30 rounded text-xs text-[#176B5B] flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>CSV dataset export generated and downloaded successfully.</span>
        </div>
      )}

      {/* Configuration Controls */}
      <SectionCard
        title="Report Parameters"
        subtitle="Configure jurisdiction filter and output template"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Jurisdiction</label>
            <select
              value={selectedAreaId}
              onChange={(e) => setSelectedAreaId(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded px-3 py-2 bg-white text-slate-800 focus:outline-none focus:border-[#176B5B]"
            >
              <option value="ALL">All Evaluated Districts (Consolidated)</option>
              {areas.map(a => (
                <option key={a.id} value={a.id}>{a.name} ({a.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Report Template</label>
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value)}
              className="w-full text-xs border border-slate-300 rounded px-3 py-2 bg-white text-slate-800 focus:outline-none focus:border-[#176B5B]"
            >
              <option value="SUMMARY">Executive Planning Summary</option>
              <option value="FULL">Comprehensive Indicator Audit</option>
              <option value="GAPS_ONLY">Service Gaps Remediation Plan</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleDownloadCsv}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-800 bg-[#F7F9F8] hover:bg-slate-100 border border-slate-300 rounded transition-colors"
            >
              <FileText className="w-4 h-4 text-[#176B5B]" />
              <span>Export Raw Indicators (.csv)</span>
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Generated Report Preview */}
      <SectionCard
        title="Report Document Preview"
        subtitle="Maternal Healthcare Accessibility Assessment Report (2026 Q3 Planning Cycle)"
      >
        <div className="space-y-4">
          <div className="p-4 bg-[#F7F9F8] border border-slate-200 rounded text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 text-sm">
              Document: National Maternal Health Infrastructure Evaluation
            </div>
            <div className="text-slate-500">
              Authority: Directorate of Regional Healthcare Allocation · Published for technical planning
            </div>
            <p className="leading-relaxed">
              This report compiles area-level maternal health indicators to evaluate spatial distribution and service availability.
              Districts with accessibility scores below 55.0 are classified under priority planning needs for obstetric workforce deployment,
              ambulance fleet allocation, and primary diagnostic readiness.
            </p>
          </div>

          <DataTable
            columns={reportColumns}
            data={filteredAreas}
          />
        </div>
      </SectionCard>
    </div>
  );
}
