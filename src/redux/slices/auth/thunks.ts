import { jwtDecode } from 'jwt-decode';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../services/base_url';
import { LoginCredentials } from '@/types/auth';
import api from '@/services/axios';
import { logout } from './auth.slice';
import { clearRoutes } from '../rutas/rutas.slice';

export const thunks = {
  logout: createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
      await api.post(`auth/logout`);
      localStorage.removeItem('token');
      return true;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data) || 'Error al cerrar sesion';
    }
  }),

  login: createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { dispatch, rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/login`,
          credentials
        );
        const token = response.data.access_token;
        response.data.rolId;
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeToExpire = (decoded.exp - currentTime) * 1000;

        setTimeout(() => {
          dispatch(logout());
          dispatch(clearRoutes());
        }, timeToExpire);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || 'Error desconocido'
        );
      }
    }
  ),
};
