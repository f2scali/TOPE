import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { VendedoresState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchVendedores.pending, (state: VendedoresState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchVendedores.fulfilled,
      (state: VendedoresState, action: PayloadAction<VendedoresState>) => {
        state.loading = false;
        state.vendedores = action.payload.vendedores;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchVendedores.rejected,
      (state: VendedoresState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(thunks.fetchAllVendedores.pending, (state: VendedoresState) => {
        state.loading = true;
      })
      .addCase(
        thunks.fetchAllVendedores.fulfilled,
        (state: VendedoresState, action: PayloadAction<VendedoresState>) => {
          state.loading = false;
          state.vendedores = action.payload.vendedores;
        }
      )
      .addCase(
        thunks.fetchAllVendedores.rejected,
        (state: VendedoresState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.createVendedor.pending,
        (state: Partial<VendedoresState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createVendedor.fulfilled,
        (state: Partial<VendedoresState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createVendedor.rejected,
        (state: Partial<VendedoresState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.updateVendedor.pending,
        (state: Partial<VendedoresState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.updateVendedor.fulfilled,
        (state: Partial<VendedoresState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.updateVendedor.rejected,
        (state: Partial<VendedoresState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
