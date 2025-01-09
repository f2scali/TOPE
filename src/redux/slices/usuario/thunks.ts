import api from '@/services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchUsuarios: createAsyncThunk(
    'usuarios/fetchUsuarios',
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
          `usuarios?page=${currentPage}&search=${search}&limit=${limit}`
        );

        return {
          usuarios: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  fetchAllUsuarioVendedor: createAsyncThunk(
    'usuarios/fetchAllUsuarioVendedor',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('usuarios/vendedores');
        return {
          usuarios: response.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
};
