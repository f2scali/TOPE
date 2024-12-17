import { AuthState } from '@/types/auth';

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

export default initialState;
