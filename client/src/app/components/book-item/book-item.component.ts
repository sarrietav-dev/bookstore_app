import { Dialog } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { Book } from 'src/app/types/Book';
import { CreateBookDialogComponent } from '../create-book-dialog/create-book-dialog.component';
import { LocalBookService } from 'src/app/services/local-book.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent {
  @Input() book!: Book;

  constructor(private dialog: Dialog, private service: LocalBookService) {}

  onEdit(): void {
    this.dialog.open(CreateBookDialogComponent, { data: this.book });
  }

  onDelete(): void {
    this.service.deleteBook(this.book.id!);
  }
}
