import React from 'react';
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Coins,
  ShieldCheck,
  Building,
  Zap,
} from 'lucide-react';
import { GovtSchemeEligibility } from '../types';

interface GovtSchemeEligibilityFinderProps {
  surveyNumber: string;
  isDeceasedMutated: boolean;
  language: 'en' | 'kn';
}

export const GovtSchemeEligibilityFinder: React.FC<GovtSchemeEligibilityFinderProps> = ({
  surveyNumber,
  isDeceasedMutated,
  language,
}) => {
  const isKn = language === 'kn';

  const schemes: GovtSchemeEligibility[] = [
    {
      id: 'pacs-crop',
      schemeName: 'PACS Subsidized Crop Loan (4% Interest Subvention)',
      agency: 'Primary Agricultural Credit Co-op Societies / NABARD',
      benefit: 'Up to ₹3,00,000 at 0% to 4% effective interest for seasonal inputs',
      requiredClearDocuments: [
        'Updated Column 9 Khatedar in living heir name',
        'Certified RTC Extract with zero unverified bank charge',
        'Kaveri 2.0 15-Year Encumbrance Certificate',
      ],
      currentEligibility: isDeceasedMutated ? 'POSSIBLY_ELIGIBLE' : 'BLOCKED_BY_TITLE_GAP',
      blockingGap: isDeceasedMutated
        ? 'None. Title is ready for PACS credit memo submission.'
        : 'Blocked: Column 9 still records deceased parent; PACS cannot sanction loan to a deceased khatedar.',
      officialUrl: 'https://sahakara.karnataka.gov.in',
    },
    {
      id: 'kcc',
      schemeName: 'Kisan Credit Card (KCC) Revolving Agricultural Credit',
      agency: 'Canara Bank / State Bank of India / Regional Rural Banks',
      benefit: 'Flexible credit limit against agricultural landholding without repetitive documentation',
      requiredClearDocuments: [
        'Mutation register entry (MR order)',
        'Latest Computerized RTC with J-Slip',
        'Aadhaar e-KYC linked to survey number',
      ],
      currentEligibility: isDeceasedMutated ? 'POSSIBLY_ELIGIBLE' : 'BLOCKED_BY_TITLE_GAP',
      blockingGap: isDeceasedMutated
        ? 'Ready for loan officer appraisal.'
        : 'Blocked: Demise notation in Column 12 prevents bank charge creation.',
      officialUrl: 'https://pmkisan.gov.in',
    },
    {
      id: 'pm-kisan',
      schemeName: 'PM-KISAN Samman Nidhi Direct Income Support',
      agency: 'Ministry of Agriculture & Farmers Welfare, GoI',
      benefit: '₹6,000 / year direct cash transfer into bank account in 3 installments',
      requiredClearDocuments: [
        'Landholder name in Column 9 exactly matching bank passbook & Aadhaar',
        'e-KYC land seeding on PM-KISAN portal',
      ],
      currentEligibility: isDeceasedMutated ? 'POSSIBLY_ELIGIBLE' : 'BLOCKED_BY_TITLE_GAP',
      blockingGap: isDeceasedMutated
        ? 'Ready for portal registration.'
        : 'Blocked: Land seeding rejected due to deceased parent name mismatch with applicant Aadhaar.',
      officialUrl: 'https://pmkisan.gov.in',
    },
    {
      id: 'kusum-solar',
      schemeName: 'PM-KUSUM Solar Agri Pump Subsidy (90% Subsidy)',
      agency: 'KREDL / BESCOM Rural Electrification',
      benefit: 'Up to 90% government subsidy for 5HP to 10HP solar water pump sets',
      requiredClearDocuments: [
        'RTC showing cultivable agricultural land',
        'No-Objection Certificate from co-heirs',
        'Borewell yield certificate',
      ],
      currentEligibility: isDeceasedMutated ? 'POSSIBLY_ELIGIBLE' : 'BLOCKED_BY_TITLE_GAP',
      blockingGap: isDeceasedMutated
        ? 'Eligible to apply via Seva Sindhu.'
        : 'Blocked: All surviving heirs must sign formal NOC or complete Varasa before BESCOM power sanction.',
      officialUrl: 'https://kredlinfo.in',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="px-5 py-4 bg-gradient-to-r from-stone-900 to-emerald-950 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-emerald-100">
                {isKn ? 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅರ್ಹತಾ ಪರಿಶೀಲಕ' : 'Government Welfare & Subsidized Credit Unlocker'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40 font-semibold">
                What Clear Land Records Unlock
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              {isKn
                ? 'ವಾರಸು ಪ್ರಕ್ರಿಯೆ ಪೂರ್ಣಗೊಂಡಾಗ ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಲಭ್ಯವಾಗುವ ಕೃಷಿ ಸಾಲ, ಸಬ್ಸಿಡಿ ಮತ್ತು ನೇರ ನಗದು ಸೌಲಭ್ಯಗಳು'
                : 'Identifies institutional schemes and subsidies blocked by uncleared land titles, and what becomes unlocked'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {schemes.map((scheme) => {
          const isEligible = scheme.currentEligibility === 'POSSIBLY_ELIGIBLE';

          return (
            <div
              key={scheme.id}
              className={`p-4 rounded-xl border transition-all ${
                isEligible
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{scheme.schemeName}</h4>
                  <div className="text-xs text-stone-500">{scheme.agency}</div>
                </div>

                {/* Status */}
                <div>
                  {isEligible ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Possibly Eligible (ಅರ್ಹತೆ ಸಂಭವನೀಯ)
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Blocked by Title Gap (ಖಾತೆ ಬದಲಾವಣೆ ಬಾಕಿ)
                    </span>
                  )}
                </div>
              </div>

              {/* Benefit & Gap */}
              <div className="text-xs text-stone-700 space-y-1.5 mt-2">
                <div>
                  <strong className="text-stone-900">Financial Benefit:</strong> {scheme.benefit}
                </div>
                <div className={`p-2 rounded font-sans ${isEligible ? 'bg-emerald-100/70 text-emerald-900' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                  <strong>Status Note:</strong> {scheme.blockingGap}
                </div>
              </div>

              {/* Required Documents */}
              <div className="mt-3 pt-2 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="text-stone-600">
                  <span className="font-semibold">Required:</span> {scheme.requiredClearDocuments.join(' • ')}
                </div>
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
