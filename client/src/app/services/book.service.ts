import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

type Book = {
  id: number;
  title: string;
  category: string;
};

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private URL = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.URL);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.URL}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.URL, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.URL}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(`${this.URL}/${id}`);
  }
}
