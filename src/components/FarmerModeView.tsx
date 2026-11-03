import React, { useState } from 'react';
import {
  Camera,
  Mic,
  ArrowRight,
  Volume2,
  VolumeX,
  CheckCircle2,
  HelpCircle,
  FileText,
  Users,
  Building,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { LandRecordDetails } from '../types';

interface FarmerModeViewProps {
  record: LandRecordDetails | null;
  onExitFarmerMode: () => void;
  onTriggerUpload: () => void;
  onTriggerVoice: () => void;
  onTriggerNextSteps: () => void;
}

export const FarmerModeView: React.FC<FarmerModeViewProps> = ({
  record,
  onExitFarmerMode,
  onTriggerUpload,
  onTriggerVoice,
  onTriggerNextSteps,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeFarmerAction, setActiveFarmerAction] = useState<
    'NONE' | 'PHOTO' | 'VOICE' | 'NEXT_STEPS'
  >('NEXT_STEPS');

  // Spoken 5-sentence simplified Kannada explanation
  const spokenKannadaText =
    'ನಮಸ್ಕಾರ. ನಿಮ್ಮ ಸರ್ವೆ ನಂಬರ್ ೧೪೨/೨ಬಿ ಪಹಣಿಯಲ್ಲಿ ದಿವಂಗತ ಮಲ್ಲಪ್ಪ ಗೌಡರ ಹೆಸರು ದಾಖಲಾಗಿದೆ. ಈ ಜಮೀನು ಅವರ ನಿಧನದ ನಂತರ ಕುಟುಂಬದ ಕಾನೂನುಬದ್ಧ ವಾರಸುದಾರರಿಗೆ ವರ್ಗಾವಣೆಯಾಗಬೇಕಿದೆ. ಪತ್ನಿ ಮತ್ತು ಮಕ್ಕಳಿಗೆ ಸಮಾನ ಹಕ್ಕಿದೆ. ಗ್ರಾಮ ಲೆಕ್ಕಿಗರಿಗೆ ನಮೂನೆ ೨೧ ಅರ್ಜಿ ಮತ್ತು ವಂಶವೃಕ್ಷ ಅಫಿಡವಿಟ್ ಸಲ್ಲಿಸಿದರೆ ೩೫ ದಿನಗಳಲ್ಲಿ ನಿಮ್ಮ ಹೆಸರಿಗೆ ಖಾತೆ ಬದಲಾವಣೆಯಾಗುತ್ತದೆ.';

  const handleSpeakSummary = () => {
    if (!('speechSynthesis' in window)) {
      alert('ಧ್ವನಿ ಸೌಲಭ್ಯ ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(spokenKannadaText);
    utterance.lang = 'kn-IN';
    utterance.rate = 0.85; // Slower, clearer cadence for rural elders

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner with High-Contrast Switch */}
      <div className="bg-amber-700 text-white rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-200">
            🌾 ರೈತ ಮಿತ್ರ ಸರಳ ಮೋಡ್ • FARMER MODE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif mt-1">
            ಭೂಮಿಯ ಮಾಹಿತಿ • ಸುಲಭವಾಗಿ ತಿಳಿಯಿರಿ
          </h2>
          <p className="text-xs text-amber-100 mt-0.5">
            ದೊಡ್ಡ ಅಕ್ಷರಗಳು • ನೇರ ಕನ್ನಡ ಧ್ವನಿ • ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ನಿಮ್ಮ ಕೆಲಸ ನೀವೇ ಮಾಡಿ
          </p>
        </div>

        <button
          onClick={onExitFarmerMode}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-bold border border-amber-500/40 cursor-pointer shadow-md"
        >
          ಪೂರ್ಣ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ (Expert Mode)
        </button>
      </div>

      {/* 3 GIANT TOUCH BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Button 1: Take Photo */}
        <button
          onClick={() => {
            setActiveFarmerAction('PHOTO');
            onTriggerUpload();
          }}
          className="p-6 rounded-2xl bg-white border-3 border-emerald-600 hover:bg-emerald-50/50 shadow-md flex flex-col items-center text-center gap-3 cursor-pointer transition-all active:scale-95"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Camera className="w-9 h-9" />
          </div>
          <div>
            <div className="text-lg font-bold text-stone-900">
              ೧. ಪಹಣಿ ಫೋಟೋ ತೆಗೆಯಿರಿ
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Take Photo of RTC / Pahani
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            ಕ್ಲಿಕ್ ಮಾಡಿ
          </span>
        </button>

        {/* Button 2: Ask in Kannada */}
        <button
          onClick={() => {
            setActiveFarmerAction('VOICE');
            onTriggerVoice();
          }}
          className="p-6 rounded-2xl bg-white border-3 border-amber-600 hover:bg-amber-50/50 shadow-md flex flex-col items-center text-center gap-3 cursor-pointer transition-all active:scale-95"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Mic className="w-9 h-9" />
          </div>
          <div>
            <div className="text-lg font-bold text-stone-900">
              ೨. ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Ask Your Doubt in Kannada
            </div>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            ಧ್ವನಿ ಸಹಾಯಕ
          </span>
        </button>

        {/* Button 3: What to do next */}
        <button
          onClick={() => {
            setActiveFarmerAction('NEXT_STEPS');
            onTriggerNextSteps();
          }}
          className="p-6 rounded-2xl bg-white border-3 border-blue-600 hover:bg-blue-50/50 shadow-md flex flex-col items-center text-center gap-3 cursor-pointer transition-all active:scale-95"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <ArrowRight className="w-9 h-9" />
          </div>
          <div>
            <div className="text-lg font-bold text-stone-900">
              ೩. ಮುಂದೇನು ಮಾಡಬೇಕು?
            </div>
            <div className="text-xs text-stone-500 mt-1">
              What Should I Do Next?
            </div>
          </div>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            ಮಾರ್ಗಸೂಚಿ ನೋಡಿ
          </span>
        </button>
      </div>

      {/* Voice Read-Aloud Player Card */}
      <div className="bg-amber-50/80 rounded-2xl border-2 border-amber-400 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSpeakSummary}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white cursor-pointer transition-all shadow-md ${
                isPlayingAudio
                  ? 'bg-rose-600 animate-pulse'
                  : 'bg-emerald-700 hover:bg-emerald-800'
              }`}
              title="ಕೇಳಲು ಇಲ್ಲಿ ಒತ್ತಿ"
            >
              {isPlayingAudio ? (
                <VolumeX className="w-7 h-7" />
              ) : (
                <Volume2 className="w-7 h-7" />
              )}
            </button>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                {isPlayingAudio ? '🔊 ಧ್ವನಿ ವಿವರಣೆ ಓದಲಾಗುತ್ತಿದೆ...' : '🔊 ನಿಮ್ಮ ಜಮೀನಿನ ವಿವರವನ್ನು ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ'}
              </h3>
              <p className="text-xs text-stone-600">
                ಕೇಳಲು ಎಡಭಾಗದ ಹಸಿರು ಬಟನ್ ಒತ್ತಿರಿ (Click green button to listen)
              </p>
            </div>
          </div>

          <button
            onClick={handleSpeakSummary}
            className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold shadow hover:bg-emerald-900 cursor-pointer self-start sm:self-auto"
          >
            {isPlayingAudio ? 'ನಿಲ್ಲಿಸಿ (Stop)' : 'ಧ್ವನಿ ಆರಂಭಿಸಿ (Play Audio)'}
          </button>
        </div>

        {/* 5-Sentence Plain Text Kannada Summary */}
        <div className="bg-white rounded-xl p-4 border border-amber-200 text-sm sm:text-base leading-relaxed text-stone-900 font-serif">
          {spokenKannadaText}
        </div>
      </div>

      {/* 3 ICON-BASED CLEAR NEXT STEPS (NO JARGON) */}
      <div className="bg-white rounded-2xl border-2 border-stone-300 p-5 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
          <span>🎯</span>
          <span>ರೈತರು ಮಾಡಬೇಕಾದ ೩ ಸುಲಭ ಹಂತಗಳು (3 Clear Steps):</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
              ೧
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              ಮರಣ ಪ್ರಮಾಣ ಪತ್ರ & ವಂಶವೃಕ್ಷ
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              ತಹಶೀಲ್ದಾರ್ ಕಚೇರಿ ಅಥವಾ ನಾಡಕಚೇರಿಯಲ್ಲಿ ಅಧಿಕೃತ ಮರಣ ಪ್ರಮಾಣ ಪತ್ರ ಹಾಗೂ ಕುಟುಂಬದ ವಂಶವೃಕ್ಷ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ.
            </p>
            <div className="text-[11px] text-amber-800 font-semibold pt-1">
              • ಶುಲ್ಕ: ಕೇವಲ ₹೪೦
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              ೨
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              ಗ್ರಾಮ ಲೆಕ್ಕಿಗರಿಗೆ (VA) ನಮೂನೆ ೨೧
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              ನಮ್ಮ ಸಿಸ್ಟಂ ಸಿದ್ಧಪಡಿಸಿದ ನಮೂನೆ ೨೧ ಅರ್ಜಿ ಹಾಗೂ ಸಹಿ ಮಾಡಿದ ಅಫಿಡವಿಟ್‌ ಅನ್ನು ಗ್ರಾಮ ಲೆಕ್ಕಿಗರಿಗೆ ನೀಡಿ ಸ್ವೀಕೃತಿ (ಅಕ್ನಾಲೆಡ್ಜ್‌ಮೆಂಟ್) ಪಡೆಯಿರಿ.
            </p>
            <div className="text-[11px] text-blue-800 font-semibold pt-1">
              • ಸಕಾಲ ಕಾಲಮಿತಿ: ೩೫ ದಿನಗಳು
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
              ೩
            </div>
            <h4 className="font-bold text-sm text-stone-900">
              ಹೊಸ ಪಹಣಿ & ಪ್ಯಾಕ್ಸ್ (PACS) ಸಾಲ
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              ಖಾತೆ ಮಂಜೂರಾದ ತಕ್ಷಣ ನಿಮ್ಮ ಹೆಸರಿನ ಹೊಸ ಪಹಣಿ ಪಡೆದು, ೪% ಕಡಿಮೆ ಬಡ್ಡಿದರದ ಸರ್ಕಾರಿ ಬೆಳೆ ಸಾಲಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.
            </p>
            <div className="text-[11px] text-emerald-800 font-semibold pt-1">
              • ಉಳಿತಾಯ: ವಾರ್ಷಿಕ ₹೬೪,೦೦೦/-
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
