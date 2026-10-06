import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import MetricCard from '../components/MetricCard.jsx';
import SectionCard from '../components/SectionCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import DataTable from '../components/DataTable.jsx';
import BarChart from '../charts/BarChart.jsx';
import { LoadingState } from '../components/StateFeedback.jsx';
import { getAreas, getAreaById } from '../services/areaService.js';
import { formatNumber, formatPercent } from '../utils/formatters.js';
import { Building2, UserCheck, Stethoscope, AlertTriangle, ArrowRight } from 'lucide-react';

export default function AreaAnalysis({ selectedAreaId = 'area-002', onSelectArea, onNavigate }) {
  const [areas, setAreas] = useState([]);
  const [currentId, setCurrentId] = useState(selectedAreaId);
  const [areaDetail, setAreaDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load area dropdown list
  useEffect(() => {
    async function loadAreas() {
      const res = await getAreas();
      setAreas(res.data || []);
    }
    loadAreas();
  }, []);

  // Update currentId if prop changes
  useEffect(() => {
    if (selectedAreaId) {
      setCurrentId(selectedAreaId);
    }
  }, [selectedAreaId]);

  // Load detail for current area
  useEffect(() => {
    async function loadDetail() {
      setLoading(true);
      try {
        const res = await getAreaById(currentId);
        setAreaDetail(res.data);
      } finally {
        setLoading(false);
      }
    }
    if (currentId) {
      loadDetail();
    }
  }, [currentId]);

  const handleAreaChange = (e) => {
    const newId = e.target.value;
    setCurrentId(newId);
    if (onSelectArea) onSelectArea(newId);
  };

  if (loading || !areaDetail) {
    return <LoadingState message="Loading district assessment indicators and facility inventory..." />;
  }

  const indicators = areaDetail.indicators || [];
  const facilities = areaDetail.facilities || [];
  const gaps = areaDetail.gaps || [];

  const totalBeds = facilities.reduce((sum, f) => sum + (f.beds || 0), 0);
  const totalStaff = facilities.reduce((sum, f) => sum + (f.attendants || 0), 0);

  const indicatorColumns = [
    {
      header: 'Maternal Service Indicator',
      accessor: 'name',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-slate-900">{val}</span>
          <div className="text-[11px] text-slate-500 font-normal">Code: {row.code}</div>
        </div>
      )
    },
    {
      header: 'Observed Value',
      accessor: 'observed',
      align: 'right',
      render: (val, row) => <span className="font-bold tabular-nums">{val} {row.unit}</span>
    },
    {
      header: 'Target Benchmark',
      accessor: 'target',
      align: 'right',
      render: (val, row) => <span className="text-slate-600 tabular-nums">{val} {row.unit}</span>
    },
    {
      header: 'Service Deficit',
      accessor: 'gapPct',
      align: 'right',
      render: (val) => (
        <span className={`tabular-nums font-semibold ${val > 25.0 ? 'text-[#8C651A]' : 'text-slate-700'}`}>
          {val > 0 ? `-${val}%` : 'None (0%)'}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'priority',
      align: 'center',
      render: (val) => <StatusBadge status={val} size="small" />
    }
  ];

  const facilityColumns = [
    {
      header: 'Facility Name',
      accessor: 'name',
      render: (val) => <span className="font-semibold text-slate-900">{val}</span>
    },
    {
      header: 'Facility Level',
      accessor: 'type'
    },
    {
      header: 'Maternity Beds',
      accessor: 'beds',
      align: 'right'
    },
    {
      header: 'Skilled Staff',
      accessor: 'attendants',
      align: 'right'
    },
    {
      header: 'Ambulance',
      accessor: 'ambulance',
      align: 'center',
      render: val => val ? (
        <span className="text-[#176B5B] font-semibold text-xs">Available</span>
      ) : (
        <span className="text-slate-400 text-xs">Unavailable</span>
      )
    },
    {
      header: 'Obstetric Lab',
      accessor: 'lab',
      align: 'center',
      render: val => val ? (
        <span className="text-[#176B5B] font-semibold text-xs">Equipped</span>
      ) : (
        <span className="text-slate-400 text-xs">No</span>
      )
    },
    {
      header: 'Operating Hours',
      accessor: 'hours',
      align: 'right'
    }
  ];

  const chartData = indicators.map(i => ({
    label: i.name,
    value: i.observed,
    benchmark: i.target,
    unit: i.unit
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Area Assessment: ${areaDetail.name}`}
        subtitle="Granular evaluation of maternal healthcare services, provider densities, and observed infrastructure gaps against planning benchmarks."
        kicker="District Profile"
        actions={
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-600 hidden sm:inline">Select Area:</label>
            <select
              value={currentId}
              onChange={handleAreaChange}
              className="text-xs border border-slate-300 rounded px-3 py-1.5 bg-white text-slate-800 font-medium focus:outline-none focus:border-[#176B5B]"
            >
              {areas.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.code})
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                if (onSelectArea) onSelectArea(currentId);
                onNavigate('compare');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#176B5B] hover:bg-[#125447] rounded transition-colors"
            >
              <span>Compare District</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        }
      />

      {/* Top Profile Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Population"
          value={formatNumber(areaDetail.population)}
          unit="Residents"
          subtitle={`Target Repro: ${formatNumber(areaDetail.targetReproductivePop || Math.round(areaDetail.population * 0.24))}`}
        />
        <MetricCard
          title="Healthcare Facilities"
          value={facilities.length}
          unit="Facilities"
          subtitle={`${totalBeds} total maternity beds`}
        />
        <MetricCard
          title="Skilled Healthcare Workers"
          value={totalStaff}
          unit="Personnel"
          subtitle="Midwives and medical officers"
        />
        <MetricCard
          title="Accessibility Index"
          value={`${areaDetail.accessibilityIndex} / 100`}
          subtitle={areaDetail.accessibilityTier}
          highlight={areaDetail.accessibilityIndex < 55.0}
        />
      </div>

      {/* Identified Service Gaps Section (High Priority Callout) */}
      <SectionCard
        title="IDENTIFIED SERVICE GAPS"
        subtitle="Priority service shortages identified through benchmark variance analysis"
      >
        {gaps.length === 0 ? (
          <div className="p-4 bg-[#E6F0EC] border border-[#176B5B]/30 rounded text-xs text-[#176B5B] font-medium">
            ✓ No critical service gaps identified. All indicators meet or exceed baseline planning norms.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {gaps.map((gap, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FBF3E2] border border-[#D9A441]/40 rounded"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C651A]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{gap.name}</span>
                  </div>
                  <StatusBadge status={gap.priority} size="small" />
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <div className="flex justify-between">
                    <span>Observed Level:</span>
                    <strong className="text-slate-900">{gap.observed}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Benchmark Target:</span>
                    <strong className="text-slate-900">{gap.target}</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#D9A441]/20 text-[#8C651A] font-semibold">
                    <span>Identified Deficit:</span>
                    <span>-{gap.gapPct}% below target</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Indicator Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard
            title="Service Indicator Assessment"
            subtitle="Observed performance against national healthcare benchmarks"
          >
            <BarChart
              title="District Values vs Target Benchmarks"
              data={chartData}
            />
          </SectionCard>
        </div>

        <div>
          <SectionCard
            title="District Jurisdiction Details"
            subtitle="Administrative & Geographic Attributes"
          >
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Jurisdiction Code:</span>
                <span className="font-semibold text-slate-800">{areaDetail.code}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Administrative Region:</span>
                <span className="font-semibold text-slate-800">{areaDetail.region}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Surface Terrain:</span>
                <span className="font-semibold text-slate-800">{areaDetail.terrainType}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Geographic Area:</span>
                <span className="font-semibold text-slate-800">{areaDetail.areaSqKm} km²</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Latitude / Longitude:</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  {areaDetail.latitude?.toFixed(4)}, {areaDetail.longitude?.toFixed(4)}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">Accessibility Status:</span>
                <StatusBadge status={areaDetail.accessibilityTier} size="small" />
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Comprehensive Indicator Table */}
      <SectionCard
        title="Observed Indicator Data Breakdown"
        subtitle="Primary healthcare statistics compiled for the current planning cycle"
      >
        <DataTable
          columns={indicatorColumns}
          data={indicators}
          keyField="code"
        />
      </SectionCard>

      {/* Healthcare Facilities Inventory */}
      <SectionCard
        title="Healthcare Facility Inventory"
        subtitle="Catalog of registered primary health centres, clinics, and hospitals within this jurisdiction"
      >
        <DataTable
          columns={facilityColumns}
          data={facilities}
          keyField="id"
          emptyMessage="No facilities registered in this district."
        />
      </SectionCard>
    </div>
  );
}
