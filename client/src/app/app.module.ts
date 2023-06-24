import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { CreateBookDialogComponent } from './components/create-book-dialog/create-book-dialog.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [AppComponent, BookItemComponent, CreateBookDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
