import React, { useState, useEffect, useMemo } from 'react';
import { StudyMode, TopicId, UserProfile } from '../types/procurement';
import { TOPICS } from '../data/topics';
import { 
  BookOpen, 
  Zap, 
  Scale, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Clock, 
  FileCheck2, 
  FileSignature, 
  CheckCircle2, 
  Sparkles,
  HelpCircle,
  TrendingUp,
  Bookmark,
  Calendar,
  Target,
  Hourglass,
  AlertCircle,
  Edit3,
  Check,
  UserCheck
} from 'lucide-react';

interface WelcomeMenuProps {
  onSelectMode: (mode: StudyMode, topicId?: TopicId | 'all') => void;
  onSelectTab: (tab: 'home' | StudyMode | 'laws' | 'matrix') => void;
  onOpenAdvisorWithPrompt: (prompt: string, isCaseStudy: boolean) => void;
  currentUser?: UserProfile | null;
  targetExamDate?: string;
  onUpdateTargetDate?: (newDate: string) => void;
  answeredCount?: number;
  totalQuestions?: number;
  wrongCount?: number;
  onOpenAuth?: () => void;
}

export const WelcomeMenu: React.FC<WelcomeMenuProps> = ({
  onSelectMode,
  onSelectTab,
  onOpenAdvisorWithPrompt,
  currentUser,
  targetExamDate,
  onUpdateTargetDate,
  answeredCount = 0,
  totalQuestions = 395,
  wrongCount = 0,
  onOpenAuth,
}) => {
  const totalQ = totalQuestions || 395;
  const answered = answeredCount || 0;
  const remaining = Math.max(0, totalQ - answered);
  const progressPercent = Math.min(100, Math.round((answered / totalQ) * 100));

  const defaultDateStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  };

  const initialDate = currentUser?.targetExamDate || targetExamDate || defaultDateStr();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDate, setTempDate] = useState(initialDate);

  useEffect(() => {
    if (currentUser?.targetExamDate) {
      setSelectedDate(currentUser.targetExamDate);
      setTempDate(currentUser.targetExamDate);
    } else if (targetExamDate) {
      setSelectedDate(targetExamDate);
      setTempDate(targetExamDate);
    }
  }, [currentUser?.targetExamDate, targetExamDate]);

  const daysRemaining = useMemo(() => {
    if (!selectedDate) return 30;
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const target = new Date(selectedDate);
      target.setHours(0, 0, 0, 0);

      const diffMs = target.getTime() - today.getTime();
      return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    } catch {
      return 30;
    }
  }, [selectedDate]);

  const dailyTarget = useMemo(() => {
    if (daysRemaining > 0) {
      return Math.max(1, Math.ceil(remaining / daysRemaining));
    } else if (daysRemaining === 0) {
      return remaining;
    } else {
      return remaining;
    }
  }, [daysRemaining, remaining]);

  const handleSaveExamDate = () => {
    if (!tempDate) return;
    setSelectedDate(tempDate);
    setIsEditingDate(false);
    if (onUpdateTargetDate) {
      onUpdateTargetDate(tempDate);
    }
  };

  const formatDisplayDate = (dStr: string) => {
    if (!dStr) return '';
    try {
      const parts = dStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dStr;
    } catch {
      return dStr;
    }
  };

  const getTopicIcon = (id: TopicId) => {
    switch (id) {
      case 1: return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 2: return <Layers className="w-5 h-5 text-indigo-600" />;
      case 3: return <Clock className="w-5 h-5 text-amber-600" />;
      case 4: return <FileCheck2 className="w-5 h-5 text-emerald-600" />;
      case 5: return <FileSignature className="w-5 h-5 text-rose-600" />;
      default: return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* iOS Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-600 p-7 sm:p-9 text-white shadow-lg shadow-blue-500/15">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-4 border border-white/20">
            <span className="text-base">🐰</span>
            <span>Trợ lý AI Đấu thầu Thế hệ Mới</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80">Cập nhật Luật 2024 - 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Bunny – Trợ lý ảo luyện thi chứng chỉ nghiệp vụ đấu thầu
          </h1>

          <p className="mt-3 text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
            Hệ thống ngân hàng <strong>395 câu trắc nghiệm</strong> chuẩn hóa theo 5 chuyên đề. 
            Cơ chế thông minh: <span className="underline decoration-sky-300 font-medium">tự động loại bỏ câu đã làm</span> trong lần học tiếp theo, 
            <span className="underline decoration-emerald-300 font-medium"> gom riêng các câu làm sai</span> để tập trung bồi dưỡng đến khi thuần thục.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectMode('quiz', 'all')}
              className="px-5 py-2.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Thi tổng hợp 395 câu
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTab('matrix')}
              className="px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              Xem Cây kiến thức 5 Chuyên đề
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-6 text-8xl opacity-20 select-none hidden md:block">
          🐰
        </div>
      </div>

      {/* iOS Exam Countdown & Daily Study Quota Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm relative overflow-hidden">
        {/* Subtle decorative gradient glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-100/60 via-indigo-50/40 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  Mục tiêu Sát hạch 2026
                </span>
                {currentUser ? (
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-emerald-600" />
                    Học viên: <strong className="text-slate-800">{currentUser.name}</strong>
                  </span>
                ) : (
                  <button
                    onClick={onOpenAuth}
                    className="text-[11px] font-medium text-blue-600 hover:text-blue-700 underline"
                  >
                    Đăng nhập để đồng bộ tiến độ
                  </button>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Đếm ngược Ngày thi & Kế hoạch Ôn tập Mỗi ngày
              </h2>
              <p className="text-xs text-slate-500">
                Phân bổ đều 395 câu hỏi theo ngày thi thực tế để học thảnh thơi và nắm chắc chứng chỉ
              </p>
            </div>

            {/* Target Exam Date Display & Quick Editor */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 p-1.5 rounded-2xl shrink-0 self-start sm:self-auto">
              {isEditingDate ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="date"
                    value={tempDate}
                    onChange={(e) => setTempDate(e.target.value)}
                    className="px-2.5 py-1 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSaveExamDate}
                    className="p-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    title="Lưu ngày thi"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-2.5 py-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Ngày thi dự kiến
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {formatDisplayDate(selectedDate)}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setTempDate(selectedDate);
                      setIsEditingDate(true);
                    }}
                    className="ml-1 p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white transition-colors"
                    title="Chỉnh sửa ngày thi dự kiến"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 3 Main Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Countdown Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                  Thời gian còn lại
                </span>
                <Hourglass className="w-4 h-4 text-blue-600" />
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-blue-900 tracking-tight">
                    {daysRemaining > 0 ? daysRemaining : daysRemaining === 0 ? '0' : 'Hết hạn'}
                  </span>
                  <span className="text-xs font-bold text-blue-700">
                    {daysRemaining > 0 ? 'ngày nữa' : daysRemaining === 0 ? 'ngày (Hôm nay thi!)' : ''}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {daysRemaining > 0 
                    ? `Đếm ngược tới ngày thi ${formatDisplayDate(selectedDate)}`
                    : daysRemaining === 0 
                    ? 'Chúc bạn hoàn thành bài thi xuất sắc!' 
                    : 'Đã qua ngày thi, hãy cập nhật ngày mới'}
                </div>
              </div>
            </div>

            {/* 2. Daily Goal Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Mục tiêu mỗi ngày
                </span>
                <Target className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-900 tracking-tight">
                    {dailyTarget}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    câu / ngày
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {remaining > 0 
                    ? `Cần làm trung bình để hoàn thành ${remaining} câu còn lại`
                    : 'Tuyệt vời! Bạn đã hoàn thành 100% câu hỏi!'}
                </div>
              </div>
            </div>

            {/* 3. Progress Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Tiến độ câu hỏi
                </span>
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {answered}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    / {totalQ} câu ({progressPercent}%)
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {remaining > 0 ? `Còn ${remaining} câu chưa làm` : 'Đã học trọn bộ 395 câu!'}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar & Quick Action */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  Tiến độ hoàn thành toàn bộ 395 câu:
                </span>
                <span className="font-bold text-blue-600">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(3, progressPercent)}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  Hôm nay: Hãy làm ít nhất <strong>{dailyTarget} câu</strong> để giữ vững phong độ đạt chứng chỉ!
                </span>
              </div>

              <div className="flex items-center gap-2">
                {wrongCount > 0 ? (
                  <button
                    onClick={() => onSelectMode('quiz', 'all')}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition-colors flex items-center gap-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    Ôn {wrongCount} câu sai
                  </button>
                ) : null}

                <button
                  onClick={() => onSelectMode('quiz', 'all')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Học ngay mục tiêu hôm nay
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Operational Modes (Luồng vận hành 3 chế độ học tập) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              3 Chế độ Vận hành Chuẩn mực
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Lựa chọn phương thức học tập phù hợp theo mục tiêu sát hạch hoặc giải quyết công việc
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Mode 1: Quiz */}
          <div 
            onClick={() => onSelectMode('quiz')}
            className="group relative bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-105 transition-transform">
                📝
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Chế độ 1
                </span>
                <span className="text-xs text-slate-400 font-medium">395 câu hỏi</span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Luyện thi trắc nghiệm
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Rút ngẫu nhiên câu hỏi theo Chuyên đề hoặc Thi tổng hợp. Chấm điểm tức thì, giải thích cặn kẽ bản chất và dẫn chiếu căn cứ pháp lý chính xác.
              </p>

              <div className="mt-3.5 space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Tự động loại bỏ câu đã trả lời</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Gom riêng câu làm sai để rèn luyện</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Bắt đầu kiểm tra</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Mode 2: Flashcard */}
          <div 
            onClick={() => onSelectMode('flashcard')}
            className="group relative bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-105 transition-transform">
                ⚡
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Chế độ 2
                </span>
                <span className="text-xs text-slate-400 font-medium">Phản xạ nhanh</span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Flashcard tra cứu nhanh
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Học thuộc lòng các mốc <strong>con số, hạn mức, thời gian</strong> qua 2 hình thức: Quiz chớp nhoáng phản xạ hoặc Tra cứu từ khóa tức thì.
              </p>

              <div className="mt-3.5 space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Hình thức Quiz phản xạ thời gian / hạn mức</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Tra cứu từ khóa & thẻ thông tin súc tích</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Học thuộc nhanh</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Mode 3: Advisor */}
          <div 
            onClick={() => onSelectMode('advisor')}
            className="group relative bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-105 transition-transform">
                🔍
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Chế độ 3
                </span>
                <span className="text-xs text-slate-400 font-medium">Chuẩn 3 bước</span>
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Trợ lý pháp chế & Tình huống
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Giải đáp lý thuyết và phân tích tình huống thực tế (case study) bắt buộc theo 3 bước: 
                <strong> 1. Nhận định, 2. Hướng xử lý, 3. Căn cứ pháp lý</strong>.
              </p>

              <div className="mt-3.5 space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Phân tích bài toán thực tế chuẩn quy định</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Dẫn chiếu văn bản pháp luật hiện hành</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Phân tích tình huống</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core Topics Grid (Cây kiến thức cơ sở) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              5 Chuyên đề Cốt lõi (Phân loại 395 câu)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Chọn chuyên đề cụ thể để bắt đầu luyện tập tập trung theo từng mảng kiến thức
            </p>
          </div>
          <button
            onClick={() => onSelectTab('matrix')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Xem ma trận chi tiết
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center">
                    {getTopicIcon(topic.id)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 px-2 py-0.5 rounded-full bg-slate-100">
                    {topic.questionRange.label}
                  </span>
                </div>

                <h3 className="mt-3 font-bold text-slate-900 text-sm leading-snug">
                  {topic.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {topic.subgroups.slice(0, 3).map((sub) => (
                    <span
                      key={sub.code}
                      className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-medium truncate max-w-[200px]"
                      title={sub.title}
                    >
                      {sub.code}: {sub.title}
                    </span>
                  ))}
                  {topic.subgroups.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                      +{topic.subgroups.length - 3} nhóm
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectMode('quiz', topic.id)}
                  className="flex-1 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors text-center"
                >
                  Luyện trắc nghiệm
                </button>
                <button
                  onClick={() => onSelectMode('flashcard', topic.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Flashcard
                </button>
              </div>
            </div>
          ))}

          {/* Quick Stats Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-5 text-white flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Mẹo đạt điểm tối đa
              </div>
              <h3 className="mt-2 text-base font-bold text-white leading-snug">
                Chiến lược ôn thi chứng chỉ
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Đề thi nghiệp vụ thường có 50 câu trắc nghiệm (thời gian 60 phút). Đạt từ 70% trở lên là Đạt.
                Hãy luyện hết 395 câu và rà soát kỹ các câu sai trong mục "Ôn câu sai"!
              </p>
            </div>

            <button
              onClick={() => onSelectTab('matrix')}
              className="mt-4 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors text-center border border-white/15"
            >
              Xem ma trận phân bố 24 nhóm kiến thức
            </button>
          </div>
        </div>
      </div>

      {/* Real-world Case Studies Quick Access */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              🛠️
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Tình huống thực tế phổ biến (Xử lý theo chuẩn 3 bước)
            </h3>
          </div>
          <button
            onClick={() => onSelectMode('advisor')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
          >
            Hỏi câu khác 👉
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              title: 'Không có nhà thầu nộp HSDT',
              prompt: 'Đến thời điểm đóng thầu mà không có nhà thầu nào nộp hồ sơ dự thầu thì Bên mời thầu phải xử lý tình huống như thế nào?',
              tag: 'Xử lý tình huống',
            },
            {
              title: 'Sai khác giữa số tiền bằng chữ và số',
              prompt: 'Trong đơn dự thầu, số tiền viết bằng chữ khác với số tiền ghi bằng số thì giải quyết ra sao?',
              tag: 'Đánh giá HSDT',
            },
            {
              title: 'Bảo lãnh dự thầu sai người thụ hưởng',
              prompt: 'Thư bảo lãnh dự thầu của ngân hàng ghi sai tên Chủ đầu tư / Bên mời thầu thì có được làm rõ để sửa đổi không?',
              tag: 'Bảo đảm dự thầu',
            },
            {
              title: 'Hạn mức chỉ định thầu cấp bách',
              prompt: 'Gói thầu khắc phục sự cố thiên tai, đê điều cấp bách thì thủ tục chỉ định thầu được thực hiện như thế nào?',
              tag: 'Chỉ định thầu',
            },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onOpenAdvisorWithPrompt(item.prompt, true)}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 text-left transition-all group"
            >
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                {item.tag}
              </span>
              <h4 className="mt-1.5 text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h4>
              <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                {item.prompt}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
