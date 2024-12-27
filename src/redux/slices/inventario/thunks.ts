import api from '@/services/axios';
import { TipoInventario } from '@/types/producto';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchInventario: createAsyncThunk(
    'inventario/fetchInventario',
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
          `tipoInventario?page=${currentPage}&search=${search}&limit=${limit}`
        );
        return {
          inventario: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  createTipoInventario: createAsyncThunk(
    'TipoInventario/createTipoInventario',
    async (data: Partial<TipoInventario>, { rejectWithValue }) => {
      try {
        const response = await api.post('tipoInventario', data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  updateTipoInventario: createAsyncThunk(
    'TipoInventario/updateTipoInventario',
    async (
      { id, data }: { id: number; data: Partial<TipoInventario> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(
          `tipoInventario/update-by-id/${id}`,
          data
        );
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
