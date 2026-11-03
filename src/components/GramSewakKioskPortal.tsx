import React, { useState } from 'react';
import {
  Store,
  Mic,
  Camera,
  CheckCircle2,
  Volume2,
  FileText,
  User,
  Sparkles,
  Smartphone,
  Check,
  AlertCircle,
  VolumeX,
} from 'lucide-react';

interface GramSewakKioskPortalProps {
  language: 'en' | 'kn';
  surveyNumber: string;
}

export const GramSewakKioskPortal: React.FC<GramSewakKioskPortalProps> = ({
  language,
  surveyNumber,
}) => {
  const isKn = language === 'kn';

  const [farmerName, setFarmerName] = useState('Appaiah (ಅಪ್ಪಯ್ಯ)');
  const [operatorName, setOperatorName] = useState('Manjunath (Kiosk Operator - Grama One)');
  const [voiceNotes, setVoiceNotes] = useState(
    'ಅಪ್ಪಯ್ಯ ಅವರು ದೇವನಹಳ್ಳಿ ತಾಲೂಕಿನ ಸರ್ವೆ ನಂ. ೧೪೨/೨ಬಿ ಜಮೀನಿನ ಖಾತೆಯನ್ನು ತೀರಿಹೋದ ತಂದೆಯ ಹೆಸರಿನಿಂದ ತಮ್ಮ ಇಬ್ಬರು ಮಕ್ಕಳು ಮತ್ತು ಪತ್ನಿಗೆ ವಾರಸು ಮಾಡಲು ಬಂದಿದ್ದಾರೆ. ಕೆನರಾ ಬ್ಯಾಂಕ್ ಸಾಲ ಪಾವತಿಸಿದ್ದು ಎನ್‌ಡಿಸಿ ಬಾಕಿ ಇದೆ.'
  );

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [photoStatus, setPhotoStatus] = useState<Record<string, boolean>>({
    rtc: true,
    death_cert: true,
    aadhaar: true,
    vamshavriksha: false,
  });

  const audioSummaryScript = `ನಮಸ್ಕಾರ ಅಪ್ಪಯ್ಯನವರೇ, ನಿಮ್ಮ ಸರ್ವೆ ನಂಬರ್ ೧೪೨/೨ಬಿ ಜಮೀನಿನ ವಾರಸು ಮ್ಯುಟೇಷನ್‌ಗಾಗಿ ಅರ್ಜಿ ವಿವರಗಳನ್ನು ದಾಖಲಿಸಿಕೊಳ್ಳಲಾಗಿದೆ. ನಿಮ್ಮ ಪತ್ನಿ ಗೌರಮ್ಮ, ಮಗ ವೆಂಕಟೇಶ್ ಮತ್ತು ಮಗಳು ಲತಾ ರವರ ಹೆಸರುಗಳನ್ನು ನಮೂನೆ ೨೧ ರಲ್ಲಿ ಸೇರಿಸಲಾಗಿದೆ. ನಾಡಕಚೇರಿ ವಂಶವೃಕ್ಷ ಮತ್ತು ಕೆನರಾ ಬ್ಯಾಂಕ್ ಎನ್‌ಡಿಸಿ ಪ್ರತಿ ಲಗತ್ತಿಸಿದ ನಂತರ ತಾಲೂಕು ಕಚೇರಿಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.`;

  const handleSpeakAudio = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(audioSummaryScript);
    utterance.lang = 'kn-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const togglePhoto = (key: string) => {
    setPhotoStatus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              NEXT-LEVEL IDEA: GRAMSEWAK AI
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ಗ್ರಾಮ ಒನ್ & ಸಿಎಸ್‌ಸಿ ಕಿಯೋಸ್ಕ್ ಆಪರೇಟರ್ ವಾಯ್ಸ್ ಇಂಟರ್ಫೇಸ್' : 'Offline-First Voice Workflow for Village CSC Operators'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" />
            {isKn ? 'ಗ್ರಾಮಸೇವಕ್ ಎಐ: ಗ್ರಾಮ ಒನ್ ಆಪರೇಟರ್ ಇಂಟರ್ಫೇಸ್' : 'GramSewak AI: Village CSC Kiosk Operator Workflow'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ಆಪರೇಟರ್ ರೈತರೊಂದಿಗೆ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ, ಮೊಬೈಲ್ ಫೋಟೋ ತೆಗೆದು, ರೈತರಿಗೆ ಕೇಳುವ ಆಡಿಯೋ ಸಾರಾಂಶದೊಂದಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವ್ಯವಸ್ಥೆ'
              : 'Enables rural operators to convert spoken farmer conversations into verified revenue dossiers'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-stone-800 text-stone-200 border border-stone-700">
            Grama One Center • Devanahalli
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Operator & Farmer Identity Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
          <div>
            <label className="block text-[11px] font-mono font-bold text-stone-500 uppercase mb-1">
              {isKn ? 'ಕಿಯೋಸ್ಕ್ ಆಪರೇಟರ್ ಹೆಸರು:' : 'Kiosk Operator Name:'}
            </label>
            <div className="font-semibold text-stone-900 font-mono flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              <span>{operatorName}</span>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-mono font-bold text-stone-500 uppercase mb-1">
              {isKn ? 'ಅರ್ಜಿದಾರ ರೈತರು:' : 'Visiting Farmer:'}
            </label>
            <div className="font-semibold text-stone-900 font-mono flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>{farmerName}</span>
            </div>
          </div>
        </div>

        {/* Conversational Voice Intake Note */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold font-mono text-stone-700 uppercase tracking-wide flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-emerald-600" />
              <span>{isKn ? 'ರೈತರ ಸಂಭಾಷಣೆಯ ಧ್ವನಿ ನಮೂದು (Spoken Voice Intake):' : 'Spoken Conversation Transcript:'}</span>
            </label>
            <span className="text-[10px] text-stone-500 font-mono">Real-time transcribed</span>
          </div>
          <textarea
            rows={3}
            value={voiceNotes}
            onChange={(e) => setVoiceNotes(e.target.value)}
            className="w-full text-xs font-sans p-3 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-emerald-500 outline-none leading-relaxed"
          />
        </div>

        {/* Structured Revenue Form Auto-Population Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-stone-200">
            <span className="text-[10px] font-mono uppercase text-stone-400 block">Identified Survey No:</span>
            <span className="font-mono font-bold text-stone-800 text-sm">142/2B (2 Acres 18 Gts)</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200">
            <span className="text-[10px] font-mono uppercase text-stone-400 block">Intended Action:</span>
            <span className="font-bold text-amber-900">Varasa Mutation (ವಾರಸು ಖಾತೆ)</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-stone-200">
            <span className="text-[10px] font-mono uppercase text-stone-400 block">Identified Heirs:</span>
            <span className="font-semibold text-stone-800">3 Co-Heirs (Widow, Son, Daughter)</span>
          </div>
        </div>

        {/* Document Photo Checklist (Smartphone Camera Intake) */}
        <div>
          <span className="text-xs font-bold font-mono text-stone-700 uppercase tracking-wide block mb-3">
            {isKn ? 'ದಾಖಲೆಗಳ ಮೊಬೈಲ್ ಫೋಟೋ ಪರಿಶೀಲನೆ (Document Camera Intake):' : 'Physical Document Camera Intake:'}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'rtc', label: isKn ? 'ಮೂಲ ಪಹಣಿ (RTC)' : 'RTC Pahani Copy' },
              { id: 'death_cert', label: isKn ? 'ಮರಣ ಪ್ರಮಾಣಪತ್ರ' : 'Death Certificate' },
              { id: 'aadhaar', label: isKn ? 'ಆಧಾರ್ ಕಾರ್ಡ್‌ಗಳು' : 'Aadhaar ID Cards' },
              { id: 'vamshavriksha', label: isKn ? 'ವಂಶವೃಕ್ಷ ಪ್ರಮಾಣಪತ್ರ' : 'Vamshavriksha' },
            ].map((doc) => {
              const isCaptured = photoStatus[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => togglePhoto(doc.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isCaptured
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-stone-50 border-dashed border-stone-300 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Camera className={`w-4 h-4 ${isCaptured ? 'text-emerald-600' : 'text-stone-400'}`} />
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isCaptured ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {isCaptured ? 'CAPTURED' : 'PENDING'}
                    </span>
                  </div>
                  <span className="font-semibold text-stone-800 text-xs">{doc.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Farmer Audio Verification Box */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <strong className="text-xs text-emerald-950 font-serif">
                {isKn ? 'ರೈತರಿಗೆ ಧ್ವನಿ ಸಾರಾಂಶ ದೃಢೀಕರಣ (Kannada Audio Summary for Farmer):' : 'Farmer Audio Summary Verification:'}
              </strong>
            </div>
            <p className="text-xs text-emerald-900 mt-1 max-w-2xl leading-relaxed">
              {audioSummaryScript}
            </p>
          </div>

          <button
            onClick={handleSpeakAudio}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0 ${
              isSpeaking
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{isKn ? 'ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ' : 'Stop Audio'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{isKn ? 'ರೈತರಿಗೆ ಧ್ವನಿ ಪ್ಲೇ ಮಾಡಿ' : 'Play to Farmer'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
