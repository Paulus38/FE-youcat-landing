export interface QuizAnswer {
  id: number;
  name: string;
  is_correct: boolean;
}

export interface QuizQuestion {
  id: number;
  name: string;
  description: string;
  answers: QuizAnswer[];
}

export interface QuizQuestionResponse {
  statusCode: number;
  message: string;
  data: QuizQuestion;
}
