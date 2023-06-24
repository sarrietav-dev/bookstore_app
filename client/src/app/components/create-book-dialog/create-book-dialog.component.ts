import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { LocalBookService } from 'src/app/services/local-book.service';
import { Book } from 'src/app/types/Book';

@Component({
  selector: 'app-create-book-dialog',
  templateUrl: './create-book-dialog.component.html',
  styleUrls: ['./create-book-dialog.component.css'],
})
export class CreateBookDialogComponent {
  book: Book = {
    title: this.data?.title ?? '',
    category: this.data?.category ?? '',
  };

  constructor(
    private service: LocalBookService,
    private ref: DialogRef,
    @Inject(DIALOG_DATA) private data?: Book
  ) {}

  onSave(): void {
    if (this.data) {
      this.service.updateBook(this.book);
      return;
    }
    this.service.createBook(this.book);
  }

  onCancel(): void {
    this.ref.close();
  }
}
