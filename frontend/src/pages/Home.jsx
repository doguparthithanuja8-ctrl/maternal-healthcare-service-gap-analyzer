import React from 'react';
import { ArrowRight, BarChart3, MapPin, ShieldAlert, CheckCircle2, Layers } from 'lucide-react';
import DisclaimerNotice from '../components/DisclaimerNotice.jsx';

export default function Home({ onNavigate }) {
  return (
    <div className="space-y-8">
      {/* Hero Header Section (No floating blobs, no AI gradients, clean healthcare typography) */}
      <div className="bg-white border border-slate-200 rounded p-6 sm:p-10">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-[#176B5B] uppercase tracking-wider mb-2">
            Healthcare Planning & Resource Allocation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Maternal Healthcare Accessibility &amp; Service Gap Analyzer
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            A data-driven decision-support platform for understanding maternal healthcare service accessibility across communities.
          </p>

          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            The platform analyzes area-level maternal healthcare service indicators to identify accessibility gaps and support data-informed healthcare planning.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#176B5B] hover:bg-[#125447] rounded transition-colors"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-800 bg-[#F7F9F8] hover:bg-slate-100 border border-slate-300 rounded transition-colors"
            >
              <span>Explore Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Non-Clinical Disclaimer */}
      <DisclaimerNotice />

      {/* Core Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 bg-white border border-slate-200 rounded">
          <div className="w-8 h-8 rounded bg-[#E6F0EC] flex items-center justify-center text-[#176B5B] mb-3">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1.5">Area-Level Accessibility</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Compare regional coverage across antenatal care visits, institutional delivery readiness, and postnatal checkup infrastructure.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded">
          <div className="w-8 h-8 rounded bg-[#FBF3E2] flex items-center justify-center text-[#8C651A] mb-3">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1.5">Service Gap Detection</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Measure deficits between observed service metrics and national planning benchmarks to identify priority resource deficits.
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded">
          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1.5">Decision-Support Workflow</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Facilitate evidence-based resource distribution for ambulances, skilled birth attendants, and essential diagnostic facilities.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded p-6">
        <h2 className="text-sm font-bold text-slate-900 mb-2">Project-Defined Accessibility Index</h2>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          For each indicator, normalized score = min(100, observed ÷ benchmark × 100). The composite accessibility index is the
          weighted average across six maternal service indicators (ANC 4+ coverage, institutional delivery, postnatal care within 48h,
          skilled workforce density, diagnostic availability, and emergency transport reach). This score supports area-level planning only.
        </p>
      </div>

      {/* Core Analytical Workflow */}
      <div className="bg-white border border-slate-200 rounded p-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">
          Core Analytical Workflow
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          {[
            { step: '01', title: 'Healthcare Dataset', desc: 'CSV / Ingestion' },
            { step: '02', title: 'Data Validation', desc: 'Schema checks' },
            { step: '03', title: 'Relational DB', desc: 'MySQL storage' },
            { step: '04', title: 'Service Analysis', desc: 'Indicator norm' },
            { step: '05', title: 'Accessibility Index', desc: 'Score calculus' },
            { step: '06', title: 'Gap Detection', desc: 'Benchmark delta' },
            { step: '07', title: 'Planning Dashboard', desc: 'Maps & reports' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-[#F7F9F8] border border-slate-200 rounded">
              <div className="text-[10px] font-semibold text-[#176B5B] mb-1">{item.step}</div>
              <div className="text-xs font-bold text-slate-800 leading-tight mb-0.5">{item.title}</div>
              <div className="text-[11px] text-slate-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Boundaries & Explicit Restrictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-5 bg-white border border-slate-200 rounded">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#176B5B]" />
            <span>Platform Capabilities</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-[#176B5B] font-bold">✓</span>
              <span>Quantifies area-level maternal healthcare infrastructure availability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#176B5B] font-bold">✓</span>
              <span>Ranks administrative districts by relative accessibility need.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#176B5B] font-bold">✓</span>
              <span>Identifies infrastructure bottlenecks (ambulances, labs, skilled staff).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#176B5B] font-bold">✓</span>
              <span>Enables bilateral district comparison to guide public health investments.</span>
            </li>
          </ul>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-[#D9A441]" />
            <span>System Non-Clinical Boundaries</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-slate-400 font-bold">✗</span>
              <span>Does NOT diagnose medical conditions or obstetric complications.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-400 font-bold">✗</span>
              <span>Does NOT predict individual pregnancy outcomes or maternal mortality.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-400 font-bold">✗</span>
              <span>Does NOT recommend medical treatments, prescriptions, or clinical procedures.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-slate-400 font-bold">✗</span>
              <span>Does NOT classify individual pregnant women as high or low risk.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
