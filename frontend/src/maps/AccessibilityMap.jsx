import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

export default function AccessibilityMap({
  areas = [],
  selectedAreaId,
  onSelectArea,
  height = '500px'
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [tilesUnavailable, setTilesUnavailable] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default center around sample demo cluster
      const defaultLat = Number(import.meta.env.VITE_MAP_DEFAULT_LAT) || 23.685;
      const defaultLng = Number(import.meta.env.VITE_MAP_DEFAULT_LNG) || 89.500;
      const defaultZoom = Number(import.meta.env.VITE_MAP_DEFAULT_ZOOM) || 7;

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: true
      }).setView([defaultLat, defaultLng], defaultZoom);

      // OpenStreetMap standard tiles
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors',
      });
      tileLayer.on('tileerror', () => setTilesUnavailable(true));
      tileLayer.addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Custom SVG Marker Icon Factory
    const createMarkerIcon = (isPriorityGap, isSelected) => {
      const bgColor = isPriorityGap ? '#D9A441' : '#176B5B';
      const border = isSelected ? 'border: 3px solid #000;' : 'border: 2px solid #ffffff;';
      const size = isSelected ? 30 : 24;

      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background-color: ${bgColor};
            ${border}
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            color: white;
            font-size: 11px;
            font-weight: bold;
          ">
            <span>+</span>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    };

    // Add markers for all areas
    areas.forEach(area => {
      if (!area.latitude || !area.longitude) return;

      const isPriorityGap = (area.accessibilityIndex || 0) < 55.0;
      const isSelected = area.id === selectedAreaId;
      const icon = createMarkerIcon(isPriorityGap, isSelected);

      const marker = L.marker([area.latitude, area.longitude], { icon }).addTo(map);

      // Construct popup content
      const popupHtml = `
        <div style="font-family: inherit; min-width: 200px; padding: 4px;">
          <div style="font-size: 13px; font-weight: bold; color: #0f172a; margin-bottom: 2px;">
            ${area.name}
          </div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
            ${area.region} · Pop: ${(area.population || 0).toLocaleString()}
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; padding: 4px 0; border-top: 1px solid #e2e8f0;">
            <span style="color: #64748b;">Accessibility Index:</span>
            <strong style="color: #0f172a;">${area.accessibilityIndex ?? '—'} / 100</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; padding: 4px 0;">
            <span style="color: #64748b;">Status:</span>
            <strong style="color: ${isPriorityGap ? '#8C651A' : '#176B5B'};">
              ${area.accessibilityTier || 'Evaluated'}
            </strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; padding: 4px 0; margin-bottom: 8px;">
            <span style="color: #64748b;">Active Gaps:</span>
            <strong style="color: #0f172a;">${area.identifiedGapsCount || 0}</strong>
          </div>
          <button 
            id="popup-btn-${area.id}"
            style="
              width: 100%;
              padding: 6px 10px;
              background-color: #176B5B;
              color: white;
              font-size: 11px;
              font-weight: 500;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            "
          >
            Select for Analysis
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${area.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectArea) onSelectArea(area.id);
            marker.closePopup();
          };
        }
      });

      marker.on('click', () => {
        if (onSelectArea) onSelectArea(area.id);
      });

      markersRef.current[area.id] = marker;
    });

    // If an area is selected, pan smoothly
    if (selectedAreaId && markersRef.current[selectedAreaId]) {
      const selectedArea = areas.find(a => a.id === selectedAreaId);
      if (selectedArea?.latitude && selectedArea?.longitude) {
        map.panTo([selectedArea.latitude, selectedArea.longitude], { animate: true });
      }
    }
  }, [areas, selectedAreaId, onSelectArea]);

  return (
    <div className="relative border border-slate-200 rounded overflow-hidden">
      <div ref={mapContainerRef} style={{ height, width: '100%' }} />

      {tilesUnavailable && (
        <div className="absolute top-3 left-3 right-3 z-[1000] p-2.5 bg-white border border-[#D9A441]/40 rounded text-xs text-slate-700">
          Basemap tiles could not be loaded (network may be offline). District markers and selection still work on the gray canvas below.
        </div>
      )}

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs border border-slate-200 rounded p-2.5 shadow-xs z-[1000] text-xs">
        <div className="font-semibold text-slate-800 mb-1.5 text-[11px] uppercase tracking-wide">
          Accessibility Tier
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#176B5B] border border-white" />
            <span className="text-slate-600">Adequate / Moderate Access</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D9A441] border border-white" />
            <span className="text-slate-600">Priority Planning Gap (&lt;55.0)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
