export interface LandRecordDetails {
  survey_number: string;
  total_extent: string;
  recorded_owner: string;
  owner_relationship_prefix?: string;
  village_name?: string;
  taluk_or_tehsil?: string;
  district_and_state?: string;
  khata_or_patta_number?: string;
  land_classification?: string;
  is_owner_deceased_indicator: boolean;
  deceased_clues_explanation?: string;
  encumbrances_or_loans: string;
  confidence_score: number;
  state_system?: string;
  kannada_owner_name?: string;
  historical_comparison?: {
    original_khatedar: string;
    original_year: string;
    mutation_number: string;
    historical_extent: string;
    mismatches: {
      field: string;
      historical_val: string;
      current_val: string;
      status: 'MATCH' | 'REVIEW' | 'MISMATCH';
      risk: string;
    }[];
  };
  spatial_boundaries?: {
    north_boundary: string;
    south_boundary: string;
    east_boundary: string;
    west_boundary: string;
    tippani_sketch_area: string;
    boundary_shift_risk: 'LOW' | 'MEDIUM' | 'HIGH';
    encroachment_notes: string;
  };
  fraud_risk_audit?: {
    risk_level: 'LOW' | 'MODERATE' | 'ATTENTION_NEEDED';
    flags: {
      check: string;
      status: 'VERIFIED' | 'REVIEW_RECOMMENDED';
      notes: string;
    }[];
  };
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  aadhaarName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: string;
  isNocOrRelinquishing: boolean;
  currentCity?: string;
  phoneNumber?: string;
  consentStatus?: 'PENDING' | 'VERIFIED' | 'SIGNED_NOC' | 'OBJECTED';
  kannada_name?: string;
}

export interface HeirShare {
  heir_name: string;
  relationship: string;
  legal_category: string;
  fractional_share: string;
  percentage_share: number;
  calculated_extent: string;
  status: string;
  legal_notes: string;
  location?: string;
}

export interface NameDiscrepancy {
  person: string;
  name_in_rtc: string;
  name_in_id_proof: string;
  severity: 'High' | 'Moderate' | 'Low';
  risk_at_taluk_office: string;
  rectification_procedure: string;
}

export interface TalukPetitionForm {
  form_code: string;
  form_title: string;
  issuing_authority: string;
  purpose: string;
  mandatory_attachments: string[];
}

export interface ChecklistStep {
  step_number: number;
  title: string;
  authority: string;
  action_required: string;
  statutory_timeline_days: string;
  pitfalls_to_avoid: string;
  kannada_summary?: string;
  completed?: boolean;
}

export interface EncumbranceResolution {
  has_encumbrance: boolean;
  details?: string;
  required_action: string;
}

export interface LegalPetitionDrafts {
  taluk_mutation_application: string;
  legal_heir_sworn_affidavit: string;
  one_and_same_person_affidavit: string;
  relinquishment_or_noc_template?: string;
  kannada_varasa_petition?: string;
}

export interface DocumentReadinessScore {
  overall_score: number; // 0 - 100
  tier: 'High Collateral Readiness' | 'Moderate Readiness - Clarifications Needed' | 'Critical Revenue Gaps';
  criteria_breakdown: {
    title_chain_30yr: number; // 0-25
    identity_matching: number; // 0-25
    encumbrance_clarity: number; // 0-25
    succession_concurrence: number; // 0-25
  };
  pacs_bank_checklist: {
    item: string;
    category: 'Available' | 'Missing' | 'Requires Official Confirmation';
    priority: 'HIGH' | 'MEDIUM' | 'OPTIONAL';
    action: string;
  }[];
}

export interface SuccessionAnalysisResult {
  legal_framework_summary: string;
  share_distribution: HeirShare[];
  name_discrepancies: NameDiscrepancy[];
  taluk_petition_forms_required: TalukPetitionForm[];
  step_by_step_checklist: ChecklistStep[];
  encumbrance_resolution_plan: EncumbranceResolution;
  legal_petition_drafts: LegalPetitionDrafts;
  readiness_index?: DocumentReadinessScore;
  evidence_citations?: {
    fact: string;
    source: string;
    verified: boolean;
    page: string;
  }[];
}

export interface AgentStatus {
  id: string;
  name: string;
  title: string;
  status: 'idle' | 'running' | 'completed' | 'flagged';
  outputSnippet?: string;
  kannadaTitle: string;
}

// SankatMochan Pre-Litigation Dispute Types
export interface DisputeCase {
  id: string;
  title: string;
  opposingParty: string;
  claimNature: string;
  description: string;
  adverseProbability: number; // 0-100%
  keyVulnerability: string;
  proposedCompromise: string;
  mediationSettlementDraft: string;
  statutoryPrecedent: string;
}

// Sahukar Shield Informal Moneylender Restructuring Types
export interface InformalDebtProfile {
  creditorName: string;
  principalAmount: number;
  monthlyInterestRatePercent: number; // e.g. 3% per month = 36% p.a.
  pledgedItem: string; // e.g. "Original RTC & Blank Cheque" or "Gold 40g"
  loanDate: string;
  purpose: string;
}

export interface DebtRestructurePlan {
  totalPrincipal: number;
  annualPredatoryInterestPaid: number;
  pacsFormalAnnualInterest: number; // at 4% subsidized interest
  annualSavings: number;
  suggestedPACSProduct: string;
  applicationMemo: string;
}

// GramSewak Kiosk Operator Voice Types
export interface KioskVoiceSession {
  operatorName: string;
  kioskLocation: string;
  farmerName: string;
  recordedVoiceText: string;
  extractedParameters: {
    surveyNumber: string;
    intendedAction: string;
    heirsStated: string[];
    missingDocsNoted: string[];
  };
  audioSummaryScriptKannada: string;
}

// Explain My Land Record Glossary Items
export interface RTCGlossaryItem {
  term: string;
  kannadaTerm: string;
  columnOrLocation: string;
  simpleExplanation: string;
  kannadaExplanation: string;
  commonPitfall: string;
}

// Karnataka Government Official Portal Link
export interface GovernmentPortalLink {
  id: string;
  name: string;
  kannadaName: string;
  service: string;
  url: string;
  requiredDocuments: string;
  officialInstruction: string;
}

// Bounding box evidence for Highlight-on-Document viewer
export interface FieldBoundingBox {
  fieldKey: string;
  label: string;
  kannadaLabel: string;
  value: string;
  sourceDoc: string;
  sourceColumn: string;
  confidence: number;
  needsConfirmation?: boolean;
  box: { x: number; y: number; width: number; height: number }; // percentages 0-100%
}

// Agent 6: Inconsistency & Anomaly Detector
export interface AnomalyFlag {
  id: string;
  category: string;
  title: string;
  kannadaTitle: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  neutralExplanation: string;
  suggestedDocument: string;
  status: 'PENDING_REVIEW' | 'VERIFIED' | 'RESOLVED';
}

// What-If Scenario state
export interface WhatIfScenarioState {
  sonPredeceased: boolean;
  daughterRelinquishes: boolean;
  minorHeir: boolean;
  secondSpouse: boolean;
  willExists: boolean;
}

// Case Milestone Tracker
export interface CaseMilestone {
  id: string;
  title: string;
  kannadaTitle: string;
  authority: string;
  status: 'NOT_STARTED' | 'SUBMITTED' | 'UNDER_OBJECTION_WINDOW' | 'DONE';
  daysRemaining?: number;
  statutoryDays: number;
  submittedDate?: string;
  completedDate?: string;
  notes?: string;
}

// Objection Resolution Guidance
export interface ObjectionGuidance {
  id: string;
  objectionType: 'RELATIVE_SHARE' | 'BOUNDARY_DISPUTE' | 'BANK_LIEN' | 'WILL_DISPUTE';
  title: string;
  kannadaTitle: string;
  hearingAuthority: string;
  jurisdictionNote: string;
  requiredEvidence: string[];
  draftReplyText: string;
}

// Revenue Officer Queue Item
export interface OfficerQueueItem {
  id: string;
  applicantName: string;
  surveyNumber: string;
  village: string;
  serviceType: string;
  daysPending: number;
  preCheckStatus: 'COMPLETE' | 'MISSING_DOCS' | 'INCONSISTENCY_DETECTED';
  missingItems: string[];
  recommendedAction: string;
}

// Multi-State Configuration
export type SupportedState = 'karnataka' | 'maharashtra' | 'telangana' | 'tamilnadu' | 'andhra';

export interface StateRevenueConfig {
  id: SupportedState;
  name: string;
  nativeName: string;
  recordDocName: string; // e.g. RTC / Pahani, Satbara 7/12, Pahani/ROR
  formName: string; // Form 21, Ferfar, Form 1-B
  portalName: string; // Bhoomi, Mahabhulekh, Dharani
  portalUrl: string;
  publicNoticeDays: number;
  serviceGuaranteeDays: number;
  statusTag: 'PRODUCTION_VERIFIED' | 'PROTOTYPE_NEEDS_LEGAL_VALIDATION';
}

// Name Transliteration Matching Group
export interface NameMatchGroup {
  id: string;
  primaryCanonical: string;
  kannadaCanonical: string;
  variants: {
    name: string;
    sourceDoc: string;
    similarityScore: number;
  }[];
  reasonForGrouping: string;
  status: 'LIKELY_SAME_PERSON_CONFIRM' | 'CONFIRMED' | 'REJECTED';
}

// Government Scheme Unlocked
export interface GovtSchemeEligibility {
  id: string;
  schemeName: string;
  agency: string;
  benefit: string;
  requiredClearDocuments: string[];
  currentEligibility: 'POSSIBLY_ELIGIBLE' | 'BLOCKED_BY_TITLE_GAP';
  blockingGap: string;
  officialUrl: string;
}

// Explainable AI Audit Log Entry
export interface AIAuditLogEntry {
  id: string;
  timestamp: string;
  agentName: string;
  inputSummary: string;
  promptSnippet: string;
  outputSummary: string;
  confidence: number;
  durationMs: number;
}

