import { PayloadAction } from '@reduxjs/toolkit';
import { DetalleListaState } from './state';

const detalleListasReducers = {
  setSearch(state: DetalleListaState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: DetalleListaState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: DetalleListaState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default detalleListasReducers;
