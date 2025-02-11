import api from '@/services/axios';
import { UnidadMedida } from '@/types/unidadMed';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchUnidadMed: createAsyncThunk(
    'unidadMed/fetchUnidadMed',
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
          `unidadMed?page=${currentPage}&search=${search}&limit=${limit}`
        );

        return {
          unidadMed: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
  fetchAllUnidadMed: createAsyncThunk(
    'unidadMed/fetchAllUnidadMed',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('unidadMed/all');

        return {
          unidadMed: response.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
  createUnidadMed: createAsyncThunk(
    'unidadMedida/createUnidadMed',
    async (data: Partial<UnidadMedida>, { rejectWithValue }) => {
      try {
        const response = await api.post('UnidadMed', data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  updateUnidadMed: createAsyncThunk(
    'unidadMedida/updateUnidadMed',
    async (
      { id, data }: { id: number; data: Partial<UnidadMedida> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`UnidadMed/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  deleteUnidadMed: createAsyncThunk(
    'unidadMed/deleteUnidadMed',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.patch(`unidadMed/${id}?estado=0`);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
