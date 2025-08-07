export interface ExamParticipant {
  id: number;
  user_id: number | null;
  duration: number | null;
  score: number | null;
  start_time: string;
  end_time: string | null;
  is_finished: number;
}
