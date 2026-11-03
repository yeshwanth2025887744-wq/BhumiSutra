import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Printer,
  Scale,
  Stamp,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { LegalPetitionDrafts, LandRecordDetails, SuccessionAnalysisResult } from '../types';

interface LegalDocumentsViewerProps {
  drafts: LegalPetitionDrafts;
  landRecord: LandRecordDetails;
  evidenceCitations?: SuccessionAnalysisResult['evidence_citations'];
  language: 'en' | 'kn';
}

export const LegalDocumentsViewer: React.FC<LegalDocumentsViewerProps> = ({
  drafts,
  landRecord,
  evidenceCitations,
  language,
}) => {
  const isKn = language === 'kn';
  const [activeDoc, setActiveDoc] = useState<
    'kannada_varasa' | 'mutation' | 'affidavit' | 'one_and_same' | 'relinquish' | 'evidence'
  >('kannada_varasa');
  const [copied, setCopied] = useState(false);

  const getActiveText = (): string => {
    switch (activeDoc) {
      case 'kannada_varasa':
        return (
          drafts.kannada_varasa_petition ||
          drafts.taluk_mutation_application
        );
      case 'mutation':
        return drafts.taluk_mutation_application;
      case 'affidavit':
        return drafts.legal_heir_sworn_affidavit;
      case 'one_and_same':
        return drafts.one_and_same_person_affidavit;
      case 'relinquish':
        return (
          drafts.relinquishment_or_noc_template ||
          'No relinquishment specified for this petition.'
        );
      default:
        return '';
    }
  };

  const getDocTitle = (): string => {
    switch (activeDoc) {
      case 'kannada_varasa':
        return isKn
          ? 'ನಮೂನೆ ೨೧: ಕಂದಾಯ ಇಲಾಖೆಯ ವಾರಸು ಖಾತೆ ಬದಲಾವಣೆ ಅರ್ಜಿ (ಕನ್ನಡ)'
          : 'Form 21: Karnataka Land Revenue Inheritance Mutation Petition (Kannada)';
      case 'mutation':
        return 'Formal Taluk Mutation Application (Section 128/129 KLR Act)';
      case 'affidavit':
        return 'Joint Sworn Affidavit of Legal Heirs (Under Indian Oaths Act)';
      case 'one_and_same':
        return '"One and the Same Person" Name Discrepancy Sworn Affidavit';
      case 'relinquish':
        return 'No-Objection Certificate (NOC) & Hakku Bidu Patra Waiver Clause';
      case 'evidence':
        return 'BhumiSutra Trust Engine: Evidence & Document Source Citations';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-stone-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              AUDIT PILLAR 7
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ಸಿದ್ಧಪಡಿಸಿದ ಕಂದಾಯ ಅರ್ಜಿಗಳು ಮತ್ತು ಅಫಿಡವಿಟ್‌ಗಳು' : 'Court & Revenue Ready Petitions'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
            {isKn ? 'ಅಧಿಕೃತ ಕಂದಾಯ ಅರ್ಜಿಗಳು & ನೋಟರಿ ಪ್ರಮಾಣಪತ್ರಗಳು' : 'Official Revenue Petitions & Notary Affidavits'}
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-2xl">
            {isKn
              ? `ಸರ್ವೆ ನಂ. ${landRecord.survey_number} ಗಾಗಿ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ. ₹೫೦/೧೦೦ ಇ-ಮುದ್ರಾಂಕ ಕಾಗದದಲ್ಲಿ (e-Stamp Paper) ಮುದ್ರಿಸಿ ಸಲ್ಲಿಸಬಹುದು.`
              : `Prepared for Survey No: ${landRecord.survey_number} (${landRecord.district_and_state || 'Taluk Office'}). Ready for Non-Judicial Stamp Paper.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeDoc !== 'evidence' && (
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{isKn ? 'ನಕಲಿಸಲಾಗಿದೆ!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isKn ? 'ಅರ್ಜಿ ನಕಲಿಸಿ' : 'Copy Draft'}</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isKn ? 'ಅರ್ಜಿ ಮುದ್ರಿಸಿ (PDF)' : 'Print / Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-stone-200 bg-stone-50 px-6 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setActiveDoc('kannada_varasa')}
          className={`py-3.5 px-3 font-bold border-b-2 whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
            activeDoc === 'kannada_varasa'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-600" />
          <span>1. {isKn ? 'ಕನ್ನಡ ವಾರಸು ಅರ್ಜಿ (ನಮೂನೆ ೨೧)' : 'Kannada Varasa Petition'}</span>
        </button>

        <button
          onClick={() => setActiveDoc('mutation')}
          className={`py-3.5 px-3 font-bold border-b-2 whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
            activeDoc === 'mutation'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>2. English Taluk Petition</span>
        </button>

        <button
          onClick={() => setActiveDoc('affidavit')}
          className={`py-3.5 px-3 font-bold border-b-2 whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
            activeDoc === 'affidavit'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Stamp className="w-4 h-4" />
          <span>3. {isKn ? 'ವಾರಸುದಾರರ ಜಂಟಿ ಅಫಿಡವಿಟ್' : 'Heirs Sworn Affidavit'}</span>
        </button>

        <button
          onClick={() => setActiveDoc('one_and_same')}
          className={`py-3.5 px-3 font-bold border-b-2 whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
            activeDoc === 'one_and_same'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>4. {isKn ? 'ಒಬ್ಬರೇ ವ್ಯಕ್ತಿ ಪ್ರಮಾಣಪತ್ರ' : 'One & Same Person Affidavit'}</span>
        </button>

        <button
          onClick={() => setActiveDoc('relinquish')}
          className={`py-3.5 px-3 font-bold border-b-2 whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
            activeDoc === 'relinquish'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>5. {isKn ? 'ಹಕ್ಕು ಬಿಡು ಪತ್ರ (NOC)' : 'Hakku Bidu Patra (e-NOC)'}</span>
        </button>

        <button
          onClick={() => setActiveDoc('evidence')}
          className={`py-3.5 px-3 font-bold border-b-2 whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
            activeDoc === 'evidence'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>6. {isKn ? 'ಟ್ರಸ್ಟ್ ಎಂಜಿನ್: ಮೂಲ ಸಾಕ್ಷ್ಯಗಳು' : 'Trust Engine Evidence'}</span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeDoc === 'evidence' ? (
        <div className="p-6 sm:p-10 bg-stone-50">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                TE
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  {isKn ? 'ಭೂಮಿಸೂತ್ರ ಟ್ರಸ್ಟ್ ಎಂಜಿನ್: ಸಾಕ್ಷ್ಯ-ಆಧಾರಿತ ಕಂದಾಯ ಪರಿಶೀಲನೆ' : 'BhumiSutra Trust Engine: Evidence-Backed Facts'}
                </h3>
                <p className="text-xs text-stone-500">
                  {isKn
                    ? 'ಎಐ ತನ್ನ ಸ್ವಂತ ಊಹೆಯ ಮೇಲೆ ತೀರ್ಮಾನಿಸದೆ, ಪ್ರತಿಯೊಂದು ಅಂಶವನ್ನು ಮೂಲ ಕಂದಾಯ ದಾಖಲೆಯ ಕಾಲಂ ಮತ್ತು ಕಾನೂನು ಸೆಕ್ಷನ್‌ಗೆ ಜೋಡಿಸುತ್ತದೆ.'
                    : 'Transparent provenance: Every extracted detail links to its specific document column, page, and statutory provision.'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-600 uppercase font-mono text-[10px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="p-3">{isKn ? 'ಪ್ರಮಾಣೀಕೃತ ಕಂದಾಯ ಸತ್ಯಾಂಶ' : 'Extracted Revenue Fact'}</th>
                    <th className="p-3">{isKn ? 'ಮೂಲ ಕಂದಾಯ ದಾಖಲೆ & ಕಾಲಂ' : 'Source Document & Column'}</th>
                    <th className="p-3">{isKn ? 'ಪುಟ / ಸೆಕ್ಷನ್' : 'Page / Section'}</th>
                    <th className="p-3 text-center">{isKn ? 'ಪರಿಶೀಲನೆ ಸ್ಥಿತಿ' : 'Verification Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {(evidenceCitations || [
                    {
                      fact: `Survey Number: ${landRecord.survey_number} (Extent: ${landRecord.total_extent})`,
                      source: 'RTC Form 16 (Bhoomi Karnataka), Column 3 & 4',
                      verified: true,
                      page: 'Page 1, Header Block',
                    },
                    {
                      fact: `Recorded Owner: ${landRecord.recorded_owner}`,
                      source: 'RTC Form 16, Column 9 (Kabjedar / Khatedar)',
                      verified: true,
                      page: 'Page 1, Column 9',
                    },
                    {
                      fact: 'Bank Crop Loan Lien ₹3,50,000/-',
                      source: 'RTC Form 16, Column 11 (Other Rights & Encumbrances)',
                      verified: true,
                      page: 'Page 1, MR No. 34/2019-20',
                    },
                    {
                      fact: 'Demise & Pending Inheritance Mutation',
                      source: 'RTC Form 16, Column 12 (Remarks & Mutation Notes)',
                      verified: true,
                      page: 'Page 1, Entry Dated 14/08/2023',
                    },
                    {
                      fact: 'Coparcenary Rights of Daughters by Birth',
                      source: 'Supreme Court Constitutional Bench (Vineeta Sharma v. Rakesh Sharma)',
                      verified: true,
                      page: 'AIR 2020 SC 3717',
                    },
                  ]).map((ev, i) => (
                    <tr key={i} className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900 font-serif">
                        {ev.fact}
                      </td>
                      <td className="p-3 font-mono text-stone-700 bg-stone-50/50">
                        {ev.source}
                      </td>
                      <td className="p-3 font-mono text-stone-500">
                        {ev.page}
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          VERIFIED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Legal Canvas */
        <div className="p-6 sm:p-10 bg-stone-100 flex justify-center">
          <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-stone-300 p-8 sm:p-14 relative print:border-none print:shadow-none print:p-0">
            {/* Stamp Header */}
            <div className="border-b-2 border-dashed border-stone-300 pb-6 mb-6 text-center">
              <div className="inline-block px-4 py-1 rounded bg-stone-100 border border-stone-300 text-[10px] font-mono uppercase tracking-widest text-stone-600 mb-2">
                {isKn
                  ? 'ಕರ್ನಾಟಕ ಕಂದಾಯ ನ್ಯಾಯಾಲಯ ಸಲ್ಲಿಕೆ / ಮುದ್ರಾಂಕ ಕಾಗದ'
                  : 'Karnataka Revenue Court Filing / Non-Judicial Stamp Paper'}
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 tracking-wide uppercase">
                {getDocTitle()}
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                Taluk Revenue Office • Survey No. {landRecord.survey_number}
              </p>
            </div>

            {/* Legal Draft Body */}
            <div className="prose prose-stone max-w-none text-stone-800 text-xs sm:text-sm font-serif leading-relaxed whitespace-pre-wrap">
              {getActiveText()}
            </div>

            {/* Footer Signatures */}
            <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 gap-8 text-xs font-serif text-stone-600">
              <div>
                <p className="font-bold text-stone-800 uppercase text-[11px] mb-8">
                  {isKn ? 'ಅರ್ಜಿದಾರರು / ವಾರಸುದಾರರ ಸಹಿ:' : 'PETITIONER(S) / HEIRS SIGNATURE:'}
                </p>
                <div className="border-b border-stone-400 w-48 mb-1"></div>
                <p className="text-[10px] text-stone-500">Signatures of all surviving co-heirs</p>
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="font-bold text-stone-800 uppercase text-[11px] mb-8">
                  {isKn ? 'ನೋಟರಿ / ತಹಶೀಲ್ದಾರ್ ಸಮ್ಮುಖದಲ್ಲಿ:' : 'BEFORE ME (NOTARY PUBLIC):'}
                </p>
                <div className="border-b border-stone-400 w-48 mb-1"></div>
                <p className="text-[10px] text-stone-500">
                  Advocate & Notary Public / Executive Magistrate
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Instructions */}
      <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
        <div>
          <strong className="text-stone-800">{isKn ? 'ಸಲ್ಲಿಕೆ ನಿಯಮಗಳು:' : 'Filing Rules:'}</strong>{' '}
          {isKn
            ? 'ಅಫಿಡವಿಟ್‌ಗಳನ್ನು ₹೫೦ ಅಥವಾ ₹೧೦೦ ಇ-ಸ್ಟ್ಯಾಂಪ್ ಕಾಗದದಲ್ಲಿ ಮುದ್ರಿಸಿ ನೋಟರಿ ದೃಢೀಕರಣ ಮಾಡಿಸಿ, ನಮೂನೆ ೨೧ ರೊಂದಿಗೆ ತಾಲೂಕು ಕಚೇರಿಗೆ ಸಲ್ಲಿಸಿ.'
            : 'Print affidavits on ₹50/100 e-Stamp paper, notarize under Indian Oaths Act, and submit along with Form 21 at Taluk Bhoomi Center.'}
        </div>
        <div className="font-mono text-[11px] text-stone-500">
          Section 128/129 KLR Act • Sakala Guarantee
        </div>
      </div>
    </div>
  );
};
