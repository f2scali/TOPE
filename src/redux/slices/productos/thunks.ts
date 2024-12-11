import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const thunks = {
  fetchProductos: createAsyncThunk(
    'productos/fetchProductos',
    async (
      {
        currentPage,
        search,
        limit,
      }: { currentPage: number; search: string; limit: number },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/producto?page=${currentPage}&search=${search}&limit=${limit}`
        );
        return {
          productos: response.data.data,
          totalPages: response.data.total,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
};
