import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { LineaState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchLineas.pending, (state: LineaState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchLineas.fulfilled,
      (state: LineaState, action: PayloadAction<LineaState>) => {
        state.loading = false;
        state.lineas = action.payload.lineas;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchLineas.rejected,
      (state: LineaState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(thunks.fetchAllLineas.pending, (state: LineaState) => {
        state.loading = true;
      })
      .addCase(
        thunks.fetchAllLineas.fulfilled,
        (state: LineaState, action: PayloadAction<LineaState>) => {
          state.loading = false;
          state.lineas = action.payload.lineas;
        }
      )
      .addCase(
        thunks.fetchAllLineas.rejected,
        (state: LineaState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(thunks.createLinea.pending, (state: Partial<LineaState>) => {
        state.loadingPayload = true;
      })
      .addCase(thunks.createLinea.fulfilled, (state: Partial<LineaState>) => {
        state.loadingPayload = false;
        state.error = null;
      })
      .addCase(
        thunks.createLinea.rejected,
        (state: Partial<LineaState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(thunks.updateLinea.pending, (state: Partial<LineaState>) => {
        state.loadingPayload = true;
      })
      .addCase(thunks.updateLinea.fulfilled, (state: Partial<LineaState>) => {
        state.loadingPayload = false;
        state.error = null;
      })
      .addCase(
        thunks.updateLinea.rejected,
        (state: Partial<LineaState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
