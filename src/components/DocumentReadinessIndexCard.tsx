import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Landmark,
  FileCheck2,
  ListOrdered,
  ArrowUpRight,
} from 'lucide-react';
import { DocumentReadinessScore } from '../types';

interface DocumentReadinessIndexCardProps {
  scoreData?: DocumentReadinessScore;
  language: 'en' | 'kn';
}

export const DocumentReadinessIndexCard: React.FC<DocumentReadinessIndexCardProps> = ({
  scoreData,
  language,
}) => {
  const isKn = language === 'kn';
  const [showInfoModal, setShowInfoModal] = React.useState(false);

  // Default Devanahalli score if not passed
  const data: DocumentReadinessScore = scoreData || {
    overall_score: 72,
    tier: 'Moderate Readiness - Clarifications Needed',
    criteria_breakdown: {
      title_chain_30yr: 20,
      identity_matching: 18,
      encumbrance_clarity: 14,
      succession_concurrence: 20,
    },
    pacs_bank_checklist: [
      {
        item: 'Current Year Certified RTC (Bhoomi Digital Signed with Barcode)',
        category: 'Available',
        priority: 'HIGH',
        action: 'Extracted from Bhoomi server with valid Barcode.',
      },
      {
        item: 'Genealogical Family Tree Certificate (Vamshavriksha from Nadakacheri)',
        category: 'Missing',
        priority: 'HIGH',
        action: 'Apply on Seva Sindhu / Nadakacheri portal with VAO field mahazar report.',
      },
      {
        item: 'Bank No Due Certificate (NDC) for Canara Bank Loan ₹3.50L',
        category: 'Missing',
        priority: 'HIGH',
        action: 'Approach Canara Bank Devanahalli branch to close loan or get Form 22 clearance memo.',
      },
      {
        item: 'One and the Same Person Notarized Affidavit for "M. N. Mallappa"',
        category: 'Requires Official Confirmation',
        priority: 'MEDIUM',
        action: 'Execute on ₹50 e-Stamp paper to resolve Aadhaar vs RTC initial difference.',
      },
      {
        item: 'Co-Heir Digital Consent / Hakku Bidu Patra from Latha Ramesh (Mysuru)',
        category: 'Requires Official Confirmation',
        priority: 'HIGH',
        action: 'Remote consensus link dispatched for digital e-NOC before Revenue Inspector hearing.',
      },
    ],
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500 border-emerald-500 bg-emerald-50';
    if (score >= 60) return 'text-amber-500 border-amber-500 bg-amber-50';
    return 'text-rose-500 border-rose-500 bg-rose-50';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              AUDIT PILLAR 3
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ದಾಖಲೆಗಳ ಸನ್ನದ್ಧತೆ ಸೂಚ್ಯಂಕ' : 'Document Readiness Index'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Landmark className="w-5 h-5 text-emerald-400" />
            {isKn ? 'ದಾಖಲೆ ಸನ್ನದ್ಧತಾ ಸೂಚ್ಯಂಕ (Document Readiness Index 0–100%)' : 'Document Readiness Index (0–100%)'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ಪ್ರಾಥಮಿಕ ಕೃಷಿ ಪತ್ತಿನ ಸಹಕಾರ ಸಂಘ (PACS) ಮತ್ತು ಬ್ಯಾಂಕುಗಳಿಗೆ ಅಗತ್ಯವಿರುವ ಶೀರ್ಷಿಕೆ ದಾಖಲೆಗಳ ಸನ್ನದ್ಧತಾ ಅಂಕ'
              : 'Audits title chain, identity match, and encumbrances for PACS crop credit and institutional lending'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfoModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg text-xs font-semibold border border-stone-700 cursor-pointer transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{isKn ? 'ಮಾನದಂಡಗಳು & ಮಿತಿಗಳು' : 'Criteria & Limitations'}</span>
          </button>

          <span className="text-[11px] font-mono text-stone-300 bg-stone-800 px-3 py-1 rounded-lg border border-stone-700">
            {data.tier}
          </span>
        </div>
      </div>

      {/* Info Popover Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl p-5 space-y-4 text-xs font-sans text-stone-800">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="font-bold text-sm text-stone-900 font-serif flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-700" />
                <span>Document Readiness Index — Criteria & Limitations</span>
              </h4>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-stone-400 hover:text-stone-900 font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <strong className="text-stone-900 block mb-1">Scoring Criteria Breakdown (100 Points Total):</strong>
                <ul className="space-y-1 list-disc list-inside text-stone-600">
                  <li><strong>Title Chain (25 pts):</strong> Unbroken mutation entries for preceding 30 years.</li>
                  <li><strong>Identity Matching (25 pts):</strong> Consistency between Aadhaar, ration card, and RTC.</li>
                  <li><strong>Encumbrance Clarity (25 pts):</strong> No unreleased bank liens or court injunctions in Column 11.</li>
                  <li><strong>Heir Concurrence (25 pts):</strong> Digital or written consent from all Class I legal heirs.</li>
                </ul>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-950">
                <strong className="block mb-0.5">Explicit Legal & Banking Limitations:</strong>
                The Document Readiness Index is an administrative scoring tool indicating document completeness for PACS intake. It does NOT constitute a marketable title guarantee, credit pre-approval, or final bank legal opinion. Formal loan sanction is subject to independent title verification by the lending institution's empanelled advocate.
              </div>
            </div>

            <div className="text-right pt-2 border-t border-stone-200">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-1.5 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Score Card + 4 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Big Score Gauge (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl border border-stone-200 bg-stone-50/70 flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-32 rounded-full border-8 border-amber-500/20 flex flex-col items-center justify-center bg-white shadow-inner">
              <span className="text-4xl font-extrabold font-mono text-stone-900">
                {data.overall_score}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400">
                out of 100
              </span>
            </div>

            <h4 className="font-bold text-stone-900 text-sm mt-3 font-serif">
              {isKn ? 'ದಾಖಲೆ ಸನ್ನದ್ಧತೆ: ಮಧ್ಯಮ (೭೨%)' : 'Readiness: 72% Moderate'}
            </h4>
            <p className="text-[11px] text-stone-500 mt-1 max-w-xs leading-relaxed">
              {isKn
                ? 'ಕಾಲಂ ೧೧ ಸಾಲದ ನಿರಾಕ್ಷೇಪಣಾ ಪತ್ರ (NDC) ಮತ್ತು ವಂಶವೃಕ್ಷ ಸಲ್ಲಿಸಿದ ನಂತರ ಈ ಅಂಕವು ೯೫% ಕ್ಕೆ ಏರುತ್ತದೆ.'
                : 'Upload Canara Bank NDC and Nadakacheri Vamshavriksha to elevate score to 95%.'}
            </p>
          </div>

          {/* 4 Pillars Progress Bars (8 cols) */}
          <div className="lg:col-span-8 space-y-3.5">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-stone-700">
                  {isKn ? '೧. ೩೦ ವರ್ಷಗಳ ಹಕ್ಕು ಸರಪಳಿ (Title Chain 1998-2024)' : '1. 30-Year Title Chain & Mutation Records'}
                </span>
                <span className="font-mono text-stone-800">{data.criteria_breakdown.title_chain_30yr} / 25</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2.5 rounded-full"
                  style={{ width: `${(data.criteria_breakdown.title_chain_30yr / 25) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-stone-700">
                  {isKn ? '೨. ಆಧಾರ್ ಮತ್ತು ಪಹಣಿ ಹೆಸರುಗಳ ಹೊಂದಾಣಿಕೆ (Identity Matching)' : '2. Identity & Aadhaar Proof Matching'}
                </span>
                <span className="font-mono text-stone-800">{data.criteria_breakdown.identity_matching} / 25</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-600 h-2.5 rounded-full"
                  style={{ width: `${(data.criteria_breakdown.identity_matching / 25) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-stone-700">
                  {isKn ? '೩. ಕಾಲಂ ೧೧ ಋಣಭಾರ ಸ್ಪಷ್ಟತೆ (Encumbrance Status)' : '3. Encumbrance & Bank Lien Status (Column 11)'}
                </span>
                <span className="font-mono text-stone-800">{data.criteria_breakdown.encumbrance_clarity} / 25</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-600 h-2.5 rounded-full"
                  style={{ width: `${(data.criteria_breakdown.encumbrance_clarity / 25) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-stone-700">
                  {isKn ? '೪. ಎಲ್ಲಾ ವಾರಸುದಾರರ ಸಹಮತ (Co-Heir Concurrence)' : '4. Co-Heir Concurrence & Non-Dispute Pedigree'}
                </span>
                <span className="font-mono text-stone-800">{data.criteria_breakdown.succession_concurrence} / 25</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${(data.criteria_breakdown.succession_concurrence / 25) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority-Ordered PACS / Bank Checklist */}
        <div className="rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-stone-800">
                {isKn ? 'ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ & PACS ಆದ್ಯತಾ ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ' : 'Priority Checklist for Bank Manager & PACS Society'}
              </h4>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              {data.pacs_bank_checklist.length} Checkpoints
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {data.pacs_bank_checklist.map((item, idx) => {
              const isAvail = item.category === 'Available';
              const isMiss = item.category === 'Missing';

              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 hover:bg-stone-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isAvail ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isMiss ? (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{item.item}</span>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            item.priority === 'HIGH'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{item.action}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md self-start sm:self-center shrink-0 ${
                      isAvail
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isMiss
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer / Regulatory Note */}
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-500 leading-relaxed">
          <strong>{isKn ? 'ಗಮನಿಸಿ:' : 'Important Transparency Standard:'}</strong>{' '}
          {isKn
            ? 'ಈ ಸೂಚ್ಯಂಕವು ಕೇವಲ ಕಂದಾಯ ದಾಖಲೆಗಳ ಸನ್ನದ್ಧತೆಯನ್ನು (Document Readiness) ಸೂಚಿಸುತ್ತದೆ; ಇದು ನ್ಯಾಯಾಲಯದ ಅಂತಿಮ ಮಾಲೀಕತ್ವದ ಆದೇಶವಲ್ಲ.'
            : 'This score represents document and procedural readiness for bank verification and mutation filing. It does not replace a civil court title decree or formal legal search report.'}
        </div>
      </div>
    </div>
  );
};
