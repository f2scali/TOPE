import { PayloadAction } from '@reduxjs/toolkit';
import { UnidadMedState } from './state';

const unidadMedReducers = {
  setSearch(state: UnidadMedState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: UnidadMedState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: UnidadMedState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default unidadMedReducers;
