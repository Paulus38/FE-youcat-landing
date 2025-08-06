export interface ExamParticipant {
  id: number;
  user_id: number;
  duration: number;
  score: number;
  start_time: string;
  end_time: string;
  is_finished: number;
  Exam?: Exam;
  UserAnswers?: UserAnswer[];
}

interface Exam {
  id: number;
  title: string;
  duration: number;
  total_question: number;
  status: number;
}
interface UserAnswer {
  id: number;
  selected_answer_id: number;
  is_correct: number;
}
