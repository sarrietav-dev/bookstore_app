import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
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
    return this.http.post<Book[]>(this.URL, book).pipe(
      tap((book) => {
        const books = this.books.getValue();
        books.push(book[0]);
        console.log(books);

        this.books.next(books);
      }),
      map((book) => book[0])
    );
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book[]>(`${this.URL}/${book.id}`, book).pipe(
      tap((bookList) => {
        const books = this.books.getValue();
        let book = bookList[0];
        const index = books.findIndex((b) => b.id === book.id);
        books[index] = book;
        this.books.next(books);
      }),
      map((book) => book[0])
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
