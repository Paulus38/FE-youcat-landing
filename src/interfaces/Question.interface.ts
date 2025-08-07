import { Answer } from './Answer.interface';
import { Chapter } from './Chapter.interface';

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
