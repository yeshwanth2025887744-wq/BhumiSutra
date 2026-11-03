import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Trash2,
  Scale,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Info,
  Calendar,
  ShieldAlert,
  ArrowRight,
  Loader2,
  FileBadge,
} from 'lucide-react';
import { LandRecordDetails, FamilyMember } from '../types';

interface FamilyTreeBuilderProps {
  landRecord: LandRecordDetails;
  familyMembers: FamilyMember[];
  setFamilyMembers: React.Dispatch<React.SetStateAction<FamilyMember[]>>;
  deceasedDate: string;
  setDeceasedDate: (date: string) => void;
  personalLaw: string;
  setPersonalLaw: (law: string) => void;
  propertyType: string;
  setPropertyType: (prop: string) => void;
  hasWill: boolean;
  setHasWill: (val: boolean) => void;
  discrepancyNotes: string;
  setDiscrepancyNotes: (notes: string) => void;
  onRunSuccessionAnalysis: () => void;
  isAnalyzing: boolean;
}

export const FamilyTreeBuilder: React.FC<FamilyTreeBuilderProps> = ({
  landRecord,
  familyMembers,
  setFamilyMembers,
  deceasedDate,
  setDeceasedDate,
  personalLaw,
  setPersonalLaw,
  propertyType,
  setPropertyType,
  hasWill,
  setHasWill,
  discrepancyNotes,
  setDiscrepancyNotes,
  onRunSuccessionAnalysis,
  isAnalyzing,
}) => {
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    relationship: 'Son (Class I Heir)',
    aadhaarName: '',
    age: 35,
    gender: 'Male',
    maritalStatus: 'Married',
    isNocOrRelinquishing: false,
  });

  const handleAddMember = () => {
    if (!newMember.name?.trim()) return;
    const member: FamilyMember = {
      id: `heir-${Date.now()}`,
      name: newMember.name.trim(),
      relationship: newMember.relationship || 'Son (Class I Heir)',
      aadhaarName: newMember.aadhaarName?.trim() || newMember.name.trim(),
      age: Number(newMember.age) || 30,
      gender: newMember.gender || 'Male',
      maritalStatus: newMember.maritalStatus || 'Married',
      isNocOrRelinquishing: !!newMember.isNocOrRelinquishing,
    };
    setFamilyMembers((prev) => [...prev, member]);
    setNewMember({
      name: '',
      relationship: 'Son (Class I Heir)',
      aadhaarName: '',
      age: 30,
      gender: 'Male',
      maritalStatus: 'Married',
      isNocOrRelinquishing: false,
    });
  };

  const handleRemoveMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleToggleNoc = (id: string) => {
    setFamilyMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isNocOrRelinquishing: !m.isNocOrRelinquishing } : m
      )
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Step Header */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            STEP 2 OF 4
          </span>
          <span className="text-xs text-stone-400">Legal Succession & Family Pedigree</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
          Deceased Land Owner & Surviving Family Tree
        </h2>
        <p className="text-sm text-stone-300 mt-1 max-w-2xl">
          Specify the deceased khatedar&apos;s personal law, date of demise, and surviving heirs. Enter names as per Aadhaar/PAN to automatically flag spelling discrepancies against the revenue record.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Deceased Owner & Succession Baseline Settings */}
        <div className="p-5 bg-stone-50/80 rounded-xl border border-stone-200">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-4 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-amber-600" />
            Deceased Landholder Profile & Applicable Revenue Law
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recorded Owner Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Deceased Owner (in Land Record)
              </label>
              <input
                type="text"
                disabled
                value={landRecord.recorded_owner}
                className="w-full text-xs font-bold p-2.5 bg-stone-100 border border-stone-300 rounded-lg text-stone-800"
              />
            </div>

            {/* Date of Demise */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                Date of Demise (or approx year)
              </label>
              <input
                type="date"
                value={deceasedDate}
                onChange={(e) => setDeceasedDate(e.target.value)}
                className="w-full text-xs font-mono p-2.5 bg-white border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-amber-500/20 outline-none"
              />
            </div>

            {/* Applicable Personal Law */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Applicable Succession Act
              </label>
              <select
                value={personalLaw}
                onChange={(e) => setPersonalLaw(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-amber-500/20 outline-none cursor-pointer"
              >
                <option value="Hindu Succession Act, 1956 (as amended 2005)">
                  Hindu Succession Act, 1956 (Amended 2005)
                </option>
                <option value="Muslim Personal Law (Shariat) Application Act, 1937">
                  Muslim Personal Law (Shariat) 1937
                </option>
                <option value="Indian Succession Act, 1925 (Christian / Parsi)">
                  Indian Succession Act, 1925 (Christian/Parsi)
                </option>
                <option value="Special Marriage Act / Civil Succession">
                  Special Marriage Act / Civil Succession
                </option>
              </select>
            </div>

            {/* Nature of Property */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Property Devolution Nature
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg text-stone-800 focus:ring-2 focus:ring-amber-500/20 outline-none cursor-pointer"
              >
                <option value="Ancestral Agricultural Land (Coparcenary Property)">
                  Ancestral Agricultural Land (Coparcenary)
                </option>
                <option value="Self-Acquired Land (Absolute Ownership)">
                  Self-Acquired Land (Absolute Ownership)
                </option>
                <option value="Partition Deed / Family Settlement Devolution">
                  Partition Deed / Family Settlement
                </option>
                <option value="Inam / Grant Land (Government Granted)">
                  Inam / PTCL Grant Land
                </option>
              </select>
            </div>
          </div>

          {/* Secondary settings: Will & Special Notes */}
          <div className="mt-4 pt-3 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasWill}
                  onChange={(e) => setHasWill(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
                <span>Is there any registered or unregistered Will (Testamentary)?</span>
              </label>
              <span className="text-[11px] text-stone-500">
                {hasWill ? '(Will mutation protocol)' : '(Default: Intestate succession)'}
              </span>
            </div>

            <div>
              <input
                type="text"
                placeholder="Optional: Known name variations or notes (e.g. Aadhaar spelling vs RTC)"
                value={discrepancyNotes}
                onChange={(e) => setDiscrepancyNotes(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg text-stone-700 placeholder-stone-400 focus:ring-2 focus:ring-amber-500/20 outline-none"
              />
            </div>
          </div>

          <div className="mt-3 text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200/80 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Statutory Note (HSA 2005 Sec 6 & Vineeta Sharma Ruling):</strong> In ancestral property, daughters are coparceners by birth with equal rights and liabilities as sons. If the deceased was a Hindu male dying intestate, his Class I heirs (Widow, Mother, Sons, and Daughters) inherit equal absolute shares.
            </span>
          </div>
        </div>

        {/* Existing Legal Heirs Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                Surviving Legal Heirs & Claimants ({familyMembers.length})
              </h3>
              <p className="text-xs text-stone-500">
                Verify each heir&apos;s name as in their official identity card (Aadhaar / Voter ID / Passport).
              </p>
            </div>

            <div className="text-xs font-mono text-stone-500">
              {familyMembers.filter((m) => !m.isNocOrRelinquishing).length} Active Claimants
            </div>
          </div>

          {familyMembers.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300">
              <Users className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-700">No family members added yet</p>
              <p className="text-xs text-stone-500 mt-1">
                Add surviving spouse, sons, daughters, or mother using the form below.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-700 uppercase font-mono text-[10px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="p-3">Heir Name</th>
                    <th className="p-3">Relationship</th>
                    <th className="p-3">Name in Aadhaar / PAN</th>
                    <th className="p-3 text-center">Age / Gender</th>
                    <th className="p-3 text-center">Relinquish / NOC</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  {familyMembers.map((member) => (
                    <tr
                      key={member.id}
                      className={`hover:bg-stone-50/80 transition-colors ${
                        member.isNocOrRelinquishing ? 'bg-stone-50/50 opacity-70' : 'bg-white'
                      }`}
                    >
                      <td className="p-3">
                        <div className="font-semibold text-stone-900">{member.name}</div>
                        <div className="text-[10px] text-stone-400 font-mono">
                          {member.maritalStatus}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-md font-medium text-[11px] bg-stone-100 text-stone-800 border border-stone-200">
                          {member.relationship}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="font-mono text-stone-800">{member.aadhaarName}</div>
                        {member.name.toLowerCase() !== member.aadhaarName.toLowerCase() && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-medium">
                            <ShieldAlert className="w-3 h-3" />
                            Alias / Spelling diff
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-mono text-stone-700">{member.age} yrs</span> •{' '}
                        <span className="text-stone-500">{member.gender}</span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleNoc(member.id)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer transition-colors ${
                            member.isNocOrRelinquishing
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {member.isNocOrRelinquishing
                            ? 'Waiving Rights (NOC)'
                            : 'Claiming Share'}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove heir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Heir Input Bar */}
        <div className="p-4 bg-stone-50/70 rounded-xl border border-stone-200">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-3">
            Add Another Family Member / Legal Heir
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Full Name (in Family Pedigree)
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Gowda"
                value={newMember.name || ''}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Relationship to Deceased
              </label>
              <select
                value={newMember.relationship}
                onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value })}
                className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/20 outline-none cursor-pointer"
              >
                <option value="Surviving Widow (Wife)">Surviving Widow (Wife)</option>
                <option value="Surviving Husband">Surviving Husband</option>
                <option value="Son (Class I Heir)">Son (Class I Heir)</option>
                <option value="Daughter (Class I Coparcener)">Daughter (Class I Coparcener)</option>
                <option value="Mother (Class I Heir under HSA)">Mother (Class I Heir)</option>
                <option value="Father (Class II Heir under HSA)">Father (Class II Heir)</option>
                <option value="Grandson / Granddaughter (from Predeceased Child)">
                  Child of Predeceased Son/Daughter
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Name as printed in Aadhaar / PAN
              </label>
              <input
                type="text"
                placeholder="e.g. M. Ramesh Gowda"
                value={newMember.aadhaarName || ''}
                onChange={(e) => setNewMember({ ...newMember, aadhaarName: e.target.value })}
                className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/20 outline-none"
              />
            </div>

            <div className="flex items-end gap-2">
              <div className="w-20">
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={newMember.age || 30}
                  onChange={(e) => setNewMember({ ...newMember, age: parseInt(e.target.value) || 0 })}
                  className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/20 outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddMember}
                disabled={!newMember.name?.trim()}
                className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Heir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button: Run Succession Analysis */}
        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-stone-500 max-w-lg">
            Ready to compute statutory share divisions, audit ID discrepancies, and generate the Taluk mutation checklist and sworn affidavits.
          </div>

          <button
            type="button"
            disabled={isAnalyzing || familyMembers.length === 0}
            onClick={onRunSuccessionAnalysis}
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running Succession & Taluk Analysis...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Legal Succession & Mutation Checklist</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
