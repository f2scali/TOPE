import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/axios';

export const thunks = {
  fetchRutas: createAsyncThunk(
    'rutas/fetchRutas',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(`roles/1/rutas`);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
};
