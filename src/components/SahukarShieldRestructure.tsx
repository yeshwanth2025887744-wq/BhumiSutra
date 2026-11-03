import React, { useState } from 'react';
import {
  ShieldAlert,
  Coins,
  TrendingDown,
  ArrowRight,
  Landmark,
  FileText,
  Copy,
  Check,
  Plus,
  Trash2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { InformalDebtProfile, DebtRestructurePlan } from '../types';

interface SahukarShieldRestructureProps {
  surveyNumber: string;
  totalExtent: string;
  language: 'en' | 'kn';
}

export const SahukarShieldRestructure: React.FC<SahukarShieldRestructureProps> = ({
  surveyNumber,
  totalExtent,
  language,
}) => {
  const isKn = language === 'kn';
  const [debts, setDebts] = useState<InformalDebtProfile[]>([
    {
      creditorName: 'Local Village Sahukar (ಖಾಸಗಿ ಲೇವಾದೇವಿದಾರರು)',
      principalAmount: 250000,
      monthlyInterestRatePercent: 3, // 3% per month = 36% p.a.
      pledgedItem: 'Original RTC Extract & Blank Cheque (ಮೂಲ ಪಹಣಿ & ಚೆಕ್)',
      loanDate: '2022-04-10',
      purpose: 'Borewell Drilling & Emergency Medical Expenses',
    },
    {
      creditorName: 'Private Input Dealer Fertilizer Loan',
      principalAmount: 50000,
      monthlyInterestRatePercent: 2.5, // 2.5% per month = 30% p.a.
      pledgedItem: 'Gold Ornaments (ಚಿನ್ನದ ಒಡವೆ)',
      loanDate: '2023-06-15',
      purpose: 'Seeds & Fertilizer purchase during monsoon',
    },
  ]);

  const [copied, setCopied] = useState(false);

  // Calculations
  const totalPrincipal = debts.reduce((acc, d) => acc + d.principalAmount, 0);
  const annualPredatoryInterest = debts.reduce(
    (acc, d) => acc + d.principalAmount * (d.monthlyInterestRatePercent * 12) / 100,
    0
  );
  const pacsSubsidizedAnnualInterest = totalPrincipal * 0.04; // 4% statutory PACS subsidized rate
  const annualSavings = annualPredatoryInterest - pacsSubsidizedAnnualInterest;

  const memoText = `APPLICATION FOR EMERGENCY AGRICULTURAL DEBT RESTRUCTURING & PACS REFINANCING
TO: The Secretary / Branch Manager
Primary Agricultural Credit Co-operative Society (PACS) / DCC Bank
Devanahalli Taluk, Bengaluru Rural District

APPLICANT: Legal Heirs of Late Mallappa Gowda
SCHEDULE LAND: Survey No: ${surveyNumber} (${totalExtent})

SUBJECT: Transition from Informal Usurious Debt (Meter Baddi) to Institutional PACS Credit

RESPECTED SIR,
1. The applicant family was constrained to borrow an aggregate principal sum of ₹${totalPrincipal.toLocaleString('en-IN')} from unorganized informal sources at extortionate interest rates of 30% to 36% per annum due to the land title being tied up in deceased ancestor mutation proceedings.
2. The applicant family is currently suffering an unbearable annual interest outflow of ₹${Math.round(annualPredatoryInterest).toLocaleString('en-IN')}, bleeding the farming household dry.
3. Having now completed the statutory title clarification, heir consensus, and Form 21 inheritance mutation dossier via BhumiSutra, the applicant prays for sanction of an institutional PACS Agricultural Refinance Loan of ₹${totalPrincipal.toLocaleString('en-IN')} at the subsidized 4% per annum interest rate against a formal charge created on Survey No. ${surveyNumber}.
4. This refinancing will deliver an immediate net annual household savings of ₹${Math.round(annualSavings).toLocaleString('en-IN')}, restoring financial viability to the farming unit.

(APPLICANT SIGNATURE & VERIFIED DOSSIER ENCLOSED)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(memoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              NEXT-LEVEL IDEA: SAHUKAR SHIELD
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ಖಾಸಗಿ ಲೇವಾದೇವಿ ಸಾಲದ ಬಲೆ ಪತ್ತೆ & ಬ್ಯಾಂಕ್ ಸಾಲ ಮರುಹೊಂದಾಣಿಕೆ' : 'Predatory Debt Trap Detector & PACS Credit Bridge'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            {isKn ? 'ಸಾಹುಕಾರ್ ಶೀಲ್ಡ್: ಖಾಸಗಿ ಮೀಟರ್ ಬಡ್ಡಿ ಮುಕ್ತಿ ಯೋಜನೆ' : 'Sahukar Shield: Informal Debt Restructuring & PACS Bridge'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ಪಹಣಿ ಹೆಸರಿಲ್ಲದ ಕಾರಣ ಖಾಸಗಿಯಾಗಿ ಶೇ. ೩೬ ರ ಮೀಟರ್ ಬಡ್ಡಿಗೆ ಪಡೆದ ಸಾಲವನ್ನು ಸಹಕಾರ ಸಂಘದ ಶೇ. ೪ ರ ಬಡ್ಡಿಗೆ ಬದಲಾಯಿಸಿ ರೈತರನ್ನು ಉಳಿಸುವ ಎಐ ಯೋಜನೆ'
              : 'Converts predatory informal loans into 4% subsidized PACS institutional credit upon title clearance'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
            {isKn
              ? `ವಾರ್ಷಿಕ ಉಳಿತಾಯ: ₹${Math.round(annualSavings).toLocaleString('en-IN')}`
              : `Annual Savings: ₹${Math.round(annualSavings).toLocaleString('en-IN')}`}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Visual Financial Drain Comparison (The Shock Metric) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Informal Interest Drain */}
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-rose-700 block mb-1">
                {isKn ? 'ಖಾಸಗಿ ಮೀಟರ್ ಬಡ್ಡಿ ದಂಡ (೩೬% ವಾರ್ಷಿಕ)' : 'Predatory Moneylender Drain (36% p.a.)'}
              </span>
              <p className="text-2xl font-extrabold font-mono text-rose-900 mt-1">
                ₹{Math.round(annualPredatoryInterest).toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-rose-700 mt-1">
                {isKn ? 'ಪ್ರತಿ ವರ್ಷ ರೈತರ ಜೇಬಿನಿಂದ ಸೋರಿಹೋಗುವ ಖಾಸಗಿ ಬಡ್ಡಿ' : 'Cruel annual interest bleeding the farmer’s household'}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-rose-200/80 text-[10px] font-mono text-rose-800">
              Monthly rate: 3% per month
            </div>
          </div>

          {/* Subsidized PACS Rate */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 block mb-1">
                {isKn ? 'PACS ಸಹಕಾರ ಸಂಘದ ಸಬ್ಸಿಡಿ ಬಡ್ಡಿ (೪% ವಾರ್ಷಿಕ)' : 'PACS Subsidized Agri Credit (4% p.a.)'}
              </span>
              <p className="text-2xl font-extrabold font-mono text-emerald-900 mt-1">
                ₹{Math.round(pacsSubsidizedAnnualInterest).toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-700 mt-1">
                {isKn ? 'ಭೂಮಿಸೂತ್ರ ಪಹಣಿ ಶುದ್ಧೀಕರಣದ ನಂತರ ಸಿಗುವ ಅಧಿಕೃತ ಸಾಲ' : 'Institutional credit unlocked once RTC title is clarified'}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-emerald-200/80 text-[10px] font-mono text-emerald-800">
              NABARD subsidized crop rate
            </div>
          </div>

          {/* Net Household Savings */}
          <div className="p-5 rounded-2xl bg-stone-900 text-white border border-stone-800 flex flex-col justify-between shadow-md">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 block mb-1">
                {isKn ? 'ರೈತ ಕುಟುಂಬದ ನಿವ್ವಳ ವಾರ್ಷಿಕ ಉಳಿತಾಯ' : 'Net Annual Household Savings'}
              </span>
              <p className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                + ₹{Math.round(annualSavings).toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-stone-300 mt-1">
                {isKn
                  ? 'ಈ ಉಳಿತಾಯವು ರೈತರ ಮಕ್ಕಳ ವಿದ್ಯಾಭ್ಯಾಸ ಮತ್ತು ಕೃಷಿ ಸುಧಾರಣೆಗೆ ಬಳಕೆಯಾಗುತ್ತದೆ'
                  : 'Reinvested into seeds, fertilizer, and children’s education'}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-stone-800 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>88.8% Interest Reduction</span>
            </div>
          </div>
        </div>

        {/* Existing Informal Debt Table */}
        <div className="rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-stone-800">
                {isKn ? 'ಪ್ರಸ್ತುತ ಬಾಕಿ ಇರುವ ಖಾಸಗಿ ಸಾಲಗಳ ಪಟ್ಟಿ' : 'Current Informal Debt Registry'}
              </h4>
            </div>
            <span className="text-xs font-mono text-stone-600">
              Total Principal: ₹{totalPrincipal.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100 text-stone-600 uppercase font-mono text-[10px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="p-3">{isKn ? 'ಸಾಲ ನೀಡಿದವರು' : 'Creditor / Lender'}</th>
                  <th className="p-3">{isKn ? 'ಅಸಲು ಮೊತ್ತ' : 'Principal'}</th>
                  <th className="p-3 text-center">{isKn ? 'ತಿಂಗಳ ಬಡ್ಡಿ' : 'Monthly Rate'}</th>
                  <th className="p-3">{isKn ? 'ಅಡಮಾನವಿಟ್ಟ ವಸ್ತು' : 'Pledged Collateral'}</th>
                  <th className="p-3">{isKn ? 'ಸಾಲದ ಉದ್ದೇಶ' : 'Loan Purpose'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {debts.map((d, i) => (
                  <tr key={i} className="hover:bg-stone-50/70">
                    <td className="p-3 font-semibold text-stone-900">{d.creditorName}</td>
                    <td className="p-3 font-mono font-bold text-stone-800">
                      ₹{d.principalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 font-mono text-center text-rose-700 font-bold">
                      {d.monthlyInterestRatePercent}% / month ({d.monthlyInterestRatePercent * 12}% p.a.)
                    </td>
                    <td className="p-3 text-stone-600 font-mono text-[11px]">{d.pledgedItem}</td>
                    <td className="p-3 text-stone-500 text-[11px]">{d.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Generated Formal PACS Refinance Application Memo */}
        <div className="rounded-xl border border-stone-200 overflow-hidden">
          <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-stone-800">
                {isKn ? 'PACS ಸಹಕಾರ ಸಂಘದ ಸಾಲ ಮರುಹೊಂದಾಣಿಕೆ ಅರ್ಜಿ' : 'Formal PACS Refinance Application Memo'}
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
                  <span>Copy Application</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 bg-stone-50/50">
            <pre className="text-xs font-mono text-stone-800 whitespace-pre-wrap bg-white p-4 rounded-xl border border-stone-200 leading-relaxed shadow-inner">
              {memoText}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
