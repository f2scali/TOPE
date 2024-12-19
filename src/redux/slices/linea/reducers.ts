import { PayloadAction } from '@reduxjs/toolkit';
import { LineaState } from './state';

const lineasReducers = {
  setSearch(state: LineaState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: LineaState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: LineaState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default lineasReducers;
