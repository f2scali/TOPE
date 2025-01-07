import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { PptoState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchPpto.pending, (state: PptoState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchPpto.fulfilled,
      (state: PptoState, action: PayloadAction<PptoState>) => {
        state.loading = false;
        state.presupuestos = action.payload.presupuestos;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchPpto.rejected,
      (state: PptoState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(thunks.createPpto.pending, (state: Partial<PptoState>) => {
        state.loadingPayload = true;
      })
      .addCase(thunks.createPpto.fulfilled, (state: Partial<PptoState>) => {
        state.loadingPayload = false;
        state.error = null;
      })
      .addCase(
        thunks.createPpto.rejected,
        (state: Partial<PptoState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(thunks.editPpto.pending, (state: Partial<PptoState>) => {
        state.loadingPayload = true;
      })
      .addCase(thunks.editPpto.fulfilled, (state: Partial<PptoState>) => {
        state.loadingPayload = false;
        state.error = null;
      })
      .addCase(
        thunks.editPpto.rejected,
        (state: Partial<PptoState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
