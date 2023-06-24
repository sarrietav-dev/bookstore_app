import { Injectable } from '@angular/core';
import { IBookService } from '../types/book-service';
import { Observable } from 'rxjs';
import { Book } from '../types/Book';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class LocalBookService implements IBookService {
  constructor(private db: NgxIndexedDBService) {}

  getBooks(): Observable<Book[]> {
    return this.db.getAll('books');
  }
  getBook(id: number): Observable<Book> {
    return this.db.getByID('books', id);
  }
  createBook(book: Book): Observable<Book> {
    return this.db.add('books', book);
  }
  updateBook(book: Book): Observable<Book> {
    return this.db.update('books', book);
  }
  deleteBook(id: number): Observable<unknown> {
    return this.db.delete('books', id);
  }
}
