import React, { useState } from 'react';
import {
  X,
  Shield,
  ShieldCheck,
  Lock,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';

interface AadhaarPrivacyShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteData: () => void;
  language: 'en' | 'kn';
}

export const AadhaarPrivacyShieldModal: React.FC<AadhaarPrivacyShieldModalProps> = ({
  isOpen,
  onClose,
  onDeleteData,
  language,
}) => {
  if (!isOpen) return null;
  const isKn = language === 'kn';

  const [hasUserConsent, setHasUserConsent] = useState(true);
  const [showMaskPreview, setShowMaskPreview] = useState(false);

  const sampleUnmasked = '5482 9104 3819';
  const sampleMasked = 'XXXX XXXX 3819';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-stone-900 to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-emerald-100">
                {isKn ? 'ಆಧಾರ್ ಮತ್ತು ಡೇಟಾ ಗೌಪ್ಯತಾ ಶೀಲ್ಡ್' : 'Aadhaar Privacy Shield & Data Protection'}
              </h3>
              <p className="text-[11px] text-stone-300">
                Automated 8-digit masking compliant with UIDAI & DPDP Act 2023
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

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Visual Masking Comparison */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-stone-700 font-bold uppercase tracking-wider text-[11px]">
              <span>Before & After Masking Preview:</span>
              <button
                onClick={() => setShowMaskPreview(!showMaskPreview)}
                className="text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer font-sans normal-case"
              >
                {showMaskPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showMaskPreview ? 'Hide Raw' : 'Toggle Preview'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-center">
                <span className="text-[10px] text-rose-800 block font-semibold">Unmasked Input:</span>
                <span className="font-mono text-xs text-rose-950 line-through">
                  {showMaskPreview ? sampleUnmasked : '•••• •••• ••••'}
                </span>
              </div>
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-center">
                <span className="text-[10px] text-emerald-800 block font-semibold">Protected Output:</span>
                <span className="font-mono text-xs font-bold text-emerald-950">
                  {sampleMasked}
                </span>
              </div>
            </div>
          </div>

          {/* Privacy Rules List */}
          <div className="space-y-2 text-stone-700 leading-relaxed font-sans">
            <p>
              • <strong className="text-stone-900">Zero Local Storage:</strong> Identity numbers are stripped before document frames are passed to AI reasoning models.
            </p>
            <p>
              • <strong className="text-stone-900">Ephemeral Processing:</strong> Uploaded revenue extracts are analyzed in runtime memory without persistence on third-party servers.
            </p>
            <p>
              • <strong className="text-stone-900">Statutory Purpose Limitation:</strong> Data is utilized exclusively for generating succession checklists and mutation drafts.
            </p>
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 cursor-pointer">
            <input
              type="checkbox"
              checked={hasUserConsent}
              onChange={(e) => setHasUserConsent(e.target.checked)}
              className="mt-0.5 rounded text-emerald-600 focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-emerald-950 font-medium">
              {isKn
                ? 'ನನ್ನ ಕಂದಾಯ ದಾಖಲೆಗಳನ್ನು ವಾರಸು ವರದಿ ಸಿದ್ಧಪಡಿಸಲು ಮಾತ್ರ ತಾತ್ಕಾಲಿಕವಾಗಿ ವಿಶ್ಲೇಷಿಸಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.'
                : 'I consent to temporary in-memory analysis of land documents strictly for succession roadmap generation.'}
            </span>
          </label>

          {/* Delete Data Button */}
          <div className="pt-2 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete all cached session data and reset?')) {
                  onDeleteData();
                  onClose();
                }
              }}
              className="px-3.5 py-2 text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>{isKn ? 'ನನ್ನ ಡೇಟಾ ಅಳಿಸಿ (Delete Data)' : 'Delete My Data & Reset'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold cursor-pointer"
            >
              Close Shield
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
