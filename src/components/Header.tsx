import React from 'react';
import { StudyMode, UserProfile } from '../types/procurement';
import { 
  Sparkles, 
  BookOpen, 
  Zap, 
  Scale, 
  FileText, 
  History, 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  User, 
  Layers
} from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | StudyMode | 'laws' | 'matrix';
  onSelectTab: (tab: 'home' | StudyMode | 'laws' | 'matrix') => void;
  stats: {
    totalAnswered: number;
    correctCount: number;
    streak: number;
    bookmarkedCount: number;
    wrongCount: number;
  };
  onOpenDrawer: () => void;
  onOpenHistory: () => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  stats,
  onOpenDrawer,
  onOpenHistory,
  currentUser,
  onOpenAuth,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Brand - Apple iOS Style */}
          <div 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-sky-400 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all text-xl">
              🐰
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-1.5">
                  Bunny
                  <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/60">
                    Đấu thầu 2026
                  </span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Trợ lý ảo luyện thi chứng chỉ nghiệp vụ đấu thầu
              </p>
            </div>
          </div>

          {/* Center Navigation - iOS Segmented Bar */}
          <nav className="hidden lg:flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200/60">
            <button
              onClick={() => onSelectTab('home')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                currentTab === 'home'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => onSelectTab('quiz')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                currentTab === 'quiz'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Thi trắc nghiệm (395 câu)
            </button>
            <button
              onClick={() => onSelectTab('flashcard')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                currentTab === 'flashcard'
                  ? 'bg-white text-amber-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Flashcard tra cứu
            </button>
            <button
              onClick={() => onSelectTab('advisor')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                currentTab === 'advisor'
                  ? 'bg-white text-emerald-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              Trợ lý pháp chế
            </button>
            <button
              onClick={() => onSelectTab('matrix')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                currentTab === 'matrix'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Cây kiến thức
            </button>
            <button
              onClick={() => onSelectTab('laws')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                currentTab === 'laws'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Thư viện luật
            </button>
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Wrong Questions pill button */}
            {stats.wrongCount > 0 && (
              <button
                onClick={onOpenHistory}
                title="Xem các câu làm sai để ôn tập lại"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors text-xs font-semibold border border-rose-200/80 shadow-xs"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ôn câu sai:</span>
                <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                  {stats.wrongCount}
                </span>
              </button>
            )}

            {/* Answered Counter & Progress */}
            <button
              onClick={onOpenHistory}
              title="Lịch sử học & Tự động loại trừ câu đã làm"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 transition-colors text-xs font-medium border border-slate-200/60"
            >
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Đã làm:</span>
              <span className="font-semibold text-slate-900">{stats.totalAnswered}/395</span>
              {stats.streak > 1 && (
                <span className="flex items-center gap-0.5 text-amber-600 font-bold ml-1">
                  <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {stats.streak}
                </span>
              )}
            </button>

            {/* User Profile / Auth Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 shadow-xs text-xs font-medium transition-colors"
            >
              {currentUser ? (
                <>
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline max-w-[110px] truncate font-semibold text-slate-900">
                    {currentUser.name}
                  </span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline font-semibold text-blue-600">Đăng nhập</span>
                </>
              )}
            </button>

            {/* Bunny AI Companion Drawer Trigger */}
            <button
              onClick={onOpenDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-sm hover:shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hỏi Bunny</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
