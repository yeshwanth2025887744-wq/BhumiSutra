import React from 'react';
import {
  Calendar,
  Clock,
  GitCompare,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { LandRecordDetails } from '../types';

interface HistoricalTimelineCardProps {
  record: LandRecordDetails;
  language: 'en' | 'kn';
}

export const HistoricalTimelineCard: React.FC<HistoricalTimelineCardProps> = ({
  record,
  language,
}) => {
  const isKn = language === 'kn';
  const hist = record.historical_comparison;

  const timelineEvents = [
    {
      year: '1998',
      title: isKn ? 'ಮೂಲ ಹಸ್ತಪ್ರತಿ ಪಹಣಿ (ನಂಜಪ್ಪ ಗೌಡ)' : 'Original Handwritten Pahani (Nanjappa Gowda)',
      desc: isKn ? 'ಅಜ್ಜ ನಂಜಪ್ಪ ಗೌಡರ ಹೆಸರಿನಲ್ಲಿ ೨ ಎಕರೆ ೨೦ ಗುಂಟೆ ಜಂಟಿ ಖಾತೆ ದಾಖಲು.' : 'Grandfather Nanjappa Gowda held 2-20-00 undivided ancestral land.',
      badge: isKn ? 'ಮೂಲ ಪಹಣಿ' : 'Genesis Title',
      type: 'origin',
    },
    {
      year: '2008',
      title: isKn ? 'ಕುಟುಂಬ ವಿಭಾಗ & ಮ್ಯುಟೇಷನ್ (MR 12/2008)' : 'Family Partition Mutation (MR No. 12/2008-09)',
      desc: isKn ? 'ಮಲ್ಲಪ್ಪ ಗೌಡ ಮತ್ತು ಸಹೋದರ ನಾರಾಯಣ ಗೌಡ ನಡುವೆ ವಿಭಾಗ; ಹೆಸರಿನ ಇನಿಷಿಯಲ್ ಲೋಪ.' : 'Partition between Mallappa Gowda & Narayana Gowda; initial "N" omitted.',
      badge: isKn ? 'ವಿಭಾಗ ಪತ್ರ' : 'Partition Entry',
      type: 'mutation',
    },
    {
      year: '2019',
      title: isKn ? 'ಕೆನರಾ ಬ್ಯಾಂಕ್ ಕೃಷಿ ಸಾಲ (ಕಾಲಂ ೧೧)' : 'Canara Bank Crop Loan Lien (Column 11)',
      desc: isKn ? 'ದೇವನಹಳ್ಳಿ ಕೆನರಾ ಬ್ಯಾಂಕ್ ಶಾಖೆಯಿಂದ ₹೩.೫೦ ಲಕ್ಷ ಕೃಷಿ ಬೆಳೆ ಸಾಲ ನಮೂದು.' : '₹3,50,000 crop loan mortgage lien registered in RTC Column 11.',
      badge: isKn ? 'ಋಣಭಾರ' : 'Lien Marked',
      type: 'encumbrance',
    },
    {
      year: '2023',
      title: isKn ? 'ಖಾತೆದಾರ ಮಲ್ಲಪ್ಪ ಗೌಡರ ನಿಧನ' : 'Demise of Recorded Khatedar Mallappa Gowda',
      desc: isKn ? 'ದಿನಾಂಕ 14/08/2023 ರಂದು ನಿಧನ; ಭೂಮಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ವಾರಸು ಖಾತೆ ಬಾಕಿ.' : 'Demise on 14/08/2023; RTC remains frozen under deceased name.',
      badge: isKn ? 'ವಾರಸು ಬಾಕಿ' : 'Succession Due',
      type: 'demise',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              FEATURE 1 & 2
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆ ಮತ್ತು ವ್ಯತ್ಯಾಸ ಹೀಟ್‌ಮ್ಯಾಪ್' : 'Chronological Timeline & Mismatch Heatmap'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            {isKn ? 'ಜಮೀನಿನ ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆ (೧೯೯೮ - ೨೦೨೬)' : 'Land Record Evolution Timeline (1998 – 2026)'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ಹಳೆಯ ದಾಖಲೆಗಳಿಂದ ಇಂದಿನ ಪಹಣಿಯವರೆಗಿನ ಬದಲಾವಣೆಗಳು ಮತ್ತು ವ್ಯತ್ಯಾಸಗಳ ತುಲನಾತ್ಮಕ ಪರಿಶೀಲನೆ'
              : 'Chronological chain of title from ancestral handwritten extract to current digital Bhoomi RTC'}
          </p>
        </div>

        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700/60 self-start sm:self-center">
          {isKn ? '೩೦ ವರ್ಷಗಳ ಇತಿಹಾಸ ಲಭ್ಯ' : '30-Yr Chain Audited'}
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Timeline Horizontal / Stepped Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {timelineEvents.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold font-mono text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md border border-amber-200">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm font-serif">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center gap-1.5 text-[10px] font-mono text-stone-400">
                <span>Phase {idx + 1} of 4</span>
                {idx < 3 && <span className="text-amber-600 font-bold">→</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Smart Mismatch Heatmap Table */}
        {hist && (
          <div className="rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-rose-600" />
                <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-stone-800">
                  {isKn ? 'ದಾಖಲೆಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸ ಹೀಟ್‌ಮ್ಯಾಪ್' : 'Cross-Document Mismatch Heatmap'}
                </h4>
              </div>
              <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {isKn ? '೨ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿರುವ ಅಂಶಗಳು' : '2 Review Items Flagged'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-600 uppercase font-mono text-[10px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="p-3">{isKn ? 'ಕಂದಾಯ ವಿವರ' : 'Field Name'}</th>
                    <th className="p-3">{isKn ? 'ಹಳೆಯ ದಾಖಲೆ (೧೯೯೮)' : 'Historical Record (1998)'}</th>
                    <th className="p-3">{isKn ? 'ಇಂದಿನ ಪಹಣಿ (೨೦೨೪)' : 'Current RTC (2024)'}</th>
                    <th className="p-3 text-center">{isKn ? 'ಸ್ಥಿತಿ' : 'Status'}</th>
                    <th className="p-3">{isKn ? 'ಕಂದಾಯ ಪರಿಣಾಮ & ಪರಿಹಾರ' : 'Taluk Office Risk & Remedy'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {hist.mismatches.map((m, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                      <td className="p-3 font-semibold text-stone-900 font-mono">
                        {m.field}
                      </td>
                      <td className="p-3 font-mono text-stone-600 bg-stone-50/50">
                        {m.historical_val}
                      </td>
                      <td className="p-3 font-mono font-bold text-stone-800">
                        {m.current_val}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                            m.status === 'MATCH'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : m.status === 'REVIEW'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="p-3 text-xs text-stone-700 leading-relaxed">
                        {m.risk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-amber-50/60 border-t border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>{isKn ? 'ಕಂದಾಯ ಎಚ್ಚರಿಕೆ:' : 'Revenue Pre-emptive Check:'}</strong>{' '}
                {isKn
                  ? 'ತಾಲೂಕು ಕಚೇರಿಯಲ್ಲಿ ಅರ್ಜಿ ತಿರಸ್ಕೃತವಾಗದಂತೆ "ಒಬ್ಬರೇ ವ್ಯಕ್ತಿ ಪ್ರಮಾಣಪತ್ರ" (One and the Same Person Affidavit) ವನ್ನು ಕಡ್ಡಾಯವಾಗಿ ಲಗತ್ತಿಸಲಾಗುತ್ತದೆ.'
                  : 'By resolving the spelling/initial variance via a Notarized Affidavit before filing, automatic administrative rejection by the Village Accountant is prevented.'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
