import { PayloadAction } from '@reduxjs/toolkit';
import { DetalleLineaState } from './state';

const detalleLineaReducer = {
  setSearch(state: DetalleLineaState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: DetalleLineaState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: DetalleLineaState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default detalleLineaReducer;
