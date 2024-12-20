import { PayloadAction } from '@reduxjs/toolkit';
import { UsuariosState } from './state';

const usuarioReducers = {
  setSearch(state: UsuariosState, action: PayloadAction<string>) {
    state.search = action.payload;
  },

  setCurrentPage(state: UsuariosState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },

  setLimit(state: UsuariosState, action: PayloadAction<number>) {
    state.limit = action.payload;
  },
};

export default usuarioReducers;
