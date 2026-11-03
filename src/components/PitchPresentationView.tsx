import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Building,
  Scale,
  Landmark,
} from 'lucide-react';

interface PitchPresentationViewProps {
  language: 'en' | 'kn';
  onNavigateToTab: (tab: string) => void;
}

export const PitchPresentationView: React.FC<PitchPresentationViewProps> = ({
  language,
  onNavigateToTab,
}) => {
  const isKn = language === 'kn';
  const [currentSlide, setCurrentSlide] = useState(0);

  // 3-Minute Presentation Timer (180 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((sec) => sec - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(180);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const slides = [
    {
      id: 'slide-1',
      number: '01',
      title: 'The Rural Land Crisis: 35% of Land Stuck Under Deceased Ancestors',
      subtitle: 'The Invisible Bottleneck in Indian Agriculture',
      keyPoint:
        'When a rural patriarch dies, the land remains stuck in his name for 10 to 30 years on the RTC / Pahani. Without a mutated title, families cannot take bank crop loans, divide parcels peacefully, or access PM-KISAN, forcing them into 36% interest debt traps with local moneylenders.',
      stats: '1.4 Crore Parcels in Karnataka • 14 Crore Nationally • 180+ Days Average Delay',
      speakerNotes:
        'Judges, imagine inheriting 2 acres from your late grandfather, but the bank turns you away because the revenue record still lists him as alive. Middlemen demand ₹30,000 you don’t have. This is the reality for 35% of farming families.',
    },
    {
      id: 'slide-2',
      number: '02',
      title: 'Who It Affects: Smallholder Farmers & Migrated Siblings',
      subtitle: 'The Urban-Rural Geographical Disconnect',
      keyPoint:
        'Under the Hindu Succession Amendment Act (2005), daughters have equal coparcenary rights by birth. But daughters and younger sons often work in Bengaluru or Mysuru. Coordinating physical signatures, resolving spelling mismatches across Aadhaar vs RTC, and navigating Taluk bureaucracy stalls mutations indefinitely.',
      stats: '68% of rejections triggered by simple initials/spelling variances • 4+ Taluk office visits',
      speakerNotes:
        'It’s not just land; it’s families torn apart by confusion. A daughter in Whitefield wants to give consent, but there’s no way for her to do so without taking unpaid leave to stand in a rural Taluk queue.',
    },
    {
      id: 'slide-3',
      number: '03',
      title: 'Our Solution: BhumiSutra Agentic Intelligence Engine',
      subtitle: 'From Land Confusion to Land Clarity',
      keyPoint:
        'BhumiSutra is not a conversational chatbot—it is an autonomous 6-agent problem-solving pipeline that reads regional land records (RTC/Satbara), extracts cadastral data, cross-verifies Aadhaar IDs, calculates statutory shares, drafts court-admissible petitions, and unlocks formal PACS banking credit.',
      stats: '6 Autonomous Agents • Bilingual Kannada/English • Zero Hallucination Standard',
      speakerNotes:
        'We built BhumiSutra: an Agentic AI engine grounded in the Karnataka Land Revenue Act. It doesn’t just answer questions; it audits 30-year chains, flags anomalies neutrally, and drafts ready-to-print Form 21 petitions.',
    },
    {
      id: 'slide-4',
      number: '04',
      title: 'Live Technological Innovations Demonstrated Today',
      subtitle: 'Groundbreaking Features for Tech4Bharat',
      keyPoint:
        '1. Highlight-on-Document Evidence Viewer (bounding box overlays).\n2. Remote Co-Heir Consensus Portal for urban migrants.\n3. SankatMochan Pre-Litigation Dispute Mediator.\n4. Sahukar Shield Moneylender Trap Detector & PACS Refinancing Calculator.\n5. GramSewak Offline Voice Assistant for village kiosks.',
      stats: 'End-to-End Workflow in Under 90 Seconds • Instant Bounding Box Citations',
      speakerNotes:
        'Notice our Highlight-on-Document viewer: when you click an extracted owner or extent, our Trust Engine highlights the exact coordinate on the original scanned RTC. Zero blind trust.',
    },
    {
      id: 'slide-5',
      number: '05',
      title: 'Trust & Safety Guardrails: Transparent & Neutral',
      subtitle: 'Engineered for Legal Integrity',
      keyPoint:
        '• Mandatory "Indicative / Requires Legal Verification" tags on every legal computation.\n• Neutral inconsistency language ("Inconsistency detected", never "fraud").\n• Aadhaar Privacy Shield masking identity numbers before analysis.\n• Document Readiness Index with explicit criteria and banking limitations.\n• Human-in-the-Loop review portal for practicing advocates.',
      stats: 'Strict Compliance with Bar Council Guidelines & IT Act Privacy Norms',
      speakerNotes:
        'We designed BhumiSutra with strict guardrails: the AI assists human decision-makers, it never pretends to be a civil judge. Everything is verifiable against certified Bhoomi extracts.',
    },
    {
      id: 'slide-6',
      number: '06',
      title: 'Scalability & Public Impact: Saving ₹25,000 Per Household',
      subtitle: 'Public Administration & B2G Integration',
      keyPoint:
        'BhumiSutra cuts mutation turnaround from 180 days to 35 days under the Sakala Guarantee. For Village Accountants, our AI Pre-Check Cockpit reduces scrutiny time by 86% (45 mins to 6 mins). Next steps: direct API integration with Bhoomi & Kaveri 2.0, followed by multi-state expansion across Maharashtra, Telangana, and Andhra Pradesh.',
      stats: '₹350 Crore+ Potential Middleman Fees Saved • Empowers 1.4 Crore Farmers',
      speakerNotes:
        'By streamlining mutations, we unlock thousands of crores in institutional farm credit and clear clogged revenue courts. BhumiSutra delivers true Tech for Bharat from the heart of Bangalore Palace.',
    },
  ];

  const current = slides[currentSlide];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Top Banner with 3-Minute Timer */}
      <div className="px-5 py-4 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-amber-100">
                {isKn ? '೩-ನಿಮಿಷಗಳ ಪಿಚ್ ಪ್ರಸ್ತುತಿ ಮೋಡ್' : '3-Minute Hackathon Pitch Presentation Deck'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40 font-semibold">
                Bangalore Main Palace Pitch
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              6-slide structured narrative with integrated stopwatch timer and speaker notes
            </p>
          </div>
        </div>

        {/* 3-Minute Countdown Stopwatch */}
        <div className="flex items-center gap-3 bg-stone-950/80 border border-amber-800/60 px-4 py-1.5 rounded-xl">
          <Clock className="w-4 h-4 text-amber-400" />
          <span
            className={`font-mono text-base font-bold ${
              secondsRemaining < 30 ? 'text-rose-400 animate-pulse' : 'text-amber-200'
            }`}
          >
            {formatTimer(secondsRemaining)}
          </span>

          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer"
              title={isTimerRunning ? 'Pause' : 'Start Timer'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 cursor-pointer"
              title="Reset to 3:00"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Content View */}
      <div className="p-6 sm:p-10 space-y-6">
        {/* Slide Counter / Indicators */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  currentSlide === idx
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {s.number}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((c) => Math.max(0, c - 1))}
              disabled={currentSlide === 0}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => setCurrentSlide((c) => Math.min(slides.length - 1, c + 1))}
              disabled={currentSlide === slides.length - 1}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <span>Next Slide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Current Slide Display */}
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
            Slide {current.number} / 06 &bull; {current.subtitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 leading-tight">
            {current.title}
          </h2>

          <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-sm leading-relaxed text-stone-800 font-sans whitespace-pre-line">
            {current.keyPoint}
          </div>

          <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-300 font-mono text-xs font-bold text-amber-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Key Metric: {current.stats}</span>
          </div>
        </div>

        {/* Speaker Notes Drawer for the Presenter */}
        <div className="mt-6 p-4 bg-stone-900 text-stone-200 rounded-xl border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400 font-bold uppercase">
            <span>🎙️ Presenter Speaker Notes (Say this out loud):</span>
            <span>Target: ~30 seconds on this slide</span>
          </div>
          <p className="text-xs font-sans italic text-stone-300 leading-relaxed">
            "{current.speakerNotes}"
          </p>
        </div>
      </div>
    </div>
  );
};
