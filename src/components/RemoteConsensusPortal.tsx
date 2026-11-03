import React, { useState } from 'react';
import {
  Users,
  Send,
  CheckCircle2,
  Clock,
  FileCheck,
  ShieldCheck,
  Globe,
  MapPin,
  Sparkles,
  Smartphone,
  Check,
  FileSignature,
} from 'lucide-react';
import { FamilyMember } from '../types';

interface RemoteConsensusPortalProps {
  familyMembers: FamilyMember[];
  onUpdateHeirConsent: (id: string, status: 'VERIFIED' | 'SIGNED_NOC') => void;
  language: 'en' | 'kn';
  surveyNumber: string;
}

export const RemoteConsensusPortal: React.FC<RemoteConsensusPortalProps> = ({
  familyMembers,
  onUpdateHeirConsent,
  language,
  surveyNumber,
}) => {
  const isKn = language === 'kn';
  const [signingId, setSigningId] = useState<string | null>(null);
  const [dispatchAlert, setDispatchAlert] = useState<string | null>(null);

  const handleSimulateConsent = (id: string, action: 'VERIFIED' | 'SIGNED_NOC') => {
    setSigningId(id);
    setTimeout(() => {
      onUpdateHeirConsent(id, action);
      setSigningId(null);
      setDispatchAlert(
        isKn
          ? `ಡಿಜಿಟಲ್ ಪರಿಶೀಲನೆ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ (ನಮೂನೆ ೨೧ ಅರ್ಜಿ ಪ್ಯಾಕೆಟ್‌ಗೆ ಸೇರಿಸಲಾಗಿದೆ).`
          : `Digital consent verified & added to the Revenue Inspector's Form 21 packet.`
      );
      setTimeout(() => setDispatchAlert(null), 3000);
    }, 800);
  };

  const allConsented = familyMembers.every(
    (m) => m.consentStatus === 'VERIFIED' || m.consentStatus === 'SIGNED_NOC'
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              KILLER FEATURE B
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ದೂರದ ಊರುಗಳಲ್ಲಿರುವ ವಾರಸುದಾರರ ಡಿಜಿಟಲ್ ಒಪ್ಪಿಗೆ' : 'Remote Co-Heir Consensus & Multi-Party Sign-Off'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            {isKn ? 'ಸ್ಥಳಾಂತರಗೊಂಡ ವಾರಸುದಾರರ ಡಿಜಿಟಲ್ ಸಮ್ಮತಿ ಪೋರ್ಟಲ್' : 'Urban-Migrated Co-Heir Consensus Simulator'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ಬೆಂಗಳೂರು, ಮೈಸೂರು ಅಥವಾ ವಿದೇಶಗಳಲ್ಲಿರುವ ವಾರಸುದಾರರು ತಾಲೂಕು ಕಚೇರಿಗೆ ಬಾರದೆ ಆನ್‌ಲೈನ್ ಮೂಲಕ ಹಕ್ಕು ಬಿಡು ಪತ್ರ / ಒಪ್ಪಿಗೆ ನೀಡುವ ವ್ಯವಸ್ಥೆ'
              : 'Solves the rural-to-urban migration bottleneck by coordinating remote Aadhaar e-Sign consents'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
              allConsented
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                : 'bg-amber-950/80 text-amber-300 border-amber-700/60'
            }`}
          >
            {allConsented
              ? isKn ? '೧೦೦% ಒಪ್ಪಿಗೆ ಪೂರ್ಣ' : '100% Consensus Achieved'
              : isKn ? 'ಸಹಿ ಬಾಕಿ ಇದೆ' : 'Signatures Pending'}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Toast Alert */}
        {dispatchAlert && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{dispatchAlert}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {familyMembers.map((member) => {
            const isSigned = member.consentStatus === 'VERIFIED' || member.consentStatus === 'SIGNED_NOC';
            const isNoc = member.consentStatus === 'SIGNED_NOC' || member.isNocOrRelinquishing;

            return (
              <div
                key={member.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isSigned
                    ? 'bg-emerald-50/40 border-emerald-300/80'
                    : 'bg-stone-50/70 border-stone-200 hover:border-amber-400'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-bold text-stone-900 text-sm font-serif">
                      {isKn && member.kannada_name ? member.kannada_name : member.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isSigned
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {isSigned
                        ? isNoc ? 'SIGNED e-NOC' : 'VERIFIED'
                        : 'PENDING SIGN'}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-medium">{member.relationship}</p>

                  <div className="mt-3 space-y-1.5 text-xs text-stone-500 font-mono">
                    <div className="flex items-center gap-1.5 text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{member.currentCity || (isKn ? 'ಗ್ರಾಮದಲ್ಲಿದ್ದಾರೆ' : 'Local Village')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <Smartphone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{member.phoneNumber || '+91 98450 XXXXX'}</span>
                    </div>
                  </div>

                  <div className="mt-3 p-2 rounded bg-white border border-stone-200 text-[11px] text-stone-600">
                    <span className="text-[10px] uppercase font-mono text-stone-400 block">
                      Aadhaar ID Proof:
                    </span>
                    <span className="font-semibold text-stone-800">{member.aadhaarName}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between gap-2">
                  {isSigned ? (
                    <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>{isNoc ? (isKn ? 'ಹಕ್ಕು ಬಿಡು ಪತ್ರ ಸಲ್ಲಿಸಲಾಗಿದೆ' : 'e-NOC Executed') : (isKn ? 'ಡಿಜಿಟಲ್ ಸಮ್ಮತಿ ದೃಢಪಟ್ಟಿದೆ' : 'Consent Recorded')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => handleSimulateConsent(member.id, 'VERIFIED')}
                        disabled={signingId === member.id}
                        className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>{isKn ? 'ಒಪ್ಪಿಗೆ ದಾಖಲಿಸಿ' : 'Simulate Consent'}</span>
                      </button>

                      <button
                        onClick={() => handleSimulateConsent(member.id, 'SIGNED_NOC')}
                        disabled={signingId === member.id}
                        className="py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors border border-stone-300 disabled:opacity-50"
                        title={isKn ? 'ಹಕ್ಕು ಬಿಡು ಪತ್ರ (e-NOC)' : 'Sign Relinquishment e-NOC'}
                      >
                        <FileSignature className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Packet compilation status */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <strong className="text-stone-800">
              {isKn ? 'ಕಂದಾಯ ನಿರೀಕ್ಷಕರ (RI) ಸಲ್ಲಿಕೆ ಪ್ಯಾಕೆಟ್:' : 'Revenue Inspector Submission Packet:'}
            </strong>{' '}
            <span className="text-stone-600">
              {allConsented
                ? isKn
                  ? 'ಎಲ್ಲಾ ವಾರಸುದಾರರ ಡಿಜಿಟಲ್ ಸಹಿ ಮತ್ತು ಅಫಿಡವಿಟ್ ಪೂರ್ಣಗೊಂಡಿದ್ದು, ನಮೂನೆ ೨೧ ರೊಂದಿಗೆ ಲಗತ್ತಿಸಲಾಗಿದೆ.'
                  : 'All co-heir consents and e-NOCs compiled into the Form 21 Taluk dossier.'
                : isKn
                ? 'ಬಾಕಿ ಇರುವ ವಾರಸುದಾರರಿಗೆ ವಾಟ್ಸಾಪ್/ಎಸ್‌ಎಂಎಸ್ ಲಿಂಕ್ ರವಾನಿಸಿ ಆನ್‌ಲೈನ್ ಒಪ್ಪಿಗೆ ಪಡೆಯಿರಿ.'
                : 'Share links dispatched to remote heirs for remote Aadhaar authentication.'}
            </span>
          </div>

          <div className="font-mono text-[11px] text-stone-500 bg-white px-3 py-1 rounded border">
            Survey No: {surveyNumber}
          </div>
        </div>
      </div>
    </div>
  );
};
