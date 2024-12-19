import api from '@/services/axios';
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
        console.log('se ejecuto');
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
};
