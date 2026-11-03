import React from 'react';
import {
  Compass,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Layers,
  Maximize2,
  FileCheck,
} from 'lucide-react';
import { LandRecordDetails } from '../types';

interface SpatialBoundaryAuditorProps {
  record: LandRecordDetails;
  language: 'en' | 'kn';
}

export const SpatialBoundaryAuditor: React.FC<SpatialBoundaryAuditorProps> = ({
  record,
  language,
}) => {
  const isKn = language === 'kn';
  const bounds = record.spatial_boundaries;

  if (!bounds) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              KILLER FEATURE A
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ಸ್ಥಳೀಯ ಗಡಿ ಮತ್ತು ಒತ್ತುವರಿ ಮುನ್ನೆಚ್ಚರಿಕೆ ಏಜೆಂಟ್' : 'Spatial & Cadastral Encroachment Early-Warning'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            {isKn ? 'ನಾಲ್ಕು ದಿಕ್ಕುಗಳ ಗಡಿ & ಟಿಪ್ಪಣಿ ನಕ್ಷೆ ಪರಿಶೀಲನೆ' : '4-Direction Boundary & Cadastral Tippani Auditor'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ಹಳೆಯ ಕ್ರಯಪತ್ರ ಮತ್ತು ಪಹಣಿಯಲ್ಲಿರುವ ಚಕ್ಕುಬಂದಿ (ಉತ್ತರ, ದಕ್ಷಿಣ, ಪೂರ್ವ, ಪಶ್ಚಿಮ) ಮತ್ತು ರಸ್ತೆ ಒತ್ತುವರಿ ವಿಶ್ಲೇಷಣೆ'
              : 'Cross-references textual boundary bounds with Mojini Cadastral Podi sketches to flag acreage shifts'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
              bounds.boundary_shift_risk === 'LOW'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                : bounds.boundary_shift_risk === 'MEDIUM'
                ? 'bg-amber-950/80 text-amber-300 border-amber-700/60'
                : 'bg-rose-950/80 text-rose-300 border-rose-700/60'
            }`}
          >
            {isKn ? `ಒತ್ತುವರಿ ಅಪಾಯ: ${bounds.boundary_shift_risk}` : `Encroachment Risk: ${bounds.boundary_shift_risk}`}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Visual 4-Direction Boundary Compass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          {/* North */}
          <div className="md:col-start-2 bg-stone-50 p-4 rounded-xl border border-stone-200 text-center hover:border-indigo-400 transition-all">
            <span className="text-[10px] font-mono uppercase font-bold text-indigo-700 block mb-1">
              ⬆ {isKn ? 'ಉತ್ತರ ಗಡಿ (North)' : 'North Boundary'}
            </span>
            <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
              {bounds.north_boundary}
            </p>
            <span className="text-[10px] text-stone-500 font-mono">Natural Stream / Nala Buffer</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:col-span-3 gap-3">
            {/* West */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-center hover:border-indigo-400 transition-all">
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-700 block mb-1">
                ⬅ {isKn ? 'ಪಶ್ಚಿಮ ಗಡಿ (West)' : 'West Boundary'}
              </span>
              <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
                {bounds.west_boundary}
              </p>
              <span className="text-[10px] text-stone-500 font-mono">Brother’s Partitioned Plot</span>
            </div>

            {/* Center: Land Area Cadastral Node */}
            <div className="bg-indigo-50/70 p-5 rounded-2xl border-2 border-indigo-200 text-center flex flex-col items-center justify-center shadow-inner">
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-900">
                {isKn ? 'ಕಂದಾಯ ನಕ್ಷೆಯ ವಿಸ್ತೀರ್ಣ' : 'Survey Demarcated Area'}
              </span>
              <p className="text-xl font-bold font-mono text-indigo-950 mt-1">
                {record.total_extent}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-indigo-800 bg-white/80 px-2.5 py-1 rounded-lg border border-indigo-200">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Mojini Podi Sy: {record.survey_number}</span>
              </div>
            </div>

            {/* East */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-center hover:border-indigo-400 transition-all">
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-700 block mb-1">
                ➡ {isKn ? 'ಪೂರ್ವ ಗಡಿ (East)' : 'East Boundary'}
              </span>
              <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
                {bounds.east_boundary}
              </p>
              <span className="text-[10px] text-stone-500 font-mono">Neighbor Agricultural Field</span>
            </div>
          </div>

          {/* South */}
          <div className="md:col-start-2 bg-stone-50 p-4 rounded-xl border border-stone-200 text-center hover:border-indigo-400 transition-all">
            <span className="text-[10px] font-mono uppercase font-bold text-indigo-700 block mb-1">
              ⬇ {isKn ? 'ದಕ್ಷಿಣ ಗಡಿ (South)' : 'South Boundary'}
            </span>
            <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
              {bounds.south_boundary}
            </p>
            <span className="text-[10px] text-stone-500 font-mono">Village Cart Track (Gram Bandi)</span>
          </div>
        </div>

        {/* Encroachment Notes Alert */}
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 text-amber-950 flex items-start gap-3 text-xs leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">
              {isKn ? 'ಸ್ಥಳೀಯ ಒತ್ತುವರಿ ಮುನ್ಸೂಚನೆ ಟಿಪ್ಪಣಿ:' : 'Spatial Discrepancy Early-Warning:'}{' '}
            </span>
            {bounds.encroachment_notes}
            <div className="mt-2 text-[11px] text-stone-600 font-mono">
              <strong>{isKn ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ:' : 'Recommended Action:'}</strong>{' '}
              {isKn
                ? 'ತಾಲೂಕು ADLR ಕಚೇರಿಯಲ್ಲಿ ೧೧ಇ ನಕ್ಷೆ (Form 11E Sketch / ಹದ್ದುಬಸ್ತು ಸರ್ವೆ) ಗಾಗಿ ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಗಡಿ ಕಲ್ಲುಗಳನ್ನು (Gadi Kallu) ಮರು-ಸ್ಥಾಪಿಸಿ.'
                : 'Apply on Mojini portal for 11E Sketch / Haddubasthu Survey via ADLR to re-fix boundary stone markers before partition deed.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
