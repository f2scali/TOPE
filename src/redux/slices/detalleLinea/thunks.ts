import api from '@/services/axios';
import { DetalleLinea } from '@/types/detalleLinea';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchDetalleLineas: createAsyncThunk(
    'detalleLineas/fetchDetalleLineas',
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
          `detLinea?page=${currentPage}&search=${search}&limit=${limit}`
        );

        return {
          detalleLineas: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  createDetalleLinea: createAsyncThunk(
    'lineas/createDetalleLinea',
    async (data: Partial<DetalleLinea>, { rejectWithValue }) => {
      try {
        const response = await api.post('detLinea', data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  updateDetalleLinea: createAsyncThunk(
    'lineas/updateLinea',
    async (
      { id, data }: { id: number; data: Partial<DetalleLinea> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`detLinea/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  deleteDetalleLinea: createAsyncThunk(
    'detalleLinea/deleteDetalleLinea',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.patch(`detLinea/${id}?estado=0`);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
