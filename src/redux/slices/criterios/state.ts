import { Criterio } from '@/types/criterio';

export interface CriteriosState {
  criterios: Criterio[];
  loading: boolean;
  error: null | string;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
}
const initialState: CriteriosState = {
  criterios: [],
  loading: false,
  error: null,
  total: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
  search: '',
};

export default initialState;
