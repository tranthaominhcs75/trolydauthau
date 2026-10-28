import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WelcomeMenu } from './components/WelcomeMenu';
import { QuizMode } from './components/QuizMode';
import { FlashcardMode } from './components/FlashcardMode';
import { LegalAdvisorMode } from './components/LegalAdvisorMode';
import { LawLibrary } from './components/LawLibrary';
import { TaxonomyMatrix } from './components/TaxonomyMatrix';
import { AssistantDrawer } from './components/AssistantDrawer';
import { StudyHistoryModal } from './components/StudyHistoryModal';
import { AuthModal } from './components/AuthModal';
import { StudyMode, TopicId, ExamHistoryItem, UserProfile } from './types/procurement';
import { Scale } from 'lucide-react';
import { TOPICS } from './data/topics';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | StudyMode | 'laws' | 'matrix'>('home');
  const [activeQuizTopic, setActiveQuizTopic] = useState<TopicId | 'all'>('all');
  const [activeQuizSubgroup, setActiveQuizSubgroup] = useState<string | undefined>(undefined);
  const [activeQuizFilterMode, setActiveQuizFilterMode] = useState<'unanswered' | 'wrong' | 'all' | 'bookmarked'>('unanswered');
  const [activeFlashcardTopic, setActiveFlashcardTopic] = useState<TopicId | undefined>(undefined);

  // User Authentication & Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('bunny_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Guest Target Exam Date (if user is not logged in)
  const [guestTargetDate, setGuestTargetDate] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('bunny_guest_target_date');
      if (saved) return saved;
      const d = new Date();
      d.setDate(d.getDate() + 30);
      return d.toISOString().split('T')[0];
    } catch {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      return d.toISOString().split('T')[0];
    }
  });

  const handleUpdateTargetExamDate = (newDate: string) => {
    if (currentUser) {
      const updated = { ...currentUser, targetExamDate: newDate };
      setCurrentUser(updated);
      try {
        const raw = localStorage.getItem('bunny_registered_accounts');
        if (raw) {
          const accounts: UserProfile[] = JSON.parse(raw);
          const nextAccounts = accounts.map((acc) =>
            acc.name.toLowerCase() === updated.name.toLowerCase()
              ? { ...acc, targetExamDate: newDate }
              : acc
          );
          localStorage.setItem('bunny_registered_accounts', JSON.stringify(nextAccounts));
        }
      } catch {}
    } else {
      setGuestTargetDate(newDate);
      try {
        localStorage.setItem('bunny_guest_target_date', newDate);
      } catch {}
    }
  };

  // Persistence: Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('dauthau_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistence: Answered questions (to exclude them on next study sessions)
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('dauthau_answered_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistence: Wrong questions (to focus review)
  const [wrongQuestionIds, setWrongQuestionIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('dauthau_wrong_questions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistence: Study History Logs
  const [studyHistory, setStudyHistory] = useState<ExamHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('dauthau_study_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistence: Overall Stats
  const [stats, setStats] = useState({
    totalAnswered: 0,
    correctCount: 0,
    streak: 0,
  });

  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('dauthau_stats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch {
      // ignore
    }
  }, []);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [advisorInitialPrompt, setAdvisorInitialPrompt] = useState('');
  const [advisorIsCaseStudy, setAdvisorIsCaseStudy] = useState(true);

  // Auto-sync state to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('bunny_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('bunny_current_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('dauthau_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dauthau_answered_questions', JSON.stringify(answeredQuestionIds));
    } catch {
      // ignore
    }
  }, [answeredQuestionIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dauthau_wrong_questions', JSON.stringify(wrongQuestionIds));
    } catch {
      // ignore
    }
  }, [wrongQuestionIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dauthau_study_history', JSON.stringify(studyHistory));
    } catch {
      // ignore
    }
  }, [studyHistory]);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuestionAnswered = (
    questionId: number,
    isCorrect: boolean,
    selectedAnswer: 'A' | 'B' | 'C' | 'D',
    questionTitle: string,
    topicId: TopicId,
    correctAnswer: 'A' | 'B' | 'C' | 'D',
    legalBasis: string
  ) => {
    // 1. Update Answered Questions (Exclude on next study sessions)
    setAnsweredQuestionIds((prev) => (prev.includes(questionId) ? prev : [...prev, questionId]));

    // 2. Update Wrong Questions List
    if (!isCorrect) {
      setWrongQuestionIds((prev) => (prev.includes(questionId) ? prev : [...prev, questionId]));
    } else {
      // If user answers correctly now, remove from wrong list so it's mastered
      setWrongQuestionIds((prev) => prev.filter((id) => id !== questionId));
    }

    // 3. Log detailed record in Study History
    const historyRecord: ExamHistoryItem = {
      id: `${Date.now()}-${questionId}`,
      questionId,
      questionTitle,
      topicId,
      userAnswer: selectedAnswer,
      correctAnswer,
      isCorrect,
      timestamp: Date.now(),
      legalBasis,
    };
    setStudyHistory((prev) => [historyRecord, ...prev]);

    // 4. Update overall stats
    setStats((prev) => {
      const newStats = {
        totalAnswered: prev.totalAnswered + 1,
        correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
        streak: isCorrect ? prev.streak + 1 : 0,
      };
      try {
        localStorage.setItem('dauthau_stats', JSON.stringify(newStats));
      } catch {
        // ignore
      }
      return newStats;
    });
  };

  const handleResetTopicProgress = (topicId: TopicId | 'all') => {
    if (topicId === 'all') {
      setAnsweredQuestionIds([]);
      setWrongQuestionIds([]);
    } else {
      const topicObj = TOPICS.find((t) => t.id === topicId);
      if (topicObj) {
        const { start, end } = topicObj.questionRange;
        setAnsweredQuestionIds((prev) => prev.filter((id) => id < start || id > end));
        setWrongQuestionIds((prev) => prev.filter((id) => id < start || id > end));
      }
    }
  };

  const handleClearAllHistory = () => {
    setStudyHistory([]);
    setAnsweredQuestionIds([]);
    setWrongQuestionIds([]);
    const resetStats = { totalAnswered: 0, correctCount: 0, streak: 0 };
    setStats(resetStats);
    try {
      localStorage.removeItem('dauthau_study_history');
      localStorage.removeItem('dauthau_answered_questions');
      localStorage.removeItem('dauthau_wrong_questions');
      localStorage.setItem('dauthau_stats', JSON.stringify(resetStats));
    } catch {
      // ignore
    }
  };

  const handleStartReviewWrong = (topicId?: TopicId) => {
    setActiveQuizTopic(topicId || 'all');
    setActiveQuizSubgroup(undefined);
    setActiveQuizFilterMode('wrong');
    setCurrentTab('quiz');
  };

  const handleSelectMode = (mode: StudyMode, topicId?: TopicId | 'all') => {
    if (mode === 'quiz') {
      setActiveQuizTopic(topicId || 'all');
      setActiveQuizSubgroup(undefined);
      setActiveQuizFilterMode('unanswered'); // Mặc định chỉ làm các câu chưa làm
      setCurrentTab('quiz');
    } else if (mode === 'flashcard') {
      setActiveFlashcardTopic(topicId === 'all' ? undefined : topicId);
      setCurrentTab('flashcard');
    } else if (mode === 'advisor') {
      setCurrentTab('advisor');
    }
  };

  const handleSelectTopicAndSubgroupFromMatrix = (topicId: TopicId, subgroupCode?: string) => {
    setActiveQuizTopic(topicId);
    setActiveQuizSubgroup(subgroupCode);
    setActiveQuizFilterMode('unanswered');
    setCurrentTab('quiz');
  };

  const handleOpenAdvisorWithPrompt = (prompt: string, isCaseStudy: boolean) => {
    setAdvisorInitialPrompt(prompt);
    setAdvisorIsCaseStudy(isCaseStudy);
    setCurrentTab('advisor');
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-slate-900 flex flex-col font-sans selection:bg-blue-500 selection:text-white antialiased">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        stats={{
          totalAnswered: stats.totalAnswered,
          correctCount: stats.correctCount,
          streak: stats.streak,
          bookmarkedCount: bookmarkedIds.length,
          wrongCount: wrongQuestionIds.length,
        }}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Workspace Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'home' && (
          <WelcomeMenu
            onSelectMode={handleSelectMode}
            onSelectTab={setCurrentTab}
            onOpenAdvisorWithPrompt={handleOpenAdvisorWithPrompt}
            currentUser={currentUser}
            targetExamDate={currentUser?.targetExamDate || guestTargetDate}
            onUpdateTargetDate={handleUpdateTargetExamDate}
            answeredCount={answeredQuestionIds.length}
            totalQuestions={395}
            wrongCount={wrongQuestionIds.length}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizMode
            initialTopicId={activeQuizTopic}
            initialSubgroupCode={activeQuizSubgroup}
            initialFilterMode={activeQuizFilterMode}
            onQuestionAnswered={handleQuestionAnswered}
            answeredQuestionIds={answeredQuestionIds}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            wrongQuestionIds={wrongQuestionIds}
            onResetTopicProgress={handleResetTopicProgress}
          />
        )}

        {currentTab === 'flashcard' && (
          <FlashcardMode initialTopicId={activeFlashcardTopic} />
        )}

        {currentTab === 'advisor' && (
          <LegalAdvisorMode
            initialPrompt={advisorInitialPrompt}
            isInitialCaseStudy={advisorIsCaseStudy}
          />
        )}

        {currentTab === 'matrix' && (
          <TaxonomyMatrix
            onSelectTopicAndSubgroup={handleSelectTopicAndSubgroupFromMatrix}
          />
        )}

        {currentTab === 'laws' && <LawLibrary />}
      </main>

      {/* Companion Chat Assistant Drawer */}
      <AssistantDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectMode={(mode) => {
          handleSelectMode(mode);
          setIsDrawerOpen(false);
        }}
      />

      {/* User Login & Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onUpdateUserExamDate={handleUpdateTargetExamDate}
      />

      {/* Study History & Progress Tracking Modal */}
      <StudyHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={studyHistory}
        answeredQuestionIds={answeredQuestionIds}
        wrongQuestionIds={wrongQuestionIds}
        onClearHistory={handleClearAllHistory}
        onResetTopicProgress={handleResetTopicProgress}
        onStartReviewWrong={handleStartReviewWrong}
      />

      {/* Modern Light iOS Footer */}
      <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-md py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">🐰</span>
            <span className="font-semibold text-slate-800">
              Bunny – Trợ lý ảo luyện thi chứng chỉ nghiệp vụ đấu thầu
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="hidden sm:inline italic">Chinh phục chứng chỉ- Vững vàng nghiệp vụ</span>
          </div>

          <div className="text-slate-500 text-center sm:text-right">
            Phát triển bởi Bunny 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
