import { PayloadAction } from '@reduxjs/toolkit';
import { TipoClienteState } from './state';

const tipoClienteReducers = {
  setSearch(state: TipoClienteState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: TipoClienteState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: TipoClienteState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default tipoClienteReducers;
