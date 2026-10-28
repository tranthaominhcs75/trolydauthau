export type TopicId = 1 | 2 | 3 | 4 | 5;

export interface TopicSubgroup {
  code: string;
  title: string;
  count: number;
  questionRange: string;
  articles: string;
  description: string;
}

export interface TopicInfo {
  id: TopicId;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  badge: string;
  totalQuestions: number;
  questionRange: {
    start: number;
    end: number;
    label: string;
  };
  subgroups: TopicSubgroup[];
}

export interface Question {
  id: number;
  topicId: TopicId;
  topicName: string;
  subgroupCode?: string;
  title: string;
  content: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  legalBasis: string;
  difficulty: 'Cơ bản' | 'Nâng cao' | 'Tình huống bẫy';
  tags: string[];
}

export interface Flashcard {
  id: number;
  topicId: TopicId;
  topicName: string;
  category: 'Hạn mức' | 'Thời gian' | 'Hành vi cấm' | 'Quy trình' | 'Hợp đồng';
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  legalBasis: string;
  keywords: string[];
}

export interface CaseStudy {
  id: number;
  topicId: TopicId;
  title: string;
  scenario: string;
  recognition: string; // 1. 📌 Nhận định
  solution: string;    // 2. 🛠️ Hướng xử lý chuẩn quy định
  legalBasis: string;  // 3. 📜 Căn cứ pháp lý
  tags: string[];
}

export interface ExamHistoryItem {
  id: string;
  questionId: number;
  questionTitle: string;
  topicId: TopicId;
  userAnswer: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timestamp: number;
  legalBasis?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  password?: string;
  targetExamDate?: string;
  createdAt: number;
  email?: string;
  avatarIcon?: string;
  role?: string;
}

export type StudyMode = 'quiz' | 'flashcard' | 'advisor';

