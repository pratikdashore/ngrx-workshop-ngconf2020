import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { BookModel, calculateBooksGrossEarnings } from 'src/app/shared/models';
import { BooksPageActions, BooksApiActions } from 'src/app/books/actions';

export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}

export const initialState: State = {
  collection: [],
  activeBookId: null,
};

const bookReducer = createReducer(
  initialState,
  on(BooksPageActions.cancelBook, BooksPageActions.enter, (state) => ({
    ...state,
    activeBookId: null,
  })),
  on(BooksApiActions.loadBooksSuccess, (state: State, action) => ({
    ...state,
    activeBookId: null,
    collection: action.books,
  })),
  on(BooksPageActions.selectBook, (state, action) => ({
    ...state,
    activeBookId: action.bookId,
  })),
  on(BooksApiActions.createBookSuccess, (state, action) => ({
    ...state,
    activeBookId: null,
    collection: [...state.collection, action.book],
  })),
  on(BooksApiActions.deleteBookSuccess, (state, action) => {
    return {
      ...state,
      activeBookId: null,
      collection: state.collection.filter((book) => book.id !== action.bookId),
    };
  }),
  on(BooksApiActions.updateBookSuccess, (state, action) => {
    return {
      ...state,
      activeBookId: null,
      collection: state.collection.map((book) =>
        book.id === action.book.id ? Object.assign({}, book, action.book) : book
      ),
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return bookReducer(state, action);
}

/**
 *
 * "Getter Selectors"
 */

export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;

/**
 *  "Complex" Selectors
 */

export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (collection, activeBookId) => {
    return collection.find((item) => item.id === activeBookId) || null;
  }
);

export const selectEarningsTotal = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
