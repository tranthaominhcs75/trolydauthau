import React, { useState, useRef, useEffect } from 'react';
import { StudyMode } from '../types/procurement';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  HelpCircle, 
  BookOpen, 
  Zap, 
  Scale, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface AssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: StudyMode) => void;
}

interface Message {
  id: string;
  sender: 'bunny' | 'user';
  text: string;
  timestamp: number;
}

export const AssistantDrawer: React.FC<AssistantDrawerProps> = ({
  isOpen,
  onClose,
  onSelectMode,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bunny',
      text: 'Chào bạn! Mình là Bunny 🐰 – Trợ lý ảo luyện thi chứng chỉ nghiệp vụ đấu thầu. Bạn cần giải thích câu hỏi trắc nghiệm, tra cứu hạn mức thời gian hay xử lý tình huống thực tế nào?',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const isCaseStudy = query.toLowerCase().includes('tình huống') || 
                          query.toLowerCase().includes('xử lý') || 
                          query.toLowerCase().includes('nhà thầu nộp');

      const res = await fetch('/api/legal-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          isCaseStudy,
        }),
      });

      const data = await res.json();
      const bunnyMsg: Message = {
        id: `bunny-${Date.now()}`,
        sender: 'bunny',
        text: data.reply || 'Rất tiếc, Bunny chưa nhận được câu trả lời. Bạn thử hỏi lại nhé!',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, bunnyMsg]);
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'bunny',
        text: '⚠️ Không thể kết nối với dịch vụ AI. Vui lòng kiểm tra lại kết nối mạng.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/30 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* iOS Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-lg shadow-sm">
              🐰
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                Bunny Đấu thầu
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400">Trợ lý nghiệp vụ AI 24/7</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
          {[
            'Hạn mức chỉ định thầu 2026',
            'Bảo đảm dự thầu 1%-1.5% khi nào?',
            'Xử lý khi chỉ có 01 nhà thầu',
            'Điều kiện tư cách hợp lệ',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 font-medium whitespace-nowrap shadow-2xs transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages List - iOS Messages Style */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F9F9FB]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bunny' && (
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs shrink-0 mb-1">
                  🐰
                </div>
              )}

              <div
                className={`max-w-[85%] p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-2xl rounded-br-xs shadow-xs'
                    : 'bg-white text-slate-800 rounded-2xl rounded-bl-xs border border-slate-200/70 shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200/70 max-w-[70%]">
              <span className="text-sm">🐰</span>
              <span className="animate-pulse">Bunny đang đối chiếu luật...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3.5 border-t border-slate-100 bg-white">
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
              placeholder="Nhắn tin cho Bunny (VD: giải thích điều 16)..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-xs transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
