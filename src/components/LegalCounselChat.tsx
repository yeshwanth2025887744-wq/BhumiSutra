import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Scale,
  Sparkles,
  Bot,
  User,
  Loader2,
  HelpCircle,
  BookOpen,
  Shield,
  FileQuestion,
} from 'lucide-react';
import { LandRecordDetails } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface LegalCounselChatProps {
  landRecord?: LandRecordDetails | null;
}

const PRESET_QUESTIONS = [
  'Can daughters claim equal share if the father died before the 2005 amendment?',
  'What happens if someone files an objection during the 30-day Form 12 public notice period?',
  'How do we remove the bank crop loan lien from Column 11 of the RTC?',
  'What is the statutory Sakala timeline for Bhoomi / Taluk mutation approval?',
  'Is a registered Vamshavriksha from Nadakacheri mandatory before filing mutation?',
];

export const LegalCounselChat: React.FC<LegalCounselChatProps> = ({ landRecord }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Namaste. I am your Senior Revenue Advocate & Succession Law Specialist.
I can advise you on the Hindu Succession Act (including the 2005 coparcenary amendment & Vineeta Sharma ruling), Muslim Personal Law (Shariat), Indian Succession Act, Taluk mutation procedures (Bhoomi Form 21, Mahabhulekh Ferfar, Dharani Virasat), removing bank encumbrances from Column 11, and resolving revenue court objections.

How can I assist your property succession today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat-legal-counsel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: landRecord || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok || json.status === 'error') {
        throw new Error(json.detail || 'Counsel query failed');
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: json.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Error retrieving counsel: ${err?.message || 'Please check your connection and try again.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col h-[750px]">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base font-serif text-white">
              AI Land Revenue & Succession Counsel
            </h3>
            <p className="text-[11px] text-stone-400">
              Grounded in Indian Land Revenue Codes, HSA 1956/2005 & High Court Precedents
            </p>
          </div>
        </div>

        {landRecord && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-stone-800 rounded-lg text-xs font-mono text-stone-300 border border-stone-700">
            <span>Sy. No:</span>
            <span className="text-amber-400 font-bold">{landRecord.survey_number}</span>
          </div>
        )}
      </div>

      {/* Preset Questions Chips */}
      <div className="p-3 bg-stone-50 border-b border-stone-200 overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[11px] font-mono uppercase font-bold text-stone-500 shrink-0">
          Frequently Inquired:
        </span>
        {PRESET_QUESTIONS.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            disabled={isLoading}
            className="px-2.5 py-1 bg-white hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 border border-stone-200 text-stone-700 text-xs rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-100/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-900 text-amber-400'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Scale className="w-4 h-4" />
              )}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-amber-600 text-white rounded-tr-none'
                  : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none prose prose-stone font-sans'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div
                className={`text-[10px] mt-1.5 font-mono ${
                  msg.sender === 'user' ? 'text-amber-200 text-right' : 'text-stone-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-stone-500 text-xs p-2">
            <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
            <span>Advocate examining revenue case law and statutes...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="p-4 bg-white border-t border-stone-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything on Taluk mutation, objections, Hindu Succession Act, or bank NOCs..."
            className="flex-1 text-xs sm:text-sm p-3 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow transition-colors cursor-pointer disabled:opacity-40"
            title="Send Question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-stone-400 mt-2 text-center">
          Advisory is for revenue procedural guidance. For contested litigation, consult an enrolled High Court advocate.
        </p>
      </div>
    </div>
  );
};
