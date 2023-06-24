import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { Book } from './types/Book';
import { Dialog } from '@angular/cdk/dialog';
import { CreateBookDialogComponent } from './components/create-book-dialog/create-book-dialog.component';
import { LocalBookService } from './services/local-book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private bookService: LocalBookService, private dialog: Dialog) {}

  books: Book[] = [];

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  getAllBooks(): void {}

  openCreateBookDialog(): void {
    this.dialog.open(CreateBookDialogComponent);
  }
}
