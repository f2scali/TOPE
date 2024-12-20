import api from '@/services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchVendedores: createAsyncThunk(
    'vendedor/fetchVendedores',
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
          `vendedor?page=${currentPage}&search=${search}&limit=${limit}`
        );

        return {
          vendedores: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
};
