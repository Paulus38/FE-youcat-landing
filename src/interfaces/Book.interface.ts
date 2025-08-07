export interface Book {
  id: string;
  name: string;
  description?: string;
}

export interface BooksResponse {
  statusCode: number;
  message: string;
  data: Book[];
}
