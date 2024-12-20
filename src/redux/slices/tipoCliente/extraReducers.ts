import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { TipoClienteState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchTipoCliente.pending, (state: TipoClienteState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchTipoCliente.fulfilled,
      (state: TipoClienteState, action: PayloadAction<TipoClienteState>) => {
        state.loading = false;
        state.tiposCliente = action.payload.tiposCliente;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchTipoCliente.rejected,
      (state: TipoClienteState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
};

export default extraReducers;
