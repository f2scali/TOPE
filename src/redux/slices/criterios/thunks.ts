import api from '@/services/axios';
import { Criterio } from '@/types/criterio';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchCriterios: createAsyncThunk(
    'criterios/fetchCriterios',
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
          `criterio?page=${currentPage}&search=${search}&limit=${limit}`
        );
        return {
          criterios: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
  fetchAllCriterios: createAsyncThunk(
    'criterios/fetchAllCriterios',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('criterio/all');

        return {
          criterios: response.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
  createCriterio: createAsyncThunk(
    'criterios/createCriterio',
    async (Criterio: Partial<Criterio>, { rejectWithValue }) => {
      try {
        const response = await api.post('criterio', Criterio);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response.data.message || 'Error desconocido'
        );
      }
    }
  ),
  editCriterio: createAsyncThunk(
    'criterios/editCriterio',
    async (
      { id, data }: { id: number; data: Partial<Criterio> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`criterio/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response.data.message || 'Error desconocido'
        );
      }
    }
  ),

  deleteCriterios: createAsyncThunk(
    'criterios/deleteCriterios',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.patch(`criterio/${id}?estado=0`);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
