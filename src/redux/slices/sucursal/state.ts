import { Sucursal } from '@/types/sucursal';

export interface SucursalState {
  sucursales: Sucursal[];
  loading: boolean;
  loadingPayload?: boolean;
  error: null | string;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
}
const initialState: SucursalState = {
  sucursales: [],
  loading: false,
  loadingPayload: false,
  error: null,
  total: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
  search: '',
};

export default initialState;
