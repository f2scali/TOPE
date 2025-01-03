import api from '@/services/axios';
import { Linea } from '@/types/linea';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchLineas: createAsyncThunk(
    'lineas/fetchLineas',
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
          `linea?page=${currentPage}&search=${search}&limit=${limit}`
        );

        return {
          lineas: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  fetchAllLineas: createAsyncThunk(
    'Lineas/fetchAllLineas',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('linea/all');

        return {
          lineas: response.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
  createLinea: createAsyncThunk(
    'lineas/createLinea',
    async (data: Partial<Linea>, { rejectWithValue }) => {
      try {
        const response = await api.post('linea', data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  updateLinea: createAsyncThunk(
    'lineas/updateLinea',
    async (
      { id, data }: { id: number; data: Partial<Linea> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`linea/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
