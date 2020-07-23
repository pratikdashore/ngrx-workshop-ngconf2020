import { createAction, props } from '@ngrx/store';
import { BookRequiredProps } from 'src/app/shared/models';

export const enter = createAction('[Book Page] Enter');

export const selectBook = createAction(
  '[Book Page] Select Book',
  props<{ bookId: string }>()
);

export const cancelBook = createAction('[Book Page] Cancel Book');

export const createBook = createAction(
  '[Book Page] Create Book',
  props<{ book: BookRequiredProps }>()
);

export const deleteBook = createAction(
  '[Book Page] Delete Book',
  props<{ bookId: string }>()
);

export const updateBook = createAction(
  '[Book Page] Update Book',
  props<{ bookId:string, book: BookRequiredProps }>()
);
