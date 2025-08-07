import { Book } from './Book.interface';

export interface Part {
  id: number;
  name: string;
  index_name: string;
  Book: Book;
}
