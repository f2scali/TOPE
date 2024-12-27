import { PayloadAction } from '@reduxjs/toolkit';
import { thunks } from './thunks';
import { ListaPreciosState } from './state';

const extraReducers = (builder: any) => {
  builder
    .addCase(thunks.fetchListaPrecios.pending, (state: ListaPreciosState) => {
      state.loading = true;
    })
    .addCase(
      thunks.fetchListaPrecios.fulfilled,
      (state: ListaPreciosState, action: PayloadAction<ListaPreciosState>) => {
        state.loading = false;
        state.listaPrecios = action.payload.listaPrecios;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      }
    )
    .addCase(
      thunks.fetchListaPrecios.rejected,
      (state: ListaPreciosState, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    ),
    builder
      .addCase(
        thunks.fetchAllListaPrecio.pending,
        (state: ListaPreciosState) => {
          state.loading = true;
        }
      )
      .addCase(
        thunks.fetchAllListaPrecio.fulfilled,
        (
          state: ListaPreciosState,
          action: PayloadAction<ListaPreciosState>
        ) => {
          state.loading = false;
          state.listaPrecios = action.payload.listaPrecios;
        }
      )
      .addCase(
        thunks.fetchAllListaPrecio.rejected,
        (state: ListaPreciosState, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.createListaPrecios.pending,
        (state: Partial<ListaPreciosState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.createListaPrecios.fulfilled,
        (state: Partial<ListaPreciosState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.createListaPrecios.rejected,
        (state: Partial<ListaPreciosState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      ),
    builder
      .addCase(
        thunks.updateListaPrecios.pending,
        (state: Partial<ListaPreciosState>) => {
          state.loadingPayload = true;
        }
      )
      .addCase(
        thunks.updateListaPrecios.fulfilled,
        (state: Partial<ListaPreciosState>) => {
          state.loadingPayload = false;
          state.error = null;
        }
      )
      .addCase(
        thunks.updateListaPrecios.rejected,
        (state: Partial<ListaPreciosState>, action: PayloadAction<any>) => {
          state.loadingPayload = false;
          state.error = action.payload as string;
        }
      );
};

export default extraReducers;
