import { PayloadAction } from '@reduxjs/toolkit';
import { SucursalState } from './state';

const sucursalReducers = {
  setSearch(state: SucursalState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: SucursalState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: SucursalState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default sucursalReducers;
