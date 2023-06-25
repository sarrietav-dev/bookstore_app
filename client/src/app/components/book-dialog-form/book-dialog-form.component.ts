import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { LocalBookService } from 'src/app/services/local-book.service';
import { Book } from 'src/app/types/Book';

@Component({
  selector: 'book-dialog-form',
  templateUrl: './book-dialog-form.component.html',
  styleUrls: ['./book-dialog-form.component.css'],
})
export class BookDialogFormComponent {
  book: Book = {
    id: this.data?.id ?? undefined,
    title: this.data?.title ?? '',
    category: this.data?.category ?? '',
  };

  constructor(
    private service: BookService,
    private ref: DialogRef,
    @Inject(DIALOG_DATA) private data?: Book
  ) {}

  onSave(): void {
    if (this.data) {
      this.service.updateBook(this.book).subscribe();
      this.ref.close();
      return;
    }
    this.service
      .createBook(this.book)
      .subscribe({ error: (error) => console.error(error) });
    this.ref.close();
  }

  onCancel(): void {
    this.ref.close();
  }
}
