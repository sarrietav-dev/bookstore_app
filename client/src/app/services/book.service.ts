import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Book } from '../types/Book';
import { IBookService } from '../types/book-service';

@Injectable({
  providedIn: 'root',
})
export class BookService implements IBookService {
  private URL = `${environment.apiUrl}/books`;

  private books = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.URL).pipe(
      tap((books) => this.books.next(books)),
      switchMap(() => this.books)
    );
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.URL}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.URL, book).pipe(
      tap((book) => {
        const books = this.books.getValue();
        books.push(book);
        this.books.next(books);
      })
    );
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.URL}/${book.id}`, book).pipe(
      tap((book) => {
        const books = this.books.getValue();
        const index = books.findIndex((b) => b.id === book.id);
        books[index] = book;
        this.books.next(books);
      })
    );
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(`${this.URL}/${id}`).pipe(
      tap(() => {
        const books = this.books.getValue();
        const index = books.findIndex((b) => b.id === id);
        books.splice(index, 1);
        this.books.next(books);
      })
    );
  }
}
