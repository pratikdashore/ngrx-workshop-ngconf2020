import { createAction, props } from '@ngrx/store';
import { BookModel } from 'src/app/shared/models';

export const loadBooksSuccess = createAction(
  '[Books API] Books Load Success',
  props<{ books: BookModel[] }>()
);

export const createBookSuccess = createAction(
  '[Book API] Create Book Success',
  props<{ book: BookModel }>()
);

export const deleteBookSuccess = createAction(
  '[Book API] Delete Book Success',
  props<{ bookId: string }>()
);

export const updateBookSuccess = createAction(
  '[Books API] Update Book Success',
  props<{ book: BookModel }>()
);
