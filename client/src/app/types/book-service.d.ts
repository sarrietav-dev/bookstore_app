import { Observable } from 'rxjs';
import { Book, BookDTO } from './Book';

interface IBookService {
  getBooks(): Observable<Book[]>;

  getBook(id: number): Observable<Book>;

  createBook(book: BookDTO): Observable<Book>;

  updateBook(book: Book): Observable<Book>;

  deleteBook(id: number): Observable<Book>;
}
