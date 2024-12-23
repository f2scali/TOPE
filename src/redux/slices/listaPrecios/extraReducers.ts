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
      );
};

export default extraReducers;
