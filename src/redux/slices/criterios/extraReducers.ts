import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { CriteriosState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchCriterios.pending, (state: CriteriosState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchCriterios.fulfilled,
      (state: CriteriosState, action: PayloadAction<CriteriosState>) => {
        state.loading = false;
        state.criterios = action.payload.criterios;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchCriterios.rejected,
      (state: CriteriosState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(
        thunks.createCriterio.pending,
        (state: Partial<CriteriosState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createCriterio.fulfilled,
        (state: Partial<CriteriosState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createCriterio.rejected,
        (state: Partial<CriteriosState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.editCriterio.pending,
        (state: Partial<CriteriosState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.editCriterio.fulfilled,
        (state: Partial<CriteriosState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.editCriterio.rejected,
        (state: Partial<CriteriosState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
