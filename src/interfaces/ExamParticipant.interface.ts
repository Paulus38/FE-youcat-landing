import { Exam } from './Exam.interface';
import { UserAnswer } from './UserAnswer.interface';

export interface ExamParticipant {
  id: number;
  user_id: number | null;
  duration: number | null;
  score: number | 0;
  start_time: string;
  end_time: string | null;
  is_finished: number;
  Exam?: Exam;
  UserAnswers?: UserAnswer[];
}
