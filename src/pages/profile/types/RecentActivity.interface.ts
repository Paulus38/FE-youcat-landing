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
  questions?: Question[];
}

interface Question {
  id?: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}
