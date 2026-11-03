import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header, ActiveTabType } from './components/Header';
import { HackathonDemoBar } from './components/HackathonDemoBar';
import { AgentPipelineViewer } from './components/AgentPipelineViewer';
import { LandRecordUploader } from './components/LandRecordUploader';
import { ParsedRecordCard } from './components/ParsedRecordCard';
import { HistoricalTimelineCard } from './components/HistoricalTimelineCard';
import { InteractiveFamilyTree } from './components/InteractiveFamilyTree';
import { FamilyTreeBuilder } from './components/FamilyTreeBuilder';
import { SpatialBoundaryAuditor } from './components/SpatialBoundaryAuditor';
import { RemoteConsensusPortal } from './components/RemoteConsensusPortal';
import { DocumentReadinessIndexCard } from './components/DocumentReadinessIndexCard';
import { SuccessionAnalysisView } from './components/SuccessionAnalysisView';
import { LegalDocumentsViewer } from './components/LegalDocumentsViewer';
import { KannadaVoiceAssistant } from './components/KannadaVoiceAssistant';
import { SankatMochanMediation } from './components/SankatMochanMediation';
import { SahukarShieldRestructure } from './components/SahukarShieldRestructure';
import { GramSewakKioskPortal } from './components/GramSewakKioskPortal';
import { GovernmentNavigator } from './components/GovernmentNavigator';
import { RTCExplainerModal } from './components/RTCExplainerModal';
import { LegalGuideModal } from './components/LegalGuideModal';
import { EvidenceHighlightViewer } from './components/EvidenceHighlightViewer';
import { AnomalyDetectorAgent } from './components/AnomalyDetectorAgent';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { FarmerModeView } from './components/FarmerModeView';
import { CaseTrackerReminders } from './components/CaseTrackerReminders';
import { BankDossierExporter } from './components/BankDossierExporter';
import { ObjectionHandlerModule } from './components/ObjectionHandlerModule';
import { RevenueOfficerDashboard } from './components/RevenueOfficerDashboard';
import { GovtSchemeEligibilityFinder } from './components/GovtSchemeEligibilityFinder';
import { NameMatchingEngine } from './components/NameMatchingEngine';
import { ImpactMetricsView } from './components/ImpactMetricsView';
import { PitchPresentationView } from './components/PitchPresentationView';
import { HumanLawyerReviewModal } from './components/HumanLawyerReviewModal';
import { AadhaarPrivacyShieldModal } from './components/AadhaarPrivacyShieldModal';
import { CoreDashboardView } from './components/CoreDashboardView';
import { SAMPLE_LAND_RECORDS, SampleLandRecord } from './data/sampleRecords';
import { LandRecordDetails, FamilyMember, SuccessionAnalysisResult } from './types';
import {
  FileText,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  ArrowRight,
  GitCompare,
  Compass,
  Globe,
  Radio,
  Handshake,
  Coins,
  Store,
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'kn'>('en');
  const [activeTab, setActiveTab] = useState<ActiveTabType>('parser');
  const [isFarmerMode, setIsFarmerMode] = useState<boolean>(false);
  const [isRTCExplainerOpen, setIsRTCExplainerOpen] = useState<boolean>(false);
  const [isLawyerReviewOpen, setIsLawyerReviewOpen] = useState<boolean>(false);
  const [isPrivacyShieldOpen, setIsPrivacyShieldOpen] = useState<boolean>(false);

  const [activeCaseId, setActiveCaseId] = useState<string>('karnataka-devanahalli');
  const [landRecord, setLandRecord] = useState<LandRecordDetails | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [deceasedDate, setDeceasedDate] = useState<string>('2023-08-14');
  const [personalLaw, setPersonalLaw] = useState<string>(
    'Hindu Succession Act, 1956 (as amended 2005)'
  );
  const [propertyType, setPropertyType] = useState<string>(
    'Ancestral Agricultural Land (Coparcenary Property)'
  );
  const [hasWill, setHasWill] = useState<boolean>(false);
  const [discrepancyNotes, setDiscrepancyNotes] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<SuccessionAnalysisResult | null>(null);

  const [isLoadingRecord, setIsLoadingRecord] = useState<boolean>(false);
  const [isAnalyzingSuccession, setIsAnalyzingSuccession] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Auto-load Devanahalli Ancestral Farm on boot
  useEffect(() => {
    loadCase(SAMPLE_LAND_RECORDS[0]);
  }, []);

  const loadCase = (sample: SampleLandRecord) => {
    setActiveCaseId(sample.id);
    const rec: LandRecordDetails = {
      survey_number: sample.surveyNumber,
      total_extent: sample.extent,
      recorded_owner: sample.recordedOwner,
      kannada_owner_name: sample.kannadaOwner,
      owner_relationship_prefix: 's/o (ಬಿನ್)',
      village_name: sample.villageTaluk,
      taluk_or_tehsil: sample.villageTaluk,
      district_and_state: sample.district,
      khata_or_patta_number: sample.khataNumber,
      land_classification: sample.soilType,
      is_owner_deceased_indicator: sample.isDeceased,
      deceased_clues_explanation: sample.deceasedClues,
      encumbrances_or_loans: sample.encumbrances,
      confidence_score: sample.confidenceScore,
      state_system: sample.state,
      historical_comparison: sample.historicalComparison,
      spatial_boundaries: sample.spatialBoundaries,
    };

    setLandRecord(rec);

    const heirs: FamilyMember[] = sample.sampleFamily.map((fam, idx) => ({
      id: fam.id || `heir-${idx}`,
      name: fam.name,
      kannada_name: fam.kannada_name,
      relationship: fam.relationship,
      aadhaarName: fam.aadhaarName,
      age: fam.age,
      gender: fam.gender,
      maritalStatus: fam.maritalStatus,
      isNocOrRelinquishing: fam.isNocOrRelinquishing,
      currentCity: fam.currentCity,
      phoneNumber: fam.phoneNumber,
      consentStatus: fam.consentStatus || 'VERIFIED',
    }));
    setFamilyMembers(heirs);

    // Run quick local analysis to populate drafts and readiness immediately
    runAnalysisDirectly(rec, heirs);
  };

  const runAnalysisDirectly = async (rec: LandRecordDetails, heirs: FamilyMember[]) => {
    try {
      const res = await fetch('/api/analyze-succession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landRecord: rec,
          familyMembers: heirs,
          deceasedDate,
          personalLaw,
          isAncestralOrSelfAcquired: propertyType,
          hasWill,
          discrepancyNotes,
        }),
      });
      const json = await res.json();
      if (json.data) {
        setAnalysisResult(json.data);
      }
    } catch (e) {
      console.warn('Initial analysis pre-fetch error:', e);
    }
  };

  const handleRecordParsed = (record: LandRecordDetails, rawSample?: SampleLandRecord) => {
    setLandRecord(record);
    setError(null);
    if (rawSample) {
      loadCase(rawSample);
    }
  };

  const handleRunSuccessionAnalysis = async () => {
    if (!landRecord) {
      setError('No land record found. Please select or upload a document.');
      return;
    }
    if (familyMembers.length === 0) {
      setError('Please add at least one legal heir.');
      return;
    }

    setIsAnalyzingSuccession(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze-succession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landRecord,
          familyMembers,
          deceasedDate,
          deceasedName: landRecord.recorded_owner,
          personalLaw,
          isAncestralOrSelfAcquired: propertyType,
          hasWill,
          discrepancyNotes,
        }),
      });

      const json = await res.json();
      if (!res.ok || json.status === 'error') {
        throw new Error(json.detail || 'Succession calculation failed');
      }

      setAnalysisResult(json.data);
      setActiveTab('analysis');

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch (e) {}
    } catch (err: any) {
      setError(err?.message || 'Error occurred while calculating succession.');
    } finally {
      setIsAnalyzingSuccession(false);
    }
  };

  const handleToggleNoc = (id: string) => {
    const updated = familyMembers.map((m) =>
      m.id === id
        ? {
            ...m,
            isNocOrRelinquishing: !m.isNocOrRelinquishing,
            consentStatus: !m.isNocOrRelinquishing
              ? ('SIGNED_NOC' as const)
              : ('VERIFIED' as const),
          }
        : m
    );
    setFamilyMembers(updated);
    if (landRecord) {
      runAnalysisDirectly(landRecord, updated);
    }
  };

  const handleUpdateHeirConsent = (id: string, status: 'VERIFIED' | 'SIGNED_NOC') => {
    const updated = familyMembers.map((m) =>
      m.id === id ? { ...m, consentStatus: status } : m
    );
    setFamilyMembers(updated);
  };

  const handleReset = () => {
    loadCase(SAMPLE_LAND_RECORDS[0]);
    setActiveTab('parser');
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasRecord={!!landRecord}
        hasAnalysis={!!analysisResult}
        language={language}
        setLanguage={setLanguage}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenRTCExplainer={() => setIsRTCExplainerOpen(true)}
        isFarmerMode={isFarmerMode}
        setIsFarmerMode={setIsFarmerMode}
        onOpenLawyerReview={() => setIsLawyerReviewOpen(true)}
        onOpenPrivacyShield={() => setIsPrivacyShieldOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* Hackathon Pitch / Live Demo Bar */}
        <HackathonDemoBar
          onSelectCase={loadCase}
          activeCaseId={activeCaseId}
          language={language}
        />

        {/* 5-Agent Pipeline Visualizer */}
        <AgentPipelineViewer
          isAnalyzing={isAnalyzingSuccession || isLoadingRecord}
          activeTab={activeTab}
          hasRecord={!!landRecord}
          hasAnalysis={!!analysisResult}
          language={language}
        />

        {/* Error notification */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-semibold">{error}</div>
          </div>
        )}

        {/* TAB 1: Document Scanner */}
        {activeTab === 'parser' && (
          <div className="space-y-6">
            <LandRecordUploader
              onRecordParsed={handleRecordParsed}
              isLoading={isLoadingRecord}
              setIsLoading={setIsLoadingRecord}
              error={error}
              setError={setError}
            />

            {landRecord && (
              <ParsedRecordCard
                record={landRecord}
                onUpdateRecord={setLandRecord}
                onProceedToHeirs={() => setActiveTab('timeline')}
                onProceedToDashboard={() => setActiveTab('dashboard')}
              />
            )}
          </div>
        )}

        {/* TAB: Core Dashboard (Bankability Score, Mismatch Alerts & Petition Form) */}
        {activeTab === 'dashboard' && landRecord && analysisResult && (
          <div className="space-y-6">
            <CoreDashboardView
              landRecord={landRecord}
              analysis={analysisResult}
              familyMembers={familyMembers}
              language={language}
              onNavigateToDrafts={() => setActiveTab('drafts')}
              onNavigateToScanner={() => setActiveTab('parser')}
            />
          </div>
        )}

        {/* TAB 2: AI Land Record Timeline & Smart Mismatch Heatmap */}
        {activeTab === 'timeline' && landRecord && (
          <div className="space-y-6">
            <HistoricalTimelineCard record={landRecord} language={language} />

            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab('heirs')}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'kn' ? 'ಮುಂದಿನ ಹಂತ: ವಂಶವೃಕ್ಷ & ವಾರಸುದಾರರು' : 'Next Step: Family Tree & Succession'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Family Tree & Succession Matrix */}
        {activeTab === 'heirs' && landRecord && (
          <div className="space-y-6">
            {/* Visual Interactive Lineage Mapper */}
            <InteractiveFamilyTree
              deceasedName={landRecord.recorded_owner}
              deceasedYear={deceasedDate}
              familyMembers={familyMembers}
              onToggleNoc={handleToggleNoc}
              language={language}
              totalExtent={landRecord.total_extent}
            />

            {/* Heirs Configuration Form */}
            <FamilyTreeBuilder
              landRecord={landRecord}
              familyMembers={familyMembers}
              setFamilyMembers={setFamilyMembers}
              deceasedDate={deceasedDate}
              setDeceasedDate={setDeceasedDate}
              personalLaw={personalLaw}
              setPersonalLaw={setPersonalLaw}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              hasWill={hasWill}
              setHasWill={setHasWill}
              discrepancyNotes={discrepancyNotes}
              setDiscrepancyNotes={setDiscrepancyNotes}
              onRunSuccessionAnalysis={handleRunSuccessionAnalysis}
              isAnalyzing={isAnalyzingSuccession}
            />
          </div>
        )}

        {/* TAB 4: Spatial Boundaries & Encroachment Auditor (Killer Feature A) */}
        {activeTab === 'spatial' && landRecord && (
          <div className="space-y-6">
            <SpatialBoundaryAuditor record={landRecord} language={language} />

            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab('consensus')}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'kn' ? 'ಮುಂದಿನ ಹಂತ: ವಾರಸುದಾರರ ಡಿಜಿಟಲ್ ಒಪ್ಪಿಗೆ' : 'Next Step: Co-Heir Consensus'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: Remote Co-Heir Consensus & Sign-Off Simulator (Killer Feature B) */}
        {activeTab === 'consensus' && landRecord && (
          <div className="space-y-6">
            <RemoteConsensusPortal
              familyMembers={familyMembers}
              onUpdateHeirConsent={handleUpdateHeirConsent}
              language={language}
              surveyNumber={landRecord.survey_number}
            />

            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab('readiness')}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'kn' ? 'ಮುಂದಿನ ಹಂತ: ಬ್ಯಾಂಕ್ ಸಾಲ ಸನ್ನದ್ಧತೆ' : 'Next Step: Bankability Index'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: Document Readiness & Bankability Index */}
        {activeTab === 'readiness' && landRecord && (
          <div className="space-y-6">
            <DocumentReadinessIndexCard
              scoreData={analysisResult?.readiness_index}
              language={language}
            />

            <div className="flex justify-end">
              <button
                onClick={() => setActiveTab('analysis')}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'kn' ? 'ಮುಂದಿನ ಹಂತ: ತಾಲೂಕು ಮ್ಯುಟೇಷನ್ ವರದಿ' : 'Next Step: Taluk Mutation Roadmap'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: Taluk Mutation Report & Step-by-Step Roadmap */}
        {activeTab === 'analysis' && analysisResult && landRecord && (
          <div className="space-y-6">
            <SuccessionAnalysisView
              analysis={analysisResult}
              landRecord={landRecord}
              onProceedToDrafts={() => setActiveTab('drafts')}
            />
          </div>
        )}

        {/* TAB 8: Ready-to-Print Petitions & Notary Affidavits */}
        {activeTab === 'drafts' && analysisResult && landRecord && (
          <div className="space-y-6">
            <LegalDocumentsViewer
              drafts={analysisResult.legal_petition_drafts}
              landRecord={landRecord}
              evidenceCitations={analysisResult.evidence_citations}
              language={language}
            />
          </div>
        )}

        {/* TAB 9: SankatMochan - Pre-Litigation Dispute Predictor & Mediator */}
        {activeTab === 'sankat' && (
          <div className="space-y-6">
            <SankatMochanMediation
              surveyNumber={landRecord?.survey_number || '142/2B'}
              extent={landRecord?.total_extent || '4 Acres 12 Guntas'}
              language={language}
            />
          </div>
        )}

        {/* Farmer Mode View */}
        {isFarmerMode && (
          <FarmerModeView
            record={landRecord}
            onExitFarmerMode={() => setIsFarmerMode(false)}
            onTriggerUpload={() => setActiveTab('parser')}
            onTriggerVoice={() => setActiveTab('voice')}
            onTriggerNextSteps={() => setActiveTab('tracker')}
          />
        )}

        {/* TAB: Highlight-on-Document Evidence Viewer */}
        {activeTab === 'evidence' && landRecord && (
          <div className="space-y-6">
            <EvidenceHighlightViewer record={landRecord} language={language} />
          </div>
        )}

        {/* TAB: Agent 6 Inconsistency & Anomaly Detector */}
        {activeTab === 'anomalies' && landRecord && (
          <div className="space-y-6">
            <AnomalyDetectorAgent record={landRecord} language={language} />
          </div>
        )}

        {/* TAB: What-If? Succession Scenario Simulator */}
        {activeTab === 'whatif' && (
          <div className="space-y-6">
            <WhatIfSimulator
              familyMembers={familyMembers}
              totalExtent={landRecord?.total_extent || '2 Acres 18 Guntas'}
              language={language}
            />
          </div>
        )}

        {/* TAB: My Case Tracker & WhatsApp Reminders */}
        {activeTab === 'tracker' && (
          <div className="space-y-6">
            <CaseTrackerReminders
              surveyNumber={landRecord?.survey_number || '142/2B'}
              language={language}
            />
          </div>
        )}

        {/* TAB: Bank & PACS Collateral Dossier Exporter */}
        {activeTab === 'dossier' && landRecord && (
          <div className="space-y-6">
            <BankDossierExporter
              record={landRecord}
              analysis={analysisResult}
              language={language}
            />
          </div>
        )}

        {/* TAB: Form 12 Public Notice Objection Handler */}
        {activeTab === 'objection' && (
          <div className="space-y-6">
            <ObjectionHandlerModule
              surveyNumber={landRecord?.survey_number || '142/2B'}
              language={language}
            />
          </div>
        )}

        {/* TAB: Revenue Officer & Village Accountant Cockpit (B2G) */}
        {activeTab === 'officer' && (
          <div className="space-y-6">
            <RevenueOfficerDashboard language={language} />
          </div>
        )}

        {/* TAB: Government Welfare & Subsidized Schemes Unlocker */}
        {activeTab === 'schemes' && (
          <div className="space-y-6">
            <GovtSchemeEligibilityFinder
              surveyNumber={landRecord?.survey_number || '142/2B'}
              isDeceasedMutated={false}
              language={language}
            />
          </div>
        )}

        {/* TAB: Bilingual Name Matching & Transliteration Engine */}
        {activeTab === 'matching' && (
          <div className="space-y-6">
            <NameMatchingEngine language={language} />
          </div>
        )}

        {/* TAB: Impact & Evaluation Metrics (For Judges) */}
        {activeTab === 'impact' && (
          <div className="space-y-6">
            <ImpactMetricsView language={language} />
          </div>
        )}

        {/* TAB: 3-Minute Hackathon Pitch Presentation Deck */}
        {activeTab === 'pitch' && (
          <div className="space-y-6">
            <PitchPresentationView
              language={language}
              onNavigateToTab={(tab) => setActiveTab(tab as any)}
            />
          </div>
        )}

        {/* TAB 10: Sahukar Shield - Predatory Moneylender Trap Detector & PACS Refinance */}
        {activeTab === 'sahukar' && (
          <div className="space-y-6">
            <SahukarShieldRestructure
              surveyNumber={landRecord?.survey_number || '142/2B'}
              totalExtent={landRecord?.total_extent || '4 Acres 12 Guntas'}
              language={language}
            />
          </div>
        )}

        {/* TAB 11: GramSewak AI - Offline Village CSC / Grama One Kiosk Operator Portal */}
        {activeTab === 'kiosk' && (
          <div className="space-y-6">
            <GramSewakKioskPortal
              surveyNumber={landRecord?.survey_number || '142/2B'}
              language={language}
            />
          </div>
        )}

        {/* TAB 12: Karnataka Revenue Services Navigator */}
        {activeTab === 'portals' && (
          <div className="space-y-6">
            <GovernmentNavigator language={language} />
          </div>
        )}

        {/* TAB 13: Spoken Kannada AI Voice Assistant */}
        {activeTab === 'voice' && (
          <div className="space-y-6">
            <KannadaVoiceAssistant
              language={language}
              surveyNumber={landRecord?.survey_number || '142/2B'}
            />
          </div>
        )}
      </main>

      {/* Persistent Legal Guardrail Footer (Requirement 2) */}
      <div className="sticky bottom-0 z-30 bg-stone-900/95 backdrop-blur-xs text-amber-200 border-t border-amber-800/60 px-4 py-2 text-center text-xs font-mono font-medium shadow-lg flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Informational tool, not legal advice. Sample data only.</span>
      </div>

      {/* Guide Modal */}
      <LegalGuideModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* RTC Explainer Modal */}
      <RTCExplainerModal
        isOpen={isRTCExplainerOpen}
        onClose={() => setIsRTCExplainerOpen(false)}
        language={language}
      />

      {/* Human Lawyer Review Modal */}
      {landRecord && (
        <HumanLawyerReviewModal
          isOpen={isLawyerReviewOpen}
          onClose={() => setIsLawyerReviewOpen(false)}
          record={landRecord}
          analysis={analysisResult}
          language={language}
        />
      )}

      {/* Aadhaar Privacy Shield Modal */}
      <AadhaarPrivacyShieldModal
        isOpen={isPrivacyShieldOpen}
        onClose={() => setIsPrivacyShieldOpen(false)}
        onDeleteData={handleReset}
        language={language}
      />

      {/* Global Footer */}
      <footer className="mt-6 bg-stone-900 border-t border-stone-800 text-stone-400 text-xs py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-serif font-bold text-sm">
              BS
            </div>
            <div>
              <p className="font-semibold text-stone-200">
                BhumiSutra • {language === 'kn' ? 'ಭೂಮಿಯ ಗೊಂದಲದಿಂದ ಭೂಮಿಯ ಸ್ಪಷ್ಟತೆಗೆ' : 'From Land Confusion to Land Clarity'}
              </p>
              <p className="text-[11px] text-stone-500">
                Tech4Bharat Hackathon Prototype • Bangalore Main Palace Presentation
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-stone-400">
            <span>Hindu Succession Act (2005 Sec 6)</span>
            <span>•</span>
            <span>KLR Act 1964 Sec 128/129 Form 21</span>
            <span>•</span>
            <span>Mojini Cadastral 11E Podi</span>
            <span>•</span>
            <span>Sakala Guarantee of Services</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
