import React from 'react';
import PageHeader from '../components/PageHeader.jsx';
import MetricCard from '../components/MetricCard.jsx';
import SectionCard from '../components/SectionCard.jsx';
import DataTable from '../components/DataTable.jsx';
import { DATASET_CATALOG, getNormalizedAreas } from '../data/appDataset.js';
import { BENCHMARKS } from '../utils/mockData.js';
import { FileSpreadsheet, Info } from 'lucide-react';

export default function DataManagement() {
  const areas = getNormalizedAreas();
  const facilityCount = areas.reduce((s, a) => s + a.facilities.length, 0);

  const catalogColumns = [
    {
      header: 'Dataset',
      accessor: 'name',
      render: (val) => <span className="font-semibold text-slate-900">{val}</span>,
    },
    { header: 'Records', accessor: 'records', align: 'right' },
    {
      header: 'Key Fields',
      accessor: 'fields',
      render: (fields) => (
        <span className="text-[11px] text-slate-600">{fields.slice(0, 4).join(', ')}…</span>
      ),
    },
    { header: 'Last Processed', accessor: 'lastProcessed' },
    {
      header: 'Quality Status',
      accessor: 'qualityStatus',
      render: (val) => (
        <span className="text-[#176B5B] font-semibold text-xs bg-[#E6F0EC] px-2 py-0.5 rounded border border-[#176B5B]/30">
          {val}
        </span>
      ),
    },
  ];

  const benchmarkRows = Object.values(BENCHMARKS).map((b) => ({
    code: b.code,
    name: b.name,
    target: b.target,
    weight: b.weight,
    unit: b.unit,
  }));

  const benchmarkColumns = [
    { header: 'Code', accessor: 'code', render: (v) => <code className="text-[#176B5B]">{v}</code> },
    { header: 'Indicator', accessor: 'name' },
    { header: 'Benchmark', accessor: 'target', align: 'right', render: (v, r) => `${v} ${r.unit}` },
    { header: 'Weight', accessor: 'weight', align: 'right' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dataset Configuration & Validation"
        subtitle="Reference structure for bundled demonstration datasets used in this presentation build. Upload is not required for the live demo."
        kicker="Data Management"
      />

      <div className="p-3.5 bg-white border border-slate-200 rounded flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-[#176B5B] shrink-0 mt-0.5" />
        <span>
          <strong>Synthetic demo data:</strong> All values are for software demonstration only. The active frontend dataset is loaded from{' '}
          <code className="text-[#176B5B]">/dataset/*.csv</code> (mirrored under <code className="text-[#176B5B]">frontend/public/dataset/</code> for download). No MySQL or backend is required for tomorrow&apos;s presentation.
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="District Records" value={areas.length} subtitle="Active planning areas" />
        <MetricCard title="Facility Records" value={facilityCount} subtitle="Linked inventory rows" />
        <MetricCard title="Core Indicators" value={6} subtitle="Weighted benchmark set" />
        <MetricCard
          title="Validation Status"
          value="Pass"
          subtitle="Schema & range checks (demo)"
        />
      </div>

      <SectionCard
        title="Registered Datasets"
        subtitle="Files shipped with the repository for reproducible demonstration"
        action={
          <a
            href="/dataset/maternal_health_district_data.csv"
            download
            className="flex items-center gap-1.5 text-xs font-medium text-[#176B5B] hover:underline"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Download district CSV
          </a>
        }
      >
        <DataTable columns={catalogColumns} data={DATASET_CATALOG} keyField="id" />
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Indicator Benchmark Definitions" subtitle="Used in accessibility index calculation">
          <DataTable columns={benchmarkColumns} data={benchmarkRows} keyField="code" />
        </SectionCard>

        <SectionCard title="Validation Rules" subtitle="Applied during dataset normalization">
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li>
              <strong>Percentage fields:</strong> Must fall within 0–100% (ANC, delivery, PNC, transport).
            </li>
            <li>
              <strong>Workforce density:</strong> Non-negative ratio per 10,000 target reproductive population.
            </li>
            <li>
              <strong>Coordinates:</strong> Latitude/longitude required for map markers (WGS84).
            </li>
            <li>
              <strong>Gap priority:</strong> Derived from percentage gap thresholds (15% / 30% / 50%) matching the C analytics module.
            </li>
            <li>
              <strong>Accessibility index:</strong> Weighted mean of normalized indicator scores, capped at 100 per indicator.
            </li>
          </ul>
          <div className="mt-4 p-3 bg-[#F7F9F8] border border-slate-200 rounded text-[11px] text-slate-500">
            Last processed: October 2026 · Planning cycle 2026 Q3
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
