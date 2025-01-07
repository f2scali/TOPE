import { PayloadAction } from '@reduxjs/toolkit';
import { PptoState } from './state';

const pptoReducers = {
  setSearch(state: PptoState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: PptoState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: PptoState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default pptoReducers;
