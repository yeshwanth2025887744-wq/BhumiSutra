import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Calendar,
  Copy,
  Check,
  AlertCircle,
  Bell,
  MessageSquare,
  FileText,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { CaseMilestone } from '../types';

interface CaseTrackerRemindersProps {
  surveyNumber: string;
  language: 'en' | 'kn';
}

export const CaseTrackerReminders: React.FC<CaseTrackerRemindersProps> = ({
  surveyNumber,
  language,
}) => {
  const isKn = language === 'kn';
  const [copiedEn, setCopiedEn] = useState(false);
  const [copiedKn, setCopiedKn] = useState(false);

  const [milestones, setMilestones] = useState<CaseMilestone[]>([
    {
      id: 'step-1',
      title: 'Form 21 Succession Petition Submission to Village Accountant (VA)',
      kannadaTitle: 'ಗ್ರಾಮ ಲೆಕ್ಕಿಗರಿಗೆ (VA) ನಮೂನೆ ೨೧ ವಾರಸು ಅರ್ಜಿ ಸಲ್ಲಿಕೆ',
      authority: 'Village Accountant / Revenue Inspector Office',
      status: 'DONE',
      statutoryDays: 7,
      submittedDate: '2024-02-01',
      completedDate: '2024-02-05',
      notes: 'Form 21 acknowledged with official stamp and GSC tracking token.',
    },
    {
      id: 'step-2',
      title: 'Mandatory 30-Day Form 12 Public Objection Notice Window',
      kannadaTitle: 'ನಮೂನೆ ೧೨ ರ ಅನ್ವಯ ೩೦ ದಿನಗಳ ಸಾರ್ವಜನಿಕ ಆಕ್ಷೇಪಣಾ ಅವಧಿ',
      authority: 'Taluk Office & Gram Panchayat Notice Board',
      status: 'UNDER_OBJECTION_WINDOW',
      daysRemaining: 18,
      statutoryDays: 30,
      submittedDate: '2024-02-06',
      notes: 'Public notice displayed at Chavadi; 12 days elapsed, 18 days remaining for objections.',
    },
    {
      id: 'step-3',
      title: 'Mojini Cadastral 11E Tippani Sketch & Boundary Verification',
      kannadaTitle: 'ಮೋಜಣಿ ೧೧ಇ ಟಿಪ್ಪಣಿ ನಕ್ಷೆ ಹಾಗೂ ಚಕ್ಕುಬಂದಿ ಸ್ಥಳ ಪರಿಶೀಲನೆ',
      authority: 'Taluk ADLR / Licensed Surveyor',
      status: 'SUBMITTED',
      daysRemaining: 14,
      statutoryDays: 21,
      submittedDate: '2024-02-10',
      notes: 'Survey fee ₹2,000 paid under Sakala GSC-2024-11892.',
    },
    {
      id: 'step-4',
      title: 'Tahsildar J-Slip Approval & Final Bhoomi RTC Column 9 Update',
      kannadaTitle: 'ತಹಶೀಲ್ದಾರ್ ಜೆ-ಸ್ಲಿಪ್ ಅನುಮೋದನೆ ಮತ್ತು ಪಹಣಿ ಕಾಲಂ ೯ ಅಂತಿಮ ಬದಲಾವಣೆ',
      authority: 'Tahsildar Devanahalli (Sakala Service Guarantee)',
      status: 'NOT_STARTED',
      daysRemaining: 35,
      statutoryDays: 35,
      notes: 'Final digital signature on RTC with MR number generation.',
    },
  ]);

  const updateMilestoneStatus = (id: string, newStatus: CaseMilestone['status']) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              status: newStatus,
              daysRemaining: newStatus === 'DONE' ? 0 : m.daysRemaining,
              completedDate: newStatus === 'DONE' ? new Date().toISOString().split('T')[0] : undefined,
            }
          : m
      )
    );
  };

  // WhatsApp Reminder message generation
  const activeStep = milestones.find((m) => m.status === 'UNDER_OBJECTION_WINDOW') || milestones[1];
  const whatsAppReminderKn = `🔔 *ಭೂಮಿಸೂತ್ರ ಕಂದಾಯ ಜ್ಞಾಪನೆ*: ಸರ್ವೆ ನಂ ${surveyNumber} ರ ವಾರಸು ಪ್ರಕ್ರಿಯೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ. ನಮೂನೆ ೧೨ ಸಾರ್ವಜನಿಕ ಆಕ್ಷೇಪಣಾ ಅವಧಿಗೆ ಇನ್ನೂ ${activeStep.daysRemaining} ದಿನಗಳು ಬಾಕಿ ಇವೆ. ದಿನಾಂಕ ${activeStep.submittedDate} ರ ನಂತರ ತಾಲೂಕು ಕಚೇರಿಯ ಗ್ರಾಮ ಲೆಕ್ಕಿಗರನ್ನು ಸಂಪರ್ಕಿಸಿ ಜೆ-ಸ್ಲಿಪ್ ಮುದ್ರಣಕ್ಕೆ ಕೋರಿ.`;
  const whatsAppReminderEn = `🔔 *BhumiSutra Revenue Reminder*: Succession process for Survey No. ${surveyNumber} is active. Form 12 Public Notice has ${activeStep.daysRemaining} days remaining. Follow up with Village Accountant after objection window closes for final J-Slip endorsement under Sakala.`;

  const copyToClipboard = (text: string, lang: 'en' | 'kn') => {
    navigator.clipboard.writeText(text);
    if (lang === 'en') {
      setCopiedEn(true);
      setTimeout(() => setCopiedEn(false), 2000);
    } else {
      setCopiedKn(true);
      setTimeout(() => setCopiedKn(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="px-5 py-4 bg-gradient-to-r from-stone-900 to-amber-950 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-base text-amber-100">
                {isKn ? 'ನನ್ನ ಪ್ರಕರಣದ ಟ್ರ್ಯಾಕರ್ ಮತ್ತು ಜ್ಞಾಪನೆಗಳು' : 'My Case Tracker & Sakala Reminders'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40 font-semibold">
                GSC / Sakala 35-Day Guarantee
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              {isKn
                ? 'ವಾರಸು ಮ್ಯುಟೇಷನ್ ಪ್ರಕ್ರಿಯೆಯ ಪ್ರತಿಯೊಂದು ಹಂತ, ದಿನಗಳ ಲೆಕ್ಕಾಚಾರ ಮತ್ತು ವಾಟ್ಸಾಪ್ ಸಂದೇಶಗಳು'
                : 'Monitor your mutation workflow milestones, objection countdowns, and automated family follow-up reminders'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-stone-950/70 px-3 py-1.5 rounded-xl border border-stone-700">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-200">
            Survey: <span className="font-bold text-white">{surveyNumber}</span>
          </span>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Milestone Timeline cards */}
        <div className="space-y-4">
          {milestones.map((milestone, idx) => {
            const isDone = milestone.status === 'DONE';
            const isInWindow = milestone.status === 'UNDER_OBJECTION_WINDOW';
            const isSubmitted = milestone.status === 'SUBMITTED';

            return (
              <div
                key={milestone.id}
                className={`p-4 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : isInWindow
                    ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20'
                    : isSubmitted
                    ? 'bg-blue-50/40 border-blue-200'
                    : 'bg-stone-50/50 border-stone-200 opacity-75'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isInWindow
                          ? 'bg-amber-600 text-white animate-pulse'
                          : isSubmitted
                          ? 'bg-blue-600 text-white'
                          : 'bg-stone-300 text-stone-700'
                      }`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">
                        {isKn ? milestone.kannadaTitle : milestone.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-mono mt-0.5">
                        Authority: {milestone.authority}
                      </p>
                    </div>
                  </div>

                  {/* Status chip & Days remaining */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {isInWindow && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        {milestone.daysRemaining} days left
                      </span>
                    )}
                    {isDone && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ✓ Completed
                      </span>
                    )}
                    {isSubmitted && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-blue-100 text-blue-800 border border-blue-300">
                        In Progress
                      </span>
                    )}

                    {/* Quick status dropdown / toggle */}
                    <select
                      value={milestone.status}
                      onChange={(e) =>
                        updateMilestoneStatus(
                          milestone.id,
                          e.target.value as CaseMilestone['status']
                        )
                      }
                      className="text-xs bg-white border border-stone-300 rounded px-2 py-1 font-semibold text-stone-700 focus:outline-none cursor-pointer"
                    >
                      <option value="NOT_STARTED">Not Started</option>
                      <option value="SUBMITTED">Submitted</option>
                      <option value="UNDER_OBJECTION_WINDOW">Objection Window</option>
                      <option value="DONE">Completed (Done)</option>
                    </select>
                  </div>
                </div>

                {/* Notes and date footer */}
                <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                  <span className="italic">{milestone.notes}</span>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-stone-500">
                    {milestone.submittedDate && (
                      <span>Submitted: {milestone.submittedDate}</span>
                    )}
                    {milestone.completedDate && (
                      <span className="text-emerald-700 font-bold">
                        Approved: {milestone.completedDate}
                      </span>
                    )}
                    <span>Statutory SLA: {milestone.statutoryDays} Days</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* COPY WHATSAPP REMINDER MESSAGE SECTION */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-950">
                {isKn ? 'ಕುಟುಂಬದವರಿಗೆ & ಗ್ರಾಮಸ್ಥರಿಗೆ ವಾಟ್ಸಾಪ್ ಜ್ಞಾಪನೆ ಕಳುಹಿಸಿ' : 'Copy Family WhatsApp Reminder Message'}
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded">
              One-Click Copy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Kannada Message Card */}
            <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-[11px]">
                <span className="font-bold text-stone-700 font-mono">ಕನ್ನಡ ಸಂದೇಶ (Kannada):</span>
                <button
                  onClick={() => copyToClipboard(whatsAppReminderKn, 'kn')}
                  className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
                >
                  {copiedKn ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKn ? 'ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!' : 'ಕಾಪಿ ಮಾಡಿ'}</span>
                </button>
              </div>
              <p className="text-stone-800 font-serif leading-relaxed text-[11px] bg-stone-50 p-2 rounded border border-stone-200">
                {whatsAppReminderKn}
              </p>
            </div>

            {/* English Message Card */}
            <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500 text-[11px]">
                <span className="font-bold text-stone-700 font-mono">English Message:</span>
                <button
                  onClick={() => copyToClipboard(whatsAppReminderEn, 'en')}
                  className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
                >
                  {copiedEn ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEn ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
              <p className="text-stone-800 font-serif leading-relaxed text-[11px] bg-stone-50 p-2 rounded border border-stone-200">
                {whatsAppReminderEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
