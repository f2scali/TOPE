import { PayloadAction } from '@reduxjs/toolkit';
import { VendedoresState } from './state';

const vendedorReducers = {
  setSearch(state: VendedoresState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: VendedoresState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: VendedoresState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default vendedorReducers;
