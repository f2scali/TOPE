import { PayloadAction } from '@reduxjs/toolkit';
import { CriteriosState } from './state';

const criteriosReducers = {
  setSearch(state: CriteriosState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: CriteriosState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: CriteriosState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default criteriosReducers;
