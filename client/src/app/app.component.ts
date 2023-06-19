import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { Book } from './types/Book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private bookService: BookService) {}

  books: Book[] = [];

  ngOnInit(): void {
    this.getAllBooks()
  }

  getAllBooks(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }
}
