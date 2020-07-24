import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { BookModel, calculateBooksGrossEarnings } from 'src/app/shared/models';
import { BooksPageActions, BooksApiActions } from 'src/app/books/actions';

import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<BookModel> {
  activeBookId: string | null;
}

const bookAdaptor = createEntityAdapter<BookModel>();

export const initialState: State = bookAdaptor.getInitialState({
  activeBookId: null,
});

const bookReducer = createReducer(
  initialState,
  on(BooksPageActions.cancelBook, BooksPageActions.enter, (state) => ({
    ...state,
    activeBookId: null,
  })),
  on(BooksApiActions.loadBooksSuccess, (state: State, action) => {
    return bookAdaptor.setAll(action.books, {
      ...state,
      activeBookId: null,
    });
  }),
  on(BooksPageActions.selectBook, (state, action) => ({
    ...state,
    activeBookId: action.bookId,
  })),
  on(BooksApiActions.createBookSuccess, (state, action) =>
    bookAdaptor.addOne(action.book, {
      ...state,
      activeBookId: null,
    })
  ),
  on(BooksApiActions.deleteBookSuccess, (state, action) => {
    return bookAdaptor.removeOne(action.bookId, {
      ...state,
      activeBookId: null,
    });
  }),
  on(BooksApiActions.updateBookSuccess, (state, action) => {
    return bookAdaptor.updateOne(
      { id: action.book.id, changes: action.book },
      {
        ...state,
        activeBookId: null,
      }
    );
  })
);

export function reducer(state: State | undefined, action: Action) {
  return bookReducer(state, action);
}

/**
 *
 * "Getter Selectors"
 */

export const { selectAll, selectEntities } = bookAdaptor.getSelectors();
export const selectActiveBookId = (state: State) => state.activeBookId;

/**
 *  "Complex" Selectors
 */

export const selectActiveBook = createSelector(
  selectEntities,
  selectActiveBookId,
  (entities, activeBookId) => {
    return activeBookId ? entities[activeBookId] : null;
  }
);

export const selectEarningsTotal = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
