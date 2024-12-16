import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../services/base_url';

export const thunks = {
  fetchRutas: createAsyncThunk(
    'rutas/fetchRutas',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/roles/1/rutas`);
        return {
          rutas: response.data.data,
        };
      } catch (error: any) {
        return rejectWithValue(error.message || 'Error desconocido');
      }
    }
  ),
};
