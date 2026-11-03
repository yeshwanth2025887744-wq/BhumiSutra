import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  GitFork,
  ArrowRight,
  FileText,
  AlertTriangle,
  Scale,
  ShieldAlert,
  CheckCircle2,
  Users,
  RotateCcw,
} from 'lucide-react';
import { FamilyMember, WhatIfScenarioState } from '../types';

interface WhatIfSimulatorProps {
  familyMembers: FamilyMember[];
  totalExtent: string;
  language: 'en' | 'kn';
  onApplyScenario?: (scenarios: WhatIfScenarioState) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  familyMembers,
  totalExtent,
  language,
  onApplyScenario,
}) => {
  const isKn = language === 'kn';

  const [scenarios, setScenarios] = useState<WhatIfScenarioState>({
    sonPredeceased: false,
    daughterRelinquishes: false,
    minorHeir: false,
    secondSpouse: false,
    willExists: false,
  });

  const toggleScenario = (key: keyof WhatIfScenarioState) => {
    const updated = { ...scenarios, [key]: !scenarios[key] };
    setScenarios(updated);
    if (onApplyScenario) {
      onApplyScenario(updated);
    }
  };

  const handleReset = () => {
    const resetState: WhatIfScenarioState = {
      sonPredeceased: false,
      daughterRelinquishes: false,
      minorHeir: false,
      secondSpouse: false,
      willExists: false,
    };
    setScenarios(resetState);
    if (onApplyScenario) {
      onApplyScenario(resetState);
    }
  };

  // Compute simulated dynamic outcome based on active toggles
  const activeCount = Object.values(scenarios).filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-stone-900 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-indigo-100">
                {isKn ? '"ಏನಾಗಬಹುದು?" ಸಂಭವನೀಯ ಸನ್ನಿವೇಶಗಳ ಸಿಮ್ಯುಲೇಟರ್' : 'What-If? Succession Scenario Simulator'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-400/20 text-indigo-300 rounded border border-indigo-400/40">
                Interactive Legal Sandbox
              </span>
            </div>
            <p className="text-[11px] text-stone-300">
              {isKn
                ? 'ಕುಟುಂಬದ ವಿಭಿನ್ನ ಸಂದರ್ಭಗಳಲ್ಲಿ ವಾರಸುದಾರರ ಹಕ್ಕುಗಳು ಮತ್ತು ಹೆಚ್ಚುವರಿ ದಾಖಲೆಗಳ ಅಗತ್ಯತೆಯನ್ನು ಮುನ್ಸೂಚಿಸಿ'
                : 'Simulate contingency scenarios to preview procedural changes, extra court permissions, and statutory share variations'}
            </p>
          </div>
        </div>

        {activeCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isKn ? 'ಮರುಹೊಂದಿಸಿ' : 'Reset Scenarios'}</span>
          </button>
        )}
      </div>

      {/* Mandatory Guardrail disclaimer banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-5 py-2 text-xs text-amber-900 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
        <p className="font-medium">
          <strong>Legal Guardrail:</strong> All outcomes shown below are{' '}
          <span className="underline font-bold">Possible / Indicative</span> and{' '}
          <span className="bg-amber-200/80 px-1 rounded font-bold">require verification by an authorized legal professional</span>.
        </p>
      </div>

      <div className="p-5 space-y-6">
        {/* Toggle options grid */}
        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
            {isKn ? 'ಪರೀಕ್ಷಿಸಬೇಕಾದ ಸನ್ನಿವೇಶಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ:' : 'Select Contingency Scenarios to Test:'}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Toggle 1: Son predeceased */}
            <button
              onClick={() => toggleScenario('sonPredeceased')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                scenarios.sonPredeceased
                  ? 'border-indigo-500 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-xs text-stone-900">
                  {isKn ? '೧. ಮಗನು ಮೊದಲೇ ಮರಣ ಹೊಂದಿದ್ದರೆ' : '1. Son Predeceased the Owner'}
                </span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                    scenarios.sonPredeceased ? 'bg-indigo-600 text-white' : 'border border-stone-400'
                  }`}
                >
                  {scenarios.sonPredeceased && '✓'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                {isKn
                  ? 'ಮಗನ ವಿಧವೆ ಪತ್ನಿ ಹಾಗೂ ಮಕ್ಕಳು ಶಾಖಾ ಹಕ್ಕಿನ ಮೂಲಕ ಪಾಲನ್ನು ಪಡೆಯುತ್ತಾರೆ (HSA Sec 8/10)'
                  : 'Predeceased son’s branch (widow & children) take his 1/4 share collectively by representation.'}
              </p>
            </button>

            {/* Toggle 2: Daughter relinquishes */}
            <button
              onClick={() => toggleScenario('daughterRelinquishes')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                scenarios.daughterRelinquishes
                  ? 'border-indigo-500 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-xs text-stone-900">
                  {isKn ? '೨. ಮಗಳು ಹಕ್ಕು ಬಿಟ್ಟುಕೊಟ್ಟರೆ (NOC)' : '2. Daughter Relinquishes Share (NOC)'}
                </span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                    scenarios.daughterRelinquishes ? 'bg-indigo-600 text-white' : 'border border-stone-400'
                  }`}
                >
                  {scenarios.daughterRelinquishes && '✓'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                {isKn
                  ? 'ನೋಂದಾಯಿತ ಹಕ್ಕುತ್ಯಾಗ ಪತ್ರದ ಮೂಲಕ ಉಳಿದ ವಾರಸುದಾರರ ಪಾಲು ಹೆಚ್ಚುತ್ತದೆ'
                  : 'Requires registered Relinquishment Deed (ಹಕ್ಕುತ್ಯಾಗ ಪತ್ರ); remaining heirs share increases proportionally.'}
              </p>
            </button>

            {/* Toggle 3: Minor heir */}
            <button
              onClick={() => toggleScenario('minorHeir')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                scenarios.minorHeir
                  ? 'border-indigo-500 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-xs text-stone-900">
                  {isKn ? '೩. ಅಪ್ರಾಪ್ತ ವಯಸ್ಕ ವಾರಸುದಾರರಿದ್ದರೆ' : '3. An Heir is a Minor (< 18 yrs)'}
                </span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                    scenarios.minorHeir ? 'bg-indigo-600 text-white' : 'border border-stone-400'
                  }`}
                >
                  {scenarios.minorHeir && '✓'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                {isKn
                  ? 'ನೈಸರ್ಗಿಕ ಪಾಲಕತ್ವ ಅಥವಾ ಸಿವಿಲ್ ನ್ಯಾಯಾಲಯದ ಪಾಲಕತ್ವ ಆದೇಶ ಅನಿವಾರ್ಯ'
                  : 'Natural guardian acts; no relinquishment allowed on behalf of minor without District Court sanction.'}
              </p>
            </button>

            {/* Toggle 4: Second spouse */}
            <button
              onClick={() => toggleScenario('secondSpouse')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                scenarios.secondSpouse
                  ? 'border-indigo-500 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-xs text-stone-900">
                  {isKn ? '೪. ಎರಡನೇ ಪತ್ನಿ/ಮಕ್ಕಳ ಹಕ್ಕಿನ ಕ್ಲೈಮ್' : '4. Second Spouse / Children Claim'}
                </span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                    scenarios.secondSpouse ? 'bg-indigo-600 text-white' : 'border border-stone-400'
                  }`}
                >
                  {scenarios.secondSpouse && '✓'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                {isKn
                  ? 'ಮಕ್ಕಳಿಗೆ ಪೂರ್ಣ ಹಕ್ಕು (Sec 16), ಆದರೆ ಎರಡನೇ ಪತ್ನಿಯ ಮಾನ್ಯತೆಗೆ ಕಟ್ಟುನಿಟ್ಟಾದ ಪುರಾವೆ ಅಗತ್ಯ'
                  : 'Children of second union inherit under Section 16; spouse entitlement depends on prior marriage dissolution.'}
              </p>
            </button>

            {/* Toggle 5: Registered will */}
            <button
              onClick={() => toggleScenario('willExists')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                scenarios.willExists
                  ? 'border-indigo-500 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-semibold text-xs text-stone-900">
                  {isKn ? '೫. ನೋಂದಾಯಿತ ಉಯಿಲು (Will) ಇದ್ದರೆ' : '5. Registered Will / Testament Exists'}
                </span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                    scenarios.willExists ? 'bg-indigo-600 text-white' : 'border border-stone-400'
                  }`}
                >
                  {scenarios.willExists && '✓'}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                {isKn
                  ? 'ವಾರಸು ನಿಯಮಗಳನ್ನು ಮೀರಿ ಉಯಿಲಿನಂತೆ ಹಂಚಿಕೆಯಾಗುತ್ತದೆ; ತಾಲೂಕು ವಿಚಾರಣೆ ಕಡ್ಡಾಯ'
                  : 'Testamentary succession overrides intestate rules; requires attestation proof and notice under Section 129.'}
              </p>
            </button>
          </div>
        </div>

        {/* Before vs After Impact Comparison */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-700" />
              <span>{isKn ? 'ಹೋಲಿಕೆ: ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ vs ಸಂಭವನೀಯ ಸನ್ನಿವೇಶ' : 'Before vs After Scenario Comparison'}</span>
            </h4>
            <span className="text-[11px] font-mono text-indigo-800 font-semibold bg-indigo-100 px-2 py-0.5 rounded">
              {activeCount === 0 ? 'Baseline Model Active' : `${activeCount} Conditions Applied`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Baseline */}
            <div className="p-3.5 bg-white rounded-lg border border-stone-200 text-xs space-y-2">
              <div className="font-bold text-stone-700 border-b border-stone-100 pb-1.5 flex items-center justify-between">
                <span>Baseline (Default Succession)</span>
                <span className="text-[10px] font-mono text-emerald-700">Class I Heirs</span>
              </div>
              <p className="text-stone-600 text-[11px]">
                • <strong className="text-stone-800">Indicative Shares:</strong> Equal 1/4th (25%) entitlement across Widow, Son, and 2 Daughters (0 Acres 24.5 Guntas each).
              </p>
              <p className="text-stone-600 text-[11px]">
                • <strong className="text-stone-800">Required Documents:</strong> Standard Death Certificate, Family Tree Affidavit, RTC extract, Aadhaar proofs.
              </p>
              <p className="text-stone-600 text-[11px]">
                • <strong className="text-stone-800">Procedure:</strong> Direct Form 21 inheritance petition before Village Accountant.
              </p>
            </div>

            {/* Simulated Active Outcome */}
            <div className="p-3.5 bg-indigo-50/50 rounded-lg border border-indigo-200 text-xs space-y-2">
              <div className="font-bold text-indigo-900 border-b border-indigo-200 pb-1.5 flex items-center justify-between">
                <span>{isKn ? 'ಸಂಭವನೀಯ ಫಲಿತಾಂಶ (ಸಿಮ್ಯುಲೇಶನ್)' : 'Simulated Scenario Outcome'}</span>
                <span className="text-[10px] font-mono bg-indigo-200/80 text-indigo-900 px-1.5 py-0.5 rounded font-bold">
                  Indicative Only
                </span>
              </div>

              {activeCount === 0 ? (
                <p className="text-stone-500 italic text-[11px] py-3 text-center">
                  Select one or more toggles above to see how shares, paperwork, and risks shift dynamically.
                </p>
              ) : (
                <>
                  {scenarios.sonPredeceased && (
                    <div className="text-[11px] text-stone-700">
                      <strong className="text-indigo-900">• Predeceased Son Impact:</strong> Son’s 1/4 share does not lapse; it passes to his surviving wife and children by stirpital representation. Requires their death/heir certificates.
                    </div>
                  )}

                  {scenarios.daughterRelinquishes && (
                    <div className="text-[11px] text-stone-700">
                      <strong className="text-indigo-900">• Relinquishment Impact:</strong> Surviving heirs share expands to 1/3rd (33.3%) each (~32 Guntas each). Mandatory registered Release Deed at Sub-Registrar Office with stamp duty.
                    </div>
                  )}

                  {scenarios.minorHeir && (
                    <div className="text-[11px] text-stone-700">
                      <strong className="text-indigo-900">• Minor Protection:</strong> Minor’s share is protected by statute. Any sale or mortgage of minor’s share requires prior permission of District Court under Guardians and Wards Act.
                    </div>
                  )}

                  {scenarios.secondSpouse && (
                    <div className="text-[11px] text-stone-700">
                      <strong className="text-indigo-900">• Disputed Second Union:</strong> High probability of objection during Form 12 notice. Revenue authorities will mandate civil court declaration of heirship.
                    </div>
                  )}

                  {scenarios.willExists && (
                    <div className="text-[11px] text-stone-700">
                      <strong className="text-indigo-900">• Will Probate Requirement:</strong> Tahsildar cannot determine will validity if contested; matter must be adjudicated before competent Civil Court.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Extra Actionable Checklist when scenarios active */}
        {activeCount > 0 && (
          <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl space-y-2">
            <h5 className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-800" />
              <span>{isKn ? 'ಹೆಚ್ಚುವರಿ ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ (ಸನ್ನಿವೇಶ ಆಧಾರಿತ):' : 'Additional Procedural Requirements (Contingency Specific):'}</span>
            </h5>
            <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
              {scenarios.daughterRelinquishes && (
                <li>Registered Release Deed (ಹಕ್ಕುತ್ಯಾಗ ಪತ್ರ) registered before Sub-Registrar with ₹1,000 stamp duty.</li>
              )}
              {scenarios.minorHeir && (
                <li>Birth certificate of minor + appointment of legal guardian through Natural Guardian Affidavit.</li>
              )}
              {scenarios.willExists && (
                <li>Original Registered Will + Attestation Affidavit of 2 subscribing witnesses under Indian Evidence Act.</li>
              )}
              {scenarios.sonPredeceased && (
                <li>Death certificate of predeceased son + separate Family Tree Affidavit for his lineage branch.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
