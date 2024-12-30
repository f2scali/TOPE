import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { UnidadMedState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchUnidadMed.pending, (state: UnidadMedState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchUnidadMed.fulfilled,
      (state: UnidadMedState, action: PayloadAction<UnidadMedState>) => {
        state.loading = false;
        state.unidadMed = action.payload.unidadMed;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchUnidadMed.rejected,
      (state: UnidadMedState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(
        thunks.createUnidadMed.pending,
        (state: Partial<UnidadMedState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createUnidadMed.fulfilled,
        (state: Partial<UnidadMedState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createUnidadMed.rejected,
        (state: Partial<UnidadMedState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.updateUnidadMed.pending,
        (state: Partial<UnidadMedState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.updateUnidadMed.fulfilled,
        (state: Partial<UnidadMedState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.updateUnidadMed.rejected,
        (state: Partial<UnidadMedState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
