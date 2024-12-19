import api from '@/services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchClientes: createAsyncThunk(
    'clientes/fetchClientes',
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
          `clientes?page=${currentPage}&search=${search}&limit=${limit}`
        );
        console.log('se ejecuto');
        return {
          clientes: response.data.data,
          totalPages: response.data.total,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
};
