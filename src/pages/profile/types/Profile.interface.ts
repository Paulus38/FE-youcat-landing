import { Activity } from './RecentActivity.interface';

export interface ProfileResponse {
  id: number;
  username: string;
  Candidate?: {
    name: string;
    email: string;
    image?: string;
    is_google?: boolean; // Optional field for Google accounts
  };
  ExamParticipants?: Array<{
    id: number;
    user_id: number;
    duration: number;
    score: number;
    start_time: string;
    end_time: string;
    is_finished: number;
    Exam?: {
      id: number;
      title: string;
      duration: number;
      total_question: number;
      status: number;
    };
    UserAnswers?: Array<{
      id: number;
      selected_answer_id: number;
      is_correct: number;
    }>;
  }>;
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
