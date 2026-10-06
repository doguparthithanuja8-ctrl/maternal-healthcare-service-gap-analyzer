import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import SectionCard from '../components/SectionCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import DataTable from '../components/DataTable.jsx';
import BarChart from '../charts/BarChart.jsx';
import { LoadingState } from '../components/StateFeedback.jsx';
import { getAreas, compareAreas } from '../services/areaService.js';
import { GitCompare, ArrowRightLeft } from 'lucide-react';

export default function AreaComparison({ initialAreaA = 'area-001', initialAreaB = 'area-002' }) {
  const [areas, setAreas] = useState([]);
  const [areaAId, setAreaAId] = useState(initialAreaA);
  const [areaBId, setAreaBId] = useState(initialAreaB);
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAreaAId(initialAreaA);
    setAreaBId(initialAreaB);
  }, [initialAreaA, initialAreaB]);

  useEffect(() => {
    async function loadAreasList() {
      const res = await getAreas();
      setAreas(res.data || []);
    }
    loadAreasList();
  }, []);

  // Fetch comparison details
  useEffect(() => {
    async function fetchComparison() {
      setLoading(true);
      try {
        const res = await compareAreas(areaAId, areaBId);
        setComparisonData(res.data);
      } finally {
        setLoading(false);
      }
    }
    if (areaAId && areaBId) {
      fetchComparison();
    }
  }, [areaAId, areaBId]);

  const handleSwap = () => {
    const temp = areaAId;
    setAreaAId(areaBId);
    setAreaBId(temp);
  };

  if (loading || !comparisonData) {
    return <LoadingState message="Generating bilateral district comparison matrix..." />;
  }

  const { areaA, areaB, metricRows } = comparisonData;

  const comparisonColumns = [
    {
      header: 'Evaluated Metric / Indicator',
      accessor: 'metric',
      render: (val) => <span className="font-semibold text-slate-900">{val}</span>
    },
    {
      header: `${areaA?.name || 'Area A'}`,
      accessor: 'valueA',
      align: 'right',
      render: (val, row) => (
        <span className="font-bold text-[#176B5B] tabular-nums">
          {val} {row.unit}
        </span>
      )
    },
    {
      header: `${areaB?.name || 'Area B'}`,
      accessor: 'valueB',
      align: 'right',
      render: (val, row) => (
        <span className="font-bold text-slate-800 tabular-nums">
          {val} {row.unit}
        </span>
      )
    },
    {
      header: 'Benchmark Target',
      accessor: 'benchmark',
      align: 'right',
      render: (val, row) => (
        <span className="text-slate-500 tabular-nums">
          {val} {row.unit}
        </span>
      )
    },
    {
      header: 'Net Variance (A - B)',
      accessor: 'delta',
      align: 'right',
      render: (val, row) => {
        const isPositive = val > 0;
        return (
          <span className={`font-semibold tabular-nums ${isPositive ? 'text-[#176B5B]' : val < 0 ? 'text-[#8C651A]' : 'text-slate-600'}`}>
            {isPositive ? `+${val}` : val} {row.unit}
          </span>
        );
      }
    },
    {
      header: 'Better Performer',
      accessor: 'delta',
      align: 'center',
      render: (val, row) => {
        if (val === 0) return <span className="text-xs text-slate-500">Tied</span>;
        const aWins = val > 0;
        const label = aWins ? areaA?.code : areaB?.code;
        return (
          <span className={`text-xs font-semibold ${aWins ? 'text-[#176B5B]' : 'text-slate-800'}`}>
            {label}
          </span>
        );
      },
    },
  ];

  // Prepare chart comparison data (normalizing A and B against benchmark)
  const chartDataA = (metricRows || []).slice(1).map(r => ({
    label: `${r.metric} (${areaA?.code})`,
    value: r.valueA,
    benchmark: r.benchmark,
    unit: r.unit
  }));

  const chartDataB = (metricRows || []).slice(1).map(r => ({
    label: `${r.metric} (${areaB?.code})`,
    value: r.valueB,
    benchmark: r.benchmark,
    unit: r.unit
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bilateral Area Comparison"
        subtitle="Side-by-side indicator analysis across two planning jurisdictions to identify relative disparities in service availability."
        kicker="Comparative Analytics"
      />

      {/* Selector Control Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Area A Selector */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-[#176B5B] uppercase tracking-wide mb-1">
            Primary Area (Area A)
          </label>
          <select
            value={areaAId}
            onChange={(e) => setAreaAId(e.target.value)}
            className="w-full text-xs border border-slate-300 rounded px-3 py-2 bg-white text-slate-800 font-medium focus:outline-none focus:border-[#176B5B]"
          >
            {areas.map(a => (
              <option key={a.id} value={a.id} disabled={a.id === areaBId}>
                {a.name} ({a.region})
              </option>
            ))}
          </select>
        </div>

        {/* Swap button */}
        <button
          onClick={handleSwap}
          title="Swap areas"
          className="p-2 text-slate-500 hover:text-slate-800 bg-[#F7F9F8] border border-slate-200 rounded hover:bg-slate-100 transition-colors"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>

        {/* Area B Selector */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
            Comparison Area (Area B)
          </label>
          <select
            value={areaBId}
            onChange={(e) => setAreaBId(e.target.value)}
            className="w-full text-xs border border-slate-300 rounded px-3 py-2 bg-white text-slate-800 font-medium focus:outline-none focus:border-[#176B5B]"
          >
            {areas.map(a => (
              <option key={a.id} value={a.id} disabled={a.id === areaAId}>
                {a.name} ({a.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Profile Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-[#176B5B]/30 rounded">
          <div className="text-xs font-bold text-[#176B5B] mb-1">Area A: {areaA?.name}</div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {areaA?.accessibilityIndex} <span className="text-xs font-normal text-slate-500">/ 100</span>
            </span>
            <StatusBadge status={areaA?.accessibilityTier} size="small" />
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Population: {(areaA?.population || 0).toLocaleString()} · Region: {areaA?.region}
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded">
          <div className="text-xs font-bold text-slate-800 mb-1">Area B: {areaB?.name}</div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {areaB?.accessibilityIndex} <span className="text-xs font-normal text-slate-500">/ 100</span>
            </span>
            <StatusBadge status={areaB?.accessibilityTier} size="small" />
          </div>
          <div className="text-xs text-slate-500 mt-2">
            Population: {(areaB?.population || 0).toLocaleString()} · Region: {areaB?.region}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <SectionCard
        title="Side-by-Side Indicator Comparison"
        subtitle="Direct delta evaluation against target planning benchmarks"
      >
        <DataTable
          columns={comparisonColumns}
          data={metricRows}
          keyField="metric"
        />
      </SectionCard>

      {/* Graphical Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard
          title={`${areaA?.name} (Area A)`}
          subtitle="Observed indicator profile against target benchmarks"
        >
          <BarChart
            data={chartDataA}
            title="Area A Service Metrics"
          />
        </SectionCard>

        <SectionCard
          title={`${areaB?.name} (Area B)`}
          subtitle="Observed indicator profile against target benchmarks"
        >
          <BarChart
            data={chartDataB}
            title="Area B Service Metrics"
          />
        </SectionCard>
      </div>
    </div>
  );
}
