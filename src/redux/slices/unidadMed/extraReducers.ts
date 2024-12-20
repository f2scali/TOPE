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
    );
};

export default extraReducers;
