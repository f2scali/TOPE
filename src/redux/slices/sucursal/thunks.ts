import api from '@/services/axios';
import { Sucursal } from '@/types/sucursal';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchSucursal: createAsyncThunk(
    'sucursal/fetchsucursal',
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
          `sucursal?page=${currentPage}&search=${search}&limit=${limit}&orderDirection=DESC`
        );
        return {
          sucursales: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  createSucursal: createAsyncThunk(
    'sucursal/createSucursal',
    async (Sucursal: Partial<Sucursal>, { rejectWithValue }) => {
      try {
        const response = await api.post('sucursal', Sucursal);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response.data.message[0] || 'Error desconocido'
        );
      }
    }
  ),
  editSucursal: createAsyncThunk(
    'sucursal/editSucursal',
    async (
      { id, data }: { id: number; data: Partial<Sucursal> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`sucursal/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response.data.message || 'Error desconocido'
        );
      }
    }
  ),

  deleteSucursal: createAsyncThunk(
    'sucursal/deleteSucursal',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.patch(`sucursal/${id}?estado=0`);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
