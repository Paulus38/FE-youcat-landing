import { ExamParticipant } from './ExamParticipant.interface';

export interface ProfileResponse {
  id: number;
  username: string;
  Candidate?: {
    name: string;
    email: string;
    image?: string;
    is_google?: boolean; // Optional field for Google accounts
  };
  ExamParticipants?: ExamParticipant[];
}

export interface ProfileData {
  id: number;
  username: string;
  name: string;
  email: string;
  image: string | null;
  is_google_account?: boolean; // Optional field for Google accounts
  activityHistory: Activity[];
  statistics: {
    quizzesCompleted: number;
    averageScore: number;
    achievements: number;
    totalPoints: number;
  };
}

export interface RecentActivityProps {
  profileData: {
    activityHistory: Activity[];
  };
  setNotification: (notification: {
    open: boolean;
    message: string;
    severity: 'error' | 'success' | 'info' | 'warning';
  }) => void;
}

export interface Activity {
  id: number;
  quizId: string;
  quizTitle: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
  duration?: number;
  questions?: QuestionProfile[];
}

interface QuestionProfile {
  id?: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}
