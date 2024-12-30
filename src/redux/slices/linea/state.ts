import { Linea } from '@/types/linea';

export interface LineaState {
  lineas: Linea[];
  loadingPayload: boolean;
  loading: boolean;
  error: null | string;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
}
const initialState: LineaState = {
  lineas: [],
  loadingPayload: false,
  loading: false,
  error: null,
  total: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
  search: '',
};

export default initialState;
