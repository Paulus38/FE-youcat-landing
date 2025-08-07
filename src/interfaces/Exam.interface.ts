import { Book } from './Book.interface';
import { ExamParticipant } from './ExamParticipant.interface';
import { ExamQuestion, ExamQuestionResult } from './ExamQuestion.interface';
import { UserAnswerAtExamResult } from './UserAnswer.interface';

export interface Exam {
  id?: number;
  user_id?: number; // ID of the user who created the exam
  book_id?: number; // ID of the book associated with the exam
  status?: number; // Status of the exam (e.g., 0 for draft, 1 for published)
  title?: string; // Title of the exam
  description?: string; // Description of the exam
  duration?: number; // Estimated duration of the exam in minutes
  total_question?: number; // Total number of questions in the exam
  exam_type_id?: number; // ID of the exam type
  exam_set_id?: number; // ID of the exam set if applicable
  difficulty?: string; // Difficulty level of the exam
  created_time?: Date; // Timestamp when the exam was created
}

// Define interfaces for exam-related data
export interface ExamSettings {
  title: string;
  categoryIds: string[];
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  questionCount: number;
  timeLimit: number;
  randomOrder: boolean;
  guest_identifier?: string;
  book_id?: number; // Add this line
}

export interface ExamResponse {
  statusCode: number;
  message: string;
  data: {
    id: string | number;
    guest_identifier?: string;
    ExamParticipants?: Array<{
      id: number;
      user_id: number | null;
      duration: number | null;
      score: number | null;
      start_time: string;
      end_time: string | null;
      is_finished: number;
    }>;
    [key: string]: any;
  };
}

// Interface for predefined exams
export interface PredefinedExam {
  id: number;
  title: string;
  description: string;
  duration: number;
  total_question: number;
  difficulty: string;
  ExamType: ExamType;
}

export interface PredefinedExamsResponse {
  statusCode: number;
  message: string;
  data: PredefinedExam[];
}

export interface ApiExamResult {
  id: number;
  duration: number;
  title: string;
  description: string | null;
  total_question: number;
  Book: Book;
  ExamQuestions: ExamQuestion[];
  ExamParticipants: any[];
}

export interface ApiExamResponseResult {
  statusCode: number;
  message: string;
  data: ApiExamResult;
}

export interface ExamResult {
  id: string | number;
  title: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number;
  questions: ExamQuestionResult[];
  userAnswers: UserAnswerAtExamResult[];
}

interface ExamType {
  id: number;
  name: string;
}

export interface ExamData {
  id: number;
  title: string;
  status: number;
  user_id: number | null;
  description: string | null;
  duration: number; // in minutes
  total_question: number;
  User: any | null;
  Book: Book;
  ExamType: ExamType;
  ExamQuestions: ExamQuestion[];
  guest_identifier?: string;
  ExamParticipants: ExamParticipant[];
}

export interface ApiExamResponse {
  statusCode: number;
  message: string;
  data: ExamData;
}
