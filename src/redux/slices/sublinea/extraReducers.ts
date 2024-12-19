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
    );
};

export default extraReducers;
