import api from '@/services/axios';
import { DetalleLista } from '@/types/detalleLista';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchDetalleLista: createAsyncThunk(
    'detalleLista/fetchDetalleLista',
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
          `detalle-lista-precios?page=${currentPage}&search=${search}&limit=${limit}`
        );

        return {
          detalleListas: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
  createDetalleLista: createAsyncThunk(
    'detalleLista/createDetalleLista',
    async (data: Partial<DetalleLista>, { rejectWithValue }) => {
      try {
        const response = await api.post('detalle-lista-precios', data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  updateDetalleLista: createAsyncThunk(
    'detalleLista/updateDetalleLista',
    async (
      { id, data }: { id: number; data: Partial<DetalleLista> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(
          `detalle-lista-precios/update-by-id/${id}`,
          data
        );
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  deleteDetalleLista: createAsyncThunk(
    'detalleLista/deleteDetalleLista',
    async (
      {
        id,
        idProducto,
        idListaPrecio,
      }: {
        id: number;
        idProducto: number | undefined;
        idListaPrecio: number | undefined;
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.patch(
          `detalle-lista-precios/${id}?producto=${idProducto}&listaPrecio=${idListaPrecio}&estado=0`
        );

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
