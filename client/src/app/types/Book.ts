export type BookDTO = Omit<Book, 'id'>;

export type Book = {
  id: number;
  title: string;
  category: string;
};
