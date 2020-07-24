import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  concatMap,
  exhaustMap, map, mergeMap
} from 'rxjs/operators';
import { BooksService } from '../shared/services';
import { BooksApiActions, BooksPageActions } from './actions';

@Injectable()
export class BookApiEffects {
  constructor(private actions$: Actions, private booksService: BooksService) {}

  loadAllBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksPageActions.enter),
      exhaustMap(() =>
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
      concatMap((action) =>
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
      concatMap((action) =>
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
