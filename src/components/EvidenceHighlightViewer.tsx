import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Edit2,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { FieldBoundingBox, LandRecordDetails } from '../types';

interface EvidenceHighlightViewerProps {
  record: LandRecordDetails;
  language: 'en' | 'kn';
  onUpdateFieldValue?: (fieldKey: string, newValue: string) => void;
}

export const EvidenceHighlightViewer: React.FC<EvidenceHighlightViewerProps> = ({
  record,
  language,
  onUpdateFieldValue,
}) => {
  const isKn = language === 'kn';

  // Simulated bounding box fields detected from the regional RTC Pahani
  const [fields, setFields] = useState<FieldBoundingBox[]>([
    {
      fieldKey: 'survey_number',
      label: 'Survey / Hissa Number',
      kannadaLabel: 'ಸರ್ವೆ / ಹಿಸ್ಸಾ ನಂಬರ್',
      value: record.survey_number || '142/2B',
      sourceDoc: 'Karnataka_Bhoomi_RTC_Form16.pdf',
      sourceColumn: 'Column 1 & 2 (Survey & Sub-division)',
      confidence: 0.99,
      box: { x: 8, y: 14, width: 22, height: 7 },
    },
    {
      fieldKey: 'recorded_owner',
      label: 'Recorded Khatedar (Owner)',
      kannadaLabel: 'ಕಬ್ಜೇದಾರರ ಹೆಸರು (ಖಾತೆದಾರರು)',
      value: record.recorded_owner || 'Late Sri Mallappa Gowda',
      sourceDoc: 'Karnataka_Bhoomi_RTC_Form16.pdf',
      sourceColumn: 'Column 9 (Kabjedar / Khatedar)',
      confidence: 0.97,
      box: { x: 38, y: 23, width: 56, height: 8 },
    },
    {
      fieldKey: 'kannada_owner_name',
      label: 'Regional Kannada Name',
      kannadaLabel: 'ಕನ್ನಡ ಹೆಸರು ಲಿಪ್ಯಂತರ',
      value: record.kannada_owner_name || 'ಲೇಟ್ ಶ್ರೀ ಮಲ್ಲಪ್ಪ ಗೌಡ ಬಿನ್ ಲೇಟ್ ನಂಜಪ್ಪ ಗೌಡ',
      sourceDoc: 'Karnataka_Bhoomi_RTC_Form16.pdf',
      sourceColumn: 'Column 9 (Original Kannada script)',
      confidence: 0.96,
      box: { x: 38, y: 32, width: 56, height: 7 },
    },
    {
      fieldKey: 'total_extent',
      label: 'Total Extent Area',
      kannadaLabel: 'ಒಟ್ಟು ವಿಸ್ತೀರ್ಣ (ವಿಸ್ತಾರ)',
      value: record.total_extent || '2 Acres 18 Guntas',
      sourceDoc: 'Karnataka_Bhoomi_RTC_Form16.pdf',
      sourceColumn: 'Column 3 (Total Extent - A.G)',
      confidence: 0.98,
      box: { x: 8, y: 23, width: 26, height: 8 },
    },
    {
      fieldKey: 'land_classification',
      label: 'Soil / Land Classification',
      kannadaLabel: 'ಜಮೀನಿನ ವಿವರ (ಕುಷ್ಕಿ/ತರಿ)',
      value: record.land_classification || 'Kushki (Dry Agri)',
      sourceDoc: 'Karnataka_Bhoomi_RTC_Form16.pdf',
      sourceColumn: 'Column 7 (Land Class)',
      confidence: 0.94,
      box: { x: 8, y: 32, width: 26, height: 6 },
    },
    {
      fieldKey: 'deceased_indicator',
      label: 'Deceased Khatedar Indication',
      kannadaLabel: 'ಖಾತೆದಾರರ ಮರಣ ಸೂಚನೆ',
      value: record.is_owner_deceased_indicator
        ? 'Deceased ("Late" prefix in Col 9 & Col 12 remarks)'
        : 'Active Living Khatedar',
      sourceDoc: 'Karnataka_Bhoomi_RTC_Form16.pdf',
      sourceColumn: 'Column 9 & Column 12 (Remarks)',
      confidence: 0.92,
      box: { x: 38, y: 41, width: 56, height: 9 },
    },
    {
      fieldKey: 'encumbrances_or_loans',
      label: 'Encumbrance / Bank Charge',
      kannadaLabel: 'ಬ್ಯಾಂಕ್ ಹೊಣೆಗಾರಿಕೆ / ಸಾಲದ ನಮೂದು',
      value: record.encumbrances_or_loans || 'Canara Bank Crop Loan ₹3,50,000 under MR No. 34/2019-20',
      sourceDoc: 'Karnataka_Bhoomi_RTC_Form16.pdf',
      sourceColumn: 'Column 11 (Other Rights / Encumbrance)',
      confidence: 0.88,
      box: { x: 8, y: 53, width: 86, height: 11 },
    },
    {
      fieldKey: 'mutation_number',
      label: 'Previous Mutation Order (MR No)',
      kannadaLabel: 'ಹಿಂದಿನ ಮ್ಯುಟೇಷನ್ ನಂಬರ್ (ಎಂ.ಆರ್)',
      value: record.historical_comparison?.mutation_number || 'MR 12/2011-12',
      sourceDoc: 'Karnataka_Bhoomi_RTC_Form16.pdf',
      sourceColumn: 'Column 10 (Mutation Register Reference)',
      confidence: 0.68, // Low confidence to demonstrate "Please confirm" editing!
      needsConfirmation: true,
      box: { x: 8, y: 66, width: 42, height: 7 },
    },
  ]);

  const [selectedFieldKey, setSelectedFieldKey] = useState<string>('recorded_owner');
  const [editingFieldKey, setEditingFieldKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const activeField = fields.find((f) => f.fieldKey === selectedFieldKey) || fields[0];

  const handleStartEdit = (f: FieldBoundingBox) => {
    setEditingFieldKey(f.fieldKey);
    setEditValue(f.value);
  };

  const handleSaveEdit = (fieldKey: string) => {
    setFields((prev) =>
      prev.map((f) =>
        f.fieldKey === fieldKey
          ? { ...f, value: editValue, needsConfirmation: false, confidence: 1.0 }
          : f
      )
    );
    if (onUpdateFieldValue) {
      onUpdateFieldValue(fieldKey, editValue);
    }
    setEditingFieldKey(null);
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.9) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          High ({Math.round(confidence * 100)}%)
        </span>
      );
    } else if (confidence >= 0.7) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-300">
          <AlertCircle className="w-3 h-3 text-amber-600" />
          Medium ({Math.round(confidence * 100)}%)
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-300 animate-pulse">
          <AlertCircle className="w-3 h-3 text-rose-600" />
          {isKn ? 'ದಯವಿಟ್ಟು ಖಚಿತಪಡಿಸಿ' : 'Please Confirm'} ({Math.round(confidence * 100)}%)
        </span>
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-amber-100">
                {isKn ? 'ದಾಖಲೆಯ ಮೇಲಿನ ಪುರಾವೆ ಗುರುತು ವೀಕ್ಷಕ' : 'Highlight-on-Document Evidence Viewer'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-400/10 text-amber-300 rounded border border-amber-400/30">
                Trust Engine 2.0
              </span>
            </div>
            <p className="text-[11px] text-stone-300">
              {isKn
                ? 'ಪ್ರತಿಯೊಂದು ಮಾಹಿತಿಯ ಮೂಲ ಕಾಲಂ ಮತ್ತು ನಿರ್ದಿಷ್ಟ ಜಾಗವನ್ನು ನೇರವಾಗಿ ನೈಜ ದಾಖಲೆಯಲ್ಲಿ ಪರಿಶೀಲಿಸಿ'
                : 'Interactive bounding box overlay connecting every extracted field directly to its source location on the RTC Pahani'}
            </p>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1.5 bg-stone-950/70 px-2 py-1 rounded-lg border border-stone-700 text-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.max(80, z - 10))}
            className="p-1 hover:text-amber-400 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] px-1 text-stone-300">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
            className="p-1 hover:text-amber-400 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Dual-Pane layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
        {/* Left Side: Authentic Document Canvas / Simulated RTC */}
        <div className="lg:col-span-7 p-4 sm:p-5 bg-stone-100 flex flex-col">
          <div className="flex items-center justify-between mb-3 text-xs text-stone-600">
            <span className="font-semibold flex items-center gap-1.5 text-stone-800">
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              Source: <span className="font-mono text-stone-700">Karnataka Bhoomi Form 16 (Pahani)</span>
            </span>
            <span className="text-[11px] font-mono text-stone-500 bg-stone-200 px-2 py-0.5 rounded">
              SYNTHETIC SAMPLE DATA
            </span>
          </div>

          {/* Interactive Document Viewport */}
          <div className="flex-1 overflow-auto max-h-[560px] bg-white border border-stone-300 rounded-xl shadow-inner p-3 relative select-none">
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
              className="relative w-[650px] min-h-[750px] bg-[#fffdfa] border-2 border-stone-400 p-5 rounded font-mono text-stone-800 text-[11px] shadow-sm transition-transform"
            >
              {/* Document Header Watermark */}
              <div className="border-b-2 border-stone-800 pb-3 mb-3 text-center">
                <div className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                  Government of Karnataka • Department of Revenue • Bhoomi Portal
                </div>
                <div className="text-sm font-bold font-serif text-stone-900 mt-0.5">
                  RECORD OF RIGHTS, TENANCY AND CROPS (ಪಹಣಿ / ಆರ್.ಟಿ.ಸಿ)
                </div>
                <div className="text-[10px] text-stone-600 mt-0.5">
                  Form No. 16 (Rule 58) • Devanahalli Taluk, Bengaluru Rural
                </div>
              </div>

              {/* Simulated RTC Grid Structure */}
              <div className="border border-stone-400 mb-2 p-2 bg-stone-50/70 text-[10px] grid grid-cols-3 gap-2">
                <div>
                  <span className="font-bold text-stone-600">District:</span> Bengaluru Rural
                </div>
                <div>
                  <span className="font-bold text-stone-600">Taluk:</span> Devanahalli
                </div>
                <div>
                  <span className="font-bold text-stone-600">Hobli/Village:</span> Vijayapura / Channarayapatna
                </div>
              </div>

              {/* Columns Grid Simulation */}
              <div className="grid grid-cols-12 border-2 border-stone-800 text-[10px] divide-x divide-stone-400 mb-3 bg-stone-50 font-sans">
                <div className="col-span-3 p-1.5 font-bold bg-stone-200/80 text-stone-800">
                  Col 1 & 2: Survey / Hissa
                </div>
                <div className="col-span-3 p-1.5 font-bold bg-stone-200/80 text-stone-800">
                  Col 3-8: Extent & Soil
                </div>
                <div className="col-span-6 p-1.5 font-bold bg-stone-200/80 text-stone-800">
                  Col 9-12: Kabjedar, Mutation & Encumbrance
                </div>
              </div>

              {/* Simulated Document Text Body */}
              <div className="space-y-4 pt-1 font-serif text-xs leading-relaxed text-stone-800">
                <div className="p-2 border border-dashed border-stone-300 rounded bg-white">
                  <div className="font-bold text-stone-700 text-[11px] mb-1">
                    [COLUMNS 1 & 2: CADASTRAL REFERENCE]
                  </div>
                  <p>
                    Survey No: <span className="font-mono font-bold bg-amber-50 px-1">142/2B</span> | Khata: No. 512 | Land Assessment: ₹ 14.50
                  </p>
                </div>

                <div className="p-2 border border-dashed border-stone-300 rounded bg-white">
                  <div className="font-bold text-stone-700 text-[11px] mb-1">
                    [COLUMNS 3 TO 8: EXTENT & CLASSIFICATION]
                  </div>
                  <p>
                    Total Extent: <span className="font-mono font-bold bg-amber-50 px-1">2 Acres 18 Guntas</span> (A: 02, G: 18) | Pot Kharab (B): 0.04 Guntas | Net Cultivable: 2 Acres 14 Guntas
                  </p>
                  <p className="mt-1 text-stone-600 text-[11px]">
                    Classification: <span className="font-mono font-semibold">Kushki (Dry Agricultural Land)</span> | Source of Water: Rainfed
                  </p>
                </div>

                <div className="p-2 border border-dashed border-stone-300 rounded bg-white">
                  <div className="font-bold text-stone-700 text-[11px] mb-1">
                    [COLUMN 9: KABJEDAR / RECORDED KHATEDAR]
                  </div>
                  <p className="text-stone-900 font-semibold">
                    <span className="font-mono font-bold text-amber-900 bg-amber-50 px-1">
                      Late Sri Mallappa Gowda s/o Late Nanjappa Gowda
                    </span>
                  </p>
                  <p className="text-stone-700 font-sans text-[11px] mt-0.5">
                    ಕನ್ನಡದಲ್ಲಿ: <span className="font-bold text-stone-900">ಲೇಟ್ ಶ್ರೀ ಮಲ್ಲಪ್ಪ ಗೌಡ ಬಿನ್ ಲೇಟ್ ನಂಜಪ್ಪ ಗೌಡ</span>
                  </p>
                </div>

                <div className="p-2 border border-dashed border-stone-300 rounded bg-white">
                  <div className="font-bold text-stone-700 text-[11px] mb-1">
                    [COLUMN 11 & 12: OTHER RIGHTS & ENCUMBRANCE LIENS]
                  </div>
                  <p className="text-stone-800">
                    <span className="font-mono bg-amber-50 px-1">
                      Canara Bank Devanahalli Branch Crop Loan Mortgage ₹3,50,000/-
                    </span>
                  </p>
                  <p className="text-stone-600 text-[11px] mt-0.5">
                    Mutation Ref: <span className="font-mono font-semibold">MR No. 34/2019-20</span> | Registered charge in favor of Bank
                  </p>
                  <p className="text-stone-600 text-[11px] mt-1 italic">
                    Historical Mutation: <span className="font-mono">MR 12/2011-12</span> (Inheritance partition from Nanjappa Gowda)
                  </p>
                </div>
              </div>

              {/* DYNAMIC HIGHLIGHT OVERLAYS */}
              {fields.map((f) => {
                const isSelected = f.fieldKey === selectedFieldKey;
                return (
                  <div
                    key={f.fieldKey}
                    onClick={() => setSelectedFieldKey(f.fieldKey)}
                    style={{
                      left: `${f.box.x}%`,
                      top: `${f.box.y}%`,
                      width: `${f.box.width}%`,
                      height: `${f.box.height}%`,
                    }}
                    className={`absolute rounded transition-all cursor-pointer flex items-start justify-end p-0.5 ${
                      isSelected
                        ? 'border-2 border-amber-600 bg-amber-400/25 ring-4 ring-amber-400/30 z-20 shadow-lg'
                        : 'border border-amber-500/40 bg-amber-200/10 hover:bg-amber-300/20 z-10'
                    }`}
                  >
                    <span
                      className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold shadow-xs ${
                        isSelected
                          ? 'bg-amber-600 text-white'
                          : 'bg-stone-800/80 text-amber-200'
                      }`}
                    >
                      {f.confidence < 0.7 ? '⚠️ Check' : `${Math.round(f.confidence * 100)}%`}
                    </span>
                  </div>
                );
              })}

              {/* Official Seal Mockup */}
              <div className="absolute bottom-5 right-5 w-24 h-24 rounded-full border-2 border-stone-400 flex flex-col items-center justify-center text-center p-1 opacity-60 pointer-events-none">
                <span className="text-[7px] uppercase font-bold tracking-wider">Tahsil Office</span>
                <span className="text-[8px] font-serif font-bold text-amber-800">DEVANAHALLI</span>
                <span className="text-[6px]">DIGITALLY SIGNED</span>
              </div>
            </div>
          </div>

          <div className="mt-2 text-[11px] text-stone-500 flex items-center justify-between">
            <span>💡 Click any highlighted box or select from the right panel to inspect exact source</span>
            <span className="text-stone-400">Scale: {zoomLevel}%</span>
          </div>
        </div>

        {/* Right Side: Structured Extracted Fields with Evidence Breakdown */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-white flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h4 className="font-bold text-sm text-stone-900">
                {isKn ? 'ಹೊರತೆಗೆದ ಕ್ಷೇತ್ರಗಳ ಪಟ್ಟಿ' : 'Extracted Fields & Citations'}
              </h4>
              <p className="text-xs text-stone-500">
                {fields.length} {isKn ? 'ಕ್ಷೇತ್ರಗಳನ್ನು ಗುರುತಿಸಲಾಗಿದೆ' : 'fields anchored to source columns'}
              </p>
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              {fields.filter((f) => f.confidence >= 0.9).length}/{fields.length} High Confidence
            </span>
          </div>

          {/* Fields list */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {fields.map((f) => {
              const isSelected = f.fieldKey === selectedFieldKey;
              const isEditing = editingFieldKey === f.fieldKey;

              return (
                <div
                  key={f.fieldKey}
                  onClick={() => setSelectedFieldKey(f.fieldKey)}
                  className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 shadow-sm ring-1 ring-amber-500'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-stone-900">
                      {isKn ? f.kannadaLabel : f.label}
                    </span>
                    {getConfidenceBadge(f.confidence)}
                  </div>

                  {/* Value row with inline editor */}
                  {isEditing ? (
                    <div className="mt-2 flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 px-2.5 py-1 text-xs border border-amber-500 rounded bg-white text-stone-900 font-mono focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(f.fieldKey)}
                        className="px-2 py-1 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-700 cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 my-1">
                      <div className="font-mono text-sm font-bold text-stone-900 truncate">
                        {f.value}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(f);
                        }}
                        className="text-stone-400 hover:text-amber-700 p-1 rounded cursor-pointer"
                        title="Edit value manually"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Source Metadata & Column Citation */}
                  <div className="mt-2 pt-2 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                    <span className="font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {f.sourceColumn}
                    </span>
                    <span className="text-stone-400 text-[10px] truncate max-w-[140px]">
                      {f.sourceDoc}
                    </span>
                  </div>

                  {/* Warning banner for low confidence */}
                  {f.confidence < 0.7 && !isEditing && (
                    <div className="mt-2 p-1.5 bg-rose-50 border border-rose-200 rounded text-[11px] text-rose-800 flex items-center justify-between">
                      <span className="font-semibold">
                        {isKn ? 'ಕಡಿಮೆ ವಿಶ್ವಾಸಾರ್ಹತೆ: ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ' : 'Low confidence: verify value'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(f);
                        }}
                        className="underline font-bold text-rose-900 hover:text-rose-700"
                      >
                        {isKn ? 'ತಿದ್ದಿ' : 'Edit Now'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Verification requirement footer note */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 text-[11px] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong className="text-stone-800">Human-in-the-Loop Standard:</strong>{' '}
              All extracted fields are indicative and subject to verification against certified extracts issued by the Taluk Bhoomi Kiosk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
