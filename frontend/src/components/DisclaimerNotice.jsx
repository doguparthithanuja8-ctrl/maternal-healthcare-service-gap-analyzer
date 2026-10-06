import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function DisclaimerNotice({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-600 bg-white border border-slate-200 rounded">
        <AlertCircle className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
        <span>
          <strong>Decision-Support Notice:</strong> Analyzes area-level service accessibility. Not a medical diagnosis system or individual clinical risk assessment.
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 bg-white border-l-4 border-l-[#D9A441] border border-slate-200 rounded text-xs text-slate-700">
      <AlertCircle className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
      <div>
        <div className="font-semibold text-slate-900 mb-0.5">Healthcare Planning Decision-Support System</div>
        <p className="leading-relaxed">
          This platform analyzes area-level maternal healthcare service indicators to identify accessibility gaps and support data-informed resource planning.
          It does <strong>not</strong> diagnose diseases, predict individual pregnancy outcomes, assess clinical mortality risk, or recommend medical prescriptions.
        </p>
      </div>
    </div>
  );
}
