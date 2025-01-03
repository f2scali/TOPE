import { PayloadAction } from '@reduxjs/toolkit';
import { ProductoState } from './state';
import { thunks } from './thunks';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchProductos.pending, (state: ProductoState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchProductos.fulfilled,
      (state: ProductoState, action: PayloadAction<ProductoState>) => {
        state.loading = false;
        state.productos = action.payload.productos;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      }
    )
    .addCase(
      thunks.fetchProductos.rejected,
      (state: ProductoState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(thunks.fetchAllProductos.pending, (state: ProductoState) => {
        state.loading = true;
      })
      .addCase(
        thunks.fetchAllProductos.fulfilled,
        (state: ProductoState, action: PayloadAction<ProductoState>) => {
          state.loading = false;
          state.productos = action.payload.productos;
        }
      )
      .addCase(
        thunks.fetchAllProductos.rejected,
        (state: ProductoState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.createProducto.pending,
        (state: Partial<ProductoState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createProducto.fulfilled,
        (state: Partial<ProductoState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createProducto.rejected,
        (state: Partial<ProductoState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(thunks.editProducto.pending, (state: Partial<ProductoState>) => {
        state.loadingPayload = true;
      })
      .addCase(
        thunks.editProducto.fulfilled,
        (state: Partial<ProductoState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.editProducto.rejected,
        (state: Partial<ProductoState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
