import api from '@/services/axios';
import { TipoCliente } from '@/types/tipoCliente';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchTipoCliente: createAsyncThunk(
    'tipoCliente/fetchTipoCliente',
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
          `tipoCliente?page=${currentPage}&search=${search}&limit=${limit}`
        );

        return {
          tiposCliente: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  fetchAllTipoCliente: createAsyncThunk(
    'tipoCliente/fetchAllTipoCliente',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('tipoCliente/all');

        return {
          tiposCliente: response.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  createTipoCliente: createAsyncThunk(
    'tipoCliente/createTipoCliente',
    async (data: Partial<TipoCliente>, { rejectWithValue }) => {
      try {
        const response = await api.post('tipoCliente', data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  updateTipoCliente: createAsyncThunk(
    'tipoCliente/updateTipoCliente',
    async (
      { id, data }: { id: number; data: Partial<TipoCliente> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`tipoCliente/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
  deleteTipoCliente: createAsyncThunk(
    'tipoCliente/deleteTipoCliente',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.patch(`tipoCliente/${id}?estado=0`);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
