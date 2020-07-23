import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { BooksService } from '../shared/services';
import { BooksPageActions, BooksApiActions } from './actions';

@Injectable()
export class BookApiEffects {
  constructor(private actions$: Actions, private booksService: BooksService) {}

  loadAllBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.enter),
      mergeMap(() =>
        this.booksService
          .all()
          .pipe(
            map((data) => BooksApiActions.loadBooksSuccess({ books: data }))
          )
      )
    );
  });

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.createBook),
      mergeMap((action) =>
        this.booksService
          .create(action.book)
          .pipe(
            map((data) => BooksApiActions.createBookSuccess({ book: data }))
          )
      )
    );
  });

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.updateBook),
      mergeMap((action) =>
        this.booksService
          .update(action.bookId, action.book)
          .pipe(
            map((data) => BooksApiActions.updateBookSuccess({ book: data }))
          )
      )
    );
  });

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.deleteBook),
      mergeMap((action) =>
        this.booksService
          .delete(action.bookId)
          .pipe(
            map(() =>
              BooksApiActions.deleteBookSuccess({ bookId: action.bookId })
            )
          )
      )
    );
  });
}
