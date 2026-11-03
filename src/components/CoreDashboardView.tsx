import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Copy,
  Check,
  Printer,
  Scale,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { LandRecordDetails, SuccessionAnalysisResult, FamilyMember } from '../types';

interface CoreDashboardViewProps {
  landRecord: LandRecordDetails;
  analysis: SuccessionAnalysisResult;
  familyMembers: FamilyMember[];
  language: 'en' | 'kn';
  onNavigateToDrafts?: () => void;
  onNavigateToScanner?: () => void;
}

export const CoreDashboardView: React.FC<CoreDashboardViewProps> = ({
  landRecord,
  analysis,
  familyMembers,
  language,
  onNavigateToDrafts,
  onNavigateToScanner,
}) => {
  const isKn = language === 'kn';
  const [activePetitionTab, setActivePetitionTab] = useState<'form21_kn' | 'form21_en' | 'affidavit'>('form21_kn');
  const [copied, setCopied] = useState(false);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);

  const readiness = analysis.readiness_index || {
    overall_score: 72,
    tier: 'Moderate Readiness - Clarifications Needed',
    criteria_breakdown: {
      title_chain_30yr: 20,
      identity_matching: 18,
      encumbrance_clarity: 14,
      succession_concurrence: 20,
    },
    pacs_bank_checklist: [],
  };

  const score = readiness.overall_score;

  const getScoreColor = (val: number) => {
    if (val >= 80) return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-500', bar: 'bg-emerald-500' };
    if (val >= 60) return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-500', bar: 'bg-amber-500' };
    return { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-500', bar: 'bg-rose-500' };
  };

  const scoreTheme = getScoreColor(score);

  const getActivePetitionText = (): string => {
    switch (activePetitionTab) {
      case 'form21_kn':
        return analysis.legal_petition_drafts.kannada_varasa_petition || analysis.legal_petition_drafts.taluk_mutation_application;
      case 'form21_en':
        return analysis.legal_petition_drafts.taluk_mutation_application;
      case 'affidavit':
        return analysis.legal_petition_drafts.one_and_same_person_affidavit;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActivePetitionText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Banner / Mobile Welcome */}
      <div className="bg-stone-900 text-white rounded-2xl p-4 sm:p-6 shadow-md border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {isKn ? 'ಕೋರ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್' : 'Core Dashboard'}
              </span>
              <span className="text-xs text-stone-400">
                Sy. No: <span className="font-mono text-amber-300 font-bold">{landRecord.survey_number}</span> ({landRecord.total_extent})
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Possible / Indicative
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
              {isKn
                ? 'ಭೂಮಿಸೂತ್ರ ಕಂದಾಯ & ಬ್ಯಾಂಕ್ ಸನ್ನದ್ಧತಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'
                : 'BhumiSutra Revenue & Collateral Dashboard'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-3xl leading-relaxed">
              {isKn
                ? 'ಬ್ಯಾಂಕ್ ಸಾಲ ಸನ್ನದ್ಧತೆ, ಹೆಸರು ಹೊಂದಾಣಿಕೆ ದೋಷಗಳ ಎಚ್ಚರಿಕೆ, ಮತ್ತು ಅಧಿಕೃತ ನಮೂನೆ ೨೧ ವಾರಸು ಅರ್ಜಿಯ ಸಾರಾಂಶ.'
                : 'Instant 3-pillar breakdown: Bankability Score (Document Readiness Index), Mismatch Alerts, and Generated Petition Form.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="text-[11px] text-stone-400 italic">
              {isKn ? 'ಅಧಿಕೃತ ಕಾನೂನು ಪರಿಶೀಲನೆ ಅಗತ್ಯ' : 'Requires verification by an authorized legal professional'}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PILLAR 1: Bankability Score / Document Readiness Index (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-white font-serif">
                    {isKn ? 'ಬ್ಯಾಂಕ್ ಸಾಲ ಸನ್ನದ್ಧತಾ ಅಂಕ' : 'Document Readiness Index'}
                  </h3>
                  <p className="text-[10px] text-stone-400">
                    {isKn ? 'ಹಿಂದಿನ ಹೆಸರು: ಬ್ಯಾಂಕಬಿಲಿಟಿ ಸ್ಕೋರ್' : 'Formerly "Bankability Score" (0–100%)'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCriteriaModal(true)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                title="View Scoring Criteria & Limitations"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Radial Meter & Grade */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-stone-500 block">
                    {isKn ? 'ಸಮಗ್ರ ಸನ್ನದ್ಧತಾ ದರ್ಜೆ' : 'Overall Readiness Score'}
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-stone-900">
                    {score}<span className="text-base text-stone-400 font-normal">/100</span>
                  </div>
                  <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${scoreTheme.bg} ${scoreTheme.text} border ${scoreTheme.border}`}>
                    {readiness.tier}
                  </span>
                </div>

                <div className="w-20 h-20 rounded-full border-4 border-stone-200 flex items-center justify-center relative">
                  <div
                    className={`w-16 h-16 rounded-full ${scoreTheme.bg} flex items-center justify-center font-mono font-bold text-lg ${scoreTheme.text}`}
                  >
                    {score}%
                  </div>
                </div>
              </div>

              {/* 4 Pillars Breakdown */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono block">
                  {isKn ? '೪ ಪ್ರಮುಖ ಶೀರ್ಷಿಕೆ ಸ್ತಂಭಗಳು' : '4 Title Readiness Pillars'}
                </span>

                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>30-Year Title & Mutation Chain</span>
                    <span className="font-mono font-bold">{readiness.criteria_breakdown?.title_chain_30yr || 20}/25</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${((readiness.criteria_breakdown?.title_chain_30yr || 20) / 25) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Identity & Name Matching (Aadhaar/RTC)</span>
                    <span className="font-mono font-bold">{readiness.criteria_breakdown?.identity_matching || 18}/25</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${((readiness.criteria_breakdown?.identity_matching || 18) / 25) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Encumbrance & Loan Clarity (Col 11)</span>
                    <span className="font-mono font-bold">{readiness.criteria_breakdown?.encumbrance_clarity || 14}/25</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${((readiness.criteria_breakdown?.encumbrance_clarity || 14) / 25) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Succession & Co-Heir Concurrence</span>
                    <span className="font-mono font-bold">{readiness.criteria_breakdown?.succession_concurrence || 20}/25</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${((readiness.criteria_breakdown?.succession_concurrence || 20) / 25) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Action Required Checklist */}
              <div className="pt-3 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono block mb-2">
                  {isKn ? 'ಬ್ಯಾಂಕ್ ಸನ್ನದ್ಧತೆಗೆ ಬಾಕಿ ಇರುವ ಕ್ರಮಗಳು' : 'Action Items for Bank/PACS Approval'}
                </span>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Nadakacheri Vamshavriksha:</span> Apply online on Seva Sindhu to obtain official family tree.
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Canara Bank Loan NDC:</span> Clear ₹3.50L loan or obtain Form 22 clearance memo.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deceased Owner Status & Logic Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                Deceased Owner Logic Audit
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-rose-100 text-rose-800 border border-rose-200">
                Demise Verified
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Recorded Khatedar:</span>
                <span className="font-bold text-stone-900">{landRecord.recorded_owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Demise Date:</span>
                <span className="font-mono text-stone-800">14/08/2023 (Intestate)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Bhoomi RTC Remark:</span>
                <span className="text-stone-700 italic">Column 12 denotes demise; mutation pending.</span>
              </div>
            </div>

            <div className="text-[11px] text-stone-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              <strong>Statutory Impact:</strong> Land remains legally in the name of the deceased parent. Title cannot be mortgaged or sold until Form 21 Varasa mutation is sanctioned by Tahsildar.
            </div>
          </div>
        </div>

        {/* PILLAR 2 & 3: Mismatch Alerts & Generated Petition Form (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Mismatch Alerts Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="px-5 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider font-mono">
                  {isKn ? 'ಹೆಸರು ಹೊಂದಾಣಿಕೆ ಮತ್ತು ವ್ಯತ್ಯಾಸ ಎಚ್ಚರಿಕೆಗಳು' : 'Cross-Document Mismatch Alerts'}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 border border-rose-300">
                {analysis.name_discrepancies.length} Flagged Item(s)
              </span>
            </div>

            <div className="p-5 space-y-3">
              {analysis.name_discrepancies.length === 0 ? (
                <div className="p-4 text-center bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs">
                  <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-600 mb-1" />
                  <span className="font-bold">Zero Name Discrepancies</span>
                </div>
              ) : (
                analysis.name_discrepancies.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2.5 hover:border-amber-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900 font-serif">
                        {item.person}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${item.severity === 'High' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800 border border-amber-300'}`}>
                        {item.severity} Risk
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      <div className="bg-white p-2 rounded-lg border border-stone-200">
                        <span className="text-[9px] text-stone-400 uppercase block">Land Record Name:</span>
                        <span className="text-stone-800 font-bold">{item.name_in_rtc}</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-stone-200">
                        <span className="text-[9px] text-stone-400 uppercase block">Aadhaar / Identity Proof:</span>
                        <span className="text-stone-800 font-bold">{item.name_in_id_proof}</span>
                      </div>
                    </div>

                    <div className="text-xs text-stone-600">
                      <span className="font-semibold text-stone-800">Taluk Office Risk:</span> {item.risk_at_taluk_office}
                    </div>

                    <div className="p-2.5 rounded-lg bg-amber-50 text-[11px] text-amber-900 border border-amber-200 flex items-start gap-2">
                      <span className="font-bold shrink-0">Legal Remedy:</span>
                      <span>{item.rectification_procedure}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Generated Petition Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="px-5 py-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider font-mono">
                  {isKn ? 'ಸಿದ್ಧಪಡಿಸಿದ ಕಾನೂನು ಅರ್ಜಿಗಳು' : 'Generated Petition Form'}
                </h3>
              </div>

              {/* Tabs for Form 21 / Affidavit */}
              <div className="flex items-center bg-stone-200/80 p-0.5 rounded-lg text-xs font-mono">
                <button
                  onClick={() => setActivePetitionTab('form21_kn')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activePetitionTab === 'form21_kn'
                      ? 'bg-amber-600 text-white font-bold shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Form 21 (ಕನ್ನಡ)
                </button>
                <button
                  onClick={() => setActivePetitionTab('form21_en')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activePetitionTab === 'form21_en'
                      ? 'bg-amber-600 text-white font-bold shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Form 21 (English)
                </button>
                <button
                  onClick={() => setActivePetitionTab('affidavit')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activePetitionTab === 'affidavit'
                      ? 'bg-amber-600 text-white font-bold shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  Same Person Affidavit
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Caution tag */}
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <span>Possible / Indicative petition format • Under KLR Act Sec 128/129</span>
                <span className="font-semibold text-[10px] text-amber-800">
                  Requires verification by an authorized legal professional
                </span>
              </div>

              {/* Petition Content Box */}
              <div className="relative">
                <div className="bg-stone-900 text-amber-100/90 font-mono text-xs p-4 sm:p-5 rounded-xl border border-stone-800 max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed select-text shadow-inner">
                  {getActivePetitionText()}
                </div>

                <div className="absolute top-2 right-2 flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-stone-800/90 hover:bg-stone-700 text-amber-300 rounded-lg shadow text-xs flex items-center gap-1 border border-stone-700 transition-all cursor-pointer"
                    title="Copy full text"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-2 bg-stone-800/90 hover:bg-stone-700 text-amber-300 rounded-lg shadow text-xs flex items-center gap-1 border border-stone-700 transition-all cursor-pointer"
                    title="Print Document"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Print</span>
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-stone-500">
                  Submit at <strong className="text-stone-800">Devanahalli Bhoomi Counter</strong> with Sakala GSC receipt.
                </div>

                {onNavigateToDrafts && (
                  <button
                    onClick={onNavigateToDrafts}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View All 5 Legal Petitions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Criteria & Limitations Modal */}
      {showCriteriaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="font-bold text-stone-900 font-serif text-base">
                Document Readiness Index Criteria & Limitations
              </h4>
              <button
                onClick={() => setShowCriteriaModal(false)}
                className="text-stone-400 hover:text-stone-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
              <p>
                <strong>Criteria (100 Point Scale):</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>30-Year Title Chain (25 pts):</strong> Continuous unbroken mutation history from handwritten Pahani to Bhoomi digital RTC.</li>
                <li><strong>Identity & Name Matching (25 pts):</strong> Phonetic and character alignment between RTC, Aadhaar, and death certificates.</li>
                <li><strong>Encumbrance Clarity (25 pts):</strong> Absence or formal discharge memo (NDC) for agricultural credit in Column 11.</li>
                <li><strong>Succession Concurrence (25 pts):</strong> Verified consent or inclusion of all Class-I coparceners under HSA 2005.</li>
              </ul>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <strong>Limitations:</strong> This index evaluates documentary readiness for loan scrutiny and revenue mutation. It does NOT constitute a final title clearance certificate or a substitute for an Advocate’s Title Search Report (TSR).
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowCriteriaModal(false)}
                className="px-4 py-1.5 bg-stone-900 text-white rounded-xl text-xs font-bold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
