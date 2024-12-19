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
    );
};

export default extraReducers;
