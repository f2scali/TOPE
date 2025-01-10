import api from '@/services/axios';
import { Vendedor } from '@/types/vendedor';
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
  fetchAllVendedores: createAsyncThunk(
    'vendedor/fetchAllVendedores',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('vendedor/all');

        return {
          vendedores: response.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  createVendedor: createAsyncThunk(
    'Vendedors/createVendedor',
    async (data: Partial<Vendedor>, { rejectWithValue }) => {
      try {
        const response = await api.post('vendedor', data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message[0] || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  updateVendedor: createAsyncThunk(
    'vendedores/updateVendedor',
    async (
      { id, data }: { id: number; data: Partial<Vendedor> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`vendedor/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),

  deleteVendedor: createAsyncThunk(
    'vendedor/deleteVendedor',
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.patch(`vendedor/${id}?estado=0`);

        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Error desconocido';
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
