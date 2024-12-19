import { PayloadAction } from '@reduxjs/toolkit';
import { SubLineaState } from './state';

const subLineasReducers = {
  setSearch(state: SubLineaState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: SubLineaState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: SubLineaState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default subLineasReducers;
