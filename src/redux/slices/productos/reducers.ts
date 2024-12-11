import { PayloadAction } from '@reduxjs/toolkit';
import { ProductoState } from './state';

const productosReducers = {
  setSearch(state: ProductoState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: ProductoState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: ProductoState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default productosReducers;
