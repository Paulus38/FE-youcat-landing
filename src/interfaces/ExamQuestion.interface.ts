import { ExamAnswer } from './ExamAnswer.interface';

export interface ExamQuestion {
  id: number;
  content: string;
  order: number;
  description: string;
  Question: {
    id: number;
    name: string;
    description: string;
    QuestionCategory?: any;
  };
  ExamAnswers: ExamAnswer[];
}

interface Option {
  id: string | number;
  text: string;
}

export interface ExamQuestionResult {
  id: string | number;
  text: string;
  category?: string;
  description?: string;
  options: Option[];
  correctOptionId: string | number;
}
