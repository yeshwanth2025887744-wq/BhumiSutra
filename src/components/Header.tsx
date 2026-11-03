import React from 'react';
import {
  Landmark,
  Scale,
  FileText,
  ShieldCheck,
  HelpCircle,
  Globe,
  Radio,
  GitCompare,
  Compass,
  Users,
  Handshake,
  Coins,
  Store,
  BookOpen,
} from 'lucide-react';

export type ActiveTabType =
  | 'parser'
  | 'dashboard'
  | 'evidence'
  | 'anomalies'
  | 'timeline'
  | 'heirs'
  | 'whatif'
  | 'spatial'
  | 'consensus'
  | 'readiness'
  | 'tracker'
  | 'dossier'
  | 'analysis'
  | 'drafts'
  | 'objection'
  | 'officer'
  | 'schemes'
  | 'matching'
  | 'impact'
  | 'pitch'
  | 'sankat'
  | 'sahukar'
  | 'kiosk'
  | 'portals'
  | 'voice';

interface HeaderProps {
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  hasRecord: boolean;
  hasAnalysis: boolean;
  language: 'en' | 'kn';
  setLanguage: (lang: 'en' | 'kn') => void;
  onOpenHelp: () => void;
  onOpenRTCExplainer: () => void;
  isFarmerMode: boolean;
  setIsFarmerMode: (val: boolean) => void;
  onOpenLawyerReview: () => void;
  onOpenPrivacyShield: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hasRecord,
  hasAnalysis,
  language,
  setLanguage,
  onOpenHelp,
  onOpenRTCExplainer,
  isFarmerMode,
  setIsFarmerMode,
  onOpenLawyerReview,
  onOpenPrivacyShield,
}) => {
  const isKn = language === 'kn';

  return (
    <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-xl">
      {/* Top Banner with Indian Revenue Context */}
      <div className="bg-amber-950/80 border-b border-amber-800/40 px-4 py-1.5 text-xs text-amber-200/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-amber-100 font-mono">
            {isKn ? 'ಭೂಮಿಸೂತ್ರ: ಕಂದಾಯ ದಾಖಲೆಗಳ ಗುಪ್ತಚರ ಮತ್ತು ವಾರಸು ವೇದಿಕೆ' : 'BhumiSutra: Agentic AI Land Record Intelligence & Succession Platform'}
          </span>
          <span className="hidden md:inline text-amber-400/60">•</span>
          <span className="hidden md:inline text-amber-300/80 text-[11px]">
            {isKn ? 'ಟೆಕ್೪ಭಾರತ್ ಹ್ಯಾಕಥಾನ್ - ಬೆಂಗಳೂರು ಅರಮನೆ' : 'Tech4Bharat Hackathon • Bangalore Main Palace Presentation'}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 text-amber-200/80 flex-wrap">
          {/* Farmer Mode Toggle Button */}
          <button
            onClick={() => setIsFarmerMode(!isFarmerMode)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all ${
              isFarmerMode
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 animate-pulse'
                : 'bg-amber-900/60 hover:bg-amber-900 text-amber-200 border border-amber-700/60'
            }`}
            title="Toggle Simple High-Contrast Farmer Mode"
          >
            <span>🌾</span>
            <span>{isKn ? 'ರೈತ ಮೋಡ್' : 'Farmer Mode'}</span>
          </button>

          {/* Lawyer Review Modal Trigger */}
          <button
            onClick={onOpenLawyerReview}
            className="hover:text-amber-100 transition-colors flex items-center gap-1 cursor-pointer bg-stone-900 hover:bg-stone-800 border border-amber-800/60 px-2 py-1 rounded text-[11px]"
            title="Human-in-the-Loop Advocate Review"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isKn ? 'ವಕೀಲರ ಪರಿಶೀಲನೆ' : 'Lawyer Review'}</span>
          </button>

          {/* Privacy Shield Trigger */}
          <button
            onClick={onOpenPrivacyShield}
            className="hover:text-amber-100 transition-colors flex items-center gap-1 cursor-pointer bg-stone-900 hover:bg-stone-800 border border-amber-800/60 px-2 py-1 rounded text-[11px]"
            title="Aadhaar Privacy Shield & DPDP Masking"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Privacy Shield</span>
          </button>

          {/* Dual Language Switcher */}
          <div className="flex items-center bg-stone-950/80 rounded-lg border border-amber-800/60 p-0.5 text-xs font-mono">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                language === 'en' ? 'bg-amber-600 text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('kn')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                language === 'kn' ? 'bg-amber-600 text-white font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>

          {/* Explain My RTC Button */}
          <button
            onClick={onOpenRTCExplainer}
            className="hover:text-amber-100 transition-colors flex items-center gap-1 cursor-pointer bg-amber-900/40 hover:bg-amber-900/60 border border-amber-700/50 px-2 py-0.5 rounded text-[11px]"
            title="Explain RTC Columns (ಪಹಣಿ ಕಾಲಂ ವಿವರಣೆ)"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isKn ? 'ಪಹಣಿ ವಿವರಣೆ' : 'Explain RTC'}</span>
          </button>

          {/* Legal Rules Help */}
          <button
            onClick={onOpenHelp}
            className="hover:text-amber-100 transition-colors flex items-center gap-1 cursor-pointer"
            title="Legal FAQs and Guidelines"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isKn ? 'ಮಾರ್ಗದರ್ಶಿ' : 'Rules'}</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
              <Landmark className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-serif">
                Bhumi<span className="text-amber-400">Sutra</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Agentic AI
              </span>
            </div>
            <p className="text-[10px] text-stone-400">
              {isKn ? 'ಭೂಮಿಯ ಗೊಂದಲದಿಂದ... ಭೂಮಿಯ ಸ್ಪಷ್ಟತೆಗೆ' : 'Understand Your Land. Know Your Next Step.'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('parser')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'parser'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            disabled={!hasRecord}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-300'
                : !hasRecord
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-amber-300 hover:text-white hover:bg-stone-800 border border-amber-500/40'
            }`}
            title="Core Dashboard: Bankability Score, Mismatch Alerts & Petition Form"
          >
            <span>📱 Core Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            disabled={!hasRecord}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'evidence'
                ? 'bg-amber-600 text-white shadow-sm'
                : !hasRecord
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Highlight-on-Document Evidence Viewer"
          >
            <span>🔍 Evidence</span>
          </button>

          <button
            onClick={() => setActiveTab('anomalies')}
            disabled={!hasRecord}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'anomalies'
                ? 'bg-rose-700 text-white shadow-sm'
                : !hasRecord
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-rose-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Agent 6 Anomaly & Inconsistency Detector"
          >
            <span>⚠️ Anomalies</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            disabled={!hasRecord}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-amber-600 text-white shadow-sm'
                : !hasRecord
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Diff</span>
          </button>

          <button
            onClick={() => setActiveTab('heirs')}
            disabled={!hasRecord}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'heirs'
                ? 'bg-amber-600 text-white shadow-sm'
                : !hasRecord
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Heirs</span>
          </button>

          <button
            onClick={() => setActiveTab('whatif')}
            disabled={!hasRecord}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'whatif'
                ? 'bg-indigo-600 text-white shadow-sm'
                : !hasRecord
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-indigo-300 hover:text-white hover:bg-stone-800'
            }`}
            title="What-If? Scenario Simulator"
          >
            <span>🔮 What-If?</span>
          </button>

          <button
            onClick={() => setActiveTab('spatial')}
            disabled={!hasRecord}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'spatial'
                ? 'bg-indigo-600 text-white shadow-sm'
                : !hasRecord
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-300" />
            <span>Spatial</span>
          </button>

          <button
            onClick={() => setActiveTab('consensus')}
            disabled={!hasRecord}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'consensus'
                ? 'bg-emerald-600 text-white shadow-sm'
                : !hasRecord
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-300" />
            <span>Consent</span>
          </button>

          <button
            onClick={() => setActiveTab('readiness')}
            disabled={!hasRecord}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'readiness'
                ? 'bg-amber-600 text-white shadow-sm'
                : !hasRecord
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Document Readiness Index"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Readiness</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'tracker'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
            title="My Case Tracker & WhatsApp Reminders"
          >
            <span>⏱️ Case Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dossier'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Export Bank/PACS Collateral Dossier (A4 Print)"
          >
            <span>📄 PACS Dossier</span>
          </button>

          <button
            onClick={() => setActiveTab('drafts')}
            disabled={!hasAnalysis}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'drafts'
                ? 'bg-amber-600 text-white shadow-sm'
                : !hasAnalysis
                ? 'opacity-40 cursor-not-allowed text-stone-500'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Petitions</span>
          </button>

          <button
            onClick={() => setActiveTab('objection')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'objection'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-rose-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Form 12 Public Notice Objection Handler"
          >
            <span>⚖️ Objection</span>
          </button>

          <button
            onClick={() => setActiveTab('officer')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'officer'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-sky-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Revenue Officer / Village Accountant Queue (B2G)"
          >
            <span>🏛️ Officer View</span>
          </button>

          <button
            onClick={() => setActiveTab('schemes')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'schemes'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Government Welfare & Subsidized Schemes"
          >
            <span>🌾 Schemes</span>
          </button>

          <button
            onClick={() => setActiveTab('matching')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'matching'
                ? 'bg-indigo-700 text-white shadow-sm'
                : 'text-indigo-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Bilingual Name Matching Engine"
          >
            <span>🔤 Name Matching</span>
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'impact'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-amber-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Social Impact & Evaluation Metrics"
          >
            <span>📊 Impact</span>
          </button>

          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pitch'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-amber-200 hover:text-white hover:bg-stone-800'
            }`}
            title="3-Minute Pitch Presentation Deck"
          >
            <span>🏆 Pitch Deck</span>
          </button>

          <button
            onClick={() => setActiveTab('sankat')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'sankat'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-rose-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Handshake className="w-3.5 h-3.5 text-rose-400" />
            <span>SankatMochan</span>
          </button>

          <button
            onClick={() => setActiveTab('sahukar')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'sahukar'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sahukar</span>
          </button>

          <button
            onClick={() => setActiveTab('kiosk')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'kiosk'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'text-teal-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-teal-400" />
            <span>GramSewak</span>
          </button>

          <button
            onClick={() => setActiveTab('portals')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'portals'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-sky-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>Portals</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-amber-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Voice</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
