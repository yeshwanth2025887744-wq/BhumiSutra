import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  FileCheck2,
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AnomalyFlag, LandRecordDetails } from '../types';

interface AnomalyDetectorAgentProps {
  record: LandRecordDetails;
  language: 'en' | 'kn';
}

export const AnomalyDetectorAgent: React.FC<AnomalyDetectorAgentProps> = ({
  record,
  language,
}) => {
  const isKn = language === 'kn';

  const [flags, setFlags] = useState<AnomalyFlag[]>([
    {
      id: 'anom-1',
      category: 'Chronological Inconsistency',
      title: 'Mutation entry timeline relative to Khatedar demise',
      kannadaTitle: 'ಖಾತೆದಾರರ ನಿಧನ ಹಾಗೂ ಮ್ಯುಟೇಷನ್ ಕಾಲರೇಖೆಯ ವ್ಯತ್ಯಾಸ',
      severity: 'HIGH',
      neutralExplanation:
        'Inconsistency detected: RTC remarks record khatedar demise on 14/08/2023, while an agricultural mortgage charge (MR 34/2019-20) remains active with no subsequent succession mutation entry.',
      suggestedDocument:
        'Official Death Certificate (ನಮೂನೆ ೬) issued by Municipal/Panchayat Registrar + Registered Varasa Form 21 petition.',
      status: 'PENDING_REVIEW',
    },
    {
      id: 'anom-2',
      category: 'Spatial Extent Variation',
      title: 'Extent jump between historical record and current RTC',
      kannadaTitle: 'ಹಿಂದಿನ ದಾಖಲೆ ಮತ್ತು ಪ್ರಸ್ತುತ ಪಹಣಿ ನಡುವಿನ ವಿಸ್ತೀರ್ಣ ವ್ಯತ್ಯಾಸ',
      severity: 'MEDIUM',
      neutralExplanation:
        'Inconsistency detected: 1984 parent grant recorded 2 Acres 04 Guntas, whereas 2011 mutation records 2 Acres 18 Guntas without an explicit Tippani or Phodi survey entry.',
      suggestedDocument:
        'Mojini Cadastral 11E Tippani Sketch (ಮೋಜಣಿ ಟಿಪ್ಪಣಿ ನಕ್ಷೆ) and Tahsildar Phodi Durasti Order.',
      status: 'PENDING_REVIEW',
    },
    {
      id: 'anom-3',
      category: 'Identity & Initial Transliteration',
      title: 'Spelling variance between RTC extract and Aadhaar ID of heirs',
      kannadaTitle: 'ಪಹಣಿ ಹಾಗೂ ಆಧಾರ್ ಗುರುತಿನ ಚೀಟಿಯ ನಡುವಿನ ಹೆಸರಿನ ವ್ಯತ್ಯಾಸ',
      severity: 'MEDIUM',
      neutralExplanation:
        'Inconsistency detected: The recorded Khatedar is noted as "Late Sri Mallappa Gowda" on RTC, whereas heir Aadhaar records list father name as "M. N. Mallappa" without expanded patronymic.',
      suggestedDocument:
        'Notarized "One and the Same Person" (ಒಬ್ಬರೇ ವ್ಯಕ್ತಿ) Affidavit on ₹50 Stamp Paper attested by First Class Magistrate / Notary Public.',
      status: 'PENDING_REVIEW',
    },
    {
      id: 'anom-4',
      category: 'Financial Encumbrance',
      title: 'Institutional loan lien lacking registered release endorsement',
      kannadaTitle: 'ಬ್ಯಾಂಕ್ ಸಾಲ ಮರುಪಾವತಿ ಬಿಡುಗಡೆ ಪತ್ರದ (NOC) ಅನುಪಸ್ಥಿತಿ',
      severity: 'HIGH',
      neutralExplanation:
        'Inconsistency detected: Canara Bank crop loan lien under MR No. 34/2019-20 has no corresponding Form 19 / Bank Clearance discharge entry in Column 11.',
      suggestedDocument:
        'Bank No-Due Certificate (NDC) and Form 19 Discharge deed submitted to Village Accountant for MR clearance.',
      status: 'PENDING_REVIEW',
    },
    {
      id: 'anom-5',
      category: 'Cadastral Nomenclature',
      title: 'Survey number sub-division notation syntax review',
      kannadaTitle: 'ಸರ್ವೆ ನಂಬರ್ ಹಿಸ್ಸಾ ವಿಭಜನಾ ನಮೂದಿನ ಪರಿಶೀಲನೆ',
      severity: 'LOW',
      neutralExplanation:
        'Inconsistency detected: Old manual survey register notes parcel as "142/2-B" while computerized Bhoomi database records "142/2B" without hyphen.',
      suggestedDocument:
        'Village Map (ಗ್ರಾಮ ನಕ್ಷೆ) & Akarband extract verified through the Taluk Survey Supdt.',
      status: 'RESOLVED',
    },
  ]);

  const toggleFlagStatus = (id: string) => {
    setFlags((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status:
                f.status === 'PENDING_REVIEW'
                  ? 'VERIFIED'
                  : f.status === 'VERIFIED'
                  ? 'RESOLVED'
                  : 'PENDING_REVIEW',
            }
          : f
      )
    );
  };

  const getSeverityBadge = (severity: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (severity) {
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-300">
            {isKn ? 'ಗಂಭೀರ ವ್ಯತ್ಯಾಸ (High)' : 'High Priority'}
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-300">
            {isKn ? 'ಮಧ್ಯಮ ವ್ಯತ್ಯಾಸ (Medium)' : 'Medium Priority'}
          </span>
        );
      case 'LOW':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-300">
            {isKn ? 'ಸಾಮಾನ್ಯ ಪರಿಶೀಲನೆ (Low)' : 'Low Priority'}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="px-5 py-4 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-amber-100">
                {isKn ? 'ಏಜೆಂಟ್ ೬: ದಾಖಲೆಗಳ ವ್ಯತ್ಯಾಸ ಮತ್ತು ಅಸಂಗತತೆ ಶೋಧಕ' : 'Agent 6: Inconsistency & Anomaly Detector'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40 font-semibold">
                Autonomous Red-Flag Engine
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              {isKn
                ? 'ಕಂದಾಯ ದಾಖಲೆಗಳಲ್ಲಿ ಕಂಡುಬರುವ ಕಾಲರೇಖೆ, ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಸಾಲದ ನಮೂದುಗಳ ಸೂಕ್ಷ್ಮ ವ್ಯತ್ಯಾಸಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ'
                : 'Audits multi-document records for temporal gaps, extent variations, unregistered liens, and spelling mismatches using neutral evidentiary standards'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-950/80 border border-stone-700 text-amber-200">
            {flags.filter((f) => f.status === 'RESOLVED').length}/{flags.length} {isKn ? 'ಪರಿಹರಿಸಲಾಗಿದೆ' : 'Clarified'}
          </span>
        </div>
      </div>

      {/* Guardrail Callout */}
      <div className="bg-stone-50 border-b border-stone-200 px-5 py-2.5 text-xs text-stone-600 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <p>
          <strong>Evidentiary Policy:</strong> All observations use neutral inconsistency terminology. Flags indicate administrative document gaps requiring verification by an authorized revenue official or legal professional.
        </p>
      </div>

      {/* Anomaly list */}
      <div className="p-5 space-y-4">
        {flags.map((flag) => {
          const isResolved = flag.status === 'RESOLVED';
          const isVerified = flag.status === 'VERIFIED';

          return (
            <div
              key={flag.id}
              className={`p-4 rounded-xl border transition-all ${
                isResolved
                  ? 'bg-emerald-50/40 border-emerald-200 opacity-80'
                  : flag.severity === 'HIGH'
                  ? 'bg-rose-50/30 border-rose-200'
                  : 'bg-white border-stone-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                    {flag.category}
                  </span>
                  <h4 className="font-semibold text-stone-900 text-sm">
                    {isKn ? flag.kannadaTitle : flag.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  {getSeverityBadge(flag.severity)}
                  <button
                    onClick={() => toggleFlagStatus(flag.id)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                      isResolved
                        ? 'bg-emerald-600 text-white'
                        : isVerified
                        ? 'bg-blue-600 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300'
                    }`}
                  >
                    {isResolved
                      ? isKn ? '✓ ಪರಿಹರಿಸಲಾಗಿದೆ' : '✓ Resolved'
                      : isVerified
                      ? isKn ? 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ' : 'Verified'
                      : isKn ? 'ಪರಿಶೀಲಿಸಿ' : 'Mark Reviewed'}
                  </button>
                </div>
              </div>

              {/* Neutral Explanation */}
              <p className="text-xs text-stone-700 leading-relaxed font-sans mt-1">
                {flag.neutralExplanation}
              </p>

              {/* Suggested Document */}
              <div className="mt-3 p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-start gap-2 text-xs">
                <FileCheck2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900">
                    {isKn ? 'ಸೂಚಿಸಲಾದ ಪರಿಹಾರ ದಾಖಲೆ:' : 'Suggested Resolving Document:'}
                  </span>{' '}
                  <span className="text-stone-700">{flag.suggestedDocument}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
