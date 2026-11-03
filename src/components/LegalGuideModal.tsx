import React from 'react';
import { X, BookOpen, Scale, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LegalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalGuideModal: React.FC<LegalGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base font-serif">
              Indian Land Revenue & Succession Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700 leading-relaxed font-sans">
          <div>
            <h4 className="font-bold text-sm text-stone-900 font-serif mb-1 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-600" />
              1. What is Property Mutation (Varas / Namantaran)?
            </h4>
            <p>
              Mutation is the formal recording in the revenue department&apos;s ledger (Bhoomi, Mahabhulekh, Dharani) of the transfer of title from the deceased owner (Khatedar / Pattadar) to their legal heirs. Without mutation, heirs cannot legally sell, partition, pledge, or obtain government crop compensation or Rythu Bandhu.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-stone-900 font-serif mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              2. Hindu Succession Act (Amendment) 2005 & Daughter Rights
            </h4>
            <p>
              Under Section 6 as amended in 2005 and upheld in the landmark Supreme Court constitutional bench verdict (*Vineeta Sharma v. Rakesh Sharma*, 2020), daughters are coparceners by birth with equal shares as sons in ancestral agricultural land. The right accrues from birth, even if the father passed away before September 9, 2005.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-stone-900 font-serif mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-600" />
              3. Regional Land Record Terminology
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              <li className="bg-stone-50 p-2 rounded border">
                <strong>RTC / Pahani (Karnataka):</strong> Form 16, Col 9 (Owner), Col 11 (Liabilities), Col 12 (Mutation).
              </li>
              <li className="bg-stone-50 p-2 rounded border">
                <strong>7/12 Extract (Maharashtra):</strong> Gaon Namuna Saat (Rights) & Bara (Crops), Itar Hakka (Charges).
              </li>
              <li className="bg-stone-50 p-2 rounded border">
                <strong>Dharani / RoR (Telangana):</strong> Integrated digital passbook & succession (Virasat).
              </li>
              <li className="bg-stone-50 p-2 rounded border">
                <strong>Patta Chitta (Tamil Nadu):</strong> Register of holdings issued by Tahsildar / Taluk office.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-stone-900 font-serif mb-1">
              4. Why Name Discrepancies Cause Rejections at Taluk Offices
            </h4>
            <p>
              In older revenue records, names are often written without initials, with father&apos;s initials prefixed, or with regional caste honorifics (e.g., &ldquo;Mallappa Gowda&rdquo; vs &ldquo;M. N. Mallappa&rdquo; on Aadhaar). Revenue Inspectors and Village Accountants often flag this as a mismatch. Our portal identifies these and drafts a sworn <em>&ldquo;One and the Same Person&rdquo;</em> affidavit to satisfy the Tahsildar.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-stone-900 font-serif mb-1">
              5. Statutory Timeline under Sakala / Right to Services
            </h4>
            <p>
              Most states mandate a 30-day public objection period (Form 12 notice). If no objections are lodged, the Tahsildar / Revenue Inspector is bound to certify the mutation within 35 to 45 days under the Sakala / Guarantee of Services to Citizens Act.
            </p>
          </div>
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
