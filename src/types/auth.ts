export interface LoginCredentials {
  usuario: string;
  contraseña: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}
