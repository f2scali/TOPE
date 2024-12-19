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
    );
};

export default extraReducers;
