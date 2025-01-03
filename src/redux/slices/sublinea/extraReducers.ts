import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { SubLineaState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchSublineas.pending, (state: SubLineaState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchSublineas.fulfilled,
      (state: SubLineaState, action: PayloadAction<SubLineaState>) => {
        state.loading = false;
        state.subLineas = action.payload.subLineas;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchSublineas.rejected,
      (state: SubLineaState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(thunks.fetchAllSublineas.pending, (state: SubLineaState) => {
        state.loading = true;
      })
      .addCase(
        thunks.fetchAllSublineas.fulfilled,
        (state: SubLineaState, action: PayloadAction<SubLineaState>) => {
          state.loading = false;
          state.subLineas = action.payload.subLineas;
        }
      )
      .addCase(
        thunks.fetchAllSublineas.rejected,
        (state: SubLineaState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.createSublinea.pending,
        (state: Partial<SubLineaState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createSublinea.fulfilled,
        (state: Partial<SubLineaState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createSublinea.rejected,
        (state: Partial<SubLineaState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.updateSublinea.pending,
        (state: Partial<SubLineaState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.updateSublinea.fulfilled,
        (state: Partial<SubLineaState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.updateSublinea.rejected,
        (state: Partial<SubLineaState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
