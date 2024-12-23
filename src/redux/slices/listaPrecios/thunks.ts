import api from '@/services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchListaPrecios: createAsyncThunk(
    'listaPrecios/fetchListaPrecios',
    async (
      {
        currentPage,
        search,
        limit,
      }: { currentPage: number; search: string; limit: number },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.get(
          `listaPrecios?page=${currentPage}&search=${search}&limit=${limit}`
        );

        return {
          listaPrecios: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  fetchAllListaPrecio: createAsyncThunk(
    'listaPrecios/fetchAllListaPrecio',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('listaPrecios/all');

        return {
          listaPrecios: response.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
};
