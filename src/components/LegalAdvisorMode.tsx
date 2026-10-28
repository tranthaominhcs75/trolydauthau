import React, { useState, useEffect } from 'react';
import { CASE_STUDIES } from '../data/caseStudies';
import { CaseStudy } from '../types/procurement';
import { 
  Scale, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Hammer
} from 'lucide-react';

interface LegalAdvisorModeProps {
  initialPrompt?: string;
  isInitialCaseStudy?: boolean;
}

export const LegalAdvisorMode: React.FC<LegalAdvisorModeProps> = ({
  initialPrompt = '',
  isInitialCaseStudy = true,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isCaseStudy, setIsCaseStudy] = useState(isInitialCaseStudy);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // AI response state
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      setIsCaseStudy(isInitialCaseStudy);
      handleSubmitQuery(initialPrompt, isInitialCaseStudy);
    }
  }, [initialPrompt, isInitialCaseStudy]);

  const handleSubmitQuery = async (customPrompt?: string, caseStudyFlag?: boolean) => {
    const textToSend = customPrompt || prompt;
    if (!textToSend.trim() || isLoading) return;

    setSelectedCaseStudy(null);
    setIsLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/legal-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          isCaseStudy: caseStudyFlag !== undefined ? caseStudyFlag : isCaseStudy,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setAiResponse(data.reply);
      } else if (data.error) {
        setAiResponse(`⚠️ Lỗi: ${data.error}`);
      }
    } catch (err: any) {
      setAiResponse('⚠️ Không thể kết nối với máy chủ AI. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPrebuiltCase = (cs: CaseStudy) => {
    setSelectedCaseStudy(cs);
    setAiResponse(null);
    setPrompt(cs.scenario);
    setIsCaseStudy(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
              ⚖️
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                Chế độ 3: Trợ lý pháp chế (Q&A Lý thuyết & Tình huống)
              </h2>
              <p className="text-xs text-slate-500">
                Phân tích chuẩn mực 3 bước: 1. 📌 Nhận định • 2. 🛠️ Hướng xử lý • 3. 📜 Căn cứ pháp lý
              </p>
            </div>
          </div>

          {/* Toggle Type: Lý thuyết vs Tình huống thực tế */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl text-xs font-semibold self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsCaseStudy(true)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                isCaseStudy ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              🛠️ Tình huống / Case study (3 bước)
            </button>
            <button
              type="button"
              onClick={() => setIsCaseStudy(false)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                !isCaseStudy ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              📖 Hỏi lý thuyết & Điều luật
            </button>
          </div>
        </div>

        {/* Query Input Area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitQuery();
          }}
          className="space-y-3"
        >
          <div className="relative">
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                isCaseStudy
                  ? 'Nhập tình huống thực tế tại gói thầu của bạn (VD: Đến thời điểm đóng thầu chỉ có 01 nhà thầu nộp HSDT thì Bên mời thầu phải xử lý thế nào?)...'
                  : 'Nhập câu hỏi lý thuyết hoặc điều luật cần tra cứu (VD: Điều kiện áp dụng chỉ định thầu theo Luật 22/2023)...'
              }
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-xs sm:text-sm text-slate-900 leading-relaxed resize-none"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[11px] text-slate-400">
              {isCaseStudy
                ? '📌 Hệ thống sẽ tự động cấu trúc phản hồi thành 3 phần rõ ràng'
                : '📖 Trích dẫn chính xác văn bản luật và tóm tắt cốt lõi'}
            </span>

            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4" />
              {isLoading ? 'Bunny đang phân tích...' : 'Phân tích quy định'}
            </button>
          </div>
        </form>
      </div>

      {/* Case Study Library Selector */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            Thư viện tình huống mẫu điển hình trong các kỳ thi sát hạch:
          </span>
          <span className="text-[11px] text-slate-400">Chọn để xem hướng giải quyết</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {CASE_STUDIES.map((cs) => (
            <button
              key={cs.id}
              onClick={() => handleSelectPrebuiltCase(cs)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                selectedCaseStudy?.id === cs.id
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-1 ring-emerald-400'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <div className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 inline-block px-2 py-0.5 rounded-md mb-1">
                Chuyên đề {cs.topicId} • Tình huống #{cs.id}
              </div>
              <h4 className="font-bold text-xs line-clamp-1">{cs.title}</h4>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                {cs.scenario}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Prebuilt Case Study 3-Step Display */}
      {selectedCaseStudy && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-base text-slate-900">
              {selectedCaseStudy.title}
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              Chuẩn 3 bước
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong>Tình huống đặt ra: </strong> {selectedCaseStudy.scenario}
          </div>

          {/* Step 1: Nhận định */}
          <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sky-900 text-xs sm:text-sm">
              <span className="text-base">📌</span>
              <span>1. Nhận định tình huống:</span>
            </div>
            <p className="text-xs sm:text-sm text-sky-950 leading-relaxed font-normal">
              {selectedCaseStudy.recognition}
            </p>
          </div>

          {/* Step 2: Hướng xử lý chuẩn quy định */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs sm:text-sm">
              <span className="text-base">🛠️</span>
              <span>2. Hướng xử lý chuẩn quy định:</span>
            </div>
            <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-normal whitespace-pre-line">
              {selectedCaseStudy.solution}
            </div>
          </div>

          {/* Step 3: Căn cứ pháp lý */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-xs sm:text-sm">
              <span className="text-base">📜</span>
              <span>3. Căn cứ pháp lý:</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-semibold">
              {selectedCaseStudy.legalBasis}
            </p>
          </div>
        </div>
      )}

      {/* AI Response Display */}
      {aiResponse && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
              🐰
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Phân tích từ Trợ lý ảo Bunny
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full ml-auto">
              Luật 22/2023 & NĐ 214/2025
            </span>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-800">
            {aiResponse}
          </div>
        </div>
      )}
    </div>
  );
};
