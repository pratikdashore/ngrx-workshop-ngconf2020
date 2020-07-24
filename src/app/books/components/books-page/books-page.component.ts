import { Observable } from 'rxjs';
import { BooksApiActions, BooksPageActions } from 'src/app/books/actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {
  BookModel,
  calculateBooksGrossEarnings,
  BookRequiredProps,
} from 'src/app/shared/models';
import { BooksService } from 'src/app/shared/services';
import {
  State,
  selectActiveBook,
  selectAllBooks,
  selectBookEarningsTotal,
} from 'src/app/shared/state';

@Component({
  selector: 'app-books',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css'],
})
export class BooksPageComponent implements OnInit {
  books$: Observable<BookModel[]>;
  currentBook$: Observable<BookModel | null | undefined>;
  total$: Observable<number>;

  constructor(private store: Store<State>) {
    this.total$ = store.select(selectBookEarningsTotal);
    this.books$ = store.select(selectAllBooks);
    this.currentBook$ = store.select(selectActiveBook);
  }

  ngOnInit() {
    this.store.dispatch(BooksPageActions.enter());
  }

  onSelect(book: BookModel) {
    this.store.dispatch(BooksPageActions.selectBook({ bookId: book.id }));
  }

  onCancel() {
    this.store.dispatch(BooksPageActions.cancelBook());
  }

  onSave(book: BookRequiredProps | BookModel) {
    if ('id' in book) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  saveBook(bookProps: BookRequiredProps) {
    this.store.dispatch(BooksPageActions.createBook({ book: bookProps }));
  }

  updateBook(book: BookModel) {
    this.store.dispatch(BooksPageActions.updateBook({ bookId: book.id, book }));
  }

  onDelete(book: BookModel) {
    this.store.dispatch(BooksPageActions.deleteBook({ bookId: book.id }));
  }
}
