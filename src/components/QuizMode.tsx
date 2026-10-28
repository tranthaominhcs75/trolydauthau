import React, { useState, useEffect, useMemo } from 'react';
import { TopicId, Question } from '../types/procurement';
import { QUESTIONS } from '../data/questions';
import { TOPICS } from '../data/topics';
import { 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  Filter, 
  Scale, 
  BookOpen, 
  AlertCircle,
  Clock,
  Layers,
  ChevronDown,
  TrendingUp,
  Compass,
  Shuffle,
  ShieldCheck
} from 'lucide-react';

/**
 * Bỏ ngoặc cấp độ (ví dụ: [🟢 Cấp độ 1: Cơ bản], [🟡 Cấp độ 2: Nâng cao], [🔴 Cấp độ 3: Tình huống bẫy], [Cơ bản], [Nâng cao], v.v.)
 */
const formatQuestionText = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\[\s*(?:🟢|🟡|🔴)?\s*Cấp độ\s*[^\]]+\]\s*/gi, '')
    .replace(/\[\s*(?:Cơ bản|Nâng cao|Tình huống bẫy)\s*\]\s*/gi, '')
    .trim();
};

interface QuizModeProps {
  initialTopicId?: TopicId | 'all';
  initialSubgroupCode?: string;
  initialFilterMode?: 'unanswered' | 'wrong' | 'all' | 'bookmarked';
  onQuestionAnswered: (
    questionId: number,
    isCorrect: boolean,
    selectedAnswer: 'A' | 'B' | 'C' | 'D',
    questionTitle: string,
    topicId: TopicId,
    correctAnswer: 'A' | 'B' | 'C' | 'D',
    legalBasis: string
  ) => void;
  answeredQuestionIds: number[];
  bookmarkedIds: number[];
  onToggleBookmark: (id: number) => void;
  wrongQuestionIds: number[];
  onResetTopicProgress: (topicId: TopicId | 'all') => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({
  initialTopicId = 'all',
  initialSubgroupCode,
  initialFilterMode = 'unanswered',
  onQuestionAnswered,
  answeredQuestionIds,
  bookmarkedIds,
  onToggleBookmark,
  wrongQuestionIds,
  onResetTopicProgress,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>(initialTopicId);
  const [selectedSubgroup, setSelectedSubgroup] = useState<string | undefined>(initialSubgroupCode);
  const [filterMode, setFilterMode] = useState<'unanswered' | 'wrong' | 'all' | 'bookmarked'>(initialFilterMode);
  
  // Learning Roadmap Mode: 'progressive' (Cơ bản -> Nâng cao -> Bẫy) vs 'random'
  const [learningOrder, setLearningOrder] = useState<'progressive' | 'random'>('progressive');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Cơ bản' | 'Nâng cao' | 'Tình huống bẫy'>('all');

  // Active question state
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [deepExplanation, setDeepExplanation] = useState<string | null>(null);
  const [isLoadingDeepAi, setIsLoadingDeepAi] = useState(false);

  // Difficulty rank helper for sorting
  const getDiffRank = (diff: string) => {
    if (diff === 'Cơ bản') return 1;
    if (diff === 'Nâng cao') return 2;
    return 3; // 'Tình huống bẫy'
  };

  // Filter pool of questions based on topic, subgroup, filterMode, and difficultyFilter
  const availableQuestions = useMemo(() => {
    let filtered = QUESTIONS.filter((q) => {
      // 1. Topic filter
      if (selectedTopic !== 'all' && q.topicId !== selectedTopic) return false;

      // 2. Subgroup filter
      if (selectedSubgroup && q.subgroupCode !== selectedSubgroup) return false;

      // 3. Difficulty filter
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;

      // 4. Status filter mode
      if (filterMode === 'unanswered') {
        return !answeredQuestionIds.includes(q.id);
      }
      if (filterMode === 'wrong') {
        return wrongQuestionIds.includes(q.id);
      }
      if (filterMode === 'bookmarked') {
        return bookmarkedIds.includes(q.id);
      }
      return true; // 'all'
    });

    // Sort according to learning roadmap
    if (learningOrder === 'progressive') {
      filtered = filtered.sort((a, b) => {
        const diffA = getDiffRank(a.difficulty);
        const diffB = getDiffRank(b.difficulty);
        if (diffA !== diffB) return diffA - diffB; // Cơ bản -> Nâng cao -> Bẫy
        return a.id - b.id; // Then by sequential ID
      });
    }

    return filtered;
  }, [
    selectedTopic,
    selectedSubgroup,
    difficultyFilter,
    filterMode,
    learningOrder,
    answeredQuestionIds,
    wrongQuestionIds,
    bookmarkedIds,
  ]);

  // Pick question based on progressive learning path or random
  const pickNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setDeepExplanation(null);

    if (availableQuestions.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    if (learningOrder === 'progressive') {
      // In progressive mode, always take the next item in the sorted roadmap
      // preferably next unselected question
      const candidates = currentQuestion
        ? availableQuestions.filter((q) => q.id !== currentQuestion.id)
        : availableQuestions;
      const next = candidates.length > 0 ? candidates[0] : availableQuestions[0];
      setCurrentQuestion(next);
    } else {
      // In random mode, pick randomly
      let next: Question;
      if (availableQuestions.length === 1) {
        next = availableQuestions[0];
      } else {
        const candidates = currentQuestion 
          ? availableQuestions.filter((q) => q.id !== currentQuestion.id)
          : availableQuestions;
        const pool = candidates.length > 0 ? candidates : availableQuestions;
        const randomIndex = Math.floor(Math.random() * pool.length);
        next = pool[randomIndex];
      }
      setCurrentQuestion(next);
    }
  };

  // Initial load and when topic/filter changes
  useEffect(() => {
    pickNextQuestion();
  }, [selectedTopic, selectedSubgroup, filterMode, difficultyFilter, learningOrder]);

  const handleOptionSelect = (option: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedAnswer || isAnswerSubmitted) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setIsAnswerSubmitted(true);

    onQuestionAnswered(
      currentQuestion.id,
      isCorrect,
      selectedAnswer,
      currentQuestion.title,
      currentQuestion.topicId,
      currentQuestion.correctAnswer,
      currentQuestion.legalBasis
    );
  };

  const handleRequestDeepAiExplanation = async () => {
    if (!currentQuestion) return;
    setIsLoadingDeepAi(true);
    try {
      const res = await fetch('/api/explain-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.content,
          options: currentQuestion.options,
          selectedAnswer: selectedAnswer || currentQuestion.correctAnswer,
          correctAnswer: currentQuestion.correctAnswer,
          explanation: currentQuestion.explanation,
          legalBasis: currentQuestion.legalBasis,
        }),
      });
      const data = await res.json();
      if (data.explanation) {
        setDeepExplanation(data.explanation);
      }
    } catch (err) {
      console.error('Error fetching deep explanation:', err);
    } finally {
      setIsLoadingDeepAi(false);
    }
  };

  // Stats for the active topic
  const totalQuestionsInTopic = useMemo(() => {
    if (selectedTopic === 'all') return QUESTIONS.length;
    return QUESTIONS.filter((q) => q.topicId === selectedTopic).length;
  }, [selectedTopic]);

  const answeredInTopic = useMemo(() => {
    if (selectedTopic === 'all') return answeredQuestionIds.length;
    const topicQuestions = QUESTIONS.filter((q) => q.topicId === selectedTopic).map((q) => q.id);
    return answeredQuestionIds.filter((id) => topicQuestions.includes(id)).length;
  }, [selectedTopic, answeredQuestionIds]);

  const wrongInTopic = useMemo(() => {
    if (selectedTopic === 'all') return wrongQuestionIds.length;
    const topicQuestions = QUESTIONS.filter((q) => q.topicId === selectedTopic).map((q) => q.id);
    return wrongQuestionIds.filter((id) => topicQuestions.includes(id)).length;
  }, [selectedTopic, wrongQuestionIds]);

  // Difficulty counts in current topic
  const difficultyStats = useMemo(() => {
    const list = selectedTopic === 'all' 
      ? QUESTIONS 
      : QUESTIONS.filter((q) => q.topicId === selectedTopic);
    return {
      basic: list.filter((q) => q.difficulty === 'Cơ bản').length,
      advanced: list.filter((q) => q.difficulty === 'Nâng cao').length,
      trap: list.filter((q) => q.difficulty === 'Tình huống bẫy').length,
    };
  }, [selectedTopic]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Filter & Topic Selector Bar (iOS Segmented Style) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        {/* Step 1: Header & Roadmap Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base shadow-2xs">
              📝
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                Luyện thi trắc nghiệm theo Lộ trình tăng dần
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 hidden sm:inline">
                  Cơ bản → Nâng cao → Bẫy
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Thứ tự sắp xếp tối ưu cho người học mới tiếp cận đến người luyện thi chuyên sâu
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            {/* Learning Path Mode Toggle: Progressive vs Random */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLearningOrder('progressive')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  learningOrder === 'progressive'
                    ? 'bg-white text-blue-600 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Sắp xếp câu hỏi từ Cơ bản đến Nâng cao và Bẫy thi"
              >
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                Lộ trình tăng dần
              </button>
              <button
                type="button"
                onClick={() => setLearningOrder('random')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  learningOrder === 'random'
                    ? 'bg-white text-indigo-600 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Rút ngẫu nhiên không theo thứ tự"
              >
                <Shuffle className="w-3.5 h-3.5 text-indigo-500" />
                Ngẫu nhiên
              </button>
            </div>

            {/* Reset progress button */}
            <button
              onClick={() => onResetTopicProgress(selectedTopic)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
              title="Làm lại từ đầu các câu đã trả lời trong chuyên đề này"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Làm mới
            </button>
          </div>
        </div>

        {/* Visual Roadmap Steps Strip (3 Chặng học tập) */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Lộ trình 3 Chặng độ khó trong chuyên đề:
            </span>
            <span className="text-slate-400 font-normal">
              {currentQuestion ? `Đang ở: ${currentQuestion.difficulty}` : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Stage 1: Basic */}
            <button
              onClick={() => setDifficultyFilter(difficultyFilter === 'Cơ bản' ? 'all' : 'Cơ bản')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                difficultyFilter === 'Cơ bản'
                  ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20'
                  : currentQuestion?.difficulty === 'Cơ bản'
                  ? 'bg-white border-emerald-300 shadow-xs'
                  : 'bg-white/80 border-slate-200 hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  Chặng 1 • Cơ bản
                </span>
                <span className="text-xs font-black text-emerald-700">
                  {difficultyStats.basic} câu
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">
                Khái niệm & Nguyên tắc
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Dành cho người mới bắt đầu làm quen Luật
              </div>
            </button>

            {/* Stage 2: Advanced */}
            <button
              onClick={() => setDifficultyFilter(difficultyFilter === 'Nâng cao' ? 'all' : 'Nâng cao')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                difficultyFilter === 'Nâng cao'
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-500/20'
                  : currentQuestion?.difficulty === 'Nâng cao'
                  ? 'bg-white border-amber-300 shadow-xs'
                  : 'bg-white/80 border-slate-200 hover:border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                  Chặng 2 • Nâng cao
                </span>
                <span className="text-xs font-black text-amber-700">
                  {difficultyStats.advanced} câu
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">
                Quy trình & Hạn mức
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Mốc thời gian, tỷ lệ % và điều kiện chặt chẽ
              </div>
            </button>

            {/* Stage 3: Trap questions */}
            <button
              onClick={() => setDifficultyFilter(difficultyFilter === 'Tình huống bẫy' ? 'all' : 'Tình huống bẫy')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                difficultyFilter === 'Tình huống bẫy'
                  ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-500/20'
                  : currentQuestion?.difficulty === 'Tình huống bẫy'
                  ? 'bg-white border-rose-300 shadow-xs'
                  : 'bg-white/80 border-slate-200 hover:border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md">
                  Chặng 3 • Tình huống bẫy
                </span>
                <span className="text-xs font-black text-rose-700">
                  {difficultyStats.trap} câu
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">
                Bẫy sát hạch & Thực tế
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Các tình huống đánh lừa thường gặp trong đề thi
              </div>
            </button>
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => {
              setSelectedTopic('all');
              setSelectedSubgroup(undefined);
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              selectedTopic === 'all'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Thi tổng hợp (395 câu)
          </button>
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTopic(t.id);
                setSelectedSubgroup(undefined);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedTopic === t.id
                  ? 'bg-white text-blue-600 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chuyên đề {t.id} ({t.totalQuestions} câu)
            </button>
          ))}
        </div>

        {/* Filter Mode Tabs (Loại bỏ câu đã làm / Ôn câu sai / Tất cả) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Bộ lọc:
            </span>
            <div className="inline-flex p-0.5 bg-slate-100 rounded-xl text-xs">
              <button
                onClick={() => setFilterMode('unanswered')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterMode === 'unanswered'
                    ? 'bg-white text-blue-600 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chưa làm ({totalQuestionsInTopic - answeredInTopic})
              </button>
              <button
                onClick={() => setFilterMode('wrong')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition-all ${
                  filterMode === 'wrong'
                    ? 'bg-rose-50 text-rose-600 shadow-xs font-bold border border-rose-200/50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <AlertCircle className="w-3 h-3 text-rose-500" />
                Ôn câu sai ({wrongInTopic})
              </button>
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterMode === 'all'
                    ? 'bg-white text-blue-600 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả ({totalQuestionsInTopic})
              </button>
              <button
                onClick={() => setFilterMode('bookmarked')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterMode === 'bookmarked'
                    ? 'bg-white text-amber-600 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đã lưu
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Sẵn sàng trong lộ trình: <strong className="text-slate-900 font-bold">{availableQuestions.length}</strong> câu
          </div>
        </div>
      </div>

      {/* Main Question Card or Empty State */}
      {currentQuestion ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          {/* Question Meta Header with Progressive Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                Câu #{currentQuestion.id}
              </span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                {currentQuestion.topicName}
              </span>
              {currentQuestion.subgroupCode && (
                <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                  Nhóm {currentQuestion.subgroupCode}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Progressive Difficulty Indicator Badge */}
              <span className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-2xs ${
                currentQuestion.difficulty === 'Cơ bản'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : currentQuestion.difficulty === 'Nâng cao'
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                <span>{currentQuestion.difficulty === 'Cơ bản' ? '🟢' : currentQuestion.difficulty === 'Nâng cao' ? '🟡' : '🔴'}</span>
                <span>{currentQuestion.difficulty}</span>
              </span>

              <button
                onClick={() => onToggleBookmark(currentQuestion.id)}
                className={`p-1.5 rounded-full border transition-colors ${
                  bookmarkedIds.includes(currentQuestion.id)
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                }`}
                title="Lưu câu hỏi này để xem lại"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Question Title & Content */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {formatQuestionText(currentQuestion.content)}
            </h3>
            <p className="mt-2 text-xs font-semibold text-blue-600">
              👉 Hãy chọn đáp án của bạn (A/B/C/D):
            </p>
          </div>

          {/* 4 Options (A, B, C, D) */}
          <div className="space-y-3">
            {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
              const optionText = currentQuestion.options[optKey];
              const isSelected = selectedAnswer === optKey;
              const isCorrectOpt = currentQuestion.correctAnswer === optKey;

              let buttonStyle = 'bg-slate-50/80 border-slate-200/90 hover:bg-blue-50/50 hover:border-blue-300 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrectOpt) {
                  buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                } else if (isSelected && !isCorrectOpt) {
                  buttonStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/20';
                } else {
                  buttonStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                buttonStyle = 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-600/20 font-semibold';
              }

              return (
                <button
                  key={optKey}
                  type="button"
                  disabled={isAnswerSubmitted}
                  onClick={() => handleOptionSelect(optKey)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${buttonStyle}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isAnswerSubmitted
                      ? isCorrectOpt
                        ? 'bg-emerald-600 text-white'
                        : isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                      : isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {optKey}
                  </span>
                  <span className="flex-1 text-xs sm:text-sm leading-relaxed pt-0.5">
                    {optionText}
                  </span>
                  {isAnswerSubmitted && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrectOpt && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action submit / next bar */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                Chấm điểm ngay
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={pickNextQuestion}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Tiếp tục câu tiếp theo 👉
                </button>
                <button
                  onClick={handleRequestDeepAiExplanation}
                  disabled={isLoadingDeepAi}
                  className="px-4 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-indigo-200/70"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  {isLoadingDeepAi ? 'Bunny đang phân tích...' : 'Giải thích sâu với Bunny AI'}
                </button>
              </div>
            )}

            <div className="text-xs text-slate-500 text-center sm:text-right">
              {isAnswerSubmitted ? (
                <span className="font-semibold text-blue-600">
                  {learningOrder === 'progressive' ? 'Lộ trình đang tiến dần đến cấp độ nâng cao' : 'Nhấn nút để nhận câu hỏi tiếp theo'}
                </span>
              ) : (
                <span>Chọn 1 trong 4 phương án trên</span>
              )}
            </div>
          </div>

          {/* Step 3: Explanation & Legal Basis Panel */}
          {isAnswerSubmitted && (
            <div className={`rounded-2xl p-5 border transition-all animate-fade-in ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-rose-50/70 border-rose-200'
            }`}>
              <div className="flex items-center gap-2">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ✅ Chính xác!
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold text-sm sm:text-base">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    ❌ Chưa chính xác!
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-600 ml-auto">
                  Đáp án chuẩn: <strong className="text-slate-900 text-sm">{currentQuestion.correctAnswer}</strong>
                </span>
              </div>

              {/* Legal explanation text */}
              <div className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-800">
                <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200/70 shadow-2xs leading-relaxed">
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                    <span>💡 Bản chất vấn đề & Lộ trình học:</span>
                  </div>
                  {currentQuestion.explanation}
                </div>

                <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-950 font-medium flex items-start gap-2">
                  <Scale className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Căn cứ pháp lý: </span>
                    <span className="text-blue-800 underline decoration-blue-300 font-semibold">
                      {currentQuestion.legalBasis}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deep AI Explanation from Gemini if loaded */}
              {deepExplanation && (
                <div className="mt-4 p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-indigo-950 space-y-2 text-xs leading-relaxed animate-fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900 text-xs">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    Phân tích chuyên sâu từ Trợ lý Bunny:
                  </div>
                  <div className="whitespace-pre-line text-slate-800">
                    {deepExplanation}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mx-auto">
            🎉
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {filterMode === 'unanswered'
              ? 'Tuyệt vời! Bạn đã hoàn thành tất cả câu hỏi trong lộ trình đã chọn!'
              : filterMode === 'wrong'
              ? 'Không có câu hỏi làm sai nào cần ôn tập!'
              : 'Không tìm thấy câu hỏi phù hợp với bộ lọc.'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {filterMode === 'unanswered'
              ? 'Bạn đã hoàn tất xuất sắc chặng kiến thức này. Nhấn "Làm mới" để thử thách lại, hoặc chọn chuyên đề tiếp theo trên thanh điều hướng.'
              : 'Hãy chọn cấp độ hoặc chuyên đề khác để tiếp tục ôn tập.'}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onResetTopicProgress(selectedTopic)}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700"
            >
              Làm lại toàn bộ chuyên đề
            </button>
            <button
              onClick={() => {
                setFilterMode('all');
                setDifficultyFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
            >
              Xem tất cả câu hỏi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
