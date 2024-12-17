import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../services/base_url';
import { LoginCredentials } from '@/types/auth';

export const thunks = {
  login: createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/login`,
          credentials
        );

        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || 'Error desconocido'
        );
      }
    }
  ),

  logout: createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token');
  }),
};
