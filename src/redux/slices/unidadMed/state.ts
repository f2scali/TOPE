import { UnidadMedida } from '@/types/unidadMed';

export interface UnidadMedState {
  unidadMed: UnidadMedida[];
  loadingPayload: boolean;
  loading: boolean;
  error: null | string;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
}
const initialState: UnidadMedState = {
  unidadMed: [],
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
