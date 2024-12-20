import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { DetalleListaState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchDetalleLista.pending, (state: DetalleListaState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchDetalleLista.fulfilled,
      (state: DetalleListaState, action: PayloadAction<DetalleListaState>) => {
        state.loading = false;
        state.detalleListas = action.payload.detalleListas;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchDetalleLista.rejected,
      (state: DetalleListaState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
};

export default extraReducers;
