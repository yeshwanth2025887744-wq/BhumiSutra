import React, { useState } from 'react';
import {
  GitMerge,
  CheckCircle2,
  AlertCircle,
  FileText,
  Copy,
  Check,
  Languages,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { NameMatchGroup } from '../types';

interface NameMatchingEngineProps {
  language: 'en' | 'kn';
}

export const NameMatchingEngine: React.FC<NameMatchingEngineProps> = ({ language }) => {
  const isKn = language === 'kn';
  const [copiedAffidavit, setCopiedAffidavit] = useState(false);

  const [matchGroups, setMatchGroups] = useState<NameMatchGroup[]>([
    {
      id: 'grp-01',
      primaryCanonical: 'Late Sri Mallappa Gowda',
      kannadaCanonical: 'ಲೇಟ್ ಶ್ರೀ ಮಲ್ಲಪ್ಪ ಗೌಡ ಬಿನ್ ನಂಜಪ್ಪ ಗೌಡ',
      variants: [
        {
          name: 'Late Sri Mallappa Gowda',
          sourceDoc: 'RTC Pahani Extract 2024 (Column 9)',
          similarityScore: 1.0,
        },
        {
          name: 'M. N. Mallappa',
          sourceDoc: 'Son Aadhaar Card (Father Name)',
          similarityScore: 0.88,
        },
        {
          name: 'ಶ್ರೀ ಮಲ್ಲಪ್ಪ ಗೌಡ',
          sourceDoc: 'Canara Bank Crop Loan Receipt 2019',
          similarityScore: 0.94,
        },
        {
          name: 'Mallappa Nanjappa Gowda',
          sourceDoc: 'Parent 1984 Land Grant Sannad',
          similarityScore: 0.91,
        },
      ],
      reasonForGrouping:
        'Phonetic transliteration match with Kannada script, honorific expansion ("Late Sri"), and patronymic initial reduction ("Nanjappa" reduced to "N.").',
      status: 'CONFIRMED',
    },
    {
      id: 'grp-02',
      primaryCanonical: 'Gowramma M.',
      kannadaCanonical: 'ಗೌರಮ್ಮ (ಪತ್ನಿ)',
      variants: [
        {
          name: 'Gowramma',
          sourceDoc: 'Ration Card (Head of Household)',
          similarityScore: 0.92,
        },
        {
          name: 'Gowramma Mallappa',
          sourceDoc: 'Voter ID Card Elector Roll 2023',
          similarityScore: 0.96,
        },
      ],
      reasonForGrouping:
        'Spouse surname adoption post-marriage and dropped husband initial.',
      status: 'CONFIRMED',
    },
    {
      id: 'grp-03',
      primaryCanonical: 'Latha Devi',
      kannadaCanonical: 'ಲತಾ ದೇವಿ (ಮಗಳು)',
      variants: [
        {
          name: 'Latha Devi',
          sourceDoc: 'Family Tree Certificate (Nadakacheri)',
          similarityScore: 0.95,
        },
        {
          name: 'Latha Ramesh',
          sourceDoc: 'Aadhaar Card (Post-Marriage Name)',
          similarityScore: 0.74,
        },
      ],
      reasonForGrouping:
        'Post-marriage marital surname adoption ("Ramesh" husband name vs "Devi" maiden patronymic).',
      status: 'LIKELY_SAME_PERSON_CONFIRM',
    },
  ]);

  const toggleGroupConfirmation = (id: string) => {
    setMatchGroups((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              status:
                g.status === 'CONFIRMED'
                  ? 'LIKELY_SAME_PERSON_CONFIRM'
                  : 'CONFIRMED',
            }
          : g
      )
    );
  };

  const affidavitSample = `BEFORE THE NOTARY PUBLIC / EXECUTIVE MAGISTRATE AT DEVANAHALLI\n\nAFFIDAVIT OF "ONE AND THE SAME PERSON" (ಒಬ್ಬರೇ ವ್ಯಕ್ತಿ ಪ್ರಮಾಣ ಪತ್ರ)\n(Under Section 3 of the Indian Oaths Act, 1969)\n\nI, Venkatesh Gowda, aged 39 years, residing at Channarayapatna, Vijayapura Hobli, do hereby solemnly affirm and state on oath:\n\n1. That my late father was the recorded khatedar of agricultural land in Survey No. 142/2B.\n2. That in the RTC (Pahani) Extract, his name is recorded as "Late Sri Mallappa Gowda".\n3. That in my Aadhaar card and identity documents, his name is recorded as "M. N. Mallappa".\n4. That in the 1984 Land Grant Sannad, his name is entered as "Mallappa Nanjappa Gowda".\n5. That "Late Sri Mallappa Gowda", "M. N. Mallappa", and "Mallappa Nanjappa Gowda" are one and the same person, representing my deceased father and nobody else.\n\nDEPONENT SIGNATURE\nSworn and signed before me on this day at Devanahalli.`;

  const handleCopyAffidavit = () => {
    navigator.clipboard.writeText(affidavitSample);
    setCopiedAffidavit(true);
    setTimeout(() => setCopiedAffidavit(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="px-5 py-4 bg-gradient-to-r from-stone-900 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-indigo-100">
                {isKn ? 'ಕನ್ನಡ-ಇಂಗ್ಲಿಷ್ ಹೆಸರು ಹೊಂದಾಣಿಕೆ ಎಂಜಿನ್' : 'Bilingual Kannada-English Name Matching Engine'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/40 font-semibold">
                Phonetic Transliteration & Clustering
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              {isKn
                ? 'ವಿವಿಧ ದಾಖಲೆಗಳಲ್ಲಿ ಕಂಡುಬರುವ ಹೆಸರುಗಳು, ಇನಿಷಿಯಲ್ಸ್ ಮತ್ತು ಕಾಗುಣಿತ ವ್ಯತ್ಯಾಸಗಳನ್ನು ಗುಂಪುಗೂಡಿಸಿ ಪರಿಶೀಲಿಸುತ್ತದೆ'
                : 'Identifies dropped patronymic initials, married surnames, and Kannada-English phonetic transliterations without automatic merging'}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono bg-stone-950/70 border border-stone-700 px-3 py-1 rounded-lg text-indigo-300">
          Guardrail: Requires User Confirmation
        </span>
      </div>

      <div className="p-5 space-y-6">
        {/* Name Match Clusters */}
        <div className="space-y-4">
          {matchGroups.map((group) => {
            const isConfirmed = group.status === 'CONFIRMED';

            return (
              <div
                key={group.id}
                className={`p-4 rounded-xl border transition-all ${
                  isConfirmed
                    ? 'bg-white border-stone-300 shadow-xs'
                    : 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-stone-900 font-serif">
                        {group.primaryCanonical}
                      </h4>
                      <span className="text-xs text-stone-600 font-sans">
                        ({group.kannadaCanonical})
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {group.reasonForGrouping}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                      }`}
                    >
                      {isConfirmed
                        ? '✓ Confirmed by User'
                        : '⚠️ Likely same person - Confirm'}
                    </span>

                    <button
                      onClick={() => toggleGroupConfirmation(group.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        isConfirmed
                          ? 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white font-bold'
                      }`}
                    >
                      {isConfirmed ? 'Undo' : 'Confirm Same Person'}
                    </button>
                  </div>
                </div>

                {/* Variants List */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  {group.variants.map((v, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-mono font-bold text-stone-900">{v.name}</div>
                        <div className="text-[11px] text-stone-500">{v.sourceDoc}</div>
                      </div>
                      <span className="text-[11px] font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {Math.round(v.similarityScore * 100)}% match
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Auto-Drafted One and the Same Person Affidavit */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-300 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-700" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">
                {isKn
                  ? 'ದೃಢೀಕರಣದ ನಂತರ ಸಿದ್ಧಪಡಿಸಲಾದ "ಒಬ್ಬರೇ ವ್ಯಕ್ತಿ" ಅಫಿಡವಿಟ್'
                  : 'Generated "One and the Same Person" Notarized Affidavit Draft'}
              </h4>
            </div>
            <button
              onClick={handleCopyAffidavit}
              className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              {copiedAffidavit ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAffidavit ? 'Copied Affidavit!' : 'Copy Affidavit Text'}</span>
            </button>
          </div>

          <pre className="p-3 bg-white rounded-lg border border-stone-200 text-[11px] font-mono text-stone-800 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
            {affidavitSample}
          </pre>
        </div>
      </div>
    </div>
  );
};
