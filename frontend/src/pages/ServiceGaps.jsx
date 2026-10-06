import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import SectionCard from '../components/SectionCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import DataTable from '../components/DataTable.jsx';
import { LoadingState } from '../components/StateFeedback.jsx';
import { getServiceGaps } from '../services/gapService.js';
import { getAreas } from '../services/areaService.js';
import { Filter, ArrowUpRight, AlertCircle } from 'lucide-react';

export default function ServiceGaps({ onNavigate, onSelectArea }) {
  const [loading, setLoading] = useState(true);
  const [gaps, setGaps] = useState([]);
  const [areas, setAreas] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [areaFilter, setAreaFilter] = useState('ALL');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [gapsRes, areasRes] = await Promise.all([
          getServiceGaps('ALL'),
          getAreas()
        ]);
        setGaps(gapsRes.data || []);
        setAreas(areasRes.data || []);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <LoadingState message="Loading service gap evaluations across districts..." />;
  }

  // Filter gaps
  const filteredGaps = gaps.filter(gap => {
    const matchesPriority = priorityFilter === 'ALL' || gap.priority.toLowerCase().includes(priorityFilter.toLowerCase());
    const matchesArea = areaFilter === 'ALL' || gap.areaId === areaFilter;
    return matchesPriority && matchesArea;
  });

  const columns = [
    {
      header: 'District / Area',
      accessor: 'areaName',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-slate-900">{val}</span>
          <div className="text-[11px] text-slate-500 font-normal">{row.region}</div>
        </div>
      )
    },
    {
      header: 'Service Indicator',
      accessor: 'indicatorName',
      render: (val, row) => (
        <div>
          <span className="font-medium text-slate-800">{val}</span>
          <div className="text-[11px] text-slate-500 font-normal">Code: {row.indicatorCode}</div>
        </div>
      )
    },
    {
      header: 'Observed Value',
      accessor: 'observedValue',
      align: 'right',
      render: (val, row) => <span className="tabular-nums font-semibold">{val} {row.unit || '%'}</span>
    },
    {
      header: 'Policy Benchmark',
      accessor: 'benchmarkTarget',
      align: 'right',
      render: (val, row) => <span className="tabular-nums text-slate-600">{val} {row.unit || '%'}</span>
    },
    {
      header: 'Observed Gap',
      accessor: 'gapPercentage',
      align: 'right',
      render: (val) => (
        <span className={`tabular-nums font-bold ${val > 30 ? 'text-[#8C651A]' : 'text-slate-800'}`}>
          -{val}%
        </span>
      )
    },
    {
      header: 'Priority Classification',
      accessor: 'priority',
      align: 'center',
      render: (val) => <StatusBadge status={val} size="small" />
    },
    {
      header: '',
      accessor: 'areaId',
      align: 'right',
      render: (areaId) => (
        <button
          onClick={() => {
            if (onSelectArea) onSelectArea(areaId);
            onNavigate('areas');
          }}
          className="text-[#176B5B] hover:text-[#125447] text-xs font-medium flex items-center gap-0.5 justify-end"
        >
          <span>Analyze Area</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Service Gap Analysis Matrix"
        subtitle="Objective detection of maternal healthcare service deficits relative to established healthcare planning targets."
        kicker="Gap Prioritization"
      />

      {/* Terminology Notice Box */}
      <div className="p-3.5 bg-white border border-slate-200 rounded flex items-center gap-2.5 text-xs text-slate-600">
        <AlertCircle className="w-4 h-4 text-[#176B5B] shrink-0" />
        <span>
          <strong>Methodological Note:</strong> These categorizations reflect <em>relative service availability deficits</em> and <em>infrastructure shortages</em> compared to target norms. They do not represent patient-level clinical risk or personal diagnostic outcome predictions.
        </span>
      </div>

      {/* Filter and Overview Section */}
      <SectionCard
        title="Detected Service Gaps"
        subtitle="Filtered matrix showing observed values, national benchmarks, and computed priority levels"
        action={
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded px-2.5 py-1 bg-white text-slate-800 focus:outline-none focus:border-[#176B5B]"
              >
                <option value="ALL">All Priorities</option>
                <option value="Critical">Critical Gap</option>
                <option value="High">High Gap</option>
                <option value="Moderate">Moderate Gap</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span>District:</span>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded px-2.5 py-1 bg-white text-slate-800 focus:outline-none focus:border-[#176B5B]"
              >
                <option value="ALL">All Districts</option>
                {areas.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>
        }
      >
        <DataTable
          columns={columns}
          data={filteredGaps}
          emptyMessage="No service gaps matching the selected filter criteria."
        />
      </SectionCard>
    </div>
  );
}
