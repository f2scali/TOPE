import { PayloadAction } from '@reduxjs/toolkit';
import { ListaPreciosState } from './state';

const listaPreciosReducers = {
  setSearch(state: ListaPreciosState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: ListaPreciosState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: ListaPreciosState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default listaPreciosReducers;
