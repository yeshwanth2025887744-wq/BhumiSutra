import React, { useState, useEffect } from 'react';
import {
  Mic,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  Loader2,
  Globe,
  Radio,
  RotateCcw,
} from 'lucide-react';

interface KannadaVoiceAssistantProps {
  language: 'en' | 'kn';
  surveyNumber: string;
}

export const KannadaVoiceAssistant: React.FC<KannadaVoiceAssistantProps> = ({
  language,
  surveyNumber,
}) => {
  const isKn = language === 'kn';
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState<string>(
    isKn
      ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಭೂಮಿಸೂತ್ರ ಕಂದಾಯ ಸಹಾಯಕ. ನಿಮ್ಮ RTC ಪಹಣಿ, ಮ್ಯುಟೇಷನ್ (ಖಾತೆ ಬದಲಾವಣೆ), ವಂಶವೃಕ್ಷ ಅಥವಾ ಕಾಲಂ ೧೧ ರ ಸಾಲ ರದ್ದತಿಯ ಬಗ್ಗೆ ಕನ್ನಡದಲ್ಲೇ ಪ್ರಶ್ನೆ ಕೇಳಿ.'
      : 'Namaste! I am your BhumiSutra revenue assistant. Ask any question in Kannada or English regarding your RTC mutation, family pedigree, or bank encumbrances.'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Pre-loaded regional prompts for farmers
  const voicePrompts = [
    {
      kn: 'ನನ್ನ ಜಮೀನಿನ RTC ಯಲ್ಲಿ ಹೆಸರು ಬದಲಾವಣೆ ಹೇಗೆ ಮಾಡುವುದು?',
      en: 'How to change name (mutation) in RTC after father’s death?',
    },
    {
      kn: 'ಹೆಣ್ಣು ಮಕ್ಕಳಿಗೆ ಕೃಷಿ ಜಮೀನಿನಲ್ಲಿ ಸಮಪಾಲು ಇದೆಯೇ?',
      en: 'Do married daughters have equal share in ancestral land under HSA 2005?',
    },
    {
      kn: 'ಕಾಲಂ ೧೧ ರಲ್ಲಿರುವ ಬ್ಯಾಂಕ್ ಬೆಳೆ ಸಾಲ ರದ್ದು ಮಾಡುವುದು ಹೇಗೆ?',
      en: 'How to remove the crop loan lien marked in Column 11?',
    },
    {
      kn: '೩೦ ದಿನಗಳ ನಮೂನೆ ೧೨ ಆಕ್ಷೇಪಣಾ ಅವಧಿಯ ನಿಯಮಗಳೇನು?',
      en: 'What are the rules for the 30-day Form 12 public notice period?',
    },
  ];

  const handleSpeak = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = textToSpeak.replace(/[*#_`-]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isKn ? 'kn-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendQuery = async (queryText?: string) => {
    const text = queryText || inputText;
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    if (!queryText) setInputText('');

    try {
      const res = await fetch('/api/chat-legal-counsel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: isKn ? 'kn' : 'en',
          context: { survey_number: surveyNumber },
        }),
      });

      const json = await res.json();
      if (json.reply) {
        setResponse(json.reply);
        // Automatically speak response for voice experience
        handleSpeak(json.reply);
      }
    } catch (e) {
      setResponse(isKn ? 'ಮಾಹಿತಿ ಪಡೆಯುವಲ್ಲಿ ದೋಷ ಕಂಡುಬಂದಿದೆ.' : 'Error getting counsel response.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleListenMic = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in (window as any))) {
      alert(isKn ? 'ನಿಮ್ಮ ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ. ಕೆಳಗಿನ ಪ್ರಶ್ನೆಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.' : 'Speech recognition not supported in this browser. Please use the quick prompt buttons.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = isKn ? 'kn-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendQuery(transcript);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              FEATURE 4
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ಕನ್ನಡ ಧ್ವನಿ ಸಹಾಯಕ ಮತ್ತು ವಿವರಣೆ' : 'Kannada Rural AI Voice Assistant'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            {isKn ? 'ಕನ್ನಡ ಧ್ವನಿ ಮತ್ತು ಕಂದಾಯ ಮಾರ್ಗದರ್ಶಿ' : 'Spoken Kannada & English Revenue Counsel'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ರೈತರು ಕಷ್ಟಕರವಾದ ಕಂದಾಯ ಪದಗಳ ಬದಲಿಗೆ ನೇರವಾಗಿ ಮಾತನಾಡಿ ವಿವರಣೆ ಪಡೆಯಬಹುದು'
              : 'Enables rural farmers to ask in spoken Kannada and listen to audio explanations'}
          </p>
        </div>

        <button
          onClick={() => handleSpeak(response)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border ${
            isSpeaking
              ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
              : 'bg-stone-800 text-stone-200 hover:text-white border-stone-700'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>{isKn ? 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ' : 'Stop Audio'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>{isKn ? 'ಧ್ವನಿ ಆಲಿಸಿ' : 'Listen Audio'}</span>
            </>
          )}
        </button>
      </div>

      <div className="p-6 space-y-5">
        {/* Quick Voice Chips */}
        <div>
          <span className="text-[11px] font-mono uppercase font-bold text-stone-500 block mb-2">
            {isKn ? 'ರೈತರು ಹೆಚ್ಚಾಗಿ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು (ಒಂದು ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಆಲಿಸಿ):' : 'Frequently Asked Rural Questions (Click to Ask):'}
          </span>
          <div className="flex flex-wrap gap-2">
            {voicePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(isKn ? p.kn : p.en)}
                disabled={isLoading}
                className="px-3 py-1.5 bg-stone-50 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-stone-200 text-stone-700 text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{isKn ? p.kn : p.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Audio Speech Box */}
        <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              {isKn ? 'ಕಂದಾಯ ವಕೀಲರ ವಿವರಣೆ (Kannada Counsel Response):' : 'Revenue Legal Explanation:'}
            </span>

            {isLoading && (
              <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{isKn ? 'ಉತ್ತರ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...' : 'Generating explanation...'}</span>
              </span>
            )}
          </div>

          <div className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans whitespace-pre-wrap bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            {response}
          </div>
        </div>

        {/* Mic & Input Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleListenMic}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
              isListening
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-sm'
            }`}
            title={isKn ? 'ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ' : 'Speak via Microphone'}
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            placeholder={
              isKn
                ? 'ಕನ್ನಡದಲ್ಲಿ ಪ್ರಶ್ನೆ ಟೈಪ್ ಮಾಡಿ... (ಉದಾ: ಮ್ಯುಟೇಷನ್ ಎಷ್ಟು ದಿನ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ?)'
                : 'Ask anything in English or Kannada (e.g. How many days for Sakala mutation?)'
            }
            className="flex-1 text-xs sm:text-sm p-3 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
            disabled={isLoading}
          />

          <button
            onClick={() => handleSendQuery()}
            disabled={isLoading || !inputText.trim()}
            className="p-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl shadow transition-colors cursor-pointer disabled:opacity-40 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
