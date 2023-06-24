import { Injectable } from '@angular/core';
import { IBookService } from '../types/book-service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Book } from '../types/Book';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class LocalBookService implements IBookService {
  books = new BehaviorSubject<Book[]>([]);

  constructor(private db: NgxIndexedDBService) {}

  getBooks(): Observable<Book[]> {
    return this.db.getAll<Book>('books').pipe(
      tap((books) => {
        console.log(books);

        this.books.next(books);
      }),
      switchMap(() => this.books)
    );
  }
  getBook(id: number): Observable<Book> {
    return this.db.getByID('books', id);
  }
  createBook(book: Book): Observable<Book> {
    if ('id' in book) delete book.id;
    return this.db.add<Book>('books', book).pipe(
      tap((book) => {
        const books = this.books.getValue();
        books.push(book);
        this.books.next(books);
      })
    );
  }
  updateBook(book: Book): Observable<Book> {
    return this.db.update<Book>('books', book).pipe(
      tap((book) => {
        const books = this.books.getValue();
        const index = books.findIndex((b) => b.id === book.id);
        books[index] = book;
        this.books.next(books);
      })
    );
  }
  deleteBook(id: number): Observable<unknown> {
    return this.db.delete('books', id).pipe(
      tap(() => {
        const books = this.books.getValue();
        const index = books.findIndex((b) => b.id === id);
        books.splice(index, 1);
        this.books.next(books);
      })
    );
  }
}
