import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { ClienteState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchClientes.pending, (state: ClienteState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchClientes.fulfilled,
      (state: ClienteState, action: PayloadAction<ClienteState>) => {
        state.loading = false;
        state.clientes = action.payload.clientes;
        state.totalPages = action.payload.totalPages;
      }
    )
    .addCase(
      thunks.fetchClientes.rejected,
      (state: ClienteState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
};

export default extraReducers;
