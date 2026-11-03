import React from 'react';
import {
  Users,
  UserCheck,
  Scale,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileSignature,
  Shield,
  HeartHandshake,
} from 'lucide-react';
import { FamilyMember } from '../types';

interface InteractiveFamilyTreeProps {
  deceasedName: string;
  deceasedYear: string;
  familyMembers: FamilyMember[];
  onToggleNoc: (id: string) => void;
  language: 'en' | 'kn';
  totalExtent: string;
}

export const InteractiveFamilyTree: React.FC<InteractiveFamilyTreeProps> = ({
  deceasedName,
  deceasedYear,
  familyMembers,
  onToggleNoc,
  language,
  totalExtent,
}) => {
  const isKn = language === 'kn';

  const activeHeirs = familyMembers.filter((m) => !m.isNocOrRelinquishing);
  const totalCount = Math.max(activeHeirs.length, 1);
  const shareFraction = `1/${totalCount}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              FEATURE 2
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ಸ್ವಯಂಚಾಲಿತ ವಂಶವೃಕ್ಷ ಮತ್ತು ಸಮಪಾಲು ಲೆಕ್ಕಾಚಾರ' : 'Automated Genealogical Lineage & Share Mapper'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            {isKn ? 'ವಾರಸು ವಂಶವೃಕ್ಷ ಮ್ಯಾಪರ್ (Varasa Family Tree)' : 'Interactive Legal Heir "Varasa" Tree'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ಹಿಂದೂ ಉತ್ತರಾಧಿಕಾರ ಕಾಯ್ದೆ ೨೦೦೫ ರನ್ವಯ ಹೆಣ್ಣು ಮಕ್ಕಳು & ಗಂಡು ಮಕ್ಕಳಿಗೆ ಸಮಪಾಲು ದೃಶ್ಯೀಕರಣ'
              : 'Visualizes coparcenary share devolution and missing heir safeguards'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-300 bg-amber-950/80 px-3 py-1 rounded-lg border border-amber-700/60">
            {isKn ? `ಪ್ರತಿಯೊಬ್ಬರಿಗೂ: ${shareFraction} ಸಮಪಾಲು` : `Each Active Heir: ${shareFraction} Equal Share`}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Visual Root Node: Deceased Land Owner */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm bg-stone-900 text-white p-4 rounded-2xl border-2 border-amber-500/60 shadow-lg text-center relative group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-600 text-white shadow-xs">
              {isKn ? 'ದಿವಂಗತ ಮೂಲ ಖಾತೆದಾರ' : 'Deceased Root Khatedar'}
            </div>
            <h4 className="font-serif font-bold text-base sm:text-lg text-white mt-1">
              {deceasedName}
            </h4>
            <p className="text-xs text-stone-300 font-mono mt-0.5">
              {isKn ? `ನಿಧನ: ${deceasedYear} • ಒಟ್ಟು ಜಮೀನು: ${totalExtent}` : `Demise: ${deceasedYear} • Total Extent: ${totalExtent}`}
            </p>
            <div className="mt-2 text-[10px] text-amber-300 font-mono bg-stone-850 py-1 px-2 rounded border border-stone-700">
              {isKn ? 'ಕಾಲಂ ೯ ರಲ್ಲಿರುವ ಮೂಲ ಹೆಸರು' : 'Original Recorded Owner in RTC Col 9'}
            </div>
          </div>

          {/* Stem Line */}
          <div className="w-0.5 h-8 bg-amber-500/60 my-1"></div>
          <div className="w-full max-w-2xl h-0.5 bg-amber-500/40 relative">
            <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-500"></div>
          </div>
          <div className="w-0.5 h-6 bg-amber-500/40 mb-3"></div>
        </div>

        {/* Heirs Level Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {familyMembers.map((member) => {
            const isWaived = member.isNocOrRelinquishing;

            return (
              <div
                key={member.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isWaived
                    ? 'bg-stone-50 border-stone-200 opacity-60'
                    : 'bg-white border-amber-300/80 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-serif font-bold text-sm text-stone-900">
                      {isKn && member.kannada_name ? member.kannada_name : member.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isWaived
                          ? 'bg-stone-200 text-stone-700'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {isWaived ? (isKn ? 'ಹಕ್ಕು ಬಿಟ್ಟಿದ್ದಾರೆ' : 'Relinquished') : (isKn ? 'ಸಮಪಾಲುದಾರ' : 'Coparcener')}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-medium">{member.relationship}</p>

                  <div className="mt-2 text-xs font-mono text-stone-500">
                    <span className="text-[10px] uppercase text-stone-400 block">Aadhaar Proof:</span>
                    <span className="font-semibold text-stone-800">{member.aadhaarName}</span>
                  </div>

                  <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{member.currentCity || (isKn ? 'ಗ್ರಾಮದಲ್ಲಿದ್ದಾರೆ' : 'Local Village')}</span>
                  </div>

                  {/* Calculated share badge */}
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs">
                    <div className="flex items-center justify-between text-stone-800 font-mono">
                      <span>{isKn ? 'ಕಾನೂನುಬದ್ಧ ಪಾಲು:' : 'Statutory Share:'}</span>
                      <strong className="text-amber-900 font-bold">
                        {isWaived ? '0 (NOC)' : `${shareFraction} Share (${(100 / totalCount).toFixed(1)}%)`}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Relinquishment Toggle Button */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => onToggleNoc(member.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors w-full flex items-center justify-center gap-1.5 ${
                      isWaived
                        ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>
                      {isWaived
                        ? isKn ? 'ಹಕ್ಕು ಮರು-ಸ್ಥಾಪಿಸಿ' : 'Reclaim Share'
                        : isKn ? 'ಹಕ್ಕು ಬಿಡು ಪತ್ರ (NOC)' : 'Relinquish Share (NOC)'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Missing Heir Safeguard Notice */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
          <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <span className="font-bold">
              {isKn ? 'ಕಾನೂನು ರಕ್ಷಣೆ (HSA ೨೦೦೫ ಕಲಂ ೬):' : 'Succession Law Safeguard (HSA 2005 Sec 6):'}{' '}
            </span>
            {isKn
              ? 'ವಿವಾಹಿತ ಅಥವಾ ಅವಿವಾಹಿತ ಹೆಣ್ಣು ಮಕ್ಕಳನ್ನು ವಂಶವೃಕ್ಷದಿಂದ ಕೈಬಿಡುವುದು ಕಾನೂನುಬಾಹಿರ. ಯಾವುದೇ ಒಬ್ಬ ವಾರಸುದಾರರನ್ನು ಕೈಬಿಟ್ಟು ಮಾಡಿದ ಮ್ಯುಟೇಷನ್ ರದ್ದಾಗಬಹುದು.'
              : 'Daughters are coparceners by birth. Excluding any daughter or child of a predeceased heir renders the mutation order liable to be quashed under Section 136(2) of the Land Revenue Act.'}
          </div>
        </div>
      </div>
    </div>
  );
};
