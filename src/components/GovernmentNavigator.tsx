import React from 'react';
import { ExternalLink, Landmark, Globe, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';
import { GovernmentPortalLink } from '../types';

interface GovernmentNavigatorProps {
  language: 'en' | 'kn';
}

export const GovernmentNavigator: React.FC<GovernmentNavigatorProps> = ({ language }) => {
  const isKn = language === 'kn';

  const portals: GovernmentPortalLink[] = [
    {
      id: 'bhoomi',
      name: 'Bhoomi Online Land Records',
      kannadaName: 'ಭೂಮಿ ಕಂದಾಯ ಪೋರ್ಟಲ್',
      service: 'RTC (Pahani) Extract, Mutation Status, MR Order & Revenue Maps',
      url: 'https://landrecords.karnataka.gov.in',
      requiredDocuments: 'District, Taluk, Hobli, Village, and Survey/Hissa Number',
      officialInstruction:
        'Verify your computerized RTC and check the 15-digit GSC mutation status under the "View Mutation Status" tab.',
    },
    {
      id: 'kaveri',
      name: 'Kaveri 2.0 Registration Services',
      kannadaName: 'ಕಾವೇರಿ ೨.೦ ನೋಂದಣಿ ಸೇವೆಗಳು',
      service: 'Encumbrance Certificate (EC 15-30 Yrs), Certified Copy of Sale/Partition Deeds',
      url: 'https://kaveri.karnataka.gov.in',
      requiredDocuments: 'Aadhaar login, Survey Number, Sub-Registrar Office Jurisdiction',
      officialInstruction:
        'Download digitally signed Form 15 Encumbrance Certificate to verify zero third-party mortgages or unrecorded court attachments.',
    },
    {
      id: 'mojini',
      name: 'Mojini Cadastral Survey & 11E Sketch',
      kannadaName: 'ಮೋಜಿನಿ ಸರ್ವೆ & ೧೧ಇ ನಕ್ಷೆ',
      service: '11E Sketch, Haddubasthu (Boundary Demarcation), Podi Durasti & Akarband',
      url: 'https://mojini.karnataka.gov.in',
      requiredDocuments: 'Current year RTC, Mutation MR Copy, Aadhaar of applicant',
      officialInstruction:
        'Apply for Haddubasthu survey to settle boundary discrepancies before civil disputes or partition execution.',
    },
    {
      id: 'nadakacheri',
      name: 'Nadakacheri (Atalji Janasnehi Kendra)',
      kannadaName: 'ನಾಡಕಚೇರಿ (ಅಟಲ್ ಜಿ ಜನಸ್ನೇಹಿ ಕೇಂದ್ರ)',
      service: 'Vamshavriksha (Genealogical Family Tree Certificate) & Death Certificate',
      url: 'https://nadakacheri.karnataka.gov.in',
      requiredDocuments: 'Deceased Death Certificate, Ration Card, Aadhaar of all legal heirs',
      officialInstruction:
        'Mandatory revenue document for Form 21 inheritance mutation. Issued after field inquiry by Village Accountant.',
    },
    {
      id: 'sakala',
      name: 'Sakala Guarantee of Services to Citizens',
      kannadaName: 'ಸಕಾಲ ನಾಗರಿಕ ಸೇವೆಗಳ ಖಾತರಿ ಮಿಷನ್',
      service: 'Statutory 35-45 Day Service Delivery Tracking & First Appeal against delays',
      url: 'https://sakala.kar.nic.in',
      requiredDocuments: '15-digit GSC acknowledgment receipt from Bhoomi / Grama One',
      officialInstruction:
        'If mutation is delayed beyond 45 days, file a Sakala First Appeal before the Assistant Commissioner (AC) for mandatory daily officer penalty.',
    },
    {
      id: 'sevasindhu',
      name: 'Seva Sindhu & Grama One',
      kannadaName: 'ಸೇವಾ ಸಿಂಧು & ಗ್ರಾಮ ಒನ್',
      service: 'Village-level single window submission for rural revenue services',
      url: 'https://sevasindhu.karnataka.gov.in',
      requiredDocuments: 'Mobile number, OTP, physical documents',
      officialInstruction:
        'Visit your local Grama One center to submit Form 21 without travelling to the Taluk headquarters.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              AUDIT PILLAR 7
            </span>
            <span className="text-xs text-stone-400">
              {isKn ? 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಕಂದಾಯ ಪೋರ್ಟಲ್‌ಗಳ ಮಾರ್ಗದರ್ಶಿ' : 'Karnataka Official Revenue Portals Navigator'}
            </span>
          </div>
          <h3 className="text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            {isKn ? 'ಕರ್ನಾಟಕ ಕಂದಾಯ ಸೇವೆಗಳ ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಮಾರ್ಗದರ್ಶಿ' : 'Karnataka Government Services & Verification Navigator'}
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            {isKn
              ? 'ಮಧ್ಯವರ್ತಿಗಳ ಅಗತ್ಯವಿಲ್ಲದೆ, ಅಧಿಕೃತ ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ಗಳ ಮೂಲಕ ನೇರವಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಂಪರ್ಕ ಕೊಂಡಿಗಳು'
              : 'Direct links and official verification instructions to cut out middlemen'}
          </p>
        </div>

        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-700/60 self-start sm:self-center">
          6 Official Portals
        </span>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portals.map((portal) => (
          <div
            key={portal.id}
            className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-200">
                  GOVT OF KARNATAKA
                </span>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-emerald-600 transition-colors cursor-pointer"
                  title="Open Official Portal"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <h4 className="font-bold text-stone-900 text-sm font-serif">
                {isKn ? portal.kannadaName : portal.name}
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{portal.service}</p>

              <div className="mt-3 pt-2.5 border-t border-stone-100 space-y-1 text-[11px]">
                <div className="text-stone-500 font-mono">
                  <strong className="text-stone-700">Inputs:</strong> {portal.requiredDocuments}
                </div>
                <div className="text-stone-700 bg-white p-2 rounded border border-stone-200">
                  <strong className="text-emerald-800">Instruction:</strong> {portal.officialInstruction}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 flex justify-end">
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>{isKn ? 'ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ' : 'Open Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
