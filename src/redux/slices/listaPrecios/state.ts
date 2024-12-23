import { ListaPrecio } from '@/types/listaPrecio';

export interface ListaPreciosState {
  listaPrecios: ListaPrecio[];
  loading: boolean;
  error: null | string;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
}
const initialState: ListaPreciosState = {
  listaPrecios: [],
  loading: false,
  error: null,
  total: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
  search: '',
};

export default initialState;
