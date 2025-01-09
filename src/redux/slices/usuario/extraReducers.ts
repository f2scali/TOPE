import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { UsuariosState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchUsuarios.pending, (state: UsuariosState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchUsuarios.fulfilled,
      (state: UsuariosState, action: PayloadAction<UsuariosState>) => {
        state.loading = false;
        state.usuarios = action.payload.usuarios;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchUsuarios.rejected,
      (state: UsuariosState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(
        thunks.fetchAllUsuarioVendedor.pending,
        (state: UsuariosState) => {
          state.loading = true;
        }
      )
      .addCase(
        thunks.fetchAllUsuarioVendedor.fulfilled,
        (state: UsuariosState, action: PayloadAction<UsuariosState>) => {
          state.loading = false;
          state.usuarios = action.payload.usuarios;
        }
      )
      .addCase(
        thunks.fetchAllUsuarioVendedor.rejected,
        (state: UsuariosState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
