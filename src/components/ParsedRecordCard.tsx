import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Landmark,
  Scale,
  Edit3,
  Check,
  Building2,
  FileText,
  BadgeAlert,
  ArrowRight,
} from 'lucide-react';
import { LandRecordDetails } from '../types';

interface ParsedRecordCardProps {
  record: LandRecordDetails;
  onUpdateRecord: (updated: LandRecordDetails) => void;
  onProceedToHeirs: () => void;
  onProceedToDashboard?: () => void;
}

export const ParsedRecordCard: React.FC<ParsedRecordCardProps> = ({
  record,
  onUpdateRecord,
  onProceedToHeirs,
  onProceedToDashboard,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<LandRecordDetails>({ ...record });

  const handleSave = () => {
    onUpdateRecord(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header bar */}
      <div className="px-6 py-4 bg-stone-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base font-serif text-white">
                Extracted Land Record Details
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                OCR & Revenue Verified
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Extracted via Gemini 3.8 Flash • Model Schema: LandRecordDetails
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Overrides</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer border border-stone-700"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Fields</span>
            </button>
          )}

          <div className="flex items-center gap-1 px-2.5 py-1 bg-stone-800 rounded-lg text-xs font-mono text-stone-300 border border-stone-700">
            <span>Score:</span>
            <span className="text-emerald-400 font-bold">
              {(record.confidence_score * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Deceased status alert block */}
        <div
          className={`p-4 rounded-xl border mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            record.is_owner_deceased_indicator
              ? 'bg-rose-50/70 border-rose-200 text-rose-900'
              : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                record.is_owner_deceased_indicator
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {record.is_owner_deceased_indicator ? (
                <BadgeAlert className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {record.is_owner_deceased_indicator
                    ? 'Owner Deceased Indicator: Confirmed (Succession & Mutation Required)'
                    : 'Owner Deceased Indicator: Active / Living on Record'}
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded font-bold bg-white/80 border">
                  Boolean: {String(record.is_owner_deceased_indicator)}
                </span>
              </div>
              <p className="text-xs mt-1 text-stone-600">
                {record.deceased_clues_explanation ||
                  (record.is_owner_deceased_indicator
                    ? 'Land record contains mortuary prefix, death notice, or pending inheritance mutation.'
                    : 'No death remarks found. If the owner has recently passed, you can mark deceased to initiate succession analysis.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {isEditing ? (
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-stone-300">
                <input
                  type="checkbox"
                  checked={formData.is_owner_deceased_indicator}
                  onChange={(e) =>
                    setFormData({ ...formData, is_owner_deceased_indicator: e.target.checked })
                  }
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
                <span>Mark as Deceased</span>
              </label>
            ) : (
              !record.is_owner_deceased_indicator && (
                <button
                  onClick={() => {
                    onUpdateRecord({
                      ...record,
                      is_owner_deceased_indicator: true,
                      deceased_clues_explanation: 'Marked manually by applicant for legal heir succession filing.',
                    });
                  }}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Mark Owner as Deceased
                </button>
              )
            )}
          </div>
        </div>

        {/* Core fields grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Survey Number */}
          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Field 1 • survey_number
            </span>
            {isEditing ? (
              <input
                type="text"
                value={formData.survey_number}
                onChange={(e) => setFormData({ ...formData, survey_number: e.target.value })}
                className="mt-1 w-full text-sm font-bold font-mono p-1.5 bg-white border border-stone-300 rounded"
              />
            ) : (
              <p className="font-mono font-bold text-stone-900 text-lg mt-0.5">
                {record.survey_number}
              </p>
            )}
            <span className="text-xs text-stone-500">Survey No / Hissa / Gat No</span>
          </div>

          {/* Total Extent */}
          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Field 2 • total_extent
            </span>
            {isEditing ? (
              <input
                type="text"
                value={formData.total_extent}
                onChange={(e) => setFormData({ ...formData, total_extent: e.target.value })}
                className="mt-1 w-full text-sm font-bold p-1.5 bg-white border border-stone-300 rounded"
              />
            ) : (
              <p className="font-bold text-stone-900 text-lg mt-0.5">
                {record.total_extent}
              </p>
            )}
            <span className="text-xs text-stone-500">Acres, Guntas, Hectares or Bigha</span>
          </div>

          {/* Recorded Owner */}
          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Field 3 • recorded_owner
            </span>
            {isEditing ? (
              <input
                type="text"
                value={formData.recorded_owner}
                onChange={(e) => setFormData({ ...formData, recorded_owner: e.target.value })}
                className="mt-1 w-full text-sm font-bold p-1.5 bg-white border border-stone-300 rounded"
              />
            ) : (
              <p className="font-bold text-amber-950 text-base mt-0.5">
                {record.recorded_owner}
              </p>
            )}
            <span className="text-xs text-stone-500">Khatedar / Pattadar Name in Col 9</span>
          </div>

          {/* Khata / Patta Number */}
          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Revenue Account / Khata
            </span>
            {isEditing ? (
              <input
                type="text"
                value={formData.khata_or_patta_number || ''}
                onChange={(e) => setFormData({ ...formData, khata_or_patta_number: e.target.value })}
                className="mt-1 w-full text-sm font-bold p-1.5 bg-white border border-stone-300 rounded"
              />
            ) : (
              <p className="font-semibold text-stone-800 text-sm mt-0.5">
                {record.khata_or_patta_number || 'Khata Not Explicit'}
              </p>
            )}
            <span className="text-xs text-stone-500">Ledger Index / Patta ID</span>
          </div>

          {/* Location & Jurisdiction */}
          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Revenue Jurisdiction
            </span>
            {isEditing ? (
              <input
                type="text"
                value={formData.district_and_state || ''}
                onChange={(e) => setFormData({ ...formData, district_and_state: e.target.value })}
                className="mt-1 w-full text-sm font-bold p-1.5 bg-white border border-stone-300 rounded"
              />
            ) : (
              <p className="font-semibold text-stone-800 text-sm mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="truncate">{record.district_and_state || 'Taluk Jurisdiction'}</span>
              </p>
            )}
            <span className="text-xs text-stone-500">State / District / Taluk</span>
          </div>

          {/* Land Classification */}
          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Land Type & Soil Class
            </span>
            {isEditing ? (
              <input
                type="text"
                value={formData.land_classification || ''}
                onChange={(e) => setFormData({ ...formData, land_classification: e.target.value })}
                className="mt-1 w-full text-sm font-bold p-1.5 bg-white border border-stone-300 rounded"
              />
            ) : (
              <p className="font-semibold text-stone-800 text-sm mt-0.5">
                {record.land_classification || 'Agricultural Land'}
              </p>
            )}
            <span className="text-xs text-stone-500">Kushki / Tari / Bagayat / Inam</span>
          </div>
        </div>

        {/* Encumbrances & Bank Loans Block */}
        <div className="mt-4 p-4 rounded-xl border border-amber-200 bg-amber-50/50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
              <Landmark className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
                  Field 5 • encumbrances_or_loans (Column 11 / Itar Hakka)
                </span>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  Revenue Charge Audit
                </span>
              </div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={formData.encumbrances_or_loans}
                  onChange={(e) =>
                    setFormData({ ...formData, encumbrances_or_loans: e.target.value })
                  }
                  className="mt-2 w-full text-xs font-mono p-2 bg-white border border-amber-300 rounded"
                />
              ) : (
                <p className="text-xs font-mono text-stone-800 mt-1 font-medium bg-white/70 p-2.5 rounded-lg border border-amber-200/70">
                  {record.encumbrances_or_loans}
                </p>
              )}
              <p className="text-[11px] text-stone-500 mt-1.5">
                Bank crop loans or mortgage charges in Column 11 will require a Bank No Due Certificate (NDC) or Form 22 Discharge deed before or during mutation.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button to Next Step */}
        <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Extracted parameters are verified. Explore the full family succession tree or view the unified Core Dashboard.
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {onProceedToDashboard && (
              <button
                onClick={onProceedToDashboard}
                className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📱 Core Dashboard (Score & Petitions)</span>
              </button>
            )}
            <button
              onClick={onProceedToHeirs}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Step 2: Heirs & Lineage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
