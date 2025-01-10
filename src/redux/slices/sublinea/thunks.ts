import api from '@/services/axios';
import { SubLinea } from '@/types/sublinea';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchSublineas: createAsyncThunk(
    'subLineas/fetchSublineas',
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
          `sublinea?page=${currentPage}&search=${search}&limit=${limit}`
        );

        return {
          subLineas: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  fetchAllSublineas: createAsyncThunk(
    'subLineas/fetchAllSublineas',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('sublinea/all');
        return {
          subLineas: response.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
  createSublinea: createAsyncThunk(
    'sublinea/createSublinea',
    async (data: Partial<SubLinea>, { rejectWithValue }) => {
      try {
        const response = await api.post('sublinea', data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  updateSublinea: createAsyncThunk(
    'sublinea/updateSublinea',
    async (
      { id, data }: { id: number; data: Partial<SubLinea> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`sublinea/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  deleteSublinea: createAsyncThunk(
    'sublinea/deleteSublinea',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.patch(`sublinea/${id}?estado=0`);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
