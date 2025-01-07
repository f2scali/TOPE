import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { SucursalState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchSucursal.pending, (state: SucursalState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchSucursal.fulfilled,
      (state: SucursalState, action: PayloadAction<SucursalState>) => {
        state.loading = false;
        state.sucursales = action.payload.sucursales;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchSucursal.rejected,
      (state: SucursalState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(
        thunks.createSucursal.pending,
        (state: Partial<SucursalState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createSucursal.fulfilled,
        (state: Partial<SucursalState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createSucursal.rejected,
        (state: Partial<SucursalState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(thunks.editSucursal.pending, (state: Partial<SucursalState>) => {
        state.loadingPayload = true;
      })
      .addCase(
        thunks.editSucursal.fulfilled,
        (state: Partial<SucursalState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.editSucursal.rejected,
        (state: Partial<SucursalState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
