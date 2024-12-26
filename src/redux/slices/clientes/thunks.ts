import api from '@/services/axios';
import { Cliente, PostCliente } from '@/types/clientes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchClientes: createAsyncThunk(
    'clientes/fetchClientes',
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
          `clientes?page=${currentPage}&search=${search}&limit=${limit}&orderDirection=DESC`
        );
        console.log('se ejecuto');
        return {
          clientes: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  createCliente: createAsyncThunk(
    'clientes/createCliente',
    async (cliente: Partial<Cliente>, { rejectWithValue }) => {
      try {
        const response = await api.post('clientes', cliente);
        return response.data;
      } catch (error: any) {
        console.log(error);
        return rejectWithValue(
          error.response.data.message[0] || 'Error desconocido'
        );
      }
    }
  ),
  editCliente: createAsyncThunk(
    'clientes/editCliente',
    async (
      { id, data }: { id: number; data: Partial<Cliente> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`clientes/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response.data.message[0] || 'Error desconocido'
        );
      }
    }
  ),
};
