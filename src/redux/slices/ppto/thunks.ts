import api from '@/services/axios';
import { Ppto } from '@/types/ppto';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchPpto: createAsyncThunk(
    'ppto/fetchPpto',
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
          `ppto?page=${currentPage}&search=${search}&limit=${limit}&orderDirection=DESC`
        );
        return {
          presupuestos: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  createPpto: createAsyncThunk(
    'ppto/createPpto',
    async (Ppto: Partial<Ppto>, { rejectWithValue }) => {
      try {
        const response = await api.post('ppto', Ppto);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response.data.message || 'Error desconocido'
        );
      }
    }
  ),
  editPpto: createAsyncThunk(
    'ppto/editPpto',
    async (
      { id, data }: { id: number; data: Partial<Ppto> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`ppto/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response.data.message || 'Error desconocido'
        );
      }
    }
  ),

  deletePpto: createAsyncThunk(
    'ppto/deletePpto',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.patch(`ppto/${id}?estado=0`);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
