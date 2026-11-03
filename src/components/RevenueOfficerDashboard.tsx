import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  FileText,
  User,
  ArrowUpDown,
  Sparkles,
  TrendingDown,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { OfficerQueueItem } from '../types';

interface RevenueOfficerDashboardProps {
  language: 'en' | 'kn';
}

export const RevenueOfficerDashboard: React.FC<RevenueOfficerDashboardProps> = ({
  language,
}) => {
  const isKn = language === 'kn';
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('app-01');
  const [sortDescending, setSortDescending] = useState(true);

  // 10 Sample applications in the Village Accountant / RI queue
  const [queue, setQueue] = useState<OfficerQueueItem[]>([
    {
      id: 'app-01',
      applicantName: 'Venkatesh Gowda & Heirs (Devanahalli)',
      surveyNumber: '142/2B',
      village: 'Channarayapatna, Vijayapura Hobli',
      serviceType: 'Form 21 Varasa (Inheritance Mutation)',
      daysPending: 18,
      preCheckStatus: 'INCONSISTENCY_DETECTED',
      missingItems: [
        'Form 19 Bank NDC for Canara Bank crop charge',
        'Single Person Affidavit for "Mallappa Gowda" vs "M. N. Mallappa"',
      ],
      recommendedAction:
        'Issue notice to applicant to provide Bank Clearance + Notarized Name Affidavit before J-Slip signature.',
    },
    {
      id: 'app-02',
      applicantName: 'Lakshmamma w/o Late Byregowda',
      surveyNumber: '89/1A',
      village: 'Avathi, Devanahalli Hobli',
      serviceType: 'Form 21 Varasa (Demise Mutation)',
      daysPending: 32,
      preCheckStatus: 'MISSING_DOCS',
      missingItems: [
        'Death Certificate of Khatedar missing QR verification',
        'Daughter married NOC unnotarized',
      ],
      recommendedAction:
        'Return file to Grama One kiosk for certified e-JanMa death extract upload.',
    },
    {
      id: 'app-03',
      applicantName: 'Shankarappa bin Muniyappa',
      surveyNumber: '204/3',
      village: 'Bidalur, Kasaba Hobli',
      serviceType: 'Registered Sale Deed Mutation',
      daysPending: 8,
      preCheckStatus: 'COMPLETE',
      missingItems: [],
      recommendedAction:
        'Ready for endorsement: All Kaveri 2.0 digital deeds & Aadhaar e-KYC verified 100%.',
    },
    {
      id: 'app-04',
      applicantName: 'Nanjundaiah & Brothers',
      surveyNumber: '55/4',
      village: 'Koira, Kundana Hobli',
      serviceType: 'Partition Deed (ಭಾಗ ಪತ್ರ) Mutation',
      daysPending: 24,
      preCheckStatus: 'INCONSISTENCY_DETECTED',
      missingItems: [
        'Tippani 11E survey sketch missing boundary demarcation for Hissa 4B',
      ],
      recommendedAction:
        'Forward to ADLR Taluk Office for Mojini survey verification.',
    },
    {
      id: 'app-05',
      applicantName: 'Anjanamma (Widow Khatedar)',
      surveyNumber: '112/1',
      village: 'Viswanathapura, Kasaba Hobli',
      serviceType: 'Varasa & Minor Guardian Notation',
      daysPending: 12,
      preCheckStatus: 'MISSING_DOCS',
      missingItems: [
        'Natural Guardian Affidavit for 14-year-old minor son',
      ],
      recommendedAction:
        'Collect Section 6 Natural Guardian undertaking from mother.',
    },
    {
      id: 'app-06',
      applicantName: 'Ramesh Patel (Agri Land Purchaser)',
      surveyNumber: '301/2A',
      village: 'Channahalli, Vijayapura Hobli',
      serviceType: 'Section 79A/B Land Ceiling Verification',
      daysPending: 5,
      preCheckStatus: 'COMPLETE',
      missingItems: [],
      recommendedAction:
        'All statutory declarations verified against Bhoomi database.',
    },
    {
      id: 'app-07',
      applicantName: 'Krishnappa & Co-sharers',
      surveyNumber: '17/1B',
      village: 'Arasinakunte, Kasaba Hobli',
      serviceType: 'Court Decree Execution Mutation',
      daysPending: 29,
      preCheckStatus: 'COMPLETE',
      missingItems: [],
      recommendedAction:
        'Civil Court Final Decree in OS 142/2018 authenticated via e-Courts API.',
    },
    {
      id: 'app-08',
      applicantName: 'Channamma (Elder Daughter)',
      surveyNumber: '73/5',
      village: 'Doddasannne, Devanahalli Hobli',
      serviceType: 'HSA 2005 Equal Coparcenary Inclusion',
      daysPending: 19,
      preCheckStatus: 'INCONSISTENCY_DETECTED',
      missingItems: [
        'Brothers allege oral partition from 2008 without registered documentation',
      ],
      recommendedAction:
        'Issue Form 12 inquiry hearing notice under Section 129(4) KLR Act.',
    },
    {
      id: 'app-09',
      applicantName: 'Manjunatha M. (Son)',
      surveyNumber: '14/2',
      village: 'Jalige, Kundana Hobli',
      serviceType: 'Varasa Demise Mutation',
      daysPending: 4,
      preCheckStatus: 'COMPLETE',
      missingItems: [],
      recommendedAction:
        'Ready for approval: e-Varasa family tree and ration card matched.',
    },
    {
      id: 'app-10',
      applicantName: 'Saraswathamma & 3 Others',
      surveyNumber: '88/3B',
      village: 'Uganavadi, Kasaba Hobli',
      serviceType: 'Gift Deed (ದಾನ ಪತ್ರ) Mutation',
      daysPending: 15,
      preCheckStatus: 'MISSING_DOCS',
      missingItems: [
        'Sub-Registrar copy of registered Gift Deed missing seal page',
      ],
      recommendedAction:
        'Request Kaveri 2.0 digital re-pull of registered document.',
    },
  ]);

  const filteredQueue = queue
    .filter((item) => {
      if (filterStatus === 'ALL') return true;
      return item.preCheckStatus === filterStatus;
    })
    .sort((a, b) =>
      sortDescending ? b.daysPending - a.daysPending : a.daysPending - b.daysPending
    );

  const activeCase = queue.find((q) => q.id === selectedCaseId) || queue[0];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="px-5 py-4 bg-gradient-to-r from-stone-900 via-sky-950 to-stone-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-sky-100">
                {isKn ? 'ಕಂದಾಯ ನಿರೀಕ್ಷಕ / ಗ್ರಾಮ ಲೆಕ್ಕಿಗರ ಅಧಿಕೃತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್' : 'Revenue Officer / Village Accountant Workstation'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-sky-500/20 text-sky-300 rounded border border-sky-500/40 font-semibold">
                B2G Administrative Cockpit
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              {isKn
                ? 'ಎಐ ಪೂರ್ವ-ಪರಿಶೀಲನೆ: ಕಡತಗಳ ಪರಿಶೀಲನಾ ಸಮಯವನ್ನು ೪೫ ನಿಮಿಷಗಳಿಂದ ೬ ನಿಮಿಷಕ್ಕೆ ಇಳಿಸುತ್ತದೆ'
                : 'Automated document pre-check engine triaging mutation petitions, missing paperwork, and title anomalies'}
            </p>
          </div>
        </div>

        {/* TIME SAVED METRIC COUNTER */}
        <div className="flex items-center gap-3">
          <div className="bg-stone-950/80 border border-sky-700/60 px-3.5 py-1.5 rounded-xl text-right">
            <div className="text-[10px] font-mono uppercase tracking-wider text-sky-300">
              Avg Verification Time Saved
            </div>
            <div className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>39 mins / case (86% faster)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-stone-500" />
          <span className="font-bold text-stone-700">Filter Queue:</span>
          {(['ALL', 'COMPLETE', 'MISSING_DOCS', 'INCONSISTENCY_DETECTED'] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2.5 py-1 rounded-lg font-mono font-semibold cursor-pointer transition-colors ${
                  filterStatus === status
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {status === 'ALL'
                  ? `All (${queue.length})`
                  : status === 'COMPLETE'
                  ? `Ready (${queue.filter((q) => q.preCheckStatus === 'COMPLETE').length})`
                  : status === 'MISSING_DOCS'
                  ? `Missing Docs (${queue.filter((q) => q.preCheckStatus === 'MISSING_DOCS').length})`
                  : `Inconsistencies (${queue.filter((q) => q.preCheckStatus === 'INCONSISTENCY_DETECTED').length})`}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => setSortDescending(!sortDescending)}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-100 cursor-pointer font-semibold"
        >
          <ArrowUpDown className="w-3 h-3" />
          <span>Sort by Days Pending ({sortDescending ? 'Highest' : 'Lowest'})</span>
        </button>
      </div>

      {/* Main Dual-Column: Queue on left, AI Case Pre-check Detail on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
        {/* Queue list */}
        <div className="lg:col-span-7 p-4 max-h-[560px] overflow-y-auto space-y-2.5">
          {filteredQueue.map((item) => {
            const isSelected = item.id === activeCase.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedCaseId(item.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/70 shadow-sm ring-1 ring-sky-500'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">
                        {item.applicantName}
                      </span>
                      <span className="font-mono text-xs text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                        Sy: {item.surveyNumber}
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5">{item.serviceType}</div>
                  </div>

                  {/* Status badge */}
                  <div>
                    {item.preCheckStatus === 'COMPLETE' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ✓ Ready to Approve
                      </span>
                    )}
                    {item.preCheckStatus === 'MISSING_DOCS' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        ⚠️ Missing Docs
                      </span>
                    )}
                    {item.preCheckStatus === 'INCONSISTENCY_DETECTED' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300">
                        🔍 Inconsistency
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Village: {item.village}</span>
                  <span className="font-mono text-stone-700 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {item.daysPending} days pending
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Case AI Detail Breakdown */}
        <div className="lg:col-span-5 p-5 bg-stone-50/50 flex flex-col space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <span className="text-[10px] font-mono uppercase text-sky-800 font-bold">
              AI PRE-VERIFICATION SUMMARY
            </span>
            <h4 className="font-bold text-base text-stone-900 mt-1">
              {activeCase.applicantName}
            </h4>
            <div className="text-xs text-stone-600 mt-0.5">
              Survey No: <strong className="font-mono">{activeCase.surveyNumber}</strong> • {activeCase.village}
            </div>
          </div>

          {/* Missing items breakdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              {activeCase.missingItems.length === 0
                ? 'Document Verification Status:'
                : 'Deficiencies & Missing Documents Detected:'}
            </label>

            {activeCase.missingItems.length === 0 ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All required statutory attachments are present and validated against Bhoomi.</span>
              </div>
            ) : (
              <ul className="space-y-1.5 text-xs text-stone-700">
                {activeCase.missingItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-rose-900"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recommended Revenue Officer Action */}
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl space-y-1.5 text-xs">
            <div className="font-bold text-sky-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-700" />
              <span>Recommended Revenue Officer Action:</span>
            </div>
            <p className="text-sky-900 leading-relaxed font-sans">
              {activeCase.recommendedAction}
            </p>
          </div>

          {/* Quick Officer Actions */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => alert(`Official endorsement token generated for ${activeCase.surveyNumber}`)}
              className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors text-center"
            >
              Sign J-Slip / Approve
            </button>
            <button
              onClick={() => alert(`Notice sent to applicant ${activeCase.applicantName}`)}
              className="px-3 py-2 bg-white border border-stone-300 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-100 cursor-pointer"
            >
              Issue Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
