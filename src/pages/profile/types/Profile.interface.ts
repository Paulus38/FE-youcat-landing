import { ExamParticipant } from './ExamParticipants.interface';
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
