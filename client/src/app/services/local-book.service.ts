import { Injectable } from '@angular/core';
import { IBookService } from '../types/book-service';
import { Observable } from 'rxjs';
import { Book } from '../types/Book';

@Injectable({
  providedIn: 'root',
})
export class LocalBookService implements IBookService {
  constructor() {}
  getBooks(): Observable<Book[]> {
    throw new Error('Method not implemented.');
  }
  getBook(id: number): Observable<Book> {
    throw new Error('Method not implemented.');
  }
  createBook(book: Book): Observable<Book> {
    throw new Error('Method not implemented.');
  }
  updateBook(book: Book): Observable<Book> {
    throw new Error('Method not implemented.');
  }
  deleteBook(id: number): Observable<Book> {
    throw new Error('Method not implemented.');
  }
}
