import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { LocalBookService } from 'src/app/services/local-book.service';
import { Book, BookDTO } from 'src/app/types/Book';

@Component({
  selector: 'app-create-book-dialog',
  templateUrl: './create-book-dialog.component.html',
  styleUrls: ['./create-book-dialog.component.css']
})
export class CreateBookDialogComponent {
  book: BookDTO = {
    title: '',
    category: '',
  }

  constructor(private service: LocalBookService, private ref: DialogRef) { }

  onSave(): void {
    this.service.createBook(this.book);
  }

  onCancel(): void {
    this.ref.close();
  }
}
