// New interfaces that match the API response structure
export interface ExamAnswer {
  id: number;
  content: string;
  order: number;
  code_option: string;
  is_correct: number;
  UserAnswers: any[];
}
