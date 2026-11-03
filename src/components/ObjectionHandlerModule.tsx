import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Scale,
  FileText,
  Copy,
  Check,
  Building,
  Phone,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { ObjectionGuidance } from '../types';

interface ObjectionHandlerModuleProps {
  surveyNumber: string;
  language: 'en' | 'kn';
}

export const ObjectionHandlerModule: React.FC<ObjectionHandlerModuleProps> = ({
  surveyNumber,
  language,
}) => {
  const isKn = language === 'kn';
  const [selectedType, setSelectedType] = useState<
    'RELATIVE_SHARE' | 'BOUNDARY_DISPUTE' | 'BANK_LIEN' | 'WILL_DISPUTE'
  >('RELATIVE_SHARE');
  const [copied, setCopied] = useState(false);

  const objectionGuides: Record<string, ObjectionGuidance> = {
    RELATIVE_SHARE: {
      id: 'obj-relative',
      objectionType: 'RELATIVE_SHARE',
      title: 'Relative or Agnate Claims Share Based on Alleged Oral Partition',
      kannadaTitle: 'ಮೌಖಿಕ ವಿಭಾಗದ ಆಧಾರದ ಮೇಲೆ ಸಂಬಂಧಿಕರು ಆಕ್ಷೇಪಣೆ ಸಲ್ಲಿಸಿದಾಗ',
      hearingAuthority: 'Revenue Inspector (RI) / Tahsildar (under Section 129 KLR Act)',
      jurisdictionNote:
        'Tahsildar conducts an inquiry under Section 129(4). If complex questions of title or invalidity of oral partition arise, revenue authorities are legally constrained from deciding title; parties are directed to Civil Court (flagged for verification).',
      requiredEvidence: [
        'Certified RTC extracts for the preceding 30 years showing sole possession',
        'Official Death Certificate of the recorded khatedar',
        'Registered Family Tree issued by Nadakacheri (ನಮೂನೆ ಇ-ವಾರಸು)',
        'Supreme Court precedent Vineeta Sharma (2020) requiring registered partition deeds executed before 20/12/2004',
      ],
      draftReplyText: `BEFORE THE TAHSILDAR / REVENUE INSPECTOR, TALUK OFFICE, DEVANAHALLI\nIN THE MATTER OF: Form 12 Objection against Mutation of Survey No. ${surveyNumber}\n\nREPLY STATEMENT FILED BY APPLICANT HEIRS:\n1. The objection filed by the contesting party alleging an oral partition from 2011 is legally untenable.\n2. Under Section 17 of the Registration Act, 1908 and settled law in Vineeta Sharma (2020), no partition of immovable agricultural property can be claimed without a registered deed or court decree.\n3. The applicant heirs have remained in peaceful physical possession and cultivated the land continuously.\n4. It is respectfully prayed that the frivolous objection be dismissed and the Varasa mutation under Form 21 be approved without delay.\n\nDate: ____________\n(APPLICANT SIGNATURE)`,
    },
    BOUNDARY_DISPUTE: {
      id: 'obj-boundary',
      objectionType: 'BOUNDARY_DISPUTE',
      title: 'Adjoining Landowner Claims Encroachment or Road Access Dispute',
      kannadaTitle: 'ಪಕ್ಕದ ಜಮೀನಿನ ಮಾಲೀಕರು ಒತ್ತುವರಿ ಅಥವಾ ದಾರಿ ಆಕ್ಷೇಪಣೆ ಸಲ್ಲಿಸಿದಾಗ',
      hearingAuthority: 'Assistant Director of Land Records (ADLR) / Tahsildar',
      jurisdictionNote:
        'Revenue authorities cannot alter boundary lines without cadastral re-survey. Handled under Karnataka Land Revenue Act Section 140 (Boundary Disputes) and Mojini 11E survey rules.',
      requiredEvidence: [
        'Original Village Map (ಗ್ರಾಮ ನಕ್ಷೆ) showing natural cart tracks and survey borders',
        'Akarband and Tippani Copy from Mojini database',
        'Joint Spot Inspection Mahazar signed by Village Accountant and adjoining landholders',
      ],
      draftReplyText: `BEFORE THE ADLR & TAHSILDAR, DEVANAHALLI TALUK\nIN THE MATTER OF: Boundary Objection on Survey No. ${surveyNumber}\n\nREPLY SUBMISSION:\n1. The applicant is the rightful legal heir of the land measuring 2 Acres 18 Guntas as demarcated in the original revenue records.\n2. The applicant requests an official Mojini 11E re-survey with GPS boundary pegs placed at the applicant's expense to resolve any border overlap peacefully.\n3. The objector's claim of an informal road through the middle of the cultivable land is without statutory basis.\n\nDate: ____________\n(APPLICANT SIGNATURE)`,
    },
    BANK_LIEN: {
      id: 'obj-bank',
      objectionType: 'BANK_LIEN',
      title: 'Credit Society or Bank Alleges Pending Unreleased Loan Charge',
      kannadaTitle: 'ಸಹಕಾರ ಸಂಘ ಅಥವಾ ಬ್ಯಾಂಕ್ ಸಾಲದ ಹೊಣೆಗಾರಿಕೆ ಆಕ್ಷೇಪಣೆ ಸಲ್ಲಿಸಿದಾಗ',
      hearingAuthority: 'Revenue Inspector / Sub-Registrar',
      jurisdictionNote:
        'Inheritance mutation (Varasa) can proceed subject to noting the existing charge in Column 11, or by clearing the loan via No-Due Certificate (NDC). Land title passes with the liability intact.',
      requiredEvidence: [
        'Bank No-Due Certificate (NDC) if the debt was repaid',
        'Form 19 Loan Discharge Deed executed by Bank Manager',
        'Undertaking by legal heirs to assume the agricultural liability proportionally under Section 128',
      ],
      draftReplyText: `TO: THE REVENUE INSPECTOR / VILLAGE ACCOUNTANT, VIJAYAPURA HOBLI\nSUBJECT: Clarification on Bank Charge in Survey No. ${surveyNumber}\n\nSUBMISSION:\n1. The legal heirs are aware of the crop loan recorded in Column 11 under MR 34/2019-20.\n2. Under Section 128 of the Karnataka Land Revenue Act, death of the khatedar does not extinguish the bank's charge; the heirs inherit both the asset and the liability.\n3. The heirs request continuation of mutation in Column 9 while retaining the bank's charge in Column 11 until formal clearance.\n\nDate: ____________\n(APPLICANT SIGNATURE)`,
    },
    WILL_DISPUTE: {
      id: 'obj-will',
      objectionType: 'WILL_DISPUTE',
      title: 'A Party Claims Land Based on a Disputed Unregistered / Registered Will',
      kannadaTitle: 'ಉಯಿಲು (Will) ಪತ್ರದ ಮಾನ್ಯತೆಯ ಬಗ್ಗೆ ಆಕ್ಷೇಪಣೆ ವ್ಯಕ್ತವಾದಾಗ',
      hearingAuthority: 'Competent Senior Civil Judge Court (Exclusive Jurisdiction for Probate)',
      jurisdictionNote:
        'IMPORTANT LEGAL RESTRICTION: A Tahsildar or Revenue Officer HAS NO JURISDICTION to judge the genuineness of a contested Will. When a Will is disputed, the Tahsildar must refer parties to the Civil Court.',
      requiredEvidence: [
        'Attested copy of the contested Will',
        'Medical fitness certificate of testator at the time of execution',
        'Affidavit of surviving Class I heirs regarding intestate ancestral status',
      ],
      draftReplyText: `BEFORE THE TAHSILDAR, DEVANAHALLI\nIN THE MATTER OF: Disputed Will Objection on Survey No. ${surveyNumber}\n\nMEMORANDUM OF JURISDICTIONAL OBJECTION:\n1. It is settled law (Karnataka High Court in multiple precedents) that Revenue Officers acting under Section 129 cannot adjudicate contested Wills.\n2. The propounder of the alleged Will must obtain a Probate or Succession Certificate from the Civil Court.\n3. Until such decree is produced, the intestate succession under Section 8 of the Hindu Succession Act in favor of Class I heirs must be maintained.\n\nDate: ____________\n(APPLICANT SIGNATURE)`,
    },
  };

  const currentGuide = objectionGuides[selectedType];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentGuide.draftReplyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="px-5 py-4 bg-gradient-to-r from-stone-900 to-rose-950 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-rose-100">
                {isKn ? 'ನಮೂನೆ ೧೨ ಆಕ್ಷೇಪಣೆ ಪರಿಹಾರ ಮಾರ್ಗದರ್ಶಿ' : 'Form 12 Public Objection Resolution Module'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded border border-rose-500/40 font-semibold">
                Public Notice Safeguards
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              {isKn
                ? '೩೦ ದಿನಗಳ ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣಾ ಅವಧಿಯಲ್ಲಿ ಆಕ್ಷೇಪಣೆ ಬಂದರೆ ಏನು ಮಾಡಬೇಕು? ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿ, ದಾಖಲೆಗಳು ಮತ್ತು ಉತ್ತರ ಪತ್ರ'
                : 'Procedural roadmap, authority jurisdiction boundaries, evidence checklist, and draft reply templates'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Selector Buttons */}
        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
            {isKn ? 'ಸಲ್ಲಿಸಲಾದ ಆಕ್ಷೇಪಣೆಯ ಸ್ವರೂಪವನ್ನು ಆಯ್ಕೆಮಾಡಿ:' : 'Select the Type of Objection Received:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {(
              [
                ['RELATIVE_SHARE', 'Relative Claims Share (ಮೌಖಿಕ ವಿಭಾಗ)'],
                ['BOUNDARY_DISPUTE', 'Boundary Overlap (ಒತ್ತುವರಿ/ದಾರಿ)'],
                ['BANK_LIEN', 'Bank Loan Lien (ಬ್ಯಾಂಕ್ ಸಾಲ)'],
                ['WILL_DISPUTE', 'Disputed Will (ವಿವಾದಿತ ಉಯಿಲು)'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                  selectedType === key
                    ? 'border-rose-600 bg-rose-50 text-rose-950 shadow-sm ring-1 ring-rose-600'
                    : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Current Guide Content */}
        <div className="p-5 bg-stone-50/70 rounded-xl border border-stone-200 space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <h4 className="font-bold text-base text-stone-900 font-serif">
              {isKn ? currentGuide.kannadaTitle : currentGuide.title}
            </h4>
            <div className="mt-1 text-xs text-stone-600 font-sans">
              <strong className="text-stone-800">Hearing Authority:</strong> {currentGuide.hearingAuthority}
            </div>
          </div>

          {/* Jurisdiction Note */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-300 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Jurisdictional Boundary:</strong> {currentGuide.jurisdictionNote}
            </div>
          </div>

          {/* Evidence Checklist */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-stone-800 mb-2">
              {isKn ? 'ಸಿದ್ಧಪಡಿಸಿಕೊಳ್ಳಬೇಕಾದ ಪುರಾವೆಗಳ ಪಟ್ಟಿ:' : 'Evidence Checklist to Gather:'}
            </h5>
            <ul className="text-xs text-stone-700 space-y-1.5 list-disc list-inside bg-white p-3 rounded-lg border border-stone-200">
              {currentGuide.requiredEvidence.map((ev, i) => (
                <li key={i}>{ev}</li>
              ))}
            </ul>
          </div>

          {/* Draft Reply Template */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-xs uppercase tracking-wider text-stone-800">
                {isKn ? 'ಸಿದ್ಧಪಡಿಸಿದ ಉತ್ತರ ಪತ್ರದ ಕರಡು (Draft Reply):' : 'Ready-to-Submit Draft Reply Statement:'}
              </h5>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Reply Template'}</span>
              </button>
            </div>
            <pre className="p-4 bg-white rounded-lg border border-stone-300 text-[11px] font-mono text-stone-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
              {currentGuide.draftReplyText}
            </pre>
          </div>
        </div>

        {/* FREE LEGAL AID CARD (DLSA / TLSC) */}
        <div className="p-4 bg-blue-50/70 border border-blue-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-blue-950 font-serif">
                {isKn ? 'ಉಚಿತ ಕಾನೂನು ಸೇವಾ ಪ್ರಾಧಿಕಾರ (DLSA / TLSC)' : 'Free Legal Aid • District Legal Services Authority (DLSA)'}
              </h4>
              <p className="text-xs text-blue-800 mt-0.5">
                Under the Legal Services Authorities Act, 1987, rural farmers, women, and marginalized landowners are entitled to free government-appointed legal advocates for revenue and property disputes.
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xs font-mono font-bold text-blue-900">Toll-Free Helpline: 15100</div>
            <span className="text-[10px] text-blue-700 block">Taluk Court Complex, Devanahalli</span>
          </div>
        </div>
      </div>
    </div>
  );
};
