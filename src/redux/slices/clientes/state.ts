import { Cliente } from '@/types/clientes';

export interface ClienteState {
  clientes: Cliente[];
  loading: boolean;
  error: null | string;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
}
const initialState: ClienteState = {
  clientes: [],
  loading: false,
  error: null,
  total: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
  search: '',
};

export default initialState;
