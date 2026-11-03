import React, { useState } from 'react';
import {
  Printer,
  Download,
  Landmark,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Calendar,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { LandRecordDetails, SuccessionAnalysisResult } from '../types';

interface BankDossierExporterProps {
  record: LandRecordDetails;
  analysis: SuccessionAnalysisResult | null;
  language: 'en' | 'kn';
}

export const BankDossierExporter: React.FC<BankDossierExporterProps> = ({
  record,
  analysis,
  language,
}) => {
  const [dossierLang, setDossierLang] = useState<'en' | 'kn'>(language);
  const isKn = dossierLang === 'kn';

  const readinessScore = analysis?.readiness_index?.overall_score ?? 84;
  const readinessTier = analysis?.readiness_index?.tier ?? 'Moderate Readiness - Clarifications Needed';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Control bar */}
      <div className="px-5 py-4 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-amber-100">
                {isKn ? 'ಬ್ಯಾಂಕ್ & ಪ್ಯಾಕ್ಸ್ (PACS) ಸಾಲದ ದಸ್ತಾವೇಜು ವರದಿ' : 'Bank & PACS Collateral Dossier Exporter'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40 font-semibold">
                A4 Print-Ready
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              {isKn
                ? 'ಪ್ರಾಥಮಿಕ ಕೃಷಿ ಪತ್ತಿನ ಸಹಕಾರ ಸಂಘಗಳಿಗೆ (PACS) ಹಾಗೂ ಬ್ಯಾಂಕುಗಳಿಗೆ ಅಧಿಕೃತ ಸಲ್ಲಿಕೆಗಾಗಿ ಮುದ್ರಣ ವರದಿ'
                : 'Comprehensive verification package formatted for Primary Agricultural Credit Societies and commercial lenders'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switch */}
          <div className="flex items-center bg-stone-950/80 rounded-lg border border-stone-700 p-0.5 text-xs font-mono">
            <button
              onClick={() => setDossierLang('en')}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                dossierLang === 'en' ? 'bg-amber-600 text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setDossierLang('kn')}
              className={`px-2.5 py-1 rounded cursor-pointer ${
                dossierLang === 'kn' ? 'bg-amber-600 text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{isKn ? 'A4 ಪ್ರಿಂಟ್ / PDF ಡೌನ್‌ಲೋಡ್' : 'Print / Save A4 PDF'}</span>
          </button>
        </div>
      </div>

      {/* A4 REPORT CONTAINER (Optimized for Screen & Print) */}
      <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8 bg-white print:p-0 print:max-w-none text-stone-900 font-serif">
        {/* SECTION 1: COVER SUMMARY */}
        <div className="border-b-2 border-stone-900 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-amber-900 font-bold">
                BHUMISUTRA LAND RECORD INTELLIGENCE & TITLE AUDIT REPORT
              </div>
              <h1 className="text-2xl font-bold font-serif text-stone-900 mt-1">
                {isKn
                  ? 'ಕೃಷಿ ಭೂಮಿ ಸಾಲ ಸನ್ನದ್ಧತೆ ಮತ್ತು ಶೀರ್ಷಿಕೆ ತಪಾಸಣಾ ವರದಿ'
                  : 'Agricultural Land Collateral Readiness & Title Audit Dossier'}
              </h1>
              <p className="text-xs text-stone-600 font-sans mt-1">
                Generated for submission to Primary Agricultural Credit Society (PACS) / Lead Bank Manager
              </p>
            </div>

            {/* QR Code Placeholder with Case ID */}
            <div className="p-2 border border-stone-300 rounded-lg text-center bg-stone-50 shrink-0">
              <div className="w-16 h-16 bg-stone-900 text-white flex items-center justify-center rounded mx-auto">
                <QrCode className="w-10 h-10 text-white" />
              </div>
              <span className="text-[9px] font-mono text-stone-600 block mt-1 font-bold">
                BS-2026-BLR
              </span>
            </div>
          </div>

          {/* Quick Meta table */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans bg-stone-50 p-3 rounded-lg border border-stone-200">
            <div>
              <span className="text-stone-500 block text-[10px] uppercase">Survey / Hissa:</span>
              <strong className="font-mono text-stone-900">{record.survey_number}</strong>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px] uppercase">Total Extent:</span>
              <strong className="font-mono text-stone-900">{record.total_extent}</strong>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px] uppercase">Village & Taluk:</span>
              <strong className="text-stone-900">{record.village_name || 'Devanahalli Taluk'}</strong>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px] uppercase">Document Readiness:</span>
              <strong className="font-mono text-amber-800">{readinessScore}% ({readinessTier})</strong>
            </div>
          </div>
        </div>

        {/* SECTION 2: EXTRACTED DATA WITH EVIDENCE CITATIONS */}
        <div className="space-y-3">
          <h2 className="text-sm uppercase tracking-wider font-bold text-stone-900 font-sans border-b border-stone-300 pb-1 flex items-center justify-between">
            <span>1. Certified Record Parameters & Evidentiary Citations</span>
            <span className="text-[10px] text-stone-500 font-normal">Source: Bhoomi Karnataka Online RTC</span>
          </h2>

          <table className="w-full text-xs font-sans border-collapse border border-stone-300">
            <thead>
              <tr className="bg-stone-100 text-stone-700 text-left">
                <th className="p-2 border border-stone-300">Parameter</th>
                <th className="p-2 border border-stone-300">Extracted Value</th>
                <th className="p-2 border border-stone-300">Source Document & Column</th>
                <th className="p-2 border border-stone-300">Confidence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-stone-300 font-medium">Recorded Khatedar</td>
                <td className="p-2 border border-stone-300 font-mono font-bold">{record.recorded_owner}</td>
                <td className="p-2 border border-stone-300">RTC Form 16, Column 9</td>
                <td className="p-2 border border-stone-300 text-emerald-700 font-mono">97% (High)</td>
              </tr>
              <tr className="bg-stone-50/50">
                <td className="p-2 border border-stone-300 font-medium">Deceased Status</td>
                <td className="p-2 border border-stone-300 text-rose-800 font-semibold">
                  Deceased (Demise: 14/08/2023)
                </td>
                <td className="p-2 border border-stone-300">Column 9 prefix & Col 12 remarks</td>
                <td className="p-2 border border-stone-300 text-emerald-700 font-mono">92% (High)</td>
              </tr>
              <tr>
                <td className="p-2 border border-stone-300 font-medium">Total Land Extent</td>
                <td className="p-2 border border-stone-300 font-mono">{record.total_extent}</td>
                <td className="p-2 border border-stone-300">RTC Form 16, Column 3</td>
                <td className="p-2 border border-stone-300 text-emerald-700 font-mono">98% (High)</td>
              </tr>
              <tr className="bg-stone-50/50">
                <td className="p-2 border border-stone-300 font-medium">Existing Encumbrance</td>
                <td className="p-2 border border-stone-300">{record.encumbrances_or_loans}</td>
                <td className="p-2 border border-stone-300">Column 11 (Other Rights)</td>
                <td className="p-2 border border-stone-300 text-amber-700 font-mono">88% (Med)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SECTION 3: 30-YEAR TITLE EVOLUTION TIMELINE */}
        <div className="space-y-3">
          <h2 className="text-sm uppercase tracking-wider font-bold text-stone-900 font-sans border-b border-stone-300 pb-1">
            2. Title Flow & Historical Mutation Chain (30 Years)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-sans">
            <div className="p-2.5 bg-stone-50 border border-stone-300 rounded">
              <span className="text-[10px] font-mono text-stone-500 font-bold block">1984 (Grant)</span>
              <strong className="block text-stone-900 mt-1">Nanjappa Gowda</strong>
              <span className="text-stone-600 text-[11px] block mt-0.5">Extent: 2A 04G</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-300 rounded">
              <span className="text-[10px] font-mono text-stone-500 font-bold block">2005 (HSA Law)</span>
              <strong className="block text-stone-900 mt-1">Coparcenary Right</strong>
              <span className="text-stone-600 text-[11px] block mt-0.5">Daughters equal shares</span>
            </div>
            <div className="p-2.5 bg-stone-50 border border-stone-300 rounded">
              <span className="text-[10px] font-mono text-stone-500 font-bold block">2011 (MR 12/2011)</span>
              <strong className="block text-stone-900 mt-1">Mallappa Gowda</strong>
              <span className="text-stone-600 text-[11px] block mt-0.5">Khata mutated post demise</span>
            </div>
            <div className="p-2.5 bg-amber-50 border border-amber-300 rounded">
              <span className="text-[10px] font-mono text-amber-800 font-bold block">2024 (Present)</span>
              <strong className="block text-amber-950 mt-1">Varasa Pending</strong>
              <span className="text-amber-800 text-[11px] block mt-0.5">Form 21 filed for 4 heirs</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: DOCUMENT READINESS INDEX WITH CRITERIA */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-stone-300 pb-1">
            <h2 className="text-sm uppercase tracking-wider font-bold text-stone-900 font-sans">
              3. Document Readiness Index & Banking Audit Criteria
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded border border-amber-300">
              Score: {readinessScore} / 100
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans text-center">
            <div className="p-2 bg-stone-50 border border-stone-200 rounded">
              <span className="text-[10px] text-stone-500 block">Title Continuity</span>
              <strong className="font-mono text-stone-900 text-sm">22 / 25</strong>
            </div>
            <div className="p-2 bg-stone-50 border border-stone-200 rounded">
              <span className="text-[10px] text-stone-500 block">Identity Matching</span>
              <strong className="font-mono text-stone-900 text-sm">20 / 25</strong>
            </div>
            <div className="p-2 bg-stone-50 border border-stone-200 rounded">
              <span className="text-[10px] text-stone-500 block">Encumbrance Clarity</span>
              <strong className="font-mono text-stone-900 text-sm">18 / 25</strong>
            </div>
            <div className="p-2 bg-stone-50 border border-stone-200 rounded">
              <span className="text-[10px] text-stone-500 block">Heir Concurrence</span>
              <strong className="font-mono text-stone-900 text-sm">24 / 25</strong>
            </div>
          </div>

          <p className="text-[11px] text-stone-600 font-sans leading-relaxed">
            <strong>Index Limitations:</strong> The Document Readiness Index evaluates the presence and textual consistency of prima facie revenue records against PACS credit guidelines. It does not certify marketable title, which remains subject to final Sub-Registrar 30-year search and formal bank legal opinion.
          </p>
        </div>

        {/* SECTION 5: PACS SECRETARY MISSING DOCUMENT CHECKLIST */}
        <div className="space-y-3">
          <h2 className="text-sm uppercase tracking-wider font-bold text-stone-900 font-sans border-b border-stone-300 pb-1">
            4. PACS Loan Underwriter Action Checklist
          </h2>

          <div className="space-y-1.5 text-xs font-sans">
            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Certified Computerized RTC Extract (Devanahalli Bhoomi Kiosk)</span>
              </span>
              <span className="font-mono font-bold text-emerald-800">Verified</span>
            </div>

            <div className="p-2 bg-amber-50 border border-amber-200 rounded flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>15-Year Form 15 Encumbrance Certificate (EC) from Kaveri 2.0</span>
              </span>
              <span className="font-mono font-bold text-amber-800">To be downloaded</span>
            </div>

            <div className="p-2 bg-amber-50 border border-amber-200 rounded flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Canara Bank No-Due Certificate (NDC) for prior crop charge</span>
              </span>
              <span className="font-mono font-bold text-amber-800">Pending Bank Release</span>
            </div>

            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>One-and-the-Same Person Affidavit for "Mallappa Gowda" vs "M. N. Mallappa"</span>
              </span>
              <span className="font-mono font-bold text-emerald-800">Drafted</span>
            </div>
          </div>
        </div>

        {/* SECTION 6: DISCLAIMER AND SIGNATURE BLOCK */}
        <div className="pt-6 border-t-2 border-stone-800 text-[11px] font-sans text-stone-600 space-y-4">
          <div className="p-3 bg-stone-100 rounded border border-stone-300 text-stone-700 leading-relaxed">
            <strong>Mandatory Legal & Statutory Disclaimer:</strong> This document is an informational title readiness summary generated by BhumiSutra for administrative coordination and PACS credit intake preparation. It does not constitute a title guarantee, final court decree, or legal certificate of succession. Final title vesting is governed exclusively by the Karnataka Land Revenue Act, 1964 and competent civil judicial authorities. Sample data only.
          </div>

          <div className="grid grid-cols-2 pt-6">
            <div>
              <span className="block font-bold text-stone-900">PREPARED BY:</span>
              <span className="text-stone-600">BhumiSutra Agentic Intelligence</span>
              <span className="block text-[10px] text-stone-500 font-mono mt-0.5">
                Ref ID: BS-2026-BLR-001 • SYNTHETIC SAMPLE DATA
              </span>
            </div>
            <div className="text-right">
              <span className="block font-bold text-stone-900">VERIFYING OFFICER / PACS MANAGER:</span>
              <div className="mt-8 border-b border-stone-400 w-48 ml-auto"></div>
              <span className="text-[10px] text-stone-500 block mt-1">Signature & Society Seal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
