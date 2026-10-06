import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import MetricCard from '../components/MetricCard.jsx';
import SectionCard from '../components/SectionCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import DataTable from '../components/DataTable.jsx';
import BarChart from '../charts/BarChart.jsx';
import GapDistributionChart from '../charts/GapDistributionChart.jsx';
import { LoadingState, ErrorState } from '../components/StateFeedback.jsx';
import { getDashboardData } from '../services/dashboardService.js';
import { formatNumber, formatPercent } from '../utils/formatters.js';
import { ArrowUpRight, Filter, RefreshCw } from 'lucide-react';

export default function Dashboard({ onNavigate, onSelectArea }) {
  const [loading, setLoading] = useState(true);
  const [errorNotice, setErrorNotice] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [regionFilter, setRegionFilter] = useState('ALL');

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await getDashboardData();
      setDashboardData(result.data);
      if (!result.isLive && result.fallbackReason) {
        setErrorNotice(result.fallbackReason);
      } else {
        setErrorNotice(null);
      }
    } catch (err) {
      setErrorNotice('Data service connection failed; displaying cached baseline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <LoadingState message="Loading dashboard indicators and area summaries..." />;
  }

  const kpis = dashboardData?.kpis || {};
  const areas = dashboardData?.areas || [];
  const priorityGaps = dashboardData?.priorityGaps || [];
  const indicatorAvgs = dashboardData?.indicatorAverages || {};

  const filteredAreas = regionFilter === 'ALL'
    ? areas
    : areas.filter(a => a.region === regionFilter);

  const regions = ['ALL', ...new Set(areas.map(a => a.region))];

  // Distribution counts
  const adequateCount = areas.filter(a => a.accessibilityIndex >= 75.0).length;
  const moderateCount = areas.filter(a => a.accessibilityIndex >= 55.0 && a.accessibilityIndex < 75.0).length;
  const priorityCount = areas.filter(a => a.accessibilityIndex < 55.0).length;

  const areaColumns = [
    {
      header: 'District / Area',
      accessor: 'name',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-slate-900 hover:text-[#176B5B] cursor-pointer">
            {val}
          </span>
          <div className="text-[11px] text-slate-500 font-normal">
            {row.region} · Code: {row.code}
          </div>
        </div>
      )
    },
    {
      header: 'Population',
      accessor: 'population',
      align: 'right',
      render: val => formatNumber(val)
    },
    {
      header: 'Facilities',
      accessor: 'facilityCount',
      align: 'right'
    },
    {
      header: 'Skilled Staff',
      accessor: 'skilledWorkersCount',
      align: 'right'
    },
    {
      header: 'ANC 4+ Coverage',
      accessor: 'ancCoveragePct',
      align: 'right',
      render: val => formatPercent(val)
    },
    {
      header: 'Accessibility Index',
      accessor: 'accessibilityIndex',
      align: 'right',
      render: val => <span className="font-bold tabular-nums">{val} / 100</span>
    },
    {
      header: 'Planning Status',
      accessor: 'accessibilityTier',
      align: 'center',
      render: val => <StatusBadge status={val} size="small" />
    },
    {
      header: '',
      accessor: 'id',
      align: 'right',
      render: (id) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectArea) onSelectArea(id);
            onNavigate('areas');
          }}
          className="text-[#176B5B] hover:text-[#125447] text-xs font-medium flex items-center gap-0.5 justify-end"
        >
          <span>Inspect</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Healthcare Planning Dashboard"
        subtitle="Aggregated district service accessibility, priority resource gaps, and infrastructure capacity across planning jurisdictions."
        kicker="Planning Overview"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#176B5B] hover:bg-[#125447] rounded transition-colors"
            >
              Generate Area Report
            </button>
          </div>
        }
      />

      {errorNotice && (
        <ErrorState
          title="Data Service Notice"
          message={`${errorNotice} Displaying bundled demonstration dataset.`}
          onRetry={loadData}
        />
      )}

      <div className="p-3 bg-[#E6F0EC] border border-[#176B5B]/25 rounded text-xs text-[#176B5B]">
        Presentation mode uses bundled synthetic district data (6 areas). Values are recomputed with the project accessibility index formula for consistency across all views.
      </div>

      {/* Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Areas Analyzed"
          value={kpis.areasAnalyzed || 0}
          unit="Districts"
          subtitle="Coverage areas evaluated"
        />
        <MetricCard
          title="Healthcare Facilities"
          value={kpis.healthcareFacilities || 0}
          unit="Units"
          subtitle="Hospital & clinic inventory"
        />
        <MetricCard
          title="Skilled Healthcare Workers"
          value={kpis.skilledHealthcareWorkers || 0}
          unit="Providers"
          subtitle="Midwives & medical officers"
        />
        <MetricCard
          title="Average ANC Coverage"
          value={formatPercent(kpis.averageAncCoveragePct)}
          subtitle="4+ antenatal visits"
          benchmark="80.0%"
          highlight={kpis.averageAncCoveragePct < 80.0}
        />
        <MetricCard
          title="Average Accessibility Index"
          value={kpis.averageAccessibilityIndex ?? 0}
          unit="/ 100"
          subtitle="Weighted composite across districts"
          benchmark="75.0"
          highlight={(kpis.averageAccessibilityIndex ?? 0) < 75}
        />
        <MetricCard
          title="Areas Requiring Attention"
          value={kpis.areasWithSignificantGaps ?? 0}
          unit="Districts"
          subtitle="Accessibility index below 55.0"
          highlight={(kpis.areasWithSignificantGaps ?? 0) > 0}
        />
      </div>

      {/* Accessibility Overview & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard
            title="Service Availability Benchmark Comparison"
            subtitle="Observed multi-indicator averages compared against national planning norms"
          >
            <BarChart
              title="District Averages vs Policy Benchmarks"
              data={[
                { label: 'Antenatal Care 4+ Visits', value: indicatorAvgs.ANC_COV ?? kpis.averageAncCoveragePct, benchmark: 80.0, unit: '%' },
                { label: 'Institutional Delivery Rate', value: indicatorAvgs.INST_DELIV ?? 0, benchmark: 85.0, unit: '%' },
                { label: 'Postnatal Care within 48h', value: indicatorAvgs.PNC_CARE ?? 0, benchmark: 75.0, unit: '%' },
                { label: 'Skilled Workforce Density', value: indicatorAvgs.SKILLED_STAFF ?? 0, benchmark: 4.5, unit: 'per 10k' },
                { label: 'Emergency Transport 45m Reach', value: indicatorAvgs.EMERG_TRANSPORT ?? 0, benchmark: 70.0, unit: '%' },
                { label: 'Diagnostic Availability Index', value: indicatorAvgs.DIAGNOSTIC_SCORE ?? 0, benchmark: 75.0, unit: 'Score' },
              ]}
            />
          </SectionCard>
        </div>

        <div>
          <SectionCard
            title="Accessibility Tier Distribution"
            subtitle="Categorization of evaluated planning districts"
          >
            <div className="space-y-5">
              <div className="p-4 bg-[#F7F9F8] border border-slate-200 rounded">
                <div className="text-xs text-slate-500 mb-1">Composite Mean Index</div>
                <div className="text-3xl font-bold text-slate-900 tabular-nums">
                  {kpis.averageAccessibilityIndex ?? '—'}
                  <span className="text-xs font-normal text-slate-500 ml-1">/ 100</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {kpis.areasWithSignificantGaps} of {areas.length} districts have priority service gaps
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">Area Distribution by Need</div>
                <GapDistributionChart
                  adequateCount={adequateCount}
                  moderateCount={moderateCount}
                  priorityCount={priorityCount}
                />
              </div>

              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 flex items-center justify-between">
                <span>Cycle: {dashboardData?.dataPeriod || '2026 Q3'}</span>
                <span>Updated: {dashboardData?.lastUpdated || 'October 2026'}</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Priority Service Gaps Section */}
      <SectionCard
        title="Priority Service Gaps Requiring Planning Attention"
        subtitle="Identified service deficits exceeding 20% deviation from target policy standards"
        action={
          <button
            onClick={() => onNavigate('gaps')}
            className="text-xs font-medium text-[#176B5B] hover:underline"
          >
            View Full Gap Matrix →
          </button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {priorityGaps.map((gap, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-[#F7F9F8] border border-slate-200 rounded hover:border-[#D9A441] transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[180px]">
                  {gap.areaName}
                </span>
                <StatusBadge status={gap.priority} size="small" />
              </div>
              <div className="text-xs text-slate-700 font-medium mb-1 truncate">
                {gap.indicatorName}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                <span>
                  Observed: <strong className="text-slate-800">{gap.observedValue}</strong>
                </span>
                <span>
                  Target: <strong className="text-slate-800">{gap.benchmarkTarget}</strong>
                </span>
                <span className="text-[#8C651A] font-semibold tabular-nums">
                  -{gap.gapPercentage}% Gap
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Area Summary Table */}
      <SectionCard
        title="District Area Registry"
        subtitle="Comprehensive register of evaluated districts with composite index and workforce density"
        action={
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded px-2.5 py-1 bg-white text-slate-700 focus:outline-none focus:border-[#176B5B]"
            >
              {regions.map(r => (
                <option key={r} value={r}>
                  {r === 'ALL' ? 'All Regions' : r}
                </option>
              ))}
            </select>
          </div>
        }
      >
        <DataTable
          columns={areaColumns}
          data={filteredAreas}
          onRowClick={(row) => {
            if (onSelectArea) onSelectArea(row.id);
            onNavigate('areas');
          }}
        />
      </SectionCard>
    </div>
  );
}
