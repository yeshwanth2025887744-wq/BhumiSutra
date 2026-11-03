import React from 'react';
import {
  FileSearch,
  GitCompare,
  Users2,
  ListChecks,
  Compass,
  CheckCircle2,
  Loader2,
  AlertTriangle,
  Bot,
} from 'lucide-react';
import { AgentStatus } from '../types';

interface AgentPipelineViewerProps {
  isAnalyzing: boolean;
  activeTab: string;
  hasRecord: boolean;
  hasAnalysis: boolean;
  language: 'en' | 'kn';
}

export const AgentPipelineViewer: React.FC<AgentPipelineViewerProps> = ({
  isAnalyzing,
  activeTab,
  hasRecord,
  hasAnalysis,
  language,
}) => {
  const isKn = language === 'kn';

  const agents = [
    {
      id: 'agent-1',
      name: 'Agent 1: Document Intelligence',
      kannadaName: 'ಏಜೆಂಟ್ ೧: ದಾಖಲೆ ವಿಶ್ಲೇಷಣೆ',
      role: 'Extracts names, survey nos, extent & regional scripts',
      kannadaRole: 'ಸರ್ವೆ ನಂ, ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಪಹಣಿ ವಿವರಗಳ ಪರಿಶೀಲನೆ',
      icon: FileSearch,
      status: hasRecord ? 'completed' : isAnalyzing ? 'running' : 'idle',
      badge: hasRecord ? (isKn ? 'ಪೂರ್ಣಗೊಂಡಿದೆ' : 'Extracted') : isKn ? 'ಸಿದ್ಧವಾಗಿದೆ' : 'Ready',
    },
    {
      id: 'agent-2',
      name: 'Agent 2: Record Verification',
      kannadaName: 'ಏಜೆಂಟ್ ೨: ಐತಿಹಾಸಿಕ ತಾಳೆ',
      role: 'Cross-checks historical vs current RTC mismatches',
      kannadaRole: 'ಹಿಂದಿನ ಮತ್ತು ಇಂದಿನ ದಾಖಲೆಗಳ ವ್ಯತ್ಯಾಸ ಪತ್ತೆ',
      icon: GitCompare,
      status: hasRecord ? 'completed' : isAnalyzing ? 'running' : 'idle',
      badge: hasRecord ? (isKn ? 'ತಾಳೆ ಪೂರ್ಣ' : 'Cross-Checked') : isKn ? 'ಕಾಯುತ್ತಿದೆ' : 'Waiting',
    },
    {
      id: 'agent-3',
      name: 'Agent 3: Succession Assistant',
      kannadaName: 'ಏಜೆಂಟ್ ೩: ವಾರಸು ವಂಶವೃಕ್ಷ',
      role: 'Builds lineage & enforces HSA 2005 daughter rights',
      kannadaRole: 'ಹೆಣ್ಣು ಮಕ್ಕಳ ಸಮಪಾಲು & ವಂಶವೃಕ್ಷ ರಚನೆ',
      icon: Users2,
      status: hasAnalysis ? 'completed' : isAnalyzing ? 'running' : hasRecord ? 'completed' : 'idle',
      badge: hasAnalysis ? (isKn ? 'ಸಮಪಾಲು ಲೆಕ್ಕ' : 'Mapped') : isKn ? 'ಸಿದ್ಧವಾಗಿದೆ' : 'Pending',
    },
    {
      id: 'agent-4',
      name: 'Agent 4: Compliance Gap Finder',
      kannadaName: 'ಏಜೆಂಟ್ ೪: ಕೊರತೆ ಪತ್ತೆ',
      role: 'Audits missing records & Document Readiness Index',
      kannadaRole: 'ಬ್ಯಾಂಕ್ ಸಾಲ & ಕಂದಾಯ ಕೊರತೆ ಪರಿಶೀಲನೆ',
      icon: ListChecks,
      status: hasAnalysis ? 'completed' : isAnalyzing ? 'running' : 'idle',
      badge: hasAnalysis ? (isKn ? 'ಕೊರತೆ ಪಟ್ಟಿ ಸಿದ್ಧ' : 'Scored') : isKn ? 'ಕಾಯುತ್ತಿದೆ' : 'Queued',
    },
    {
      id: 'agent-5',
      name: 'Agent 5: Roadmap Generator',
      kannadaName: 'ಏಜೆಂಟ್ ೫: ಮಾರ್ಗಸೂಚಿ ಮತ್ತು ಅರ್ಜಿ',
      role: 'Drafts Form 21, Affidavits & 35-day Sakala timeline',
      kannadaRole: 'ನಮೂನೆ ೨೧ & ಸಕಾಲ ಮಾರ್ಗಸೂಚಿ ಸಿದ್ಧತೆ',
      icon: Compass,
      status: hasAnalysis ? 'completed' : isAnalyzing ? 'running' : 'idle',
      badge: hasAnalysis ? (isKn ? 'ಅರ್ಜಿಗಳು ಸಿದ್ಧ' : 'Drafted') : isKn ? 'ಕಾಯುತ್ತಿದೆ' : 'Queued',
    },
    {
      id: 'agent-6',
      name: 'Agent 6: Anomaly Detector',
      kannadaName: 'ಏಜೆಂಟ್ ೬: ಅಸಂಗತತೆ ಶೋಧಕ',
      role: 'Audits temporal, extent & loan lien inconsistencies',
      kannadaRole: 'ಕಾಲರೇಖೆ ಮತ್ತು ಸಾಲದ ನಮೂದುಗಳ ವ್ಯತ್ಯಾಸ ಪತ್ತೆ',
      icon: AlertTriangle,
      status: hasRecord ? 'completed' : isAnalyzing ? 'running' : 'idle',
      badge: hasRecord ? (isKn ? 'ಅಸಂಗತತೆ ಪರಿಶೀಲನೆ' : 'Audited') : isKn ? 'ಸಿದ್ಧವಾಗಿದೆ' : 'Ready',
    },
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 text-white shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm font-mono tracking-wide text-amber-400 uppercase">
              {isKn ? 'ಭೂಮಿಸೂತ್ರ: ೬ ಸ್ವಾಯತ್ತ ಎಐ ಏಜೆಂಟ್‌ಗಳ ಸಹಯೋಗ' : 'BhumiSutra: 6 Coordinated Autonomous AI Agents'}
            </h3>
            <p className="text-[11px] text-stone-400">
              {isKn
                ? 'ಪ್ರತಿಯೊಂದು ಏಜೆಂಟ್ ಕಂದಾಯ ನಿಯಮಗಳಿಗೆ ಬದ್ಧವಾಗಿ ಹಂತ-ಹಂತವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ'
                : 'Agents coordinate verified data without hallucinating ownership conclusions'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAnalyzing && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>{isKn ? 'ಏಜೆಂಟ್‌ಗಳು ಕಾರ್ಯನಿರತವಾಗಿವೆ...' : 'Agents Running Pipeline...'}</span>
            </span>
          )}
          <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-700">
            {hasAnalysis ? (isKn ? '೬/೬ ಏಜೆಂಟ್‌ಗಳು ಸಕ್ರಿಯ' : '6/6 Agents Active') : (isKn ? '೩/೬ ಪೂರ್ಣ' : 'Pipeline Standby')}
          </span>
        </div>
      </div>

      {/* Agents Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isDone = agent.status === 'completed';
          const isRun = agent.status === 'running';

          return (
            <div
              key={agent.id}
              className={`p-3 rounded-xl border transition-all ${
                isDone
                  ? 'bg-stone-850 border-emerald-500/30 shadow-xs'
                  : isRun
                  ? 'bg-amber-950/40 border-amber-500/50 shadow-md ring-1 ring-amber-500/30'
                  : 'bg-stone-900/60 border-stone-850 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isRun
                      ? 'bg-amber-500/20 text-amber-400 animate-spin'
                      : 'bg-stone-800 text-stone-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                    isDone
                      ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                      : isRun
                      ? 'bg-amber-900/40 text-amber-300 border border-amber-700/50'
                      : 'bg-stone-800 text-stone-500'
                  }`}
                >
                  {agent.badge}
                </span>
              </div>

              <h4 className="font-bold text-xs text-stone-100 font-mono line-clamp-1">
                {isKn ? agent.kannadaName : agent.name}
              </h4>
              <p className="text-[10px] text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                {isKn ? agent.kannadaRole : agent.role}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
