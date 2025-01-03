import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { DetalleLineaState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchDetalleLineas.pending, (state: DetalleLineaState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchDetalleLineas.fulfilled,
      (state: DetalleLineaState, action: PayloadAction<DetalleLineaState>) => {
        state.loading = false;
        state.detalleLineas = action.payload.detalleLineas;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchDetalleLineas.rejected,
      (state: DetalleLineaState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(
        thunks.createDetalleLinea.pending,
        (state: Partial<DetalleLineaState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createDetalleLinea.fulfilled,
        (state: Partial<DetalleLineaState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createDetalleLinea.rejected,
        (state: Partial<DetalleLineaState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.updateDetalleLinea.pending,
        (state: Partial<DetalleLineaState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.updateDetalleLinea.fulfilled,
        (state: Partial<DetalleLineaState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.updateDetalleLinea.rejected,
        (state: Partial<DetalleLineaState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
