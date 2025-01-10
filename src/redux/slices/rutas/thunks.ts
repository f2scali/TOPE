import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/axios';

export const thunks = {
  fetchRutas: createAsyncThunk(
    'rutas/fetchRutas',
    async ({ rolId }: { rolId: string | null }, { rejectWithValue }) => {
      try {
        const response = await api.get(`roles/${rolId}/rutas`);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
};
