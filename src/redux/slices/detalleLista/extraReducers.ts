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
    ),
    builder
      .addCase(
        thunks.createDetalleLista.pending,
        (state: Partial<DetalleListaState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createDetalleLista.fulfilled,
        (state: Partial<DetalleListaState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createDetalleLista.rejected,
        (state: Partial<DetalleListaState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.updateDetalleLista.pending,
        (state: Partial<DetalleListaState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.updateDetalleLista.fulfilled,
        (state: Partial<DetalleListaState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.updateDetalleLista.rejected,
        (state: Partial<DetalleListaState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
