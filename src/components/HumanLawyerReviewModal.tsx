import React, { useState } from 'react';
import {
  X,
  Scale,
  ShieldCheck,
  UserCheck,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Send,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { LandRecordDetails, SuccessionAnalysisResult } from '../types';

interface HumanLawyerReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: LandRecordDetails;
  analysis: SuccessionAnalysisResult | null;
  language: 'en' | 'kn';
}

export const HumanLawyerReviewModal: React.FC<HumanLawyerReviewModalProps> = ({
  isOpen,
  onClose,
  record,
  analysis,
  language,
}) => {
  if (!isOpen) return null;

  const isKn = language === 'kn';
  const [advocateName, setAdvocateName] = useState('Adv. K. Ramesh (Bar Council of Karnataka)');
  const [reviewStatus, setReviewStatus] = useState<
    'PENDING_REVIEW' | 'VERIFIED_BY_ADVOCATE' | 'CHANGES_REQUESTED'
  >('PENDING_REVIEW');
  const [lawyerNotes, setLawyerNotes] = useState(
    'I have examined the draft Form 21 petition and the One-and-the-Same Person Affidavit. The devolution of 1/4th equal shares across the widow, son, and 2 daughters strictly conforms to Section 6 of the Hindu Succession Act (2005) and Vineeta Sharma (2020). Ensure the death certificate is certified by the Panchayat Development Officer before Taluk submission.'
  );
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyBriefLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/?case=BS-2026-BLR-001&mode=advocate-review`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-stone-900 to-amber-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-amber-100">
                {isKn ? 'ಕಾನೂನು ತಜ್ಞರ ಪರಿಶೀಲನೆ (Human-in-the-Loop Review)' : 'Human-in-the-Loop Legal Counsel Verification'}
              </h3>
              <p className="text-[11px] text-stone-300">
                Independent verification by an enrolled advocate or empanelled revenue consultant
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Status Chip Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
            <div>
              <span className="text-[10px] text-stone-500 uppercase font-mono block">Review Status:</span>
              <strong className="text-sm font-semibold text-stone-900 flex items-center gap-1.5 mt-0.5">
                {reviewStatus === 'PENDING_REVIEW' && (
                  <span className="text-amber-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    Pending Lawyer Review (ಕಾನೂನು ಪರಿಶೀಲನೆ ಬಾಕಿ)
                  </span>
                )}
                {reviewStatus === 'VERIFIED_BY_ADVOCATE' && (
                  <span className="text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Verified & Endorsed by Advocate
                  </span>
                )}
                {reviewStatus === 'CHANGES_REQUESTED' && (
                  <span className="text-rose-800 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Additional Clarification Requested
                  </span>
                )}
              </strong>
            </div>

            <button
              onClick={handleCopyBriefLink}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Share Brief Link'}</span>
            </button>
          </div>

          {/* Case Summary Package */}
          <div className="space-y-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
              Case Package Summary:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-stone-700">
              <div>
                <span className="text-stone-500 block">Khatedar & Property:</span>
                <strong>{record.recorded_owner} (Sy: {record.survey_number})</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Class I Heirs:</span>
                <strong>Widow, 1 Son, 2 Daughters (1/4th Each)</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Flagged Discrepancy:</span>
                <strong className="text-amber-900">Name Variance (RTC vs Aadhaar)</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Prepared Petitions:</span>
                <strong>Form 21 + One-and-Same Person Affidavit</strong>
              </div>
            </div>
          </div>

          {/* Advocate Review Input */}
          <div className="space-y-2">
            <label className="block font-bold text-stone-800">
              Reviewing Advocate Name & Bar Council Registration:
            </label>
            <input
              type="text"
              value={advocateName}
              onChange={(e) => setAdvocateName(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white text-stone-900 font-mono focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-stone-800">
              Professional Legal Opinion & Scrutiny Comments:
            </label>
            <textarea
              rows={4}
              value={lawyerNotes}
              onChange={(e) => setLawyerNotes(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white text-stone-900 leading-relaxed font-serif focus:outline-none"
            />
          </div>

          {/* Review Actions */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-stone-200">
            <button
              onClick={() => setReviewStatus('CHANGES_REQUESTED')}
              className="px-4 py-2 border border-rose-300 text-rose-800 hover:bg-rose-50 rounded-xl font-semibold cursor-pointer"
            >
              Request Changes
            </button>
            <button
              onClick={() => {
                setReviewStatus('VERIFIED_BY_ADVOCATE');
                alert('Advocate endorsement recorded successfully!');
              }}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Endorse & Approve Brief</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
