import React from 'react';
import { X, BookOpen, HelpCircle, FileText, CheckCircle2, Info } from 'lucide-react';
import { RTCGlossaryItem } from '../types';

interface RTCExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'kn';
}

export const RTCExplainerModal: React.FC<RTCExplainerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;
  const isKn = language === 'kn';

  const glossaryItems: RTCGlossaryItem[] = [
    {
      term: 'Column 9 (Kabjedar / Khatedar)',
      kannadaTerm: 'ಕಾಲಂ ೯ (ಕಬ್ಜೇದಾರರ ಹೆಸರು)',
      columnOrLocation: 'RTC Front Page, Column 9',
      simpleExplanation:
        'The legally recorded landholder or owner responsible for land revenue. When this person dies, inheritance mutation (Varasa) is mandatory to update Column 9.',
      kannadaExplanation:
        'ಜಮೀನಿನ ಅಧಿಕೃತ ಮಾಲೀಕರ ಹೆಸರು. ಈ ವ್ಯಕ್ತಿ ತೀರಿಕೊಂಡಾಗ, ಅವರ ವಾರಸುದಾರರ ಹೆಸರನ್ನು ಇಲ್ಲಿ ಸೇರಿಸುವುದನ್ನೇ "ವಾರಸು ಖಾತೆ ಬದಲಾವಣೆ" ಎನ್ನಲಾಗುತ್ತದೆ.',
      commonPitfall:
        'Middlemen often say possession is enough; without your name in Column 9, you cannot get bank loans, sell, or receive government crop loss compensation.',
    },
    {
      term: 'Column 11 (Other Rights & Liabilities)',
      kannadaTerm: 'ಕಾಲಂ ೧೧ (ಇತರ ಹಕ್ಕುಗಳು / ಋಣಭಾರ)',
      columnOrLocation: 'RTC Front Page, Column 11',
      simpleExplanation:
        'Records bank crop loans, mortgages, court stays, or government charges. The land cannot be partitioned or sold with clean title until deleted via Form 22 / NDC.',
      kannadaExplanation:
        'ಬ್ಯಾಂಕ್ ಕೃಷಿ ಸಾಲ, ಅಡಮಾನ, ಅಥವಾ ನ್ಯಾಯಾಲಯದ ತಡೆಯಾಜ್ಞೆಗಳ ವಿವರಗಳು ಇಲ್ಲಿ ದಾಖಲಾಗಿರುತ್ತವೆ. ಸಾಲ ತೀರಿಸಿದ ನಂತರ ಬ್ಯಾಂಕಿನಿಂದ NDC ಪಡೆದು ಇದನ್ನು ರದ್ದು ಮಾಡಿಸಬೇಕು.',
      commonPitfall:
        'Repaying the loan is not enough; you must submit the Bank NDC to the Tahsildar to physically delete the entry from Bhoomi.',
    },
    {
      term: 'Kharab B (Pot Kharab)',
      kannadaTerm: 'ಖರಾಬು "ಬಿ" (ಸಾರ್ವಜನಿಕ ಬಳಕೆ ಜಮೀನು)',
      columnOrLocation: 'RTC Column 4 (Extent Breakdown)',
      simpleExplanation:
        'Land assigned for public purposes (village roads, footpaths, streams, burial grounds). It is uncultivable and unalienable by private individuals.',
      kannadaExplanation:
        'ಸಾರ್ವಜನಿಕ ರಸ್ತೆ, ಹಳ್ಳ, ಅಥವಾ ಸ್ಮಶಾನಕ್ಕೆ ಮೀಸಲಾದ ಜಮೀನು. ಈ ಭಾಗವನ್ನು ಯಾರೂ ಮಾರಾಟ ಮಾಡಲು ಅಥವಾ ಖಾಸಗಿಯಾಗಿ ಕಬ್ಜಾ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ.',
      commonPitfall:
        'Buyers calculate price on total extent without subtracting Kharab B, leading to boundary disputes with the Gram Panchayat.',
    },
    {
      term: 'Kushki, Tari & Bagayat',
      kannadaTerm: 'ಖುಷ್ಕಿ, ತರಿ ಮತ್ತು ಬಾಗಾಯ್ತು',
      columnOrLocation: 'RTC Column 7 & 8 (Soil & Land Class)',
      simpleExplanation:
        'Kushki = Rainfed dryland; Tari = Canal/wet irrigated land; Bagayat = Well-irrigated coconut/arecanut garden land. Dictates revenue tax and loan scales.',
      kannadaExplanation:
        'ಖುಷ್ಕಿ = ಮಳೆ ಆಶ್ರಿತ ಒಣಭೂಮಿ; ತರಿ = ಕಾಲುವೆ ನೀರಾವರಿ ಗದ್ದೆ; ಬಾಗಾಯ್ತು = ಬಾವಿ ನೀರಾವರಿಯ ತೋಟದ ಜಮೀನು.',
      commonPitfall:
        'Banks verify land classification to calculate Kisan Credit Card (KCC) scale of finance.',
    },
    {
      term: 'Mutation Register (MR Number) & J-Slip',
      kannadaTerm: 'ಮ್ಯುಟೇಷನ್ ನಂಬರ್ (MR No) & ಜೆ-ಸ್ಲಿಪ್',
      columnOrLocation: 'RTC Column 12 (Remarks & Notes)',
      simpleExplanation:
        'The official computerized order number sanctioning a change in the land ledger (e.g. MR No. 12/2008-09). J-Slip is the joint survey slip confirming new entries.',
      kannadaExplanation:
        'ಖಾತೆ ಬದಲಾವಣೆಗೆ ತಹಶೀಲ್ದಾರರು ಹೊರಡಿಸಿದ ಅಧಿಕೃತ ಗಣಕೀಕೃತ ಆದೇಶ ಸಂಖ್ಯೆ. ಜೆ-ಸ್ಲಿಪ್ ಎಂದರೆ ಸರ್ವೆ ಇಲಾಖೆ ನೀಡುವ ಜಂಟಿ ಸ್ಲಿಪ್.',
      commonPitfall:
        'Without a valid MR number in Column 12, manual handwritten changes on RTCs are considered invalid/unverified by sub-registrars.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in duration-150">
        <div className="p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base font-serif">
              {isKn ? 'ಪಹಣಿ ವಿವರಣೆ (Explain My Land Record)' : 'Explain My Land Record: Plain Language Revenue Guide'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs font-sans">
          <p className="text-stone-600 leading-relaxed">
            {isKn
              ? 'ಕಂದಾಯ ಇಲಾಖೆಯ ಕಠಿಣ ಪದಗಳನ್ನು ಸಾಮಾನ್ಯ ರೈತರಿಗೆ ಅರ್ಥವಾಗುವಂತೆ ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಲಾಗಿದೆ:'
              : 'Demystifying complex RTC and Revenue terminology into practical guidance for rural families:'}
          </p>

          <div className="space-y-3">
            {glossaryItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <h4 className="font-bold text-sm text-stone-900 font-serif">
                    {isKn ? item.kannadaTerm : item.term}
                  </h4>
                  <span className="text-[10px] font-mono text-stone-500 bg-white px-2 py-0.5 rounded border self-start sm:self-auto">
                    {item.columnOrLocation}
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed mt-1">
                  {isKn ? item.kannadaExplanation : item.simpleExplanation}
                </p>

                <div className="mt-2 text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isKn ? 'ಸಾಮಾನ್ಯ ತಪ್ಪು / ಎಚ್ಚರಿಕೆ:' : 'Crucial Pitfall:'}</strong> {item.commonPitfall}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {isKn ? 'ಮುಚ್ಚಿ' : 'Close Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};
