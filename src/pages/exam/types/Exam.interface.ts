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

export interface ExamResult {
  id: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  [key: string]: any;
}

// Interface for predefined exams
export interface PredefinedExam {
  id: number;
  title: string;
  description: string;
  duration: number;
  total_question: number;
  difficulty: string;
  ExamType: {
    id: number;
    name: string;
  };
}

export interface PredefinedExamsResponse {
  statusCode: number;
  message: string;
  data: PredefinedExam[];
}

// Interface for books
export interface Book {
  id: number;
  name: string;
  description?: string;
}

export interface BooksResponse {
  statusCode: number;
  message: string;
  data: Book[];
}

export interface ExamSet {
  id: number;
  name: string;
  description?: string | null;
  created_time?: string | null;
}
