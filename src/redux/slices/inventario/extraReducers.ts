import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { InventarioState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchInventario.pending, (state: InventarioState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchInventario.fulfilled,
      (state: InventarioState, action: PayloadAction<InventarioState>) => {
        state.loading = false;
        state.inventario = action.payload.inventario;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchInventario.rejected,
      (state: InventarioState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(thunks.fetchAllInventario.pending, (state: InventarioState) => {
        state.loading = true;
      })
      .addCase(
        thunks.fetchAllInventario.fulfilled,
        (state: InventarioState, action: PayloadAction<InventarioState>) => {
          state.loading = false;
          state.inventario = action.payload.inventario;
        }
      )
      .addCase(
        thunks.fetchAllInventario.rejected,
        (state: InventarioState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.createTipoInventario.pending,
        (state: Partial<InventarioState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createTipoInventario.fulfilled,
        (state: Partial<InventarioState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createTipoInventario.rejected,
        (state: Partial<InventarioState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.updateTipoInventario.pending,
        (state: Partial<InventarioState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.updateTipoInventario.fulfilled,
        (state: Partial<InventarioState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.updateTipoInventario.rejected,
        (state: Partial<InventarioState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
