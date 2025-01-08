import api from '@/services/axios';
import { ListaPrecio } from '@/types/listaPrecio';
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
          `listaPrecios?page=${currentPage}&search=${search}&limit=${limit}&orderDirection=DESC`
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

  createListaPrecios: createAsyncThunk(
    'listaPrecios/createListaPrecios',
    async (data: Partial<ListaPrecio>, { rejectWithValue }) => {
      try {
        const response = await api.post('listaPrecios', data);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  updateListaPrecios: createAsyncThunk(
    'listaPrecios/updateListaPrecios',
    async (
      { id, data }: { id: string; data: Partial<ListaPrecio> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`listaPrecios/update-by-id/${id}`, data);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  deleteListaPrecios: createAsyncThunk(
    'listaPrecios/deleteListaPrecios',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.patch(`listaPrecios/${id}?estado=0`);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
