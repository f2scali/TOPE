import { Producto } from '../../../types/producto';

export interface ProductoState {
  productos: Producto[];
  loading: boolean;
  error: null | string;
  totalPages: number;
  currentPage: number;
  limit: number;
  search: string;
}
const initialState: ProductoState = {
  productos: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
  search: '',
};

export default initialState;
