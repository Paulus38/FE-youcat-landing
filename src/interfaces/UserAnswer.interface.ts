export interface UserAnswer {
  id?: number;
  exam_participant_id?: number;
  exam_question_id?: number;
  selected_answer_id?: number | null; // Optional, used for exam answers
}

export interface UserAnswerAtExamResult {
  question_id: string | number;
  option_id: string | number;
  isCorrect: boolean;
}

export interface UserChooseAnswer {
  exam_question_id?: number;
  selected_answer_id?: number | null; // Optional, used for exam answers
}
