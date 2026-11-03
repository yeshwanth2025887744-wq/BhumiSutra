import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Play,
  RotateCcw,
  Sparkles,
  Timer,
  CheckCircle2,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { SAMPLE_LAND_RECORDS, SampleLandRecord } from '../data/sampleRecords';

interface HackathonDemoBarProps {
  onSelectCase: (sample: SampleLandRecord) => void;
  activeCaseId: string;
  language: 'en' | 'kn';
}

export const HackathonDemoBar: React.FC<HackathonDemoBarProps> = ({
  onSelectCase,
  activeCaseId,
  language,
}) => {
  const isKn = language === 'kn';
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (timerRunning) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border border-amber-800/50 rounded-2xl p-4 text-white shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Pitch Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm font-serif text-white tracking-wide">
                Tech4Bharat • Bangalore Palace Hackathon Mode
              </span>
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                3-Min Demo
              </span>
            </div>
            <p className="text-[11px] text-amber-200/70">
              {isKn
                ? 'ತೀರ್ಪುಗಾರರಿಗೆ ನೇರ ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ನೀಡಲು ೧-ಕ್ಲಿಕ್ ನೈಜ ಕಂದಾಯ ಪ್ರಕರಣಗಳು'
                : '1-Click authentic revenue test cases ready for live presentation to judges'}
            </p>
          </div>
        </div>

        {/* 3-Minute Demo Timer & Case Selectors */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
          {/* Preset Case Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-950/80 rounded-xl border border-stone-800">
            {SAMPLE_LAND_RECORDS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onSelectCase(sample)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                  activeCaseId === sample.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white hover:bg-stone-850'
                }`}
              >
                <span>{sample.id === 'karnataka-devanahalli' ? 'Devanahalli Farm' : sample.id === 'karnataka-mandya' ? 'Mandya Sugarcane' : 'Pune 7/12'}</span>
              </button>
            ))}
          </div>

          {/* Stopwatch */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-950/80 rounded-xl border border-stone-800 text-xs font-mono">
            <Timer className="w-3.5 h-3.5 text-amber-400" />
            <span className={`font-bold ${seconds >= 180 ? 'text-rose-400 animate-pulse' : 'text-stone-200'}`}>
              {formatTime(seconds)} / 3:00
            </span>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-1 hover:text-amber-300 transition-colors cursor-pointer"
              title={timerRunning ? 'Pause timer' : 'Start 3-min pitch timer'}
            >
              <Play className={`w-3 h-3 ${timerRunning ? 'text-amber-400' : 'text-stone-400'}`} />
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setSeconds(0);
              }}
              className="p-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
              title="Reset timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
