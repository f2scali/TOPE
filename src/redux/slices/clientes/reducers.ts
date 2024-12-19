import { PayloadAction } from '@reduxjs/toolkit';
import { ClienteState } from './state';

const clientesReducers = {
  setSearch(state: ClienteState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: ClienteState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: ClienteState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default clientesReducers;
