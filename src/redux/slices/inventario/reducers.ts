import { PayloadAction } from '@reduxjs/toolkit';
import { InventarioState } from './state';

const inventarioReducers = {
  setSearch(state: InventarioState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: InventarioState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: InventarioState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default inventarioReducers;
