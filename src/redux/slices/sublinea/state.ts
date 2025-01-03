import { SubLinea } from '@/types/sublinea';

export interface SubLineaState {
  subLineas: SubLinea[];
  loading: boolean;
  loadingPayload: boolean;
  error: null | string;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
}
const initialState: SubLineaState = {
  subLineas: [],
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
