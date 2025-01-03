import api from '@/services/axios';
import { Producto } from '@/types/producto';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunks = {
  fetchProductos: createAsyncThunk(
    'productos/fetchProductos',
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
          `producto?page=${currentPage}&search=${search}&limit=${limit}&orderDirection=DESC`
        );
        return {
          productos: response.data.data,
          total: response.data.total,
          totalPages: response.data.totalPages,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),

  fetchAllProductos: createAsyncThunk(
    'productos/fetchAllProductos',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get('producto/all');
        return {
          productos: response.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
  createProducto: createAsyncThunk(
    'Productos/createProducto',
    async (producto: Partial<Producto>, { rejectWithValue }) => {
      try {
        const response = await api.post('producto', producto);
        return response.data;
      } catch (error: any) {
        console.log(error);
        return rejectWithValue(
          error.response.data.message[0] || 'Error desconocido'
        );
      }
    }
  ),
  editProducto: createAsyncThunk(
    'Productos/editProducto',
    async (
      { id, data }: { id: number; data: Partial<Producto> },
      { rejectWithValue }
    ) => {
      try {
        const response = await api.put(`producto/update-by-id/${id}`, data);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response.data.message[0] || 'Error desconocido'
        );
      }
    }
  ),
};
