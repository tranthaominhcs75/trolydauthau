import React, { useState } from 'react';
import { ExamHistoryItem, TopicId } from '../types/procurement';
import { TOPICS } from '../data/topics';
import { 
  X, 
  History, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  RotateCcw, 
  AlertCircle, 
  Award, 
  TrendingUp,
  ArrowRight,
  Scale
} from 'lucide-react';

interface StudyHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: ExamHistoryItem[];
  answeredQuestionIds: number[];
  wrongQuestionIds: number[];
  onClearHistory: () => void;
  onResetTopicProgress: (topicId: TopicId | 'all') => void;
  onStartReviewWrong: (topicId?: TopicId) => void;
}

export const StudyHistoryModal: React.FC<StudyHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  answeredQuestionIds,
  wrongQuestionIds,
  onClearHistory,
  onResetTopicProgress,
  onStartReviewWrong,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  if (!isOpen) return null;

  const totalAnswered = answeredQuestionIds.length;
  const totalWrong = wrongQuestionIds.length;
  const totalCorrect = totalAnswered - totalWrong;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const filteredHistory = history.filter((item) => {
    if (selectedFilter === 'wrong') return !item.isCorrect;
    if (selectedFilter === 'correct') return item.isCorrect;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden">
        {/* iOS Grabber */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base">
              📊
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Tiến độ & Lịch sử Học tập
              </h3>
              <p className="text-xs text-slate-500">
                Tự động loại bỏ câu đã làm • Lưu câu sai để rèn luyện
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="p-6 bg-[#F9F9FB] border-b border-slate-100 space-y-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">Đã làm</div>
              <div className="text-lg font-black text-slate-900 mt-0.5">
                {totalAnswered} <span className="text-xs text-slate-400 font-normal">/ 395</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-emerald-600 font-medium">Làm đúng</div>
              <div className="text-lg font-black text-emerald-600 mt-0.5">
                {totalCorrect}
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-rose-600 font-medium">Làm sai</div>
              <div className="text-lg font-black text-rose-600 mt-0.5">
                {totalWrong}
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="text-[11px] text-blue-600 font-medium">Tỷ lệ chính xác</div>
              <div className="text-lg font-black text-blue-600 mt-0.5">
                {accuracy}%
              </div>
            </div>
          </div>

          {/* Quick Review Wrong CTA */}
          {totalWrong > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-rose-900">
                    Bạn đang có {totalWrong} câu hỏi làm sai cần khắc phục
                  </div>
                  <div className="text-[11px] text-rose-700">
                    Luyện tập lại các câu này sẽ giúp bạn nắm vững các bẫy đề thi
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  onStartReviewWrong();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 flex items-center gap-1"
              >
                Ôn ngay 👉
              </button>
            </div>
          )}
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedFilter === 'all' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Tất cả ({history.length})
            </button>
            <button
              onClick={() => setSelectedFilter('wrong')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedFilter === 'wrong' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Làm sai ({history.filter((h) => !h.isCorrect).length})
            </button>
            <button
              onClick={() => setSelectedFilter('correct')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedFilter === 'correct' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Làm đúng ({history.filter((h) => h.isCorrect).length})
            </button>
          </div>

          <button
            onClick={onClearHistory}
            className="text-xs text-slate-400 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Xóa nhật ký
          </button>
        </div>

        {/* History Item List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.isCorrect ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Đúng
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                        <XCircle className="w-3 h-3 text-rose-600" />
                        Sai
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-900">
                      Câu #{item.questionId}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Chuyên đề {item.topicId}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-xs text-slate-800 line-clamp-2">
                  {item.questionTitle}
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                  <div className="space-x-3 text-[11px]">
                    <span className="text-slate-500">
                      Bạn chọn: <strong className={item.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>{item.userAnswer}</strong>
                    </span>
                    {!item.isCorrect && (
                      <span className="text-slate-500">
                        Đáp án chuẩn: <strong className="text-slate-900">{item.correctAnswer}</strong>
                      </span>
                    )}
                  </div>

                  {item.legalBasis && (
                    <span className="text-[10px] text-blue-600 font-medium flex items-center gap-1 truncate max-w-[200px]">
                      <Scale className="w-3 h-3" />
                      {item.legalBasis}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Chưa có dữ liệu nào trong bộ lọc này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
