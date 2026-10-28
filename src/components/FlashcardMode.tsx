import React, { useState, useMemo } from 'react';
import { TopicId, Flashcard } from '../types/procurement';
import { FLASHCARDS } from '../data/flashcards';
import { TOPICS } from '../data/topics';
import { 
  Zap, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  RotateCw, 
  Sparkles, 
  ArrowRight,
  Send,
  Layers,
  BookOpen
} from 'lucide-react';

interface FlashcardModeProps {
  initialTopicId?: TopicId;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({ initialTopicId }) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'lookup' | 'cards'>('quiz');
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>(initialTopicId || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Lookup state
  const [searchKeyword, setSearchKeyword] = useState('');

  // Quiz state
  const [quizCardIndex, setQuizCardIndex] = useState(0);
  const [quizInputAnswer, setQuizInputAnswer] = useState('');
  const [quizResult, setQuizResult] = useState<{
    submitted: boolean;
    isCorrect?: boolean;
    feedback?: string;
    legalBasis?: string;
    exactAnswer?: string;
  } | null>(null);
  const [isGrading, setIsGrading] = useState(false);

  // 3D Card flip state
  const [cardFlipped, setCardFlipped] = useState(false);
  const [browseIndex, setBrowseIndex] = useState(0);

  // Filtered flashcards pool
  const pool = useMemo(() => {
    return FLASHCARDS.filter((card) => {
      if (selectedTopic !== 'all' && card.topicId !== selectedTopic) return false;
      if (selectedCategory !== 'all' && card.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedTopic, selectedCategory]);

  // Lookup results
  const searchResults = useMemo(() => {
    if (!searchKeyword.trim()) return pool;
    const q = searchKeyword.toLowerCase().trim();
    return FLASHCARDS.filter(
      (c) =>
        c.question.toLowerCase().includes(q) ||
        c.shortAnswer.toLowerCase().includes(q) ||
        c.detailedAnswer.toLowerCase().includes(q) ||
        c.legalBasis.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [searchKeyword, pool]);

  const currentQuizCard: Flashcard | undefined = pool[quizCardIndex % (pool.length || 1)];

  const handleGradeQuiz = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuizCard || !quizInputAnswer.trim() || isGrading) return;

    setIsGrading(true);
    try {
      const res = await fetch('/api/flashcard-grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuizCard.question,
          userAnswer: quizInputAnswer,
          correctAnswerKey: currentQuizCard.shortAnswer,
          legalBasis: currentQuizCard.legalBasis,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setQuizResult({
          submitted: true,
          isCorrect: data.isCorrect,
          feedback: data.feedback || data.verdictTitle,
          legalBasis: data.legalReference || currentQuizCard.legalBasis,
          exactAnswer: currentQuizCard.shortAnswer,
        });
      } else {
        // Fallback simple matching
        const userClean = quizInputAnswer.toLowerCase();
        const correctClean = currentQuizCard.shortAnswer.toLowerCase();
        const matches = currentQuizCard.keywords.some((k) => userClean.includes(k.toLowerCase())) ||
                        userClean.includes(correctClean.slice(0, 5));
        setQuizResult({
          submitted: true,
          isCorrect: matches,
          feedback: matches ? '✅ Khá chính xác!' : '❌ Chưa chính xác!',
          legalBasis: currentQuizCard.legalBasis,
          exactAnswer: currentQuizCard.shortAnswer,
        });
      }
    } catch {
      setQuizResult({
        submitted: true,
        isCorrect: true,
        feedback: '✅ Đã ghi nhận!',
        legalBasis: currentQuizCard.legalBasis,
        exactAnswer: currentQuizCard.shortAnswer,
      });
    } finally {
      setIsGrading(false);
    }
  };

  const handleNextQuizCard = () => {
    setQuizInputAnswer('');
    setQuizResult(null);
    setQuizCardIndex((prev) => (prev + 1) % pool.length);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header card with iOS Segmented View Control */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
              ⚡
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                Chế độ 2: Flashcard tra cứu nhanh (Học thuộc lòng)
              </h2>
              <p className="text-xs text-slate-500">
                Ghi nhớ phản xạ các con số, hạn mức và mốc thời gian đấu thầu
              </p>
            </div>
          </div>

          {/* Sub-modes selector (iOS Segmented Tab) */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'quiz' ? 'bg-white text-amber-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Hỏi đáp phản xạ (Quiz)
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'lookup' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Tra cứu từ khóa (Lookup)
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'cards' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Lật thẻ 3D
            </button>
          </div>
        </div>

        {/* Category & Topic Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">Nhóm:</span>
          {['all', 'Hạn mức', 'Thời gian', 'Hành vi cấm', 'Hợp đồng'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-amber-100 text-amber-800 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Tất cả chủ đề' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Mode 1: QUIZ CHỚP NHOÁNG (Phản xạ hạn mức / thời gian) */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          {currentQuizCard ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Câu hỏi phản xạ #{currentQuizCard.id} • {currentQuizCard.category}
                </span>
                <span className="text-xs text-slate-400">
                  Thẻ {quizCardIndex + 1}/{pool.length}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {currentQuizCard.question}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  👉 Nhập câu trả lời ngắn gọn (số tiền, số ngày, hoặc điều kiện) rồi nhấn gửi để kiểm tra:
                </p>
              </div>

              {/* Input field */}
              <form onSubmit={handleGradeQuiz} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={quizInputAnswer}
                    onChange={(e) => setQuizInputAnswer(e.target.value)}
                    disabled={quizResult?.submitted || isGrading}
                    placeholder="VD: Không quá 100 triệu, 03 ngày làm việc, 18 tháng..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-sm text-slate-900"
                  />
                  {!quizResult?.submitted ? (
                    <button
                      type="submit"
                      disabled={!quizInputAnswer.trim() || isGrading}
                      className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-40 flex items-center gap-1.5"
                    >
                      <Send className="w-4 h-4" />
                      {isGrading ? 'Đang chấm...' : 'Xác nhận'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuizCard}
                      className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5"
                    >
                      Câu tiếp theo 👉
                    </button>
                  )}
                </div>
              </form>

              {/* Feedback box */}
              {quizResult?.submitted && (
                <div className={`p-5 rounded-2xl border space-y-3 animate-fade-in ${
                  quizResult.isCorrect
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-rose-50/70 border-rose-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                      {quizResult.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                      {quizResult.feedback}
                    </span>
                    <span className="text-xs text-slate-500">
                      Chuẩn xác: <strong className="text-slate-900">{quizResult.exactAnswer}</strong>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/90 border border-slate-200/60 text-xs text-slate-700 leading-relaxed">
                    {currentQuizCard.detailedAnswer}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-blue-700 font-medium">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Căn cứ pháp lý: <strong>{quizResult.legalBasis}</strong></span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              Không có thẻ nào thuộc nhóm đã chọn.
            </div>
          )}
        </div>
      )}

      {/* Sub-Mode 2: LOOKUP TRA CỨU TỪ KHÓA */}
      {activeTab === 'lookup' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Nhập từ khóa tra cứu (VD: 'thời gian làm rõ HSDT', 'chỉ định thầu', 'hạn mức 100 triệu', 'bảo đảm')..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                    {card.category}
                  </span>
                  <span className="text-xs text-slate-400">#Thẻ {card.id}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  {card.question}
                </h4>

                <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-100 text-amber-950 font-bold text-sm">
                  ⚡ {card.shortAnswer}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.detailedAnswer}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-700 font-medium">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5" />
                    {card.legalBasis}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Mode 3: LẬT THẺ 3D FLASHCARD */}
      {activeTab === 'cards' && (
        <div className="max-w-xl mx-auto space-y-5">
          {pool.length > 0 && (
            <>
              <div
                onClick={() => setCardFlipped(!cardFlipped)}
                className="h-80 w-full rounded-3xl bg-white border border-slate-200 shadow-md p-8 cursor-pointer select-none flex flex-col justify-between hover:border-indigo-300 transition-all text-center relative"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {pool[browseIndex % pool.length].category}
                  </span>
                  <span>Nhấn vào thẻ để lật mặt sau 🔄</span>
                </div>

                <div className="my-auto">
                  {!cardFlipped ? (
                    <div className="space-y-3">
                      <div className="text-3xl">❓</div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {pool[browseIndex % pool.length].question}
                      </h3>
                      <p className="text-xs text-slate-400">
                        (Mặt trước - Câu hỏi)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-3xl">💡</div>
                      <div className="text-xl font-extrabold text-indigo-600">
                        {pool[browseIndex % pool.length].shortAnswer}
                      </div>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                        {pool[browseIndex % pool.length].detailedAnswer}
                      </p>
                      <div className="text-xs text-blue-700 font-medium pt-2">
                        {pool[browseIndex % pool.length].legalBasis}
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-400">
                  Thẻ {browseIndex + 1} / {pool.length}
                </div>
              </div>

              <div className="flex justify-between items-center px-4">
                <button
                  onClick={() => {
                    setCardFlipped(false);
                    setBrowseIndex((prev) => (prev > 0 ? prev - 1 : pool.length - 1));
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  ← Thẻ trước
                </button>
                <button
                  onClick={() => setCardFlipped(!cardFlipped)}
                  className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-indigo-700 flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Lật thẻ
                </button>
                <button
                  onClick={() => {
                    setCardFlipped(false);
                    setBrowseIndex((prev) => (prev + 1) % pool.length);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  Thẻ tiếp theo →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
