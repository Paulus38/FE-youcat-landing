export interface Book {
  id: number;
  name: string;
}

export interface Part {
  id: number;
  name: string;
  index_name: string;
  Book: Book;
}

export interface Section {
  id: number;
  name: string;
  index_name: string;
  Part: Part;
}

export interface Chapter {
  id: number;
  name: string;
  index_name: string;
  Section: Section;
}

export interface Answer {
  id: number;
  name: string;
  description?: string;
}

export interface Question {
  id: number;
  name: string;
  index_name: string;
  description?: string;
  Chapter: Chapter;
  Answers: Answer[];
}

export interface QuestionResponse {
  statusCode: number;
  message: string;
  data: {
    data: Question[];
    total: number;
  };
}

export interface QuestionFilters {
  name: string;
  question_id: string;
  chapter_id: string;
  chapter_index: string;
  section_index: string;
  part_index: string;
  book_id: string;
}

export interface QuestionSearchParams {
  fieldSort?: string;
  orderBy?: string;
  offSet?: number;
  limit?: number;
  name?: string;
  question_id?: string;
  chapter_id?: string;
  chapter_index?: string;
  section_index?: string;
  part_index?: string;
  book_id?: string;
}

export interface QuestionDetailResponse {
  statusCode: number;
  message: string;
  data: Question;
}

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