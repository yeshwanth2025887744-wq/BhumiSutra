import React from 'react';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  Landmark,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Printer,
  Copy,
  Check,
} from 'lucide-react';
import { SuccessionAnalysisResult, LandRecordDetails } from '../types';

interface SuccessionAnalysisViewProps {
  analysis: SuccessionAnalysisResult;
  landRecord: LandRecordDetails;
  onProceedToDrafts: () => void;
}

export const SuccessionAnalysisView: React.FC<SuccessionAnalysisViewProps> = ({
  analysis,
  landRecord,
  onProceedToDrafts,
}) => {
  return (
    <div className="space-y-6">
      {/* Banner Card */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-md border border-stone-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Statutory Revenue Analysis Ready
              </span>
              <span className="text-xs text-stone-400">
                Taluk Mutation & Succession Audit
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
              Legal Succession Order & Taluk Petition Advisory
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-3xl leading-relaxed">
              {analysis.legal_framework_summary}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            <button
              onClick={onProceedToDrafts}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View & Print Legal Petitions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Share Distribution & Name Discrepancies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Statutory Share Division */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-sm text-stone-800 uppercase tracking-wider font-mono">
                Possible / Indicative Share Distribution Matrix
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-900 bg-amber-100 font-bold px-2 py-0.5 rounded border border-amber-300">
              Requires verification by an authorized legal professional
            </span>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-600 uppercase font-mono text-[10px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="p-3">Potential Claimant / Heir</th>
                    <th className="p-3">Relationship & Category</th>
                    <th className="p-3 text-center">Indicative Share</th>
                    <th className="p-3 text-right">Indicative Extent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {analysis.share_distribution.map((heir, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{heir.heir_name}</div>
                        <div className="text-[10px] text-stone-500">{heir.status}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-stone-800">{heir.relationship}</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-mono">
                          {heir.legal_category}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="font-mono font-bold text-stone-900 text-sm">
                          {heir.fractional_share}
                        </div>
                        <div className="text-[10px] text-stone-500 font-mono">
                          (Indicative ~{heir.percentage_share}%)
                        </div>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-amber-900 bg-amber-50/30">
                        {heir.calculated_extent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual share distribution bar */}
            <div className="mt-5 pt-4 border-t border-stone-200">
              <span className="text-[11px] font-mono uppercase text-stone-500 block mb-2">
                Coparcenary & Succession Share Split
              </span>
              <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden flex shadow-inner">
                {analysis.share_distribution.map((heir, i) => {
                  const colors = [
                    'bg-amber-600',
                    'bg-emerald-600',
                    'bg-blue-600',
                    'bg-indigo-600',
                    'bg-rose-600',
                    'bg-teal-600',
                  ];
                  const color = colors[i % colors.length];
                  return (
                    <div
                      key={i}
                      style={{ width: `${Math.max(heir.percentage_share, 5)}%` }}
                      className={`${color} h-full transition-all hover:opacity-90 relative group`}
                      title={`${heir.heir_name}: ${heir.fractional_share}`}
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-stone-600">
                {analysis.share_distribution.map((heir, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-sm ${
                        [
                          'bg-amber-600',
                          'bg-emerald-600',
                          'bg-blue-600',
                          'bg-indigo-600',
                          'bg-rose-600',
                          'bg-teal-600',
                        ][i % 6]
                      }`}
                    ></span>
                    <span>
                      {heir.heir_name} ({heir.fractional_share})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Name Discrepancies & Revenue KYC Audit */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-sm text-stone-800 uppercase tracking-wider font-mono">
                  Name Discrepancy & KYC Audit
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-rose-50 text-rose-700 border border-rose-200">
                {analysis.name_discrepancies.length} Flagged Item(s)
              </span>
            </div>

            <div className="p-6 space-y-3.5">
              {analysis.name_discrepancies.length === 0 ? (
                <div className="p-6 text-center bg-emerald-50/50 rounded-xl border border-emerald-200 text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <p className="font-bold text-xs uppercase tracking-wider">
                    Zero Discrepancies Detected
                  </p>
                  <p className="text-xs text-stone-600 mt-1">
                    Names match across land records and identity cards without major phonetic variation.
                  </p>
                </div>
              ) : (
                analysis.name_discrepancies.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs text-stone-900 font-serif">
                        {item.person}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          item.severity === 'High'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {item.severity} Risk
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="bg-white p-2 rounded border border-stone-200">
                        <span className="text-[9px] text-stone-400 uppercase block">Name in Land Record:</span>
                        <span className="text-stone-800 font-bold">{item.name_in_rtc}</span>
                      </div>
                      <div className="bg-white p-2 rounded border border-stone-200">
                        <span className="text-[9px] text-stone-400 uppercase block">Name in Aadhaar / PAN:</span>
                        <span className="text-stone-800 font-bold">{item.name_in_id_proof}</span>
                      </div>
                    </div>

                    <div className="mt-2.5 text-xs text-stone-600">
                      <strong className="text-stone-800">Taluk Office Risk:</strong> {item.risk_at_taluk_office}
                    </div>

                    <div className="mt-2 p-2 rounded bg-amber-50 text-[11px] text-amber-900 border border-amber-200">
                      <strong>Legal Remedy:</strong> {item.rectification_procedure}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-4 bg-stone-50 border-t border-stone-200 text-xs text-stone-500">
            A &ldquo;One and the Same Person&rdquo; Notarized Affidavit has been auto-generated in Step 4 to resolve these mismatches before the Tahsildar.
          </div>
        </div>
      </div>

      {/* Required Taluk Petition Forms Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-sm text-stone-800 uppercase tracking-wider font-mono">
              Statutory Revenue Forms Required at Taluk / Tehsil Office
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-500">
            Revenue Department Statutory Filings
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.taluk_petition_forms_required.map((form, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/40 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-amber-100 text-amber-900 border border-amber-200">
                    {form.form_code}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {form.issuing_authority}
                  </span>
                </div>

                <h4 className="font-bold text-stone-900 text-sm mt-1">{form.form_title}</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{form.purpose}</p>

                <div className="mt-3 pt-2.5 border-t border-stone-100">
                  <span className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
                    Mandatory Attachments:
                  </span>
                  <ul className="text-[11px] text-stone-700 space-y-1">
                    {form.mandatory_attachments?.map((att, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{att}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encumbrance Resolution Alert */}
      {analysis.encumbrance_resolution_plan && (
        <div className="bg-amber-50/80 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 font-serif">
                Bank Encumbrance & Column 11 Clearing Protocol
              </h3>
              <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                {analysis.encumbrance_resolution_plan.required_action}
              </p>
              {analysis.encumbrance_resolution_plan.details && (
                <div className="mt-2 text-xs font-mono text-stone-800 bg-white/80 p-2.5 rounded-lg border border-amber-200">
                  Recorded Lien: {analysis.encumbrance_resolution_plan.details}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step Chronological Taluk Roadmap */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-sm text-stone-800 uppercase tracking-wider font-mono">
              Step-by-Step Legal Succession & Mutation Roadmap
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
            Sakala / Citizen Charter Timelines
          </span>
        </div>

        <div className="p-6">
          <div className="relative border-l-2 border-amber-300 ml-4 pl-6 space-y-6">
            {analysis.step_by_step_checklist.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] top-1 w-6 h-6 rounded-full bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">
                  {step.step_number || idx + 1}
                </div>

                <div className="bg-stone-50/70 group-hover:bg-amber-50/30 p-4 rounded-xl border border-stone-200 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="font-bold text-stone-900 text-sm">{step.title}</h4>
                    <span className="text-xs font-mono font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200 self-start sm:self-auto">
                      {step.statutory_timeline_days}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 font-mono mb-2">
                    Responsible Authority: <span className="text-stone-800 font-semibold">{step.authority}</span>
                  </p>

                  <p className="text-xs text-stone-700 leading-relaxed">{step.action_required}</p>

                  {step.pitfalls_to_avoid && (
                    <div className="mt-2.5 text-[11px] text-rose-800 bg-rose-50/80 p-2 rounded border border-rose-200 flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Crucial Pitfall:</strong> {step.pitfalls_to_avoid}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Roadmap compiled in accordance with State Land Revenue Acts & Sakala statutory service standards.
          </span>
          <button
            onClick={onProceedToDrafts}
            className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Proceed to Step 4: Legal Drafts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
