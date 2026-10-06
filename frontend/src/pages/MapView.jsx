import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import SectionCard from '../components/SectionCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import AccessibilityMap from '../maps/AccessibilityMap.jsx';
import { LoadingState } from '../components/StateFeedback.jsx';
import { getAreas, getAreaById } from '../services/areaService.js';
import { MapPin, Building, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import { formatNumber } from '../utils/formatters.js';

export default function MapView({ onNavigate, onSelectArea }) {
  const [areas, setAreas] = useState([]);
  const [selectedId, setSelectedId] = useState('area-002');
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getAreas();
        setAreas(res.data || []);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadSelected() {
      if (!selectedId) return;
      const res = await getAreaById(selectedId);
      setSelectedArea(res.data);
    }
    loadSelected();
  }, [selectedId]);

  const handleMarkerClick = (id) => {
    setSelectedId(id);
    if (onSelectArea) onSelectArea(id);
  };

  if (loading) {
    return <LoadingState message="Initializing geographic spatial map and district coordinates..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Geographic Accessibility Map"
        subtitle="Geospatial distribution of maternal healthcare facilities, district boundaries, and regional accessibility tiers."
        kicker="Spatial Visualization"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Leaflet Map Container */}
        <div className="lg:col-span-2">
          <SectionCard
            title="District Jurisdiction Service Map"
            subtitle="Click markers to view local accessibility indices and service gaps"
          >
            <AccessibilityMap
              areas={areas}
              selectedAreaId={selectedId}
              onSelectArea={handleMarkerClick}
              height="550px"
            />
          </SectionCard>
        </div>

        {/* Selected Area Inspector Panel */}
        <div>
          <SectionCard
            title="Selected District Inspector"
            subtitle={selectedArea ? selectedArea.name : 'Select a district marker on the map'}
          >
            {selectedArea ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-[#F7F9F8] border border-slate-200 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Accessibility Index</span>
                    <StatusBadge status={selectedArea.accessibilityTier} size="small" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">
                    {selectedArea.accessibilityIndex}
                    <span className="text-xs font-normal text-slate-500 ml-1">/ 100</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Region: {selectedArea.region} · Code: {selectedArea.code}
                  </div>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> Total Population:
                    </span>
                    <span className="font-semibold text-slate-800">{formatNumber(selectedArea.population)}</span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" /> Healthcare Facilities:
                    </span>
                    <span className="font-semibold text-slate-800">{selectedArea.facilities?.length || 0}</span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> Surface Area:
                    </span>
                    <span className="font-semibold text-slate-800">{selectedArea.areaSqKm || '—'} km²</span>
                  </div>
                </div>

                {/* Priority Gaps List */}
                <div>
                  <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#D9A441]" />
                    <span>Identified Gaps ({selectedArea.gaps?.length || 0})</span>
                  </div>
                  {(!selectedArea.gaps || selectedArea.gaps.length === 0) ? (
                    <div className="text-xs text-[#176B5B] p-2 bg-[#E6F0EC] rounded">
                      ✓ No critical service gaps identified.
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {selectedArea.gaps.map((g, idx) => (
                        <div key={idx} className="p-2 bg-[#FBF3E2] border border-[#D9A441]/30 rounded text-xs flex justify-between items-center">
                          <span className="font-medium text-slate-800 truncate mr-2">{g.name}</span>
                          <span className="text-[#8C651A] font-bold shrink-0">-{g.gapPct}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (onSelectArea) onSelectArea(selectedArea.id);
                      onNavigate('areas');
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-[#176B5B] hover:bg-[#125447] rounded transition-colors"
                  >
                    <span>Full District Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500 p-6 text-center">
                Click on any map marker to view detailed area service capabilities.
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
