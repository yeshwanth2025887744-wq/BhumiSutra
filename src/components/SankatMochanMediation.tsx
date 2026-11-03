import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  Handshake,
  FileCheck2,
  AlertTriangle,
  FileText,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
} from 'lucide-react';
import { DisputeCase } from '../types';

interface SankatMochanMediationProps {
  surveyNumber: string;
  extent: string;
  language: 'en' | 'kn';
}

export const SankatMochanMediation: React.FC<SankatMochanMediationProps> = ({
  surveyNumber,
  extent,
  language,
}) => {
  const isKn = language === 'kn';
  const [selectedCase, setSelectedCase] = useState<string>('case-1');
  const [copied, setCopied] = useState(false);

  const disputeCases: Record<string, DisputeCase> = {
    'case-1': {
      id: 'case-1',
      title: isKn
        ? 'ಪ್ರಕರಣ ೧: ಅಣ್ಣ-ತಮ್ಮಂದಿರ ನಡುವಿನ ಮೌಖಿಕ ವಿಭಾಗದ ಆಕ್ಷೇಪಣೆ'
        : 'Case 1: Objection by Paternal Cousin Claiming Unregistered 2011 Oral Partition',
      opposingParty: 'Narayana Gowda (Paternal Uncle / Cousin)',
      claimNature: 'Oral Family Settlement & Adverse Claim',
      description: isKn
        ? 'ದಿವಂಗತ ಮಲ್ಲಪ್ಪ ಗೌಡರ ಮರಣದ ನಂತರ, ಚಿಕ್ಕಪ್ಪನ ಮಗ ನಾರಾಯಣ ಗೌಡರು ೨೦೧೧ ರಲ್ಲಿ ಮೌಖಿಕ ವಿಭಾಗವಾಗಿದೆ ಎಂದು ತಾಲೂಕು ಕಚೇರಿಯಲ್ಲಿ ನಮೂನೆ ೧೨ ರಡಿ ಆಕ್ಷೇಪಣೆ ಸಲ್ಲಿಸಿದ್ದಾರೆ.'
        : 'After the demise of Mallappa Gowda, the paternal cousin filed an objection under Form 12 claiming an oral family partition from 2011 without registered deed.',
      adverseProbability: 35, // 35% risk if went to prolonged court
      keyVulnerability: isKn
        ? 'ನೋಂದಣಿ ಕಾಯ್ದೆ ಕಲಂ ೧೭ ರನ್ವಯ ₹೧೦೦ ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಸ್ಥಿರಾಸ್ತಿ ವರ್ಗಾವಣೆಗೆ ನೋಂದಾಯಿತ ಪತ್ರವಿಲ್ಲದೆ ಮೌಖಿಕ ವಿಭಾಗವು ಕಂದಾಯ ನ್ಯಾಯಾಲಯದಲ್ಲಿ ಅಸಿಂಧು.'
        : 'Under Section 17 of the Registration Act, an unregistered oral partition has no legal validity in revenue proceedings.',
      statutoryPrecedent:
        'Supreme Court in Vineeta Sharma (2020): Only registered partition deeds or court decrees executed prior to Dec 20, 2004 are legally binding.',
      proposedCompromise: isKn
        ? 'ದಕ್ಷಿಣ ಗಡಿಯಲ್ಲಿ ೧೨ ಅಡಿ ಬಂಡಿ ರಸ್ತೆಯ ಶಾಶ್ವತ ಅನುಭೋಗದ ಹಕ್ಕು (Easement) ಮತ್ತು ₹೧,೫೦,೦೦೦ ಪರಿಹಾರ ನೀಡಿ ರಾಜಿ ಪತ್ರ ನೋಂದಾಯಿಸುವುದು.'
        : 'Grant a permanent 12-ft cart road easement along the southern boundary and ₹1,50,000 mutual compensation against an irrevocable Relinquishment Deed.',
      mediationSettlementDraft: `BEFORE THE LOK ADALAT / TALUK LEGAL SERVICES COMMITTEE (TLSC)
AT: TALUK REVENUE COURT, DEVANAHALLI, BENGALURU RURAL

PRE-LITIGATION MUTUAL SETTLEMENT DEED & COMPROMISE PETITION
(Under Sections 19 & 20 of Legal Services Authorities Act, 1987)

IN THE MATTER OF:
Dispute over Land Bearing Survey Number: ${surveyNumber} (${extent})
Hobli: Vijayapura, Taluk: Devanahalli

PARTIES TO COMPROMISE:
First Party: Legal Heirs of Late Mallappa Gowda (Petitioners)
Second Party: Narayana Gowda & Heirs (Objecting Agnate)

TERMS OF SETTLEMENT:
1. Both parties mutually acknowledge that prolonged civil litigation will take 10 to 15 years, incur heavy advocate fees, and prevent both families from using the land as collateral.
2. The Second Party hereby unconditionally withdraws the Form 12 objection filed before the Revenue Inspector.
3. The First Party concedes a permanent 12-foot cart track easement along the southern boundary for agricultural access.
4. The Second Party signs the No-Objection endorsement on the J-Slip before the Tahsildar.
5. This settlement is final, binding, and carries the force of a Civil Court Decree under Section 21 of the Legal Services Authorities Act.

(FIRST PARTY)                                      (SECOND PARTY)
ADVOCATE FOR FIRST PARTY                         ADVOCATE FOR SECOND PARTY`,
    },
    'case-2': {
      id: 'case-2',
      title: isKn
        ? 'ಪ್ರಕರಣ ೨: ವಿವಾಹಿತ ಸಹೋದರಿಯ ಹಕ್ಕು ನಿರಾಕರಣೆ ವಿವಾದ'
        : 'Case 2: Dispute by Married Sister Demanding Ancestral Coparcenary Share',
      opposingParty: 'Latha Ramesh (Married Daughter)',
      claimNature: 'Hindu Succession Act Section 6 Coparcenary Demand',
      description: isKn
        ? 'ಸಹೋದರರು ಸಹೋದರಿಯನ್ನು ಕೈಬಿಟ್ಟು ಮ್ಯುಟೇಷನ್ ಮಾಡಲು ಯತ್ನಿಸಿದ್ದು, ಸಹೋದರಿಯು ತಹಶೀಲ್ದಾರ್ ನ್ಯಾಯಾಲಯದಲ್ಲಿ ಸಮಪಾಲು ಕೋರಿ ತಡೆಯಾಜ್ಞೆ ಕೋರಿದ್ದಾರೆ.'
        : 'Sons attempted to file mutation excluding married daughter; daughter filed objection invoking Supreme Court Vineeta Sharma coparcenary rights.',
      adverseProbability: 92, // 92% risk of losing in court if sons resist!
      keyVulnerability: isKn
        ? 'ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ಸಂವಿಧಾನ ಪೀಠದ ತೀರ್ಪಿನಂತೆ ಹೆಣ್ಣು ಮಕ್ಕಳಿಗೆ ಜನ್ಮಸಿದ್ಧ ಸಮಪಾಲು ಇದ್ದು, ಸಹೋದರರು ನ್ಯಾಯಾಲಯಕ್ಕೆ ಹೋದರೆ ಸಂಪೂರ್ಣ ಸೋಲು ಖಚಿತ.'
        : 'Daughters hold absolute coparcenary rights by birth. Any litigation resisting her equal share will result in outright loss with heavy court costs.',
      proposedCompromise: isKn
        ? 'ನ್ಯಾಯಾಲಯಕ್ಕೆ ಹೋಗದೆ ತಕ್ಷಣವೇ ಸಹೋದರಿಯ ಹೆಸರನ್ನು ಕಾಲಂ ೯ ರಲ್ಲಿ ೧/೩ ಸಮಪಾಲುದಾರರನ್ನಾಗಿ ನಮೂನೆ ೨೧ ರಲ್ಲಿ ಜಂಟಿಯಾಗಿ ಸೇರಿಸುವುದು.'
        : 'Immediately include the daughter as an equal 1/3rd co-heir in Form 21, avoiding 8+ years of futile civil partition litigation.',
      statutoryPrecedent:
        'Supreme Court 3-Judge Bench in Vineeta Sharma v. Rakesh Sharma (2020) 9 SCC 1.',
      mediationSettlementDraft: `BEFORE THE TAHSILDAR & TALUK EXECUTIVE MAGISTRATE
DEVANAHALLI TALUK, BENGALURU RURAL

FAMILY SETTLEMENT & REVENUE MUTATION CONSENSUS MEMO
(Under Section 128 & 129 of Karnataka Land Revenue Act, 1964)

IN RESPECT OF: Survey No: ${surveyNumber} (${extent})

1. The sons and surviving widow acknowledge the constitutional coparcenary rights of the daughter, Smt. Latha Ramesh.
2. All parties agree to partition the land into equal 1/3rd shares or hold joint khata under Column 9.
3. The daughter withdraws all contestations and joins as Co-Petitioner in Form 21.

(ALL CO-HEIRS & PETITIONERS)`,
    },
  };

  const activeCase = disputeCases[selectedCase];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCase.mediationSettlementDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              NEXT-LEVEL IDEA: SANKATMOCHAN
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ಮುನ್ಸೂಚನಾ ವಿವಾದ ಪರಿಹಾರ ಮತ್ತು ರಾಜಿ ಸಂಧಾನ ಏಜೆಂಟ್' : 'Pre-Litigation Dispute Predictor & Mediator'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Scale className="w-5 h-5 text-rose-400" />
            {isKn ? 'ಸಂಕಟಮೋಚನ: ಕಂದಾಯ ವಿವಾದ ತಡೆ & ರಾಜಿ ಸಂಧಾನ' : 'SankatMochan: Pre-Litigation Predictor & Settlement Drafter'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ವರ್ಷಗಟ್ಟಲೆ ನ್ಯಾಯಾಲಯಕ್ಕೆ ಅಲೆಯುವುದನ್ನು ತಪ್ಪಿಸಿ, ಲೋಕ ಅದಾಲತ್ ಮಾದರಿಯ ರಾಜಿ ಪತ್ರವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಿದ್ಧಪಡಿಸುತ್ತದೆ'
              : 'Analyzes objection statements, calculates adverse trial odds, and generates out-of-court settlement deeds'}
          </p>
        </div>

        {/* Case Toggle Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-950/80 rounded-xl border border-stone-800 self-start sm:self-center text-xs">
          <button
            onClick={() => setSelectedCase('case-1')}
            className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all ${
              selectedCase === 'case-1'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            {isKn ? 'ಪ್ರಕರಣ ೧: ಮೌಖಿಕ ವಿಭಾಗ' : 'Case 1: Oral Partition'}
          </button>
          <button
            onClick={() => setSelectedCase('case-2')}
            className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all ${
              selectedCase === 'case-2'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            {isKn ? 'ಪ್ರಕರಣ ೨: ಹೆಣ್ಣು ಮಕ್ಕಳ ಪಾಲು' : 'Case 2: Daughter Rights'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Risk & Vulnerability Analysis Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Probability Gauge (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl border border-stone-200 bg-stone-50/70 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block mb-1">
                {isKn ? 'ನ್ಯಾಯಾಲಯದಲ್ಲಿ ಸೋಲುವ ಸಂಭವನೀಯತೆ' : 'Adverse Litigation Risk Odds'}
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-extrabold font-mono text-stone-900">
                  {activeCase.adverseProbability}%
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    activeCase.adverseProbability > 70
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {activeCase.adverseProbability > 70 ? 'Extreme Loss Risk' : 'Moderate Contest Risk'}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-stone-600 space-y-2">
                <div>
                  <strong className="text-stone-800">
                    {isKn ? 'ವಿವಾದಿತ ಪಕ್ಷಗಾರ:' : 'Opposing Party:'}
                  </strong>{' '}
                  {activeCase.opposingParty}
                </div>
                <div>
                  <strong className="text-stone-800">
                    {isKn ? 'ನ್ಯಾಯಾಲಯದಲ್ಲಿ ತಗಲುವ ಸಮಯ:' : 'Court Trial Delay:'}
                  </strong>{' '}
                  <span className="font-mono text-rose-700 font-bold">8 to 15 Years</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-2.5 rounded-xl bg-amber-50 text-[11px] text-amber-900 border border-amber-200">
              <strong>{isKn ? 'ನ್ಯಾಯಾಂಗ ತೀರ್ಪು:' : 'Key Precedent:'}</strong>{' '}
              {activeCase.statutoryPrecedent}
            </div>
          </div>

          {/* Legal Vulnerability & Proposed Mediation Compromise (8 cols) */}
          <div className="lg:col-span-8 p-5 rounded-2xl border border-stone-200 bg-white flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider font-mono mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>{isKn ? 'ಕಾನೂನು ದುರ್ಬಲತೆ (Legal Vulnerability):' : 'Legal Vulnerability Analysis:'}</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans bg-rose-50/60 p-3 rounded-xl border border-rose-200/70">
                {activeCase.keyVulnerability}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider font-mono mb-1">
                <Handshake className="w-4 h-4" />
                <span>{isKn ? 'ಶಿಫಾರಸು ಮಾಡಿದ ನ್ಯಾಯೋಚಿತ ರಾಜಿ ಸೂತ್ರ (Objective Compromise):' : 'Recommended Mediation Compromise:'}</span>
              </div>
              <p className="text-xs text-stone-800 leading-relaxed font-sans bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/70">
                {activeCase.proposedCompromise}
              </p>
            </div>
          </div>
        </div>

        {/* Pre-Litigation Mutual Settlement Deed Draft */}
        <div className="rounded-2xl border border-stone-200 overflow-hidden">
          <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-stone-800">
                {isKn
                  ? 'ಲೋಕ ಅದಾಲತ್ ಮಾದರಿಯ ರಾಜಿ ಪತ್ರ (Pre-Litigation Settlement Deed)'
                  : 'Pre-Litigation Settlement Deed Draft (Lok Adalat / TLSC Ready)'}
              </h4>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg border border-stone-300 flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Settlement</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 bg-stone-50/50">
            <pre className="text-xs font-mono text-stone-800 whitespace-pre-wrap bg-white p-4 rounded-xl border border-stone-200 leading-relaxed shadow-inner">
              {activeCase.mediationSettlementDraft}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
