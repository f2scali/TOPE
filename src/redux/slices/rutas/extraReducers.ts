import { PayloadAction } from '@reduxjs/toolkit';
import { RutasState } from './state';
import { thunks } from './thunks';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchRutas.pending, (state: RutasState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchRutas.fulfilled,
      (state: RutasState, action: PayloadAction<any>) => {
        state.loading = false;
        state.rutas = action.payload;
      }
    )
    .addCase(
      thunks.fetchRutas.rejected,
      (state: RutasState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
};

export default extraReducers;
